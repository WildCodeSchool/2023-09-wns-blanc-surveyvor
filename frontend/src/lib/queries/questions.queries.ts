import { gql } from "@apollo/client";

export const GET_TYPES = gql`
  query GetAllTypes {
    getAllTypes {
      id
      type
      icon
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($question: CreateQuestionInputType!) {
    createQuestion(question: $question) {
      id
      type {
        type
      }
    }
  }
`;

export const EDIT_QUESTION = gql`
  mutation EditQuestion($question: EditQuestionInputType!, $id: String!) {
    editQuestion(question: $question, id: $id) {
      id
      type {
        type
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: String!) {
    deleteQuestion(id: $id)
  }
`;

export const ADD_QUESTION_OPTION = gql`
  mutation CreateQuestionOption(
    $questionOption: CreateQuestionOptionInputType!
  ) {
    createQuestionOption(questionOption: $questionOption) {
      content
    }
  }
`;

export const EDIT_QUESTION_OPTION = gql`
  mutation EditQuestionOption(
    $id: String!
    $questionOption: EditQuestionOptionInputType!
  ) {
    editQuestionOption(id: $id, questionOption: $questionOption) {
      content
    }
  }
`;
export const GET_QUESTIONS = gql`
  query GetQuestions($surveyLink: String!) {
    getQuestions(surveyLink: $surveyLink) {
      id
      title
      description
      sort
      type {
        icon
        id
        type
      }
      options {
        content
        id
        sort
      }
    }
  }
`;
