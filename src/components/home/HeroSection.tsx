import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import MainButton from '@/components/MainButton';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center relative mt-6 md:mt-8">
      {/* Content */}
      <Container>
        <div className="flex flex-col gap-8 relative bg-linear-gradient md:px-6 md:py-12 rounded-b-xl overflow-hidden">
          <div className="flex flex-col items-start justify-center gap-4 md:gap-7 sm:w-3/5">
            <div className="bg-primary py-2 px-5 rounded-full bg-opacity-10 ">
              <span className="text-xs md:text-lg font-medium text-dark">No. 1 di Indonesia</span>
            </div>
            <h1 className="text-2xl md:text-[3.5rem] md:leading-[80px] font-bold text-dark">
              Paket Umroh Terbaik untuk Setiap Perjalanan Ibadah Anda
            </h1>
            <p className='text-sm md:text-xl md:leading-8 text-slate-500'>
              Temukan paket reguler, private, atau buat paket umroh sesuai kebutuhan Anda. Perjalanan spiritual lebih
              mudah dan nyaman dengan kami.
            </p>
            <MainButton text="Lihat Produk" onClick={() => navigate('/produk')} />
          </div>
          <div className="sm:absolute sm:w-1/2 bottom-0 right-0 -z-10">
            <img src="/images/hero.png" alt="Hero" className="w-full text-end" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
