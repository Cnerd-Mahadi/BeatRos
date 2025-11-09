-- CreateTable
CREATE TABLE "PRODUCT"."Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "description" TEXT,
    "priceInCents" INTEGER NOT NULL,
    "brandID" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "brandId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PRODUCT"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PRODUCT"."ProductCategory" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PRODUCT"."Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "PRODUCT"."Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_productID_categoryID_key" ON "PRODUCT"."ProductCategory"("productID", "categoryID");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "PRODUCT"."Brand"("slug");

-- AddForeignKey
ALTER TABLE "PRODUCT"."Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "PRODUCT"."Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PRODUCT"."ProductCategory" ADD CONSTRAINT "ProductCategory_productID_fkey" FOREIGN KEY ("productID") REFERENCES "PRODUCT"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PRODUCT"."ProductCategory" ADD CONSTRAINT "ProductCategory_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "PRODUCT"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
