export type CategoryResponse = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateCategoryRequest = {
  name: string;
};

export type UpdateCategoryRequest = {
  name: string;
};
