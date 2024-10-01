import React, { useEffect, useState } from 'react';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '@/api/category-api';

interface Category {
  id: string;
  name: string;
}

const ProductCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', has_variation: false });
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle create category
  const handleCreate = async () => {
    try {
      await createCategory(newCategory);
      setNewCategory({ name: '', has_variation: false });
      fetchCategories(); // Refresh categories
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Handle delete category
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus kategori ini?');
    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      fetchCategories(); // Refresh categories
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Handle update category
  const handleUpdate = async () => {
    if (!selectedCategoryId || !editCategory) return;
    try {
      await updateCategory(selectedCategoryId, editCategory);
      setEditCategory(null);
      setSelectedCategoryId(null);
      fetchCategories(); // Refresh categories
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-semibold mb-8 text-dark">Manajemen Kategori</h1>

      {/* Create new category form */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-100 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="p-2 border rounded-md mb-2 w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Create
        </button>
      </div>

      {/* List categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-4 list-none">
          {categories.map((category) => (
            <li key={category.id} className="p-4 border rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{category.name}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setEditCategory({ id: category.id, name: category.name });
                  }}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Update category form */}
      {editCategory && (
        <div className="p-4 border rounded-lg bg-gray-100 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
          <input
            type="text"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
            className="p-2 border rounded-md mb-2 w-full"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
