import ProductCard from '@/components/cards/ProductCard';
import { Products } from '@/datas';

const ProdukPaket: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
      {Products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
      {Products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  )
}

export default ProdukPaket