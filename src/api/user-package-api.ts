import { CreateUserPackageRequest } from '@/types/UserPackageType';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/user-packages`,
  withCredentials: true,
});

export const createUserPackage = async (request: CreateUserPackageRequest) => {
  try {
    const response = await api.post('/', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getUserPackage = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}