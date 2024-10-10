import ErrorTemplate from '@/components/ErrorTemplate';
import Pagination from '@/components/Pagination';
import SortableHeader from '@/components/SortableHeader';
import TableActions from '@/components/TableActions';
import formatDate from '@/utils/formatDate';
import formatPrice from '@/utils/formatPrice';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { deleteMitraPackageOrder, getAllMitraPackageOrders } from '@/api/mitra-package-order-api';
import { PaginationResponse } from '@/types/PaginationType';
import { MitraPackageOrderResponse, MitraPackageOrderQueryParams } from '@/types/MitraPackageOrderType';
import { MitraPackageResponse } from '@/types/MitraPackageType';
import { getMitraPackage } from '@/api/mitra-package-api';
import { getAllExchangeRates } from '@/api/exchange-rate-api';

const columns = [
  { label: 'No', key: 'index', sortable: false },
  { label: 'Nama Lengkap', key: 'User.full_name', sortable: true },
  { label: 'Email', key: 'User.email', sortable: true },
  { label: 'Whatsapp', key: 'User.whatsapp_number', sortable: true },
  { label: 'ID Paket', key: 'user_package_id', sortable: false },
  { label: 'Estimasi harga per Pax', key: 'MitraPackage.per_pax_price', sortable: true },
  { label: 'Estimasi total harga', key: 'MitraPackage.total_price', sortable: true },
  { label: 'Waktu pesan', key: 'created_at', sortable: true },
  { label: 'Aksi', key: 'actions', sortable: false },
];

const MitraPackageOrder: React.FC = () => {
  const [orders, setOrders] = useState<MitraPackageOrderResponse[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<MitraPackageResponse | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [sarToIdr, setSarToIdr] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<MitraPackageOrderQueryParams>({
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

  useEffect(() => {
    const fetchSarToIdr = async () => {
      try {
        const response = await getAllExchangeRates();
        setSarToIdr(response.data.find((exchange: any) => exchange.currency === 'SAR')?.rate_idr || 0);
      } catch (error: any) {
        console.error(error);
        setError('Terjadi kesalahan saat mengambil data');
      }
    };

    fetchSarToIdr();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllMitraPackageOrders(searchParams);

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
    toast.promise(deleteMitraPackageOrder(id), {
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

  const handlePackageClick = async (id: string) => {
    try {
      const selectedOrder = await getMitraPackage(id);

      if (selectedOrder.success) {
        setSelectedPackage(selectedOrder.data);
        setIsDetailModalOpen(true);
      } else {
        setError(selectedOrder.message);
      }
    } catch (error: any) {
      console.error(error);
      setError('Terjadi kesalahan saat mengambil data');
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
      <h1 className="text-3xl font-semibold mb-8 text-dark">Order Paket Mitra</h1>

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
                <td className="px-6 py-2 border-b">{order.user.full_name}</td>
                <td className="px-6 py-2 border-b">{order.user.email}</td>
                <td className="px-6 py-2 border-b">{order.user.whatsapp_number}</td>
                <td
                  className="px-6 py-2 border-b cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handlePackageClick(order.mitra_package_id)}
                >
                  {order.mitra_package_id}
                </td>
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

      {/* Detail Modal */}
      {isDetailModalOpen && selectedPackage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Detail Paket</h2>
              <FaTimes className="cursor-pointer text-3xl text-dark" onClick={() => setIsDetailModalOpen(false)} />
            </div>
            <div className="gap-3 rounded-lg flex flex-col justify-between text-sm">
              {/* Transaction details */}
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Periode:</p>
                <p className="text-gray-600 font-medium text-right">
                  {formatDate(selectedPackage.period.start_date)} - {formatDate(selectedPackage.period.end_date)}
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Jumlah Jamaah:</p>
                <p className="text-gray-600 font-medium text-right">{selectedPackage.number_of_pax} orang</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Tanggal Berangkat:</p>
                <p className="text-gray-600 font-medium text-right">{formatDate(selectedPackage.departure_date)}</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Durasi perjalanan:</p>
                <p className="text-gray-600 font-medium text-right">{selectedPackage.travel_duration} hari</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Tiket Pesawat:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.airline.name} ({formatPrice(selectedPackage.airline.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Vendor:</p>
                <p className="text-gray-600 font-medium text-right">{selectedPackage.vendor.name}</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Hotel di Mekkah:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.hotel_mekkah.name}{' '}
                  {selectedPackage.mekkah_room_type === 'Double' &&
                    `(Double: ${formatPrice(Number(selectedPackage.hotel_mekkah.price_double * sarToIdr))})`}
                  {selectedPackage.mekkah_room_type === 'Triple' &&
                    `(Triple: ${formatPrice(Number(selectedPackage.hotel_mekkah.price_triple * sarToIdr))})`}
                  {selectedPackage.mekkah_room_type === 'Quad' &&
                    `(Quad: ${formatPrice(Number(selectedPackage.hotel_mekkah.price_quad * sarToIdr))})`}
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Durasi di Mekkah:</p>
                <p className="text-gray-600 font-medium text-right">{selectedPackage.mekkah_duration} hari</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Hotel di Madinah:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.hotel_madinah.name}{' '}
                  {selectedPackage.madinah_room_type === 'Double' &&
                    `(Double: ${formatPrice(Number(selectedPackage.hotel_madinah.price_double * sarToIdr))})`}
                  {selectedPackage.madinah_room_type === 'Triple' &&
                    `(Triple: ${formatPrice(Number(selectedPackage.hotel_madinah.price_triple * sarToIdr))})`}
                  {selectedPackage.madinah_room_type === 'Quad' &&
                    `(Quad: ${formatPrice(Number(selectedPackage.hotel_madinah.price_quad * sarToIdr))})`}
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Durasi di Madinah:</p>
                <p className="text-gray-600 font-medium text-right">{selectedPackage.madinah_duration} hari</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Visa:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.visa.name} ({formatPrice(selectedPackage.visa.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Transportasi:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.transportation.name} ({formatPrice(selectedPackage.transportation.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Muthawif:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.muthawif.name} ({formatPrice(selectedPackage.muthawif.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Handling Saudi:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.handling_saudi.name} ({formatPrice(selectedPackage.handling_saudi.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Handling Domestik:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.handling_domestic.name} ({formatPrice(selectedPackage.handling_domestic.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Siskopatuh:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.siskopatuh.name} ({formatPrice(selectedPackage.siskopatuh.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Perlengkapan:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.equipment.name} ({formatPrice(selectedPackage.equipment.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Tour Plus:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.tour_plus.name} ({formatPrice(selectedPackage.tour_plus.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Manasik:</p>
                <p className="text-gray-600 font-medium text-right">
                  {selectedPackage.manasik.name} ({formatPrice(selectedPackage.manasik.price_idr)})
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Tour Leader:</p>
                <p className="text-gray-600 font-medium text-right">{selectedPackage.tour_leader}</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-gray-600">Margin:</p>
                <p className="text-gray-600 font-medium text-right">{formatPrice(selectedPackage.margin)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MitraPackageOrder;
