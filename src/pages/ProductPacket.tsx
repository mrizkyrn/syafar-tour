import ProductCard from '@/components/cards/ProductCard';
import { Products } from '@/datas';

const ProductPacket: React.FC = () => {
  const filteredProducts = Products.filter((product) => product.category === 'Private');

  return (
    <div className="min-h-screen">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-24">
          <p className="text-lg text-gray-500">Tidak ada produk yang tersedia.</p>
        </div>
      )}
    </div>
  );
};

export default ProductPacket;
