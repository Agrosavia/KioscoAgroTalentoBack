/*
  Warnings:

  - A unique constraint covering the columns `[multimediaId,eventId]` on the table `MultimediaOnEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MultimediaOnEvent_multimediaId_eventId_key" ON "MultimediaOnEvent"("multimediaId", "eventId");
