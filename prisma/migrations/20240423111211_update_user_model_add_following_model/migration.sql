/*
  Warnings:

  - You are about to drop the `_following` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_following" DROP CONSTRAINT "_following_A_fkey";

-- DropForeignKey
ALTER TABLE "_following" DROP CONSTRAINT "_following_B_fkey";

-- DropTable
DROP TABLE "_following";

-- CreateTable
CREATE TABLE "Following" (
    "id" SERIAL NOT NULL,
    "followingId" INTEGER NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
