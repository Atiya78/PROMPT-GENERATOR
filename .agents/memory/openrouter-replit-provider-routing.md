---
name: OpenRouter provider routing with Replit secrets
description: Which OpenRouter models work when using a user-supplied OPENROUTER_API_KEY on Replit, and which fail with provider routing errors.
---

# OpenRouter model availability

When a user provides their own `OPENROUTER_API_KEY` as a Replit Secret, not all models in OpenRouter's `/models` list are reachable. The account is restricted to a subset of backend **providers**, and a model only works if at least one of the providers that serve it is in the account's allowlist.

**Error pattern to recognize (HTTP 404 from OpenRouter):**
```json
{"error":{"message":"No allowed providers are available for the selected model.",
  "metadata":{"available_providers":["xai"],
  "requested_providers":["openai","anthropic","google-ai-studio"]}}}
```
- `requested_providers` = the account's allowlist (constant per key).
- `available_providers` = the providers that actually serve the requested model.
- If those two sets don't intersect → 404.

**Why:** keys provisioned through restricted dashboards limit allowed providers. A model's slug existing in `/models` does NOT mean it's reachable — e.g. `anthropic/claude-3.5-haiku` is routed only via `amazon-bedrock`, so it fails even though `anthropic` is allowed. The `provider.order` request field does NOT override the allowlist; it only reorders among already-allowed providers.

**How to apply:**
- Never trust `/models` alone. Before exposing a model selector, probe each candidate with a tiny real chat request and keep ONLY the ones that return a completion (not 404). A quick parallel `Promise.all` loop hitting your own `/api/generate` is the fastest check.
- Allowlist observed on this project's key (June 2026): `openai`, `anthropic`, `google-ai-studio`.
- Confirmed WORKING with that allowlist: `anthropic/claude-sonnet-4.6`, `anthropic/claude-opus-4.1`, `openai/gpt-4.1`, `openai/gpt-4.1-mini`, `openai/gpt-4o`, `openai/gpt-4o-mini`, `openai/o3`, `openai/o4-mini`, `google/gemini-2.5-pro`, `google/gemini-2.5-flash`.
- Confirmed FAILING (provider not in allowlist): `anthropic/claude-3.5-haiku` (bedrock-only), `meta-llama/*`, `deepseek/*`, `mistralai/*`, `x-ai/*`.
