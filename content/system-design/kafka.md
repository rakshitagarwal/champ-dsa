# Kafka

> A **durable, ordered log**. Producers append. Consumers read at their own pace. Many consumer groups can replay the same events.

Think of Kafka as a commit log split into **topics** and **partitions**. Each partition is an ordered sequence of bytes. A consumer tracks an **offset**. That is why Kafka is the default answer for "we must not lose this event, and three teams want to read it."

## Queue vs log vs pub/sub

**Work queue (SQS / Rabbit).** One message, one worker. Good for "resize this image." Retry + DLQ are first-class.

**Kafka log.** Same event can feed notifications, search index, analytics, and a cache warmer. Order is **per partition**, not global.

**Pub/sub (Redis / SNS).** Broadcast. Often fire-and-forget. Fine for "reload config"; not for billing.

If the interviewer says "queue", ask: *one consumer or many independent consumers? Need replay?*

## When you pick Kafka

1. Fan-out after a write (tweet → feed, search, notifications)
2. Buffer spikes (uploads, clicks, GPS points)
3. Event sourcing / audit for payments (with a real ledger still)
4. Feed [Flink](/system-design/flink) for windows and Top-K

Skip Kafka for a 100 QPS CRUD app. Postgres + a table of jobs is simpler.

## Partitioning (the interview part)

Key = `userId` or `chatId` so that one user's events stay ordered on one partition. Bad key (null / random) → no order. Hot key (celebrity) → one fat partition. Mitigate by sharding the celebrity (`userId + bucket`).

**Consumer groups.** Each group gets every message (logically). Inside a group, partitions are split across members. Scale consumers ≈ scale partitions.

## Delivery guarantees

1. **At-most-once** — don't retry; can lose
2. **At-least-once** — retry; **idempotent consumers** (unique event id)
3. **Exactly-once** — Kafka transactions + idempotent producer; expensive; say "effectively once at the business layer"

**Outbox:** write DB row + outbox row in one transaction; a publisher ships to Kafka. Avoids "DB succeeded, Kafka failed."

## Failure modes

1. **Consumer lag** — alert on it; scale consumers or slow producers
2. **Poison message** — skip + DLQ topic, don't block the partition
3. **Retention** — logs delete after N days unless compacted
4. **ZooKeeper / KRaft** — old clusters used [ZooKeeper](/system-design/zookeeper) for membership; mention it, don't design ZK internals

**Phrase:** "I'll publish domain events to Kafka after the source of truth write, partition by entity id, and make consumers idempotent. Search, notifications, and analytics subscribe — they don't sit on the request path."

**See also:** [notification system](/system-design/notification-system), [ad click aggregator](/system-design/ad-click-aggregator), [Flink](/system-design/flink).
