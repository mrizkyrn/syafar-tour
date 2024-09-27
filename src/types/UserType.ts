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