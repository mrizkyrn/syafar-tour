import { VendorResponse } from './VendorType';
import { PeriodResponse } from './PeriodType';

export type HotelResponse = {
  id: string;
  vendor: VendorResponse;
  name: string;
  city: 'MEKKAH' | 'MADINAH';
  order_number: number;
  periods: {
    period: PeriodResponse;
    price_double: number;
    price_triple: number;
    price_quad: number;
  }[];
  created_at: Date;
  updated_at: Date;
};

export type HotelQueryParams = {
  vendor_id?: string;
  period_id?: string;
  city?: 'MEKKAH' | 'MADINAH';
};

export type CreateHotelRequest = {
  vendor_id: string;
  name: string;
  city: 'MEKKAH' | 'MADINAH';
  prices: {
    double: number;
    triple: number;
    quad: number;
  };
  order_number: number;
};

export type UpdateHotelRequest = CreateHotelRequest;

export type BulkUpdateHotelRequest = {
  modified:
    | {
        period_id: string;
        vendor_id: string;
        city: 'MEKKAH' | 'MADINAH';
        hotel_id: string;
        name: string;
        order_number: number;
        price_double: number;
        price_triple: number;
        price_quad: number;
      }[]
    | undefined;
  deleted: string[] | undefined;
};
