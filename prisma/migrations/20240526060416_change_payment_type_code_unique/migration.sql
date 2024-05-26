/*
  Warnings:

  - A unique constraint covering the columns `[payment_type_code]` on the table `PaymentMethod` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_payment_type_code_key" ON "PaymentMethod"("payment_type_code");
