# 🎫 Teste - Backend

Backend de um sistema de tickets desenvolvido com **Node.js**, **Express**, **TypeScript**, **Prisma ORM** e **PostgreSQL**, totalmente dockerizado para facilitar a execução e avaliação.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- Docker Compose
- Jest

---

## 📦 Pré-requisitos

Para rodar o projeto, você precisa ter instalado:

- Docker
- Docker Compose

---

## ▶️ Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone git@github.com:Pedro-Jonas/teste-backend.git
cd teste-banckend
```

### 2️⃣ Subir os containers
```bash
docker compose up --build
```

A aplicação ficará disponível em:

http://localhost:3000

Após os containers estarem rodando, execute os comandos abaixo em outro terminal.

3️⃣ Rodar as migrations
```bash
docker compose exec app npx prisma migrate dev
```
4️⃣ Rodar o seed (dados iniciais)
```bash
docker compose exec app npx prisma db seed
```
### Para rodar os testes
```bash
docker compose exec app npm run test
```

### O que foi entregue 
- API REST para gerenciamento de tickets
- Criação de tickets
- Listagem de todos os tickets
- Atualização de status de tickets
- Regras de negócio implementadas:
- Apenas o setor responsável pode mover a demanda para **EM_ANDAMENTO** ou **CONCLUIDA**
- Tickets com status **CONCLUIDA** ou **CANCELADA** não podem ser editados
- Persistência do histórico de alterações de status
- Persistência de dados com PostgreSQL
- ORM Prisma para controle de schema, migrations e seed
- Seed inicial para popular o banco com dados de exemplo
- Projeto totalmente dockerizado (Docker + Docker Compose)
- Testes automatizados com Jest
- Documentação básica para execução do projeto
  
## rotas

```bash
- rota de post
'/tickets/user/:userId'

- rota de get
'/tickets'

- rota de put
'/tickets/:ticketId/user/:userId'
```

### O que ficou fora do escopo

- Controle de usuários dinâmicos (usuário e setor estão simulados)
- rotas para setores, usuários e histórico
- autenticação de usuário

### Como outro desenvolvedor pode continuar a partir do ponto entregue

- Criar autenticação com JWT e associar usuários a setores

- Implementar permissões baseadas em perfil (ex: solicitante, responsável, admin)

- Criar filtros por status, prioridade e setor

- cria rotas para o  histórico de alterações do ticket

- Melhorar cobertura de testes

### Pontos que exigiriam atenção em ambiente de produção

- Uso de variáveis de ambiente seguras (ex: secrets manager)

- Configuração adequada de autenticação e autorização

- Controle de acesso ao banco de dados

- Monitoramento da aplicação (ex: health checks, métricas)
  




##### Desenvolvido por Pedro Jonas



