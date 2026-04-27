import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import { PrivateRoute } from '../routes/PrivateRoute';
import { useContext } from 'react';

// Mock the login service
vi.mock('../services/Service', () => ({
  login: vi.fn(),
}));

// Componente auxiliar para testar o uso do contexto
function TestAuthConsumer() {
  const { usuario, handleLogout } = useContext(AuthContext);
  return (
    <div>
      <span data-testid="token-display">{usuario.token ? 'Logado' : 'Deslogado'}</span>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

describe('AuthContext & PrivateRoute Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('AuthContext', () => {
    it('deve inicializar como deslogado e buscar token do localStorage', async () => {
      localStorage.setItem('token', 'fake-jwt-token');

      render(
        <AuthProvider>
          <TestAuthConsumer />
        </AuthProvider>
      );

      // Espera o useEffect do AuthContext recuperar o token do localStorage
      await waitFor(() => {
        expect(screen.getByTestId('token-display')).toHaveTextContent('Logado');
      });
    });

    it('deve limpar o token do localStorage ao fazer logout', async () => {
      localStorage.setItem('token', 'fake-jwt-token');
      const user = userEvent.setup();

      render(
        <AuthProvider>
          <TestAuthConsumer />
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('token-display')).toHaveTextContent('Logado');
      });

      const logoutButton = screen.getByRole('button', { name: /Sair/i });
      await user.click(logoutButton);

      // O token deve sumir da tela
      expect(screen.getByTestId('token-display')).toHaveTextContent('Deslogado');
      
      // O token deve sumir do localStorage (pelo useEffect)
      await waitFor(() => {
        expect(localStorage.getItem('token')).toBeNull();
      });
    });
  });

  describe('PrivateRoute', () => {
    const renderWithRouter = (initialRoute: string) => {
      return render(
        <AuthProvider>
          <MemoryRouter initialEntries={[initialRoute]}>
            <Routes>
              <Route path="/login" element={<div>Tela de Login</div>} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <div>Dashboard Protegido</div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      );
    };

    it('deve redirecionar para /login se o usuário NÃO estiver autenticado', async () => {
      // localStorage vazio, sem token
      renderWithRouter('/dashboard');

      await waitFor(() => {
        // O PrivateRoute deve nos barrar e mostrar a tela de login
        expect(screen.getByText('Tela de Login')).toBeInTheDocument();
        expect(screen.queryByText('Dashboard Protegido')).not.toBeInTheDocument();
      });
    });

    it('deve renderizar o conteúdo protegido se o usuário estiver autenticado', async () => {
      // Simula usuário com token válido no localStorage
      localStorage.setItem('token', 'valid-token-123');

      renderWithRouter('/dashboard');

      await waitFor(() => {
        // Como o token existe, o PrivateRoute permite renderizar o filho
        expect(screen.getByText('Dashboard Protegido')).toBeInTheDocument();
        expect(screen.queryByText('Tela de Login')).not.toBeInTheDocument();
      });
    });
  });
});
