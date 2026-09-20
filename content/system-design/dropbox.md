# Dropbox

> File sync. The product is **metadata + chunks**, not "put one blob in a table." Conflict handling and upload resume are the senior bits.

> Split files into chunks, keep metadata in Postgres and chunks in S3. Sync with delta + dedup; on conflict use last-write-wins or versions.

## What they ask

**Scenario:** Design Dropbox — upload from laptop A, see it on B and the web; share a folder; resume a 2GB upload after Wi-Fi drops.

**Tests:** Separate chunks (object store) from metadata (tree, ACLs)? Resumable, deduplicated uploads — not naive whole-file PUT? Sync correctness offline + conflicts? Change notifications without polling storms?

**Scale:** 500M users, ~50 files/user, 1 MB avg; metadata tens of TB; chunk storage dominates; delta/long-poll drives read QPS.

## Requirements

**Functional (≤6):** Upload/download folders; multi-device sync; share via link/ACL; version history (restore); resumable + dedup + incremental sync; offline edits with conflict detection.

**Non-functional:** S3 durability 11 9's; per-user metadata strongly consistent; `delta` p95 < 200ms; pre-signed URLs, encryption at rest.

**Clarify (≤4):** Max file size and chunk size? Sharing model (link vs ACL)? Version retention? Client-side vs server encryption?

**Out of scope (v1):** Real-time co-editing like [Google Docs](/hld/google-docs); in-file full-text search; heavy preview pipeline beyond thumbnails.

## Scale estimation

| Metric | Result |
|--------|--------|
| File metadata rows | ~25B (500M × 50) — shard by `namespace_id` |
| Logical bytes | ~25 PB pre-dedup; ~30% dedup savings typical |
| Upload QPS | ~290 avg, ~3k peak |
| Delta/poll load | High — cache delta pages in [Redis](/hld/caching-strategies) |

**Takeaway:** S3 scales chunks; metadata DB is the hard part — shard by user/namespace.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/files/begin` | Start resumable upload |
| `PUT` | `/files/{uploadId}/chunks/{n}` | Upload chunk (idempotent) |
| `POST` | `/files/{uploadId}/complete` | Commit file (CAS) |
| `GET` | `/files/{id}/url` | Pre-signed download |
| `GET` | `/namespace/delta?cursor=` | Changes since cursor |
| `POST` | `/shares` | Share link / ACL |

**Complete (CAS):** `expectedParentRev` → `201` or `409 Conflict` if parent moved. Chunks use pre-signed S3 PUT/GET — API never proxies gigabytes.

## High-Level Design (HLD)

![Dropbox architecture: block/metadata services, S3 chunks, Postgres, notify](/images/hld/dropbox-architecture.svg)

```
Clients ──WS/long-poll──► Notification Service
   │                           ▲
   ▼                           │
API Gateway → Block Service (chunks, pre-sign)
           → Metadata Service (tree, CAS, delta)
           → Share Service
   S3 (content-addressed chunks)   Postgres (sharded metadata)
   Redis — delta/listing cache       Kafka — thumbnails, scan, search
```

**Roles:** Block Server validates hashes, issues pre-signed URLs. Metadata Service owns CAS commits and `delta`. Notification pushes cursor moves; clients pull `delta`. Kafka workers off hot path.

**Upload:** `begin` → parallel chunk PUTs to S3 → `complete` with ordered hashes + expected rev. **Sync:** `delta` since cursor → fetch metadata → parallel chunk GETs for missing hashes.

## Deep dive

**Conflicts:** CAS on commit — loser gets `409`, client saves `name (conflicted copy).ext`. Order: S3 chunks first (orphans GC'd), then DB commit; notification loss OK via poll.

**Resumable + delta:** Track received chunk seq; idempotent PUTs. Monotonic namespace `cursor`; paginated `delta` log. Optional rolling-hash diff for large files.

## Failures and scale

- S3 cross-region replication; chunk GC when `ref_count == 0`.
- Metadata: primary + replicas; `delta` may read replica with bounded staleness.
- Notification miss → client backoff poll; replay from [Kafka](/hld/message-queue).
- Shared-folder fan-out: partition notifications by `namespaceId`.
- Shard namespaces on consistent hash; pre-signed URLs avoid API bandwidth bottleneck.

**Phrase:** S3 stores chunks by hash; Postgres stores the tree and which hashes make a file. Clients sync deltas; CAS commits turn offline edits into two versions, not silent overwrites.

**Remember:** Chunks before metadata commit; dedup via content hash; delta + notify beats blind polling; never dual-write S3 and DB without ordering.
