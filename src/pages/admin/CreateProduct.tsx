import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@/api/product-api';
import { getAllCategories } from '@/api/category-api';
import { Category, CreateProductRequest } from '@/types/ProductType';
import { CiCirclePlus, CiCircleRemove } from 'react-icons/ci';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import formatPrice from '@/utils/formatPrice';

import 'react-quill/dist/quill.snow.css';

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    description: '',
    price: 0,
    has_variation: false,
    thumbnails: [],
    category_ids: [],
    variations: [],
    includes: [],
    excludes: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    setFormData((prev) => ({ ...prev, thumbnails: Array.from(files) }));
  };

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const rawPrice = value.replace(/[Rp,.]/g, '').trim();
      const price = rawPrice ? parseInt(rawPrice) : '';
      setFormData((prev) => ({ ...prev, price: price || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle category selection changes using react-select
  const handleCategoryChange = (selectedOptions: any) => {
    setSelectedCategories(selectedOptions);
    setFormData((prev) => ({
      ...prev,
      category_ids: selectedOptions.map((option: Category) => option.id),
    }));
  };

  // Handle variation input changes
  const handleVariationChange = (index: number, key: 'name' | 'price', value: string) => {
    const updatedVariations = [...(formData.variations ?? [])];
    if (key === 'price') {
      const rawPrice = value.replace(/[Rp,.]/g, '').trim();
      const price = rawPrice ? parseInt(rawPrice) : 0;
      updatedVariations[index] = { ...updatedVariations[index], [key]: price };
    } else {
      updatedVariations[index] = { ...updatedVariations[index], [key]: value };
    }
    setFormData((prev) => ({
      ...prev,
      variations: updatedVariations,
      has_variation: updatedVariations.length > 0,
    }));
  };

  // Add a new variation
  const addVariation = () => {
    const updatedVariations = [...(formData.variations ?? []), { name: '', price: 0 }];
    setFormData((prev) => ({
      ...prev,
      variations: updatedVariations,
      has_variation: updatedVariations.length > 0,
    }));
  };
  
  // Remove a variation
  const removeVariation = (index: number) => {
    const updatedVariations = (formData.variations ?? []).filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      variations: updatedVariations,
      has_variation: updatedVariations.length > 0,
    }));
  };

  // Handle include/exclude input changes
  const handleIncludeChange = (index: number, value: string) => {
    const updatedIncludes = [...(formData.includes ?? [])];
    updatedIncludes[index] = value;
    setFormData((prev) => ({
      ...prev,
      includes: updatedIncludes,
    }));
  };

  const handleExcludeChange = (index: number, value: string) => {
    const updatedExcludes = [...(formData.excludes ?? [])];
    updatedExcludes[index] = value;
    setFormData((prev) => ({
      ...prev,
      excludes: updatedExcludes,
    }));
  };

  // Add a new include/exclude item
  const addInclude = () => {
    setFormData((prev) => ({
      ...prev,
      includes: [...(prev.includes ?? []), ''],
    }));
  };

  const addExclude = () => {
    setFormData((prev) => ({
      ...prev,
      excludes: [...(prev.excludes ?? []), ''],
    }));
  };

  // Remove an include/exclude item
  const removeInclude = (index: number) => {
    const updatedIncludes = formData.includes?.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      includes: updatedIncludes,
    }));
  };

  const removeExclude = (index: number) => {
    const updatedExcludes = formData.excludes?.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      excludes: updatedExcludes,
    }));
  };

  // Submit form data to the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    formData.thumbnails?.forEach((thumbnail) => {
      data.append('thumbnails', thumbnail);
    });

    data.append('name', formData.name);
    data.append('description', formData.description || '');
    data.append('price', formData.has_variation ? '0' : (formData.price ?? 0).toString());
    data.append('has_variation', formData.has_variation.toString());

    // Append category IDs
    formData.category_ids?.forEach((categoryId) => {
      data.append('category_ids[]', categoryId);
    });

    // Append variations
    formData.variations?.forEach((variation, index) => {
      data.append(`variations[${index}][name]`, variation.name);
      data.append(`variations[${index}][price]`, variation.price.toString());
    });

    // Append includes
    formData.includes?.forEach((include, index) => {
      data.append(`includes[${index}]`, include);
    });

    // Append excludes
    formData.excludes?.forEach((exclude, index) => {
      data.append(`excludes[${index}]`, exclude);
    });

    setLoading(true);
    toast.promise(createProduct(data), {
      pending: 'Menambahkan produk...',
      success: {
        render() {
          setLoading(false);
          navigate('/admin/produk/list');
          return 'Produk berhasil ditambahkan';
        },
      },
      error: {
        render({ data }) {
          setLoading(false);
          console.error('Error creating product:', data);
          return (data as { message: string }).message;
        },
      },
    });
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-7" encType="multipart/form-data">
        <h1 className="text-3xl font-semibold mb-8 text-dark">Tambah Produk</h1>

        {/* Thumbnail */}
        <div>
          <label className="block mb-2 font-medium">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
            multiple
            required
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Deskripsi</label>
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formatPrice(formData.price ?? 0)}
            onChange={handleInputChange}
            className={`mt-1 p-2 block w-full border border-gray-300 rounded-md ${
              formData.has_variation ? 'bg-gray-200 text-gray-500' : ''
            }`}
            disabled={formData.has_variation}
            required
          />
        </div>

        {/* Category Dropdown (Multiple Select) */}
        <div>
          <label className="block mb-2 font-medium">Categories</label>
          <Select
            isMulti
            options={categories.map((category) => ({ value: category.id, label: category.name }))}
            value={selectedCategories.map((category) => ({ value: category.id, label: category.name }))}
            onChange={(options) =>
              handleCategoryChange(options.map((option: any) => ({ id: option.value, name: option.label })))
            }
            className="mt-1"
            required
          />
        </div>

        {/* Variations Section */}
        <div className="flex justify-between items-start">
          <div>
            <label className="block font-medium mb-3">Variations</label>
            {formData.variations?.map((variation, index) => (
              <div key={index} className="flex gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Variation Name"
                  value={variation.name}
                  onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Variation Price"
                  value={formatPrice(variation.price)}
                  onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
                <button type="button" onClick={() => removeVariation(index)}>
                  <CiCircleRemove className="inline-block text-4xl" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addVariation}>
            <CiCirclePlus className="inline-block text-4xl" />
          </button>
        </div>

        {/* Includes Section */}
        <div className="flex justify-between items-start">
          <div>
            <label className="block mb-2 font-medium">Includes</label>
            {formData.includes?.map((include, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Include Item"
                  value={include}
                  onChange={(e) => handleIncludeChange(index, e.target.value)}
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
                <button type="button" onClick={() => removeInclude(index)}>
                  <CiCircleRemove className="inline-block text-4xl" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addInclude}>
            <CiCirclePlus className="inline-block text-4xl" />
          </button>
        </div>

        {/* Excludes Section */}
        <div className="flex justify-between items-start">
          <div>
            <label className="block mb-2 font-medium">Excludes</label>
            {formData.excludes?.map((exclude, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  placeholder="Exclude Item"
                  value={exclude}
                  onChange={(e) => handleExcludeChange(index, e.target.value)}
                  className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
                  required
                />
                <button type="button" onClick={() => removeExclude(index)}>
                  <CiCircleRemove className="inline-block text-4xl" />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addExclude}>
            <CiCirclePlus className="inline-block text-4xl" />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primary text-center text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Tambah Produk'}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
