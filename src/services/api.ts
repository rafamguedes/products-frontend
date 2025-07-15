import axios from 'axios';
import type { Product, CreateProductRequest, UpdateProductRequest, ApiResponse } from '../types/product';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratar erros globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const productService = {
  // Listar todos os produtos
  async getAll(): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>('/api/v1/products');
    return response.data.data;
  },

  // Buscar produto por ID
  async getById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/api/v1/products/${id}`);
    return response.data.data;
  },

  // Criar novo produto
  async create(product: CreateProductRequest): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/api/v1/products', product);
    return response.data.data;
  },

  // Atualizar produto
  async update(id: number, product: UpdateProductRequest): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(`/api/v1/products/${id}`, product);
    return response.data.data;
  },

  // Deletar produto
  async delete(id: number): Promise<void> {
    await api.delete(`/api/v1/products/${id}`);
  },

  // Buscar produtos por categoria
  async getByCategory(category: string): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>(`/api/v1/products/category/${category}`);
    return response.data.data;
  },

  // Verificar health da API
  async healthCheck(): Promise<boolean> {
    try {
      await api.get('/health');
      return true;
    } catch {
      return false;
    }
  },
};

export default productService;
