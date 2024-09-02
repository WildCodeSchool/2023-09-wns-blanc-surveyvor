import { Submission } from "../entities/submission";
import { getMe } from "./auth.service";
import { findSurveyByLink } from "./survey.service";

export async function getSubmissionsBySurveyLink(surveyLink: string) {
  return await Submission.find({
    where: { survey: { link: surveyLink } },
    relations: { user: true, survey: true, answer: { question: true } },
  });
}

export async function getSubmissionByCount(count: number, surveyLink: string) {
  const submission = await Submission.findOne({
    where: { count: count, survey: { link: surveyLink } },
    relations: {
      user: true,
      survey: true,
      answer: { question: true, selectedOptions: true },
    },
  });

  if (!submission) {
    throw new Error("Submission not found");
  }

  return submission;
}

export async function postSubmission(
  userToken: string | null,
  surveyLink: string
) {
  try {
    const user = userToken ? await getMe(userToken) : null;

    const submission = new Submission(user);

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

export async function getSubmissionCount(surveyLink: string) {
  return await Submission.count({ where: { survey: { link: surveyLink } } });
}

