import { UserResponse } from "./UserType";

export type MitraPackageOrderResponse = {
  id: string;
  user: UserResponse;
  mitra_package_id: string;
  per_pax_price: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateMitraPackageOrderRequest = {
  mitra_package_id: string;
};

export type MitraPackageOrderQueryParams = {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};