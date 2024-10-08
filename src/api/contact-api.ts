import { CreateContactRequest, UpdateContactRequest } from '@/types/ContactType';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/contacts`,
  withCredentials: true,
});

export const getAllContacts = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const getContactByName = async (name: string) => {
  try {
    const response = await api.get(`/${name}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
}

export const createContact = async (contact: CreateContactRequest) => {
  try {
    const response = await api.post('/', contact);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const updateContact = async (contact: UpdateContactRequest[]) => {
  try {
    const response = await api.put('/', contact);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const deleteContact = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};