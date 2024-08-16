import React from "react";
import PieCh from "./PieChart";
import { Answer } from "@/types/questionForAnswerPage.type";
import { Question } from "@/types/question.type";

export interface SingleChoiceQuestionResultsProps {
  answers: Answer[] | null;
  question: Question;
}
function SingleChoiceQuestionResults({
  answers,
  question,
}: SingleChoiceQuestionResultsProps) {
  return <PieCh answers={answers} question={question} />;
}

export default SingleChoiceQuestionResults;

