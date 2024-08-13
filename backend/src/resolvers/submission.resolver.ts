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
    @Arg("surveyLink") surveyLink: string,
    @Arg("user", () => String, { nullable: true }) userId: string | null
  ) {
    return SubmissionService.postSubmission(userId, surveyLink);
  }
}

