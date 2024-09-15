-- CreateTable
CREATE TABLE "conversation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'Pending',

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_participant" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "conversation_id" TEXT NOT NULL,
    "participant_username" TEXT NOT NULL,

    CONSTRAINT "conversation_participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "conversation_id" TEXT NOT NULL,
    "from_username" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reported_profile" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "created_by_username" TEXT NOT NULL,
    "reported_username" TEXT NOT NULL,

    CONSTRAINT "reported_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocked_profile" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "blocked_by_username" TEXT NOT NULL,
    "blocked_username" TEXT NOT NULL,

    CONSTRAINT "blocked_profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participant" ADD CONSTRAINT "conversation_participant_participant_username_fkey" FOREIGN KEY ("participant_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_from_username_fkey" FOREIGN KEY ("from_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reported_profile" ADD CONSTRAINT "reported_profile_created_by_username_fkey" FOREIGN KEY ("created_by_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reported_profile" ADD CONSTRAINT "reported_profile_reported_username_fkey" FOREIGN KEY ("reported_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocked_profile" ADD CONSTRAINT "blocked_profile_blocked_by_username_fkey" FOREIGN KEY ("blocked_by_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocked_profile" ADD CONSTRAINT "blocked_profile_blocked_username_fkey" FOREIGN KEY ("blocked_username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;
