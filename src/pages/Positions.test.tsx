import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cargos } from './Positions';
import * as usePositionsHook from '../hooks/usePositions';
import * as usePositionHook from '../hooks/usePosition';
import { toast } from 'react-toastify';
import { deletarCargo } from '../services/cargoService';

// Mocks
vi.mock('../hooks/usePositions', () => ({
  usePositions: vi.fn(),
}));

vi.mock('../hooks/usePosition', () => ({
  usePosition: vi.fn(),
}));

vi.mock('../services/cargoService', () => ({
  deletarCargo: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Positions Page (Cargos)', () => {
  const mockRefetch = vi.fn();
  const mockSetQuery = vi.fn();
  const mockSave = vi.fn();
  const worker1 = { id: 10, nome: 'Colab 1', cpf: '111', email: 'c1@a.com', data_admissão: new Date(), salario: 1000, status: true };
  const worker2 = { id: 11, nome: 'Colab 2', cpf: '222', email: 'c2@a.com', data_admissão: new Date(), salario: 1200, status: true };

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock values
    vi.mocked(usePositionsHook.usePositions).mockReturnValue({
      data: [
        { id: 1, nome: 'Desenvolvedor', descricao: 'Dev Backend', colaborador: [] },
        { id: 2, nome: 'Analista', descricao: 'Analista de RH', colaborador: [worker1, worker2] },
      ],
      query: '',
      setQuery: mockSetQuery,
      refetch: mockRefetch,
      isLoading: false,
      error: null,
    });

    vi.mocked(usePositionHook.usePosition).mockReturnValue({
      save: mockSave,
      isLoading: false,
      error: null,
    });
  });

  it('deve renderizar a listagem de cargos corretamente', () => {
    render(<Cargos />);

    expect(screen.getByText('Cargos & Estrutura')).toBeInTheDocument();
    
    // Nomes dos cargos mockados
    expect(screen.getAllByText('Desenvolvedor').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Analista').length).toBeGreaterThan(0);
  });

  it('deve chamar setQuery ao digitar na barra de busca', async () => {
    render(<Cargos />);

    const searchInput = screen.getByPlaceholderText(/Buscar por cargo/i);
    fireEvent.change(searchInput, { target: { value: 'Dev' } });

    expect(mockSetQuery).toHaveBeenCalledWith('Dev');
  });

  it('deve abrir o modal de criação ao clicar em "Novo Cargo"', async () => {
    const user = userEvent.setup();
    render(<Cargos />);

    const newButton = screen.getByRole('button', { name: /Novo Cargo/i });
    await user.click(newButton);

    // O Modal de Novo Cargo deve aparecer
    expect(screen.getByRole('dialog', { name: /Novo Cargo/i })).toBeInTheDocument();
  });

  it('deve criar um cargo e disparar refetch', async () => {
    const user = userEvent.setup();
    mockSave.mockResolvedValueOnce(undefined);

    render(<Cargos />);

    await user.click(screen.getByRole('button', { name: /Novo Cargo/i }));
    expect(screen.getByRole('dialog', { name: /Novo Cargo/i })).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText(/Ex: Desenvolvedor Senior/i), 'QA Pleno');
    await user.type(screen.getByPlaceholderText(/Descreva as principais responsabilidades/i), 'Testar aplicações');

    await user.click(screen.getByRole('button', { name: /Criar Cargo/i }));

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({ nome: 'QA Pleno', descricao: 'Testar aplicações' }));
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalled();
      expect(screen.queryByRole('dialog', { name: /Novo Cargo/i })).not.toBeInTheDocument();
    });
  });

  it('deve abrir modal de edição ao clicar em Editar na tabela', async () => {
    const user = userEvent.setup();
    render(<Cargos />);

    const actionButtons = screen.getAllByLabelText('Ações');
    await user.click(actionButtons[0]);
    const menuScope = actionButtons[0].parentElement as HTMLElement;
    await user.click(within(menuScope).getByRole('button', { name: /Editar/i }));

    expect(screen.getByRole('dialog', { name: /Editar Cargo/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Desenvolvedor')).toBeInTheDocument();
  });

  it('deve excluir cargo ao confirmar no diálogo', async () => {
    const user = userEvent.setup();
    vi.mocked(deletarCargo).mockResolvedValueOnce(undefined);

    render(<Cargos />);

    const actionButtons = screen.getAllByLabelText('Ações');
    await user.click(actionButtons[0]);
    const menuScope = actionButtons[0].parentElement as HTMLElement;
    await user.click(within(menuScope).getByRole('button', { name: /Excluir/i }));

    expect(screen.getByRole('dialog', { name: /Excluir cargo/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Confirmar/i }));

    await waitFor(() => {
      expect(deletarCargo).toHaveBeenCalledWith(1);
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalled();
      expect(screen.queryByRole('dialog', { name: /Excluir cargo/i })).not.toBeInTheDocument();
    });
  });

  it('deve mostrar toast de erro quando falhar ao excluir cargo', async () => {
    const user = userEvent.setup();
    vi.mocked(deletarCargo).mockRejectedValueOnce(new Error('Falha'));

    render(<Cargos />);

    const actionButtons = screen.getAllByLabelText('Ações');
    await user.click(actionButtons[0]);
    const menuScope = actionButtons[0].parentElement as HTMLElement;
    await user.click(within(menuScope).getByRole('button', { name: /Excluir/i }));
    await user.click(screen.getByRole('button', { name: /Confirmar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
