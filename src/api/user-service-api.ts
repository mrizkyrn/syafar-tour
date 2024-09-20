import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/user-service`,
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

export const getByType = async (type: string) => {
  try {
    const response = await api.get(`/${type}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
}

export const bulkUpdate = async (data: any) => {
  try {
    const response = await api.patch('/bulk', data);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
}