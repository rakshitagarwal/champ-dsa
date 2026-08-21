# DynamoDB

> AWS's managed key-value / document store. Same mental model as Dynamo papers: **partition key**, optional sort key, and you pay for capacity. There is no JOIN.

If the company is on AWS, saying DynamoDB instead of self-hosted Cassandra is often the senior move — operations disappear, the constraints do not.

## Keys and access

Every item lives in a table with a primary key:

1. **Partition key only** — get-by-id (user, short URL)
2. **Partition + sort** — `PK=chatId`, `SK=timestamp` for messages

**GetItem / Query** are cheap when you know the key. **Scan** is a last resort (analytics jobs, not the user path).

**GSI / LSI** — extra query shapes. Each GSI has its own partition key and its own hot-partition problem. You pay extra writes.

## When you pick it

1. Simple key lookups at any scale (sessions, feature flags, URL map)
2. Inbox / activity streams with a well-chosen PK
3. Serverless stacks (Lambda + Dynamo) with spiky traffic
4. Single-digit millisecond reads with DAX or Redis in front if needed

Avoid it for: relational reporting, multi-item transactions as the default, search (use [Elasticsearch](/system-design/elasticsearch)).

## Hot partitions

All traffic for one `PK` hits one partition. Celebrity user, popular short code, one `PK=GLOBAL`. Fix: **write sharding** (`userId#0` … `userId#15`) or a cache in front.

**On-demand vs provisioned.** Interviews: "start on-demand, watch hot keys, add cache."

## Patterns

1. **Single-table design** — many entity types, prefixed keys (`USER#`, `ORDER#`). Optional in interviews; don't lose 15 minutes on it.
2. **TTL attribute** — expire sessions
3. **Streams** — Dynamo Stream → Lambda / [Kafka](/system-design/kafka) for index and notifications
4. **Transactions** — exist, limited, not a reason to model a bank here

## Failure modes

1. **Throttling** (`ProvisionedThroughputExceeded`) — backoff + jitter
2. **Eventual GSIs** — a query on GSI can miss a just-written item
3. **Item size 400KB** — metadata only; files go to S3
4. **Cost** — large items + many GSIs surprise finance

**Phrase:** "Dynamo is get/query by primary key at AWS scale. I'll pick PK/SK from the query, put a cache on hot keys, and keep blobs in S3. Search and joins live elsewhere."

**See also:** [Bitly](/system-design/bitly), [Cassandra](/system-design/cassandra), [Redis](/system-design/redis).
