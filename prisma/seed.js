const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Extracted data from the provided JSON object
  const jsonData = {
    current_status: {
      code: 16,
      message: 'RESTAURANTS_OTP_OD_PROGRESS_DELIVERED',
      type: 'final',
      changedAt: {
        date: '2024-05-12 13:14:51',
        timezone: 'Asia/Dhaka',
      },
      internal_status_code: '621 - ',
    },
    order_address: '50 Lake Circus Rd Dhaka',
    delivery_address: {
      id: 25160777,
      city: 'Dhaka',
      address_line_1: 'Lake Circus Rd',
      address_line_2: '50',
      address_line_3: 'Kalabagan',
      address_line_4: '',
      address_line_5: '',
      address_other: '',
      room: '',
      flat_number: 'House 50',
      structure: '',
      building: '',
      floor: '',
      district: '',
      postcode: '',
      company: '',
      latitude: 23.7514388,
      longitude: 90.3807573,
      delivery_instructions: 'lift er 7',
    },
    order_id: 0,
    order_code: 's6jz-2419-3o5r',
    ordered_at: {
      date: '2024-05-12 13:01:09',
      timezone: 'Asia/Dhaka',
    },
    confirmed_delivery_time: {
      date: '2024-05-12 13:14:51',
      timezone: 'Asia/Dhaka',
    },
    total_value: 283,
    subtotal: 362,
    vendor: {
      id: 0,
      code: 's6jz',
      name: 'KFC- Panthapath',
      logo: '',
      service_tax_percentage_amount: 0,
      service_fee_percentage_amount: 0,
      vat_percentage_amount: 0,
      is_service_fee_enabled: false,
      is_service_tax_visible: false,
      is_service_tax_enabled: false,
      is_vat_visible: false,
      is_vat_disabled: false,
      address: '',
      latitude: 23.75284625,
      longitude: 90.38105515,
      primary_cuisine_id: 241,
      metadata: {
        timezone: 'Asia/Dhaka',
      },
      city_id: 0,
      vertical: 'restaurants',
      hero_listing_image:
        'https://images.deliveryhero.io/image/fd-bd/LH/s6jz-listing.jpg',
    },
    voucher: {
      voucher: 'vzbw7xel',
      expirationDate: 1715709599000,
      type: 'amount',
      value: 50,
      description: '',
    },
    order_products: [
      {
        name: 'Chicken & Rice Meal',
        name_attributes: {
          style: 'highlight',
          text_color: 'neutral_primary',
          value: 'Chicken & Rice Meal',
          placeholders: null,
        },
        quantity_attributes: {
          style: 'highlight',
          text_color: 'neutral_primary',
          value: 1,
          placeholders: null,
        },
        toppings_attributes: null,
        special_instructions_attributes: {
          style: 'body_sm',
          text_color: 'neutral_secondary',
          value: '',
          placeholders: null,
        },
        subtitle_attributes: null,
        price_attributes: {
          style: 'body',
          text_color: 'neutral_primary',
          value: 362,
          placeholders: null,
        },
        total_price: 362,
        quantity: 1,
        sold_out: false,
        tag: null,
        status: 'available',
        weight_attributes: null,
        replacement_products: [],
        replacement_attributes: null,
        is_meal_for_one: false,
      },
    ],
    sms_verification_needed: false,
    order_already_rated: false,
    rating: 5,
    has_been_reported_late: false,
    rider_tip: 0,
    charity: 0,
    service_fee_total: 4,
    difference_to_minimum: 0,
    difference_to_minimum_with_vat: 0,
    expedition_type: 'delivery',
    server_time: {
      date: '2024-05-14 11:08:11',
      timezone: 'Asia/Dhaka',
    },
    payment_type_code: 'antfinancial_bkash',
    payment: {
      breakdown: [
        {
          code: 'antfinancial_bkash',
          group: 'online_payment',
          translation_key: 'OTP_PAID_WITH_ONLINE_PAYMENT',
          amount: 283,
        },
      ],
    },
    delivery_features: {
      show_map: false,
      display_map: false,
      show_cart: false,
      show_statuses: false,
      show_vendor_contact: false,
      show_vendor_delivery_time: false,
      show_rider_chat: false,
      show_payment_breakdown: true,
      show_help_button: false,
    },
    delivery_provider: 'own_delivery_foodpanda',
    is_cancellable: false,
    status_flags: {
      is_paid: true,
      is_active: false,
      is_picked_up: false,
      is_delivered: true,
      is_canceled: false,
      is_preorder: false,
      is_preorder_active: false,
      is_past_order: true,
      is_completed: true,
      is_reorderable: true,
      is_reorderable_after_cancellation: false,
      is_rateable: false,
      is_meal_for_one: false,
    },
    dynamic_fees: [
      {
        translation_key: 'NEXTGEN_CART_SUBTOTAL',
        value: 362,
        style: 'body',
        text_color: 'neutral_secondary',
        tag: null,
      },
      {
        translation_key: 'NEXTGEN_CART_DISCOUNT',
        value: -33,
        style: 'body',
        text_color: 'neutral_secondary',
        tag: {
          type: 'primary',
        },
      },
      {
        translation_key: 'NEXTGEN_CART_SERVICE_FEE',
        value: 4,
        style: 'body',
        text_color: 'neutral_secondary',
        tag: null,
      },
      {
        translation_key: 'NEXTGEN_COUT_VOUCHER',
        name: 'vzbw7xel',
        value: -50,
        style: 'body',
        text_color: 'neutral_secondary',
        tag: null,
      },
      {
        translation_key: 'NEXTGEN_TOTAL_VAT',
        value: 283,
        style: 'title_sm',
        text_color: 'neutral_primary',
        tag: null,
      },
    ],
    loyalty: null,
    status_messages: {
      titles: [],
    },
    status_history: [],
    payment_refunds: [],
  };

  // Insert Address===================================================================

  //search address_line_1 in db if not found then create and return id

  const address = prisma.address.searchByName(
    jsonData.delivery_address.address_line_1,
  );

  let address_id = address;

  if (address_id) {
    console.log('Address Found in DB: ');
    // return address_id;
  } else {
    const address = await prisma.address.create({
      data: {
        city: jsonData.delivery_address.city,
        address_line_1: jsonData.delivery_address.address_line_1,
        address_line_2: jsonData.delivery_address.address_line_2,
        flat_number: jsonData.delivery_address.flat_number,
        latitude: jsonData.delivery_address.latitude,
        longitude: jsonData.delivery_address.longitude,
      },
    });
    address_id = address.id;
  }

  // Insert Voucher===================================================================
  //if voucher already exists in db then return id
  const voucher_id = prisma.voucher.findOne(jsonData.voucher.voucher);
  if (voucher_id) {
    console.log(voucher_id);
  } else {
    const voucher = await prisma.voucher.create({
      data: {
        voucher_code: jsonData.voucher.voucher,
        value: jsonData.voucher.value,
      },
    });
    voucher_id = voucher.id;
  }

  // Insert PaymentMethod===================================================================
  //if paymentMethod already exists in db then return id

  const paymentMethod = await prisma.paymentMethod.create({
    data: {
      payment_type_code: jsonData.payment_type_code,
      payment_group: jsonData.payment.breakdown[0].group,
    },
  });

  // Insert Restaurant======================================================================
  //if restaurant already exists in db then return id

  const restaurant_id = prisma.restaurant.searchByName(jsonData.vendor.name);

  if (!restaurant_id) {
    const restaurant = await prisma.restaurant.create({
      data: {
        restaurant_name: jsonData.vendor.name,
        address_id: address.id,
      },
    });
    restaurant_id = restaurant.id;
  }

  // Insert Order============================================================================
  const order = await prisma.order.create({
    data: {
      restaurant_id: restaurant_id,
      delivery_address: address_id,
      voucher_id: voucher.id,
      payment_method_id: paymentMethod.id,
      order_code: jsonData.order_code,
      order_time: new Date(jsonData.ordered_at.date),
      total_value: jsonData.total_value,
      subtotal: jsonData.subtotal,
      rider_tip: jsonData.rider_tip,
    },
  });

  // Insert OrderedMenuItem(s)================================================================
  for (const product of jsonData.order_products) {
    // Assuming menu items are created already in the database
    const menuItem = await prisma.menuItem.findUnique({
      where: {
        // Assuming unique constraint on item_name and restaurant_id
        item_name_restaurant_id: {
          item_name: product.name,
          restaurant_id: restaurant_id,
        },
      },
    });

    if (menuItem) {
      await prisma.orderedMenuItem.create({
        data: {
          order_id: order.id,
          quantity: product.quantity,
          menu_items: { connect: { id: menuItem.id } },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
