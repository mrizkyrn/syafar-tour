import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/service-type`,
  withCredentials: true,
});

export const getAll = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};
