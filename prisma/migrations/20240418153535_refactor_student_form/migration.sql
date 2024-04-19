/*
  Warnings:

  - You are about to drop the column `status` on the `forms` table. All the data in the column will be lost.
  - Added the required column `status` to the `student_forms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forms" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "student_forms" ADD COLUMN     "status" TEXT NOT NULL;
