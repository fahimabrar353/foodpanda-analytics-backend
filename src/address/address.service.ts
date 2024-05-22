import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Address } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    return this.prisma.address.create({ data });
  }

  async findAll(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }

  async findOne(id: number): Promise<Address> {
    return this.prisma.address.findUnique({ where: { id } });
  }

  async searchByName(name: string) {
    console.log(`Searching for addresses containing: ${name}`);
    const result = await this.prisma.address.findMany({
      where: {
        address_line_1: {
          contains: name,
          // mode: 'insensitive',
        },
      },
    });
    console.log(`Search result: `, result);
    return result;
  }

  async update(id: number, data: Prisma.AddressUpdateInput): Promise<Address> {
    return this.prisma.address.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Address> {
    return this.prisma.address.delete({ where: { id } });
  }
}
