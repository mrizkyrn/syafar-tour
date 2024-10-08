import axios from 'axios';
import { CreateExchangeRateRequest, UpdateExchangeRateRequest } from '@/types/ExchangeRate.Type';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/v1/exchange-rates`,
  withCredentials: true,
});

export const getAllExchangeRates = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const getExchangeRate = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const createExchangeRate = async (exchangeRate: CreateExchangeRateRequest) => {
  try {
    const response = await api.post('/', exchangeRate);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const updateExchangeRate = async (exchangeRate: UpdateExchangeRateRequest[]) => {
  try {
    const response = await api.put('/', exchangeRate);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};

export const deleteExchangeRate = async (id: string) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};
