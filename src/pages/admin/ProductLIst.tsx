import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, createProduct, getAllProductsWithQuery } from '@/api/product-api';
import { ProductResponse, Category, ProductQueryParams } from '@/types/ProductType';
import { toast } from 'react-toastify';
import formatPrice from '@/utils/formatPrice';
import { PaginationResponse } from '@/types/PaginationType';
import SortableHeader from '@/components/SortableHeader';
import Pagination from '@/components/Pagination';
import ErrorTemplate from '@/components/ErrorTemplate';
import TableActions from '@/components/TableActions';

const columns = [
  { label: 'No', key: 'index', sortable: false },
  { label: 'Thumbnail', key: 'thumbnail', sortable: false },
  { label: 'Nama Produk', key: 'name', sortable: true },
  { label: 'Harga', key: 'price', sortable: true },
  { label: 'Variasi', key: 'variations', sortable: false },
  { label: 'Kategori', key: 'categories', sortable: false },
  { label: 'Dibuat pada', key: 'created_at', sortable: true },
  { label: 'Aksi', key: 'actions', sortable: false },
];

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<(ProductResponse & { categories: Category[] })[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<ProductQueryParams>({
    name: '',
    sort: 'created_at',
    order: 'asc' as 'asc' | 'desc',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState<PaginationResponse>({
    total: 0,
    current_page: 1,
    total_pages: 1,
    limit: 10,
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    const response = await getAllProductsWithQuery(searchParams);

    if (response.success) {
      setProducts(response.data.data);
      setPagination(response.data.pagination);

      setSearchParams((prev) => ({ ...prev }));
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  // Fetch products
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchParams.name,
    searchParams.limit,
    searchParams.page,
    searchParams.sort,
    searchParams.order,
    searchParams.has_variation,
  ]);

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    toast.promise(deleteProduct(id), {
      pending: 'Menghapus produk...',
      success: {
        render({ data }) {
          setProducts(products.filter((product) => product.id !== id));
          return (data as { message: string }).message;
        },
      },
      error: {
        render({ data }) {
          return (data as { message: string }).message;
        },
      },
    });
  };

  // Duplicate product
  const handleDuplicateProduct = async (id: string) => {
    const originalProduct = products.find((product) => product.id === id);
    if (!originalProduct) return;

    const duplicatedProduct = {
      ...originalProduct,
      price: originalProduct.price.toString(),
      has_variation: originalProduct.has_variation.toString(),
      includes: originalProduct.includes.map((include: any) => include.description),
      excludes: originalProduct.excludes.map((exclude: any) => exclude.description),
      name: `${originalProduct.name} (Copy)`,
      category_ids: originalProduct.categories.map((category) => category.id),
    };

    const response = await createProduct(duplicatedProduct);

    if (!response) {
      toast.error('Gagal menduplikasi produk');
      return;
    }

    setProducts([...products, response.data]);
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/produk/${id}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, name: e.target.value, page: 1 });
  };

  const handleHasVariationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { has_variation, ...rest } = searchParams;
      setSearchParams({ ...rest, page: 1 });
    } else {
      setSearchParams({ ...searchParams, has_variation: e.target.value, page: 1 });
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, limit: parseInt(e.target.value), page: 1 });
  };

  const handleSort = (column: string) => {
    setSearchParams((prev) => ({
      ...prev,
      sort: column,
      order: prev.sort === column ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  const filteredProducts = useMemo(() => {
    return products.map((product, idx) => ({
      ...product,
      index: idx + 1 + (searchParams.page - 1) * searchParams.limit,
    }));
  }, [products, searchParams.page, searchParams.limit]);

  if (error) return <ErrorTemplate message={error} />;

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-dark">List Produk</h1>

      {/* Search & Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchParams.name}
          onChange={handleSearch}
          placeholder="Cari nama lengkap, email, atau whatsapp"
          className="border px-4 py-1 rounded-md border-gray-400 w-80"
        />

        {/* has variation checkbox true/false */}
        <div className="flex items-center gap-3">
          <label className="text-gray-600" htmlFor="has_variation">
            Variasi
          </label>
          <select
            name="has_variation"
            value={searchParams.has_variation}
            onChange={handleHasVariationChange}
            className="border px-4 py-1 rounded-md border-gray-400"
          >
            <option value="">Semua</option>
            <option value="true">Ada</option>
            <option value="false">Tidak Ada</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-gray-600" htmlFor="limit">
            Show
          </label>
          <select
            name="limit"
            value={searchParams.limit}
            onChange={handleLimitChange}
            className="border px-4 py-1 rounded-md border-gray-400"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) =>
                column.sortable ? (
                  <SortableHeader
                    key={column.key}
                    label={column.label}
                    sortKey={column.key}
                    currentSort={searchParams.sort || ''}
                    currentOrder={searchParams.order || ''}
                    onSort={handleSort}
                  />
                ) : (
                  <th className="text-left px-6 py-3 border-b">{column.label}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 border-b">{product.index}</td>
                <td className="px-6 py-2 border-b">
                  <img
                    src={import.meta.env.VITE_BASE_URL + product.thumbnails[0].image_url}
                    alt={product.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="px-6 py-2 border-b">{product.name}</td>
                <td className="px-6 py-2 border-b">{formatPrice(product.price)}</td>
                <td className="px-6 py-2 border-b">
                  {product.variations.length > 0 ? (
                    product.variations.map((variation) => (
                      <span key={variation.id} className="inline-block">
                        {variation.name} - {formatPrice(variation.price)}
                      </span>
                    ))
                  ) : (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md">Tidak ada</span>
                  )}
                </td>

                <td className="px-6 py-2 border-b">{product.categories.map((category) => category.name).join(', ')}</td>
                <td className="px-6 py-2 border-b">{new Date(product.created_at).toLocaleString()}</td>
                <td className="px-6 py-2 border-b">
                  <TableActions
                    onEdit={() => handleEditProduct(product.id)}
                    onDelete={() => handleDeleteProduct(product.id)}
                    onDuplicate={() => handleDuplicateProduct(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
      />

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ProductList;
