import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/mitra-package-orders`,
   withCredentials: true,
});

export const createMitraPackageOrder = async (request: any) => {
   try {
      const response = await api.post('/', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};