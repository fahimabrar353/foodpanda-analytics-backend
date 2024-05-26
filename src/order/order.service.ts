import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Order } from '@prisma/client';
import { AddressService } from 'src/address/address.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { MenuItemService } from 'src/menu-item/menu-item.service';
import { OrderedMenuItemService } from 'src/ordered-menu-item/ordered-menu-item.service';
import { PaymentMethodService } from 'src/payment-method/payment-method.service';
import { VoucherService } from 'src/voucher/voucher.service';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private addressService: AddressService,
    private menuItemService: MenuItemService,
    private orderedMenuItemService: OrderedMenuItemService,
    private paymentMethodService: PaymentMethodService,
    private restaurantService: RestaurantService,
    private voucherService: VoucherService,
  ) {}

  async create(data): Promise<Order> {
    return this.prisma.order.create({ data });
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async findOne(id: number): Promise<Order> {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return this.prisma.order.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }

  async findByOrderCode(code: string): Promise<Order> {
    const result = await this.prisma.order.findUnique({
      where: { order_code: code },
    });
    return result;
  }

  async importOrder() {
    const jsonData = JSON.parse(
      fs.readFileSync(path.join(__dirname, './../../sampleData.json'), 'utf-8'),
    );
    for (const order of jsonData.data.items) {
      try {
        await this.createOrder(order);
      } catch (error) {
        console.log(error);
      }
    }
    console.log('END==================');
  }

  async createOrder(jsonData: any) {
    //======================  restaurant  ==========================================================================

    const restaurant = await this.restaurantService.findByCode(
      jsonData.vendor.code,
    );
    console.log('Order Processed=================');

    let restaurant_id = undefined;
    let address_id = undefined;

    if (restaurant) {
      console.log('Restaurant Found in DB: ');
      restaurant_id = restaurant.id;
    } else {
      const created_address = await this.addressService.create({
        city: jsonData?.delivery_address?.city ?? '',
        address_line_1: jsonData?.delivery_address?.address_line_1 ?? '',
        address_line_2: jsonData?.delivery_address?.address_line_2 ?? '',
        flat_number: jsonData?.delivery_address?.flat_number ?? '',
        latitude: jsonData?.delivery_address?.latitude ?? 0,
        longitude: jsonData?.delivery_address?.longitude ?? 0,
      });
      address_id = created_address.id;

      console.log('addressCreated');

      const created_restaurant = await this.restaurantService.create({
        restaurant_name: jsonData.vendor.name,
        restaurant_code: jsonData.vendor.code,
        address: { connect: { id: address_id } },
      });
      console.log('restaurantCreated');
      restaurant_id = created_restaurant.id;
    }
    console.log(restaurant_id);

    //======================  menuItem  ==========================================================================
    let menuItem_id: any[] = [];

    for (const orderProduct of jsonData.order_products) {
      const menuItem = await this.menuItemService.searchByName(
        orderProduct.name,
      );

      if (menuItem.length > 0) {
        console.log('MenuItem Found in DB: ');
        menuItem_id.push(menuItem[0].id);
      } else {
        const created_menuItem = await this.menuItemService.create({
          restaurant: { connect: { restaurant_code: jsonData.vendor.code } },
          item_name: orderProduct.name,
          price: orderProduct.price_attributes.value,
        });
        menuItem_id.push(created_menuItem.id);
      }

      // Use the menuItem_id as needed
    }
    console.log(menuItem_id);

    //====================== address ===============================================================================

    const address = await this.addressService.findByAddressLine1(
      jsonData?.delivery_address?.address_line_1 ?? '',
    );

    // let address_id = undefined;

    if (address.length > 0) {
      console.log('Address Found in DB: ');
      address_id = address[0].id;
    } else {
      const created_address = await this.addressService.create({
        city: jsonData?.delivery_address?.city ?? '',
        address_line_1: jsonData?.delivery_address?.address_line_1 ?? '',
        address_line_2: jsonData?.delivery_address?.address_line_2 ?? '',
        flat_number: jsonData?.delivery_address?.flat_number ?? '',
        latitude: jsonData?.delivery_address?.latitude ?? 0,
        longitude: jsonData?.delivery_address?.longitude ?? 0,
      });
      address_id = created_address.id;
    }

    console.log(address_id);

    //====================== voucher ===============================================================================
    // const voucher = await this.voucherService.findByVoucherCode(
    //   jsonData.voucher.voucher,
    // );

    // let voucher_id = undefined;

    // if (voucher) {
    //   console.log('Voucher Found in DB: ');
    //   voucher_id = voucher.id;
    // } else {
    //   const created_voucher = await this.voucherService.create({
    //     voucher_code: jsonData.voucher.voucher,
    //     value: jsonData.voucher.value,
    //   });
    //   voucher_id = created_voucher.id;
    // }

    // console.log(voucher_id);

    //====================== paymentMethod ===============================================================================
    // const payment_method =
    //   await this.paymentMethodService.findByPaymentTypeCode(
    //     jsonData.payment_type_code,
    //   );

    // let payment_method_id = undefined;

    // if (payment_method) {
    //   console.log('Payment Method Found in DB: ');
    //   payment_method_id = payment_method.id;
    // } else {
    //   const created_payment_method = await this.paymentMethodService.create({
    //     payment_type_code: jsonData.payment_type_code,
    //     payment_group: jsonData.payment.breakdown[0].group,
    //   });
    //   payment_method_id = created_payment_method.id;
    // }

    // console.log(payment_method_id);

    //======================= order  ==============================================================================
    const order = await this.findByOrderCode(jsonData.order_code);

    if (order) {
      console.log('Order Found in DB: ');
      return;
    } else {
      const created_order = await this.prisma.order.create({
        data: {
          restaurant: { connect: { id: restaurant_id } },
          address: { connect: { id: address_id } },
          // voucher: { connect: { id: voucher_id } },
          // payment_method: { connect: { id: payment_method_id } },
          // ordered_items: { connect: { id: menuItem_id } },
          order_code: jsonData.order_code,
          order_time: new Date(
            jsonData.ordered_at.date.replace(' ', 'T'),
          ).toISOString(),
          total_value: jsonData.total_value,
          subtotal: jsonData.subtotal,
          rider_tip: jsonData.rider_tip ?? 0,
        },
      });
      // console.log(created_order);

      //====================== ordered menu item ===============================================================================

      console.log('Ordered Item ==================');
      let ordered_items_id = undefined;

      const created_ordered_item = await this.orderedMenuItemService.create({
        // order_id: jsonData.voucher.voucher,
        quantity: jsonData?.order_products?.quantity ?? 1,
        menu_items: { connect: menuItem_id.map((id) => ({ id })) },
        order: { connect: { id: created_order.id } },
      });
      ordered_items_id = created_ordered_item.id;

      console.log(ordered_items_id);
    }
  }
}
