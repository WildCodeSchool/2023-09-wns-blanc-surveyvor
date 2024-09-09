import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePublicationDate1724751540144 implements MigrationInterface {
    name = 'ChangePublicationDate1724751540144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "publicationDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "publicationDate" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "publicationDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "publicationDate" TIMESTAMP`);
    }

}
