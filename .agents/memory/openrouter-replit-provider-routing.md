---
name: OpenRouter provider routing with Replit secrets
description: Which OpenRouter models work when using a user-supplied OPENROUTER_API_KEY on Replit, and which fail with provider routing errors.
---

# OpenRouter model availability

When a user provides their own `OPENROUTER_API_KEY` as a Replit Secret, not all models in OpenRouter's `/models` list are reachable. The account may be restricted to a subset of providers.

**Error pattern to recognize:**
```json
{"error":{"message":"No allowed providers are available for the selected model.",
  "available_providers":["venice"],
  "requested_providers":["openai","anthropic","google-ai-studio"]}}
```

**Why:** OpenRouter accounts (especially keys provisioned through restricted dashboards) limit which backend providers can be used. The `available_providers` list can vary per-request.

**How to apply:**
- Before wiring up model selectors, call `GET /api/v1/models` and then probe 2–3 candidate models with a tiny chat request to confirm they actually return completions, not 404s.
- Models that reliably worked with a standard OpenRouter key on Replit (tested June 2026):
  - `openai/gpt-4o-mini` ✅
  - `openai/gpt-4o` ✅
  - `google/gemini-2.5-flash` ✅
  - `google/gemini-2.5-pro` ✅
- Models that failed (404, no allowed providers):
  - `anthropic/claude-3.5-sonnet` ❌ (model slug no longer exists)
  - `anthropic/claude-sonnet-4` ❌ (needs google-vertex/bedrock, but account routed to openai/anthropic/google-ai-studio)
  - `meta-llama/llama-3.3-70b-instruct:free` ❌ (Venice only)
- The `provider.order` request field does NOT override account-level provider restrictions; it only reorders among already-allowed providers.
