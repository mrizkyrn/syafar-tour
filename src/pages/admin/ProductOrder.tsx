import React, { useEffect, useState } from 'react';
import { getAllProductOrder } from '@/api/product-order-api';
import formatPrice from '@/utils/formatPrice';
import { ProductOrderResponse } from '@/types/ProductOrderType';
import { Link } from 'react-router-dom';

const ProductOrder: React.FC = () => {
  const [productOrders, setProductOrders] = useState<ProductOrderResponse[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getAllProductOrder();

      if (response.success) {
        setProductOrders(response.data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-dark">Order Produk</h1>

      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-3 border-b">No</th>
              <th className="text-left px-6 py-3 border-b">User Name</th>
              <th className="text-left px-6 py-3 border-b">User Whatsapp</th>
              <th className="text-left px-6 py-3 border-b">User Email</th>
              <th className="text-left px-6 py-3 border-b">Product Name</th>
              <th className="text-left px-6 py-3 border-b">Variation</th>
              <th className="text-left px-6 py-3 border-b">Departure</th>
              <th className="text-left px-6 py-3 border-b">Pax</th>
              <th className="text-left px-6 py-3 border-b">Price per Pax</th>
              <th className="text-left px-6 py-3 border-b">Total Price</th>
              <th className="text-left px-6 py-3 border-b">Order At</th>
            </tr>
          </thead>
          <tbody>
            {productOrders.map((order, idx) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 border-b">{idx + 1}</td>
                <td className="px-6 py-2 border-b">{order.user.full_name}</td>
                <td className="px-6 py-2 border-b">{order.user.whatsapp_number}</td>
                <td className="px-6 py-2 border-b">{order.user.email}</td>
                <td className="px-6 py-2 border-b">
                <Link to={`/produk/${order.product_id}`} className="text-blue-500 hover:underline">
                  <p className="text-blue-500 hover:underline cursor-pointer">{order.product_name}</p>
                </Link>
                </td>
                <td className="px-6 py-2 border-b">{order.variation?.name || '-'}</td>
                <td className="px-6 py-2 border-b">{new Date(order.departure).toISOString().split('T')[0]}</td>
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
