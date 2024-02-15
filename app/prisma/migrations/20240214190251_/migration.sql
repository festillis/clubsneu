/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ClubMembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClubOwners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClubSubscribers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClubMembers" DROP CONSTRAINT "_ClubMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubMembers" DROP CONSTRAINT "_ClubMembers_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClubOwners" DROP CONSTRAINT "_ClubOwners_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubOwners" DROP CONSTRAINT "_ClubOwners_B_fkey";

-- DropForeignKey
ALTER TABLE "_ClubSubscribers" DROP CONSTRAINT "_ClubSubscribers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubSubscribers" DROP CONSTRAINT "_ClubSubscribers_B_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name";

-- DropTable
DROP TABLE "_ClubMembers";

-- DropTable
DROP TABLE "_ClubOwners";

-- DropTable
DROP TABLE "_ClubSubscribers";

-- CreateTable
CREATE TABLE "ClubOwner" (
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "ClubOwner_pkey" PRIMARY KEY ("userId","clubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- AddForeignKey
ALTER TABLE "ClubOwner" ADD CONSTRAINT "ClubOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubOwner" ADD CONSTRAINT "ClubOwner_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
