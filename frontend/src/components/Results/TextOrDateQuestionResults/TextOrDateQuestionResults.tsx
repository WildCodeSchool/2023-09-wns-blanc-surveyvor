import { useState } from "react";
import { Answer } from "@/types/questionForAnswerPage.type";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { useRouter } from "next/router";

export interface TextOrDateQuestionResultsProps {
  answers: Answer[] | null | undefined;
}

type UniqueAnswer = Answer & { count: number };

function TextOrDateQuestionResults({
  answers,
}: TextOrDateQuestionResultsProps) {
  if (!answers) return null;

  const router = useRouter();
  const { link } = router.query;

  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .normalize("NFD") // Normalise les accents (NFD décompose les caractères combinés)
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .replace(/[^a-z0-9]/gi, "") // Supprime les caractères non alphanumériques
      .trim(); // Supprime les espaces au début et à la fin
  };

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const uniqueAnswersList = answers.reduce<UniqueAnswer[]>((acc, answer) => {
    const existingAnswer = acc.find(
      (item) =>
        normalizeString(item.content) === normalizeString(answer.content)
    );
    if (existingAnswer) {
      existingAnswer.count += 1;
      existingAnswer.content = capitalizeFirstLetter(existingAnswer.content);
    } else {
      acc.push({
        ...answer,
        content: capitalizeFirstLetter(answer.content),
        count: 1,
      });
    }
    return acc;
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const answersPerPage = 5;

  const currentAnswers = uniqueAnswersList.slice(
    (currentPage - 1) * answersPerPage,
    currentPage * answersPerPage
  );

  return (
    <div className="text-answers">
      {currentAnswers.map((answer: UniqueAnswer) => {
        return (
          <Link
            href={`/surveys/${link}/results/submissions/${answer.submission.count}`}
            className="answer-container"
            key={answer.id}>
            <p>{answer.content}</p>
            {answer.count > 1 && (
              <div className="badge-sm-colored-primary-round">
                <p>{answer.count} </p>
              </div>
            )}
          </Link>
        );
      })}

      <Pagination
        answers={uniqueAnswersList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        answersPerPage={answersPerPage}
      />
    </div>
  );
}

export default TextOrDateQuestionResults;

