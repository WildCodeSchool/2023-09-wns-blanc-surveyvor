import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvotationTokenEntity1725297891461 implements MigrationInterface {
    name = 'AddInvotationTokenEntity1725297891461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invitation_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "invitedEmail" character varying NOT NULL, "token" character varying NOT NULL, "createdAt" bigint NOT NULL, "expiresAt" bigint, "userId" uuid, CONSTRAINT "UQ_098f3083234d0c73bed030c1e2b" UNIQUE ("invitedEmail"), CONSTRAINT "UQ_ac4c3d95756c55dffd90e267c8a" UNIQUE ("token"), CONSTRAINT "PK_5dfbb205d9dd539aef9bd0959a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invitation_token" ADD CONSTRAINT "FK_cdbc8acb975050c812b7af1b264" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation_token" DROP CONSTRAINT "FK_cdbc8acb975050c812b7af1b264"`);
        await queryRunner.query(`DROP TABLE "invitation_token"`);
    }

}
