import { gql } from "@apollo/client";

export const GET_SURVEY_BY_OWNER = gql`
  query GetSurveysByOwner {
    getSurveysByOwner {
      id
      title
      description
      link
      archived
      private
      collectingUserData
      startDate
      endDate
      deleteDate
      creationDate
      publicationDate
      archiveDate
      state {
        color
        state
      }
      question {
        title
        options {
          content
        }
      }
    }
  }
`;

export const GET_SURVEY_STATES = gql`
  query Query {
    getSurveyStates {
      color
      id
      state
    }
  }
`;

export const ARCHIVE_SURVEY = gql`
  mutation Mutation($archive: Boolean!, $link: String!) {
    archiveSurvey(archive: $archive, link: $link) {
      id
      title
      description
      link
      archived
      private
      collectingUserData
      startDate
      endDate
      deleteDate
      creationDate
      publicationDate
      archiveDate
      state {
        color
        state
      }
      question {
        title
        options {
          content
        }
      }
    }
  }
`;

export const DELETE_SURVEY = gql`
  mutation Mutation($link: String!) {
    softDeleteSurvey(link: $link) {
      id
      deleteDate
    }
  }
`;

export const CREATE_SURVEY = gql`
  mutation Mutation($title: String!) {
    createSurvey(title: $title)
  }
`;

export const EDIT_SURVEY = gql`
  mutation Mutation($survey: EditSurveyInputType!, $editSurveyLink: String!) {
    editSurvey(survey: $survey, link: $editSurveyLink) {
      title
      description
      collectingUserData
      private
      link
    }
  }
`;

export const GET_SURVEY_BY_LINK = gql`
  query Query($surveyLink: String!) {
    getSurveyByLink(surveyLink: $surveyLink) {
      archived
      creationDate
      description
      endDate
      id
      link
      private
      publicationDate
      question {
        options {
          content
          id
          sort
        }
        title
        type {
          id
          type
        }
        description
        defaultQuestion
        id
        sort
      }
      startDate
      state {
        state
        id
      }
      title
    }
  }
`;
