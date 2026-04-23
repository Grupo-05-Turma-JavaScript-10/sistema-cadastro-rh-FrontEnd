# Documentação de Testes

Este documento descreve a estrutura e os cenários de testes implementados para a aplicação Front-End do Sistema de Cadastro de RH. Os testes são escritos utilizando **Vitest** como framework de testes e **React Testing Library** para a renderização e interação com os componentes React.

## Estrutura de Diretórios

Os arquivos de teste adotam o padrão de **Colocation**, ou seja, eles residem na mesma pasta do arquivo que estão testando, com o sufixo `.test.tsx`. Esse padrão facilita a manutenção e escalabilidade da aplicação.

## Arquivos de Teste

### 1. `src/contexts/Auth.test.tsx` (Autenticação e Rotas)
Este arquivo testa o contexto de autenticação (`AuthContext`) e a proteção de rotas privadas (`PrivateRoute`).

**Cenários Testados:**
*   **Inicialização e LocalStorage:** Verifica se o contexto recupera o token salvo previamente no `localStorage` ao carregar.
*   **Logout:** Garante que a ação de logout limpa o token do estado e do `localStorage`.
*   **Redirecionamento (PrivateRoute):** Verifica se um usuário não autenticado tentando acessar uma rota protegida (ex: `/dashboard`) é redirecionado para o `/login`.
*   **Acesso Permitido (PrivateRoute):** Garante que usuários autenticados conseguem renderizar o conteúdo protegido normalmente.

### 2. `src/hooks/useCollaborators.test.tsx` e `src/hooks/usePositions.test.tsx` (Hooks Customizados)
Testes unitários focados na lógica de requisição e estado das entidades principais, garantindo que o gerenciamento de dados na interface seja confiável.

**Cenários Testados:**
*   **Listagem Inicial:** Garante que ao renderizar o hook, a API de listagem é chamada (com debounce) e os dados preenchem o estado `data`.
*   **Busca por Query:** Simula a digitação na barra de pesquisa (alteração da propriedade `query`) e verifica se a API de busca específica (`buscarPorNome` ou `buscarPorDescricao`) é disparada.
*   **Tratamento de Erros:** Simula uma falha na API e verifica se a propriedade `error` do hook é populada corretamente, mantendo a tela a par do problema.
*   **Atualização Local (Collaborators):** Garante que a função `updateLocal` atualiza o estado em memória sem precisar fazer um novo `refetch` na API.

### 3. `src/pages/CollaboratorsList.test.tsx` e `src/pages/Positions.test.tsx` (Páginas de Listagem)
Estes arquivos testam as páginas inteiras de listagem (`/colaboradores` e `/cargos`), assegurando a integração entre o hook de dados, a barra de busca e a tabela/modais.

**Cenários Testados:**
*   **Renderização dos Dados:** Verifica se os itens vindos do hook mockado são desenhados corretamente na tela (título da página e nomes na tabela).
*   **Interação com a Busca:** Garante que digitar na barra de pesquisa invoca a função `setQuery` do hook.
*   **Abertura de Modais:**
    *   **Criação:** Clicar no botão "Novo" deve abrir o Modal de Criação vazio.
    *   **Edição/Exclusão:** Clicar nos botões de ação de um item na tabela deve abrir o Modal de Edição populado com os dados, ou o Modal de Confirmação de exclusão.

### 4. `src/components/collaborators/CollaboratorForm.test.tsx`

Este arquivo contém testes de integração para o componente `CollaboratorForm`, que é responsável por renderizar o formulário de criação e edição de colaboradores.

**Cenários Testados:**

*   **Renderização em Modo de Criação:**
    *   **Objetivo:** Verificar se o formulário exibe apenas a aba "Dados do Colaborador" quando não há dados iniciais (modo de criação).
    *   **Comportamento Esperado:** Os campos de texto do formulário base devem estar presentes. As abas "Documentos/Admissão" e "Histórico" **não** devem ser renderizadas.
*   **Renderização em Modo de Edição:**
    *   **Objetivo:** Verificar se o formulário exibe as abas adicionais e preenche os campos corretamente quando dados iniciais são fornecidos (modo de edição).
    *   **Comportamento Esperado:** O input "Nome Completo" deve conter o valor passado pelo mock. As abas "Documentos/Admissão" e "Histórico" devem estar visíveis. As requisições para listar pendências e histórico são mockadas para não quebrar a renderização.
*   **Limpeza de Máscaras e Formatação (Submissão):**
    *   **Objetivo:** Garantir que as máscaras (como CPF e formatação de moeda R$) sejam removidas antes de enviar os dados para a função `onSubmit`.
    *   **Comportamento Esperado:** O usuário preenche os campos com máscaras (ex: CPF com pontos e traços, Salário com R$). Ao clicar em "Cadastrar Colaborador", a função `onSubmit` deve ser chamada com os dados limpos e no formato correto (CPF sem pontuação e salário como número puro).
*   **Ação de Cancelar:**
    *   **Objetivo:** Verificar se a função `onCancel` é chamada corretamente quando o botão de cancelar é clicado.
    *   **Comportamento Esperado:** Ao clicar no botão "Cancelar", o mock de `onCancel` deve ser chamado exatamente uma vez.

### 5. `src/pages/Dashboard.test.tsx`

Este arquivo contém testes de integração para o componente `Dashboard`, que exibe métricas e alertas principais do sistema.

**Cenários Testados:**

*   **Renderização de StatCards com Sucesso:**
    *   **Objetivo:** Verificar se os painéis de estatística (`StatCards`) exibem os dados corretamente quando a API retorna sucesso.
    *   **Comportamento Esperado:** Os serviços de listagem de colaboradores, pendências abertas e alertas de vencimentos são mockados com dados de sucesso. Os painéis devem exibir os títulos ("Total de Colaboradores", "Alertas de Vencimento", "Documentos Pendentes") e os valores numéricos correspondentes aos mocks.
*   **Resiliência a Falhas de API:**
    *   **Objetivo:** Garantir que a página não quebre se as requisições secundárias (pendências ou alertas) falharem, mantendo as informações principais visíveis.
    *   **Comportamento Esperado:** O mock de colaboradores retorna sucesso, mas os mocks de pendências e alertas rejeitam com erro. A tela deve continuar renderizando a contagem total de colaboradores. Os painéis que falharam devem exibir mensagens de estado vazio ("Nenhum alerta crítico no momento" e "Todos os colaboradores estão com a documentação em dia").
*   **Formatação Condicional (Cores de Alerta):**
    *   **Objetivo:** Verificar se as badges de alertas de vencimento aplicam as cores corretas com base nos dias restantes.
    *   **Comportamento Esperado:**
        *   Menos de 7 dias: Classe de erro vermelha (`bg-error-red text-white`).
        *   Entre 7 e 15 dias: Classe de atenção amarela (`bg-yellow-500 text-white`).
        *   Mais de 15 dias: Classe de sucesso verde/teal (`bg-primary-teal text-white`).

## Executando os Testes

Para rodar os testes, utilize o comando:

```bash
npx vitest run
```

Para rodar os testes em modo watch (assistir a mudanças):

```bash
npm run test
# ou
npx vitest
```
