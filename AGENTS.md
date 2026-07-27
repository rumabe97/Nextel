# Nextel Advisors AGENTS.md

Agent-focused guidance for this monorepo. The closest `AGENTS.md` to the file you edit wins.

**Product context:** Nextel Advisors is a Spanish-language telecom consultancy site — consultoría,
intermediación y captación comercial. Two service lines: _Contratación de nueva planta_ (site
acquisition) and _Site Management_. **All user-facing copy is in Spanish**; code, comments, and
identifiers stay in English.

---

## Setup

- Install deps: `pnpm install`
- Use `pnpm` only (no npm or yarn).

## Common commands

| Command                | What it does                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`             | Start all apps in dev mode                                                                                    |
| `pnpm build`           | Build all apps                                                                                                |
| `pnpm ts:check`        | Type-check all packages                                                                                       |
| `pnpm lint`            | Lint all packages                                                                                             |
| `pnpm lint:fix`        | Lint with `--fix`                                                                                             |
| `pnpm test`            | Run all package test suites (Vitest, orchestrated by Turbo)                                                   |
| `pnpm test:watch`      | Watch mode — re-runs affected tests on save                                                                   |
| `pnpm test:coverage`   | Run tests with coverage (Istanbul) — gates against `vitest.config.ts` thresholds                              |
| `pnpm deadcode`        | Find unused exports (knip)                                                                                    |
| `pnpm format`          | Format-check with Prettier (via Turbo)                                                                        |
| `pnpm format:fix`      | Format with Prettier (`--write`, via Turbo)                                                                   |
| `pnpm up:latest`       | Update all deps to latest stable                                                                              |

## Dependencies

- Use workspace deps (`workspace:*`) for internal packages.
- To add an external dep: edit `package.json` in the relevant app/package, then run `pnpm install`.
- After adding a dep, run `pnpm dedupe` to clean up duplicate hoisting.
- **Keeping deps current:** Run `pnpm up:latest` from the repo root regularly. This updates every package to its latest stable version. The eslint version in `configurations/eslint` is pinned separately in that script — do not override it manually.

## Repo layout

```
apps/
  web/    — the Nextel Advisors site (Next.js, port 3000)
packages/
  core/     — business logic: entities, repositories, controllers
  ui/       — shared React component library
configurations/
  eslint/       — shared ESLint configs
  typescript/   — shared tsconfig presets
  prettier/     — shared Prettier config
```

## Dependency chain

```
apps/web  →  core  →  [zod]
apps/web  →  ui
```

There is NO database and NO auth in this project. The contact form (the only dynamic
feature) validates in `core` and emails each submission through the Resend REST API —
see `packages/core/src/repositories/ContactEmail/`. All external I/O stays in core
repositories; apps only import controllers.

## Absolute imports

Two patterns coexist in this repo, depending on whether you're inside an app or the shared `ui` package.

### Apps — `tsconfig.json` `paths` aliases

Apps define their own internal aliases via `tsconfig.json` `paths`. There is no `baseUrl`, no `@` prefix.

- `apps/web`: `components/*`, `hooks/*`, `lib/*`, `styles/*`

Each app's `tsconfig.json` `paths` block is the source of truth — these examples may lag behind reality. When in doubt, read the app's tsconfig.

```ts
import { Header } from 'components/Header'; // ✅ correct (inside apps/web)
import { Header } from '@/components/Header'; // ❌ wrong — no @ prefix
import { Header } from '../components/Header'; // ❌ wrong — use absolute
```

### `packages/ui` — package self-reference (`ui/...`)

The `ui` package does **not** define `paths` aliases. Instead, it consumes itself through its own `package.json` `exports` field — the same mechanism apps use to import from it:

```ts
import { Button } from 'ui/components/Button'; // ✅ from apps/web, AND from inside packages/ui
import { useComposedRefs } from 'ui/hooks/useComposedRefs';
import type { Size } from 'ui/types/Sizes.types';
```

One consistent rule for all consumers — including the package itself. See [`packages/ui/AGENTS.md`](./packages/ui/AGENTS.md#imports-within-packagesui) for the full mechanic and why same-directory imports still use relative paths.

---

## packages/core conventions

See [`packages/core/AGENTS.md`](./packages/core/AGENTS.md) for the full rules. Short version:

- **entities/** — Zod schemas + derived types. Data shapes only, no logic.
- **repositories/** — static objects. All external I/O (e.g. the Resend API). Wrap I/O in try/catch, throw domain errors.
- **controllers/** — static objects. Business rules + validation. No direct I/O.
- Apps import only from `core/controllers/*`. Never from `core/repositories/*` except for types.

---

## packages/ui conventions

See [`packages/ui/AGENTS.md`](./packages/ui/AGENTS.md) for the full rules. Short version:

Every component follows this structure:

```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  index.ts
```

Named exports only. No default exports. No inline styles. Always use CSS tokens.

---

## CSS conventions

Four-file token system. **Never hardcode colors, sizes, or shadows — always use a token.**

**`packages/ui/src/styles/colors.css`** — raw palette (primitives). Never reference directly in components or apps.

- Single `:root` block with `color-scheme: light dark` at the top.
- Every color uses `light-dark(light-value, dark-value)` — no `@media` queries in this file.
- Neutral scale: `--color-gray-01` … `--color-gray-12` + alpha variants.
- Color scales: `--color-blue-*`, `--color-green-*`, `--color-red-*`, `--color-amber-*`
- Constants: `--color-black`, `--color-white`

**`packages/ui/src/styles/variables.css`** — semantic tokens. The only variables components and apps should reference.

| Category    | Tokens                                                                                                                  |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| Spacing     | `--space-01` … `--space-12` (4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px)                                  |
| Font size   | `--font-size-01` … `--font-size-12` (11px → 60px scale)                                                                 |
| Line height | `--line-height-01` … `--line-height-06` (1 → 2)                                                                         |
| Font weight | `--font-weight-regular` (400), `--font-weight-medium` (500), `--font-weight-semibold` (600), `--font-weight-bold` (700) |
| Radius      | `--radius-01` (4px) … `--radius-05` (16px), `--radius-full` (9999px)                                                    |
| Sizing      | `--height-xs` (20px), `--height-s` (24px), `--height-m` (32px), `--height-l` (40px), `--height-xl` (48px)               |
| Surfaces    | `--background-01`, `--background-02`, `--background-highlight`                                                          |
| Text        | `--foreground-01`, `--foreground-02`, `--foreground-03`, `--foreground-disabled`                                        |
| Borders     | `--border-01`                                                                                                           |
| Interactive | `--color-hover`, `--color-highlighted`, `--color-selected`, `--color-glass`, `--color-overlay`, `--color-switch`        |
| States      | `--color-success`, `--color-error`, `--color-warning`                                                                   |
| Shadows     | `--shadow-s`, `--shadow-m`, `--shadow-l`, `--shadow-focus`                                                              |
| Motion      | `--duration-fast` (0.15s), `--duration-normal` (0.2s), `--duration-slow` (0.35s), `--ease-default`, `--ease-spring`     |
| Z-index     | `--z-base`, `--z-dropdown`, `--z-overlay`, `--z-modal`, `--z-toast`, `--z-tooltip`                                      |
| Brand       | `--color-brand-01` … `--color-brand-12` (defaults to blue — see branding below)                                         |

**`packages/ui/src/styles/base.css`** — shared CSS reset (box-sizing, body defaults, font-smoothing, heading/paragraph defaults). Imported by every app; do not duplicate this content in `globals.css`.

**`apps/*/src/styles/variables.css`** — app-level overrides. Override any semantic token here. Never reference palette tokens (`--color-gray-*`) directly from an app.

**Import order in app layouts (must follow this order):**

1. `ui/styles/colors` — palette primitives
2. `ui/styles/variables` — semantic tokens
3. `ui/styles/base` — shared CSS reset
4. `ui/styles/classnames` — shared utility classes
5. `styles/globals.css` — app-specific global styles
6. `styles/variables.css` — app-level token overrides (must come last)

No utility class frameworks (no Tailwind). Module CSS only.

### Branding

**This project's brand tokens live in [`apps/web/src/styles/variables.css`](./apps/web/src/styles/variables.css)** — the Nextel palette (Primary `#2793C1`, petrol `#12455B`, `#131313` surfaces), the dark-only `color-scheme`, the type scale, and app-specific extras (`--color-petrol`, `--content-width`, `--section-gap`, `--tracking-eyebrow`, the gradients). Fonts are wired in `apps/web/src/lib/fonts.ts` (Roboto for headings via `--font-heading`, Rubik for body via `--main-font`).

Change branding there, never in `packages/ui`. The generic mechanism:

```css
/* Change brand accent from blue to green */
:root {
  --color-brand-01: var(--color-green-01);
  /* … through --color-brand-12 */
  --color-brand-12: var(--color-green-12);
}

/* Change spacing density */
:root {
  --space-04: 0.75rem; /* tighten the base unit */
}

/* Change radius style — e.g. sharp corners everywhere */
:root {
  --radius-full: 4px;
  --radius-01: 0;
}
```

You can also override `--background-01`, `--foreground-01`, `--border-01` etc. to change the surface/text palette. **Never reference `--color-gray-*` or any palette token directly** — always go through the semantic layer so dark mode keeps working automatically.

### Per-instance style overrides

Every component accepts `className`. Compose additional styles via a CSS Module:

```tsx
import styles from './MyPage.module.css';

<Button className={styles.heroButton} variant="primary">
  Get started
</Button>;
```

For a component that needs a fundamentally different look, create a new component in the app — don't fight specificity.

---

## Code conventions

### TypeScript

- **NEVER use `any`.** Use `unknown` and narrow it, or model the type properly.
- Prefer `interface` over `type` for object shapes.
- Prefer type annotations over type assertions. `as const` is the only acceptable assertion shorthand.
- Avoid enums — use `as const` objects with a derived union type:
  ```ts
  const Direction = { Up: 'up', Down: 'down' } as const;
  type Direction = (typeof Direction)[keyof typeof Direction];
  ```
- Never cast with `as SomeType` to silence a type error. Fix the type instead.
- External data (API responses, form inputs, `JSON.parse`) must be typed via `unknown` + runtime validation — never cast blindly.

### React

- No `React.FC`. Use plain functions with explicit return types where useful.
- `PascalCase` for components and file names; `${ComponentName}Props` interface.
- `handle*` prefix for event handlers.
- Always check `packages/ui` for an existing component before building one in an app.
- Shared logic (hooks, utils) used in more than one app belongs in `packages/ui/src/hooks/` or `packages/ui/src/utils/`.

### Server vs. Client Components — the most important Next.js App Router rule

**`'use client'` marks a boundary. Every component below that boundary in the tree becomes a Client Component, even if it has no client-side code.** Push the boundary as deep as possible — to the smallest leaf that actually needs browser APIs, event handlers, or React state.

**Wrong — the whole page becomes client-side just because one button needs `onClick`:**

```tsx
'use client'; // ❌ forces ServerRenderedList and HeavyChart to re-render on the client

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ServerRenderedList /> {/* now a client component — loses SSR benefits */}
      <HeavyChart /> {/* same */}
      <button onClick={() => setOpen(true)}>Open</button>
    </>
  );
}
```

**Right — extract the interactive leaf, keep the page as a Server Component:**

```tsx
// Page.tsx — no 'use client', runs on the server
export default function Page() {
  return (
    <>
      <ServerRenderedList />
      <HeavyChart />
      <OpenButton /> {/* only this leaf is a client component */}
    </>
  );
}

// OpenButton.tsx
('use client');
export function OpenButton() {
  const [open, setOpen] = useState(false);
  return <button onClick={() => setOpen(true)}>Open</button>;
}
```

**Rules to follow every time:**

1. Default to Server Components. Only add `'use client'` when the component itself needs `useState`, `useEffect`, `useRef`, event handlers, or browser-only APIs.
2. If a large component needs a small interactive piece, extract that piece into its own file and put `'use client'` there — not on the parent.
3. Never put `'use client'` on a page, layout, or any component that renders other components that don't need it.
4. Server Components can import and render Client Components — that is the correct pattern. Client Components cannot render Server Components as children (they can only receive them as `children` props).

---

## Official documentation

**Always fetch the relevant doc page before writing code that touches these packages.** Training data has a cutoff — these packages move fast and APIs change between major versions. When in doubt, fetch first.

### Next.js (currently v16)

| What                            | URL                                                                      |
| ------------------------------- | ------------------------------------------------------------------------ |
| Entry point                     | https://nextjs.org/docs/app/getting-started                              |
| Server & Client Components      | https://nextjs.org/docs/app/getting-started/server-and-client-components |
| Fetching data                   | https://nextjs.org/docs/app/getting-started/fetching-data                |
| Server Actions & mutations      | https://nextjs.org/docs/app/getting-started/mutating-data                |
| Caching (`use cache` directive) | https://nextjs.org/docs/app/getting-started/caching                      |
| Routing & layouts               | https://nextjs.org/docs/app/getting-started/layouts-and-pages            |
| Route handlers                  | https://nextjs.org/docs/app/getting-started/route-handlers               |
| Proxy (was: Middleware)         | https://nextjs.org/docs/app/building-your-application/routing/proxy      |

**Breaking changes in v16 most likely to trip you up:**

- `middleware.ts` is renamed to `proxy.ts`. The exported function is `proxy(request)`, not `middleware`. There is a codemod: `npx @next/codemod@canary middleware-to-proxy .`
- Caching model changed: use the `use cache` directive + `cacheLife()` + `cacheTag()`. Old patterns (`unstable_cache`, ISR via `revalidate`) still work but are legacy.

### React (currently v19)

| What                      | URL                                                       |
| ------------------------- | --------------------------------------------------------- |
| All hooks reference       | https://react.dev/reference/react                         |
| `useActionState`          | https://react.dev/reference/react/useActionState          |
| `useOptimistic`           | https://react.dev/reference/react/useOptimistic           |
| `use` (Promise / Context) | https://react.dev/reference/react/use                     |
| `useTransition`           | https://react.dev/reference/react/useTransition           |
| `useFormStatus`           | https://react.dev/reference/react-dom/hooks/useFormStatus |

**New in React 19 most likely to trip you up:**

- `useActionState` replaces the old `useFormState` pattern — use it for server action state and pending indicators.
- `useOptimistic` for instant UI feedback before server confirms — must be called inside `startTransition`.
- `use(promise)` can read a promise or Context anywhere in a component, including inside loops and conditionals.

### Drizzle ORM

| What                     | URL                                                  |
| ------------------------ | ---------------------------------------------------- |
| Overview                 | https://orm.drizzle.team/docs/overview               |
| Schema declaration       | https://orm.drizzle.team/docs/sql-schema-declaration |
| Queries                  | https://orm.drizzle.team/docs/select                 |
| Insert / Update / Delete | https://orm.drizzle.team/docs/insert                 |
| Row-Level Security       | https://orm.drizzle.team/docs/rls                    |
| Migrations               | https://orm.drizzle.team/docs/migrations             |

### Supabase

| What                       | URL                                                                   |
| -------------------------- | --------------------------------------------------------------------- |
| Auth overview              | https://supabase.com/docs/guides/auth                                 |
| SSR auth (`@supabase/ssr`) | https://supabase.com/docs/guides/auth/server-side-rendering           |
| Row Level Security         | https://supabase.com/docs/guides/database/postgres/row-level-security |
| Next.js quickstart         | https://supabase.com/docs/guides/getting-started/quickstarts/nextjs   |

### TypeScript

| What               | URL                                                                      |
| ------------------ | ------------------------------------------------------------------------ |
| tsconfig reference | https://www.typescriptlang.org/tsconfig/                                 |
| Release notes      | https://www.typescriptlang.org/docs/handbook/release-notes/overview.html |

### MDN — JavaScript & Web APIs

| What                 | URL                                                               |
| -------------------- | ----------------------------------------------------------------- |
| JavaScript reference | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference |
| Web APIs             | https://developer.mozilla.org/en-US/docs/Web/API                  |

---

## Documentation rules

- `AGENTS.md` is the canonical source for agent guidance — keep domain-specific rules in the closest `AGENTS.md`.
- `CLAUDE.md` files are navigation hubs only: link to the adjacent `AGENTS.md`, never add implementation details.
