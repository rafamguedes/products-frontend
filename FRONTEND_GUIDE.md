# Frontend - Sistema de Gestão de Produtos

Este é o frontend React com Vite e Mantine para o sistema de gestão de produtos.

## 🚀 Como Executar

### 1. Certifique-se de que a API Go está rodando
```bash
# No diretório da API Go
cd ../apiRestGolang
docker-compose up -d  # PostgreSQL
go run main.go        # API Go na porta 8080
```

### 2. Execute o frontend
```bash
npm run dev
```

### 3. Acesse a aplicação
- Frontend: http://localhost:5173
- API: http://localhost:8080

## 🎨 Funcionalidades

### ✅ **Implementadas:**
- **Layout responsivo** com AppShell do Mantine
- **CRUD completo** de produtos
- **Listagem com filtros** por categoria e busca
- **Formulários validados** para criar/editar
- **Modais de confirmação** para deletar
- **Notificações** de sucesso/erro
- **Paginação** na listagem
- **Ordenação** por nome, preço, estoque, data
- **Cards visuais** com informações detalhadas
- **Modal de detalhes** completo do produto

### 🔧 **Componentes Principais:**

1. **Layout.tsx** - Shell principal com navegação
2. **ProductList.tsx** - Listagem com filtros e paginação
3. **ProductCard.tsx** - Card visual de cada produto
4. **ProductForm.tsx** - Formulário de criar/editar
5. **ProductDetailModal.tsx** - Modal com detalhes completos

### 🎯 **Tecnologias:**
- **React 19** + **TypeScript**
- **Vite** para build tool
- **Mantine v8** para UI components
- **Axios** para requisições HTTP
- **Tabler Icons** para ícones

### 📱 **Design Responsivo:**
- Mobile-first approach
- Navegação colapsável em telas pequenas
- Grid adaptativo nos cards
- Formulários responsivos

### 🎨 **Melhores Práticas:**
- **Custom hooks** para lógica de negócio
- **TypeScript** para type safety
- **Componentes reutilizáveis**
- **Tratamento de erros** robusto
- **Loading states** em todas as operações
- **Feedback visual** com notificações

## 📋 **Como Usar:**

1. **Navegar:** Use o menu lateral para navegar entre seções
2. **Listar:** Visualize todos os produtos com filtros e busca
3. **Criar:** Clique em "Novo Produto" para adicionar
4. **Editar:** Use o menu ⋯ no card ou clique em "Editar" nos detalhes
5. **Visualizar:** Clique em "Ver Detalhes" para modal completo
6. **Deletar:** Use o menu ⋯ ou o botão nos detalhes (com confirmação)
7. **Filtrar:** Use os filtros por categoria ou campo de busca
8. **Ordenar:** Clique nos botões de ordenação
9. **Paginar:** Use a paginação no final da lista

## 🔄 **Estado da Aplicação:**
- Todas as operações são sincronizadas com a API
- Loading states durante operações
- Cache local dos produtos
- Atualizações em tempo real após mudanças

## 🎭 **Interface:**
- **Tema moderno** com cores Mantine
- **Ícones consistentes** do Tabler
- **Animações suaves** nativas do Mantine
- **Feedback visual** em todas as ações
- **Design profissional** e intuitivo
