/*
  Warnings:

  - Made the column `created_by_username` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by_username` on table `signal` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_created_by_username_fkey";

-- DropForeignKey
ALTER TABLE "signal" DROP CONSTRAINT "signal_created_by_username_fkey";

-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "created_by_username" SET NOT NULL;

-- AlterTable
ALTER TABLE "signal" ALTER COLUMN "created_by_username" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "signal" ADD CONSTRAINT "signal_created_by_username_fkey" FOREIGN KEY ("created_by_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_created_by_username_fkey" FOREIGN KEY ("created_by_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;
