import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(orderData: any): Promise<any> {
    try {
      const createdOrder = await this.prisma.orders.create({
        data: {
          order_address: orderData.order_address,
          order_code: orderData.order_code,
          ordered_at: orderData.ordered_at.date,
          total_value: orderData.total_value,
          subtotal: orderData.subtotal,
          vendor: orderData.vendor.name,
          order_products: {
            create: orderData.order_products.map((product) => ({
              name: product.name,
              price: product.total_price,
            })),
          },
        },
        include: {
          order_products: true,
        },
      });

      return createdOrder;
    } catch (error) {
      throw new Error(`Error creating order: ${error}`);
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
