/*
  Warnings:

  - A unique constraint covering the columns `[bus_number]` on the table `buses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `buses_bus_number_key` ON `buses`(`bus_number`);
