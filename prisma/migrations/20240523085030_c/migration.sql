/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_code]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurant_code_key" ON "Restaurant"("restaurant_code");
