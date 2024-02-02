/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "discordUrl" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "websiteUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Club_email_key" ON "Club"("email");
