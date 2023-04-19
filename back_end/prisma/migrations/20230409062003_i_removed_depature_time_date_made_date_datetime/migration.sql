/*
  Warnings:

  - You are about to drop the column `departure_time` on the `schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `departure_time`,
    MODIFY `departure_date` DATETIME(0) NOT NULL;
