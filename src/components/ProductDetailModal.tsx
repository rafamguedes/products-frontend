import {
  Modal,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Divider,
  Button,
  Grid,
  Paper,
  NumberFormatter,
  ThemeIcon,
} from '@mantine/core';
import { 
  IconPackage, 
  IconCalendar, 
  IconCurrencyReal, 
  IconBoxSeam,
  IconEdit,
  IconTrash,
  IconCategory,
  IconFileText,
} from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import type { Product } from '../types/product';

interface ProductDetailModalProps {
  product: Product | null;
  opened: boolean;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductDetailModal({
  product,
  opened,
  onClose,
  onEdit,
  onDelete,
}: ProductDetailModalProps) {
  if (!product) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStockColor = (stock: number) => {
    if (stock <= 0) return 'red';
    if (stock <= 10) return 'orange';
    return 'green';
  };

  const getStockLabel = (stock: number) => {
    if (stock <= 0) return 'Sem estoque';
    if (stock <= 10) return 'Estoque baixo';
    return 'Em estoque';
  };

  const handleDelete = () => {
    modals.openConfirmModal({
      title: 'Confirmar exclusão',
      children: (
        <Text size="sm">
          Tem certeza que deseja excluir o produto{' '}
          <strong>{product.name}</strong>? Esta ação não pode ser desfeita.
        </Text>
      ),
      labels: { confirm: 'Excluir', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        onDelete(product.id);
        onClose();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconPackage size={24} color="var(--mantine-color-blue-6)" />
          <Title order={3}>Detalhes do Produto</Title>
        </Group>
      }
      size="lg"
      centered
    >
      <Stack gap="md">
        {/* Header com nome e categoria */}
        <Paper p="md" withBorder>
          <Group justify="space-between" mb="sm">
            <Title order={2}>{product.name}</Title>
            <Badge size="lg" variant="light" color="blue">
              {product.category}
            </Badge>
          </Group>
          <Text c="dimmed" size="sm">
            ID: #{product.id}
          </Text>
        </Paper>

        {/* Informações principais */}
        <Grid>
          <Grid.Col span={6}>
            <Paper p="md" withBorder>
              <Group gap="sm" mb="xs">
                <ThemeIcon variant="light" color="green">
                  <IconCurrencyReal size={16} />
                </ThemeIcon>
                <Text fw={500}>Preço</Text>
              </Group>
              <Text size="xl" fw={700} c="green">
                <NumberFormatter
                  value={product.price}
                  prefix="R$ "
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                />
              </Text>
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper p="md" withBorder>
              <Group gap="sm" mb="xs">
                <ThemeIcon variant="light" color={getStockColor(product.stock_quantity)}>
                  <IconBoxSeam size={16} />
                </ThemeIcon>
                <Text fw={500}>Estoque</Text>
              </Group>
              <Group gap="xs">
                <Text size="xl" fw={700}>
                  {product.stock_quantity} un.
                </Text>
                <Badge 
                  color={getStockColor(product.stock_quantity)} 
                  variant="light"
                  size="sm"
                >
                  {getStockLabel(product.stock_quantity)}
                </Badge>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Descrição */}
        <Paper p="md" withBorder>
          <Group gap="sm" mb="sm">
            <ThemeIcon variant="light" color="blue">
              <IconFileText size={16} />
            </ThemeIcon>
            <Text fw={500}>Descrição</Text>
          </Group>
          <Text size="sm" c="dimmed">
            {product.description || 'Sem descrição disponível'}
          </Text>
        </Paper>

        {/* Categoria */}
        <Paper p="md" withBorder>
          <Group gap="sm" mb="sm">
            <ThemeIcon variant="light" color="purple">
              <IconCategory size={16} />
            </ThemeIcon>
            <Text fw={500}>Categoria</Text>
          </Group>
          <Badge variant="filled" size="lg">
            {product.category}
          </Badge>
        </Paper>

        {/* Datas */}
        <Paper p="md" withBorder>
          <Group gap="sm" mb="sm">
            <ThemeIcon variant="light" color="gray">
              <IconCalendar size={16} />
            </ThemeIcon>
            <Text fw={500}>Informações de Data</Text>
          </Group>
          <Grid>
            <Grid.Col span={6}>
              <Stack gap={4}>
                <Text size="xs" c="dimmed">
                  Criado em
                </Text>
                <Text size="sm">
                  {formatDate(product.created_at)}
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack gap={4}>
                <Text size="xs" c="dimmed">
                  Última atualização
                </Text>
                <Text size="sm">
                  {formatDate(product.updated_at)}
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        <Divider />

        {/* Ações */}
        <Group justify="flex-end">
          <Button
            variant="light"
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={handleDelete}
          >
            Excluir
          </Button>
          <Button
            leftSection={<IconEdit size={16} />}
            onClick={() => {
              onEdit(product);
              onClose();
            }}
          >
            Editar
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
