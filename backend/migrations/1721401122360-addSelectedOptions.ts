import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSelectedOptions1721401122360 implements MigrationInterface {
    name = 'AddSelectedOptions1721401122360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_41c9abf5952bc6e903624ce2cd6"`);
        await queryRunner.query(`CREATE TABLE "user_answer_selected_options_question_option" ("userAnswerId" uuid NOT NULL, "questionOptionId" uuid NOT NULL, CONSTRAINT "PK_bdc61fdf2e6d7fd45bef3131116" PRIMARY KEY ("userAnswerId", "questionOptionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0bfc5829fe5e203c8c7037e3f" ON "user_answer_selected_options_question_option" ("userAnswerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_211d4827185b32e0e3e0ff058b" ON "user_answer_selected_options_question_option" ("questionOptionId") `);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "optionsId"`);
        await queryRunner.query(`ALTER TABLE "question_option" ALTER COLUMN "sort" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_answer_selected_options_question_option" ADD CONSTRAINT "FK_e0bfc5829fe5e203c8c7037e3f0" FOREIGN KEY ("userAnswerId") REFERENCES "user_answer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_answer_selected_options_question_option" ADD CONSTRAINT "FK_211d4827185b32e0e3e0ff058be" FOREIGN KEY ("questionOptionId") REFERENCES "question_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_answer_selected_options_question_option" DROP CONSTRAINT "FK_211d4827185b32e0e3e0ff058be"`);
        await queryRunner.query(`ALTER TABLE "user_answer_selected_options_question_option" DROP CONSTRAINT "FK_e0bfc5829fe5e203c8c7037e3f0"`);
        await queryRunner.query(`ALTER TABLE "question_option" ALTER COLUMN "sort" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "optionsId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_211d4827185b32e0e3e0ff058b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0bfc5829fe5e203c8c7037e3f"`);
        await queryRunner.query(`DROP TABLE "user_answer_selected_options_question_option"`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_41c9abf5952bc6e903624ce2cd6" FOREIGN KEY ("optionsId") REFERENCES "question_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
