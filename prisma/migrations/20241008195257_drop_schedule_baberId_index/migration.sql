-- Drop Foreign Key Constraint
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_barberId_fkey`;

-- Drop Index
DROP INDEX `Schedule_barberId_key` ON `schedule`;

-- Add Index Back (if necessary)
CREATE INDEX `Schedule_barberId_key` ON `schedule` (`barberId`);