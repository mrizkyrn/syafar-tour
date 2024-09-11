import Container from '@/components/Container';
import AboutSection from '@/components/home/AboutSection';
import HeroSection from '@/components/home/HeroSection';
import ProductSection from '@/components/home/ProductSection';
import ReasonSection from '@/components/home/ReasonSection';

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <section className="py-12 mt-12">
        <Container>
          <div className='flex justify-around items-center'>
            <img src="/images/mitra1.png" alt="Mitra" className="w-28 grayscale" />
            <img src="/images/mitra2.png" alt="Mitra" className="w-28 grayscale" />
            <img src="/images/mitra3.png" alt="Mitra" className="w-24 grayscale" />
            <img src="/images/mitra4.png" alt="Mitra" className="w-24 grayscale" />
            <img src="/images/mitra5.png" alt="Mitra" className="w-24 grayscale" />
          </div>
        </Container>
      </section>
      <ProductSection />
      <AboutSection />
      <ReasonSection />
    </>
  );
};

export default Homepage;
