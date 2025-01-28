/*
  Warnings:

  - Made the column `field` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Game` MODIFY `field` JSON NOT NULL;
