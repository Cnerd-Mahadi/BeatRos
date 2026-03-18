-- AlterTable
ALTER TABLE "PRODUCT"."Brand" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PRODUCT"."Category" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PRODUCT"."Product" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PRODUCT"."ProductCategory" ALTER COLUMN "updatedAt" DROP DEFAULT;
