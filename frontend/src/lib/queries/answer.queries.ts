import { gql } from "@apollo/client";

export const POST_ANSWER = gql`
  mutation CreateAnswer(
    $user: String!
    $answer: String!
    $question: String!
    $content: String!
  ) {
    createAnswer(
      user: $user
      answer: $answer
      question: $question
      content: $content
    ) {
      question {
        id
      }
    }
  }
`;
