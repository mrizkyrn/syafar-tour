import React from 'react';
import { Product } from '@/types/ProductType';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (// move to up when hover
    <Link to={`/produk/${product.id}`} className="relative w-full flex flex-col gap-4 p-5 bg-white shadow-md hover:shadow-lg hover:-translate-y-3 transition duration-300 ease-in-out">
      <img
        src={import.meta.env.VITE_BASE_URL + product.thumbnail}
        alt={product.name}
        className="object-cover rounded-lg w-full h-full lg:w-auto"
      />

      <div className="flex flex-col justify-between gap-2 md:gap-3">
        <div className="flex items-center justify-between">
          <p className="absolute right-0 text-xs md:text-sm bg-primary text-white px-6 py-1 rounded-s-full w-max">
            Best Seller
          </p>
          <p className="text-gray-700 text-xs md:text-sm">
            {product.categories.map((category) => category.name).join(' • ')}
          </p>
        </div>
        <h1 className="text-lg md:text-xl font-semibold">{product.name}</h1>
        <p className="text-gray-800">
          Mulai dari Rp <span className="font-bold">{product.price.toLocaleString()}</span> PER PAX
        </p>
      </div>

      <div className='bg-primary text-center text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md'
      >
        Lihat Produk
      </div>
    </Link>
  );
};

export default ProductCard;
