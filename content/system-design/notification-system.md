# Notification System

> Fan-out "tell the user" across **push, email, SMS, in-app**. Preferences and retries matter more than picking Twilio.

## What they ask

Other services call `notify(userId, template, data)`. You deliver on the right channels without spamming or double-sending.

## Requirements

**Functional:** send, per-channel prefs, templates, unsubscribe, status.

**Non-functional:** at-least-once with idempotency, backlog under Super Bowl spikes, don't block the caller.

## API

1. `POST /notifications` `{ userId, templateId, data, idempotencyKey }`
2. `GET /users/{id}/preferences`
3. `PUT /users/{id}/preferences` `{ email: false, push: true }`

## Design

**Ingest:** API writes a notification row (`queued`) and publishes to [Kafka](/system-design/kafka) (or SQS). Return 202.

**Orchestrator:** load user prefs + quiet hours + locale. Skip disabled channels. Render template (don't trust raw HTML from callers).

**Per-channel queues:** email workers (SES), push (FCM/APNS), SMS (Twilio). Different rates and failures.

**Status:** `accepted → sent → failed`. Provider webhooks update the row.

**In-app inbox:** write to a user feed store; badge count in Redis.

## Deep dive — idempotency and storms

Caller retries → same `idempotencyKey` → one send. Unique constraint.

**Fan-out storms:** a viral post notifying 10M followers. Don't call FCM in a loop in the post API. Chunk Kafka by `userId` shard; **sample** or skip push for low-priority; email definitely async.

**Digest:** collapse 50 likes into one "you have 50 likes" (window + grouping key).

**Unsubscribe / GDPR:** honor before send, not after.

**Provider down:** retry with backoff, DLQ, don't infinite-loop SMS (money).

## Extra probes

1. Priority: OTP vs marketing — separate queues and sending domains
2. Template versioning
3. See also chat receipts on [WhatsApp](/system-design/whatsapp)

**Phrase:** "The product API only enqueues. I respect prefs, send per channel with an idempotency key, and collapse bursts into digests. Providers are workers, not the request path."
