import React from 'react';
import MainButton from '../MainButton';

interface Product {
  imageUrl: string;
  category: string;
  title: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative w-full flex flex-col gap-4 p-5 bg-white shadow-md">
      <img src={product.imageUrl} alt={product.title} className="object-cover rounded-lg w-full h-full lg:h-auto" />

      <div className="flex flex-col justify-between gap-2 md:gap-3">
        <div className="flex items-center justify-between">
          <p className="absolute right-0 text-xs md:text-sm bg-primary text-white px-6 py-1 rounded-s-full w-max">
            Best Seller
          </p>
          <p className="text-gray-700 text-xs md:text-sm">{product.category} • Tour</p>
        </div>
        <h1 className="text-lg md:text-xl font-semibold">{product.title}</h1>
        {product.category === 'Private' ? (
          <p className="text-gray-800">
            Mulai dari Rp <span className="font-bold">{product.price.toLocaleString()}</span> PER PAX
          </p>
        ) : (
          <p className="text-gray-800 font-bold">
            Rp {product.price.toLocaleString()}
          </p>
        )}
      </div>

      <MainButton text="Selengkapnya" onClick={() => console.log('Selengkapnya')} />
    </div>
  );
};

export default ProductCard;
