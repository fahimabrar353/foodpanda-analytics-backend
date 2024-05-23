/*
  Warnings:

  - You are about to drop the column `restaurant_id` on the `MenuItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "restaurant_id",
ADD COLUMN     "restaurantId" INTEGER,
ADD COLUMN     "restaurant_code" TEXT;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
