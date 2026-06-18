# AI Prompt Generator

A single-page web app where users type a rough idea, pick options, and get back a polished, copy-ready AI prompt — powered by OpenRouter.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- Required env: `OPENROUTER_API_KEY` — OpenRouter API key (Replit Secret)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite + TailwindCSS + shadcn/ui

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `artifacts/api-server/src/routes/generate.ts` — POST /api/generate handler (proxies OpenRouter)
- `artifacts/prompt-generator/src/App.tsx` — wouter routes (`/` Generator, `/how-it-works`)
- `artifacts/prompt-generator/src/pages/Home.tsx` — Generator page (hero + form + output)
- `artifacts/prompt-generator/src/pages/HowItWorks.tsx` — "How it works" page (3-step explainer)
- `artifacts/prompt-generator/src/components/Navbar.tsx` — sticky header / navbar (wouter `Link` nav, active-state aware)
- `artifacts/prompt-generator/src/components/Footer.tsx` — shared footer
- `artifacts/prompt-generator/src/index.css` — theme / CSS variables

## Architecture decisions

- OpenRouter API key is read server-side only — never exposed to the browser
- `HTTP-Referer` header is set from `REPLIT_DOMAINS` env var so OpenRouter can identify the app
- Error messages from OpenRouter are never leaked to the client; only generic messages are returned
- The frontend uses the Orval-generated `useGeneratePrompt` mutation hook — no raw fetch calls

## Product

- User enters a rough idea or task in a textarea
- Selects use case, tone, output format, and target model (Claude, GPT-4o, Llama, Gemini)
- Clicks "Generate Prompt" — the backend calls OpenRouter with a meta-prompt system message
- The polished, copy-ready prompt appears in the output pane with a one-click Copy button

## Design language

- Visual style is modeled on remove.bg: blue accent `#0F70E6` (`--primary`), grey text `#454545`, white/light background, pill-shaped (`rounded-full`) primary CTAs
- Fonts: Poppins for headings (`--app-font-display`, applied to `h1`–`h6`), Open Sans for body, Space Mono for the generated prompt output

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `OPENROUTER_API_KEY` must be set as a Replit Secret before the backend can call OpenRouter
- The default model is `anthropic/claude-3.5-sonnet` if none is selected

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
