-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MultimediaOnEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "multimediaId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "iconClass" TEXT,
    "isCarrousel" BOOLEAN NOT NULL DEFAULT false,
    "sortingOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MultimediaOnEvent_multimediaId_fkey" FOREIGN KEY ("multimediaId") REFERENCES "Multimedia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MultimediaOnEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MultimediaOnEvent" ("createdAt", "eventId", "iconClass", "id", "isCarrousel", "multimediaId", "sortingOrder", "updatedAt") SELECT "createdAt", "eventId", "iconClass", "id", "isCarrousel", "multimediaId", "sortingOrder", "updatedAt" FROM "MultimediaOnEvent";
DROP TABLE "MultimediaOnEvent";
ALTER TABLE "new_MultimediaOnEvent" RENAME TO "MultimediaOnEvent";
CREATE UNIQUE INDEX "MultimediaOnEvent_multimediaId_eventId_key" ON "MultimediaOnEvent"("multimediaId", "eventId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
