import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CollaboratorForm from './CollaboratorForm';
import * as colaboradorService from '../../services/colaboradorService';

// Mock dos serviços
vi.mock('../../services/colaboradorService', () => ({
  listarPacotesBeneficios: vi.fn(),
  listarPendenciasColaborador: vi.fn(), // Checklist
  listarHistoricoColaborador: vi.fn(),  // Histórico
}));

describe('CollaboratorForm Integration Tests', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(colaboradorService.listarPacotesBeneficios).mockResolvedValue([
      { id: 1, nome: 'Pacote Ouro', valorTotal: 500 },
      { id: 2, nome: 'Pacote Prata', valorTotal: 250 }
    ]);
  });

  it('deve renderizar apenas a aba de "Dados do Colaborador" em modo de CRIAÇÃO', async () => {
    // Modo de criação = prop "initial" é undefined
    await act(async () => {
      render(
        <CollaboratorForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );
    });

    // Verifica se os campos de texto do formulário base existem
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    
    // Garante que as abas extras NÃO existem na tela de criação (já que o funcionário não existe ainda)
    expect(screen.queryByText(/Documentos\/Admissão/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Histórico/i)).not.toBeInTheDocument();
  });

  it('deve exibir as abas adicionais e preencher os dados em modo de EDIÇÃO', async () => {
    const colaboradorMock = {
      id: 99,
      nome: 'José da Silva',
      cpf: '12345678900',
      email: 'jose@email.com',
      data_admissão: new Date('2024-01-01'),
      salario: 5000,
      cargo: { id: 1, nome: 'Desenvolvedor', descricao: 'Dev' },
      status: true,
      tipoContrato: 'CLT' as const
    };

    // O mock das requisições internas das abas para não quebrarem ao renderizar
    vi.mocked(colaboradorService.listarPendenciasColaborador).mockResolvedValue([]);
    vi.mocked(colaboradorService.listarHistoricoColaborador).mockResolvedValue([]);

    await act(async () => {
      render(
        <CollaboratorForm
          initial={colaboradorMock}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );
    });

    // Garante que o input de Nome veio preenchido com o dado do Mock
    const nomeInput = screen.getByLabelText(/Nome Completo/i);
    expect(nomeInput).toHaveValue('José da Silva');

    // Verifica se os botões/links das abas extras agora aparecem
    expect(screen.getByText(/Documentos\/Admissão/i)).toBeInTheDocument();
    expect(screen.getByText(/Histórico/i)).toBeInTheDocument();
  });

  it('deve limpar a máscara do CPF e Moeda antes de enviar o formulário', async () => {
    // Vamos usar o userEvent para simular uma digitação real (letra por letra)
    const user = userEvent.setup();

    await act(async () => {
      render(
        <CollaboratorForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );
    });

    // 1. Preenche Nome
    await user.type(screen.getByLabelText(/Nome Completo/i), 'Ana Teste');
    
    // 2. Preenche CPF (Usuário digita com pontos/traços ou o input mascara)
    // Nosso formulário só aceita números e formata sozinho
    const cpfInput = screen.getByLabelText(/CPF/i);
    await user.clear(cpfInput);
    await user.type(cpfInput, '111.222.333-44');

    // 3. Preenche Email
    await user.type(screen.getByLabelText(/E-mail Corporativo/i), 'ana@teste.com');
    
    // 4. Preenche Salário (Usuário pode digitar formatado R$)
    const salarioInput = screen.getByLabelText(/Salário Base/i);
    await user.clear(salarioInput);
    await user.type(salarioInput, '650000');

    // 5. Envia o formulário
    const submitButton = screen.getByRole('button', { name: /Cadastrar Colaborador/i });
    await user.click(submitButton);

    // Validação principal: 
    // O mockOnSubmit foi chamado com os dados "limpos" (sem máscara) e formatados para o backend?
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: 'Ana Teste',
          cpf: '11122233344', // Sem máscara!
          email: 'ana@teste.com',
          salario: 6500, // Número puro (sem R$ e sem pontuação doida)
        })
      );
    });
  });

  it('deve chamar onCancel quando o botão de cancelar for clicado', async () => {
    const user = userEvent.setup();

    await act(async () => {
      render(
        <CollaboratorForm
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );
    });

    const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});