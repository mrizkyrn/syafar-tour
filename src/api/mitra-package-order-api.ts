import { CreateMitraPackageOrderRequest, MitraPackageOrderQueryParams } from '@/types/MitraPackageOrderType';
import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/mitra-package-orders`,
   withCredentials: true,
});

export const createMitraPackageOrder = async (request: CreateMitraPackageOrderRequest) => {
   try {
      const response = await api.post('/', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const getAllMitraPackageOrders = async (params: MitraPackageOrderQueryParams) => {
   try {
      const response = await api.get('/', { params });
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const getAllMitraPackageOrdersByUser = async () => {
   try {
      const response = await api.get('/user');
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
}

export const deleteMitraPackageOrder = async (id: string) => {
   try {
      const response = await api.delete(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};