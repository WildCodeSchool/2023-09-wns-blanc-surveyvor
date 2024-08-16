import { IconName } from "./iconName.type";
import { Option } from "./question.type";

export type QuestionForAnswerPage = {
  id: string;
  title: string;
  type: QuestionType;
  description: string;
  isOpen: boolean;
  options: Answer[] | undefined;
  isError: boolean;
  sort: number;
};

export type QuestionType = {
  id: string;
  type: string;
  icon: IconName;
};

export type Answer = {
  id: string;
  content: string;
  questionId: string;
  selectedOptions: Option[] | null;
  sort: number;
};

export interface OptionCount {
  value: number;
  fill: string;
}

