/*
  Warnings:

  - You are about to drop the column `ticket_id` on the `purchases` table. All the data in the column will be lost.
  - You are about to drop the column `detail_id` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `paidTicket` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_venue_id` to the `ticket_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `ticket_type` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `purchases_ibfk_2`;

-- DropForeignKey
ALTER TABLE `tickets` DROP FOREIGN KEY `tickets_ibfk_1`;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `end_date` DATE NULL;

-- AlterTable
ALTER TABLE `purchases` DROP COLUMN `ticket_id`,
    ADD COLUMN `total_price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `ticket_type` ADD COLUMN `event_venue_id` INTEGER NOT NULL,
    ADD COLUMN `paidTicket` BOOLEAN NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `detail_id`,
    DROP COLUMN `paidTicket`,
    DROP COLUMN `price`;

-- CreateTable
CREATE TABLE `referral_discount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `points` INTEGER NULL,
    `discount_code` INTEGER NULL,
    `referral_number` INTEGER NULL,
    `expiredAt` DATE NOT NULL,
    `usedAt` DATE NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_purchasesTotickets` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_purchasesTotickets_AB_unique`(`A`, `B`),
    INDEX `_purchasesTotickets_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `event_venue_id` ON `ticket_type`(`event_venue_id`);

-- AddForeignKey
ALTER TABLE `referral_discount` ADD CONSTRAINT `referral_discount_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ticket_type` ADD CONSTRAINT `ticket_type_ibfk_1` FOREIGN KEY (`event_venue_id`) REFERENCES `event_venue`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_purchasesTotickets` ADD CONSTRAINT `_purchasesTotickets_A_fkey` FOREIGN KEY (`A`) REFERENCES `purchases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_purchasesTotickets` ADD CONSTRAINT `_purchasesTotickets_B_fkey` FOREIGN KEY (`B`) REFERENCES `tickets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
