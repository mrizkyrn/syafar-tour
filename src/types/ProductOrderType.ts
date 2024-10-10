import { UserResponse } from './UserType';

export type ProductOrderResponse = {
  id: string;
  user: UserResponse;
  product_id: string;
  product_name: string;
  variation: ProductVariation | null;
  departure: Date;
  number_of_pax: number;
  per_pax_price: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateProductOrderRequest = {
  product_id: string;
  variation_id?: string;
  departure: Date;
  number_of_pax: number;
  per_pax_price: number;
  total_price: number;
};

export type ProductOrderQueryParams = {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};


type ProductVariation = {
  id: string;
  name: string;
  price: number;
};
