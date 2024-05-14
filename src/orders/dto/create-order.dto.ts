import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  order_address: string;

  @ApiProperty()
  order_code: string;

  @ApiProperty()
  ordered_at: string;

  @ApiProperty()
  total_value: number;

  @ApiProperty()
  subtotal: number;

  @ApiProperty()
  vendor: string;

  @ApiProperty()
  order_products: Record<string, any>;
}
