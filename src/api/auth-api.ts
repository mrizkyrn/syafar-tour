import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/auth`,
   withCredentials: true,
});

export const register = async (userData: any) => {
   try {
      console.log(userData);
      const response = await api.post('/register', userData);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const login = async (userData: any) => {
   try {
      const response = await api.post('/login', userData);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};

export const logout = async () => {
   try {
      const response = await api.post('/logout');
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      return error.response.data;
   }
};
