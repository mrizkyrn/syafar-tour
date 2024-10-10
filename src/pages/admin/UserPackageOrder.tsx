import ErrorTemplate from '@/components/ErrorTemplate';
import Pagination from '@/components/Pagination';
import SortableHeader from '@/components/SortableHeader';
import TableActions from '@/components/TableActions';
import formatPrice from '@/utils/formatPrice';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { deleteUserPackageOrder, getAllUserPackageOrders } from '@/api/user-package-order-api';
import { PaginationResponse } from '@/types/PaginationType';
import { UserPackageOrderResponse, UserPackageOrderQueryParams } from '@/types/UserPackageOrderType';
import { UserPackageResponse } from '@/types/UserPackageType';

const columns = [
  { label: 'No', key: 'index', sortable: false },
  { label: 'Nama Lengkap', key: 'full_name', sortable: true },
  { label: 'Email', key: 'email', sortable: true },
  { label: 'Whatsapp', key: 'whatsapp_number', sortable: true },
  { label: 'ID Paket', key: 'user_package_id', sortable: false },
  { label: 'Estimasi harga per Pax', key: 'UserPackage.per_pax_price', sortable: false },
  { label: 'Estimasi total harga', key: 'UserPackage.total_price', sortable: false },
  { label: 'Waktu pesan', key: 'created_at', sortable: true },
  { label: 'Aksi', key: 'actions', sortable: false },
];

const UserPackageOrder: React.FC = () => {
  const [orders, setOrders] = useState<UserPackageOrderResponse[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<UserPackageResponse | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<UserPackageOrderQueryParams>({
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
    setLoading(true);
    setError(null);

    try {
      const response = await getAllUserPackageOrders(searchParams);

      if (response.success) {
        setOrders(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      console.error(error);
      setError('Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.search, searchParams.limit, searchParams.page, searchParams.sort, searchParams.order]);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Apakah anda yakin ingin menghapus data ini?');

    if (!confirmDelete) return;

    setLoading(true);
    toast.promise(deleteUserPackageOrder(id), {
      pending: 'Menghapus data...',
      success: {
        render() {
          setLoading(false);
          setOrders((prev) => prev.filter((order) => order.id !== id));
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

  const handlePackageClick = (id: string) => {
    const selectedOrder = orders.find((order) => order.user_package_id === id);

    if (selectedOrder) {
      setSelectedPackage(selectedOrder.user_package);
      setIsDetailModalOpen(true);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.map((order, idx) => ({
      ...order,
      index: idx + 1 + (searchParams.page - 1) * searchParams.limit,
    }));
  }, [orders, searchParams.page, searchParams.limit]);

  if (error) return <ErrorTemplate message={error} />;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-dark">Order Paket Jamaah</h1>

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
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 border-b">{order.index}</td>
                <td className="px-6 py-2 border-b">{order.full_name}</td>
                <td className="px-6 py-2 border-b">{order.email}</td>
                <td className="px-6 py-2 border-b">{order.whatsapp_number}</td>
                <td
                  className="px-6 py-2 border-b cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handlePackageClick(order.user_package_id)}
                >
                  {order.user_package_id}
                </td>
                <td className="px-6 py-2 border-b">{formatPrice(order.user_package.per_pax_price)}</td>
                <td className="px-6 py-2 border-b">{formatPrice(order.user_package.total_price)}</td>
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
      
      {/* Detail Modal */}
      {isDetailModalOpen && selectedPackage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Detail Paket</h2>
              <FaTimes className="cursor-pointer text-3xl text-dark" onClick={() => setIsDetailModalOpen(false)} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="text-gray-600">Jumlah jama'ah:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.number_of_pax} orang</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Tiket Pesawat</p>
                <p className="text-gray-600 font-medium">{selectedPackage.flight}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Durasi perjalanan:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.travel_duration} hari</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Durasi di makkah:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.mekkah_duration} hari</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Durasi di madinah:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.madinah_duration} hari</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Hotel makkah:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.hotel_mekkah}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Hotel madinah:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.hotel_madinah}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Transportasi:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.transportation}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Muthawif:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.muthawif}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Handling:</p>
                <p className="text-gray-600 font-medium">{selectedPackage.handling}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Visa:</p>
                <p className="text-gray-600 font-medium">Sudah Termasuk Visa</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPackageOrder;
