-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Multimedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "multimediaTypeId" INTEGER NOT NULL,
    "url" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Multimedia_multimediaTypeId_fkey" FOREIGN KEY ("multimediaTypeId") REFERENCES "MultimediaType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Multimedia" ("createdAt", "id", "multimediaTypeId", "name", "updatedAt", "url") SELECT "createdAt", "id", "multimediaTypeId", "name", "updatedAt", "url" FROM "Multimedia";
DROP TABLE "Multimedia";
ALTER TABLE "new_Multimedia" RENAME TO "Multimedia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
