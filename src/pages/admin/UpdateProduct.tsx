import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get, update } from '@/api/product-api';
import { getAllCategory } from '@/api/category-api';
import { CiCirclePlus, CiCircleRemove } from 'react-icons/ci';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import formatPrice from '@/utils/formatPrice';

import 'react-quill/dist/quill.snow.css';

type Category = {
  id: string;
  name: string;
};

const UpdateProduct: React.FC = () => {
  type FormData = {
    thumbnail: File | null;
    name: string;
    description: string;
    price: number;
    category_ids: string[];
    variations: { name: string; price: string }[];
    images: File[];
    includes: string[];
    excludes: string[];
  };

  const [formData, setFormData] = useState<FormData>({
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

  const [originalData, setOriginalData] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          console.error('Product ID is undefined');
          return;
        }
        const response = await get(id);
        const product = response.data;

        setOriginalData(product);

        setFormData({
          thumbnail: product.thumbnail,
          name: product.name,
          description: product.description,
          price: product.price,
          category_ids: product.categories.map((category: any) => category.id),
          variations: product.variations.map((variation: any) => ({
            name: variation.name,
            price: variation.price,
          })),
          images: product.images || [],
          includes: product.includes || [],
          excludes: product.excludes || [],
        });

        setSelectedCategories(product.categories);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

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

  const handleCategoryChange = (selectedOptions: any) => {
    setSelectedCategories(selectedOptions);
    setFormData((prev) => ({
      ...prev,
      category_ids: selectedOptions.map((option: Category) => option.id),
    }));
  };

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

  const addVariation = () => {
    setFormData((prev) => ({
      ...prev,
      variations: [...(prev.variations ?? []), { name: '', price: '' }],
    }));
  };

  const removeVariation = (index: number) => {
    const updatedVariations = formData.variations?.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      variations: updatedVariations,
    }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const changedData = new FormData();

    // Compare each field with the original data and append only the changes
    if (formData.thumbnail !== originalData.thumbnail && formData.thumbnail instanceof File) {
      changedData.append('thumbnail', formData.thumbnail);
    }

    if (formData.name !== originalData.name) {
      changedData.append('name', formData.name);
    }

    if (formData.description !== originalData.description) {
      changedData.append('description', formData.description);
    }

    if (formData.price !== originalData.price) {
      changedData.append('price', formData.price.toString());
    }

    if (JSON.stringify(formData.category_ids) !== JSON.stringify(originalData.categories.map((cat: any) => cat.id))) {
      formData.category_ids.forEach((category) => changedData.append('category_ids[]', category));
    }

    formData.variations.forEach((variation, index) => {
      const originalVariation = originalData.variations[index];
      if (
        !originalVariation ||
        variation.name !== originalVariation.name ||
        variation.price !== originalVariation.price
      ) {
        changedData.append(`variations[${index}][name]`, variation.name);
        changedData.append(`variations[${index}][price]`, variation.price);
      }
    });

    if (JSON.stringify(formData.images) !== JSON.stringify(originalData.images)) {
      formData.images?.forEach((image) => {
        changedData.append('images', image);
      });
    }

    // For includes and excludes:
    if (JSON.stringify(formData.includes) !== JSON.stringify(originalData.includes)) {
      formData.includes.forEach((include, index) => {
        changedData.append(`includes[${index}]`, include);
      });
    }

    if (JSON.stringify(formData.excludes) !== JSON.stringify(originalData.excludes)) {
      formData.excludes.forEach((exclude, index) => {
        changedData.append(`excludes[${index}]`, exclude);
      });
    }

    try {
      if (!id) {
        console.error('Product ID is undefined');
        return;
      }
      const response = await update(id, changedData);

      if (!response.success) {
        console.error('Error updating product:', response.message);
        return;
      }

      navigate('/admin/produk/list');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-7" encType="multipart/form-data">
        <h1 className="text-3xl font-bold mb-4">Update Product</h1>

        {/* Thumbnail */}
        <div>
          <label className="block mb-2 font-medium">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md"
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
          <ReactQuill
            value={formData.description}
            
            onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
            className="mt-1 block w-full border border-gray-300 rounded-md"
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

        <button
          type="submit"
          className="bg-primary text-center text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
