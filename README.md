# 🤝 Colab+ | Sistema de Gestão de RH — Frontend

Este repositório contém o **frontend da aplicação Colab+**, responsável pela interface do sistema de gestão de Recursos Humanos. A aplicação consome a API do backend Colab+ e oferece uma experiência visual intuitiva para gestão de colaboradores, cargos e dados operacionais de RH.

O projeto foi desenvolvido com **React + TypeScript + Vite**, seguindo boas práticas de organização, componentização e integração com APIs REST.

---

## 🚀 Funcionalidades Principais

* 🔐 **Autenticação de usuários** integrada ao backend
* 🧑‍💼 **Listagem de colaboradores** com status (Ativo/Inativo)
* ➕ **Cadastro de novos colaboradores**
* ✏️ **Edição de dados cadastrais**
* 🗃️ **Gestão de cargos**
* 📊 **Dashboard com indicadores de RH**
* 🔄 **Integração completa com a API Colab+**

---

## 🛠️ Tecnologias Utilizadas

O frontend foi desenvolvido utilizando as seguintes tecnologias:

* **React** – Biblioteca para construção de interfaces
* **TypeScript** – Tipagem estática para maior segurança
* **Vite** – Ferramenta de build rápida e moderna
* **React Router DOM** – Gerenciamento de rotas
* **Axios / Fetch API** – Comunicação com o backend
* **CSS / CSS Modules** – Estilização dos componentes

---

## 📂 Estrutura do Projeto

```plaintext
📦 public
📦 src
 ┣ 📂 components        # Componentes reutilizáveis
 ┣ 📂 pages             # Páginas da aplicação (Login, Dashboard, Colaboradores)
 ┣ 📂 services          # Configuração e chamadas da API
 ┣ 📂 types             # Tipagens TypeScript
 ┣ 📂 styles            # Estilos globais
 ┣ 📜 App.tsx           # Configuração de rotas
 ┗ 📜 main.tsx          # Ponto de entrada da aplicação
```

---

## 🔌 Integração com o Backend

Este frontend foi projetado para funcionar em conjunto com o **Colab+ Backend**, consumindo uma API RESTful.

### Principais rotas consumidas:

| Método | Endpoint           | Descrição               |
| ------ | ------------------ | ----------------------- |
| POST   | /login             | Autenticação de usuário |
| GET    | /colaboradores     | Lista colaboradores     |
| POST   | /colaboradores     | Cadastra colaborador    |
| PUT    | /colaboradores/:id | Atualiza colaborador    |
| GET    | /cargos            | Lista cargos            |
| POST   | /cargos            | Cadastra cargo          |

> ⚠️ O backend deve estar rodando para o correto funcionamento da aplicação.

---

## 🖥️ Telas da Aplicação

* **Login** – Autenticação do usuário
* **Dashboard** – Visão geral do sistema
* **Colaboradores** – Listagem, cadastro e edição
* **Cargos** – Gerenciamento de cargos

---

## 🌐 Deploy da Aplicação

A aplicação Colab+ também está disponível em ambiente de **deploy**, permitindo visualização e testes sem necessidade de configuração local.

* **Frontend:** 🔗 [https://colabplus.vercel.app](https://colabplus.vercel.app)
* **Backend (API):** 🔗 [Repositório do Backend](https://github.com/Grupo-05-Turma-JavaScript-10/sistema-cadastro-rh)

---

## 🏁 Como Rodar o Projeto

### 📋 Pré-requisitos

* Node.js (versão 16 ou superior)
* npm ou yarn
* Backend Colab+ em execução

---

### 🚀 Passo a Passo

#### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Grupo-05-Turma-JavaScript-10/sistema-cadastro-rh-FrontEnd.git
cd sistema-cadastro-rh-FrontEnd
```

#### 2️⃣ Instale as dependências

```bash
npm install
# ou
yarn
```

#### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

#### 4️⃣ Execute a aplicação

```bash
npm run dev
# ou
yarn dev
```

#### 5️⃣ Acesse no navegador

```
http://localhost:5173
```

---

## Conheça a equipe do ColabPlus!

Este projeto foi desenvolvido de forma colaborativa por uma equipe de **7 desenvolvedores**, como parte de um projeto educacional fullstack.

| Nome | GitHub | LinkedIn |
|------|--------|----------|
| Eduardo Ribeiro | [GitHub](https://github.com/Eduarddoribeiro) | [LinkedIn](https://www.linkedin.com/in/eduardoribeirodefraga/) |
| Fernanda Veeck | [GitHub](https://github.com/fernandaveeck) | [LinkedIn](https://www.linkedin.com/in/fernanda-silveira-veeck/) |
| Luísa Backes | [GitHub](https://github.com/luisabackes) | [LinkedIn](https://www.linkedin.com/in/luisa-backes/) |
| Luis Felipe Leão | [GitHub](https://github.com/SrMaestro) | [LinkedIn](https://www.linkedin.com/in/luisfele%C3%A3o/) |
| Mariana Pires | [GitHub](https://github.com/MariPires96) | [LinkedIn](https://www.linkedin.com/in/marianabpires/) |
| Miguel Lewandowski | [GitHub](https://github.com/MiguelLewandowski) | [LinkedIn](https://www.linkedin.com/in/miguellewandowski/) |
| Sandro Costa | [GitHub](https://github.com/SandroCGs) | [LinkedIn](https://www.linkedin.com/in/sandrocgomes/) |


---

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas alterações (`git commit -m 'feat: nova feature'`)
4. Envie um Pull Request

