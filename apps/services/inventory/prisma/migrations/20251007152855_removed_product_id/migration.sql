/*
  Warnings:

  - You are about to drop the column `productId` on the `Inventory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Inventory_productId_key";

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "productId";
