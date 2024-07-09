import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderedMenuItemService } from './ordered-menu-item.service';
import { Prisma } from '@prisma/client';

@Controller('ordered-menu-item')
export class OrderedMenuItemController {
  constructor(
    private readonly orderedMenuItemService: OrderedMenuItemService,
  ) {}

  @Post()
  create(@Body() createOrderedMenuItemDto: Prisma.OrderedMenuItemCreateInput) {
    return this.orderedMenuItemService.create(createOrderedMenuItemDto);
  }

  @Get()
  findAll() {
    return this.orderedMenuItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderedMenuItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderedMenuItemDto: Prisma.OrderedMenuItemUpdateInput,
  ) {
    return this.orderedMenuItemService.update(+id, updateOrderedMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderedMenuItemService.remove(+id);
  }
}
