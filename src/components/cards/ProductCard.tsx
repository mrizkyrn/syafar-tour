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
    <div className="w-full flex flex-row lg:flex-col gap-4 p-5 bg-white shadow-md">
      <div className="basis-1/2">
        <img src={product.imageUrl} alt={product.title} className="object-cover rounded-lg w-full h-32 lg:h-auto" />
      </div>

      <div className="flex flex-col justify-between gap-2">
        <p className="text-gray-700 text-sm">{product.category} • Tour</p>
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <p className="text-gray-800">Mulai dari Rp <span className="font-bold">{product.price.toLocaleString()}</span> PER PAX</p>
      </div>

      <MainButton text="Selengkapnya" onClick={() => console.log('Selengkapnya')} />
    </div>
  );
};

export default ProductCard;
