/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `MenuItem` table. All the data in the column will be lost.
  - Made the column `restaurant_code` on table `MenuItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_restaurantId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "restaurantId",
ALTER COLUMN "restaurant_code" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_restaurant_code_fkey" FOREIGN KEY ("restaurant_code") REFERENCES "Restaurant"("restaurant_code") ON DELETE RESTRICT ON UPDATE CASCADE;
