import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, OrderedMenuItem } from '@prisma/client';

@Injectable()
export class OrderedMenuItemService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.OrderedMenuItemCreateInput,
  ): Promise<OrderedMenuItem> {
    return this.prisma.orderedMenuItem.create({ data });
  }

  async findAll(): Promise<OrderedMenuItem[]> {
    return this.prisma.orderedMenuItem.findMany();
  }

  async findOne(id: number): Promise<OrderedMenuItem> {
    return this.prisma.orderedMenuItem.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.OrderedMenuItemUpdateInput,
  ): Promise<OrderedMenuItem> {
    return this.prisma.orderedMenuItem.update({ where: { id }, data });
  }

  async remove(id: number): Promise<OrderedMenuItem> {
    return this.prisma.orderedMenuItem.delete({ where: { id } });
  }
}
