export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  stock_quantity: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock_quantity?: number;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
}
