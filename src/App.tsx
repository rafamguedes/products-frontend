import { useState } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import { ProductDetailModal } from './components/ProductDetailModal';
import { useProducts } from './hooks/useProducts';
import type { Product } from './types/product';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

type AppSection = 'list' | 'create' | 'edit' | 'dashboard' | 'categories';

function App() {
  const [activeSection, setActiveSection] = useState<AppSection>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailModalOpened, setDetailModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    products,
    loading: productsLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    getProductsByCategory,
  } = useProducts();

  const handleCreateProduct = async (productData: any) => {
    setLoading(true);
    try {
      await createProduct(productData);
      setActiveSection('list');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (productData: any) => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      await updateProduct(selectedProduct.id, productData);
      setActiveSection('list');
      setSelectedProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteProduct(id);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveSection('edit');
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setDetailModalOpened(true);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setActiveSection('list');
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section as AppSection);
    if (section === 'create') {
      setSelectedProduct(null);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'create':
        return (
          <ProductForm
            onSubmit={handleCreateProduct}
            onCancel={handleCancel}
            loading={loading}
          />
        );
      case 'edit':
        return (
          <ProductForm
            product={selectedProduct || undefined}
            onSubmit={handleUpdateProduct}
            onCancel={handleCancel}
            loading={loading}
          />
        );
      case 'dashboard':
        return (
          <div>
            <h2>Dashboard - Em desenvolvimento</h2>
            <p>Aqui serão exibidas estatísticas e métricas dos produtos.</p>
          </div>
        );
      case 'categories':
        return (
          <div>
            <h2>Categorias - Em desenvolvimento</h2>
            <p>Aqui será possível gerenciar as categorias dos produtos.</p>
          </div>
        );
      default:
        return (
          <ProductList
            products={products}
            loading={productsLoading}
            onAdd={() => setActiveSection('create')}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
            onRefresh={fetchProducts}
            onFilterByCategory={getProductsByCategory}
          />
        );
    }
  };

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <Layout
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        >
          {renderContent()}
        </Layout>
        <ProductDetailModal
          product={selectedProduct}
          opened={detailModalOpened}
          onClose={() => setDetailModalOpened(false)}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
