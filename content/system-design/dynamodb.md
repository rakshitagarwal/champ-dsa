# DynamoDB

> Managed auto-scale key-value — hand over a partition key, get single-digit millisecond reads back.

> DynamoDB is a managed locker service: give a key, take the item. Global Secondary Indexes allow lookup by alternate keys, each at its own cost. Auto-scaling and on-demand modes absorb spikes without cluster operations. Hot keys throttle single partitions — design keys to spread.

## When to pick it

1. Key-value access at any scale without operating clusters
2. Spiky serverless workloads (on-demand billing, scale to zero-ish)
3. Session, cart, and metadata stores with predictable patterns
4. Multi-region active-active via Global Tables

**Don't use for:** heavy joins, ad-hoc analytics ([PostgreSQL](/hld/postgresql) / [ClickHouse](/hld/clickhouse)), or hot single keys without a mitigation plan.

## How keys and indexes work

**Partition key** hashes to a storage partition; optional **sort key** orders items within it (`PK=userId`, `SK=order#ts`). Query patterns must match keys — there is no SQL planner to save a bad model.

**GSI / LSI:** alternate access paths. Every GSI is roughly another table to fund and keep in sync (eventual). Project only fields you need.

| Choice | When |
|--------|------|
| On-demand | Spiky / unknown traffic |
| Provisioned + autoscaling | Steady predictable load |
| DAX | Microsecond cache in front of hot reads |

Choose **high-cardinality** partition keys — `userId` spreads; `status=ACTIVE` concentrates and throttles.

## Consistency story (say this)

- **Strongly consistent read:** same region, pays latency — use after your own write when UX needs it.
- **Eventually consistent read:** default, cheaper, fine for feeds and catalogs.
- **Transactions / conditional writes:** `ConditionExpression` and TransactWrite for small multi-item atomicity — not a replacement for a ledger DB when rules are complex.
- **Global Tables:** multi-region active-active with last-writer-wins style conflict handling — name the conflict model for money paths.

## Failure modes to mention

1. **Hot partitions** — one key's traffic throttles while others idle; split keys (`userId#shard`) or cache in [Redis](/hld/redis).
2. **GSI lag and cost** — indexes replicate asynchronously and bill separately.
3. **Item size 400KB** — large blobs belong in [S3](/hld/s3) with pointers here.
4. **Scan storms** — full scans burn RCU; design Query paths, never Scan at scale.
5. **Throttling under burst** — on-demand helps; still shard hot keys and backoff with jitter.

**Mistake:** "Low-cardinality partition keys like status."
**Correct:** "High-cardinality keys spread load; GSIs add access paths at their own price."

**Phrase:** "DynamoDB is the managed locker — partition key in, milliseconds out; spread keys, mind GSI costs."

**Remember (Revision):** PK + SK; GSIs cost extra; on-demand for spikes; 400KB items; hot keys throttle; scans are the enemy; strong vs eventual read is per request.

**See also:** [cassandra](/hld/cassandra), [postgresql](/hld/postgresql), [nosql databases](/hld/nosql-databases), [chatgpt](/hld/chatgpt).
