import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  ActionIcon,
  Menu,
  rem,
  NumberFormatter,
  Divider,
} from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconEye, IconPackage } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onView: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete, onView }: ProductCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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
      onConfirm: () => onDelete(product.id),
    });
  };

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Group gap="xs">
            <IconPackage size={20} color="var(--mantine-color-blue-6)" />
            <Text fw={500} size="lg" truncate>
              {product.name}
            </Text>
          </Group>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => onView(product)}
              >
                Visualizar
              </Menu.Item>
              <Menu.Item
                leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                onClick={() => onEdit(product)}
              >
                Editar
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                onClick={handleDelete}
              >
                Excluir
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Stack gap="sm" mt="md">
        <Group justify="space-between">
          <Badge color="blue" variant="light">
            {product.category}
          </Badge>
          <Badge color={getStockColor(product.stock_quantity)} variant="light">
            {getStockLabel(product.stock_quantity)}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {product.description}
        </Text>

        <Divider />

        <Group justify="space-between">
          <Stack gap={4}>
            <Text size="xs" c="dimmed">
              Preço
            </Text>
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
          </Stack>

          <Stack gap={4} align="flex-end">
            <Text size="xs" c="dimmed">
              Estoque
            </Text>
            <Text size="lg" fw={600}>
              {product.stock_quantity} un.
            </Text>
          </Stack>
        </Group>

        <Divider />

        <Group justify="space-between">
          <Stack gap={2}>
            <Text size="xs" c="dimmed">
              Criado em
            </Text>
            <Text size="xs">
              {formatDate(product.created_at)}
            </Text>
          </Stack>

          <Stack gap={2} align="flex-end">
            <Text size="xs" c="dimmed">
              Atualizado em
            </Text>
            <Text size="xs">
              {formatDate(product.updated_at)}
            </Text>
          </Stack>
        </Group>
      </Stack>

      <Group justify="center" mt="md">
        <Button
          variant="light"
          color="blue"
          fullWidth
          onClick={() => onView(product)}
        >
          Ver Detalhes
        </Button>
      </Group>
    </Card>
  );
}
