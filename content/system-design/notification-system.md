# Notification System

> Fan-out "tell the user" across **push, email, SMS, in-app**. Preferences and retries matter more than picking Twilio.

## What they ask

Interviewer: *"Design a notification platform that other internal services call to notify users — push, email, SMS, in-app inbox. It should handle 100M users, marketing bursts, and OTPs without double-sending."*

What they really test:
- **Decoupling:** Product services should not block on provider latency (FCM/APNS/SES/Twilio). Do you enqueue and return 202?
- **Fan-out correctness:** Preferences, quiet hours, locale, unsubscribe, frequency caps — do you check *before* sending?
- **Idempotency & storms:** Can you survive a retry or a viral post that fans out to 10M followers without melting or spamming?
- **Observability:** Can you answer "did user X get notification Y?" via status tracking and webhooks?

Example scale framing (to anchor your numbers early): 50M MAU, 5 notifications/user/day average → 250M/day. Marketing push: 20M in 10 minutes. OTP spike: 5k QPS for 5 minutes. Mention these before doing math.

## Requirements

**Functional:**
- `notify(userId, templateId, data, channels[])` — transactional (OTP, order shipped) and bulk/marketing.
- Per-user **preferences**: opt-in/out per channel and per category (marketing, transactional, social).
- **Templates** with versioning and i18n — render `{{name}}` with data, no raw HTML from callers.
- **Unsubscribe** (one-click, per-category) and GDPR delete — honored synchronously on next send.
- In-app **inbox + badge count** with read/unread.
- **Status tracking**: `queued → rendered → sent → delivered → failed / bounced / complained` + provider webhooks.
- **Digest/collapse**: group 50 likes into "Alice and 49 others liked your post" within a window.
- Scheduling: immediate or `sendAt` in future, quiet hours per user timezone.

**Non-functional:**
- **At-least-once delivery** with **exactly-once effect per `idempotencyKey`** (app-level dedup).
- **P99 enqueue latency < 100ms** — caller never waits for SES/Twilio.
- **Backpressure aware** — survive 10x bursts without dropping transactional priority.
- Durability: notification row + outbox before ack to caller.
- Cost aware: SMS is dollars; don't infinite-retry SMS without cap.

**Clarify (ask the interviewer):**
- Channels in v1 — all four or just push+email?
- Max fan-out per event — single user vs broadcast to followers?
- Delivery SLA — OTP in 5s vs marketing in hours?
- Do we need per-device push tokens or single user push?
- Is digest required in v1 or v2?

**Out of scope (v1):**
- Building your own push/email provider — we integrate external providers.
- Rich analytics beyond delivery status — defer dashboards.
- ML-based send-time optimization — v2.
- Full campaign A/B framework — mention but defer.

## Scale estimation

| Parameter | Assumption | Math | Result |
|---|---|---|---|
| DAU | 10M of 50M MAU | — | 10M |
| Notifications/day | 5/user avg (1 transactional + 4 social/marketing) | 10M × 5 | **50M/day** (peak 250M with marketing) |
| Avg QPS | 50M / 86400 | — | **~580 QPS** avg |
| Peak QPS | marketing burst 20M in 600s | 20M/600 | **~33k QPS** burst (enqueue only) |
| Storage (metadata) | 500 bytes/row + rendered copy 2KB | 50M × 2.5KB | **~125 GB/day**, 3.7 TB/month before TTL/archival |
| In-app inbox | 20% keep inbox | 10M inbox reads/day | Cache-friendly, Redis badge counters |
| Push fan-out | viral post 10M followers | 10M pushes × 2KB payload + token lookup | Needs chunked [Kafka](/system-design/kafka) partitions, not inline loop |

Bandwidth: push payloads small; email bodies 10-50KB. Throughput is dominated by provider calls, not your ingress. Size your **workers per channel** independently.

## API Design

```http
POST /v1/notifications
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
{
  "userId": "u_123",
  "templateId": "order_shipped_v2",
  "data": { "orderId": "o_789", "eta": "Tomorrow" },
  "channels": ["push", "email"],          // optional hint, prefs still win
  "priority": "transactional",            // transactional | bulk
  "idempotencyKey": "550e8400-...",
  "sendAt": "2026-05-13T10:00:00Z",        // nullable = immediate
  "groupingKey": "order:o_789",           // for digest/collapse
  "dedupeWindowSec": 3600
}
→ 202 { "notificationId": "n_abc", "status": "queued" }

GET /v1/users/{userId}/preferences
→ 200 { "email": { "marketing": false, "transactional": true }, "push": {...}, "quietHours": {"start":"22:00","end":"07:00","tz":"Asia/Kolkata"} }

PUT /v1/users/{userId}/preferences
{ "channel": "email", "category": "marketing", "enabled": false }
→ 200 { "updated": true }

GET /v1/notifications/{id}            // status trace
→ 200 { "id":"n_abc", "channels": [{"channel":"push","status":"delivered","providerMsgId":"fcm_123"}], "attempts": 2 }

POST /v1/webhooks/provider             // SES/FCM/Twilio callbacks, signed
Header: X-Provider-Signature: ...
{ "provider":"ses", "event":"bounced", "providerMsgId":"ses_123", "notificationId":"n_abc" }
→ 200 OK (idempotent handler)

GET /v1/users/{userId}/inbox?cursor=&limit=20
POST /v1/users/{userId}/inbox/{notifId}/read
```

All POSTs that create notifications require `Idempotency-Key` header *and* body `idempotencyKey` — enforce unique constraint on `(callerService, idempotencyKey)`.

## High-Level Design (HLD)

```
[Product Services] ──POST /notifications (202)──▶ [API Gateway + Auth] ──▶ [Notification API]
                                                          │                      │
                                                          │               ┌──────▼──────┐
                                                          │               │ Postgres    │
                                                          │               │ (notif row, │
                                                          │               │ prefs, tmpl)│
                                                          └──────────────▶│ idempotency │
                                                                          └──────┬──────┘
                                                                                 │ outbox poll / CDC
                                                                          ┌─────▼─────┐
                                                                          │  [Kafka]  │  topic: notification.requested (partition by userId)
                                                                          └─────┬─────┘
                                                                                │
                                              ┌─────────────────────────────────┼─────────────────────────────────┐
                                              │                                 │                                 │
                                       ┌──────▼──────┐                   ┌──────▼──────┐                   ┌─────▼─────┐
                                       │ Orchestrator│                   │  Scheduler  │                   │ Digest    │
                                       │ Service     │                   │ (sendAt)    │                   │ Aggregator│
                                       └──────┬──────┘                   └──────┬──────┘                   └─────┬─────┘
                                              │ render + prefs check            │ delayed queue                     │ windowed collapse
                 ┌────────────────────────────┼────────────────────────────┐    │                            ┌────▼────┐
                 │                            │                            │    │                            │ Redis   │
          ┌──────▼──────┐              ┌──────▼──────┐              ┌─────▼─────┐                      │ (dedupe)│
          │ email.queue │              │  push.queue │              │ sms.queue │                      └─────────┘
          │  (Kafka)    │              │   (Kafka)   │              │  (Kafka)  │
          └──────┬──────┘              └──────┬──────┘              └─────┬─────┘
                 │                            │                           │
          ┌──────▼──────┐              ┌──────▼──────┐              ┌─────▼─────┐
          │Email Workers│              │Push Workers │              │SMS Workers│ ──▶ SES / FCM-APNS / Twilio
          └──────┬──────┘              └──────┬──────┘              └─────┬─────┘
                 └────────────┬───────────────┴──────────────┬────────────┘
                              ▼                              ▼
                    [Status Updater + Webhook Handler]  [In-app Inbox Service → Cassandra/Postgres + Redis badge]
```

**Component roles:**
- **Notification API (ingest):** validates, checks idempotency (unique constraint), writes `notifications` row `queued`, publishes to [Kafka](/system-design/kafka) via transactional outbox, returns 202. Uses [Redis](/system-design/redis) for dedupe window cache.
- **Scheduler:** for `sendAt` future and quiet-hours delay; backed by delayed queue (Kafka delay topic or DB polling + [job scheduler](/system-design/job-scheduler)).
- **Orchestrator:** consumes `notification.requested`, loads prefs/quietHours/locale/rate limits, renders template (Mustache/Handlebars with strict allowlist), decides channels to actually send, emits per-channel events. Skips disabled/unsubscribed before rendering provider payload.
- **Per-channel queues + workers:** independent scaling, rate limits, retries. Email throttled by SES reputation, push by FCM quotas, SMS by cost. Each worker idempotent on `notificationId+channel`.
- **Status + Webhooks:** provider callbacks update `notification_channels` status. Webhook handler verifies signature, deduplicates on `providerEventId`.
- **In-app inbox:** writes to feed store; badge count in [Redis](/system-design/redis) `INCR/DECR` + periodic reconciliation to DB.

**Data flow — write path:** Caller POST → idempotency check → DB row + outbox → Kafka → Orchestrator → per-channel Kafka → Workers → Provider API → status `sent` → webhook `delivered/bounced`.

**Data flow — read path:** App polls `GET /inbox` (or WS for live). Badge count from Redis (fast) with fallback to DB count. Preferences read from Postgres cached in Redis with 1m TTL + invalidation on PUT.

## Low-Level Design (LLD)

**Database schema (Postgres):**

```sql
-- Core notification
CREATE TABLE notifications (
  id                UUID PRIMARY KEY,
  caller_service    TEXT NOT NULL,
  idempotency_key   TEXT NOT NULL,
  user_id           UUID NOT NULL,
  template_id       TEXT NOT NULL,
  template_version  INT NOT NULL DEFAULT 1,
  data_json         JSONB NOT NULL,
  priority          TEXT NOT NULL CHECK (priority IN ('transactional','bulk')),
  grouping_key      TEXT,
  send_at           TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (caller_service, idempotency_key)
);
CREATE INDEX ON notifications (user_id, created_at DESC);
CREATE INDEX ON notifications (send_at) WHERE send_at IS NOT NULL;

CREATE TABLE notification_channels (
  notification_id   UUID REFERENCES notifications(id),
  channel           TEXT CHECK (channel IN ('push','email','sms','inapp')),
  status            TEXT NOT NULL CHECK (status IN ('queued','rendered','sent','delivered','failed','bounced','skipped_prefs')),
  provider          TEXT,
  provider_msg_id   TEXT,
  rendered_subject  TEXT,
  rendered_body     TEXT,
  next_retry_at     TIMESTAMPTZ,
  attempt_count     INT DEFAULT 0,
  last_error        TEXT,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (notification_id, channel),
  UNIQUE (provider, provider_msg_id)
);

CREATE TABLE user_preferences (
  user_id           UUID PRIMARY KEY,
  prefs_json        JSONB NOT NULL, -- { email: {marketing:bool,...}, push:{...}, quietHours:{...} }
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE templates (
  id                TEXT PRIMARY KEY,
  version           INT PRIMARY KEY,
  channel           TEXT NOT NULL,
  subject_tpl       TEXT,
  body_tpl          TEXT NOT NULL,
  locale            TEXT NOT NULL DEFAULT 'en',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE unsubscribe_tokens (
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  token TEXT PRIMARY KEY,
  PRIMARY KEY (user_id, category)
);

-- In-app inbox (could be Cassandra for fan-out heavy)
CREATE TABLE inbox_items (
  user_id     UUID NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL,
  notification_id UUID NOT NULL,
  is_read     BOOLEAN DEFAULT false,
  PRIMARY KEY (user_id, created_at, notification_id)
) WITH CLUSTERING ORDER BY (created_at DESC);
```

**Key classes / responsibilities:**

```text
NotificationController  — validates, enriches idempotencyKey, calls NotificationService.enqueue()
NotificationService     — tx: insert notification + outbox event; cache dedupe check
OutboxPoller            — polls outbox table → publishes to Kafka (exactly-once via tx outbox)
OrchestratorConsumer    — on message: PreferenceService.canSend(), TemplateRenderer.render(), RateLimiter.check(), emit per-channel
TemplateRenderer        — Mustache with allowlisted variables, locale fallback, version pin
ChannelWorker (abstract)→ EmailWorker / PushWorker / SmsWorker — provider adapter + retry with backoff + DLQ
WebhookHandler          — verify HMAC, idempotent upsert on provider_event_id
InboxService            — write inbox_items, maintain Redis badge counter
```

**Important algorithms / concurrency:**
- **Idempotency:** DB unique constraint is truth; Redis `SETNX idempotencyKey → notificationId` with TTL is fast-path.
- **Per-user ordering:** Kafka partition key = `userId` so prefs checks and digest windows are ordered per user.
- **Digest:** Tumbling window per `(userId, groupingKey)` — buffer in [Redis](/system-design/redis) or Kafka Streams state store; flush when `count ≥ threshold` or `window elapsed` → render single collapsed notification.
- **Quiet hours:** if `now in quietHours && priority != transactional`, compute `nextSendAt = tomorrow quietEnd` and re-enqueue to scheduler.
- **Retry:** exponential backoff `2^n * base` with jitter, max 5 for email/push, max 2 for SMS (cost). DLQ after max.

**Design patterns:** Outbox pattern, Strategy (per-channel sender), Template Method (ChannelWorker), Circuit Breaker per provider, Idempotent Receiver.

## Deep dive — Idempotency and storms

**Idempotency done right:** Caller retries (timeout, 5xx) with same `idempotencyKey` must not double-send. The ingest does `INSERT ... ON CONFLICT (caller_service, idempotencyKey) DO NOTHING RETURNING id`; on conflict fetch existing row and return same `notificationId`. Workers also deduplicate on `(notificationId, channel)` — if worker crashes after calling SES but before marking `sent`, the retry will see existing `provider_msg_id` and skip second send. Provider webhooks carry `providerEventId` with unique constraint to drop duplicates.

**Fan-out storms:** A celebrity post notifying 10M followers cannot be `for (user : followers) await fcm.send()`. Instead: product service writes one `post_created` event; a **fan-out service** chunks follower IDs (e.g., 1k per Kafka message) and enqueues chunk messages. Each chunk is processed by orchestrator workers that respect per-user prefs and push token lookup (batched, cached). Add **sampling/priority** — low-priority "someone liked" push is dropped or digested if user's push budget exceeded; **email** for the same event is always async with hourly batch. Use partitioned topics so hot users don't block transactional OTP lanes (separate topic `notifications.transactional` vs `notifications.bulk`).

**Digest deep dive:** Naive "one notification per like" destroys attention. Implement grouping: `groupingKey = like:postId:recipientId`. Orchestrator writes to [Redis](/system-design/redis) `HINCRBY digest:recipientId:groupingKey count 1` and `EXPIRE window 30m`. First event schedules a timer (via scheduler). On timer fire, read count, render template "Alice, Bob and 48 others liked your post" with latest 2 names fetched from DB, emit one per-channel notification and delete window key. Guarantees at most one push per window per group.

## Deep dive — Per-channel reliability and cost control

Each channel has different failure semantics. **Email (SES):** bounces/complaints must suppress future sends — maintain a `suppression_list` (email → reason) checked pre-send. **Push (FCM/APNS):** invalid tokens must be pruned — on `InvalidRegistration` delete token row, don't retry. **SMS (Twilio):** every retry costs money — cap `attempt_count ≤ 2`, alert on DLQ, and never retry `InvalidNumber` or `OptedOut`. Implement **per-provider circuit breaker** (half-open probe every 30s) so SES throttling doesn't cascade to push queue. Workers use **bulk provider APIs** where available (FCM multicast 500/batch, SES bulk templated) to reduce QPS to external systems.

## Handling failures and scale

- **Sharding:** Kafka partitions by `userId` hash (e.g., 64 partitions); consumers scale horizontally. Postgres sharded by `userId` for `notifications` and `inbox_items` if single-DB pressure hits; or move inbox to Cassandra.
- **Caching:** Prefs + push tokens in [Redis](/system-design/redis) with write-through; template renders cached by `(templateId, version, locale)` (immutable). Badge counts in Redis with nightly reconciliation job that `SELECT COUNT(*) WHERE is_read=false` and corrects drift.
- **Replication:** Postgres primary-replica; reads for inbox/status from replica, writes to primary. Kafka replication factor 3, min ISR 2.
- **Failure modes:**
  - *Orchestrator down:* Kafka retains messages; no loss, just delay (monitor consumer lag).
  - *Provider down:* exponential backoff + DLQ; transactional queue retries aggressively, bulk backs off longer.
  - *Duplicate webhook:* unique `provider_event_id` drops it.
  - *Redis down:* fallback to DB for prefs (slower but correct); badge count degrades to DB count.
  - *Hot topic:* separate topics per priority isolate OTP from marketing floods.
- **Probes:** alert on consumer lag > 10k, DLQ growth, SES bounce rate > 5%, push invalid token spike, SMS spend anomaly.

## Extra probes / Interview follow-ups

1. **Priority lanes:** How do you guarantee OTP never waits behind a 20M marketing blast? Separate topics, dedicated worker pools, and weighted fair queuing at orchestrator.
2. **Exactly-once vs at-least-once:** Why not exactly-once end-to-end? Providers are at-least-once; we make effect idempotent instead. Walk through the double-send window after provider call timeout.
3. **Template versioning:** Deploy `order_shipped_v2` without breaking in-flight `v1` renders — pin `template_version` at enqueue time.
4. **Unsubscribe before send race:** PUT prefs after enqueue but before worker send — worker must re-check prefs after dequeue (double-check pattern).
5. **Scheduling at scale:** How to handle 1M `sendAt` in future? Sorted set in [Redis](/system-design/redis) (ZSET score=timestamp) polled by scheduler or DB table with `WHERE send_at <= now()` indexed scan every second + [job scheduler](/system-design/job-scheduler).
6. **Cross-region:** Providers are global; do you need multi-region Kafka? Mention but keep single region for 45-min interview.

**Phrase:** "The product API only enqueues. I respect prefs, send per channel with an idempotency key, and collapse bursts into digests. Providers are workers, not the request path."
