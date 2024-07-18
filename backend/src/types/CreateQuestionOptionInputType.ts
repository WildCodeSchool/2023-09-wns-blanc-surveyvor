import { Field, InputType } from "type-graphql";

@InputType()
export class CreateQuestionOptionInputType {
    @Field()
    content: string;

    @Field()
    sort: number;

    @Field()
    questionId: string;
}