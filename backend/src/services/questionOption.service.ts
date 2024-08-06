import { Question } from "../entities/question";
import { QuestionOption } from "../entities/questionOption";
import { CreateQuestionOptionInputType } from "../types/CreateQuestionOptionInputType";
import { EditQuestionOptionInputType } from "../types/EditQuestionOptionInputType";

export async function getQuestionOptionById(
    id: string
): Promise<QuestionOption | null> {
    return QuestionOption.findOneBy({ id });
}

export async function createQuestionOption(
    questionOption: CreateQuestionOptionInputType
): Promise<QuestionOption> {
    const newQuestionOption = new QuestionOption(questionOption);

    const question = await Question.findOneBy({
        id: questionOption.questionId,
    });
    if (question) {
        newQuestionOption.question = question;
    }
    return newQuestionOption.save();
}

export async function editQuestionOption(
    id: string,
    questionOption: EditQuestionOptionInputType
): Promise<QuestionOption | undefined> {
    const questionOptionToEdit = await getQuestionOptionById(id);
    if (questionOptionToEdit) {
        questionOptionToEdit.content = questionOption.content;
        return questionOptionToEdit.save();
    }
}
