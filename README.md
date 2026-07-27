# Nextel Advisors

Sitio corporativo de **Nextel Advisors** — consultoría, intermediación y captación comercial para el
sector de las telecomunicaciones.

> _"Conectamos hoy, impulsamos el mañana."_

## Getting Started

```sh
pnpm install
pnpm dev
```

The web app runs on [http://localhost:3000](http://localhost:3000).

### Environment

The contact form emails submissions via [Resend](https://resend.com) — nothing is stored.

```sh
cp apps/web/.env.example apps/web/.env
```

| Variable             | Used for                                          |
| -------------------- | ------------------------------------------------- |
| `RESEND_API_KEY`     | Resend secret key                                 |
| `CONTACT_EMAIL_TO`   | Inbox that receives contact submissions           |
| `CONTACT_EMAIL_FROM` | Verified sender, e.g. `Nextel <web@nextel.com>`   |

## What's inside?

### Apps

- `web` — the Nextel Advisors site (Next.js 16 App Router, port 3000)

### Packages

- `core` — business logic: entities, repositories (email), controllers
- `ui` — shared React component library

### Configurations

Shared configuration is centralized in `configurations/`:

- `configurations/eslint` — ESLint config shared across the repo
- `configurations/typescript` — `tsconfig.json` base presets
- `configurations/prettier` — Prettier config and rules

## Commands

| Command           | What it does                 |
| ----------------- | ---------------------------- |
| `pnpm dev`        | Start all apps in dev mode   |
| `pnpm build`      | Build all apps               |
| `pnpm lint`       | Lint all packages            |
| `pnpm ts:check`   | Type-check all packages      |
| `pnpm test`       | Run all test suites (Vitest) |
| `pnpm format:fix` | Format with Prettier         |
| `pnpm deadcode`   | Find unused exports (knip)   |

## Conventions

Agent and contributor guidance lives in [`AGENTS.md`](./AGENTS.md), with per-package rules in the
closest `AGENTS.md` to the file you're editing.
