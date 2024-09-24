// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { update, get } from '@/api/product-api'; // Add a new API call to get product by ID
// import { getAll } from '@/api/category-api';
// import { CreateProductRequest } from '@/types/ProductType';
// import Select from 'react-select';

// type Category = {
//   id: string;
//   name: string;
// };

// const UpdateProduct: React.FC = () => {
//   const { id } = useParams(); // Assume the product ID is passed via URL params
//   const [initialData, setInitialData] = useState<CreateProductRequest | null>(null);
//   const [formData, setFormData] = useState<CreateProductRequest>({
//     thumbnail: null,
//     name: '',
//     description: '',
//     price: 0,
//     category_ids: [],
//     variations: [],
//     images: [],
//     includes: [],
//     excludes: [],
//   });

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
//   const [currentThumbnail, setCurrentThumbnail] = useState<string | null>(null);

//   const navigate = useNavigate();

//   // Fetch categories and product details
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getAll();
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     const fetchProduct = async () => {
//       try {
//         const response = await get(id);
//         setInitialData(response.data);

//         const product = response.data;
//         // Initialize form data with the product details
//         setFormData({
//           thumbnail: null, // You might want to handle file uploading separately
//           name: product.name,
//           description: product.description,
//           price: product.price,
//           category_ids: [], // Set after selecting categories
//           variations: product.variations,
//           images: [], // Assume images can be replaced
//           includes: product.includes,
//           excludes: product.excludes,
//         });

//         // Set current thumbnail URL
//         setCurrentThumbnail(product.thumbnail);

//         // Set selected categories
//         setSelectedCategories(
//           product.categories.map((category: string) => ({
//             id: category,
//             name: category,
//           }))
//         );
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     fetchCategories();
//     fetchProduct();
//   }, [id]);

//   // Handle file input changes (Thumbnail and Images)
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (!files) return;

//     if (name === 'thumbnail') {
//       setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
//     } else if (name === 'images') {
//       setFormData((prev) => ({
//         ...prev,
//         images: Array.from(files),
//       }));
//     }
//   };

//   // Handle input field changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle category selection changes using react-select
//   const handleCategoryChange = (selectedOptions: any) => {
//     setSelectedCategories(selectedOptions);
//     setFormData((prev) => ({
//       ...prev,
//       category_ids: selectedOptions.map((option: Category) => option.id),
//     }));
//   };

//   // Handle variation input changes
//   const handleVariationChange = (index: number, key: 'name' | 'price', value: string) => {
//     const updatedVariations = [...(formData.variations ?? [])];
//     updatedVariations[index] = { ...updatedVariations[index], [key]: value };
//     setFormData((prev) => ({
//       ...prev,
//       variations: updatedVariations,
//     }));
//   };

//   const addVariation = () => {
//     setFormData((prev) => ({
//       ...prev,
//       variations: [...(prev.variations ?? []), { name: '', price: '' }],
//     }));
//   };

//   const removeVariation = (index: number) => {
//     const updatedVariations = formData.variations?.filter((_, i) => i !== index);
//     setFormData((prev) => ({
//       ...prev,
//       variations: updatedVariations,
//     }));
//   };

//   // Handle include/exclude changes (Similar to variations)
//   const handleIncludeChange = (index: number, value: string) => {
//     const updatedIncludes = [...(formData.includes ?? [])];
//     updatedIncludes[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       includes: updatedIncludes,
//     }));
//   };

//   const handleExcludeChange = (index: number, value: string) => {
//     const updatedExcludes = [...(formData.excludes ?? [])];
//     updatedExcludes[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       excludes: updatedExcludes,
//     }));
//   };

//   const addInclude = () => {
//     setFormData((prev) => ({
//       ...prev,
//       includes: [...(prev.includes ?? []), ''],
//     }));
//   };

//   const addExclude = () => {
//     setFormData((prev) => ({
//       ...prev,
//       excludes: [...(prev.excludes ?? []), ''],
//     }));
//   };

//   const removeInclude = (index: number) => {
//     const updatedIncludes = formData.includes?.filter((_, i) => i !== index);
//     setFormData((prev) => ({
//       ...prev,
//       includes: updatedIncludes,
//     }));
//   };

//   const removeExclude = (index: number) => {
//     const updatedExcludes = formData.excludes?.filter((_, i) => i !== index);
//     setFormData((prev) => ({
//       ...prev,
//       excludes: updatedExcludes,
//     }));
//   };

//   // Submit form data to update the product
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const patchPayload: Partial<CreateProductRequest> = {};

//     // Add only changed fields to the patchPayload
//     if (formData.name !== initialData?.name) patchPayload.name = formData.name;
//     if (formData.description !== initialData?.description) patchPayload.description = formData.description;
//     if (formData.price !== initialData?.price) patchPayload.price = formData.price;
//     if (formData.thumbnail) patchPayload.thumbnail = formData.thumbnail;
//     if (JSON.stringify(formData.category_ids) !== JSON.stringify(initialData?.category_ids)) {
//       patchPayload.category_ids = formData.category_ids;
//     }
//     if (JSON.stringify(formData.variations) !== JSON.stringify(initialData?.variations)) {
//       patchPayload.variations = formData.variations;
//     }
//     if (JSON.stringify(formData.includes) !== JSON.stringify(initialData?.includes)) {
//       patchPayload.includes = formData.includes;
//     }
//     if (JSON.stringify(formData.excludes) !== JSON.stringify(initialData?.excludes)) {
//       patchPayload.excludes = formData.excludes;
//     }
//     if (JSON.stringify(formData.images) !== JSON.stringify(initialData?.images)) {
//       patchPayload.images = formData.images;
//     }

//     // Create a FormData object and append the patchPayload
//     const data = new FormData();
//     Object.keys(patchPayload).forEach((key) => {
//       const value = (patchPayload as any)[key];
//       if (key === 'thumbnail') {
//         data.append('thumbnail', value as Blob);
//       } else if (key === 'images') {
//         value.forEach((image: Blob) => data.append('images', image));
//       } else {
//         data.append(key, value);
//       }
//     });

//     console.log('Submitting form data:', data.getAll('name'));

//     try {
//       const response = await update(id, data);
//       if (!response.success) {
//         console.error('Error updating product:', response.message);
//         return;
//       }
//       // navigate('/admin/produk');
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-8" encType="multipart/form-data">
//         <h1 className="text-3xl font-bold mb-4">Update Product</h1>

//         {/* Display Current Thumbnail */}
//         {currentThumbnail && (
//           <div>
//             <label className="block text-sm font-medium">Current Thumbnail</label>
//             <img
//               src={import.meta.env.VITE_BASE_URL + currentThumbnail}
//               alt="Current Thumbnail"
//               className="w-32 h-32 object-cover rounded-md"
//             />
//           </div>
//         )}

//         {/* Update Thumbnail */}
//         <div>
//           <label className="block text-sm font-medium">Update Thumbnail</label>
//           <input
//             type="file"
//             name="thumbnail"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Product Name */}
//         <div>
//           <label className="block text-sm font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block text-sm font-medium">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleInputChange}
//             className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         {/* Category Dropdown (Multiple Select) */}
//         <div>
//           <label className="block text-sm font-medium">Categories</label>
//           <Select
//             isMulti
//             options={categories.map((category) => ({ value: category.id, label: category.name }))}
//             value={selectedCategories.map((category) => ({ value: category.id, label: category.name }))}
//             onChange={(options) =>
//               handleCategoryChange(options.map((option: any) => ({ id: option.value, name: option.label })))
//             }
//             className="mt-1"
//             required
//           />
//         </div>

//         {/* Variations Section */}
//         <div>
//           <label className="block text-sm font-medium">Variations</label>
//           {formData.variations?.map((variation, index) => (
//             <div key={index} className="flex gap-4 mb-2">
//               <input
//                 type="text"
//                 placeholder="Variation Name"
//                 value={variation.name}
//                 onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
//                 className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Variation Price"
//                 value={variation.price}
//                 onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
//                 className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => removeVariation(index)}
//                 className="mt-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addVariation}
//             className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//           >
//             Add Variation
//           </button>
//         </div>

//         {/* Includes Section */}
//         <div>
//           <label className="block text-sm font-medium">Includes</label>
//           {formData.includes?.map((include, index) => (
//             <div key={index} className="flex gap-4 mb-2">
//               <input
//                 type="text"
//                 placeholder="Include Item"
//                 value={include}
//                 onChange={(e) => handleIncludeChange(index, e.target.value)}
//                 className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => removeInclude(index)}
//                 className="mt-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addInclude}
//             className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//           >
//             Add Include
//           </button>
//         </div>

//         {/* Excludes Section */}
//         <div>
//           <label className="block text-sm font-medium">Excludes</label>
//           {formData.excludes?.map((exclude, index) => (
//             <div key={index} className="flex gap-4 mb-2">
//               <input
//                 type="text"
//                 placeholder="Exclude Item"
//                 value={exclude}
//                 onChange={(e) => handleExcludeChange(index, e.target.value)}
//                 className="mt-1 p-2 block border border-gray-300 rounded-md w-full"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => removeExclude(index)}
//                 className="mt-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addExclude}
//             className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
//           >
//             Add Exclude
//           </button>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
