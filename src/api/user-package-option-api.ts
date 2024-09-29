import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/user-package-options`,
  withCredentials: true,
});

export const getAllUserPackageOptions = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getUserPackageItemByType = async (type: string) => {
  try {
    const response = await api.get(`/${type}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdate = async (type: string, modifiedData: any[], deletedData: any[]) => {
  try {
    const response = await api.post('/bulk', { type, modifiedData, deletedData });
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};
