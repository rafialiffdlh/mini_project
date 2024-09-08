-- AlterTable
ALTER TABLE `users` ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `gender` ENUM('wanita', 'pria') NULL;
