import { Question } from "@/types/question.type";
import Input from "../Input";
import { useEffect, useState } from "react";
import { QuestionForAnswerPage } from "@/types/questionForAnswerPage.type";

function AnswerDefaultQuestion({
  defaultQuestion,
  setAnswers,
  answers,
  isError,
  defaultQuestions,
  setDefaultQuestions,
}: {
  defaultQuestion: Question;
  answers: {};
  setAnswers: React.Dispatch<React.SetStateAction<{}>>;
  isError: boolean;
  defaultQuestions: QuestionForAnswerPage[] | undefined;
  setDefaultQuestions: React.Dispatch<
    React.SetStateAction<QuestionForAnswerPage[] | undefined>
  >;
}) {
  const [answerDefault, setAnswerDefault] = useState<string>("");

  const [placeHolderForDefaultQuestion, setPlaceHolderForDefaultQuestion] =
    useState<string>("");

  useEffect(() => {
    switch (defaultQuestion.title) {
      case "Nom":
        setPlaceHolderForDefaultQuestion("Votre nom");
        break;
      case "Prénom":
        setPlaceHolderForDefaultQuestion("Votre prénom");
        break;
      case "Email":
        setPlaceHolderForDefaultQuestion("Votre email");
        break;
      case "Numéro de téléphone":
        setPlaceHolderForDefaultQuestion("Votre numéro de téléphone");
        break;
      default:
        break;
    }
  }, [defaultQuestion.title]);

  useEffect(() => {
    if (defaultQuestion)
      setAnswers({
        ...answers,
        [defaultQuestion.id.toString()]: answerDefault,
      });
  }, []);

  const onClick = () => {
    const updatedQuestion =
      defaultQuestions &&
      defaultQuestions.map((q) => {
        if (q.id === defaultQuestion.id) {
          return { ...q, isError: false };
        } else {
          return q;
        }
      });
    if (updatedQuestion) {
      setDefaultQuestions(updatedQuestion);
    }
  };

  return (
    <Input
      labelName={defaultQuestion.title}
      inputName={`question_${defaultQuestion.id}`}
      placeholder={placeHolderForDefaultQuestion}
      value={answerDefault}
      setValue={setAnswerDefault}
      inputClassName={isError ? "is-error" : undefined}
      onClick={onClick}
    />
  );
}

export default AnswerDefaultQuestion;
