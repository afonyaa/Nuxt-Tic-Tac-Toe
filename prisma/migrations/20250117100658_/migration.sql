/*
  Warnings:

  - You are about to drop the column `field` on the `Game` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to alter the column `winnerId` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rating` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `_games` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Game` DROP FOREIGN KEY `Game_winnerId_fkey`;

-- DropForeignKey
ALTER TABLE `_games` DROP FOREIGN KEY `_games_A_fkey`;

-- DropForeignKey
ALTER TABLE `_games` DROP FOREIGN KEY `_games_B_fkey`;

-- DropIndex
DROP INDEX `Game_winnerId_fkey` ON `Game`;

-- AlterTable
ALTER TABLE `Game` DROP COLUMN `field`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `creatorId` INTEGER NOT NULL,
    MODIFY `status` ENUM('Finished', 'FinishedDraw', 'Pending', 'InProgress') NOT NULL DEFAULT 'Pending',
    MODIFY `winnerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `rating`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `_games`;

-- CreateTable
CREATE TABLE `_PlayerGames` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlayerGames_AB_unique`(`A`, `B`),
    INDEX `_PlayerGames_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_login_key` ON `User`(`login`);

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_winnerId_fkey` FOREIGN KEY (`winnerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerGames` ADD CONSTRAINT `_PlayerGames_A_fkey` FOREIGN KEY (`A`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerGames` ADD CONSTRAINT `_PlayerGames_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
