import { Field, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question";

@Entity()
@ObjectType()
export class QuestionOption extends BaseEntity {
    constructor(datas: { content: string } | null = null) {
        super();
        if (datas) {
            this.content = datas.content;
        }
    }

    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string;

    @Column()
    @Field()
    content: string;

    @Column()
    @Field()
    sort: number;

    @Field(() => Question)
    @ManyToOne(() => Question, (question) => question.id, {
        onDelete: "CASCADE",
    })
    question: Question;
}
