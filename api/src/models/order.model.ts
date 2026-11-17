export class OrderItem {
  productId: string;
  quantity: number;
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    id: string,
    customerId: string,
    items: OrderItem[],
    status: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}