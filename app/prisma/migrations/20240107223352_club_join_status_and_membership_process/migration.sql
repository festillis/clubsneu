/*
  Warnings:

  - Added the required column `joinStatus` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `membershipProcess` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "joinStatus" TEXT NOT NULL,
ADD COLUMN     "membershipProcess" TEXT NOT NULL;
