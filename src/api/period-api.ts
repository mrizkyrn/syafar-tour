import axios from 'axios';
import { CreatePeriodRequest, UpdatePeriodRequest } from '@/types/PeriodType';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/periods`,
   withCredentials: true,
});

export const getAllPeriods = async () => {
   try {
      const response = await api.get('/');
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const getPeriodById = async (id: string) => {
   try {
      const response = await api.get(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const createPeriod = async (request: CreatePeriodRequest) => {
   try {
      const response = await api.post('/', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const updatePeriod = async (id: string, request: UpdatePeriodRequest) => {
   try {
      const response = await api.put(`/${id}`, request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const deletePeriod = async (id: string) => {
   try {
      const response = await api.delete(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};
