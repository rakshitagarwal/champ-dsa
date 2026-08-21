# Payment System

> Charges, refunds, a **ledger**. Idempotency and webhooks. You wrap Stripe/Adyen; you still need an internal source of truth.

## What they ask

Checkout: reserve money, capture, refund, handle double-clicks and delayed processor callbacks.

## Requirements

**Functional:** authorize, capture, refund, list payments, webhooks to the product.

**Non-functional:** **no double charge**, durable ledger, PCI scope as small as possible (tokenize cards).

## API

1. `POST /payments` `{ amount, currency, method, idempotencyKey }`
2. `POST /payments/{id}/capture`
3. `POST /payments/{id}/refunds`
4. `POST /webhooks/stripe` (inbound, signed)

## Design

**Tokenize** at the edge (Stripe.js) — your servers never see PAN.

**Payment row** + **ledger entries** in Postgres. States: `created → authorized → captured | failed | refunded`.

**Idempotency key** unique. Same key returns the same payment id.

**Talk to processor:** outbound call with your `paymentId`. On timeout, **don't retry blindly** — retrieve-by-idempotency at Stripe, then reconcile.

**Webhooks:** verify signature, enqueue, handler is idempotent on `event.id`. Webhook may arrive **before** your HTTP response. Design for that.

**Product** (orders, tickets) listens to `PaymentCaptured` on [Kafka](/system-design/kafka). Don't put inventory release inside the Stripe client.

## Deep dive — the ledger

Every money movement is an append-only journal: debit/credit accounts (platform cash, user balance, processor clearing). Sums must balance. Refunds are new entries, not edits.

**At-least-once webhooks** + unique `processor_event_id`.

**Partial capture / partial refund** — remaining amounts on the payment row.

**Reconciliation job:** nightly compare internal captured vs processor reports. This is what seniors mention.

## Extra probes

1. SCA / 3DS — redirect, then webhook
2. Payouts to sellers (marketplace) — separate state machine
3. [Robinhood](/system-design/robinhood) deposits are slow ACH — different rails, same ledger idea

**Phrase:** "Tokenize cards, ledger in Postgres, idempotency keys, and webhook handlers that can run twice. The processor is a flaky colleague — I reconcile, I don't trust a single HTTP timeout."
