export type UserResponse = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  role: string;
  token?: string;
};

export type UpdatePasswordRequest = {
  old_password: string;
  new_password: string;
};