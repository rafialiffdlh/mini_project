/*
  Warnings:

  - You are about to drop the column `referral_number` on the `referral_discount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `referral_discount` DROP COLUMN `referral_number`;

-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `referral_number` INTEGER NULL;
