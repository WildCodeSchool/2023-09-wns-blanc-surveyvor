import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionOptionsRename1718624412406 implements MigrationInterface {
    name = "QuestionOptionsRename1718624412406";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_answer" DROP CONSTRAINT "FK_1940f9d25a60d83036e5f752093"`
        );
        await queryRunner.query(
            `ALTER TABLE "user_answer" RENAME COLUMN "answerId" TO "optionsId"`
        );
        await queryRunner.query(
            `CREATE TABLE "question_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "sort" integer NOT NULL DEFAULT 0, "questionId" uuid, CONSTRAINT "PK_64f8e42188891f2b0610017c8f9" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "question" ALTER COLUMN "sort" DROP DEFAULT`
        );
        await queryRunner.query(
            `ALTER TABLE "question_option" ADD CONSTRAINT "FK_ba19747af180520381a117f5986" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "user_answer" ADD CONSTRAINT "FK_41c9abf5952bc6e903624ce2cd6" FOREIGN KEY ("optionsId") REFERENCES "question_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_answer" DROP CONSTRAINT "FK_41c9abf5952bc6e903624ce2cd6"`
        );
        await queryRunner.query(
            `ALTER TABLE "question_option" DROP CONSTRAINT "FK_ba19747af180520381a117f5986"`
        );
        await queryRunner.query(
            `ALTER TABLE "question" ALTER COLUMN "sort" SET DEFAULT '0'`
        );
        await queryRunner.query(`DROP TABLE "question_option"`);
        await queryRunner.query(
            `ALTER TABLE "user_answer" RENAME COLUMN "optionsId" TO "answerId"`
        );
        await queryRunner.query(
            `ALTER TABLE "user_answer" ADD CONSTRAINT "FK_1940f9d25a60d83036e5f752093" FOREIGN KEY ("answerId") REFERENCES "question_answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
