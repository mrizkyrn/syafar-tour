import { UserPackageResponse } from "./UserPackageType";

export type UserPackageOrderResponse = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  user_package_id: string;
  user_package: UserPackageResponse;
  created_at: Date;
  updated_at: Date;
};

export type CreateUserPackageOrderRequest = {
  full_name: string;
  email: string;
  whatsapp_number: string;
  user_package_id: string;
};

export type UserPackageOrderQueryParams = {
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};