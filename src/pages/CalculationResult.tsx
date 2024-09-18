import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCalculation } from '@/api/calculation-api';

interface CalculationData {
  id?: string;
  number_of_pax?: number;
  total_price?: number;
  flight?: { id: string; name: string };
  travel_duration?: number;
  mekkah_duration?: number;
  maddinah_duration?: number;
  hotelMekkah?: { id: string; name: string };
  hotelMaddinah?: { id: string; name: string };
  transportation?: { id: string; name: string };
  muthawwif?: { id: string; name: string };
  handling?: { id: string; name: string };
}

const CalculationResult: React.FC = () => {
  const [data, setData] = useState<CalculationData>({});
  const [loading, setLoading] = useState(true);
  const { id = '' } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getCalculation(id);
      setData(response.data);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-lg font-semibold mb-2">HASIL KALKULASI</h1>
          <div className="bg-gray-100 py-4 rounded-lg">
            {data.total_price && (
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Rp. {data.total_price.toLocaleString()}</h2>
            )}
            <div className="space-y-3">
              <button className="bg-gray-200 text-sm px-4 py-2 rounded-full">
                perkiraan biaya per orang dengan jenis kamar quard
              </button>
              <p className="text-gray-600 font-semibold">atau</p>
              <button className="bg-gray-200 text-sm px-4 py-2 rounded-full">
                berminat ikut bersama group dengan harga 27 juta
              </button>
              <a href="#" className="text-blue-600 underline block mt-2">
                klik disini jika berminat bergabung dengan group whatsapp
              </a>
            </div>
          </div>
        </div>

        {/* Detail Transaksi and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Detail Transaksi */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Detail Transaksi</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-col justify-between space-y-2 text-sm">
                <div className="flex justify-between">
                  <p className="text-gray-600">Jumlah jama'ah:</p>
                  <p className="text-gray-600 font-semibold">{data.number_of_pax} orang</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Tiket Pesawat</p>
                  <p className="text-gray-600 font-semibold">{data.flight?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Durasi perjalanan:</p>
                  <p className="text-gray-600 font-semibold">{data.travel_duration} hari</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Durasi di makkah:</p>
                  <p className="text-gray-600 font-semibold">{data.mekkah_duration} hari</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Durasi di madinah:</p>
                  <p className="text-gray-600 font-semibold">{data.maddinah_duration} hari</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Hotel makkah:</p>
                  <p className="text-gray-600 font-semibold">{data.hotelMekkah?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Hotel madinah:</p>
                  <p className="text-gray-600 font-semibold">{data.hotelMaddinah?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Transportasi:</p>
                  <p className="text-gray-600 font-semibold">{data.transportation?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Muthawif:</p>
                  <p className="text-gray-600 font-semibold">{data.muthawwif?.name}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600">Handling:</p>
                  <p className="text-gray-600 font-semibold">{data.handling?.name}</p>
                </div>
                <div>
                  <span className="font-semibold">Visa:</span> sudah termasuk visa
                </div>
              </div>
            </div>
          </div>

          {/* Konfirmasi Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Konfirmasi</h3>
            <form className="bg-gray-100 p-4 rounded-lg space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold mb-1">
                  Nomor Whatsapp *
                </label>
                <input
                  type="text"
                  id="whatsapp"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nomor Whatsapp"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
    </div>
  );
};

export default CalculationResult;
