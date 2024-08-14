import { Answer } from "@/types/questionForAnswerPage.type";
import { useState } from "react";
import Icon from "../Icon/Icon";

export interface TextQuestionResultsProps {
  answers: Answer[] | null;
}

function TextQuestionResults({ answers }: TextQuestionResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const answersPerPage = 5;

  if (!answers) return null;

  const totalPages = Math.ceil(answers.length / answersPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const currentAnswers = answers.slice(
    (currentPage - 1) * answersPerPage,
    currentPage * answersPerPage
  );
  return (
    <div className="text-answer">
      {currentAnswers.map((answer: Answer) => {
        return <p key={answer.id}>{answer.content}</p>;
      })}

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <Icon name="arrow-left-small" width="20" />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <Icon name="arrow-right-small" width="20" />
        </button>
      </div>
    </div>
  );
}

export default TextQuestionResults;

