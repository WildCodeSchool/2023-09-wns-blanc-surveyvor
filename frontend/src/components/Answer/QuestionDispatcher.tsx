import {
  Answer,
  QuestionForAnswerPage,
} from "@/types/questionForAnswerPage.type";
import { useCallback, useEffect, useState } from "react";
import AnswerTextQuestion from "./AnswerTextQuestion";
import AnswerCheckboxesQuestion from "./AnswerCheckboxesQuestion";
import AnswerCheckboxQuestion from "./AnswerCheckboxQuestion";
import AnswerRadioQuestion from "./AnswerRadioQuestion";
import AnswerDateQuestion from "./AnswerDateQuestion";

function QuestionDispatcher({
  setQuestions,
  question,
  questionList,
}: {
  setQuestions: React.Dispatch<
    React.SetStateAction<QuestionForAnswerPage[] | undefined>
  >;
  question: QuestionForAnswerPage;
  questionList: QuestionForAnswerPage[];
}) {
  const [sortedOptionsQuestion, setSortedOptionsQuestion] =
    useState<QuestionForAnswerPage>();
  useEffect(() => {
    let sortedOptions: Answer[] | undefined;
    if (question.options && question.options.length > 0) {
      sortedOptions = [...question.options].sort((a, b) => a.sort - b.sort);
    }
    setSortedOptionsQuestion({ ...question, options: sortedOptions });
  }, []);
  const renderQuestion = useCallback(() => {
    if (!sortedOptionsQuestion) return null;
    switch (question.type.type) {
      case "text":
        return (
          <AnswerTextQuestion
            key={sortedOptionsQuestion.id}
            question={sortedOptionsQuestion}
            questions={questionList}
            setQuestions={
              setQuestions as React.Dispatch<
                React.SetStateAction<QuestionForAnswerPage[]>
              >
            }
          />
        );
      case "checkboxes":
        return (
          <div className="checkboxes-container">
            {sortedOptionsQuestion.options &&
              sortedOptionsQuestion.options.map((option) => (
                <AnswerCheckboxesQuestion
                  key={option.id}
                  answerOption={option}
                  questionId={sortedOptionsQuestion.id}
                  questions={questionList}
                  setQuestions={
                    setQuestions as React.Dispatch<
                      React.SetStateAction<QuestionForAnswerPage[]>
                    >
                  }
                />
              ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="checkbox-container">
            <AnswerCheckboxQuestion
              key={sortedOptionsQuestion.id}
              question={sortedOptionsQuestion}
              questions={questionList}
              setQuestions={
                setQuestions as React.Dispatch<
                  React.SetStateAction<QuestionForAnswerPage[]>
                >
              }
            />
          </div>
        );
      case "radio":
        return (
          <div className="radios-container">
            {sortedOptionsQuestion.options &&
              sortedOptionsQuestion.options.map((option) => (
                <AnswerRadioQuestion
                  key={option.id}
                  answerOption={option}
                  questionId={sortedOptionsQuestion.id}
                  questions={questionList}
                  setQuestions={
                    setQuestions as React.Dispatch<
                      React.SetStateAction<QuestionForAnswerPage[]>
                    >
                  }
                />
              ))}
          </div>
        );
      case "date":
        return (
          <AnswerDateQuestion
            key={sortedOptionsQuestion.id}
            question={sortedOptionsQuestion}
            questions={questionList}
            setQuestions={
              setQuestions as React.Dispatch<
                React.SetStateAction<QuestionForAnswerPage[]>
              >
            }
          />
        );
      default:
        break;
    }
  }, [sortedOptionsQuestion, question.type.type, questionList, setQuestions]);
  return renderQuestion();
}

export default QuestionDispatcher;
