/*
  Warnings:

  - You are about to drop the column `brandID` on the `Product` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brandID",
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;
