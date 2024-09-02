import Icon from "@/components/Icon/Icon";
import { SubmissionAnswer } from "@/pages/surveys/[link]/results/submissions/[count]";
import { Question } from "@/types/question.type";
import React from "react";
import DisplayIcon from "./DisplayIcon";

type DisplayAnswersProps = {
  question: Question;
  answer: SubmissionAnswer;
};

function DisplayAnswers({ question, answer }: DisplayAnswersProps) {
  const displayContent =
    question.type.type === "text" || question.type.type === "date";

  const displayCheckbox = question.type.type === "checkbox";
  const displayOptions =
    question.type.type === "checkboxes" || question.type.type === "radio";

  if (!answer) {
    return "Pas de réponse !";
  }

  if (displayContent) {
    return <p>{answer.content}</p>;
  }

  if (displayCheckbox) {
    if (answer.content === "no_answer") {
      return <p>Non</p>;
    }
    return <p>Oui</p>;
  }

  if (displayOptions) {
    return (
      <ul>
        {question.options?.map((option) => {
          const selectedAnswer = answer.selectedOptions?.find(
            (selectedOption) => selectedOption.id === option.id
          );

          return (
            <li key={option.id} className={selectedAnswer && "selected"}>
              <DisplayIcon
                selectedAnswer={selectedAnswer}
                option={option}
                question={question}
              />
              {option.content}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default DisplayAnswers;

