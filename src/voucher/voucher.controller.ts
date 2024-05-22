import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { Prisma } from '@prisma/client';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: Prisma.VoucherCreateInput) {
    return this.voucherService.create(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVoucherDto: Prisma.VoucherUpdateInput,
  ) {
    return this.voucherService.update(+id, updateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(+id);
  }
}
