import { gql } from "@apollo/client";

export const POST_ANSWER = gql`
  mutation CreateAnswer(
    $user: String!
    $option: String!
    $question: String!
    $content: String!
  ) {
    createAnswer(
      user: $user
      option: $answer
      question: $question
      content: $content
    ) {
      question {
        id
      }
    }
  }
`;
