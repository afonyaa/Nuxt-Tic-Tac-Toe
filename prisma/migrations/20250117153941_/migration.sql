/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_creatorId_fkey`;

-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_winnerId_fkey`;

-- DropForeignKey
ALTER TABLE `_PlayerGames` DROP FOREIGN KEY `_PlayerGames_B_fkey`;

-- DropIndex
DROP INDEX `Game_creatorId_fkey` ON `Game`;

-- DropIndex
DROP INDEX `Game_winnerId_fkey` ON `Game`;

-- AlterTable
ALTER TABLE `Game` MODIFY `winnerId` VARCHAR(191) NULL,
    MODIFY `creatorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_PlayerGames` MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_winnerId_fkey` FOREIGN KEY (`winnerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerGames` ADD CONSTRAINT `_PlayerGames_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
