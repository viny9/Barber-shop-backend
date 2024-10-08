/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BarberShop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `BarberShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `barbershop` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `BarberShop_name_key` ON `BarberShop`(`name`);
