import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  // async getAllOrders() {
  //   return this.prisma.order.findMany({
  //     include: {
  //       restaurant: true,
  //       address: true,
  //       voucher: true,
  //       payment_method: true,
  //       ordered_items: {
  //         include: {
  //           menu_items: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // async getOrderById(orderId: number) {
  //   return this.prisma.order.findUnique({
  //     where: { id: orderId },
  //     include: {
  //       restaurant: true,
  //       address: true,
  //       voucher: true,
  //       payment_method: true,
  //       ordered_items: {
  //         include: {
  //           menu_items: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
