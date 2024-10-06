export type MitraPackageOptionResponse = {
  id: string;
  name: string;
  price_idr: number;
  order_number: number;
  created_at: Date;
  updated_at: Date;
};

export type BulkUpdateMitraPackageOptionRequest = {
  created: {
    name: string;
    price_idr: number;
    order_number: number;
  }[];
  modified: {
    id: string;
    name: string;
    price_idr: number;
    order_number: number;
  }[];
  deleted: string[];
};