import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import ProductCard from '@/components/cards/ProductCard';
import { Products } from '@/datas';

const ProductSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="py-12 md:py-16 bg-linear-gradient">
        <Container>
          <div className="flex flex-col items-center justify-center gap-6 md:gap-7 mb-12 md:mb-16 md:px-24">
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight md:leading-snug text-center">
              Temukan Paket Umroh, Visa, dan Hotel Terbaik untuk Perjalanan Spiritual Anda
            </h1>
            <p className="text-center text-sm md:text-2xl md:leading-normal text-slate-500">
              Berbagai pilihan layanan umroh dengan fasilitas lengkap dan fleksibel, siap memenuhi kebutuhan ibadah
              Anda.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-9 mb-12">
            <h2 className="text-xl md:text-3xl font-semibold text-dark text-start w-full">Paket Umrah</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
              {Products.filter((product) => product.category === 'Private').map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            <button
              className="px-12 text-xs md:text-base border border-dark text-dark font-semibold py-3 rounded-lg hover:bg-dark hover:text-white transition-all duration-200"
              onClick={() => navigate('/produk')}
            >
              Selengkapnya
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-9">
            <h2 className="text-xl md:text-3xl font-semibold text-dark text-start w-full">Visa Umrah</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
              {Products.filter((product) => product.category === 'Visa').map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            <button
              className="px-12 text-xs md:text-base border border-dark text-dark font-semibold py-3 rounded-lg hover:bg-dark hover:text-white transition-all duration-200"
              onClick={() => navigate('/produk/visa')}
            >
              Selengkapnya
            </button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductSection;
