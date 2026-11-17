import { useState, useEffect } from 'react';
import { OrderList } from './components/OrderList';
import { OrderForm } from './components/OrderForm';
import { useOrders } from './hooks/useOrders';
import type { CreateOrderDto, UpdateOrderDto, Order } from './types/order';

function App() {
  const { orders, loading, error, fetchOrders, createOrder, updateOrder, deleteOrder } = useOrders();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = async (data: CreateOrderDto | UpdateOrderDto) => {
    await createOrder(data as CreateOrderDto);
    setIsFormOpen(false);
    fetchOrders();
  };

  const handleUpdateOrder = async (id: string, data: UpdateOrderDto) => {
    await updateOrder(id, data);
    setEditingOrder(null);
    fetchOrders();
  };

  const handleDeleteOrder = async (id: string) => {
    await deleteOrder(id);
    fetchOrders();
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const handleSubmit = editingOrder
    ? (data: CreateOrderDto | UpdateOrderDto) => handleUpdateOrder(editingOrder.id, data as UpdateOrderDto)
    : handleCreateOrder;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Órdenes</h1>
        <button
          className="btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          Nueva Orden
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <p>Error: {error}</p>
        </div>
      )}

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <OrderForm
              initialData={editingOrder}
              onSubmit={handleSubmit}
              isEditing={!!editingOrder}
            />
            <button
              className="btn-secondary"
              onClick={handleCloseForm}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <main className="app-main">
        <OrderList
          orders={orders}
          loading={loading}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />
      </main>
    </div>
  );
}

export default App;