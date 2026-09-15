# Cassandra

> Wide-column store for huge write volume and known keys. Model around queries, not relations.

> Cassandra is a big diary where every page (partition) holds time-sorted rows. Writes stay cheap, reads stay fast only when you know which page to open (`chatId`). Think queries first, tables second — each access pattern may own its table.

## When to pick it

1. Massive write throughput (chat messages, time-series, activity logs)
2. Known-key lookups at scale (no ad-hoc joins needed)
3. Multi-datacenter active-active with tunable consistency
4. Time-ordered data with TTL expiry built in

**Don't use for:** joins, ad-hoc search, transactions — that's [PostgreSQL](/hld/databases-sql).

## How data models work

Partition key picks the node (hash ring); clustering columns sort rows within the partition. Denormalize freely — one table per query. Consistency tunes per operation (`ONE`, `QUORUM`, `ALL`); `R + W > N` gives strong reads. Hinted handoff plus read repair converge replicas asynchronously.

```mermaid
graph LR
    A[App<br/>WHERE chatId=?] --> B[Ring hash]
    B --> C[Node: partition<br/>rows time-sorted]
    C -->|hinted handoff| D[Replica]
```

## Failure modes to mention

1. **Hot partitions** — celebrity keys overload nodes; split keys or front with cache.
2. **Unbounded partitions** — partitions grow forever; bucket by time (monthly tables).
3. **Tombstone storms** — mass deletes slow reads; prefer TTL expiry.
4. **Lightweight transactions** — CAS exists but costs 4 round trips; avoid hot paths.

**Mistake:** "Model like Postgres with joins in mind."
**Correct:** "Query-first tables, partition key from access pattern, denormalize freely."

**Phrase:** "Cassandra is the big diary — think query first, table second; writes cheap, reads fast by known key."

**Remember (Revision):** Partition key picks node, clustering sorts rows, quorum tunes consistency, TTL expires, hot partitions split, lightweight transactions avoided.

**See also:** [whatsapp](/hld/whatsapp), [nosql databases](/hld/nosql-databases), [dynamodb](/hld/dynamodb).
