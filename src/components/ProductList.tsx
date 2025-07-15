import {
  Stack,
  Title,
  Group,
  Button,
  TextInput,
  Select,
  SimpleGrid,
  Text,
  Loader,
  Center,
  Paper,
  Badge,
  ActionIcon,
  Tooltip,
  Pagination,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { 
  IconPlus, 
  IconSearch, 
  IconFilter, 
  IconRefresh, 
  IconGrid3x3,
  IconList,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react';
import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
  onRefresh: () => void;
  onFilterByCategory: (category: string) => void;
}

const categories = [
  'Todas',
  'Eletrônicos',
  'Computadores',
  'Áudio',
  'Acessórios',
  'Monitores',
  'Fotografia',
  'Armazenamento',
];

type SortOption = 'name' | 'price' | 'stock' | 'date';
type SortDirection = 'asc' | 'desc';

export function ProductList({
  products,
  loading,
  onAdd,
  onEdit,
  onDelete,
  onView,
  onRefresh,
  onFilterByCategory,
}: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300);
  
  const itemsPerPage = 12;

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por termo de busca
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Filtrar por categoria
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'stock':
          aValue = a.stock_quantity;
          bValue = b.stock_quantity;
          break;
        case 'date':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [products, debouncedSearchTerm, selectedCategory, sortBy, sortDirection]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category !== 'Todas') {
      onFilterByCategory(category);
    } else {
      onRefresh();
    }
  };

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <Center h={400}>
        <Stack align="center">
          <Loader size="xl" />
          <Text>Carregando produtos...</Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Produtos</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={onAdd}>
          Novo Produto
        </Button>
      </Group>

      <Paper p="md" shadow="sm" withBorder>
        <Group justify="space-between" mb="md">
          <Group gap="md">
            <TextInput
              placeholder="Buscar produtos..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              w={300}
            />
            <Select
              placeholder="Filtrar por categoria"
              leftSection={<IconFilter size={16} />}
              data={categories}
              value={selectedCategory}
              onChange={(value) => handleCategoryChange(value || 'Todas')}
              w={200}
            />
          </Group>

          <Group gap="sm">
            <Tooltip label="Atualizar">
              <ActionIcon variant="light" onClick={onRefresh}>
                <IconRefresh size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={viewMode === 'grid' ? 'Visualização em lista' : 'Visualização em grade'}>
              <ActionIcon 
                variant="light" 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <IconList size={16} /> : <IconGrid3x3 size={16} />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <Group justify="space-between">
          <Group gap="sm">
            <Text size="sm" c="dimmed">
              Ordenar por:
            </Text>
            {(['name', 'price', 'stock', 'date'] as SortOption[]).map((option) => (
              <Button
                key={option}
                variant={sortBy === option ? 'filled' : 'light'}
                size="xs"
                onClick={() => handleSortChange(option)}
                rightSection={
                  sortBy === option ? (
                    sortDirection === 'asc' ? 
                      <IconSortAscending size={12} /> : 
                      <IconSortDescending size={12} />
                  ) : null
                }
              >
                {option === 'name' && 'Nome'}
                {option === 'price' && 'Preço'}
                {option === 'stock' && 'Estoque'}
                {option === 'date' && 'Data'}
              </Button>
            ))}
          </Group>

          <Badge variant="light" size="lg">
            {filteredProducts.length} produtos
          </Badge>
        </Group>
      </Paper>

      {filteredProducts.length === 0 ? (
        <Paper p="xl" ta="center" withBorder>
          <Text size="lg" c="dimmed">
            Nenhum produto encontrado
          </Text>
          <Text size="sm" c="dimmed" mt="sm">
            Tente ajustar os filtros ou adicione novos produtos
          </Text>
        </Paper>
      ) : (
        <>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))}
          </SimpleGrid>

          {totalPages > 1 && (
            <Center mt="md">
              <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={totalPages}
                size="sm"
              />
            </Center>
          )}
        </>
      )}
    </Stack>
  );
}
