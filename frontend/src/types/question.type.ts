import { IconName } from "./iconName.type";

export type Question = {
  id: string | undefined;
  title: string;
  type: QuestionType;
  sort: number;
  description: string;
  isOpen: boolean;
  options: Option[] | undefined;
};

export type QuestionType = {
  id: string;
  type: string;
  icon: IconName;
};

export type Option = {
  id: string;
  content: string;
  questionId: string;
  sort: number;
};
