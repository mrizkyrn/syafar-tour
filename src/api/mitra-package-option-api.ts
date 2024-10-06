import { BulkUpdateMitraPackageOptionRequest } from '@/types/MitraPackageOptionType';
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/mitra-packages`,
  withCredentials: true,
});

export const getAllAirlines = async () => {
  try {
    const response = await api.get('/airlines');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateAirlines = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/airlines/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllVisas = async () => {
  try {
    const response = await api.get('/visas');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateVisas = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/visas/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllTransportations = async () => {
  try {
    const response = await api.get('/transportations');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateTransportations = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/transportations/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllMuthawifs = async () => {
  try {
    const response = await api.get('/muthawifs');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateMuthawifs = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/muthawifs/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllHandlingSaudis = async () => {
  try {
    const response = await api.get('/handling-saudis');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateHandlingSaudis = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/handling-saudis/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllHandlingDomestics = async () => {
  try {
    const response = await api.get('/handling-domestics');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateHandlingDomestics = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/handling-domestics/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllSiskopatuh = async () => {
  try {
    const response = await api.get('/siskopatuh');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateSiskopatuh = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/siskopatuh/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllEquipments = async () => {
  try {
    const response = await api.get('/equipments');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateEquipments = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/equipments/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateTours = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/tours/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const getAllTours = async () => {
  try {
    const response = await api.get('/tours');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
}

export const getAllManasik = async () => {
  try {
    const response = await api.get('/manasik');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const bulkUpdateManasik = async (request: BulkUpdateMitraPackageOptionRequest) => {
  try {
    const response = await api.post('/manasik/bulk', request);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};