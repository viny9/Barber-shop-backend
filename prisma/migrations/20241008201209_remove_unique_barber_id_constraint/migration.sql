-- DropIndex
DROP INDEX `Schedule_barberId_key` ON `schedule`;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_barberId_fkey` FOREIGN KEY (`barberId`) REFERENCES `Barber`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
