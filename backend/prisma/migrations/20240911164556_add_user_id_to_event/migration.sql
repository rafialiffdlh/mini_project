-- AlterTable
ALTER TABLE `events` ADD COLUMN `user_id` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `user_id` ON `events`(`user_id`);

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
