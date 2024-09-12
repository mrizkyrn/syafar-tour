import Container from '@/components/Container';
import AboutSection from '@/components/home/AboutSection';
import BannerSection from '@/components/home/BannerSection';
import FaqSection from '@/components/home/FaqSection';
import HeroSection from '@/components/home/HeroSection';
import ProductSection from '@/components/home/ProductSection';
import ReasonSection from '@/components/home/ReasonSection';

const Homepage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <BannerSection />
      <ProductSection />
      <AboutSection />
      <ReasonSection />
      <FaqSection />
      <section className=" bg-primary">
        <Container>
          <div className="flex justify-between items-end">
            <div className="flex items-start flex-col gap-12 py-16 w-1/2">
              <h1 className="text-5xl leading-normal font-bold text-white">Mulai Perjalanan Ibadah Anda Sekarang!</h1>
              <p className="text-white text-2xl leading-9">
                Nikmati layanan terbaik dengan paket fleksibel, fasilitas lengkap, dan bimbingan dari tim profesional
                kami.
              </p>
              <button
                className="bg-secondary text-white font-medium text-xl px-7 py-3 rounded-md hover:bg-black transition-colors duration-300"
                onClick={() => console.log('clicked')}
              >
                Lihat Paket
              </button>
            </div>

            <div className="w-1/3">
              <img src="/images/image.png" alt="image" className="w-full" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Homepage;
