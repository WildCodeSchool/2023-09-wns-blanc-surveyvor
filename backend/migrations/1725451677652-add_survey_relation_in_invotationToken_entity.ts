import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSurveyRelationInInvotationTokenEntity1725451677652 implements MigrationInterface {
    name = 'AddSurveyRelationInInvotationTokenEntity1725451677652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invitation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invitedEmail" character varying NOT NULL, "token" character varying NOT NULL, "createdAt" bigint NOT NULL, "expiresAt" bigint, "userId" uuid, "surveyId" uuid, CONSTRAINT "UQ_e061236e6abd8503aa3890af94c" UNIQUE ("token"), CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invitation" ADD CONSTRAINT "FK_05191060fae5b5485327709be7f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invitation" ADD CONSTRAINT "FK_fddcbc8c8934beb9e3854770609" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation" DROP CONSTRAINT "FK_fddcbc8c8934beb9e3854770609"`);
        await queryRunner.query(`ALTER TABLE "invitation" DROP CONSTRAINT "FK_05191060fae5b5485327709be7f"`);
        await queryRunner.query(`DROP TABLE "invitation"`);
    }

}
