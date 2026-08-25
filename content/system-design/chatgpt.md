# ChatGPT

> LLM product, not "train GPT." The design is **sessions, streaming tokens, rate limits, and optionally RAG**. The model is a billed dependency.

## What they ask

Design a ChatGPT-like conversational AI product: users create threads, send messages, get streamed token responses, view history, and optionally upload files for retrieval-augmented generation (RAG). The system must stay responsive when the model is slow, enforce quotas, and never leak one user's context to another.

**Scenario:** Millions of users chat concurrently. Each turn fans out to a GPU-backed model provider (OpenAI-compatible) that streams tokens with variable latency. The product must provide time-to-first-token <1s, handle 10k concurrent streams, enforce token quotas, persist history, and isolate tenants — without training a model in the interview.

**What interviewer tests:**
- Session/thread storage and context window management (trim vs summarize)
- Streaming architecture (SSE/WebSocket) without buffering the full response
- Rate limiting on requests *and* tokens, plus cost control
- Multi-tenant isolation for history and vector search
- RAG pipeline (chunk → embed → retrieve → prompt) and queuing under load

## Requirements

| Category | Requirement |
|---|---|
| **Functional** | Create thread, send message, stream assistant reply (tokens), list threads, get thread history, delete thread, upload files, RAG Q&A over files, optional tools/function calling, regeneration, edit & branch. |
| **Non-functional** | Time-to-first-token p95 <1s, stream without buffering, quota per user (requests + tokens/day), no cross-tenant data leak, cost control, available even when model is saturated (queue + backpressure). Persisted history, not just browser. |
| **Clarify** | One model vs router (cheap vs smart)? File types and max size? RAG scope — per-thread or workspace? Tools/plugins? Image generation? Streaming protocol — SSE or WebSocket? Max context length? |
| **Out of scope v1** | Model training/fine-tuning, RLHF, custom GPU orchestration, voice I/O, real-time collaboration on same thread. |

## Scale estimation

| Metric | Math | Result |
|---|---|---|
| **Users** | 10M registered, 1M DAU, 5 messages/user/day | 5M messages/day |
| **QPS — messages** | 5M / 86400 ≈ 58 rps avg, peak 5x | ~300 rps peak |
| **Concurrent streams** | 300 rps × 10s avg generation | ~3k concurrent streams; viral 10k |
| **Tokens** | Avg prompt 500 + completion 400 = 900 tokens/message | 5M × 900 = 4.5B tokens/day |
| **Storage — messages** | 5M messages × 2 KB avg | ~10 GB/day → ~3.6 TB/year in Postgres |
| **Storage — files** | 1% of messages have 1 MB file | ~50 GB/day in S3 |
| **Storage — vectors** | 50k files/day × 10 chunks × 768 dims × 4 bytes | ~1.5 GB/day in vector DB |
| **Bandwidth — streaming** | 3k streams × 50 tokens/sec × 4 bytes | ~600 KB/s payload + overhead |
| **Cost** | 4.5B tokens × $0.002/1k | ~$9k/day — quota enforcement is cost control |

The bottleneck is **GPU/model throughput and streaming fan-out**, not CRUD.

## API Design

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/threads` | Create thread |
| `GET` | `/api/v1/threads` | List my threads (cursor) |
| `GET` | `/api/v1/threads/{id}` | Get thread + messages |
| `DELETE` | `/api/v1/threads/{id}` | Delete thread |
| `POST` | `/api/v1/threads/{id}/messages` | Send message (returns SSE stream) |
| `POST` | `/api/v1/threads/{id}/files` | Upload file for RAG |
| `GET` | `/api/v1/threads/{id}/files` | List files |
| `POST` | `/api/v1/threads/{id}/regenerate` | Regenerate last reply |

**Send message — Request:**
```json
POST /api/v1/threads/{id}/messages
{
  "content": "Explain quantum computing simply",
  "clientMsgId": "uuid-v4", // idempotency
  "model": "gpt-4o-mini", // optional routing hint
  "fileIds": ["file_abc"] // optional RAG context
}
```

**Streaming response (SSE):**
```
HTTP/1.1 200 OK
Content-Type: text/event-stream
Cache-Control: no-cache
X-Accel-Buffering: no

event: token
data: {"delta": "Quantum", "seq": 1}

event: token
data: {"delta": " computing", "seq": 2}

event: done
data: {"messageId": "msg_xyz", "usage": {"promptTokens": 512, "completionTokens": 380}}

event: error
data: {"code": "RATE_LIMITED", "message": "Token quota exceeded"}
```

Headers: `Idempotency-Key: <clientMsgId>` — retrying "send" must not spawn two billed completions.

**Alternative:** WebSocket `WS /ws/threads/{id}` for bidirectional streaming; SSE is simpler for interview.

## High-Level Design (HLD)

```
Client (Web/Mobile)
   |
 CDN (static) + Load Balancer
   |
 API Gateway (auth JWT, [rate limiter](/system-design/rate-limiter) on req + tokens)
   |
 Thread Service (CRUD threads/messages, Postgres)
   |
 Orchestrator Service (builds prompt, moderation, RAG retrieve, calls model)
   | \
   |  +--> Vector DB (embeddings, tenant-filtered retrieval)  +  S3 (files)
   |  +--> Moderation Service (input/output policy check)
   |  +--> Model Provider (OpenAI-compatible, streaming) -> GPU fleet
   |
 Queue ([Kafka](/system-design/kafka) / Redis Stream) for saturated model — enqueues jobs, shows "busy"
   |
 [Redis](/system-design/redis) (quota counters, run dedup, stream buffers)
   |
 Postgres (threads, messages — source of truth)
```

**Components:**
- **API Gateway:** JWT auth, per-user [rate limiter](/system-design/rate-limiter) (e.g., 10 req/min, 100k tokens/day via token bucket), validates `clientMsgId` idempotency.
- **Thread Service:** Owns `threads` + `messages` in Postgres. Every read scopes `WHERE user_id = ?` — tenant isolation at query level.
- **Orchestrator:** The core. Loads last N messages (or summary + recent), runs moderation, optionally retrieves RAG chunks, builds trimmed prompt, calls model provider with `stream: true`, pipes tokens to client via SSE, persists final assistant message on `done`. Handles retries and timeout.
- **File / RAG Pipeline:** Async after upload: S3 → chunk (512 tokens, 50 overlap) → embed via embedding model → write to vector DB with `thread_id`/`user_id` ACL. Retrieval: `top_k=5` filtered by `user_id` + `thread_id`.
- **Queue:** When model concurrency > threshold (e.g., 5k streams), enqueue `GenerateJob` to [Kafka](/system-design/kafka)/SQS; worker pool drains with backpressure. Client sees "queued" then stream starts — don't hold 50k HTTP connections in Python threads.
- **Quota Service:** Counts tokens per user per day in [Redis](/system-design/redis) (`INCRBY user:{id}:tokens:2026-08-25`), checked before and after generation; 429 with `Retry-After` when exceeded.

**Write flow — Send message:**
1. `POST /threads/{id}/messages` → Gateway checks quota, dedup by `clientMsgId` (UNIQUE).
2. Thread Service inserts `messages{role=user, content}`.
3. Orchestrator loads context (recent messages + summary), moderates, optionally RAG retrieves, builds prompt.
4. Calls model provider streaming; each `delta` forwarded as SSE `event: token` immediately (no buffering); also appends to in-memory buffer.
5. On `done`, persists `messages{role=assistant, content=full}` + `usage{promptTokens, completionTokens}` and increments quota counters.

**Read flow — History:**
1. `GET /threads/{id}` → `SELECT * FROM messages WHERE thread_id=? AND user_id=? ORDER BY created_at` with cursor pagination.

## Low-Level Design (LLD)

**DB Schema (Postgres + S3 + Vector DB):**
```sql
CREATE TABLE users (
  id              BIGSERIAL PRIMARY KEY,
  email           VARCHAR(255) UNIQUE NOT NULL,
  plan            VARCHAR(20) DEFAULT 'free', -- free, pro
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE threads (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  title           VARCHAR(300),
  model           VARCHAR(50) DEFAULT 'gpt-4o-mini',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_threads_user_updated ON threads(user_id, updated_at DESC);

CREATE TABLE messages (
  id              BIGSERIAL PRIMARY KEY,
  thread_id       BIGINT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  role            VARCHAR(20) NOT NULL, -- user, assistant, system, tool
  content         TEXT NOT NULL,
  client_msg_id   VARCHAR(64) UNIQUE, -- idempotency, nullable for assistant
  model           VARCHAR(50),
  prompt_tokens   INT,
  completion_tokens INT,
  created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_messages_thread_time ON messages(thread_id, created_at);
CREATE INDEX idx_messages_user ON messages(user_id);

CREATE TABLE files (
  id              VARCHAR(64) PRIMARY KEY,
  thread_id       BIGINT REFERENCES threads(id),
  user_id         BIGINT NOT NULL REFERENCES users(id),
  s3_key          TEXT NOT NULL,
  filename        VARCHAR(300),
  bytes           BIGINT,
  status          VARCHAR(20) DEFAULT 'UPLOADED', -- UPLOADED, CHUNKED, EMBEDDED, FAILED
  created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_files_thread ON files(thread_id);

-- Summaries for long threads
CREATE TABLE thread_summaries (
  thread_id       BIGINT PRIMARY KEY REFERENCES threads(id),
  summary         TEXT NOT NULL,
  up_to_message_id BIGINT NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Vector DB (e.g., pgvector, Pinecone, Qdrant) logical schema:
-- collection: embeddings { id, thread_id, user_id, chunk_text, embedding vector(1536), created_at }
-- Index: HNSW or IVF, filter by user_id + thread_id
```

**Key classes / responsibilities:**
```python
class ThreadService:
  def create_thread(user_id, title): ...
  def get_thread(user_id, thread_id): # WHERE user_id=? — tenant guard
  def list_messages(user_id, thread_id, cursor, limit=50): ...

class Orchestrator:
  def handle_message(user_id, thread_id, content, client_msg_id, file_ids):
    if dedup_exists(client_msg_id): return prior_stream
    user_msg = persist_user_message(...)
    context = build_context(thread_id) # recent + summary
    chunks = rag_retrieve(user_id, thread_id, content) if file_ids else []
    prompt = build_prompt(context, chunks, content)
    moderate(prompt) # input check
    stream = model_provider.stream(prompt) # yields deltas
    for delta in stream:
      push_sse(delta)
      buffer += delta
    moderate(buffer) # output check
    persist_assistant_message(buffer, usage)
    increment_quota(user_id, usage)

  def build_context(thread_id):
    summary = get_summary(thread_id)
    recent = get_recent_messages(thread_id, limit=20, max_tokens=6000)
    return trim_to_window(summary, recent, max_tokens=8000)

class RagPipeline:
  def ingest_file(file_id): # S3 -> chunk -> embed -> vector DB
  def retrieve(user_id, thread_id, query, top_k=5): # vector search with filter user_id=?
  def chunk(text): # 512 tokens, overlap 50

class QuotaService:
  def check_and_increment(user_id, tokens): # Redis INCRBY + TTL, 429 if over
```

**Concurrency & algorithms:**
- **Context window management:** Models have finite windows (8k–128k). Naively sending 8 MB of chat every time is wasteful and fails. Strategy: keep running summary (`thread_summaries`) updated async (summarize every 20 messages), plus last N messages (e.g., 20) trimmed to `max_tokens`. `build_context` fits within window with token counting (tiktoken).
- **Streaming:** SSE from API pod with `X-Accel-Buffering: no` and flush per token. Don't buffer full essay before responding — first token SLA matters more than total time. Use async I/O (Node/Python asyncio) so 3k streams don't need 3k threads.
- **Idempotency:** `client_msg_id` UNIQUE ensures retrying "send" doesn't spawn two billed completions; return existing stream or cached result.
- **Tenant isolation:** Every query filters `user_id`; vector search **must** filter by `tenant` (user_id/thread_id) — never search across tenants. ACL on `files` table enforces it.

**Patterns used:** Outbox not needed for streaming but used for file ingest ([Kafka](/system-design/kafka) `FileUploaded` → chunk → embed), Cache-aside for quota counters, Circuit breaker around model provider, Queue-based load leveling, Idempotency key, Async summarization.

## Deep dive — context and cost

Context windows are finite. If you send the entire history, cost and latency explode and you hit `context_length_exceeded`. Correct approach: **trim old turns or summarize asynchronously and keep a running memory**. Implementation: after every 20 messages, a background job calls a cheap model to summarize `messages 1..20` into `thread_summaries.summary`, then `build_context` sends `summary + messages 21..40`. Token counting via tokenizer ensures `prompt_tokens < window - buffer`. Mention cost: "I'll send 8 MB of chat every time" is the failure mode. Also note prompt injection from retrieved files — treat RAG chunks as untrusted data, not instructions; wrap in delimiters and instruct model to ignore instructions inside.

## Deep dive — streaming, quotas, and queuing

**Streaming:** First token SLA matters more than total time. SSE from the API pod with immediate flush; don't buffer. Use `Transfer-Encoding: chunked` and disable proxy buffering. On client disconnect, cancel the upstream model call to save cost.

**Quotas:** [Rate limiter](/system-design/rate-limiter) on requests (e.g., 20/min) **and** tokens/day (e.g., 100k free, 2M pro) via [Redis](/system-design/redis) token bucket. Check before generation (estimate prompt tokens) and after (actual usage). Return `429` with `Retry-After` and `X-Quota-Remaining`. For cost control, also rate limit per-model (pro model stricter).

**Queuing:** If GPUs/provider saturated (concurrency > threshold or p95 latency >2s), enqueue `GenerateJob` to [Kafka](/system-design/kafka) / Redis Stream; worker pool with limited concurrency drains it. Client sees `event: queued {position: 12}` then stream starts. Prevents holding 50k HTTP connections stuck in Python threads and gives backpressure. Mention autoscaling and fallback to cheaper model when overloaded.

## Deep dive — RAG and tenancy

**RAG pipeline:** Upload → S3 → async chunk (512 tokens, overlap 50, preserve sentence boundaries) → embed via embedding model (e.g., `text-embedding-3-small`) → write to vector DB with `user_id` + `thread_id` metadata. Retrieval: embed query, search `top_k=5` with filter `user_id=? AND thread_id=?`, stuff chunks into prompt as `Context: ...` with citations. Source of truth is still files + ACL on thread — vector DB is derived and rebuildable.

**Tenancy:** `threadId` scoped to `userId` on every read (`WHERE thread_id=? AND user_id=?`). Vector search **must** filter by tenant — a missing filter leaks one user's files to another. Also enforce at S3 key level (`s3://bucket/{user_id}/{thread_id}/{file_id}`). Mention prompt injection from uploads and that observability must not log prompts in the clear — token counts as [metrics](/system-design/metrics-monitoring), prompts encrypted at rest.

## Handling failures and scale

| Failure | Handling |
|---|---|
| **Model provider slow / 5xx** | Retry with backoff (idempotent `client_msg_id`), circuit breaker, fallback to cheaper model or queue; stream `event: error` with retryable flag. |
| **Model provider down** | Queue jobs in Kafka; serve history reads from Postgres; show "model temporarily unavailable" with queued position. |
| **Vector DB down** | RAG degrades to no-context answer (still useful); don't block chat. Replay embeddings from S3 on recovery. |
| **Postgres overload** | Read replicas for history; partition `messages` by `thread_id` hash when large; cache thread list in Redis. |
| **Quota Redis down** | Fail open with in-memory fallback + log, or fail closed (429) — choose and justify; mention dual-write to DB for audit. |
| **Client disconnect mid-stream** | Cancel upstream model call via abort signal; persist partial? No — only persist completed assistant message. |
| **Scale — more streams** | Stateless API pods autoscale on concurrent connections; orchestrator scales on GPU quota; CDNs not relevant for streams but static assets cached. |
| **Cost explosion** | Hard caps per user/day, per-model routing (cheap default, smart on demand), truncate context, cache identical prompts (optional). |

## Extra probes / follow-ups

1. Tools / function calling — extra round trips, same thread; orchestrator loops `model -> tool call -> tool result -> model`.
2. Multi-model routing — cheap vs smart classifier; route simple Q&A to mini, reasoning to pro.
3. Observability — token counts as [metrics](/system-design/metrics-monitoring), not logs of prompts in clear; distributed tracing with `traceId` per stream; p95 time-to-first-token dashboard.
4. File lifecycle — expiry, max 100 MB per thread, virus scan on upload.
5. Branching / edit — `POST /threads/{id}/messages/{msgId}/edit` creates a branch (new message list fork).

**Phrase:** "History in Postgres, orchestrator builds a trimmed prompt, model streams tokens, quotas on tokens. RAG is retrieve-then-prompt with tenant filters. The model is a dependency I can queue, not a box I train in this interview."
