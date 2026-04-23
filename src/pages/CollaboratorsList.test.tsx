import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Collaborators } from './Collaborators';
import * as useCollaboratorsHook from '../hooks/useCollaborators';
import * as useCollaboratorHook from '../hooks/useCollaborator';
import api from '../services/api';
import { toast } from 'react-toastify';
import type Worker from '../models/Worker';
import { deletarColaborador } from '../services/colaboradorService';

// Mocks
vi.mock('../hooks/useCollaborators', () => ({
  useCollaborators: vi.fn(),
}));

vi.mock('../hooks/useCollaborator', () => ({
  useCollaborator: vi.fn(),
}));

vi.mock('../services/colaboradorService', () => ({
  deletarColaborador: vi.fn(),
}));

vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock('../components/collaborators/CollaboratorForm', () => ({
  default: ({ onSubmit, onCancel }: { onSubmit: (payload: unknown) => void; onCancel?: () => void }) => (
    <div>
      <button type="button" onClick={() => onSubmit({ nome: 'Mock', cpf: '11122233344', email: 'mock@a.com' })}>
        Salvar Mock
      </button>
      <button type="button" onClick={() => onCancel?.()}>
        Cancelar Mock
      </button>
    </div>
  ),
}));

vi.mock('../components/collaborators/SalaryCalcDialog', () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div role="dialog" aria-label="Calcular Salário">Dialog Calc</div> : null,
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Collaborators Page', () => {
  const mockSetQuery = vi.fn();
  const mockRefetch = vi.fn();
  const mockSave = vi.fn();

  const mockWorkers: Worker[] = [
    { id: 1, nome: 'Alice', cpf: '111', email: 'alice@a.com', data_admissão: new Date(), salario: 1000, status: true, tipoContrato: 'CLT' },
    { id: 2, nome: 'Bob', cpf: '222', email: 'bob@b.com', data_admissão: new Date(), salario: 2000, status: true, tipoContrato: 'PJ' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (globalThis.URL as unknown as { createObjectURL: (blob: Blob) => string }).createObjectURL = vi.fn(() => 'blob:mock');
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    vi.mocked(useCollaboratorsHook.useCollaborators).mockReturnValue({
      data: mockWorkers,
      query: '',
      setQuery: mockSetQuery,
      refetch: mockRefetch,
      isLoading: false,
      error: null,
      updateLocal: vi.fn(),
    });

    vi.mocked(useCollaboratorHook.useCollaborator).mockReturnValue({
      save: mockSave,
      data: null,
      isLoading: false,
      error: null,
      load: vi.fn().mockResolvedValue(undefined),
    });
  });

  it('deve renderizar a página corretamente', () => {
    render(<Collaborators />);

    expect(screen.getByText('Colaboradores')).toBeInTheDocument();
    expect(screen.getAllByText('Alice').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Bob').length).toBeGreaterThan(0);
  });

  it('deve chamar setQuery ao digitar na busca', async () => {
    render(<Collaborators />);

    const searchInput = screen.getByPlaceholderText(/Buscar por nome, cargo ou departamento/i);
    fireEvent.change(searchInput, { target: { value: 'Ali' } });

    expect(mockSetQuery).toHaveBeenCalledWith('Ali');
  });

  it('deve abrir modal de Novo Colaborador ao clicar no botão', async () => {
    const user = userEvent.setup();
    render(<Collaborators />);

    const btnNovo = screen.getByRole('button', { name: /Novo Colaborador/i });
    await user.click(btnNovo);

    expect(screen.getByRole('dialog', { name: /Novo Colaborador/i })).toBeInTheDocument();
  });

  it('deve salvar um novo colaborador e refazer a busca (refetch)', async () => {
    const user = userEvent.setup();
    render(<Collaborators />);

    mockSave.mockResolvedValueOnce(undefined);

    const btnNovo = screen.getByRole('button', { name: /Novo Colaborador/i });
    await user.click(btnNovo);

    const dialog = screen.getByRole('dialog', { name: /Novo Colaborador/i });
    expect(dialog).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Salvar Mock/i }));

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(mockRefetch).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalled();
      expect(screen.queryByRole('dialog', { name: /Novo Colaborador/i })).not.toBeInTheDocument();
    });
  });

  it('deve mostrar toast de erro se falhar ao salvar colaborador', async () => {
    const user = userEvent.setup();
    render(<Collaborators />);

    mockSave.mockRejectedValueOnce(new Error('Falha'));

    const btnNovo = screen.getByRole('button', { name: /Novo Colaborador/i });
    await user.click(btnNovo);
    expect(screen.getByRole('dialog', { name: /Novo Colaborador/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Salvar Mock/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      expect(screen.getByRole('dialog', { name: /Novo Colaborador/i })).toBeInTheDocument();
    });
  });

  it('deve abrir modal de Edição ao clicar em editar na tabela', async () => {
    const user = userEvent.setup();
    render(<Collaborators />);

    const actionButtons = screen.getAllByLabelText('Ações');
    await user.click(actionButtons[0]);
    const menuScope = actionButtons[0].parentElement as HTMLElement;
    await user.click(within(menuScope).getByRole('button', { name: /Editar/i }));

    expect(screen.getByRole('dialog', { name: /Editar Colaborador/i })).toBeInTheDocument();
  });

  it('deve abrir o cálculo ao clicar em Calcular na tabela', async () => {
    const user = userEvent.setup();
    render(<Collaborators />);

    const actionButtons = screen.getAllByLabelText('Ações');
    await user.click(actionButtons[0]);
    const menuScope = actionButtons[0].parentElement as HTMLElement;
    await user.click(within(menuScope).getByRole('button', { name: /Calcular/i }));

    expect(screen.getByRole('dialog', { name: /Calcular Salário/i })).toBeInTheDocument();
  });

  it('deve excluir colaborador ao confirmar no diálogo', async () => {
    const user = userEvent.setup();
    vi.mocked(deletarColaborador).mockResolvedValueOnce(undefined);

    render(<Collaborators />);

    const actionButtons = screen.getAllByLabelText('Ações');
    await user.click(actionButtons[0]);
    const menuScope = actionButtons[0].parentElement as HTMLElement;
    await user.click(within(menuScope).getByRole('button', { name: /Excluir/i }));

    expect(screen.getByRole('dialog', { name: /Excluir colaborador/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Confirmar/i }));

    await waitFor(() => {
      expect(deletarColaborador).toHaveBeenCalledWith(1);
      expect(mockRefetch).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalled();
      expect(screen.queryByRole('dialog', { name: /Excluir colaborador/i })).not.toBeInTheDocument();
    });
  });

  it('deve exportar CSV e mostrar toast de sucesso', async () => {
    const user = userEvent.setup();
    const getMock = api.get as unknown as ReturnType<typeof vi.fn>;
    getMock.mockResolvedValueOnce({ data: 'csv-data' });

    render(<Collaborators />);

    await user.click(screen.getByRole('button', { name: /Exportar CSV/i }));

    await waitFor(() => {
      expect(getMock).toHaveBeenCalledWith('/colaboradores/exportar/csv', expect.any(Object));
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('deve mostrar toast de não autorizado quando exportação falhar com 401', async () => {
    const user = userEvent.setup();
    const getMock = api.get as unknown as ReturnType<typeof vi.fn>;
    getMock.mockRejectedValueOnce({ response: { status: 401 } });

    render(<Collaborators />);
    await user.click(screen.getByRole('button', { name: /Exportar CSV/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
