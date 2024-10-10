import Container from '@/components/Container';
import ErrorTemplate from '@/components/ErrorTemplate';
import formatDate from '@/utils/formatDate';
import formatPrice from '@/utils/formatPrice';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMitraPackage } from '@/api/mitra-package-api';
import { TextInput } from '@/components/Input';
import { SpinnerLoading } from '@/components/Loading';
import { useAuth } from '@/hook/AuthProvider';
import { CreateUserPackageOrderRequest } from '@/types/UserPackageOrderType';
import { MitraPackageResponse } from '@/types/MitraPackageType';
import { getContactByName } from '@/api/contact-api';
import { getAllExchangeRates } from '@/api/exchange-rate-api';
import { createMitraPackageOrder } from '@/api/mitra-package-order-api';

const CustomPackageMitra: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [data, setData] = useState<MitraPackageResponse | null>(null);
  const [sarToIdr, setSarToIdr] = useState(0);
  const [isOrder, setIsOrder] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<CreateUserPackageOrderRequest>({
    user_package_id: id,
    full_name: '',
    email: '',
    whatsapp_number: '',
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contact = await getContactByName('whatsapp');
        const exchange_rate = await getAllExchangeRates();
        setWhatsappNumber(contact.data.value);
        setSarToIdr(exchange_rate.data.find((rate: { currency: string }) => rate.currency === 'SAR')?.rate_idr || 0);
      } catch (error: any) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        full_name: user.full_name,
        email: user.email,
        whatsapp_number: user.whatsapp_number,
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getMitraPackage(id);
        setData(response.data);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError('Terjadi kesalahan. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.promise(createMitraPackageOrder({ mitra_package_id: id }), {
      pending: 'Creating order...',
      success: {
        render() {
          setIsOrder(true);
          return 'Paket mitra berhasil diorder!';
        },
      },
      error: {
        render({ data }) {
          console.error('Error creating order:', data);
          return (data as { message: string }).message;
        },
      },
    });
  };

  const sendMessage = () => {
    const message = `
      Halo, saya tertarik untuk bergabung dengan paket berikut:

      Nama: ${formData.full_name}
      Email: ${formData.email}

      Detail Paket:
      - Jumlah Jamaah: ${data?.number_of_pax} orang
      - Total Biaya: ${formatPrice(Number(data?.total_price))}
      - Biaya Per Pax: ${formatPrice(Number(data?.per_pax_price))}

      Durasi Perjalanan:
      - Total Durasi: ${data?.travel_duration} hari
      - Durasi di Mekkah: ${data?.mekkah_duration} hari
      - Durasi di Madinah: ${data?.madinah_duration} hari

      Transportasi:
      - Tiket Pesawat: ${data?.airline.name}
      - Transportasi: ${data?.transportation.name}

      Akomodasi:
      - Hotel di Mekkah: ${data?.hotel_mekkah.name} (${data?.mekkah_room_type})
      - Hotel di Madinah: ${data?.hotel_madinah.name} (${data?.madinah_room_type})

      Layanan Lainnya:
      - Visa: ${data?.visa.name}
      - Muthawif: ${data?.muthawif.name}
      - Handling Saudi: ${data?.handling_saudi.name}
      - Handling Domestik: ${data?.handling_domestic.name}
      - Siskopatuh: ${data?.siskopatuh.name}
      - Perlengkapan: ${data?.equipment.name}
      - Tour Plus: ${data?.tour_plus.name}
      - Manasik: ${data?.manasik.name}
      - Tour Leader: ${data?.tour_leader}

      Margin: ${formatPrice(Number(data?.margin))}

      Terima kasih.
    `;

    const trimmedMessage = message
      .split('\n')
      .map((line) => line.trim())
      .join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(trimmedMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) return <SpinnerLoading />;
  if (error) return <ErrorTemplate message={error} />;

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center py-5 md:py-10">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full">
          <div className="text-center">
            <h1 className="text-lg font-semibold mb-2">DETAIL PAKET MITRA</h1>
            <div className="bg-gray-100 py-4 rounded-lg">
              {data && (
                <h2 className="text-3xl font-bold text-blue-600 mb-4">{formatPrice(Number(data.per_pax_price))}</h2>
              )}
              <div className="space-y-3">
                <button className="bg-gray-200 text-sm px-4 py-2 rounded-full">Perkiraan biaya per orang</button>
                <p className="text-gray-600 font-semibold">atau</p>
                <a href="#" className="text-blue-600 underline block mt-2">
                  klik disini jika berminat bergabung dengan group whatsapp
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 mt-10">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Detail Transaksi</h3>
              <div className="bg-gray-100 p-4 gap-3 rounded-lg flex flex-col justify-between text-sm">
                {/* Transaction details */}
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Periode:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.period.start_date && data?.period.end_date
                      ? `${formatDate(data.period.start_date)} - ${formatDate(data.period.end_date)}`
                      : 'N/A'}
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Jumlah Jamaah:</p>
                  <p className="text-gray-600 font-medium text-right">{data?.number_of_pax} orang</p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Tanggal Berangkat:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.departure_date ? formatDate(data.departure_date) : 'N/A'}
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Durasi perjalanan:</p>
                  <p className="text-gray-600 font-medium text-right">{data?.travel_duration} hari</p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Tiket Pesawat:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.airline.name} ({formatPrice(Number(data?.airline.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Vendor:</p>
                  <p className="text-gray-600 font-medium text-right">{data?.vendor.name}</p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Hotel di Mekkah:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.hotel_mekkah.name}{' '}
                    {data?.mekkah_room_type === 'Double' &&
                      `(Double: ${formatPrice(Number(data?.hotel_mekkah.price_double * sarToIdr))})`}
                    {data?.mekkah_room_type === 'Triple' &&
                      `(Triple: ${formatPrice(Number(data?.hotel_mekkah.price_triple * sarToIdr))})`}
                    {data?.mekkah_room_type === 'Quad' &&
                      `(Quad: ${formatPrice(Number(data?.hotel_mekkah.price_quad * sarToIdr))})`}
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Durasi di Mekkah:</p>
                  <p className="text-gray-600 font-medium text-right">{data?.mekkah_duration} hari</p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Hotel di Madinah:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.hotel_madinah.name}{' '}
                    {data?.madinah_room_type === 'Double' &&
                      `(Double: ${formatPrice(Number(data?.hotel_madinah.price_double * sarToIdr))})`}
                    {data?.madinah_room_type === 'Triple' &&
                      `(Triple: ${formatPrice(Number(data?.hotel_madinah.price_triple * sarToIdr))})`}
                    {data?.madinah_room_type === 'Quad' &&
                      `(Quad: ${formatPrice(Number(data?.hotel_madinah.price_quad * sarToIdr))})`}
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Durasi di Madinah:</p>
                  <p className="text-gray-600 font-medium text-right">{data?.madinah_duration} hari</p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Visa:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.visa.name} ({formatPrice(Number(data?.visa.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Transportasi:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.transportation.name} ({formatPrice(Number(data?.transportation.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Muthawif:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.muthawif.name} ({formatPrice(Number(data?.muthawif.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Handling Saudi:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.handling_saudi.name} ({formatPrice(Number(data?.handling_saudi.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Handling Domestik:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.handling_domestic.name} ({formatPrice(Number(data?.handling_domestic.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Siskopatuh:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.siskopatuh.name} ({formatPrice(Number(data?.siskopatuh.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Perlengkapan:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.equipment.name} ({formatPrice(Number(data?.equipment.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Tour Plus:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.tour_plus.name} ({formatPrice(Number(data?.tour_plus.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Manasik:</p>
                  <p className="text-gray-600 font-medium text-right">
                    {data?.manasik.name} ({formatPrice(Number(data?.manasik.price_idr))})
                  </p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Tour Leader:</p>
                  <p className="text-gray-600 font-medium text-right">{data?.tour_leader}</p>
                </div>
                <div className="flex justify-between gap-5">
                  <p className="text-gray-600">Margin:</p>
                  <p className="text-gray-600 font-medium text-right">{formatPrice(Number(data?.margin))}</p>
                </div>
              </div>
            </div>

            {isOrder ? (
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Hubungi Kami</h3>
                <p className="text-gray-600 mb-4">
                  Anda sudah mengisi data diri. Silakan klik tombol di bawah untuk menghubungi kami melalui WhatsApp
                  terkait pemesanan paket ini.
                </p>
                <button
                  onClick={sendMessage}
                  className="w-full mt-3 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primaryDark transition-colors"
                >
                  Hubungi Kami
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Konfirmasi</h3>
                <form className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2" onSubmit={handleSubmit}>
                  <div>
                    <TextInput
                      placeholder="Nama Lengkap"
                      name="full_name"
                      onChange={handleChange}
                      value={formData.full_name}
                      required
                      disabled={!!user}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      required
                      disabled={!!user}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Nomor Whatsapp"
                      name="whatsapp_number"
                      onChange={handleChange}
                      value={formData.whatsapp_number}
                      required
                      disabled={!!user}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-3 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primaryDark transition-colors"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Pesan Sekarang'}
                  </button>
                  <p className="text-sm text-gray-600 mt-2">
                    Note: Setelah anda melengkapi data diri, Kami akan follow up lebih lanjut terkait kebutuhan anda.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CustomPackageMitra;
