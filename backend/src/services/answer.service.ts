import { Question } from "../entities/question";
import { QuestionOption } from "../entities/questionOption";
import { User } from "../entities/user";
import { UserAnswer } from "../entities/userAnswer";
import { getMe } from "./auth.service";

export async function addAnswer(answerData: {
  content?: string;
  question: string;
  option?: string;
  user?: string;
}): Promise<UserAnswer | string> {
  if (!answerData.content && !answerData.option) {
    return "All answer fields are required";
  }

  const newAnswer = new UserAnswer();
  if (answerData.content && answerData.content.length > 0) {
    newAnswer.content = answerData.content;
  }

  if (answerData.option && answerData.option.length > 0) {
    const option = await QuestionOption.findOneBy({
      id: answerData.option,
    });
    if (option) {
      newAnswer.options = option;
    }
  }

  const question = await Question.findOneBy({ id: answerData.question });
  if (question) {
    newAnswer.question = question;
  }

  const user = answerData.user;
  let userAnswering: User | null;
  if (user && user.length > 0) {
    userAnswering = await getMe(user);
    if (userAnswering) {
      newAnswer.user = userAnswering;
    }
  }

  try {
    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  } catch (error) {
    return "An error occured while saving the answer";
  }
}
