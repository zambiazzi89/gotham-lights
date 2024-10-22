/*
  Warnings:

  - Added the required column `to_username` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "to_username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_to_username_fkey" FOREIGN KEY ("to_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;
