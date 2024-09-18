import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/price/`,
   withCredentials: true,
});

export const getAll = async (name: string) => {
   try {
      const response = await api.get(`/${name}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const bulkUpdate = async (data: any, name: string) => {
   try {
      console.log(name);
      const response = await api.patch(`/${name}/bulk`, data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}