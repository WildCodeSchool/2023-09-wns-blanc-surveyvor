import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { User } from "./user";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class InvitationToken extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
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

  constructor() {
    super();
    this.createdAt = new Date().getTime().toString();
  }
}

