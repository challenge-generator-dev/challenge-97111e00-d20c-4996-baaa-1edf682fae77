// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState } from 'react';
import { CreateOrderDto, UpdateOrderDto, OrderItem } from '../types/order';

interface OrderFormProps {
  initialData?: CreateOrderDto | null;
  onSubmit: (data: CreateOrderDto | UpdateOrderDto) => Promise<void>;
  isEditing?: boolean;
}

export function OrderForm({ initialData, onSubmit, isEditing = false }: OrderFormProps) {
  throw new Error('TODO(reto): anonymous');
}