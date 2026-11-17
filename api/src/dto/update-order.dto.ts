import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  constructor(status: string) {
    this.status = status;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.status !== 'pending' && this.status !== 'completed' && this.status !== 'cancelled') {
      throw new Error('Invalid order status');
    }
  }
}