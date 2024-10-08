export type ExchangeRateResponse = {
  id: string;
  currency: string;
  rate_idr: number;
  created_at: Date;
  updated_at: Date;
};

export type CreateExchangeRateRequest = {
  currency: string;
  rate_idr: number;
};

export type UpdateExchangeRateRequest = {
  id: string;
  currency: string | undefined;
  rate_idr: number | undefined;
};
