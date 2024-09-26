/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Category, Product as ProductType } from '@/types/ProductType';
import { getAll } from '@/api/product-api';
import { getAllCategory } from '@/api/category-api';
import Container from '@/components/Container';
import ProductCard from '@/components/cards/ProductCard';

const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAll();
      setProducts(response.data);
    };

    const fetchCategories = async () => {
      const response = await getAllCategory();
      setCategories(response.data);
      setActiveCategory(response.data[0].name);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filterProducts = (category: string) => {
    setActiveCategory(category);

    const filtered = products.filter((product) => {
      return product.categories.some((cat) => cat.name === category);
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
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
        {
          categories.map((category, index) => (
            <button
              key={index}
              onClick={() => filterProducts(category.name)}
              className={`text-xs md:text-lg hover:bg-primary hover:text-white text-center py-2 px-2 md:px-5 ${
                activeCategory === category.name ? 'text-white bg-primary' : 'text-slate-500'
              }`}
            >
              {category.name}
            </button>
          ))
        }
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
