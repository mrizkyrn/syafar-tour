
export type VendorResponse = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateVendorRequest = {
  name: string;
};

export type UpdateVendorRequest = {
  name: string;
};