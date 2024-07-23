import { In } from "typeorm";
import { Question } from "../entities/question";
import { QuestionOption } from "../entities/questionOption";
import { User } from "../entities/user";
import { UserAnswer } from "../entities/userAnswer";
import { getMe, verifyToken } from "./auth.service";

export async function addAnswer(answerData: {
  content?: string;
  question: string;
  option?: Array<string>;
  user?: string;
}): Promise<UserAnswer | string> {
  if (!answerData.content && !answerData.option) {
    return "All answer fields are required";
  }

  const newAnswer = new UserAnswer();
  if (answerData.content && answerData.content.length > 0) {
    newAnswer.content = answerData.content;
  }

  const question = await Question.findOneBy({ id: answerData.question });
  if (question) {
    newAnswer.question = question;
  }

  const user = answerData.user;
  let userAnswering: User | null;
  if (user && user.length > 0) {
    // TODO : verifyToken if expired doesn't work, need to change the verifyToken function
    const payload = verifyToken(user);
    if (payload) {
      userAnswering = await getMe(user);
      if (userAnswering) {
        newAnswer.user = userAnswering;
      }
    } else {
      throw new Error("Token invalid");
    }
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
      return "One or more options not found";
    }
    newAnswer.selectedOptions = options;
  }
  try {
    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  } catch (error) {
    return "An error occured while saving the answer";
  }
}
