import { gql } from "@apollo/client";

export const GET_SUBMISSIONS_BY_SURVEY_LINK = gql`
  query Query($surveyLink: String!) {
    getSubmissionsBySurveyLink(surveyLink: $surveyLink) {
      count
      id
      answer {
        content
        id
        question {
          title
        }
      }
      date
      survey {
        link
      }
      user {
        email
      }
    }
  }
`;

export const GET_SUBMISSION_BY_COUNT = gql`
  query Query($surveyLink: String!, $count: Float!) {
    getSubmissionByCount(surveyLink: $surveyLink, count: $count) {
      answer {
        content
        selectedOptions {
          content
          id
        }
        question {
          id
          title
        }
      }
      count
      date
      user {
        firstname
        lastname
        email
      }
    }
  }
`;

export const POST_SUBMISSION = gql`
  mutation Mutation($surveyLink: String!, $user: String) {
    postSubmission(surveyLink: $surveyLink, user: $user) {
      id
      date
      count
    }
  }
`;

