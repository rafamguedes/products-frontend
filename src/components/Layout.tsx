import { AppShell, Burger, Group, Title, NavLink, rem, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPackage, IconHome, IconPlus, IconList, IconCategory } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Layout({ children, activeSection = 'list', onSectionChange }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  const navItems = [
    { icon: IconHome, label: 'Dashboard', value: 'dashboard' },
    { icon: IconList, label: 'Listar Produtos', value: 'list' },
    { icon: IconPlus, label: 'Novo Produto', value: 'create' },
    { icon: IconCategory, label: 'Categorias', value: 'categories' },
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Group gap="xs">
              <IconPackage size={28} color="var(--mantine-color-blue-6)" />
              <Title order={3} c="blue">
                Products Manager
              </Title>
            </Group>
          </Group>
          <Badge variant="light" color="blue" size="lg">
            Sistema de Gestão
          </Badge>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Title order={4} mb="md" c="dimmed">
          Navegação
        </Title>
        
        {navItems.map((item) => (
          <NavLink
            key={item.value}
            active={activeSection === item.value}
            label={item.label}
            leftSection={<item.icon style={{ width: rem(16), height: rem(16) }} />}
            onClick={() => onSectionChange?.(item.value)}
            mb="xs"
            style={{ borderRadius: 8 }}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
