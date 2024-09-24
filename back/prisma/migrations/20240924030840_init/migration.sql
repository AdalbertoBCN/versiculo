-- CreateTable
CREATE TABLE "Book" (
    "number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "testament" TEXT NOT NULL,
    "isGospel" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Chapter" (
    "bookNumber" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    PRIMARY KEY ("bookNumber", "number"),
    CONSTRAINT "Chapter_bookNumber_fkey" FOREIGN KEY ("bookNumber") REFERENCES "Book" ("number") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Verse" (
    "bookNumber" INTEGER NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("bookNumber", "chapterNumber", "number"),
    CONSTRAINT "Verse_bookNumber_chapterNumber_fkey" FOREIGN KEY ("bookNumber", "chapterNumber") REFERENCES "Chapter" ("bookNumber", "number") ON DELETE RESTRICT ON UPDATE CASCADE
);
