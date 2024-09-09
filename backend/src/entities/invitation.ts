import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./user";
import { Field, ObjectType } from "type-graphql";
import { Survey } from "./survey";

@ObjectType()
@Entity()
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  invitedEmail: string;

  @Field()
  @Column({ unique: true })
  token: string;

  @Field()
  @Column({ type: "bigint" })
  createdAt: string;

  @Field({ nullable: true })
  @Column({ type: "bigint", nullable: true })
  expiresAt?: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Field(() => Survey)
  @ManyToOne(() => Survey, (survey) => survey.id)
  survey: Survey;

  constructor() {
    super();
    this.createdAt = new Date().getTime().toString();
  }
}

