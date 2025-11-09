/*
  Warnings:

  - You are about to drop the column `productId` on the `Inventory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "INVENTORY"."Inventory_productId_key";

-- AlterTable
ALTER TABLE "INVENTORY"."Inventory" DROP COLUMN "productId";
