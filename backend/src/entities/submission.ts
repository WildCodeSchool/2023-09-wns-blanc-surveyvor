import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user";
import { Survey } from "./survey";
import { UserAnswer } from "./userAnswer";

@ObjectType()
@Entity()
export class Submission extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({ type: "bigint" })
  @Field()
  date?: string;

  @Column()
  @Field()
  count: number;

  @Field()
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Field()
  @ManyToOne(() => Survey, (survey) => survey.id)
  survey: Survey;

  @Field(() => [UserAnswer])
  @OneToMany(() => UserAnswer, (answer) => answer.submission)
  answer: UserAnswer[];

  constructor(user: User | null = null) {
    super();
    if (user) {
      this.user = user;
    }
    this.date = new Date().getTime().toString();
  }
}

