import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentMethodService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PaymentMethodCreateInput): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.create({ data });
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.prisma.paymentMethod.findMany();
  }

  async findOne(id: number): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.findUnique({ where: { id } });
  }

  async findByPaymentTypeCode(
    payment_type_code: string,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.findUnique({
      where: { payment_type_code },
    });
  }

  async update(
    id: number,
    data: Prisma.PaymentMethodUpdateInput,
  ): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.update({ where: { id }, data });
  }

  async remove(id: number): Promise<PaymentMethod> {
    return this.prisma.paymentMethod.delete({ where: { id } });
  }
}
