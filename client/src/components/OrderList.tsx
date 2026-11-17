import { useState } from 'react';
import type { Order, CreateOrderDto, UpdateOrderDto } from '../types/order';
import { OrderForm } from './OrderForm';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => Promise<void>;
}

export function OrderList({ orders, loading, onEdit, onDelete }: OrderListProps) {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta orden?')) {
      return;
    }
    setActionError(null);
    setSuccessMessage(null);
    try {
      await onDelete(id);
      setSuccessMessage('Orden eliminada exitosamente');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setActionError(message);
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const calculateTotal = (items: Order['items']): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getStatusClass = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending: 'status-pending',
      processing: 'status-processing',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
    };
    return statusMap[status.toLowerCase()] || 'status-default';
  };

  if (loading) {
    return (
      <div className="order-list-container">
        <div className="loading-spinner">Cargando órdenes...</div>
      </div>
    );
  }

  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h2>Gestión de Órdenes</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : 'Nueva Orden'}
        </button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {actionError && (
        <div className="error-message">{actionError}</div>
      )}

      {showForm && (
        <div className="order-form-container">
          <OrderForm onSubmit={async (data: CreateOrderDto | UpdateOrderDto) => {
            setShowForm(false);
            setSuccessMessage('Orden creada exitosamente');
            setTimeout(() => setSuccessMessage(null), 3000);
          }} isEditing={false} />
        </div>
      )}

      {editingOrder && (
        <div className="order-form-container">
          <OrderForm
            initialData={editingOrder}
            onSubmit={async (data: CreateOrderDto | UpdateOrderDto) => {
              setEditingOrder(null);
              setSuccessMessage('Orden actualizada exitosamente');
              setTimeout(() => setSuccessMessage(null), 3000);
            }}
            isEditing={true}
          />
          <button onClick={() => setEditingOrder(null)} className="btn-secondary">
            Cancelar Edición
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No hay órdenes disponibles</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            Crear primera orden
          </button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <h3>Orden #{order.id}</h3>
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-card-body">
                <div className="order-info">
                  <span className="label">Cliente:</span>
                  <span className="value">{order.customerId}</span>
                </div>
                <div className="order-info">
                  <span className="label">Items:</span>
                  <span className="value">{order.items.length}</span>
                </div>
                <div className="order-info">
                  <span className="label">Total:</span>
                  <span className="value">${calculateTotal(order.items).toFixed(2)}</span>
                </div>
                <div className="order-info">
                  <span className="label">Creado:</span>
                  <span className="value">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-info">
                  <span className="label">Actualizado:</span>
                  <span className="value">{formatDate(order.updatedAt)}</span>
                </div>
              </div>
              <div className="order-card-footer">
                <button
                  onClick={() => setEditingOrder(order)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}