import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AddressService, PrismaService],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {}
