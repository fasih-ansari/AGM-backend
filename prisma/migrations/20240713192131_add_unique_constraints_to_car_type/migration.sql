/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CarType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `CarType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CarType_name_key` ON `CarType`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `CarType_companyId_key` ON `CarType`(`companyId`);
