import Container from '@/components/Container';
import ErrorTemplate from '@/components/ErrorTemplate';
import formatPrice from '@/utils/formatPrice';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserPackage } from '@/api/user-package-api';
import { createUserPackageOrder } from '@/api/user-package-order-api';
import { TextInput } from '@/components/Input';
import { SpinnerLoading } from '@/components/Loading';
import { useAuth } from '@/hook/AuthProvider';
import { CreateUserPackageOrderRequest } from '@/types/UserPackageOrderType';
import { UserPackageResponse } from '@/types/UserPackageType';
import { getContactByName } from '@/api/contact-api';

const CalculationResult: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [data, setData] = useState<UserPackageResponse>({} as UserPackageResponse);
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
        setWhatsappNumber(contact.data.value);
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
        const response = await getUserPackage(id);
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

    toast.promise(createUserPackageOrder(formData), {
      pending: 'Creating order...',
      success: {
        render({ data }) {
          setIsOrder(true);
          return (data as { message: string }).message;
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
    // Format the WhatsApp message
    const message = `
      Halo, saya tertarik untuk bergabung. Berikut detailnya:

      Nama: ${formData.full_name}
      Email: ${formData.email}

      Detail Jamaah:
      - Jumlah Jamaah: ${data.number_of_pax} orang
      - Total Biaya: ${formatPrice(data.total_price)}
      - Biaya Per Pax: ${formatPrice(data.per_pax_price)}

      Durasi Perjalanan:
      - Total Durasi: ${data.travel_duration} hari
      - Durasi di Mekkah: ${data.mekkah_duration} hari
      - Durasi di Madinah: ${data.madinah_duration} hari

      Akomodasi:
      - Hotel di Mekkah: ${data.hotel_mekkah}
      - Hotel di Madinah: ${data.hotel_madinah}

      Transportasi:
      - Transportasi: ${data.transportation}
      - Tiket Pesawat: ${data.flight}

      Layanan Tambahan:
      - Muthawif: ${data.muthawif}
      - Handling: ${data.handling}

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
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-lg font-semibold mb-2">HASIL KALKULASI</h1>
            <div className="bg-gray-100 py-4 rounded-lg">
              {data.total_price && (
                <h2 className="text-3xl font-bold text-blue-600 mb-4">{formatPrice(data.per_pax_price)}</h2>
              )}
              <div className="space-y-3">
                <button className="bg-gray-200 text-sm px-4 py-2 rounded-full">
                  perkiraan biaya per orang dengan jenis kamar quard
                </button>
                <p className="text-gray-600 font-semibold">atau</p>
                <a href="#" className="text-blue-600 underline block mt-2">
                  klik disini jika berminat bergabung dengan group whatsapp
                </a>
              </div>
            </div>
          </div>

          {/* Detail Transaksi and Form */}
          <div className="flex flex-col lg:flex-row gap-10 mt-10">
            {/* Detail Transaksi */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Detail Transaksi</h3>
              <div className="bg-gray-100 p-4 gap-3 rounded-lg flex flex-col justify-between text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-600">Jumlah jama'ah:</p>
                  <p className="text-gray-600 font-medium">{data.number_of_pax} orang</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tiket Pesawat</p>
                  <p className="text-gray-600 font-medium">{data.flight}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Durasi perjalanan:</p>
                  <p className="text-gray-600 font-medium">{data.travel_duration} hari</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Durasi di makkah:</p>
                  <p className="text-gray-600 font-medium">{data.mekkah_duration} hari</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Durasi di madinah:</p>
                  <p className="text-gray-600 font-medium">{data.madinah_duration} hari</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Hotel makkah:</p>
                  <p className="text-gray-600 font-medium">{data.hotel_mekkah}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Hotel madinah:</p>
                  <p className="text-gray-600 font-medium">{data.hotel_madinah}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Transportasi:</p>
                  <p className="text-gray-600 font-medium">{data.transportation}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Muthawif:</p>
                  <p className="text-gray-600 font-medium">{data.muthawif}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Handling:</p>
                  <p className="text-gray-600 font-medium">{data.handling}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Visa:</p>
                  <p className="text-gray-600 font-medium">Sudah Termasuk Visa</p>
                </div>
              </div>
            </div>

            {/* Form */}
            {isOrder ? (
              // Continue contact admin for the order
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

export default CalculationResult;
