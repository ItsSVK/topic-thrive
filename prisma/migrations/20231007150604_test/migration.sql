-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "msgId" INTEGER NOT NULL,
    "msg" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
