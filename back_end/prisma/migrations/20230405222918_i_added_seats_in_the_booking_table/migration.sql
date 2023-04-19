/*
  Warnings:

  - Added the required column `seat_number` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `seat_number` INTEGER NOT NULL;
