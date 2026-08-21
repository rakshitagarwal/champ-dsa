# ChatGPT

> LLM product, not "train GPT." The design is **sessions, streaming tokens, rate limits, and optionally RAG**. The model is a billed dependency.

## What they ask

Chat UI, history, maybe file upload / retrieval. Stay up when a model is slow. Don't leak one user's context to another.

## Requirements

**Functional:** create thread, send message, stream reply, list history, optional tools / RAG.

**Non-functional:** time-to-first-token, quota per user, no cross-tenant data, cost control.

**Clarify:** one model vs routing; plugins; image gen (extra box).

## API

1. `POST /threads`
2. `POST /threads/{id}/messages` `{ content }` then **SSE/WS** token stream
3. `GET /threads/{id}`
4. `POST /threads/{id}/files` → S3

## Design

**API gateway** + auth. **Thread store:** Postgres messages `(threadId, role, content, ts)`. Don't put the whole history only in the browser.

**Orchestrator:** load last N messages (or a summary + recent), apply policy/moderation, call model provider (OpenAI-compatible) with **streaming**. Pipe tokens to the client. Persist the final assistant message.

**Quota:** [rate limiter](/system-design/rate-limiter) on requests **and** tokens/day. 429 when broke.

**Queue:** if GPUs/provider are saturated, enqueue jobs; show "busy." Don't hold 50k HTTP connections stuck in Python.

**Files / RAG:** upload to S3 → chunk → embeddings in a vector DB → retrieve top-k → stuff into the prompt. Source of truth is still the files + ACL on the thread.

## Deep dive — context and cost

Context windows are finite. **Trim** old turns, or **summarize** asynchronously and keep a running memory. Say this or you'll "send 8MB of chat every time."

**Streaming:** first token SLA matters more than total time. SSE from the API pod; don't buffer the full essay.

**Tenancy:** `threadId` scoped to `userId` on every read. Vector search **must** filter by tenant.

**Prompt injection** from uploaded files — treat retrieved text as untrusted.

**Idempotency:** retrying "send" shouldn't spawn two billed completions — `clientMsgId`.

## Extra probes

1. Tools / function calling — extra round trips, same thread
2. Multi-model routing (cheap vs smart)
3. Observability: token counts as [metrics](/system-design/metrics-monitoring), not logs of prompts in the clear

**Phrase:** "History in Postgres, orchestrator builds a trimmed prompt, model streams tokens, quotas on tokens. RAG is retrieve-then-prompt with tenant filters. The model is a dependency I can queue, not a box I train in this interview."
