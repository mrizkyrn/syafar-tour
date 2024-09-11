import Footer from '../components/Footer';
import HeroSection from '../components/home/HeroSection';
import ProductSection from '../components/home/ProductSection';
import ProfitSection from '../components/home/ProfitSection';
import PromoSection from '../components/home/PromoSection';

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <ProfitSection />
      <ProductSection />
      <Footer />
    </>
  );
};

export default Homepage;
