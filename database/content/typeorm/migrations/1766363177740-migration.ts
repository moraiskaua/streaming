import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1766363177740 implements MigrationInterface {
    name = 'Migration1766363177740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Video" ALTER COLUMN "duration" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Video" ALTER COLUMN "duration" SET NOT NULL`);
    }

}
