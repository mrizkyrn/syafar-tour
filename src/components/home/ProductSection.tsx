import { Link } from 'react-router-dom';
import Container from '@/components/Container';
import ProductCard from '@/components/cards/ProductCard';
import { Products } from '@/datas';

const ProductSection: React.FC = () => {
  return (
    <>
      <section className="py-16">
        <Container>
          <div className="flex flex-col items-center justify-center gap-7 mb-16 px-24">
            <h1 className="text-5xl font-bold text-dark leading-snug text-center">
              Temukan Paket Umroh, Visa, dan Hotel Terbaik untuk Perjalanan Spiritual Anda
            </h1>
            <p className="text-center text-2xl leading-relaxed text-slate-500">
              Berbagai pilihan layanan umroh dengan fasilitas lengkap dan fleksibel, siap memenuhi kebutuhan ibadah
              Anda.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center gap-9 mb-12">
            <h2 className="text-3xl font-semibold text-dark text-start w-full">Paket Umrah</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
              {Products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            <button className="px-12 border border-dark text-dark font-semibold py-3 rounded-lg hover:border-primary hover:bg-primary hover:text-white transition-all duration-200">
              <Link to="/produk">Selengkapnya</Link>
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-9">
            <h2 className="text-3xl font-semibold text-dark text-start w-full">Visa Umrah</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
              {Products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            <button className="px-12 border border-dark text-dark font-semibold py-3 rounded-lg hover:border-primary hover:bg-primary hover:text-white transition-all duration-200">
              <Link to="/produk">Selengkapnya</Link>
            </button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductSection;
