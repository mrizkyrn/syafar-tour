import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@/api/product-api';
import { getAllCategory } from '@/api/category-api';
import { CreateProductRequest } from '@/types/ProductType';
import { CiCirclePlus, CiCircleRemove } from 'react-icons/ci';
import Select from 'react-select';
import formatPrice from '@/utils/formatPrice';

type Category = {
  id: string;
  name: string;
};

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState<CreateProductRequest>({
    thumbnail: null,
    name: '',
    description: '',
    price: 0,
    category_ids: [],
    variations: [],
    images: [],
    includes: [],
    excludes: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;

    if (name === 'thumbnail') {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
    } else if (name === 'images') {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
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
      const price = rawPrice ? rawPrice : '';

      updatedVariations[index] = { ...updatedVariations[index], [key]: price };
    } else {
      updatedVariations[index] = { ...updatedVariations[index], [key]: value };
    }
    setFormData((prev) => ({
      ...prev,
      variations: updatedVariations,
    }));
  };

  // Add a new variation
  const addVariation = () => {
    setFormData((prev) => ({
      ...prev,
      variations: [...(prev.variations ?? []), { name: '', price: '' }],
    }));
  };

  // Remove a variation
  const removeVariation = (index: number) => {
    const updatedVariations = formData.variations?.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      variations: updatedVariations,
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

    // Create a FormData object to handle file uploads
    const data = new FormData();
    data.append('thumbnail', formData.thumbnail as Blob);
    formData.images?.forEach((image) => {
      data.append('images', image); // Append multiple images
    });
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price.toString());
    formData.category_ids.forEach((category) => data.append('category_ids[]', category));

    // Handle variations
    formData.variations?.forEach((variation, index) => {
      data.append(`variations[${index}][name]`, variation.name);
      data.append(`variations[${index}][price]`, variation.price);
    });

    // Handle includes
    formData.includes?.forEach((include, index) => {
      data.append(`includes[${index}]`, include);
    });

    // Handle excludes
    formData.excludes?.forEach((exclude, index) => {
      data.append(`excludes[${index}]`, exclude);
    });

    try {
      const response = await createProduct(data);

      if (!response.success) {
        console.error('Error creating product:', response.message);
        return;
      }

      navigate('/admin/produk/list');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-7" encType="multipart/form-data">
        <h1 className="text-3xl font-bold mb-4">Create Product</h1>

        {/* Thumbnail */}
        <div>
          <label className="block mb-2 font-medium">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
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
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={formatPrice(formData.price)}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
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

        {/* Images */}
        {/* <div>
          <label className="block mb-2 font-medium">Images</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
          />
        </div> */}

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
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
