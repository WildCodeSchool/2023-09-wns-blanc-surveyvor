import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question";
import { UserAnswer } from "./userAnswer";

@Entity()
@ObjectType()
export class QuestionOption extends BaseEntity {
  constructor(datas: { content: string; sort: number } | null = null) {
    super();
    if (datas) {
      this.content = datas.content;
      this.sort = datas.sort;
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

  @ManyToMany(() => UserAnswer, (answer) => answer.selectedOptions)
  @Field(() => [UserAnswer])
  answer: UserAnswer[];
}
