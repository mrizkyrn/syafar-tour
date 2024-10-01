import { CreateProductOrderRequest } from '@/types/ProductOrderType';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/product-orders`,
  withCredentials: true,
});

export const getAllProductOrder = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

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