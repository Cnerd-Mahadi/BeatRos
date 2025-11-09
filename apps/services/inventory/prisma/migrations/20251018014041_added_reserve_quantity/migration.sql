/*
  Warnings:

  - You are about to drop the column `quantity` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `total_quantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "INVENTORY"."Inventory" DROP COLUMN "quantity",
ADD COLUMN     "reserved_quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_quantity" INTEGER NOT NULL;
