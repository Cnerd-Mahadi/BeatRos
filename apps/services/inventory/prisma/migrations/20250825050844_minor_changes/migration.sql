/*
  Warnings:

  - You are about to drop the column `productID` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "INVENTORY"."Inventory" DROP COLUMN "productID",
ADD COLUMN     "productId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "INVENTORY"."Inventory"("productId");
