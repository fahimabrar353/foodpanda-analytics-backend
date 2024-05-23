import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { AddressModule } from 'src/address/address.module';
import { MenuItemModule } from 'src/menu-item/menu-item.module';
import { OrderedMenuItemModule } from 'src/ordered-menu-item/ordered-menu-item.module';
import { PaymentMethodModule } from 'src/payment-method/payment-method.module';
import { VoucherModule } from 'src/voucher/voucher.module';

@Module({
  imports: [
    AddressModule,
    MenuItemModule,
    OrderedMenuItemModule,
    PaymentMethodModule,
    RestaurantModule,
    VoucherModule,
  ],
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
})
export class OrderModule {}
