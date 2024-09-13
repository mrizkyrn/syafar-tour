import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';

const LastSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-primary bg-section-pattern bg-no-repeat bg-cover bg-center">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-end">
          <div className="flex items-start flex-col gap-5 lg:gap-12 py-12 md:py-16 w-full lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl lg:leading-snug font-bold text-white">
              Mulai Perjalanan Ibadah Anda Sekarang!
            </h1>
            <p className="text-white text-sm md:text-2xl leading-6 md:leading-9">
              Nikmati layanan terbaik dengan paket fleksibel, fasilitas lengkap, dan bimbingan dari tim profesional
              kami.
            </p>
            <button
              className="bg-secondary text-white font-medium text-xs lg:text-xl px-7 py-3 rounded-md hover:bg-black transition-colors duration-300"
              onClick={() => navigate('/paket')}
            >
              Lihat Paket
            </button>
          </div>

          <div className="w-full lg:w-1/3">
            <img src="/images/image.png" alt="image" className="w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LastSection;
