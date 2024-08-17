-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "kindeId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "emailAddress" TEXT,
    "username" TEXT
);
INSERT INTO "new_User" ("createdAt", "emailAddress", "firstName", "id", "kindeId", "lastName", "updatedAt", "username") SELECT "createdAt", "emailAddress", "firstName", "id", "kindeId", "lastName", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_kindeId_key" ON "User"("kindeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
