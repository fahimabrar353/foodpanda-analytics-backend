import { Module } from '@nestjs/common';
import { OrderedMenuItemService } from './ordered-menu-item.service';
import { OrderedMenuItemController } from './ordered-menu-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrderedMenuItemService, PrismaService],
  controllers: [OrderedMenuItemController],
  exports: [OrderedMenuItemService],
})
export class OrderedMenuItemModule {}
