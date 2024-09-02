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

  @Query(() => Submission)
  getSubmissionByCount(
    @Arg("count") count: number,
    @Arg("surveyLink") surveyLink: string
  ): Promise<Submission> {
    return SubmissionService.getSubmissionByCount(count, surveyLink);
  }

  @Query(() => Number)
  getNumberOfSubmissions(
    @Arg("surveyLink") surveyLink: string
  ): Promise<number> {
    return SubmissionService.getSubmissionCount(surveyLink);
  }

  @Mutation(() => Submission)
  postSubmission(
    @Arg("surveyLink") surveyLink: string,
    @Arg("user", () => String, { nullable: true }) user: string | null
  ) {
    return SubmissionService.postSubmission(user, surveyLink);
  }
}

