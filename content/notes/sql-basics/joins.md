# Joins & cardinality

## Join types

- **INNER** — only matching rows.
- **LEFT** — all left; nulls where no match on right.
- **FULL** — both sides preserved (Postgres, not MySQL).

## Fan-out trap

Joining one-to-many inflates row count. Aggregating in same query without care duplicates metrics:

```sql
-- wrong: SUM(order.total) after join to line_items doubles totals
```

Fix: subquery/CTE aggregate first, or `COUNT(DISTINCT ...)`.

## When to denormalize

Read-heavy dashboards: materialized view or denormalized columns with clear write path. Normalize for OLTP truth.

## Semi-join pattern

`WHERE EXISTS (SELECT 1 FROM ...)` often clearer and faster than `IN (SELECT ...)` on large sets.

## Anti-join

`LEFT JOIN ... WHERE right.id IS NULL` — rows in left without match (users with no orders).

## OR in joins

`(a.id = b.id OR a.alt_id = b.id)` kills index use — union two indexed joins instead.
