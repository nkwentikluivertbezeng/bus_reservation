/*
  Warnings:

  - Added the required column `is_reserved` to the `seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `seat` ADD COLUMN `is_reserved` BOOLEAN NOT NULL;
