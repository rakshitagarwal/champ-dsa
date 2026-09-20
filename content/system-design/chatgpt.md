# ChatGPT

> LLM product, not "train GPT." **Sessions, streaming tokens, quotas, optional RAG** — the model is a billed dependency.

> Threads in Postgres, trim/summarize context, SSE stream, token quotas in Redis, RAG with tenant filter, queue when GPUs saturated.

## What they ask

**Scenario:** Threads, streamed replies, history, file Q&A. Millions concurrent; model slow; **time-to-first-token <1s**; 10k streams; token quotas; no cross-user leak.

**What the interviewer really tests:**
- Context window trim vs async summary
- SSE streaming without buffering full response
- Rate limits on requests **and** tokens
- RAG chunk→embed→retrieve with **tenant filter**
- Queue/backpressure when model saturated

## Requirements

**Functional:** CRUD threads/messages, stream assistant reply, regenerate, upload files + RAG, optional tools (v2).

**Non-functional:** p95 TTFT <1s; no cross-tenant leak; quota/cost control; persist history; degrade gracefully when model full.

**Clarify:** One model vs router? File size/types? RAG per-thread vs workspace? SSE vs WS? Max context?

**Out of scope (v1):** Training/fine-tune, GPU fleet design, voice, realtime collab on one thread.

## Scale estimation

| Metric | Result |
|--------|--------|
| Messages | ~5M/day (~300 rps peak) |
| Concurrent streams | ~3k avg, **10k viral** |
| Tokens | ~4.5B/day → **quota = cost control** |
| Storage | ~10 GB/day messages; vectors ~1.5 GB/day |

Bottleneck: **GPU throughput + streaming fan-out**, not CRUD.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/threads` | Create thread |
| `GET` | `/api/v1/threads/{id}` | History (scoped user) |
| `POST` | `/api/v1/threads/{id}/messages` | Send → **SSE stream** |
| `POST` | `/api/v1/threads/{id}/files` | Upload for RAG |
| `POST` | `/api/v1/threads/{id}/regenerate` | Regenerate last reply |

**Send:** `{ content, clientMsgId, model?, fileIds? }`. **SSE:** `event: token` / `event: done` with `usage`; `event: error` RATE_LIMITED. `Idempotency-Key: clientMsgId`. `X-Accel-Buffering: no`.

## High-Level Design (HLD)

![ChatGPT: orchestrator, quota, infer queue, RAG, model fleet](/images/hld/chatgpt-architecture.svg)

- **API Gateway:** JWT, [rate limiter](/hld/rate-limiter) req/min + tokens/day.
- **Thread Service:** Postgres; every query `WHERE user_id = ?`.
- **Orchestrator:** load summary + last N msgs → moderate → optional RAG top-k → call provider `stream:true` → pipe SSE → persist assistant on done.
- **Quota ([Redis](/hld/caching-strategies)):** `INCRBY user:{id}:tokens:{date}`; 429 + `Retry-After`.
- **RAG pipeline:** upload S3 → async chunk/embed → vector DB with **`user_id` + `thread_id` filter**; retrieve never cross-tenant.
- **Queue ([Kafka](/hld/message-queue)/Redis Stream):** when concurrency > threshold → `event: queued {position}` then stream.
- **Moderation:** input/output policy before/after model.

**Send flow:** dedup `clientMsgId` → insert user msg → build trimmed prompt → stream deltas → insert assistant + usage.

**History read:** replica OK; cursor pagination.

## Deep dive — context, cost, streaming

Don't send full 8 MB history — **running summary** (`thread_summaries`) + last ~20 turns; tiktoken budget. RAG chunks untrusted — delimiter, ignore embedded instructions.

SSE flush per token; cancel upstream on client disconnect. Saturated model → queue jobs; async I/O so 3k streams ≠ 3k threads.

## Deep dive — RAG and tenancy

Chunk 512 tokens overlap 50 → embed → vector index HNSW with metadata filter. S3 keys `/{user_id}/{thread_id}/`. Missing filter = data leak — say it loudly. Vector DB down → chat without RAG. Don't log prompts cleartext — metrics on token counts only.

## Failures and scale

- Model 5xx: circuit breaker, cheaper fallback model, or queue; idempotent `clientMsgId`.
- Quota Redis down: fail closed (429) or audited fail-open — pick one.
- Partial stream on disconnect: don't persist half assistant message.
- Partition `messages` by thread; autoscale stateless API on connections.
- Hard daily token cap; route simple queries to mini model.

**Phrase:** History in Postgres, orchestrator builds a trimmed prompt, model streams tokens, quotas on tokens. RAG is retrieve-then-prompt with tenant filters. The model is a dependency I can queue — not a box I train in this interview.

**Remember:** clientMsgId dedup → summary + recent context → SSE no buffer → Redis token quota → vector search MUST filter user_id → queue when GPU full.
