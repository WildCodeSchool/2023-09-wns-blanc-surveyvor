import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";
import { useCallback } from "react";
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
  const copyQuestion = structuredClone(question);
  copyQuestion.options && copyQuestion.options.sort((a, b) => a.sort - b.sort);
  const renderQuestion = useCallback(() => {
    switch (question.type.type) {
      case "text":
        return (
          <AnswerTextQuestion
            key={copyQuestion.id}
            question={copyQuestion}
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
            {copyQuestion.options &&
              copyQuestion.options.map((option) => (
                <AnswerCheckboxesQuestion
                  key={option.id}
                  answerOption={option}
                  questionId={copyQuestion.id}
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
              key={copyQuestion.id}
              question={copyQuestion}
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
            {copyQuestion.options &&
              copyQuestion.options.map((option) => (
                <AnswerRadioQuestion
                  key={option.id}
                  answerOption={option}
                  questionId={copyQuestion.id}
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
            key={copyQuestion.id}
            question={copyQuestion}
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
  }, [copyQuestion, question.type.type, questionList, setQuestions]);
  return renderQuestion();
}

export default QuestionDispatcher;
