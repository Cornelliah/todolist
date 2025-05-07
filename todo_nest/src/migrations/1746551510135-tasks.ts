import { MigrationInterface, QueryRunner } from "typeorm";

export class Tasks1746551510135 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "task" (
                "id" varchar PRIMARY KEY NOT NULL,
                "titre" varchar NOT NULL,
                "done" boolean NOT NULL DEFAULT false,
                "edited" boolean NOT NULL DEFAULT false
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}

