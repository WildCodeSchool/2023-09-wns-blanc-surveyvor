import { Answer } from "@/types/questionForAnswerPage.type";
import HorizontalBars from "./HorizontalBars";
import { Question } from "@/types/question.type";

export interface MultipleChoiceQuestionResultsProps {
  answers: Answer[] | null;
  question: Question;
}

function MultipleChoiceQuestionResults({
  answers,
  question,
}: MultipleChoiceQuestionResultsProps) {
  console.log(question);

  return <HorizontalBars answers={answers} question={question} />;
}

export default MultipleChoiceQuestionResults;

