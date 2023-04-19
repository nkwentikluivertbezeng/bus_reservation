-- CreateTable
CREATE TABLE `booking` (
    `booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `schedule_id` INTEGER NOT NULL,
    `booking_date` DATE NOT NULL,

    INDEX `schedule_id`(`schedule_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buses` (
    `bus_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bus_number` VARCHAR(10) NOT NULL,
    `seats` INTEGER NOT NULL DEFAULT 30,

    PRIMARY KEY (`bus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `schedule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bus_id` INTEGER NOT NULL,
    `departure_date` DATE NOT NULL,
    `departure_time` DATETIME(0) NOT NULL,
    `location` VARCHAR(20) NOT NULL,
    `destination` VARCHAR(20) NOT NULL,
    `bus_fare` INTEGER NOT NULL,

    INDEX `test2`(`bus_id`),
    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket` (
    `ticket_id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `ticket_number` VARCHAR(20) NOT NULL,

    INDEX `test3`(`booking_id`),
    PRIMARY KEY (`ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(15) NOT NULL,
    `lname` VARCHAR(15) NOT NULL,
    `password` TEXT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `test2` FOREIGN KEY (`bus_id`) REFERENCES `buses`(`bus_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticket` ADD CONSTRAINT `test3` FOREIGN KEY (`booking_id`) REFERENCES `booking`(`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;
