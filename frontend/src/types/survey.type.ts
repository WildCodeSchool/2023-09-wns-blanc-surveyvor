import { Question } from "./question.type";
import { SurveyState } from "./surveyState.type";

export type Survey = {
  id: number;
  title: string;
  description?: string;
  link: string;
  archived: boolean;
  private: boolean;
  collectingUserData: boolean;
  startDate?: number;
  endDate?: number;
  deleteDate?: number;
  creationDate: number;
  publicationDate?: number;
  archiveDate?: number;
  state: SurveyState;
  question: Question[];
};

