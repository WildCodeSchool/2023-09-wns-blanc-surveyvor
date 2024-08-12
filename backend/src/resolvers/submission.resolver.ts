import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Submission } from "../entities/submission";
import * as SubmissionService from "../services/submission.service";
import { User } from "../entities/user";

@Resolver()
export class SubmissionResolver {
  @Query(() => [Submission])
  getSubmissionsBySurveyLink(
    @Arg("surveyLink") surveyLink: string
  ): Promise<Submission[]> {
    return SubmissionService.getSubmissionsBySurveyLink(surveyLink);
  }

  @Mutation(() => Submission)
  postSubmission(
    @Ctx("user") user: User,
    @Arg("surveyLink") surveyLink: string
  ) {
    return SubmissionService.postSubmission(user, surveyLink);
  }
}

