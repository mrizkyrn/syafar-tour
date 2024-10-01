import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '@/api/product-api';
import { getAllCategories } from '@/api/category-api';
import { CiCirclePlus, CiCircleRemove } from 'react-icons/ci';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import formatPrice from '@/utils/formatPrice';

import 'react-quill/dist/quill.snow.css';
import { Category, ProductResponse, UpdateProductRequest } from '@/types/ProductType';

const UpdateProduct: React.FC = () => {
  const [formData, setFormData] = useState<UpdateProductRequest>({
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

  const [originalData, setOriginalData] = useState<ProductResponse>();
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
        const response = await getProduct(id);
        const product = response.data;

        setOriginalData({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          has_variation: product.has_variation,
          thumbnails: [],
          categories: product.categories,
          variations: product.variations,
          includes: product.includes.map((include: any) => include.description),
          excludes: product.excludes.map((exclude: any) => exclude.description),
          created_at: product.created_at,
          updated_at: product.updated_at,
        });
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          has_variation: product.has_variation,
          thumbnails: [],
          category_ids: product.categories.map((cat: any) => cat.id),
          variations: product.variations.map((variation: any) => ({
            name: variation.name,
            price: variation.price,
          })),
          includes: product.includes.map((include: any) => include.description),
          excludes: product.excludes.map((exclude: any) => exclude.description),
        });
        setSelectedCategories(product.categories);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    setFormData((prev) => ({ ...prev, thumbnails: Array.from(files) }));
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
    if (formData.name !== originalData?.name) {
      if (formData.name) {
        changedData.append('name', formData.name);
      }
    }

    if (formData.description !== originalData?.description) {
      if (formData.description) {
        changedData.append('description', formData.description);
      }
    }

    if (formData.price !== originalData?.price) {
      if (formData.price) {
        changedData.append('price', formData.price.toString());
      }
    }

    if (formData.has_variation !== originalData?.has_variation) {
      changedData.append('has_variation', formData.has_variation.toString());
    }

    (formData.thumbnails ?? []).forEach((thumbnail) => {
      changedData.append('thumbnails', thumbnail);
    });

    if (JSON.stringify(formData.category_ids) !== JSON.stringify(originalData?.categories.map((cat: any) => cat.id))) {
      (formData.category_ids ?? []).forEach((category) => changedData.append('category_ids[]', category));
    }

    // Handle variations
    if (JSON.stringify(formData.variations) !== JSON.stringify(originalData?.variations)) {
      if (formData.variations && formData.variations.length > 0) {
        formData.variations.forEach((variation, index) => {
          changedData.append(`variations[${index}][name]`, variation.name);
          changedData.append(`variations[${index}][price]`, variation.price.toString());
        });
      } else {
        changedData.append('variations', '');
      }
    }

    // Handle includes
    if (JSON.stringify(formData.includes) !== JSON.stringify(originalData?.includes)) {
      if (formData.includes && formData.includes.length > 0) {
        formData.includes.forEach((include, index) => {
          changedData.append(`includes[${index}]`, include);
        });
      } else {
        changedData.append('includes', '');
      }
    }

    // Handle excludes
    if (JSON.stringify(formData.excludes) !== JSON.stringify(originalData?.excludes)) {
      if (formData.excludes && formData.excludes.length > 0) {
        formData.excludes.forEach((exclude, index) => {
          changedData.append(`excludes[${index}]`, exclude);
        });
      } else {
        changedData.append('excludes', '');
      }
    }

    if (!id) {
      console.error('Product ID is undefined');
      return;
    }

    toast.promise(updateProduct(id, changedData), {
      pending: 'Memperbarui...',
      success: {
        render({ data }) {
          navigate('/admin/produk/list');
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
