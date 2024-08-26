/*
  Warnings:

  - You are about to drop the column `createdByProfileId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdByProfileId` on the `Signal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_createdByProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Signal" DROP CONSTRAINT "Signal_createdByProfileId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdByProfileId",
ADD COLUMN     "createdByUsername" TEXT;

-- AlterTable
ALTER TABLE "Signal" DROP COLUMN "createdByProfileId",
ADD COLUMN     "createdByUsername" TEXT;

-- AddForeignKey
ALTER TABLE "Signal" ADD CONSTRAINT "Signal_createdByUsername_fkey" FOREIGN KEY ("createdByUsername") REFERENCES "Profile"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_createdByUsername_fkey" FOREIGN KEY ("createdByUsername") REFERENCES "Profile"("username") ON DELETE SET NULL ON UPDATE CASCADE;
