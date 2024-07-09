/*
  Warnings:

  - Made the column `restaurant_code` on table `Restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "restaurant_code" SET NOT NULL;
