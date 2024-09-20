import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/calculation/`,
   withCredentials: true,
});


export const create = async (data: any) => {
   try {
      const response = await api.post('/', data);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}

export const get = async (id: string) => {
   try {
      const response = await api.get(`/${id}`);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
}