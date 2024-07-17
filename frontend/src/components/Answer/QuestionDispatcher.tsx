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
  const renderQuestion = useCallback(() => {
    switch (question.type.type) {
      case "text":
        return (
          <AnswerTextQuestion
            key={question.id}
            question={question}
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
            {question.answer &&
              question.answer.map((answerOption) => (
                <AnswerCheckboxesQuestion
                  key={answerOption.id}
                  answerOption={answerOption}
                  questionId={question.id}
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
              key={question.id}
              question={question}
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
            {question.answer &&
              question.answer.map((answerOption) => (
                <AnswerRadioQuestion
                  key={answerOption.id}
                  answerOption={answerOption}
                  questionId={question.id}
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
            key={question.id}
            question={question}
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
  }, [question, questionList, setQuestions]);
  return renderQuestion();
}

export default QuestionDispatcher;
