# Google Docs

> Collaborative editing. The puzzle is **concurrent edits on one document**, not storing files (that's [Dropbox](/hld/dropbox)).

> One doc per server (consistent hash), merge with OT/CRDT, presence in Redis, ops in Kafka log + S3 snapshots, cursor sync.

## What they ask

**Scenario:** Ten users type the same doc, see cursors, never lose edits; offline + history.

**Tests:** Character-level merge (OT/CRDT) — not whole-file LWW? Single writer per doc with global seq? Presence ephemeral vs edits durable? Reconnect: replay ops vs snapshot?

**Scale:** 100M docs, 1M DAU; hot doc ~10 editors; ~100k ops/s cluster peak; ops ~50B each; snapshots bound replay cost.

## Requirements

**Functional (≤6):** Create/edit/share ACL; real-time concurrent edits + cursors; offline queue + merge; version history/restore; presence; comments (anchored ranges).

**Non-functional:** P99 op latency < 100ms same doc; convergence + no lost committed ops; op-based sync (not full doc per keystroke); ACL on HTTP + WS.

**Clarify (≤4):** Plain vs rich text? Max concurrent editors? Offline v1? History every keystroke vs coalesced?

**Out of scope (v1):** Binary file sync; voice/video; cross-org federation.

## Scale estimation

| Parameter | Result |
|-----------|--------|
| Snapshot storage | ~5 TB (100M × 50KB) on S3 |
| Concurrent editing docs | ~50k — doc-affine primaries |
| Op log ingest | ~100k/s peak; compact via snapshots |
| Presence | ~150k ephemeral entries in [Redis](/hld/caching-strategies) |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/docs` | Create doc |
| `GET` | `/v1/docs/{docId}` | Metadata + snapshot URL + rev |
| `POST` | `/v1/docs/{docId}/acl` | Share roles |
| `GET` | `/v1/docs/{docId}/history` | Revision list |
| `WS` | `/v1/docs/{docId}/ws` | Ops, acks, presence |

**WS (critical):** Client `op(baseRev, ops)` → server assigns `seq`, broadcasts `remoteOp`; client sends `cursor` for presence (not persisted to Kafka).

## High-Level Design (HLD)

![Google Docs architecture: gateway, metadata, sticky doc servers, Kafka oplog, presence](/images/hld/google-docs-architecture.svg)

```
Browser ──HTTPS/WS──► Gateway + Auth ──► Doc Metadata (Postgres: docs, acl)
                              │
                    Doc Router (docId → primary host)
                              ▼
                    Doc Server Fleet (in-memory doc + seq)
                              │ append ops
                    Kafka / opLog + S3 snapshots (every N ops)
                    Presence → Redis TTL + WS fan-out
```

**Write:** Transform op against concurrent ops since `baseRev`, assign `seq`, append log, apply, broadcast. **Open:** Fetch snapshot + tail ops; gap large → new snapshot only.

## Deep dive

**OT vs CRDT:** LWW on whole doc loses concurrent edits. **OT:** primary transforms concurrent ops, assigns seq — Google Docs style. **CRDT:** commutative ops, stronger offline story, tombstone growth. Pick one; both beat file-level LWW ([Dropbox](/hld/dropbox) uses conflict copies instead).

**Reconnect + presence:** Store `lastAckedSeq`; stream missed ops or send latest snapshot if gap huge. Cursors at ~10Hz — Redis `SETEX`, never Postgres. Primary lease (Redis) prevents split-brain.

## Failures and scale

- Consistent hash `docId` across doc servers; hot doc CPU-bound — cap editors or presence-only replicas.
- Standby replays [Kafka](/hld/message-queue) partition on primary fail (~1–2s).
- ACL cache ~5s; immutable snapshot URLs on CDN.
- Fencing via doc lease; large paste as one op (size cap).
- [Rate limiter](/hld/rate-limiter) ~20 ops/s/user at gateway.

**Phrase:** One primary per document serializes ops (OT or CRDT), snapshots to storage, and replays from lastSeq on reconnect. Presence is ephemeral. ACL is checked on the socket.

**Remember:** Edits durable in op log; presence disposable; snapshot + tail beats replaying millions of keystrokes; never merge whole files for collaborative text.
