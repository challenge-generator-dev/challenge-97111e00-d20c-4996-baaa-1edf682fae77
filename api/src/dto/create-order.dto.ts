import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString()
  @IsNotEmpty()
  status: string;

  constructor(id: string, customerId: string, items: OrderItemDto[], status: string) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    if (this.status !== 'pending' && this.status !== 'completed' && this.status !== 'cancelled') {
      throw new Error('Invalid order status');
    }
  }
}