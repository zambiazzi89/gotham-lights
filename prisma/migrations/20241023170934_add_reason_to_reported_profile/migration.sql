/*
  Warnings:

  - You are about to drop the column `created_by_username` on the `reported_profile` table. All the data in the column will be lost.
  - Added the required column `reason` to the `reported_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reported_by_username` to the `reported_profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reported_profile" DROP CONSTRAINT "reported_profile_created_by_username_fkey";

-- AlterTable
ALTER TABLE "reported_profile" DROP COLUMN "created_by_username",
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "reported_by_username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "reported_profile" ADD CONSTRAINT "reported_profile_reported_by_username_fkey" FOREIGN KEY ("reported_by_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;
