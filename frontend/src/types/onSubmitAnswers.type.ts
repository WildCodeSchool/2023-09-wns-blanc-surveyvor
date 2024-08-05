import { FormEvent } from "react";
import { QuestionForAnswerPage } from "./questionForAnswerPage.type";
import {
  ApolloError,
  FetchResult,
  MutationFunction,
  OperationVariables,
} from "@apollo/client";
import { NextRouter } from "next/router";
import { ModalProps } from "@/pages/answers/[link]";

export type OnSubmitAnswersType = {
  questions: QuestionForAnswerPage[] | undefined;
  setQuestions: React.Dispatch<
    React.SetStateAction<QuestionForAnswerPage[] | undefined>
  >;
  defaultQuestions: QuestionForAnswerPage[] | undefined;
  setDefaultQuestions: React.Dispatch<
    React.SetStateAction<QuestionForAnswerPage[] | undefined>
  >;
  callbackGetNumberOfQuestions: () => number;
  postAnswer: MutationFunction<FetchResult<any>, OperationVariables>;
  setPendingAction: React.Dispatch<React.SetStateAction<() => void>>;
  checkboxQuestion: string[];
  setModal: React.Dispatch<React.SetStateAction<ModalProps>>;
  Toast: any;
  router: NextRouter;
};
