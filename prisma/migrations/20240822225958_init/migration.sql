-- CreateTable
CREATE TABLE "Multimedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "multimediaTypeId" INTEGER NOT NULL,
    "url" TEXT,
    "iconClass" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Multimedia_multimediaTypeId_fkey" FOREIGN KEY ("multimediaTypeId") REFERENCES "MultimediaType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "verboseName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "tertiaryColor" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MultimediaType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "verboseName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_MultimediaToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MultimediaToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Multimedia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MultimediaToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Multimedia_url_key" ON "Multimedia"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MultimediaType_name_key" ON "MultimediaType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MultimediaToTag_AB_unique" ON "_MultimediaToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MultimediaToTag_B_index" ON "_MultimediaToTag"("B");
