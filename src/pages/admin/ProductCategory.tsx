import ErrorTemplate from '@/components/ErrorTemplate';
import TableActions from '@/components/TableActions';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '@/api/category-api';
import { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from '@/types/CategoryType';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createFormData, setCreateFormData] = useState<CreateCategoryRequest>({
    name: '',
  });
  const [updateFormData, setUpdateFormData] = useState<UpdateCategoryRequest>({
    name: '',
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error: any) {
      console.error(error);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast.promise(createCategory(createFormData), {
      pending: 'Menambahkan kategori...',
      success: {
        render() {
          setLoading(false);
          setIsAddModalOpen(false);
          setCreateFormData({ name: '' });
          fetchCategories();
          return 'Kategori berhasil ditambahkan';
        },
      },
      error: {
        render({ data }) {
          setLoading(false);
          return (data as { message: string }).message;
        },
      },
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    setLoading(true);
    toast.promise(updateCategory(selectedCategory.id, updateFormData), {
      pending: 'Memperbarui kategori...',
      success: {
        render() {
          setLoading(false);
          setIsEditModalOpen(false);
          setUpdateFormData({ name: '' });
          fetchCategories();
          return 'Kategori berhasil diperbarui';
        },
      },
      error: {
        render({ data }) {
          setLoading(false);
          return (data as { message: string }).message;
        },
      },
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Apakah Anda yakin ingin menghapus kategori ini?');
    if (!confirm) return;

    setLoading(true);
    toast.promise(deleteCategory(id), {
      pending: 'Menghapus kategori...',
      success: {
        render() {
          fetchCategories();
          return 'Kategori berhasil dihapus';
        },
      },
      error: {
        render({ data }) {
          return (data as { message: string }).message;
        },
      },
    });
  };

  const handleEditPress = (category: CategoryResponse) => {
    setSelectedCategory(category);
    setUpdateFormData({ name: category.name });
    setIsEditModalOpen(true);
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  if (error) return <ErrorTemplate message={error} />;

  return (
    <>
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-dark">Manajemen Kategori</h1>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryDark"
          >
            Tambah Kategori
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-3 border-b w-12">No</th>
                <th className="text-left px-4 py-3 border-b">Nama Kategori</th>
                <th className="text-left px-4 py-3 border-b">Tanggal Dibuat</th>
                <th className="text-left px-4 py-3 border-b">Terakhir Diubah</th>
                <th className="text-left px-4 py-3 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{category.name}</td>
                  <td className="px-4 py-3 border-b">{new Date(category.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 border-b">{new Date(category.updated_at).toLocaleString()}</td>
                  <td className="px-4 py-3 border-b">
                    <TableActions onEdit={() => handleEditPress(category)} onDelete={() => handleDelete(category.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Tambah Kategori</h2>

            <form className="mt-4" onSubmit={handleAdd}>
              <div className="mb-4">
                <label className="block text-gray-600">Nama Kategori</label>
                <input
                  type="text"
                  name="name"
                  value={createFormData.name}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primaryDark"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Tambah'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Kategori</h2>

            <form className="mt-4" onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block text-gray-600">Nama Kategori</label>
                <input
                  type="text"
                  name="name"
                  value={updateFormData.name}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primaryDark"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryManagement;
