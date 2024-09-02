import { Answer } from "./questionForAnswerPage.type";
import { Survey } from "./survey.type";

export type Submission = {
  id: string;
  count: number;
  date: string;
  survey: Survey;
  user?: User | null;
  answers: Answer[];
};
