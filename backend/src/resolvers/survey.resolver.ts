import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as SurveyService from "../services/survey.service";
import { EditSurveyInputType } from "../types/EditSurveyInputType";
import { User } from "../entities/user";
import { Survey } from "../entities/survey";

@Resolver()
export class SurveyResolver {
  @Query(() => Survey)
  getSurveyByLink(
    @Arg("surveyLink") surveyLink: string
  ): Promise<Survey | null> {
    return SurveyService.findSurveyByLink(surveyLink);
  }

  @Query(() => [Survey])
  getPublicSurveys(): Promise<Survey[] | null> {
    return SurveyService.findPublicSurveys();
  }

  @Authorized()
  @Query(() => [Survey])
  getSurveysByOwner(@Ctx("user") user: User): Promise<Survey[] | null> {
    return SurveyService.findSurveysByOwner(user);
  }

  @Authorized()
  @Mutation(() => String)
  createSurvey(
    @Arg("title") title: string,
    @Ctx("user") user: User
  ): Promise<string> {
    return SurveyService.create({ title, user });
  }

  @Authorized()
  @Mutation(() => Survey)
  editSurvey(
    @Arg("link") link: string,
    @Arg("survey") survey: EditSurveyInputType
  ): Promise<Survey | undefined> {
    return SurveyService.edit(link, survey);
  }

  @Authorized()
  @Mutation(() => Survey)
  archiveSurvey(
    @Arg("link") link: string,
    @Arg("archive") archive: boolean
  ): Promise<Survey | undefined> {
    return SurveyService.archive(link, archive);
  }

  @Authorized()
  @Mutation(() => Survey)
  softDeleteSurvey(@Arg("link") link: string): Promise<Survey | undefined> {
    return SurveyService.softDelete(link);
  }
}

