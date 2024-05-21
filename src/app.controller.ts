import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

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
}
