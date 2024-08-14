import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Survey } from "./survey";
import { QuestionType } from "./questionType";
import { QuestionOption } from "./questionOption";
import { UserAnswer } from "./userAnswer";

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  constructor(
    datas: {
      title: string;
      description: string;
      defaultQuestion: boolean;
      sort: number;
    } | null = null
  ) {
    super();
    if (datas) {
      this.title = datas.title;
      this.description = datas.description;
      this.defaultQuestion = datas.defaultQuestion;
      this.sort = datas.sort;
    }
  }

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  defaultQuestion: boolean;

  @Column()
  @Field()
  sort: number;

  @Field()
  @ManyToOne(() => QuestionType, (questionType) => questionType.type)
  type: QuestionType;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.link)
  survey: Survey;

  @Field(() => [QuestionOption], { nullable: true })
  @OneToMany(
    () => QuestionOption,
    (questionOption) => questionOption.question,
    {
      onDelete: "CASCADE",
    }
  )
  options: QuestionOption[];

  @Field(() => [UserAnswer], { nullable: true })
  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.question)
  answers: UserAnswer[];
}

