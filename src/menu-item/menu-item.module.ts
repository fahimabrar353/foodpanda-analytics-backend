import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MenuItemService, PrismaService],
  controllers: [MenuItemController],
  exports: [MenuItemService],
})
export class MenuItemModule {}
