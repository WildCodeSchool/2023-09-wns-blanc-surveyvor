import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Submission } from "../entities/submission";
import * as SubmissionService from "../services/submission.service";

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
    @Arg("user", () => String, { nullable: true }) user: string | null
  ) {
    return SubmissionService.postSubmission(user, surveyLink);
  }
}

