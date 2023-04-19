/*
  Warnings:

  - You are about to drop the column `ole` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `ole`,
    ADD COLUMN `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
