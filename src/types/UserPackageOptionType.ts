export type UserPackageOptionResponse = {
  id: string;
  package_option_id: string;
  package_option_name: string;
  name: string;
  price: number;
  order_number: number;
  created_at: Date;
  updated_at: Date;
};

export type BulkUpdateUserPackageOptionRequest = {
  type: string;
  modifiedData: {
    order_number: any;
    id: string;
    name: string;
    price: number;
  }[];
  deletedData: string[];
};