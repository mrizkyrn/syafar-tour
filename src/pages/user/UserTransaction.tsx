import Container from '@/components/Container';
import ErrorTemplate from '@/components/ErrorTemplate';
import formatDate from '@/utils/formatDate';
import formatPrice from '@/utils/formatPrice';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { getAllMitraPackageOrdersByUser } from '@/api/mitra-package-order-api';
import { getAllExchangeRates } from '@/api/exchange-rate-api';
import { getMitraPackage } from '@/api/mitra-package-api';
import { getAllProductOrderByUser } from '@/api/product-order-api';
import { SpinnerLoading } from '@/components/Loading';
import { useAuth } from '@/hook/AuthProvider';
import { MitraPackageResponse } from '@/types/MitraPackageType';
import { MitraPackageOrderResponse } from '@/types/MitraPackageOrderType';
import { ProductOrderResponse } from '@/types/ProductOrderType';

const UserTransaction: React.FC = () => {
  const { user } = useAuth();

  const [packageOrders, setPackageOrders] = useState<MitraPackageOrderResponse[]>([]);
  const [productOrders, setProductOrders] = useState<ProductOrderResponse[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<MitraPackageResponse | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [sarToIdr, setSarToIdr] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingProductOrders, setViewingProductOrders] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (user && user.role === 'MITRA') {
          const packageOrders = await getAllMitraPackageOrdersByUser();
          setPackageOrders(packageOrders.data);
        }
        const productOrders = await getAllProductOrderByUser();
        const rates = await getAllExchangeRates();

        setProductOrders(productOrders.data);
        setSarToIdr(rates.data.find((rate: any) => rate.currency === 'SAR')?.rate_idr || 0);
      } catch (error) {
        console.error(error);
        setError('Terjadi kesalahan saat memuat data transaksi');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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

  if (loading) return <SpinnerLoading message="Loading..." />;
  if (error) return <ErrorTemplate message={error} />;

  return (
    <Container>
      <div className="min-h-screen py-5 md:py-10">
        {/* Submenu for Package Orders and Product Orders */}
        <div className="flex mb-5">
          <button
            className={`py-2 px-5 ${viewingProductOrders ? 'bg-gray-300' : 'bg-primary text-white'}`}
            onClick={() => setViewingProductOrders(false)}
          >
            Paket Order
          </button>
          <button
            className={`py-2 px-5 ${viewingProductOrders ? 'bg-primary text-white' : 'bg-gray-300'}`}
            onClick={() => setViewingProductOrders(true)}
          >
            Produk Order
          </button>
        </div>

        {/* Render Package Orders or Product Orders based on state */}
        {viewingProductOrders ? (
          productOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg border border-gray-300">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-3 px-4 text-left">No</th>
                    <th className="py-3 px-4 text-left">Produk</th>
                    <th className="py-3 px-4 text-left">Harga per Pax</th>
                    <th className="py-3 px-4 text-left">Total Harga</th>
                    <th className="py-3 px-4 text-left">Tanggal Pesan</th>
                  </tr>
                </thead>
                <tbody>
                  {productOrders.map((order, idx) => (
                    <tr key={order.id} className="border-b border-gray-200">
                      <td className="py-3 px-4">{idx + 1}</td>
                      <td className="px-6 py-2 border-b">
                        <Link to={`/produk/${order.product_id}`} className="text-blue-500 hover:underline">
                          {order.product_name}
                        </Link>
                      </td>
                      <td className="py-3 px-4">{formatPrice(order.per_pax_price)}</td>
                      <td className="py-3 px-4">{formatPrice(order.total_price)}</td>
                      <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">Kamu belum melakukan order produk</div>
          )
        ) : packageOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg border border-gray-300">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left">No</th>
                  <th className="py-3 px-4 text-left">Paket</th>
                  <th className="py-3 px-4 text-left">Harga per Pax</th>
                  <th className="py-3 px-4 text-left">Total Harga</th>
                  <th className="py-3 px-4 text-left">Tanggal Pesan</th>
                </tr>
              </thead>
              <tbody>
                {packageOrders.map((order, idx) => (
                  <tr key={order.id} className="border-b border-gray-200">
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="px-6 py-2 border-b">
                      <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => handlePackageClick(order.mitra_package_id)}
                      >
                        Lihat Detail
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatPrice(order.per_pax_price)}</td>
                    <td className="py-3 px-4">{formatPrice(order.total_price)}</td>
                    <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">Kamu belum melakukan order paket</div>
        )}

        {/* Detail Mitra Package Modal */}
        {isDetailModalOpen && selectedPackage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Detail Paket</h2>
                <FaTimes className="cursor-pointer text-3xl text-dark" onClick={() => setIsDetailModalOpen(false)} />
              </div>
              <div className="gap-3 rounded-lg flex flex-col justify-between text-sm">
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
                    {selectedPackage.handling_domestic.name} ({formatPrice(selectedPackage.handling_domestic.price_idr)}
                    )
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
    </Container>
  );
};

export default UserTransaction;
