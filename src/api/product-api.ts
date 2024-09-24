import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/product`,
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

export const get = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
}

export const createProduct = async (product: any) => {
  try {
    const response = await api.post('/', product);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const update = async (id: string, product: any) => {
  for (const value of product.values()) {
    console.log(value);
  }
  try {
    const response = await api.patch(`/${id}`, product);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};
