/*
  Warnings:

  - You are about to drop the column `iconClass` on the `Multimedia` table. All the data in the column will be lost.

*/
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
    CONSTRAINT "Multimedia_multimediaTypeId_fkey" FOREIGN KEY ("multimediaTypeId") REFERENCES "MultimediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Multimedia" ("createdAt", "id", "multimediaTypeId", "name", "updatedAt", "url") SELECT "createdAt", "id", "multimediaTypeId", "name", "updatedAt", "url" FROM "Multimedia";
DROP TABLE "Multimedia";
ALTER TABLE "new_Multimedia" RENAME TO "Multimedia";
CREATE UNIQUE INDEX "Multimedia_url_key" ON "Multimedia"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
