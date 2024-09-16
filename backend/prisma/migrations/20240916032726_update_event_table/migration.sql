/*
  Warnings:

  - You are about to drop the column `duration` on the `events` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `duration`,
    ADD COLUMN `default_discount` DECIMAL(65, 30) NULL,
    ADD COLUMN `default_discount_date` DATE NULL,
    ADD COLUMN `end_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `start_time` VARCHAR(191) NOT NULL;
