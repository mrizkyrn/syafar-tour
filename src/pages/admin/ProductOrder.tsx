import ErrorTemplate from '@/components/ErrorTemplate';
import Pagination from '@/components/Pagination';
import SortableHeader from '@/components/SortableHeader';
import TableActions from '@/components/TableActions';
import formatPrice from '@/utils/formatPrice';

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteProductOrder, getAllProductOrder } from '@/api/product-order-api';
import { PaginationResponse } from '@/types/PaginationType';
import { ProductOrderQueryParams, ProductOrderResponse } from '@/types/ProductOrderType';

const columns = [
  { label: 'No', key: 'index', sortable: false },
  { label: 'Nama Lengkap', key: 'User.full_name', sortable: true },
  { label: 'Email', key: 'User.email', sortable: true },
  { label: 'Whatsapp', key: 'User.whatsapp_number', sortable: true },
  { label: 'Nama Produk', key: 'user_package_id', sortable: false },
  { label: 'Variasi', key: 'variation_id', sortable: false },
  { label: 'Keberangkatan', key: 'departure', sortable: true },
  { label: 'Jumlah Pax', key: 'number_of_pax', sortable: true },
  { label: 'Harga per Pax', key: 'per_pax_price', sortable: true },
  { label: 'Total Harga', key: 'total_price', sortable: true },
  { label: 'Waktu pesan', key: 'created_at', sortable: true },
  { label: 'Aksi', key: 'actions', sortable: false },
];

const ProductOrder: React.FC = () => {
  const [productOrders, setProductOrders] = useState<ProductOrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<ProductOrderQueryParams>({
    search: '',
    sort: 'created_at',
    order: 'desc' as 'asc' | 'desc',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState<PaginationResponse>({
    total: 0,
    current_page: 1,
    total_pages: 1,
    limit: 10,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllProductOrder(searchParams);
      setProductOrders(response.data.data);
      setPagination(response.data.pagination);
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [searchParams]);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Apakah anda yakin ingin menghapus data ini?');

    if (!confirmDelete) return;

    setLoading(true);
    toast.promise(deleteProductOrder(id), {
      pending: 'Menghapus data...',
      success: {
        render() {
          setLoading(false);
          setProductOrders((prev) => prev.filter((order) => order.id !== id));
          return 'Data berhasil dihapus';
        },
      },
      error: {
        render({ data }) {
          setLoading(false);
          return (data as { message: string }).message;
        },
      },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, search: e.target.value, page: 1 });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, limit: parseInt(e.target.value), page: 1 });
  };

  const handleSort = (column: string) => {
    setSearchParams((prev) => ({
      ...prev,
      sort: column,
      order: prev.sort === column ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  const filteredOrders = useMemo(() => {
    return productOrders.map((order, idx) => ({
      ...order,
      index: idx + 1 + (searchParams.page - 1) * searchParams.limit,
    }));
  }, [productOrders, searchParams.page, searchParams.limit]);

  if (error) return <ErrorTemplate message={error} />;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-dark">Order Produk</h1>

      {/* Search & Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchParams.search}
          onChange={handleSearch}
          placeholder="Cari nama lengkap, email, atau whatsapp"
          className="border px-4 py-1 rounded-md border-gray-400 w-80"
        />

        <div className="flex items-center gap-3">
          <label className="text-gray-600" htmlFor="limit">
            Show
          </label>
          <select
            name="limit"
            value={searchParams.limit}
            onChange={handleLimitChange}
            className="border px-4 py-1 rounded-md border-gray-400"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) =>
                column.sortable ? (
                  <SortableHeader
                    key={column.key}
                    label={column.label}
                    sortKey={column.key}
                    currentSort={searchParams.sort || ''}
                    currentOrder={searchParams.order || ''}
                    onSort={handleSort}
                  />
                ) : (
                  <th key={column.key} className="text-left px-6 py-3 border-b">
                    {column.label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
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
                <td className="px-4 py-3 border-b">
                  <TableActions onDelete={() => handleDelete(order.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
      />

      {/* Error and Loading */}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ProductOrder;
