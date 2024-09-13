/*
  Warnings:

  - You are about to drop the column `purchased_at` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the column `seat_number` on the `tickets` table. All the data in the column will be lost.
  - You are about to drop the `_purchasestotickets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isPurchased` to the `purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_purchasestotickets` DROP FOREIGN KEY `_purchasesTotickets_A_fkey`;

-- DropForeignKey
ALTER TABLE `_purchasestotickets` DROP FOREIGN KEY `_purchasesTotickets_B_fkey`;

-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `isPurchased` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `tickets` DROP COLUMN `purchased_at`,
    DROP COLUMN `seat_number`,
    ADD COLUMN `purchase_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_purchasestotickets`;

-- CreateIndex
CREATE INDEX `purchase_id` ON `tickets`(`purchase_id`);

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_ibfk_4` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
