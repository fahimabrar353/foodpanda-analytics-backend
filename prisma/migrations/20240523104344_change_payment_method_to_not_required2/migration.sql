-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_payment_method_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "payment_method_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
