/*
  Warnings:

  - A unique constraint covering the columns `[participant_username]` on the table `conversation_participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `last_message` to the `conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_sent_by` to the `conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `read` to the `conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversation" ADD COLUMN     "last_message" TEXT NOT NULL,
ADD COLUMN     "last_sent_by" TEXT NOT NULL,
ADD COLUMN     "read" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "conversation_participant_participant_username_key" ON "conversation_participant"("participant_username");

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_last_sent_by_fkey" FOREIGN KEY ("last_sent_by") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;
