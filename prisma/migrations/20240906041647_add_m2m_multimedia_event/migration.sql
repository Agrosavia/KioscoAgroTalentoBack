-- CreateTable
CREATE TABLE "MultimediaOnEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "multimediaId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "iconClass" TEXT,
    "isCarrousel" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MultimediaOnEvent_multimediaId_fkey" FOREIGN KEY ("multimediaId") REFERENCES "Multimedia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MultimediaOnEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
