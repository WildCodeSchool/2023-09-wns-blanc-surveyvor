import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question";
import { QuestionOption } from "./questionOption";
import { User } from "./user";

@Entity()
@ObjectType()
export class UserAnswer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  content?: string;

  @ManyToOne(() => Question, (question) => question.id)
  @Field()
  question: Question;

  @ManyToOne(() => QuestionOption, (questionOption) => questionOption.id)
  @Field({ nullable: true })
  options: QuestionOption;

  @ManyToOne(() => User, (user) => user.id)
  @Field({ nullable: true })
  user?: User;
}
