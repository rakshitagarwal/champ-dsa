# Payment System

> Charges, refunds, a **ledger**. Idempotency and webhooks. You wrap Stripe/Adyen; you still need an internal source of truth.

## What they ask

Interviewer: *"Design the payment service for checkout — reserve money, capture, refund, handle double-clicks and delayed processor callbacks. We use Stripe behind the scenes but need our own ledger."*

What they really test:
- **Idempotency end-to-end:** Double-click, retry after timeout, webhook arriving before HTTP response — do you charge exactly once?
- **Ledger correctness:** Append-only double-entry, partial captures/refunds, reconciliation — not just a `payments.amount` field.
- **Processor as flaky dependency:** Timeouts, at-least-once webhooks, signature verification, and the retrieve-before-retry discipline.
- **PCI scope:** Do you tokenize at the edge so your servers never see PAN?

Example scale: 1M orders/day, $50 avg ticket, 2% refunds, 10k checkout QPS peak (Black Friday 50k). Ledger: 3 entries per payment (authorize/capture/refund) → 3M entries/day. Processor webhook 1-5s late, sometimes hours.

## Requirements

**Functional:**
- **Authorize** (hold) — reserve amount on card/wallet without capturing.
- **Capture** — full or partial capture of authorized amount; auto-capture for simple checkout.
- **Refund** — full or partial refund against a captured payment; multiple refunds until remaining.
- **List/get** payments with status and remaining refundable amount.
- **Webhooks inbound** from processor (Stripe/Adyen) — `authorized`, `captured`, `failed`, `refunded`, `disputed` — and **outbound webhooks** to product (orders, [notification system](/system-design/notification-system)).
- **Idempotent creates** via `idempotencyKey` — same key returns same payment, no second charge.
- Payment methods: cards (tokenized), wallets, saved tokens; 3DS/SCA redirect flow.

**Non-functional:**
- **No double charge** — invariant even under retries and webhook duplication.
- Durable ledger — append-only, auditable, reconcilable with processor reports.
- **PCI minimal**: PAN never touches your servers (Stripe.js / hosted fields → token `pm_xxx`).
- P99 authorize latency < 800ms (processor dominates), your DB part < 50ms.
- At-least-once webhook handling with idempotent receiver.

**Clarify:**
- Auth+capture vs capture-only? (Authorize to support inventory hold, else auto-capture)
- Currencies — single or multi? (FX deferred)
- Marketplace payouts to sellers — same ledger or separate? (Usually separate state machine)
- Subscription/recurring vs one-off? (Recurring adds scheduler)
- Required SLA for refund — instant vs 5-10 days via rails?

**Out of scope (v1):**
- Building card network rails — we call Stripe/Adyen.
- Fraud engine — placeholder risk check, defer ML.
- Payouts/settlement to merchants — mention but separate flow.
- Full dunning/retry for failed subscriptions — v2.

## Scale estimation

| Parameter | Assumption | Math | Result |
|---|---|---|---|
| Checkout QPS | 1M orders/day, peak 5×, 70% pay by card | 1M/86400 ≈ 12 avg, peak ~60, BF 500 | **~60 QPS typical, 5k QPS BF burst** |
| Processor calls | 1 auth + 1 capture or 1 combined | 1-2 per order | **120 QPS typical to Stripe** |
| Ledger entries | 2-3 per payment (auth, capture, maybe refund) | 1M × 2.5 | **2.5M rows/day**, 75M/month |
| Storage | payment row 500B, ledger 200B, webhook 1KB | 2.5M × 300B + webhooks | **~750MB/day ledger**, ~1GB/day total — small, but *critical* (sync replication) |
| Webhook ingress | 1-2 events per payment + retries | 2M events/day | **~23 QPS** avg to `/webhooks/stripe` — must verify HMAC fast |
| Refunds | 2% of captures, 30% partial | 20k/day | Adds rows, not hot path |

Money tables are tiny in bytes but huge in correctness need — keep them on provisioned IOPS Postgres, not on cheap object store.

## API Design

```http
POST /v1/payments
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
{
  "amount": 5000,                 // cents / minor units
  "currency": "USD",
  "method": { "token": "pm_abc123" }, // from Stripe.js, never raw PAN
  "capture": false,               // false = auth only, true = auth+cap
  "idempotencyKey": "550e8400-...",
  "orderId": "ord_789",
  "metadata": { "userId":"u_123" }
}
→ 201 { "paymentId":"pay_1", "status":"authorized", "authorizedAmount":5000, "capturableAmount":5000 }
→ 409 { "error":"idempotent_replay", "paymentId":"pay_1" } // same key, return existing

POST /v1/payments/{paymentId}/capture
{ "amount": 5000 }               // partial allowed ≤ capturable
→ 200 { "paymentId":"pay_1", "status":"captured", "capturedAmount":5000 }

POST /v1/payments/{paymentId}/refunds
Idempotency-Key: refund_key_1
{ "amount": 2000, "reason":"customer_request", "idempotencyKey":"refund_key_1" }
→ 201 { "refundId":"ref_1", "status":"pending", "amount":2000 }

GET /v1/payments/{paymentId}
→ 200 { "paymentId":"pay_1","status":"captured","amount":5000,"capturedAmount":5000,"refundableAmount":3000,
        "method":{"brand":"visa","last4":"4242"},"createdAt":"..." }

GET /v1/payments?orderId=ord_789&limit=20

POST /v1/webhooks/stripe          // inbound, signed
Header: Stripe-Signature: t=...,v1=...
{ "id":"evt_123", "type":"payment_intent.succeeded", "data":{"object":{"id":"pi_123", "amount":5000}} }
→ 200 OK  // must be fast, enqueue

POST /v1/webhooks/adyen           // same pattern, different signing

// Outbound to product — you emit, not receive
POST https://orders.internal/events  (you → orders)
{ "event":"PaymentCaptured", "paymentId":"pay_1", "orderId":"ord_789", "amount":5000 }
```

**Idempotency contract:** Client sends `Idempotency-Key` header; server enforces `UNIQUE(accountId?, idempotencyKey)` or global per service. Replay within 24h returns same `paymentId` with 200/201, not a new row. Refunds have their own idempotency key.

## High-Level Design (HLD)

```
[Browser/App] ── Stripe.js (tokenize PAN → pm_xxx) ──▶ [API Gateway + Auth] ──▶ [Payment Service]
                                                          │    ▲                      │
                                                          │    │  POST /payments      │  PCI scope: token only
                                                          │    │  (idempotency)       ▼
                                                          │    │               [Postgres]  payments + ledger + idempotency
                                                          │    │                    │  (sync replica, append-only)
                                                          │    │                    │  outbox → [Kafka]
                                                          │    │               ┌────▼─────┐
                                                          │    │               │  [Kafka] │ topics: payment.events, ledger.events
                                                          │    │               └────┬─────┘
                                                          │    │                    │
                                                          │    │         ┌──────────┼──────────┐
                                                          │    │         ▼          ▼          ▼
                                                          │    │   [Order Svc] [Notification] [Reconciliation Job]
                                                          │    │
                                                          │  [Stripe/Adyen] ◀── Processor Adapter (with idempotency + retrieve-before-retry)
                                                          │         │
                                                          │         │ webhook (at-least-once, signed)
                                                          │         ▼
                                                          │   [Webhook Handler] ── idempotent on event.id ──▶ Payment Service state update
                                                          │
                                                          └──── SCA/3DS redirect (if required) ──▶ completes via webhook

[Reconciliation Job] nightly: compare internal captured vs processor reports (CSV/SFTP) → alert on mismatch
```

**Component roles:**
- **Payment Service (API):** validates amount/currency, checks idempotency (`SELECT` on `idempotency_keys`), inserts `payments` row `created → authorized` inside transaction with ledger entry, publishes outbox event to [Kafka](/system-design/kafka) for product, returns to caller. Owns state machine.
- **Processor Adapter:** wraps Stripe/Adyen SDK. On `authorize`, calls `POST /payment_intents` with `idempotency_key=paymentId` (provider-level idempotency) and `amount`. On timeout, **does not blindly retry** — does `GET /payment_intents?clientKey` to check if already created, then reconciles. Handles 3DS redirect by returning `next_action` to client.
- **Webhook Handler:** verifies HMAC (`Stripe-Signature` / Adyen HMAC), enqueues raw event to [Kafka](/system-design/kafka) (`webhook.raw`), returns 200 immediately. Consumer deduplicates on `processor_event_id` (unique constraint) and applies state transition idempotently.
- **Postgres (ledger):** source of truth. All money moves are ledger entries; `payments` row holds derived aggregates (`authorizedAmount`, `capturedAmount`, `refundableAmount`) recomputed from ledger.
- **[Kafka](/system-design/kafka):** decouples product (orders shouldn’t block on Stripe latency) — product listens to `PaymentCaptured` to release inventory. Don't put inventory mutation inside Stripe client.

**Data flow — happy path (auth + capture):**
1. Frontend tokenizes card → `pm_abc`; calls `POST /payments {amount:5000, capture:false, idempotencyKey: k1}`.
2. Payment Service `INSERT payment(k1) + ledger(HOLD 5000)` in tx (unique constraint guards double-click) → call Processor Adapter `auth 5000` with provider idempotency `pay_1` → Stripe returns `authorized` → update `payments.status=authorized`.
3. Later `POST /payments/pay_1/capture {5000}` → Adapter `capture` → Stripe `captured` → insert ledger `captured 5000` → publish `PaymentCaptured` → Orders service fulfills.
4. Webhook `payment_intent.succeeded` arrives (maybe before step 3's response) → handler dedups and confirms state (no double ledger entry).

**Data flow — webhook-before-response race:** Stripe webhook may hit your handler before `POST /payments` got Stripe's 200. Handler inserts pending event, consumer sees `paymentId` not yet `authorized` → either buffers or upserts idempotently. Design assumes webhooks can reorder — handler is idempotent and state transitions are monotonic.

## Low-Level Design (LLD)

**Database schema (Postgres):**

```sql
CREATE TABLE payments (
  id                TEXT PRIMARY KEY, -- pay_xxx
  idempotency_key   TEXT NOT NULL,
  order_id          TEXT NOT NULL,
  amount            BIGINT NOT NULL, -- minor units
  currency          TEXT NOT NULL,
  status            TEXT NOT NULL CHECK (status IN ('created','authorized','capturing','captured','failed','refunded','partially_refunded')),
  authorized_amount BIGINT NOT NULL DEFAULT 0,
  captured_amount   BIGINT NOT NULL DEFAULT 0,
  refunded_amount   BIGINT NOT NULL DEFAULT 0,
  method_token      TEXT NOT NULL, -- pm_xxx, never PAN
  processor         TEXT NOT NULL, -- stripe | adyen
  processor_id      TEXT, -- pi_xxx
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (idempotency_key) -- or (order_id, idempotency_key) per caller
);
CREATE INDEX ON payments (order_id);
CREATE INDEX ON payments (processor_id);
CREATE INDEX ON payments (status);

CREATE TABLE refunds (
  id                TEXT PRIMARY KEY, -- ref_xxx
  payment_id        TEXT NOT NULL REFERENCES payments(id),
  idempotency_key   TEXT NOT NULL UNIQUE,
  amount            BIGINT NOT NULL,
  status            TEXT NOT NULL CHECK (status IN ('pending','succeeded','failed')),
  processor_refund_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON refunds (payment_id);

-- Append-only double-entry ledger
CREATE TABLE ledger_entries (
  id              BIGSERIAL PRIMARY KEY,
  payment_id      TEXT NOT NULL REFERENCES payments(id),
  account         TEXT NOT NULL, -- platform_cash | processor_clearing | user_balance | fee | refund_liability
  dc              TEXT NOT NULL CHECK (dc IN ('debit','credit')),
  amount          BIGINT NOT NULL,
  currency        TEXT NOT NULL,
  entry_type      TEXT NOT NULL, -- authorize_hold | capture | refund | fee
  processor_event_id TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON ledger_entries (payment_id, created_at);
-- invariant: SUM(debits) == SUM(credits) per payment_id

CREATE TABLE processor_events (
  event_id        TEXT PRIMARY KEY, -- evt_123 from Stripe
  payment_id      TEXT REFERENCES payments(id),
  type            TEXT NOT NULL,
  payload         JSONB NOT NULL,
  processed_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE outbox (
  id              BIGSERIAL PRIMARY KEY,
  aggregate_id    TEXT NOT NULL,
  event_type      TEXT NOT NULL,
  payload         JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  published       BOOLEAN DEFAULT false
);
```

**Key classes:**

```text
PaymentController       — POST /payments: validate, check idempotency, delegate to PaymentService
PaymentService          — @Transactional create(): insert payment + ledger hold + outbox; call ProcessorAdapter
ProcessorAdapter        — authorize(), capture(), refund(), retrieveByIdempotency() — handles timeout→retrieve discipline
WebhookController       — verifySignature(rawBody, header), enqueue to Kafka, return 200
WebhookConsumer         — dedup on processor_events.event_id, apply StateMachine transition, insert ledger if needed
LedgerService           — append(entry): insert ledger row, update payments derived amounts, enforce sum(debit)==sum(credit)
StateMachine            — allowed: created→authorized→capturing→captured→partially_refunded→refunded; guards amount checks
ReconciliationJob       — nightly: fetch Stripe balance report, compare SUM(captured) vs report, emit mismatch alert
IdempotencyStore        — SETNX idempotencyKey→paymentId in Redis + DB unique constraint as truth
```

**Important algorithms / concurrency:**
- **Double-click safety:** `INSERT payments ... ON CONFLICT (idempotency_key) DO NOTHING` — second POST returns existing row without calling Stripe twice. Adapter also uses provider idempotency `paymentId` so even if two app hosts race to call Stripe, Stripe dedups.
- **Retrieve-before-retry:** On `TimeoutException` from Stripe, do `GET /payment_intents?client_reference=pay_1` before retry. If found, reconcile local state to processor state instead of creating second intent.
- **Partial capture math:** `capturableRemaining = authorizedAmount - capturedAmount`; reject capture if `amount > capturableRemaining`. Refundable = `capturedAmount - refundedAmount`; sum of refunds must not exceed.
- **Per-payment serialization:** `SELECT ... FOR UPDATE` on `payments` row for capture/refund to prevent concurrent partial captures overshooting. Or serialize per `paymentId` via [Kafka](/system-design/kafka) partition.
- **Webhook idempotency:** `INSERT processor_events(event_id) ON CONFLICT DO NOTHING` — second delivery of same `evt_123` is no-op, even if handling is retried.

**Design patterns:** Transactional Outbox, Idempotent Receiver, State Machine, Double-Entry Ledger, Circuit Breaker on processor client, Saga (payment → order fulfillment via Kafka).

## Deep dive — The ledger (why append-only matters)

Every money movement is two rows that sum to zero: e.g., authorize hold `debit: user_authorization_hold 5000 / credit: processor_pending 5000` (or platform-specific accounts). Capture converts: `debit: processor_clearing 5000 / credit: platform_cash 5000` and releases hold. Refund is *new* rows `debit: platform_cash 2000 / credit: user_balance 2000`, never an `UPDATE amount=...` edit. This gives you auditability (who moved what when), easy reconciliation (sum per `processor_event_id` must match report), and safe retries (replaying a refund with same idempotency key sees existing ledger rows and skips). Partial operations are just smaller amounts on new rows — `payments.capturedAmount` is a derived sum, not the source of truth.

## Deep dive — Webhook and idempotency races

The nastiest bug: user clicks Pay, Stripe charges, but your `POST /payments` times out. User clicks again with same `idempotencyKey` — without guard you call Stripe twice. The fix is two-layer: (1) your DB unique constraint prevents second `payments` row; (2) before calling Stripe, you set provider idempotency to `paymentId` so Stripe itself dedups. The mirror race: webhook arrives before your HTTP response commits — handler must not `UPDATE payments SET status='captured'` on a row still `created` in a not-yet-committed tx. Solve by making handler **enqueue + dedup** and let a consumer apply transition when the row exists; or use `INSERT ... ON CONFLICT` for events and a reconciler that heals `authorized` vs `captured` divergence nightly. Mention the nightly reconciliation job — seniors always ask: *"How do you know you didn't double-charge someone Stripe thinks succeeded but you marked failed?"* Answer: nightly `SELECT SUM(captured) WHERE date=?` vs Stripe report, alert mismatch, manual or auto-refund path.

## Handling failures and scale

- **Sharding:** Payments partitioned by `orderId` or `paymentId` hash; ledger range-partitioned by `created_at` (monthly). Webhook topic partitioned by `paymentId` for ordered per-payment processing.
- **Caching:** Payment `GET` cached 5s in [Redis](/system-design/redis), invalidated on capture/refund. No caching of ledger — always read from DB. Idempotency keys cached in [Redis](/system-design/redis) `SETNX` with 24h TTL as fast-path, DB as truth.
- **Replication:** Postgres synchronous commit for `payments`/`ledger` (durability > latency). Read replicas for list queries. [Kafka](/system-design/kafka) RF=3, min ISR 2.
- **Failure modes:**
  - *Processor timeout:* retrieve-before-retry, don't double-charge.
  - *Duplicate webhook (at-least-once):* `processor_events.event_id` PK drops duplicate; state machine guards illegal transitions.
  - *App crash after Stripe success before DB commit:* transactional outbox ensures payment row + outbox commit together; Stripe idempotency key lets you reconcile on retry — you won't orphan a charge without a row.
  - *Refund overshoot:* `CHECK (refundedAmount <= capturedAmount)` in app + DB constraint.
  - *PCI leak:* reject any request containing `cardNumber`/`cvv` at API gateway — log and alert.
- **Probes:** alert on `capture success rate < 99.5%`, webhook processing lag, reconciliation mismatch count, idempotency conflict rate spike, and `processor 5xx` circuit breaker open.

## Extra probes / Interview follow-ups

1. **SCA/3DS:** `POST /payments` returns `status=requires_action, nextActionUrl=https://.../3ds`; user completes 3DS, processor webhooks `succeeded` — your handler completes capture.
2. **Marketplace payouts:** Separate flow `payouts` table `pending → paid → failed` with its own ledger accounts (`platform_cash → seller_payable`); don't reuse refund state machine.
3. **Saved cards / network tokens:** Store `pm_xxx` per user, allow `POST /payments { savedMethodId }` with re-auth of CVV — still tokenized.
4. **Disputes/chargebacks:** Webhook `charge.dispute.created` creates `disputes` row and withholds seller payout; manual review queue.
5. **Rate limiter:** Per-user and per-card fingerprint limits to block card testing (10 attempts/min) via [rate limiter](/system-design/rate-limiter).
6. **Related:** [Robinhood](/system-design/robinhood) ACH deposits are async T+1 days but reuse same ledger+reconciliation pattern.

**Phrase:** "Tokenize cards, ledger in Postgres, idempotency keys, and webhook handlers that can run twice. The processor is a flaky colleague — I reconcile, I don't trust a single HTTP timeout."
