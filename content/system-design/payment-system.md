# Payment System

> Charges, refunds, a **ledger**. Idempotency and webhooks. You wrap Stripe/Adyen; you still need an internal source of truth.

> Double-entry ledger, idempotent charges via idempotency keys, sagas for multi-step flows, webhook retries — never double-spend.

## What they ask

**Scenario:** Checkout — authorize, capture, refund; survive double-clicks and delayed processor callbacks; Stripe behind the scenes, internal ledger.

**Tests:** Idempotency end-to-end (retry, webhook-before-response)? Append-only double-entry, partial capture/refund? Processor timeouts + at-least-once webhooks? PCI — token only, no PAN on your servers?

**Scale:** 1M orders/day, ~$50 ticket; checkout ~60 QPS typical, ~5k Black Friday; ~2.5M ledger rows/day; webhooks often 1–5s late.

## Requirements

**Functional (≤6):** Authorize, capture (full/partial), refund (full/partial); get/list payments; inbound processor webhooks + outbound product events; idempotent creates; tokenized methods + 3DS flow.

**Non-functional:** Zero double charge; durable auditable ledger; P99 authorize < 800ms (processor-bound); webhook verify + idempotent apply.

**Clarify (≤4):** Auth+capture vs auto-capture? Multi-currency? Marketplace payouts separate? Refund SLA?

**Out of scope (v1):** Own card rails; ML fraud; merchant settlement payouts; subscription dunning.

## Scale estimation

| Parameter | Result |
|-----------|--------|
| Checkout QPS | ~60 typical, ~5k BF burst |
| Stripe calls | ~1–2 per order |
| Ledger rows | ~2.5M/day — small bytes, **sync replication** |
| Webhook ingress | ~23 QPS avg — fast HMAC + enqueue |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/payments` | Create (Idempotency-Key header) |
| `POST` | `/v1/payments/{id}/capture` | Full/partial capture |
| `POST` | `/v1/payments/{id}/refunds` | Refund (own idempotency key) |
| `GET` | `/v1/payments/{id}` | Status + refundable amount |
| `POST` | `/v1/webhooks/stripe` | Signed inbound → 200 + queue |

```json
POST /v1/payments
Idempotency-Key: uuid
{ "amount": 5000, "currency": "USD", "method": { "token": "pm_abc" }, "capture": false, "orderId": "ord_789" }
→ 201 { "paymentId", "status": "authorized" }
```

## High-Level Design (HLD)

![Payment system: payment svc, ledger, processor, webhooks](/images/hld/payment-system-architecture.svg)

```
App ── Stripe.js (pm_xxx) ──► Gateway ──► Payment Service
                              │              ├─ Postgres: payments + ledger + idempotency
                              │              └─ outbox → Kafka → Orders, notifications
                              ▼
                         Processor Adapter ──► Stripe/Adyen
                              ▲
                         Webhook Handler (dedup event_id)
Nightly reconciliation: internal captured vs processor report
```

**Happy path:** Unique `idempotency_key` + provider idempotency on `paymentId` → auth → ledger hold → capture → `PaymentCaptured` event. Webhook may arrive before HTTP response — consumer dedups and monotonic state machine.

## Deep dive

**Ledger:** Append-only debit/credit pairs per movement; `payments.capturedAmount` derived, not edited in place. Partial capture/refund = new rows with amount guards + `FOR UPDATE` on payment row.

**Races:** On Stripe timeout, **retrieve-before-retry**. `processor_events.event_id` PK drops duplicate webhooks. Outbox ties DB commit to product events. Active-passive or single-region primary for ledger writes.

## Failures and scale

- Partition webhooks by `paymentId` for ordered per-payment processing.
- Idempotency: Redis fast-path + DB unique constraint as truth.
- Sync commit on money tables; replicas OK for dashboards only.
- Reject raw PAN/CVV at gateway; circuit breaker on processor 5xx.
- Alert on capture rate, webhook lag, reconciliation mismatch.
- Related: [idempotency](/hld/api-design), [distributed systems](/hld/distributed-systems).

**Phrase:** Tokenize cards, ledger in Postgres, idempotency keys, and webhook handlers that can run twice. The processor is a flaky colleague — reconcile, don't trust one HTTP timeout.

**Remember:** Two-layer idempotency (your DB + processor key); retrieve before retry; nightly reconciliation catches drift; inventory fulfillment listens to events, not inline Stripe calls.
