import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import productService from '../services/api';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: CreateProductRequest) => {
    try {
      const newProduct = await productService.create(productData);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar produto';
      notifications.show({
        title: 'Erro',
        message: errorMessage,
        color: 'red',
      });
    }
  };

  const updateProduct = async (id: number, productData: UpdateProductRequest) => {
    try {
      const updatedProduct = await productService.update(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      notifications.show({
        title: 'Sucesso',
        message: 'Produto atualizado com sucesso!',
        color: 'green',
      });
      return updatedProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar produto';
      notifications.show({
        title: 'Erro',
        message: errorMessage,
        color: 'red',
      });
      throw err;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      notifications.show({
        title: 'Sucesso',
        message: 'Produto removido com sucesso!',
        color: 'green',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao remover produto';
      notifications.show({
        title: 'Erro',
        message: errorMessage,
        color: 'red',
      });
      throw err;
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const data = await productService.getByCategory(category);
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao filtrar produtos';
      setError(errorMessage);
      notifications.show({
        title: 'Erro',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
  };
}
