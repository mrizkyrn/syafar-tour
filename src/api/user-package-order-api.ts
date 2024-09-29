import { CreateUserPackageOrderRequest, UserPackageOrderQueryParams } from '@/types/UserPackageOrderType';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/user-package-orders`,
  withCredentials: true,
});

export const createUserPackageOrder = async (request: CreateUserPackageOrderRequest) => {
  try {
    const response = await api.post('/', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllUserPackageOrders = async (params: UserPackageOrderQueryParams) => {
  try {
    const response = await api.get('/', { params });
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}

export const deleteUserPackageOrder = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}