import axios from 'axios';
import { CreateOrderDto, UpdateOrderDto, Order } from '../types/order';

const API_BASE_URL = 'http://localhost:3000';

export const createOrder = async (orderData: CreateOrderDto): Promise<Order> => {
  const response = await axios.post<Order>(`${API_BASE_URL}/orders`, orderData);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get<Order[]>(`${API_BASE_URL}/orders`);
  return response.data;
};

export const getOrder = async (id: string): Promise<Order> => {
  const response = await axios.get<Order>(`${API_BASE_URL}/orders/${id}`);
  return response.data;
};

export const updateOrder = async (id: string, orderData: UpdateOrderDto): Promise<Order> => {
  const response = await axios.put<Order>(`${API_BASE_URL}/orders/${id}`, orderData);
  return response.data;
};

export const deleteOrder = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/orders/${id}`);
};