import React from 'react';

interface Product {
  imageUrl: string;
  title: string;
  type: string;
  priceDesc: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full flex flex-row lg:flex-col gap-4 bg-white cursor-pointer transform hover:-translate-y-1 transition-transform">
      <div className="basis-1/2">
        <img src={product.imageUrl} alt={product.title} className="object-cover rounded-lg w-full h-32 lg:h-auto" />
      </div>

      <div className="flex flex-col justify-between gap-1">
        <div>
          <p className="text-gray-700 text-sm">{product.type}</p>
          <h1 className="text-lg font-semibold">{product.title}</h1>
        </div>
        <p className="text-gray-500">{product.priceDesc}</p>
      </div>
    </div>
  );
};

export default ProductCard;
