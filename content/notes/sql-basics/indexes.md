# Indexes & plans

## B-tree (default)

Equality and range on leading columns of composite index. `(a, b)` helps `WHERE a = ?` and `WHERE a = ? AND b = ?`, not `WHERE b = ?` alone.

## Covering index

Include selected columns so query is **index-only** — avoids heap lookups.

## EXPLAIN

Read: seq scan vs index scan, estimated rows, actual time (with `ANALYZE` in Postgres). Spikes after data growth → stale stats → `ANALYZE`.

## Write cost

Every index slows INSERT/UPDATE. Don't index low-cardinality columns alone (boolean) unless partial:

```sql
CREATE INDEX ON orders (created_at) WHERE status = 'pending';
```

## Hash vs GiST/GIN

JSONB, full-text, geo need specialized indexes — know your engine.

## N+1 at DB layer

ORM lazy loads → round trips. `JOIN` or `WHERE id IN (...)` batching in app layer.
