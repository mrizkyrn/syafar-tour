import axios from 'axios';
import { BulkUpdateHotelRequest, CreateHotelRequest, HotelQueryParams, UpdateHotelRequest } from '@/types/HotelType';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/hotels`,
   withCredentials: true,
});

export const getAllHotels = async (params: HotelQueryParams) => {
   try {
      const response = await api.get('/', { params });
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const getHotelById = async (id: string) => {
   try {
      const response = await api.get(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const createHotel = async (request: CreateHotelRequest) => {
   try {
      const response = await api.post('/', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const updateHotel = async (id: string, request: UpdateHotelRequest) => {
   try {
      const response = await api.put(`/${id}`, request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const bulkUpdateHotel = async (request: BulkUpdateHotelRequest) => {
   try {
      const response = await api.post('/bulk', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
}

export const deleteHotel = async (id: string) => {
   try {
      const response = await api.delete(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};