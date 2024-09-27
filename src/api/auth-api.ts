import { RegisterUserRequest, LoginUserRequest } from '@/types/UserType';
import axios from 'axios';

const api = axios.create({
   baseURL: `${import.meta.env.VITE_BASE_URL}/v1/auth`,
   withCredentials: true,
});

export const registerUser = async (request: RegisterUserRequest) => {
   try {
      const response = await api.post('/register', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const loginUser = async (request: LoginUserRequest) => {
   try {
      const response = await api.post('/login', request);
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};

export const logoutUser = async () => {
   try {
      const response = await api.post('/logout');
      return response.data;
   } catch (error: any) {
      console.error(error.response.data);
      throw error.response.data;
   }
};
