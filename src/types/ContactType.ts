export type ContactResponse = {
  id: string;
  name: string;
  value: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateContactRequest = {
  name: string;
  value: string;
};

export type UpdateContactRequest = {
  id: string;
  name: string | undefined;
  value: string | undefined;
};