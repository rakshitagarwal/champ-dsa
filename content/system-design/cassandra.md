# Cassandra

> Wide-column store. Huge **writes**, multi-datacenter, and queries you planned in advance. If you need ad-hoc joins, this is the wrong tool.

Cassandra (and Scylla) hashes a **partition key** onto a ring of nodes. Replication is tunable (`LOCAL_QUORUM`, `ONE`, …). There is no single primary. That is why it shows up for time-series, inbox, and click logs.

## When you pick it

1. Write-heavy append data (messages, events, telemetry)
2. Known access: "get last N messages for `chatId`"
3. Multi-region with availability over strict linearizability
4. TTL on rows (IoT, sessions)

Pick [PostgreSQL](/system-design/postgresql) for payments, inventory, and anything with multi-row transactions. Pick [DynamoDB](/system-design/dynamodb) if you want this model **managed** on AWS.

## Data modeling (the whole interview)

You model **tables per query**, not an ER diagram.

Example inbox: `PRIMARY KEY ((chat_id), sent_at, message_id)` — partition by chat, cluster by time. "All messages for user across chats" is a **different table** (or a search index), not a join.

**Hot partition:** one group chat with millions of writes. Bucket the partition (`chat_id + day`) or shard the celebrity chat.

**Secondary indexes** in Cassandra are limited. Prefer denormalized tables you write twice (or write to Kafka and project).

## Consistency knobs

`QUORUM` read + write so that R + W > N (classic). For a chat receipt, you might accept `LOCAL_QUORUM`. For "did this ticket sell," you probably should not be in Cassandra at all.

**Lightweight transactions** (compare-and-set) exist and are slow. Do not build a bank on them.

## Failure modes

1. **Hinted handoff / repair** — nodes catch up; mention anti-entropy
2. **GC / tombstones** — deletes are markers; huge tombstone scans hurt
3. **Unbalanced ring** — bad partition key
4. **CQL looks like SQL** — it is not; no joins, no `ORDER BY` anything

**Phrase:** "I'd use Cassandra when the query is 'read a time-ordered partition at huge write QPS.' Partition key is the design. Anything transactional stays in Postgres."

**See also:** [WhatsApp](/system-design/whatsapp), [DynamoDB](/system-design/dynamodb).
