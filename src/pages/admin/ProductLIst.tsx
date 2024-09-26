import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAll, deleteProduct, createProduct } from '@/api/product-api';
import { FaEdit, FaTrashAlt, FaCopy } from 'react-icons/fa';
import { Product, Category } from '@/types/ProductType';
import formatPrice from '@/utils/formatPrice';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<(Product & { categories: Category[] })[]>([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAll();
      console.log(response.data);
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    await deleteProduct(id);

    setProducts(products.filter((product) => product.id !== id));
  };

  // Duplicate product
  const handleDuplicateProduct = async (id: string) => {
    const originalProduct = products.find((product) => product.id === id);
    if (!originalProduct) return;

    // only send category id
    const duplicatedProduct = {
      ...originalProduct,
      name: `${originalProduct.name} (Copy)`,
      category_ids: originalProduct.categories.map((category) => category.id),
    };

    const response = await createProduct(duplicatedProduct);

    setProducts([...products, response.data]);
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-3 border-b">Thumbnail</th>
              <th className="text-left px-6 py-3 border-b">Name</th>
              <th className="text-left px-6 py-3 border-b">Price</th>
              <th className="text-left px-6 py-3 border-b">Variations</th>
              <th className="text-left px-6 py-3 border-b">Categories</th>
              <th className="text-left px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 border-b">
                  <img
                    src={import.meta.env.VITE_BASE_URL + product.thumbnail}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-2 border-b">
                  <Link to={`/produk/${product.id}`} className="text-blue-500 hover:underline">
                    <p className="text-blue-500 hover:underline cursor-pointer">{product.name}</p>
                  </Link>
                </td>
                <td className="px-6 py-2 border-b">
                  {product.variations.length > 0 ? (
                    <p className="text-gray-500">-</p>
                  ) : (
                    <p>{formatPrice(product.price)}</p>
                  )}
                </td>
                <td className="px-6 py-2 border-b">
                  {product.variations.length > 0 ? (
                    product.variations.map((variation, index) => (
                      <div key={index}>
                        <p>
                          {variation.name}: {formatPrice(variation.price)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No variations</p>
                  )}
                </td>
                <td className="px-6 py-2 border-b">
                  {product.categories.map((category: Category) => category.name).join(', ')}
                </td>

                {/* Actions */}
                <td className="flex justify-center items-center px-6 py-2 border-b">
                  <Link to={`/admin/produk/${product.id}`} className="text-blue-500 hover:underline mr-4">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:underline">
                    <FaTrashAlt />
                  </button>
                  <button
                    className="text-gray-600 hover:underline ml-4"
                    onClick={() => handleDuplicateProduct(product.id)}
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit or Add Product Modal */}
    </div>
  );
};

export default ProductList;
