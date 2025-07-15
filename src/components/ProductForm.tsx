import {
  Paper,
  Title,
  TextInput,
  NumberInput,
  Select,
  Textarea,
  Button,
  Group,
  Stack,
  Grid,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPackage, IconDeviceFloppy, IconX } from '@tabler/icons-react';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../types/product';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: CreateProductRequest | UpdateProductRequest) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const categories = [
  'Eletrônicos',
  'Computadores',
  'Áudio',
  'Acessórios',
  'Monitores',
  'Fotografia',
  'Armazenamento',
  'Smartphones',
  'Tablets',
  'Jogos',
  'Casa e Jardim',
  'Esporte e Lazer',
  'Moda',
  'Livros',
  'Saúde e Beleza',
];

export function ProductForm({ product, onSubmit, onCancel, loading }: ProductFormProps) {
  const form = useForm<CreateProductRequest>({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || '',
      stock_quantity: product?.stock_quantity || 0,
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : null),
      price: (value) => (value <= 0 ? 'Preço deve ser maior que zero' : null),
      category: (value) => (value.length < 2 ? 'Categoria é obrigatória' : null),
      stock_quantity: (value) => (value < 0 ? 'Quantidade não pode ser negativa' : null),
    },
  });

  const handleSubmit = async (values: CreateProductRequest) => {
    await onSubmit(values);
  };

  return (
    <Paper shadow="md" radius="md" p="xl" withBorder>
      <Group mb="md">
        <IconPackage size={24} color="var(--mantine-color-blue-6)" />
        <Title order={2}>
          {product ? 'Editar Produto' : 'Novo Produto'}
        </Title>
      </Group>

      <Divider mb="md" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <TextInput
                label="Nome do Produto"
                placeholder="Digite o nome do produto"
                withAsterisk
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Select
                label="Categoria"
                placeholder="Selecione uma categoria"
                data={categories}
                withAsterisk
                searchable
                {...form.getInputProps('category')}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            label="Descrição"
            placeholder="Descreva o produto"
            minRows={3}
            maxRows={6}
            {...form.getInputProps('description')}
          />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                label="Preço"
                placeholder="0,00"
                withAsterisk
                min={0}
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                {...form.getInputProps('price')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                label="Quantidade em Estoque"
                placeholder="0"
                withAsterisk
                min={0}
                {...form.getInputProps('stock_quantity')}
              />
            </Grid.Col>
          </Grid>

          <Divider mt="md" />

          <Group justify="flex-end" mt="md">
            <Button
              variant="light"
              color="gray"
              onClick={onCancel}
              leftSection={<IconX size={16} />}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
              leftSection={<IconDeviceFloppy size={16} />}
            >
              {product ? 'Atualizar' : 'Criar'} Produto
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
