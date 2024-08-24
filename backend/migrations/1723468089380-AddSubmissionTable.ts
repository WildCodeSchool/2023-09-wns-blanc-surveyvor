import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubmissionTable1723468089380 implements MigrationInterface {
    name = 'AddSubmissionTable1723468089380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "submission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" bigint NOT NULL, "count" integer NOT NULL, "userId" uuid, "surveyId" uuid, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "submissionId" uuid`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_7bd626272858ef6464aa2579094" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_445eeaad33ae6464ac85f6ea46b" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_7a447417db9484bf897e00c0860" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_7a447417db9484bf897e00c0860"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_445eeaad33ae6464ac85f6ea46b"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_7bd626272858ef6464aa2579094"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "submissionId"`);
        await queryRunner.query(`DROP TABLE "submission"`);
    }

}
