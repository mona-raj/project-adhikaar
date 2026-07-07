/*
  Warnings:

  - You are about to drop the column `safetyStatus` on the `HelpRequest` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Case" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "evaluatedSafetyStatus" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "evaluatedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "helpRequestId" TEXT NOT NULL,
    CONSTRAINT "Case_helpRequestId_fkey" FOREIGN KEY ("helpRequestId") REFERENCES "HelpRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Case" ("createdAt", "helpRequestId", "id", "status", "updatedAt") SELECT "createdAt", "helpRequestId", "id", "status", "updatedAt" FROM "Case";
DROP TABLE "Case";
ALTER TABLE "new_Case" RENAME TO "Case";
CREATE UNIQUE INDEX "Case_helpRequestId_key" ON "Case"("helpRequestId");
CREATE TABLE "new_HelpRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "declaredSafetyStatus" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "location" JSONB,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "preferredLanguageId" TEXT,
    CONSTRAINT "HelpRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "HelpRequest_preferredLanguageId_fkey" FOREIGN KEY ("preferredLanguageId") REFERENCES "Language" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_HelpRequest" ("contactEmail", "contactName", "contactPhone", "createdAt", "description", "id", "location", "preferredLanguageId", "updatedAt", "userId") SELECT "contactEmail", "contactName", "contactPhone", "createdAt", "description", "id", "location", "preferredLanguageId", "updatedAt", "userId" FROM "HelpRequest";
DROP TABLE "HelpRequest";
ALTER TABLE "new_HelpRequest" RENAME TO "HelpRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
