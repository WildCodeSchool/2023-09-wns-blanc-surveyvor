import { MigrationInterface, QueryRunner } from "typeorm";

export class EditInvotationTokenEntity1725451082310 implements MigrationInterface {
    name = 'EditInvotationTokenEntity1725451082310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_token" DROP CONSTRAINT "UQ_098f3083234d0c73bed030c1e2b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_token" ADD CONSTRAINT "UQ_098f3083234d0c73bed030c1e2b" UNIQUE ("invitedEmail")`);
    }

}
