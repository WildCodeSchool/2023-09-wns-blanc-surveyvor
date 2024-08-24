import { gql } from "@apollo/client";

export const POST_ANSWER = gql`
  mutation CreateAnswer(
    $user: String!
    $option: [String!]
    $question: String!
    $content: String!
    $submission: String!
  ) {
    createAnswer(
      user: $user
      option: $option
      question: $question
      content: $content
      submission: $submission
    ) {
      question {
        id
      }
    }
  }
`;

