import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Order } from '@prisma/client';
import { AddressService } from 'src/address/address.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { MenuItemService } from 'src/menu-item/menu-item.service';
import { OrderedMenuItemService } from 'src/ordered-menu-item/ordered-menu-item.service';
import { PaymentMethodService } from 'src/payment-method/payment-method.service';
import { VoucherService } from 'src/voucher/voucher.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private addressService: AddressService,
    private menuItemService: MenuItemService,
    // private orderService: OrderService,
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

  //================================================================================================

  async createOrder(jsonData: any) {
    const address = await this.addressService.searchByName(
      jsonData.delivery_address.address_line_1,
    );

    let address_id = undefined;

    if (address.length > 0) {
      console.log('Address Found in DB: ');
      address_id = address[0].id;
    } else {
      const created_address = await this.addressService.create({
        city: jsonData.delivery_address.city,
        address_line_1: jsonData.delivery_address.address_line_1,
        address_line_2: jsonData.delivery_address.address_line_2,
        flat_number: jsonData.delivery_address.flat_number,
        latitude: jsonData.delivery_address.latitude,
        longitude: jsonData.delivery_address.longitude,
      });
      address_id = created_address.id;
    }

    console.log(address_id);

    //======================  restaurant  ==========================================================================
    const restaurant = await this.restaurantService.findByCode(
      jsonData.vendor.name,
    );

    let restaurant_id = undefined;

    if (restaurant) {
      console.log('Restaurant Found in DB: ');
      restaurant_id = restaurant.id;
    } else {
      const created_address = await this.addressService.create({
        city: jsonData.delivery_address.city,
        address_line_1: jsonData.delivery_address.address_line_1,
        address_line_2: jsonData.delivery_address.address_line_2,
        flat_number: jsonData.delivery_address.flat_number,
        latitude: jsonData.delivery_address.latitude,
        longitude: jsonData.delivery_address.longitude,
      });

      const created_restaurant = await this.restaurantService.create({
        restaurant_name: jsonData.vendor.name,
        restaurant_code: jsonData.vendor.code,
        address: { connect: { id: created_address.id } },
      });
      restaurant_id = created_restaurant.id;
    }
    console.log(restaurant_id);
    //======================  menuItem  ==========================================================================

    const menuItem = await this.menuItemService.searchByName(
      jsonData.order_products[0].name,
    );

    let menuItem_id = undefined;

    if (menuItem.length > 0) {
      console.log('MenuItem Found in DB: ');
      menuItem_id = menuItem[0].id;
    } else {
      const created_menuItem = await this.menuItemService.create({
        restaurant: { connect: { restaurant_code: jsonData.vendor.code } },
        item_name: jsonData.order_products[0].name,
        price: jsonData.order_products[0].price_attributes.value,
      });
      menuItem_id = created_menuItem.id;
    }
    console.log(menuItem_id);

    //======================== order  ====================================================================
    // const order = await this.findByOrderCode(
    //   jsonData.delivery_address.addresress_line_1,
    // );

    // let order_id = undefined;

    // if (order) {
    //   console.log('Address Found in DB: ');
    //   order_id = order.id;
    // } else {
    //   const created_order = await this.create({
    //     total_value: jsonData.total_value,
    //     subtotal: jsonData.subtotal,
    //     rider_tip: jsonData.rider_tip,
    //   });
    //   order_id = created_order.id;
    // }

    // console.log(order_id);
  }
}
