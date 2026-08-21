# PostgreSQL

> Default database until proven otherwise. **Transactions, joins, constraints, flexible queries.** Most designs should start here and add Redis / Kafka / ES around it.

Postgres is relational. You model entities, you `BEGIN`/`COMMIT`, and the query planner uses indexes. Vertical scale + read replicas get you surprisingly far. Sharding is a later conversation, not the opening move.

## When you pick it

1. Users, orders, tickets, payments, follows — anything with **invariants**
2. You don't know all query patterns yet
3. Strong consistency on a row ("this seat is held by this user")
4. Moderate scale (millions of rows, thousands of QPS with indexes) before NoSQL

Move **off** Postgres (or alongside it) when: append-only firehose, multi-region write availability, or a query that is purely key-value at insane QPS.

## Indexes and the interview

1. **B-tree** — default for `=` and ranges
2. **Compound** — left-prefix (`(user_id, created_at)`)
3. **Partial** — `WHERE status = 'open'`
4. **GIN** — arrays / JSONB; still not a search engine

**N+1** is an application bug. **SELECT *** and missing indexes show up as "the feed is slow."

## Replication and scale

**Primary** for writes. **Replicas** for reads — they lag. Don't read-your-write from a replica after insert unless you wait or use the primary.

**Connection pooling** (PgBouncer) — Node will otherwise exhaust `max_connections`.

**Sharding:** by `user_id` or tenant. Cross-shard joins become application joins. Say this only when QPS or size forces it.

**Partitioning** (native) — time-range partitions for huge time-series *inside* one cluster.

## Transactions

ACID on one primary. Multi-object checkout: one transaction, or a saga if services are split.

**Isolation:** `READ COMMITTED` default; `SERIALIZABLE` when lost updates would lose money or seats.

Foreign keys, unique constraints, and `SELECT … FOR UPDATE` are how you prevent double-booking in [Ticketmaster](/system-design/ticketmaster) before you invent a custom lock service.

## Failure modes

1. **Lock contention** — hot row (one event's remaining_count)
2. **Long transactions** — hold locks, bloat
3. **Replica lag** — stale feed
4. **Failover** — brief write unavailability

**Phrase:** "Source of truth in Postgres with proper unique constraints. Redis for the hot read path, Kafka to fan out, Elasticsearch if we need search. I won't shard until a number says I must."

**See also:** [SQL notes](/notes/sql), [Ticketmaster](/system-design/ticketmaster), [payment system](/system-design/payment-system).
