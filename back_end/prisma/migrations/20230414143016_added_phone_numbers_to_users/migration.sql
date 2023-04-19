/*
  Warnings:

  - Added the required column `departure_time` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `booking_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `departure_time` DATETIME(3) NOT NULL,
    MODIFY `departure_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `ole` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    ADD COLUMN `phone_number` INTEGER NOT NULL DEFAULT 0,
    MODIFY `password` VARCHAR(15) NULL;
