import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.appService.getOrderById(+id);
  }

  @Get()
  async getAllOrders() {
    return this.appService.getAllOrders();
  }

  @Post()
  create(@Body() createOrderDto: Prisma.OrderCreateInput) {
    return this.appService.createOrder(createOrderDto);
  }
}
