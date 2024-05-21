import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PaymentMethodService, PrismaService],
  controllers: [PaymentMethodController],
})
export class PaymentMethodModule {}
