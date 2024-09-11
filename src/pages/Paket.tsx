import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { Products } from '@/datas';

const Paket: React.FC = () => {
  return (
    <div className="py-10">
      <Container>
        <h2 className="text-xl md:text-2xl font-bold mb-8">Aktivitas Terbaik</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
          {Products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          {Products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Paket;
