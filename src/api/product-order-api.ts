import { CreateProductOrderRequest, ProductOrderQueryParams } from '@/types/ProductOrderType';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/product-orders`,
  withCredentials: true,
});

export const getAllProductOrder = async (params: ProductOrderQueryParams) => {
  try {
    const response = await api.get('/', { params });
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllProductOrderByUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}

export const createProductOrder = async (order: CreateProductOrderRequest) => {
  try {
    const response = await api.post('/', order);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const deleteProductOrder = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}