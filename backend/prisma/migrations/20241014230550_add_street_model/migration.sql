/*
  Warnings:

  - You are about to drop the column `condominium_id` on the `lot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `lot` DROP FOREIGN KEY `Lot_condominium_id_fkey`;

-- AlterTable
ALTER TABLE `lot` DROP COLUMN `condominium_id`,
    ADD COLUMN `street_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Street` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `condominium_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Street` ADD CONSTRAINT `Street_condominium_id_fkey` FOREIGN KEY (`condominium_id`) REFERENCES `Condominium`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lot` ADD CONSTRAINT `Lot_street_id_fkey` FOREIGN KEY (`street_id`) REFERENCES `Street`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
