import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import MainButton from '@/components/MainButton';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center relative mt-8">
      {/* Content */}
      <Container>
        <div className="relative bg-hero-gradient px-6 py-12 rounded-b-xl overflow-hidden">
          <div className="flex flex-col p-2 items-start justify-center gap-7 max-w-[720px]">
            <div className="bg-primary py-2 px-5 rounded-full bg-opacity-10 ">
              <span className="text-lg font-medium text-dark">No. 1 di Indonesia</span>
            </div>
            <h1 className="text-[3.5rem] leading-[80px] font-bold text-dark">
              Paket Umroh Terbaik untuk Setiap Perjalanan Ibadah Anda
            </h1>
            <p className='text-xl leading-8 text-slate-500'>
              Temukan paket reguler, private, atau buat paket umroh sesuai kebutuhan Anda. Perjalanan spiritual lebih
              mudah dan nyaman dengan kami.
            </p>
            <MainButton text="Lihat Paket" onClick={() => navigate('/paket')} />
          </div>
          <div className="absolute bottom-0 right-0">
            <img src="/images/hero.png" alt="Hero" className="w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
