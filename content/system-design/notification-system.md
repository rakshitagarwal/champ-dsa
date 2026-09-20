# Notification System

> Fan-out "tell the user" across **push, email, SMS, in-app**. Preferences and retries matter more than picking Twilio.

> Ingest returns 202; filter prefs before render; separate Kafka topics per channel; idempotency key + digest windows at 10M fan-out.

## What they ask

**Scenario:** Internal platform: `notify(user, template, channels)` for push, email, SMS, in-app — 100M users, marketing bursts, OTPs without double-send.

**What the interviewer really tests:**
- **Decouple** callers from FCM/SES/Twilio latency (enqueue, 202).
- **Prefs, quiet hours, caps** checked before provider calls.
- **Idempotency and storms** — viral event to 10M followers without melt or spam.
- **Status trace** — "did user X get notification Y?"

**Example scale:** 50M MAU × 5/day ≈ 250M/day (~580 QPS avg); marketing 20M in 10 min (~33k enqueue/s); OTP spikes ~5k QPS.

## Requirements

**Functional:**
- `notify(userId, templateId, data, channels)` — transactional + bulk.
- Per-user prefs, templates (i18n), unsubscribe/GDPR delete.
- In-app inbox + badge; status `queued → sent → delivered/failed`.
- Digest/collapse (e.g. 50 likes → one line); optional `sendAt`.

**Non-functional:**
- Exactly-once **effect** per `idempotencyKey` (at-least-once transport).
- P99 enqueue < 100ms; survive 10× bursts; transactional priority lanes.
- SMS retries capped (cost).

**Clarify:** Channels in v1? Max fan-out per event? OTP SLA vs marketing? Per-device push tokens?

**Out of scope (v1):** Own email/push provider, ML send-time, full campaign A/B.

## Scale estimation

| Metric | Result |
|--------|--------|
| Steady | ~580 QPS enqueue |
| Burst | ~33k QPS (queue only) |
| Metadata | ~2.5 KB/row → ~125 GB/day |
| 10M fan-out | Chunk follower IDs (1k/msg) — never inline loop |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/notifications` | Enqueue (202) |
| `GET/PUT` | `/v1/users/{id}/preferences` | Prefs + quiet hours |
| `GET` | `/v1/notifications/{id}` | Status trace |
| `POST` | `/v1/webhooks/provider` | SES/FCM/Twilio (signed) |
| `GET` | `/v1/users/{id}/inbox` | In-app feed |

**Enqueue:** `Idempotency-Key` + `{ userId, templateId, data, priority, groupingKey?, dedupeWindowSec? }` → `{ notificationId, status: "queued" }`.

## High-Level Design (HLD)

![Notification architecture: API, Kafka, channel workers, providers](/images/hld/notification-system-architecture.svg)

- **Notification API:** idempotency DB constraint → row `queued` → transactional outbox → [Kafka](/hld/message-queue) `notification.requested` (partition `userId`) → **202**.
- **Scheduler:** `sendAt`, quiet hours → delayed queue ([job scheduler](/hld/job-scheduler)).
- **Orchestrator:** load prefs → skip disabled → render template → per-channel topics (`email`, `push`, `sms`, `inapp`).
- **Workers:** provider adapters, retry + DLQ; separate pools for `transactional` vs `bulk`.
- **Webhooks:** HMAC verify, dedupe `providerEventId`; update channel status.
- **Inbox:** DB/Cassandra items; badge [Redis](/hld/caching-strategies) INCR.

**Read:** inbox from DB; badge Redis with nightly reconcile.

**Quiet hours:** if `now` in window and `priority != transactional`, scheduler re-enqueues at `quietEnd` in user TZ.

**Template versioning:** pin `template_version` at enqueue so in-flight renders stay stable after deploy.

## Deep dive — idempotency and storms

`UNIQUE(caller_service, idempotencyKey)` on ingest; workers dedupe `(notificationId, channel)`. Celebrity fan-out: chunk to Kafka; orchestrator respects prefs per user. **Digest:** Redis window per `(userId, groupingKey)` — flush one collapsed template when timer fires or count threshold.

## Deep dive — per-channel reliability

Email: bounce/complaint → suppression list. Push: drop invalid FCM tokens. SMS: max 2 attempts, no retry on opt-out. Separate **circuit breaker** per provider; worker re-checks prefs after dequeue (race with PUT prefs).

## Failures and scale

- Partition Kafka by `userId`; scale consumers horizontally.
- Prefs/tokens in Redis; fallback to Postgres if Redis down.
- Separate topics: OTP never behind 20M marketing blast.
- Orchestrator down: Kafka retains; provider down: backoff + DLQ.
- Duplicate webhooks dropped by unique provider event id.
- Shard notifications/inbox by `userId` if Postgres pressure.
- Waitlist-style offer on hold expiry is product-specific — same platform, different template.
- GDPR delete: honor on next orchestrator pass before any provider call.

**Phrase:** The product API only enqueues. I respect prefs, send per channel with an idempotency key, and collapse bursts into digests. Providers are workers, not the request path.

**Remember:** 202 + outbox → prefs before render → chunked fan-out → transactional topic isolated from bulk.
