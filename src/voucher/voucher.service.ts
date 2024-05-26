import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Voucher } from '@prisma/client';

@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.VoucherCreateInput): Promise<Voucher> {
    return this.prisma.voucher.create({
      data,
    });
  }

  async findAll(): Promise<Voucher[]> {
    return this.prisma.voucher.findMany();
  }

  async findByVoucherCode(voucher_code: string): Promise<Voucher> {
    return this.prisma.voucher.findUnique({
      where: { voucher_code },
    });
  }

  async update(id: number, data: Prisma.VoucherUpdateInput): Promise<Voucher> {
    return this.prisma.voucher.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Voucher> {
    return this.prisma.voucher.delete({
      where: { id },
    });
  }
}
