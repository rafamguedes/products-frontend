// Teste simples para verificar se tudo funciona
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <div style={{ padding: '20px' }}>
          <h1>Sistema de Gestão de Produtos</h1>
          <p>Frontend com Vite + React + Mantine</p>
          <p>Para testar, certifique-se de que a API Go está rodando na porta 8080</p>
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
