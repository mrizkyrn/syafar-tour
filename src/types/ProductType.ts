export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  has_variation: boolean;
  thumbnails: Thumbnail[];
  categories: Category[];
  variations: Variation[];
  includes: IncludeExclude[];
  excludes: IncludeExclude[];
  created_at: Date;
  updated_at: Date;
};

export type ProductQueryParams = {
  name?: string;
  category_ids?: string[];
  has_variation?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};

export type CreateProductRequest = {
  name: string;
  description?: string;
  price?: number;
  has_variation: boolean;
  thumbnails?: File[];
  category_ids?: string[];
  variations?: { name: string; price: number }[];
  includes?: string[];
  excludes?: string[];
};

export type UpdateProductRequest = {
  name: string;
  description: string;
  price: number;
  has_variation: boolean;
  thumbnails: File[];
  category_ids: string[];
  variations: { name: string; price: number }[];
  includes: string[];
  excludes: string[];
};

export interface Category {
  id: string;
  name: string;
}

// interface Variation {
//   name: string;
//   price: string;
// }

type Thumbnail = {
  id: string;
  image_url: string;
};

type Variation = {
  id: string;
  name: string;
  price: number;
};

type IncludeExclude = {
  id: string;
  description: string;
};