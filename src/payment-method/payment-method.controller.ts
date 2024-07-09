import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { Prisma } from '@prisma/client';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  create(@Body() createPaymentMethodDto: Prisma.PaymentMethodCreateInput) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: Prisma.PaymentMethodUpdateInput,
  ) {
    return this.paymentMethodService.update(+id, updatePaymentMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.remove(+id);
  }
}
