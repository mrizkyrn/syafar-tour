export type UserResponse = {
  id: string;
  full_name: string;
  email: string;
  whatsapp_number: string;
  created_at: string;
  updated_at: string;
  role: string;
  token?: string;
};

export type RegisterUserRequest = {
  full_name: string;
  email: string;
  whatsapp_number: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type CreateUserRequest = {
  full_name: string;
  email: string;
  whatsapp_number: string;
  password: string;
  role: UserRoles;
};

export type UpdateUserRequest = {
  full_name?: string;
  email?: string;
  whatsapp_number?: string;
  role?: UserRoles;
};

export type UpdatePasswordRequest = {
  old_password: string;
  new_password: string;
};

export type UserQueryParams = {
  full_name?: string;
  email?: string;
  whatsapp_number?: string;
  role?: UserRoles;
  sort?: string;
  order?: 'asc' | 'desc';
  page: number;
  limit: number;
};

export type UserRoles = 'USER' | 'MITRA' | 'ADMIN';