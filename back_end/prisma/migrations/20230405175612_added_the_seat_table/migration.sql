-- CreateTable
CREATE TABLE `seat` (
    `seat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bus_id` INTEGER NOT NULL,
    `seat_number` INTEGER NOT NULL,

    INDEX `test4`(`bus_id`),
    PRIMARY KEY (`seat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `seat` ADD CONSTRAINT `test4` FOREIGN KEY (`bus_id`) REFERENCES `buses`(`bus_id`) ON DELETE CASCADE ON UPDATE CASCADE;
