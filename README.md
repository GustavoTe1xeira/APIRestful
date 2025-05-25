# Fastify API com TypeScript, JWT, Zod, Swagger e Prisma
Este projeto é uma API RESTful desenvolvida com Fastify, utilizando TypeScript para tipagem estática, PostgreSQL como banco de dados e Prisma ORM para modelagem e manipulação dos dados.

O objetivo é fornecer uma estrutura robusta e escalável para aplicações back-end, com foco em segurança, validação e documentação de rotas.
## Instalação

```bash
npm install
```

## Configuração

Crie um `.env` baseado no `.env.example` com as variáveis corretas.

## Rodar localmente

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
