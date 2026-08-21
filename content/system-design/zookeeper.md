# ZooKeeper

> A small, strongly consistent store for **coordination**, not for your application data. Leader election, locks, membership, and config that must not split-brain.

ZooKeeper keeps a little filesystem of znodes, replicated with Zab (Paxos-family). Writes go through a leader. Reads can be served locally. It is slow and small on purpose — kilobytes of metadata, not terabytes of messages.

## When it shows up

1. **Kafka (classic)** — controller election, topic metadata. Newer Kafka can use KRaft (no ZK). Still fair game in interviews.
2. **HDFS / Hadoop** — NameNode HA
3. **Leader election** — one scheduler is primary among N workers
4. **Distributed lock / barrier** — "only one job runs this cron globally"
5. **[Bitly](/system-design/bitly) range allocation** — a counter service hands out ID ranges; ZK (or etcd) holds the high-water mark

Today many teams say **etcd** or **Consul** instead. The *job* is the same: consensus on a tiny key.

## What you must not do

Do not store user sessions, feeds, or files in ZooKeeper. Watchers + large values will melt it. Do not use it as a message bus.

## Patterns

**Ephemeral znodes.** Session dies → node disappears → watchers fire. That is how members drop out of a cluster.

**Sequential znodes.** Create `lock-0000000123`; lowest number holds the lock.

**Cached reads.** Clients cache data and watch for changes so they are not polling.

## Failure modes

1. **Ensemble size** — 3 or 5 nodes; 2 is not a quorum
2. **Split brain** — ZK is designed to avoid it; *your* app still can if you ignore watches
3. **Herd effect** — every client watches the same node; use more specific paths
4. **GC pauses** on JVM ZK — historically painful; mention "keep the cluster dedicated"

**Phrase:** "ZooKeeper (or etcd) is for who is leader and what the current config is — a few keys, strong consistency. Application data stays in Postgres, Redis, or Kafka."

**See also:** [Bitly](/system-design/bitly) (ID ranges), [job scheduler](/system-design/job-scheduler), [Kafka](/system-design/kafka).
