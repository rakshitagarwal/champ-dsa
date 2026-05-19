# Transactions

## ACID revision

**Isolation** is what bites: dirty read, non-repeatable read, phantom read.

- **READ COMMITTED** — default Postgres
- **REPEATABLE READ** — snapshot in PG
- **SERIALIZABLE** — strongest; expect retries

## Deadlocks

Cycle of row locks → DB kills one transaction. Retry with backoff in app; keep lock order consistent.

## Idempotency keys

`INSERT ... ON CONFLICT` or unique constraint on `idempotency_key` so webhook retries don't double-charge.

## Short transactions

Don't hold txn open while calling HTTP. Pattern: write intent → external call → update status.

## Migrations

Lock-heavy DDL online: use concurrent index creation (Postgres `CONCURRENTLY`), expand-contract for column renames.

## Read replicas

Replication lag — don't read-your-writes on replica immediately after write unless session tracks LSN.
