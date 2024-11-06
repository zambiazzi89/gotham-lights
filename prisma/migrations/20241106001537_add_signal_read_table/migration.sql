-- CreateTable
CREATE TABLE "signal_read_by_username" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "read" BOOLEAN NOT NULL DEFAULT true,
    "signal_id" UUID NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "signal_read_by_username_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "signal_read_by_username" ADD CONSTRAINT "signal_read_by_username_signal_id_fkey" FOREIGN KEY ("signal_id") REFERENCES "signal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signal_read_by_username" ADD CONSTRAINT "signal_read_by_username_username_fkey" FOREIGN KEY ("username") REFERENCES "profile"("username") ON DELETE CASCADE ON UPDATE CASCADE;
