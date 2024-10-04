export type PeriodCategory = 'LOW' | 'MID' | 'HIGH' | 'RAMADHAN' | 'ITIKAF';

export type PeriodResponse = {
  id: string;
  category: PeriodCategory;
  start_date: Date;
  end_date: Date;
  created_at: Date;
  updated_at: Date;
};

export type CreatePeriodRequest = {
  category: PeriodCategory;
  start_date: Date;
  end_date: Date;
};

export type UpdatePeriodRequest = CreatePeriodRequest;