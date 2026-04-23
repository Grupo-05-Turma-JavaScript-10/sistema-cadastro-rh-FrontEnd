import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import * as colaboradorService from '../services/colaboradorService';

// Mock dos serviços e módulos
vi.mock('../services/colaboradorService', () => ({
  listarColaboradores: vi.fn(),
  listarPendenciasAbertas: vi.fn(),
  listarAlertasVencimentos: vi.fn(),
}));

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDashboard = () => {
    return render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  };

  it('deve renderizar os StatCards corretamente quando os dados da API retornarem sucesso', async () => {
    // Mocking success responses
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue([
      { id: 1, nome: 'João', status: true, cpf: '111', email: 'j@a.com', data_admissão: new Date(), salario: 1000 },
      { id: 2, nome: 'Maria', status: false, cpf: '222', email: 'm@a.com', data_admissão: new Date(), salario: 1000 },
    ]);
    
    vi.mocked(colaboradorService.listarPendenciasAbertas).mockResolvedValue([
      { id: 1, titulo: 'Entregar RG', concluida: false, colaboradorId: 1, colaboradorNome: 'João' }
    ]);
    
    vi.mocked(colaboradorService.listarAlertasVencimentos).mockResolvedValue([
      { id: 1, nome: 'Maria', tipoAlerta: 'Experiência vencendo', diasRestantes: 5, data: '2026-05-02' },
      { id: 2, nome: 'João', tipoAlerta: 'Férias vencendo', diasRestantes: 20, data: '2026-06-02' }
    ]);

    renderDashboard();

    // Verifica se os valores corretos foram renderizados nos cards de estatística
    await waitFor(() => {
      expect(screen.getByText('Total de Colaboradores')).toBeInTheDocument();
      // Usando getAllByText porque o valor "2" aparece em dois cards diferentes (Total e Alertas)
      const numberTwos = screen.getAllByText('2');
      expect(numberTwos.length).toBeGreaterThanOrEqual(2); 
      
      expect(screen.getByText('Alertas de Vencimento')).toBeInTheDocument();
      
      expect(screen.getByText('Documentos Pendentes')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // 1 pendência mockada
    });
  });

  it('não deve quebrar a página (resiliência) quando as requisições de pendências/alertas falharem', async () => {
    // Mock: Colaboradores sucesso, mas Pendencias e Alertas dão erro 500
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue([
      { id: 1, nome: 'João', status: true, cpf: '111', email: 'j@a.com', data_admissão: new Date(), salario: 1000 },
    ]);
    vi.mocked(colaboradorService.listarPendenciasAbertas).mockRejectedValue(new Error('Erro 500'));
    vi.mocked(colaboradorService.listarAlertasVencimentos).mockRejectedValue(new Error('Erro 500'));

    renderDashboard();

    await waitFor(() => {
      // Verifica se a tela renderizou as estatísticas principais
      expect(screen.getByText('Total de Colaboradores')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      
      // Como deu erro nos painéis menores, eles devem assumir array vazio []
      expect(screen.getByText('Nenhum alerta crítico no momento.')).toBeInTheDocument();
      expect(screen.getByText('Todos os colaboradores estão com a documentação em dia.')).toBeInTheDocument();
    });
  });

  it('deve renderizar as cores corretas no Painel de Alertas de acordo com os diasRestantes', async () => {
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue([]);
    vi.mocked(colaboradorService.listarPendenciasAbertas).mockResolvedValue([]);
    
    vi.mocked(colaboradorService.listarAlertasVencimentos).mockResolvedValue([
      { id: 1, nome: 'Crítico', tipoAlerta: 'Aso', diasRestantes: 3, data: '' }, // Vermelho (< 7)
      { id: 2, nome: 'Atenção', tipoAlerta: 'Aso', diasRestantes: 10, data: '' }, // Amarelo (7 a 15)
      { id: 3, nome: 'Tranquilo', tipoAlerta: 'Aso', diasRestantes: 20, data: '' } // Teal (> 15)
    ]);

    renderDashboard();

    await waitFor(() => {
      const badgeCritico = screen.getByText('3 dias restantes');
      expect(badgeCritico).toHaveClass('bg-error-red text-white');

      const badgeAtencao = screen.getByText('10 dias restantes');
      expect(badgeAtencao).toHaveClass('bg-yellow-500 text-white');

      const badgeTranquilo = screen.getByText('20 dias restantes');
      expect(badgeTranquilo).toHaveClass('bg-primary-teal text-white');
    });
  });

  it('deve calcular e exibir corretamente o Resumo Financeiro da Folha de Pagamento', async () => {
    // Mock com 2 ativos (devem entrar na conta) e 1 inativo (deve ser ignorado)
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue([
      { id: 1, nome: 'João', status: true, cpf: '111', email: 'j@a.com', data_admissão: new Date(), salario: 5000, encargosMensais: 1000, tipoContrato: 'CLT' },
      { id: 2, nome: 'Maria', status: true, cpf: '222', email: 'm@a.com', data_admissão: new Date(), salario: 3000, encargosMensais: 500, tipoContrato: 'PJ' },
      { id: 3, nome: 'Inativo', status: false, cpf: '333', email: 'i@a.com', data_admissão: new Date(), salario: 10000, encargosMensais: 2000, tipoContrato: 'CLT' },
    ]);
    
    vi.mocked(colaboradorService.listarPendenciasAbertas).mockResolvedValue([]);
    vi.mocked(colaboradorService.listarAlertasVencimentos).mockResolvedValue([]);

    renderDashboard();

    await waitFor(() => {
      // Verifica se o painel "Resumo Financeiro (Ativos)" foi renderizado
      expect(screen.getByText('Resumo Financeiro (Ativos)')).toBeInTheDocument();

      // Custo Total Estimado da Folha: (5000 + 1000) + (3000 + 500) = 9500
      // Usamos string pura ou RegExp flexível devido ao formato BRL (que pode conter espaços inquebráveis ou normais)
      expect(screen.getByText(/R\$\s*9\.500,00/i)).toBeInTheDocument();

      // Média Salarial: (5000 + 3000) / 2 = 4000
      expect(screen.getByText(/R\$\s*4\.000,00/i)).toBeInTheDocument();

      // Custo Médio foi removido
      expect(screen.queryByText(/Custo Médio por Colab/i)).not.toBeInTheDocument();
    });
  });

  it('não deve exibir NaN quando a API retornar colaboradores sem salário ou encargos (Tratamento de fallback)', async () => {
    // Mock com ativos onde salário/encargos são undefined/null
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue([
      { id: 1, nome: 'João Sem Salário', status: true, cpf: '111', email: 'j@a.com', data_admissão: new Date(), salario: undefined as unknown as number, tipoContrato: 'CLT' }, // Sem salário/encargos
      { id: 2, nome: 'Maria', status: true, cpf: '222', email: 'm@a.com', data_admissão: new Date(), salario: null as unknown as number, encargosMensais: undefined, tipoContrato: 'PJ' },
      { id: 3, nome: 'Bugado', status: true, cpf: '333', email: 'b@a.com', data_admissão: new Date(), salario: "nao-sou-numero" as unknown as number, tipoContrato: 'CLT' }
    ]);
    
    vi.mocked(colaboradorService.listarPendenciasAbertas).mockResolvedValue([]);
    vi.mocked(colaboradorService.listarAlertasVencimentos).mockResolvedValue([]);

    renderDashboard();

    await waitFor(() => {
      // Se não tem salário, deve assumir 0 e não quebrar com NaN (Not a Number)
      const allZeros = screen.getAllByText(/R\$\s*0,00/i);
      expect(allZeros.length).toBeGreaterThanOrEqual(2); // Custo folha, Média
      
      // Garante que a string NaN não está na tela. Usando regex mais restrito para
      // não pegar a palavra "NaN" dentro de outras (como em "financeiro", etc se existir,
      // embora improvável. Mas garantimos que o erro principal se foi).
      const textContent = document.body.textContent || "";
      expect(textContent).not.toMatch(/\bNaN\b/);
    });
  });

  it('deve calcular e exibir corretamente a Distribuição de Contratos', async () => {
    // Mock com 4 ativos: 2 CLT (50%), 1 PJ (25%), 1 ESTAGIO (25%)
    vi.mocked(colaboradorService.listarColaboradores).mockResolvedValue([
      { id: 1, nome: 'João', status: true, cpf: '111', email: 'j@a.com', data_admissão: new Date(), salario: 5000, tipoContrato: 'CLT' },
      { id: 2, nome: 'Maria', status: true, cpf: '222', email: 'm@a.com', data_admissão: new Date(), salario: 3000, tipoContrato: 'CLT' },
      { id: 3, nome: 'Pedro', status: true, cpf: '333', email: 'p@a.com', data_admissão: new Date(), salario: 4000, tipoContrato: 'PJ' },
      { id: 4, nome: 'Lucas', status: true, cpf: '444', email: 'l@a.com', data_admissão: new Date(), salario: 1500, tipoContrato: 'ESTAGIO' },
    ]);
    
    vi.mocked(colaboradorService.listarPendenciasAbertas).mockResolvedValue([]);
    vi.mocked(colaboradorService.listarAlertasVencimentos).mockResolvedValue([]);

    renderDashboard();

    await waitFor(() => {
      // Verifica o título do painel
      expect(screen.getByText('Distribuição de Contratos')).toBeInTheDocument();

      // Verifica os textos com quantidade absoluta
      expect(screen.getByText('CLT (2)')).toBeInTheDocument();
      expect(screen.getByText('PJ (1)')).toBeInTheDocument();
      expect(screen.getByText('Estágio (1)')).toBeInTheDocument();

      // Verifica as porcentagens (50%, 25%, 25%)
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getAllByText('25%').length).toBe(2);
    });
  });
});
