import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1741182715765 implements MigrationInterface {
    name = 'InitDatabase1741182715765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`FK_a837a077c734b8f4106c6923685\` ON \`contract\``);
        await queryRunner.query(`DROP INDEX \`FK_cf9839a50efcca56cff91d68852\` ON \`contract\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_2f6b7d1366bd53dc977d1aeb2bb\``);
        await queryRunner.query(`ALTER TABLE \`device\` CHANGE \`roomId\` \`roomId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_b046318e0b341a7f72110b75857\``);
        await queryRunner.query(`ALTER TABLE \`payment\` CHANGE \`payment_date\` \`payment_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`payment\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_38554ade327a061ba620eee948b\``);
        await queryRunner.query(`ALTER TABLE \`request\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`violation\` DROP FOREIGN KEY \`FK_d1203c933fe7956ba747055be68\``);
        await queryRunner.query(`ALTER TABLE \`violation\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9a5b6e98e76999b2c6778a30eec\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'graduated', 'deleted') NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roomId\` \`roomId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`contract\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`contract\` CHANGE \`roomId\` \`roomId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_758d70a0e61243171e785989070\``);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`senderId\` \`senderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`receiverId\` \`receiverId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_2f6b7d1366bd53dc977d1aeb2bb\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_b046318e0b341a7f72110b75857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_38554ade327a061ba620eee948b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`violation\` ADD CONSTRAINT \`FK_d1203c933fe7956ba747055be68\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9a5b6e98e76999b2c6778a30eec\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_a837a077c734b8f4106c6923685\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contract\` ADD CONSTRAINT \`FK_cf9839a50efcca56cff91d68852\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_758d70a0e61243171e785989070\` FOREIGN KEY (\`receiverId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_758d70a0e61243171e785989070\``);
        await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_c0af34102c13c654955a0c5078b\``);
        await queryRunner.query(`ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_cf9839a50efcca56cff91d68852\``);
        await queryRunner.query(`ALTER TABLE \`contract\` DROP FOREIGN KEY \`FK_a837a077c734b8f4106c6923685\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9a5b6e98e76999b2c6778a30eec\``);
        await queryRunner.query(`ALTER TABLE \`violation\` DROP FOREIGN KEY \`FK_d1203c933fe7956ba747055be68\``);
        await queryRunner.query(`ALTER TABLE \`request\` DROP FOREIGN KEY \`FK_38554ade327a061ba620eee948b\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_b046318e0b341a7f72110b75857\``);
        await queryRunner.query(`ALTER TABLE \`device\` DROP FOREIGN KEY \`FK_2f6b7d1366bd53dc977d1aeb2bb\``);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`receiverId\` \`receiverId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notification\` CHANGE \`senderId\` \`senderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_758d70a0e61243171e785989070\` FOREIGN KEY (\`receiverId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_c0af34102c13c654955a0c5078b\` FOREIGN KEY (\`senderId\`) REFERENCES \`admin\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contract\` CHANGE \`roomId\` \`roomId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`contract\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roomId\` \`roomId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` enum ('active', 'inactive', 'graduated') NOT NULL DEFAULT ''active''`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9a5b6e98e76999b2c6778a30eec\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`violation\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`violation\` ADD CONSTRAINT \`FK_d1203c933fe7956ba747055be68\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`request\` ADD CONSTRAINT \`FK_38554ade327a061ba620eee948b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`payment\` CHANGE \`payment_date\` \`payment_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_b046318e0b341a7f72110b75857\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`device\` CHANGE \`roomId\` \`roomId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`device\` ADD CONSTRAINT \`FK_2f6b7d1366bd53dc977d1aeb2bb\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`username\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_cf9839a50efcca56cff91d68852\` ON \`contract\` (\`roomId\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_a837a077c734b8f4106c6923685\` ON \`contract\` (\`userId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\` (\`email\`)`);
    }

}
