-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MultimediaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "verboseName" TEXT NOT NULL,
    "iconClass" TEXT NOT NULL DEFAULT 'fa-photo-film',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MultimediaType" ("createdAt", "id", "name", "updatedAt", "verboseName") SELECT "createdAt", "id", "name", "updatedAt", "verboseName" FROM "MultimediaType";
DROP TABLE "MultimediaType";
ALTER TABLE "new_MultimediaType" RENAME TO "MultimediaType";
CREATE UNIQUE INDEX "MultimediaType_name_key" ON "MultimediaType"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
