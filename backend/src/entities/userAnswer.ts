import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => User, (user) => user.id)
  @Field(() => User, { nullable: true })
  user?: User;

  @ManyToMany(() => QuestionOption, (option) => option.answer)
  @JoinTable()
  @Field(() => [QuestionOption])
  selectedOptions: QuestionOption[];
}
