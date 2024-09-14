-- AlterTable
ALTER TABLE `purchases` ADD COLUMN `invoice_no` VARCHAR(100) NULL,
    ADD COLUMN `referal_id` INTEGER NULL,
    MODIFY `isPurchased` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `isPurchased` BOOLEAN NOT NULL DEFAULT false;
