// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { OrderRepository, ORDER_REPOSITORY } from '../repositories/OrderRepository';
import { Order } from '../models/order.model';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): createOrder');
  }

  async getOrders(): Promise<Order[]> {
    throw new Error('TODO(reto): getOrders');
  }

  async getOrder(id: string): Promise<Order> {
    throw new Error('TODO(reto): getOrder');
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): updateOrder');
  }

  async deleteOrder(id: string): Promise<void> {
    throw new Error('TODO(reto): deleteOrder');
  }
}