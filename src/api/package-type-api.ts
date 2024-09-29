import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/package-types`,
  withCredentials: true,
});

export const getAllPakcageTypes = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};
