import React, { useEffect, useState } from 'react';
import { getAllOrder } from '@/api/order-api';
import formatPrice from '@/utils/formatPrice';

interface Order {
  id: string;
  user_id: string;
  product_id: string;
  variation: string | null;
  departure: string;
  number_of_pax: number;
  per_pax_price: number;
  total_price: number;
  created_at: string;
  updated_at: string;
}

const ProductOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      // Simulate fetching from an API with the provided response data
      const response = await getAllOrder();

      if (response.success) {
        setOrders(response.data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Orders</h1>

      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-3 border-b">No</th>
              <th className="text-left px-6 py-3 border-b">User ID</th>
              <th className="text-left px-6 py-3 border-b">Product ID</th>
              <th className="text-left px-6 py-3 border-b">Variation</th>
              <th className="text-left px-6 py-3 border-b">Departure</th>
              <th className="text-left px-6 py-3 border-b">Pax</th>
              <th className="text-left px-6 py-3 border-b">Price per Pax</th>
              <th className="text-left px-6 py-3 border-b">Total Price</th>
              <th className="text-left px-6 py-3 border-b">Order At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 border-b">{idx + 1}</td>
                <td className="px-6 py-2 border-b">{order.user_id}</td>
                <td className="px-6 py-2 border-b">{order.product_id}</td>
                <td className="px-6 py-2 border-b">{order.variation || "-"}</td>
                <td className="px-6 py-2 border-b">{order.departure.split('T')[0]}</td>
                <td className="px-6 py-2 border-b">{order.number_of_pax}</td>
                <td className="px-6 py-2 border-b">{formatPrice(order.per_pax_price)}</td>
                <td className="px-6 py-2 border-b">{formatPrice(order.total_price)}</td>
                <td className="px-6 py-2 border-b">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductOrder;
