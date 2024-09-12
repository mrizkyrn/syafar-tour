import Container from '@/components/Container';
import FaqItem from '@/components/FaqItem';

const FaqSection: React.FC = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col items-center justify-center gap-5 mb-16 px-24">
          <h1 className="text-5xl font-bold text-dark leading-snug text-center">Pertanyaan yang Sering Diajukan</h1>
          <p className="text-center text-2xl leading-relaxed text-slate-500">
            Semua yang Perlu Anda Ketahui Sebelum Memulai Perjalanan Ibadah
          </p>
        </div>

        <div className="flex flex-col gap-7 w-full">
          <FaqItem
            question="Apa itu Syafar Tour dan bagaimana cara kerjanya?"
            answer="Syafar Tour adalah agen perjalanan umroh dan haji yang berkomitmen untuk menyediakan layanan terbaik bagi setiap jamaah. Dengan pengalaman bertahun-tahun, kami menawarkan berbagai paket umroh dan haji yang dapat disesuaikan dengan kebutuhan Anda. Didukung oleh tim profesional, kami memastikan kenyamanan, keamanan, dan kemudahan perjalanan anda."
          />
          <FaqItem
            question="Apa saja paket umroh yang tersedia di Syafar Tour?"
            answer="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
          <FaqItem
            question="Apa saja yang termasuk dalam paket umroh?"
            answer="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
          <FaqItem
            question="Bagaimana cara mendaftar umroh di Syafar Tour?"
            answer="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
          <FaqItem
            question="Apakah saya bisa membayar secara cicilan?"
            answer="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          />
        </div>
      </Container>
    </section>
  );
};

export default FaqSection;
