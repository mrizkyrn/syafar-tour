import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/user`,
  withCredentials: true,
});

export const getAllUsers = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const getUsersByRole = async (role: string) => {
  try {
    const response = await api.get(`/role/${role}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/current');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const updateCurrentUser = async (data: any) => {
  try {
    const response = await api.patch('/current', data);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const upgrateUserToMitra = async (id: string) => {
  console.log('Upgrade user to mitra:', id);
  try {
    const response = await api.patch(`/upgrade/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
}