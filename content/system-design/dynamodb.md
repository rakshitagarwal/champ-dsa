# DynamoDB

> Managed auto-scale key-value — hand over a partition key, get single-digit millisecond reads back.

> DynamoDB is a managed locker service: give a key, take the item. Global Secondary Indexes allow lookup by alternate keys, each at its own cost. Auto-scaling and on-demand modes absorb spikes without cluster operations. Hot keys throttle single partitions — design keys to spread.

## When to pick it

1. Key-value access at any scale without operating clusters
2. Spiky serverless workloads (on-demand billing, scale to zero-ish)
3. Session, cart, and metadata stores with predictable patterns
4. Multi-region active-active via Global Tables

**Don't use for:** heavy joins, ad-hoc analytics (that's [PostgreSQL](/hld/databases-sql)), or hot single keys.

## How keys and indexes work

Partition key hashes to a storage node; sort key orders items within it. GSIs project alternate query paths with independent throughput. Choose high-cardinality partition keys — user IDs spread, status flags concentrate. On-demand mode bills per request; provisioned with autoscaling saves money on steady loads.

## Failure modes to mention

1. **Hot partitions** — one key's traffic throttles while others idle; split keys or cache in front.
2. **GSI lag and cost** — indexes replicate asynchronously and bill separately; every GSI is a new table to fund.
3. **Item limits** — 400KB per item; large blobs belong in S3 with pointers here.
4. **Scan storms** — full scans on big tables burn throughput; design queries, never scan.

**Mistake:** "Low-cardinality partition keys like status."
**Correct:** "High-cardinality keys spread load; GSIs add access paths at their own price."

**Phrase:** "DynamoDB is the managed locker — partition key in, milliseconds out; spread keys, mind GSI costs."

**Remember (Revision):** Partition plus sort keys, GSIs cost extra, on-demand for spikes, 400KB items, hot keys throttle, scans are the enemy.

**See also:** [cassandra](/hld/nosql-databases), [postgresql](/hld/databases-sql), [chatgpt](/hld/chatgpt).
