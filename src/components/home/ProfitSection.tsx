import Container from '@/components/Container';
import HeadingSection from '@/components/HeadingSection';

const ProfitSection: React.FC = () => {
  return (
    <section className="py-6">
      <Container>
        <HeadingSection title="Keuntungan Menggunakan Umroh360" subtitle="Ayo, manfaatkan Diskon dan Promo Terbaik untuk Ibadah Umroh Anda" />

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://umroh360.com/discover.png" alt="icon-1" className="w-16" />
            <h3 className="text-lg font-semibold mt-4 mb-2">Pengalaman Baru</h3>
            <p className="text-gray-500 text-sm">
              Tersedia sekitar ratusan ribu destinasi, atraksi, pengalaman, dan lain-lain yang bisa kamu coba
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://umroh360.com/custom.png" alt="icon-1" className="w-16" />
            <h3 className="text-lg font-semibold mt-4 mb-2">Tentukan Sendiri</h3>
            <p className="text-gray-500 text-sm">
              Tentukan kebutuhan perjalanan umroh Anda. Nikmati pilihan fasilitas yang dapat dikustomisasi dan wujudkan
              perjalanan umroh Anda bersama kami.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://umroh360.com/kaaba.png" alt="icon-1" className="w-16" />
            <h3 className="text-lg font-semibold mt-4 mb-2">Umroh Freshnel</h3>
            <p className="text-gray-500 text-sm">
              Nikmati penawaran eksklusif promo tiket pesawat untuk perjalanan yang lebih hemat.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <img src="https://umroh360.com/calculator.png" alt="icon-1" className="w-16" />
            <h3 className="text-lg font-semibold mt-4 mb-2">kalkulator Trip</h3>
            <p className="text-gray-500 text-sm">
              Nikmati fitur kalkulator trip untuk pengalaman yang lebih mudah dalam memperkirakan biaya perjalanan dan
              melakukan pemesanan.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProfitSection;
