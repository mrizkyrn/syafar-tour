import Container from '@/components/Container';
import MainButton from '@/components/MainButton';
import React from 'react';

const DetailProduct: React.FC = () => {
  return (
    <Container>
      <div className="py-7 md:py-10">
        {/* Header */}
        <h1 className="text-3xl font-semibold mb-10">Umroh Bermanfaat - LA ONLY</h1>

        {/* Images Section */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Main Image */}
          <div className="col-span-2">
            <img src="/images/about.png" alt="Main Umrah Image" className="w-full h-auto" />
          </div>
          {/* Secondary Images */}
          <div className="grid grid-rows-2 gap-4">
            <img src="/images/about.png" alt="Camels" className="w-full h-auto" />
            <img src="/images/about.png" alt="Mecca Towers" className="w-full h-auto" />
          </div>
        </div>

        <div className="flex justify-between items-start mb-8 gap-16">
          <div className="w-3/4">
            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Deskripsi</h2>
              <p className="text-xl text-gray-700 leading-8">
                Paket Umroh Bermanfaat - LA ONLY dirancang untuk Anda yang ingin merasakan pengalaman umroh dengan fokus
                pada layanan akomodasi di Mekkah dan Madinah. Paket ini mencakup pengurusan visa dan layanan hotel,
                namun tanpa transportasi dan tiket pesawat, memberikan fleksibilitas bagi Anda yang ingin mengatur
                transportasi secara mandiri.
              </p>
            </div>

            {/* Details Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Detail</h2>
              <ul className="list-disc text-xl leading-8 pl-6 text-gray-700 flex flex-col gap-2">
                <li>Visa Umroh: Termasuk pengurusan visa dengan layanan cepat.</li>
                <li>Akomodasi:</li>
                <ul className="list-disc pl-6">
                  <li>Hotel bintang 4 di Mekkah, berjarak hanya 500 meter dari Masjidil Haram.</li>
                  <li>Hotel bintang 4 di Madinah, dekat dengan Masjid Nabawi.</li>
                </ul>
                <li>Durasi: 9 hari (4 hari di Mekkah, 3 hari di Madinah).</li>
                <li>Fasilitas Lain: Bimbingan ibadah oleh ustadz, Wi-Fi, sarapan, dan laundry.</li>
              </ul>
            </div>
          </div>

          <div className="w-1/4">
            {/* Pricing and Call to Action */}
            <div className="flex flex-col items-end justify-between bg-gray-50 p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col items-end gap-2 mb-5">
                <p className="text-xl">Mulai dari</p>
                <p className="text-3xl font-bold text-yellow-500">RP. 11,900,000</p>
                <p className="text-sm text-gray-500">Per pax/jama'ah</p>
              </div>
              <MainButton text="Silahkan Pilih" to="/checkout" />
            </div>

            {/* Other Packages */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Paket Lainnya</h2>
              <div className="flex flex-col gap-6">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <img src="/path/to/other-package1.jpg" alt="Other Package 1" className="rounded-lg mb-4" />
                  <p className="text-lg font-bold">Umroh Tengah</p>
                  <p className="text-xl font-bold text-yellow-500">Rp. 22,900,000</p>
                  <button className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-yellow-600">
                    Lihat Paket
                  </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                  <img src="/path/to/other-package2.jpg" alt="Other Package 2" className="rounded-lg mb-4" />
                  <p className="text-lg font-bold">Umroh VIP</p>
                  <p className="text-xl font-bold text-yellow-500">Rp. 32,900,000</p>
                  <button className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-yellow-600">
                    Lihat Paket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailProduct;
