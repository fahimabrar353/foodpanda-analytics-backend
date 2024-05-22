import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Restaurant } from '@prisma/client';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
    return this.prisma.restaurant.create({ data });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  async searchByName(name: string): Promise<Restaurant[]> {
    console.log(`Searching for restaurant containing: ${name}`);
    const result = await this.prisma.restaurant.findMany({
      where: {
        restaurant_name: {
          contains: name,
          // mode: 'insensitive',
        },
      },
    });
    console.log(`Search result: `, result);
    return result;
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.RestaurantUpdateInput,
  ): Promise<Restaurant> {
    return this.prisma.restaurant.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Restaurant> {
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
