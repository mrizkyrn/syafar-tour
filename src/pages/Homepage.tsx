import AboutSection from '@/components/home/AboutSection';
import BannerSection from '@/components/home/BannerSection';
import FaqSection from '@/components/home/FaqSection';
import HeroSection from '@/components/home/HeroSection';
import LastSection from '@/components/home/LastSection';
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
      <LastSection />
    </>
  );
};

export default Homepage;
