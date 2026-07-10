/*
  Warnings:

  - Added the required column `caseId` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Referral" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'SENT',
    "sharedData" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "recommendationId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "Referral_recommendationId_fkey" FOREIGN KEY ("recommendationId") REFERENCES "Recommendation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Referral_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Referral" ("createdAt", "id", "recommendationId", "sharedData", "status", "updatedAt") SELECT "createdAt", "id", "recommendationId", "sharedData", "status", "updatedAt" FROM "Referral";
DROP TABLE "Referral";
ALTER TABLE "new_Referral" RENAME TO "Referral";
CREATE UNIQUE INDEX "Referral_recommendationId_key" ON "Referral"("recommendationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
