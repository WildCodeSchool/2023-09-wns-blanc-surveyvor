import { Field, InputType } from "type-graphql";

@InputType()
export class EditQuestionOptionInputType {
    @Field()
    content: string;

    @Field()
    sort: number;
}
