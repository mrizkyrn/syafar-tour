import { CreateVendorRequest, UpdateVendorRequest } from '@/types/VendorType';
import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/vendors`,
   withCredentials: true,
});

export const getAllVendors = async () => {
   try {
      const response = await api.get('/');
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const getVendorById = async (id: string) => {
   try {
      const response = await api.get(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const createVendor = async (request: CreateVendorRequest) => {
   try {
      const response = await api.post('/', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const updateVendor = async (id: string, request: UpdateVendorRequest) => {
   try {
      const response = await api.put(`/${id}`, request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const deleteVendor = async (id: string) => {
   try {
      const response = await api.delete(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};