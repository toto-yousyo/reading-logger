-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "publisher" TEXT NOT NULL,
    "published" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "read" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "memo" TEXT NOT NULL
);
