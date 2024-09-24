export interface Product {
  id: string;
  thumbnail: string;
  name: string;
  description: string;
  price: number;
  categories: string[];
  variations: Variation[];
  images: string[];
  includes: string[];
  excludes: string[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductRequest {
  thumbnail: File | null;
  name: string;
  description: string;
  price: number;
  category_ids: string[];
  variations?: Variation[];
  images?: File[]; 
  includes?: string[];
  excludes?: string[];
};

interface Variation {
  name: string;
  price: string;
}