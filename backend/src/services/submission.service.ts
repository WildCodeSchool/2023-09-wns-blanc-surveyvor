import { Submission } from "../entities/submission";
import { User } from "../entities/user";
import { findSurveyByLink } from "./survey.service";

export async function getSubmissionsBySurveyLink(surveyLink: string) {
  return await Submission.find({
    where: { survey: { link: surveyLink } },
    relations: { user: true, survey: true, answer: { question: true } },
  });
}

async function getSubmissionCount(surveyLink: string) {
  return await Submission.count({ where: { survey: { link: surveyLink } } });
}

export async function postSubmission(user: User, surveyLink: string) {
  try {
    let submission: Submission;
    if (user) {
      submission = new Submission(user);
    } else {
      submission = new Submission();
    }
    const survey = await findSurveyByLink(surveyLink);

    if (!survey) {
      throw new Error("Survey not found");
    }

    submission.survey = survey;

    const previousSubmissionCount = await getSubmissionCount(surveyLink);
    submission.count = previousSubmissionCount + 1;

    await submission.save();

    return submission;
  } catch (error) {
    throw error;
  }
}

