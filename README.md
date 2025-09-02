# API de Autenticação com Node.js, TypeScript e Prisma

Esta é uma API simples de autenticação e gerenciamento de usuários, construída com Node.js, TypeScript e Prisma ORM, usando JWT para autenticação e seguindo boas práticas de commits com Conventional Commits.

---

## Tecnologias utilizadas

-   Node.js
-   TypeScript
-   Express
-   Prisma ORM
-   bcrypt (para hash de senhas)
-   jsonwebtoken (para autenticação JWT)
-   dotenv (para variáveis de ambiente)
-   Passport.js (estratégia JWT)
-   ts-node-dev (para desenvolvimento com reload automático)
-   Conventional Commits (para organização de commits)

---

## Funcionalidades

-   `POST /register` → cria um novo usuário com nome, email e senha.
-   `POST /login` → autentica o usuário e retorna token JWT + dados do usuário.
-   `GET /users` → lista todos os usuários protegida por JWT (apenas usuários autenticados podem acessar).

> Observação: Futuramente serão adicionadas rotas para **atualizar** e **excluir** usuários.

---

## Estrutura do projeto

src  
├─ config  
│ └─ environment.ts  
├─ controllers  
│ └─ userController.ts  
├─ repositories  
│ └─ userRepository.ts  
├─ routes  
│ ├─ registerRoutes.ts  
│ └─ getAllUsersRoutes.ts  
├─ services  
│ └─ userService.ts  
├─ middleware  
│ └─ passportJwt.ts  
├─ libs  
│ └─ prisma.ts  
└─ server.ts

---

## Rodando o projeto

1. Clone o repositório:

```
git clone <seu-repositorio>
cd <nome-do-projeto>
```

2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` com o conteúdo:

```
PORT=3000
JWT_KEY=sua_chave_secreta
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomeDoBanco?schema=public"
```

4. Gere o cliente do Prisma:

```
npx prisma generate
```

5. Rode as migrations (se houver):

```
npx prisma migrate dev
```

6. Inicie o servidor em modo de desenvolvimento:

```
npm run dev
```

---

## Boas práticas aplicadas

-   Estrutura MVC (Controllers, Services, Repositories)
-   Middleware para autenticação usando Passport JWT
-   Hash de senhas com bcrypt
-   Boas práticas de commits com Conventional Commits

---

## Exemplos de requisições e respostas

### 1. Registrar usuário

**Request:** `POST /register`

```json
{
    "name": "Cayo",
    "email": "cayo@example.com",
    "password": "senha123"
}
```

**Response (201 Created):**

```json
{
    "id": 1,
    "name": "Cayo",
    "email": "cayo@example.com",
    "password": "$2b$10$hashdaSenha..."
}
```

---

### 2. Login

**Request:** `POST /login`

```json
{
    "email": "cayo@example.com",
    "password": "senha123"
}
```

**Response (200 OK):**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erro (401 Unauthorized):**

```json
{
    "message": "Credenciais inválidas"
}
```

---

### 3. Listar todos os usuários (rota protegida)

**Request:** `GET /users`  
**Headers:**

```
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
[
    {
        "id": 1,
        "name": "Cayo",
        "email": "cayo@example.com"
    },
    {
        "id": 2,
        "name": "Outro Usuario",
        "email": "outro@example.com"
    }
]
```

**Erro (401 Unauthorized):**

```json
{
    "message": "Unauthorized"
}
```

---

Feito por Cayo Cesar
