/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Product as ProductType } from '@/types/ProductType';
import { getAll } from '@/api/product-api';
import Container from '@/components/Container';
import ProductCard from '@/components/cards/ProductCard';

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [activeCategory, setActiveCategory] = useState<'Paket Umroh' | 'Visa Umroh' | 'Paket Hotel'>('Paket Umroh');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAll();
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  // Function to filter products based on active category
  const filterProducts = (category: 'Paket Umroh' | 'Visa Umroh' | 'Paket Hotel') => {
    setActiveCategory(category);

    // Replace the filter condition based on your actual product data structure
    const filtered = products.filter((product) => {
      if (category === 'Paket Umroh') return product.categories.includes('Paket Umroh');
      if (category === 'Visa Umroh') return product.categories.includes('Visa Umroh');
      if (category === 'Paket Hotel') return product.categories.includes('Paket Hotel');

      return false;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    // Initially set the filtered products to "Paket Umroh"
    filterProducts('Paket Umroh');
  }, [products]);

  return (
    <div className="py-7 md:py-10">
      <Container>
        <div className="flex items-center justify-start mb-8 gap-5">
          <div className="w-1 sm:w-2 h-8 bg-primary rounded-full" />
          <h2 className="text-xl md:text-2xl font-semibold">Pilihan Terbaik</h2>
        </div>

        <div className="flex items-center mb-8 md:mb-12 w-full bg-[#F3F3F3]">
          <button
            onClick={() => filterProducts('Paket Umroh')}
            className={`text-xs md:text-lg hover:bg-primary hover:text-white text-center py-2 px-2 md:px-5 w-40 ${
              activeCategory === 'Paket Umroh' ? 'text-white bg-primary' : 'text-slate-500'
            }`}
          >
            Paket Umroh
          </button>
          <button
            onClick={() => filterProducts('Visa Umroh')}
            className={`text-xs md:text-lg hover:bg-primary hover:text-white text-center py-2 px-2 md:px-5 w-40 ${
              activeCategory === 'Visa Umroh' ? 'text-white bg-primary' : 'text-slate-500'
            }`}
          >
            Visa Umroh
          </button>
          <button
            onClick={() => filterProducts('Paket Hotel')}
            className={`text-xs md:text-lg hover:bg-primary hover:text-white text-center py-2 px-2 md:px-5 w-40 ${
              activeCategory === 'Paket Hotel' ? 'text-white bg-primary' : 'text-slate-500'
            }`}
          >
            Paket Hotel
          </button>
        </div>

        {/* Display the filtered products */}
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
      </Container>
    </div>
  );
};

export default Product;
