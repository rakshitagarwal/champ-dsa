# ZooKeeper

> Coordination: leader election, distributed locks, and config. Kafka used to need it; the patterns still matter.

> ZooKeeper is a tiny strongly-consistent store (znodes in a tree) that systems use to agree: who leads, who holds the lock, what the config says. Watches notify clients of changes. CP by design — minorities fail during partitions rather than split brains.

## When to pick it

1. Leader election (one active writer among replicas)
2. Distributed locks with fencing and leases
3. Service configuration and membership (who is alive)
4. Coordination primitives behind Kafka, Hadoop, and friends

**Don't use for:** general storage, queues, or high-throughput reads — etcd serves the same role in Kubernetes-native stacks.

## How it works

Clients create ephemeral znodes (vanish on disconnect) and set watches; the ensemble (odd-numbered, usually 3 or 5) orders all writes through a leader with Zab consensus. Reads serve locally and fast; writes need a quorum. Recipes (locks, elections, barriers) compose from sequential ephemeral nodes plus watches.

## Failure modes to mention

1. **Herd effect** — every client watching one node thunders on change; use hierarchical watches.
2. **Session expiry** — GC pauses kill sessions, dropping ephemeral nodes; tune timeouts to pause times.
3. **Write bottleneck** — all writes funnel through the leader; keep data tiny and coordination-only.
4. **Split brain avoided by design** — minority partitions stop serving; plan capacity accordingly.

**Mistake:** "Store application data in ZooKeeper."
**Correct:** "Coordination only — tiny znodes, ephemeral membership, watches for change."

**Phrase:** "ZooKeeper is the agreement box — leaders elected, locks fenced, config watched, all strongly consistent."

**Remember (Revision):** Ephemeral znodes plus watches, odd ensembles, quorum writes, coordination data only, herd effect guarded.

**See also:** [distributed systems](/hld/distributed-systems), [kafka](/hld/kafka), [job scheduler](/hld/job-scheduler).
