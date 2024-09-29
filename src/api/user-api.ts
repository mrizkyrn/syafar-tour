import { UpdatePasswordRequest } from '@/types';
import { UpdateUserRequest, UserQueryParams } from '@/types/UserType';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/users`,
  withCredentials: true,
});

export const createUser = async (data: UpdateUserRequest) => {
  try {
    const response = await api.post('/', data);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllUsers = async (params: UserQueryParams) => {
  try {
    const response = await api.get('/', { params });
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/current');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const updateCurrentUser = async (request: UpdateUserRequest) => {
  try {
    const response = await api.patch('/current', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const updateCurrentUserPassword = async (request: UpdatePasswordRequest) => {
  try {
    const response = await api.patch('/current/password', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}

export const updateUser = async (id: string, data: UpdateUserRequest) => {
  // delay for 1 second
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const response = await api.patch(`/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const upgrateUserToMitra = async (id: string) => {
  try {
    const response = await api.patch(`/upgrade/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}