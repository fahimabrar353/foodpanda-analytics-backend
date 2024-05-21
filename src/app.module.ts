import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoucherModule } from './voucher/voucher.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { AddressModule } from './address/address.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrderModule } from './order/order.module';
import { OrderedMenuItemModule } from './ordered-menu-item/ordered-menu-item.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    VoucherModule,
    PaymentMethodModule,
    AddressModule,
    RestaurantModule,
    MenuItemModule,
    OrderModule,
    OrderedMenuItemModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
