/*
  Warnings:

  - Added the required column `inventoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PRODUCT"."Product" ADD COLUMN     "inventoryId" TEXT NOT NULL;
