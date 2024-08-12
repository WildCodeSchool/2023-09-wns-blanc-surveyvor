import { Arg, Mutation, Resolver } from "type-graphql";
import { UserAnswer } from "../entities/userAnswer";
import * as AnswerService from "../services/answer.service";

@Resolver()
export class AnswerResolver {
  @Mutation(() => UserAnswer)
  createAnswer(
    @Arg("question") question: string,
    @Arg("submission") submissionId: string,
    @Arg("user", () => String, { nullable: true }) user?: string | null,
    @Arg("content") content?: string,
    @Arg("option", () => [String], { nullable: true }) option?: string[]
  ): Promise<UserAnswer | string> {
    return AnswerService.addAnswer({
      content,
      question,
      option,
      user,
      submissionId,
    });
  }
}

