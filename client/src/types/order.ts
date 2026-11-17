export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
}

export interface UpdateOrderDto {
  status: string;
}