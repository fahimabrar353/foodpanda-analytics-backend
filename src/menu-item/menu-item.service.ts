import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, MenuItem } from '@prisma/client';

@Injectable()
export class MenuItemService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MenuItemCreateInput): Promise<MenuItem> {
    return this.prisma.menuItem.create({ data });
  }

  async findAll(): Promise<MenuItem[]> {
    return this.prisma.menuItem.findMany();
  }

  async findOne(id: number): Promise<MenuItem> {
    return this.prisma.menuItem.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.MenuItemUpdateInput,
  ): Promise<MenuItem> {
    return this.prisma.menuItem.update({ where: { id }, data });
  }

  async remove(id: number): Promise<MenuItem> {
    return this.prisma.menuItem.delete({ where: { id } });
  }
}
