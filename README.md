# Aparatus — Plataforma de Agendamentos para Barbearias (Next.js + Prisma + Stripe)

Uma aplicação full stack construída com Next.js (App Router), TypeScript, Prisma (PostgreSQL), Better Auth e Stripe. Permite explorar barbearias, visualizar serviços, criar e cancelar agendamentos, além de fluxo de checkout integrado.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Prisma ORM (+ `@prisma/adapter-pg`)
- PostgreSQL (Neon/Prisma Postgres)
- Stripe (checkout e webhook)
- Better Auth (OAuth Google)
- TanStack Query
- Tailwind CSS 4

## Requisitos

- Node.js 18+ (recomendado 20+)
- Gerenciador de pacotes: `pnpm`
- Banco PostgreSQL (Neon ou Prisma Postgres)
- Chaves externas (Google OAuth, OpenAI opcional, Stripe)

## Configuração

1. Instale dependências:
   ```bash
   pnpm install
   ```
2. Configure o `.env` (baseado em `.env.example`):
   - `DATABASE_URL` (Postgres)
   - `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
   - `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET_KEY`
3. Sincronize o schema e rode o seed:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## Desenvolvimento

```bash
pnpm dev
```

Acesse `http://localhost:3000`.

## Scripts

- `pnpm dev`: inicia o servidor de desenvolvimento
- `pnpm build`: build de produção
- `pnpm start`: inicia build compilado
- `pnpm lint`: verificação de lint

## Banco de Dados

- Schema em `prisma/schema.prisma` (tabelas: `User`, `Session`, `Account`, `Barbershop`, `BarbershopService`, `Booking`)
- Seed em `prisma/seed.ts`
- Cliente Prisma gerado em `generated/prisma`

## Estrutura de Pastas

- `app/` páginas e rotas de API (`app/api/...`)
- `actions/` server actions (ex.: criação/cancelamento de agendamentos)
- `components/` UI e componentes da aplicação
- `lib/` auth, prisma client e utilitários
- `providers/` TanStack Query
- `prisma/` schema e seed

## Rotas Importantes

- `app/api/auth/[...all]/route.ts`: endpoints de autenticação (Better Auth)
- `app/api/stripe/webhook/route.ts`: webhook Stripe
- `app/api/chat/route.ts`: chat/IA
- Páginas:
  - `/` home
  - `/barbershops` e `/barbershops/[id]`
  - `/bookings`
  - `/chat`

## Stripe

- Configure `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` e `STRIPE_WEBHOOK_SECRET_KEY`
- O webhook está em `app/api/stripe/webhook/route.ts`

## Autenticação

- Better Auth com suporte a Google OAuth
- Variáveis: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

## Troubleshooting

- Porta ocupada: finalize processos Node e remova `.next`
  ```bash
  # Windows (PowerShell)
  Stop-Process -Name node -Force
  Remove-Item -Recurse -Force .next
  ```
- Prisma sem `DATABASE_URL`: verifique `.env` e rode `npx prisma db push`

## Licença

Uso interno/educacional.
