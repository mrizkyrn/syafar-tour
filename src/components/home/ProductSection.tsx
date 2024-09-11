import { Link } from 'react-router-dom';
import Container from '@/components/Container';
import HeadingSection from '@/components/HeadingSection';
import ProductCard from '@/components/ProductCard';
import { Products } from '@/datas';

const ProductSection: React.FC = () => {
  return (
    <>
      {/* First Products */}
      <section className="py-6">
        <Container>
          <HeadingSection
            title="Visa dan Umroh"
            subtitle="Jangan lewatkan paket umroh di waktu terdekat. Ayo cek sekarang!"
          />

          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            {Products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <Link
              to="/paket"
              className="border border-gray-300 py-2 px-10 rounded-full text-sm hover:bg-blue-900 hover:text-white transition-colors duration-300"
            >
              Lihat Selengkapnya
            </Link>
          </div>
        </Container>
      </section>

      {/* Second Products */}
      <section className="py-6">
        <Container>
          <HeadingSection title="Tour And Package" subtitle="Ayo, Kunjungi destinasi favorit kamu. Ayo cek sekarang!" />

          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            {Products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <Link
              to="/paket"
              className="border border-gray-300 py-2 px-10 rounded-full text-sm hover:bg-blue-900 hover:text-white transition-colors duration-300"
            >
              Lihat Selengkapnya
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductSection;
