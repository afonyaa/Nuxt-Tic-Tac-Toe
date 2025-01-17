-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_winnerId_fkey`;

-- DropIndex
DROP INDEX `Game_winnerId_fkey` ON `Game`;

-- AlterTable
ALTER TABLE `Game` MODIFY `winnerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_winnerId_fkey` FOREIGN KEY (`winnerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
