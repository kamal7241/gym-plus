/*
  Warnings:

  - You are about to alter the column `surgeries` on the `trainee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `trainee` MODIFY `surgeries` BOOLEAN NULL;
