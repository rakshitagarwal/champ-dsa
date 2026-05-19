# Query patterns

## Pagination

Offset/limit simple but slow on large offsets — **keyset** (cursor) on indexed column:

```sql
WHERE created_at < $cursor ORDER BY created_at DESC LIMIT 20;
```

## Upsert

Postgres: `INSERT ... ON CONFLICT (id) DO UPDATE SET ...`
MySQL: `ON DUPLICATE KEY UPDATE`

Return `RETURNING *` for API response body.

## Window functions

```sql
ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC)
```

Top-N per group without self-join hacks.

## CTEs

Readable pipelines; in Postgres 12+ optimizer can inline — still check plan for materialization.

## Counting

`COUNT(*)` on huge tables is expensive — approximate (`reltuples`) or maintain counter table for badges.

## Soft delete

`deleted_at IS NULL` in every query — partial index `WHERE deleted_at IS NULL` or enforce in ORM scope.
