import { useState, useEffect, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '@/api/calculation-api';
import formatPrice from '@/utils/formatPrice';
import Container from '@/components/Container';
import { TextInput } from '@/components/Input';

interface CalculationData {
  id: string;
  number_of_pax: number;
  transportation: string;
  flight: string;
  travel_duration: number;
  mekkah_duration: number;
  madinah_duration: number;
  hotel_mekkah: string;
  hotel_madinah: string;
  muthawif: string;
  handling: string;
  total_price: number;
  per_pax_price: number;
}

const CalculationResult: React.FC = () => {
  const [data, setData] = useState<CalculationData>({} as CalculationData);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const { id = '' } = useParams<{ id: string }>();
  const whatsappTo = '6287881311283';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await get(id);
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit form:', { name, email, whatsapp, data });

    // Format the WhatsApp message
    const message = `
      Halo, saya tertarik untuk bergabung. Berikut detailnya:

      Nama: ${name}
      Email: ${email}

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

    const trimmedMessage = message.split('\n').map((line) => line.trim()).join('\n');

    const whatsappUrl = `https://wa.me/${whatsappTo}?text=${encodeURIComponent(trimmedMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <p className="p-20 mx-auto">Loading...</p>;
  }

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

            {/* Konfirmasi Form */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Konfirmasi</h3>
              <form className="bg-gray-100 p-4 rounded-lg flex flex-col gap-2" onSubmit={handleSubmit}>
                <div>
                  <TextInput
                    placeholder="Nama Lengkap"
                    name="name"
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="Nomor Whatsapp"
                    name="whatsapp"
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setWhatsapp(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-3 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primaryDark transition-colors"
                >
                  Kirim
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Note: Setelah anda melengkapi data diri, Kami akan follow up lebih lanjut terkait kebutuhan anda.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CalculationResult;
