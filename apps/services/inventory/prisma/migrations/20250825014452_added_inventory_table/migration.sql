-- CreateEnum
CREATE TYPE "INVENTORY"."InventoryStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'OUT_OF_STOCK');

-- CreateTable
CREATE TABLE "INVENTORY"."Inventory" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "INVENTORY"."InventoryStatus" NOT NULL,
    "productID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);
