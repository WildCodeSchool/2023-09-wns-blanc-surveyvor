import { Arg, Mutation, Resolver } from "type-graphql";
import { QuestionOption } from "../entities/questionOption";
import { CreateQuestionOptionInputType } from "../types/CreateQuestionOptionInputType";
import * as QuestionOptionService from "../services/questionOption.service";
import { EditQuestionOptionInputType } from "../types/EditQuestionOptionInputType";

@Resolver()
export class QuestionOptionResolver {
  @Mutation(() => QuestionOption)
  async createQuestionOption(
    @Arg("questionOption") questionOption: CreateQuestionOptionInputType
  ): Promise<QuestionOption> {
    return QuestionOptionService.createQuestionOption({
      ...questionOption,
    });
  }

  @Mutation(() => QuestionOption)
  async editQuestionOption(
    @Arg("id") id: string,
    @Arg("questionOption") questionOption: EditQuestionOptionInputType
  ): Promise<QuestionOption | undefined> {
    return QuestionOptionService.editQuestionOption(id, questionOption);
  }
}
