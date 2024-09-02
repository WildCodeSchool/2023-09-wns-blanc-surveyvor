import { IconName } from "./iconName.type";
import { Answer } from "./questionForAnswerPage.type";

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  sort: number;
  description: string;
  isOpen: boolean;
  options: Option[] | undefined;
  answers?: Answer[] | null;
};

export type QuestionType = {
  id: string;
  type: string;
  icon: IconName;
};

export type Option = {
  id: string;
  content: string;
  // questionId: string;
  sort: number;
};

