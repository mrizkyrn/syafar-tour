import axios from 'axios';
import { CreateMitraPackageRequest } from '@/types/MitraPackageType';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/mitra-packages`,
   withCredentials: true,
});

export const createMitraPackage = async (request: CreateMitraPackageRequest) => {
   try {
      const response = await api.post('/', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const getMitraPackage = async (id: string) => {
   try {
      const response = await api.get(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};
