import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveQuestionAnswer1721638494000 implements MigrationInterface {
  name = "RemoveQuestionAnswer1721638494000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // from database
    await queryRunner.query(`DROP TABLE "question_answer"`);

    // update question_option
    await queryRunner.query(
      `ALTER TABLE "question_option" ALTER COLUMN "sort" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // from database
    await queryRunner.query(
      `CREATE TABLE "question_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "questionIdId" uuid, CONSTRAINT "PK_c1e064f8949efd78ad3c66059ba" PRIMARY KEY ("id"))`
    );

    // unupdate question_option
    await queryRunner.query(
      `ALTER TABLE "question_option" ALTER COLUMN "sort" SET DEFAULT 0`
    );
  }
}
