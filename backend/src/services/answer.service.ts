import { In } from "typeorm";
import { Question } from "../entities/question";
import { QuestionOption } from "../entities/questionOption";
import { User } from "../entities/user";
import { UserAnswer } from "../entities/userAnswer";
import { getMe, verifyToken } from "./auth.service";
import { Submission } from "../entities/submission";

export async function addAnswer(answerData: {
  content?: string;
  question: string;
  option?: Array<string>;
  user?: string | null;
  submissionId: string;
}): Promise<UserAnswer | string> {
  if (!answerData.content && !answerData.option) {
    return "All answer fields are required";
  }

  const newAnswer = new UserAnswer();
  if (answerData.content && answerData.content.length > 0) {
    newAnswer.content = answerData.content;
  }

  try {
    const submission = await Submission.findOneBy({
      id: answerData.submissionId,
    });

    if (!submission) {
      throw new Error("Submission not found");
    }

    newAnswer.submission = submission;

    const question = await Question.findOneBy({ id: answerData.question });
    if (!question) {
      throw new Error("Question not found");
    }
    newAnswer.question = question;

    if (
      await UserAnswer.findOneBy({ submission: submission, question: question })
    ) {
      throw new Error("Already answered");
    }

    if (answerData.user) {
      // Si un utilisateur est fourni, vérifiez le token

      const userAnswering = await getMe(answerData.user);
      if (userAnswering) {
        newAnswer.user = userAnswering;
      }
    } else {
      // Si aucun utilisateur n'est fourni, laissez `newAnswer.user` comme `null`
      newAnswer.user = null; // Ceci est optionnel, car c'est déjà `undefined`/`null` par défaut
    }

    if (
      answerData.option &&
      answerData.option[0].length > 0 &&
      answerData.option.length > 0
    ) {
      const options = await QuestionOption.findBy({
        id: In(answerData.option),
      });
      if (options.length !== answerData.option.length) {
        throw new Error("One or more options not found");
      }
      newAnswer.selectedOptions = options;
    }

    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  } catch (error) {
    throw error;
  }
}

