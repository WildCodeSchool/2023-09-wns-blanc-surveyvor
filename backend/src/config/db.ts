import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Question } from "../entities/question";
import { QuestionOption } from "../entities/questionOption";
import { QuestionType } from "../entities/questionType";
import { Role } from "../entities/role";
import { Survey } from "../entities/survey";
import { User } from "../entities/user";
import { UserAnswer } from "../entities/userAnswer";
import { SurveyState } from "../entities/surveyState";
import { Submission } from "../entities/submission";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_DB as string),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Question,
    QuestionOption,
    QuestionType,
    Role,
    Survey,
    User,
    UserAnswer,
    SurveyState,
    Submission,
  ],
  logging: true,
  synchronize: false,
  migrations: ["migrations/*.{ts,js}"],
});

