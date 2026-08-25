# Google Docs

> Collaborative editing. The puzzle is **concurrent edits on one document**, not storing files (that's [Dropbox](/system-design/dropbox)).

## What they ask

Interviewer: *"Design Google Docs — 10 users type in the same document simultaneously, see each other's cursors, never lose edits, support offline and history. How do you handle conflicts?"*

What they really test:
- **Convergence:** Last-write-wins on the whole file is wrong — you need character-level merge (OT or CRDT). Do you know the tradeoff?
- **Single writer per doc:** Can you argue for a doc-affine primary that serializes operations with a global sequence number?
- **Presence & liveness:** Cursors are ephemeral, edits are durable — do you split the two?
- **Reconnection & snapshots:** Client missed 500 ops while offline — do you replay or send a snapshot?

Example scale: 100M docs, 1M DAU, avg doc 50KB, 10 concurrent editors per hot doc, 1k ops/sec cluster-wide, op size ~50 bytes. 500 docs edited per second peak. History kept for 1 year — compaction matters.

## Requirements

**Functional:**
- Create doc, edit rich text (insert/delete/format), share with ACL (owner/editor/commenter/viewer), revoke.
- Real-time collaboration: concurrent inserts at same position converge; cursors/selections visible; comments anchored to ranges that move with edits.
- Offline: queue local ops, merge on reconnect without silent overwrites.
- History: version timeline, diff, restore to revision, blame.
- Presence: who is viewing/editing now, with color and cursor.
- Comments & suggestions: threaded, resolvable, suggestion mode as overlay.

**Non-functional:**
- **P99 op latency < 100ms** for collaborators on same doc (typing feels local).
- **Convergence:** all replicas eventually identical, no lost writes, intention preserved.
- Durability: no committed op lost even if doc server crashes.
- Low bandwidth: op-based sync, not full doc push per keystroke.
- Security: ACL checked on HTTP and on WebSocket handshake and per-op.

**Clarify:**
- Plain text vs rich text (bold, lists, tables)? Rich text adds attribute ops but same OT/CRDT core.
- Max concurrent editors — 10, 50, or 500? (affects fan-out and single-primary choice).
- Offline required v1 or stretch? (changes OT vs CRDT argument).
- Images/files — inline or attachments via S3?
- History granularity — every keystroke or coalesced?

**Out of scope (v1):**
- Full Dropbox-style file sync for binary blobs — images as S3 object refs.
- Real-time voice/video — separate media service.
- Grammar AI / explore — plug as async suggestion service.
- Federation across organizations — single-tenant ACL.

## Scale estimation

| Parameter | Assumption | Math | Result |
|---|---|---|---|
| Docs total | 100M, avg 50KB | 100M × 50KB | **5 TB** snapshots (S3) |
| Active editing docs | 5% of DAU × 1 doc/user | 50k concurrent docs | 50k primaries to place |
| Ops rate | 10 editors × 2 ops/sec per hot doc, 5k hot docs | 5k × 20 | **100k ops/sec peak cluster** (avg 1k) |
| Op storage | 50 bytes/op metadata + range | 100k × 50B = 5MB/s | **~430 GB/day** raw ops before compaction/snapshot |
| Presence | 50k docs × 3 viewers avg | 150k ephemeral entries | Fits in [Redis](/system-design/redis) memory, TTL 30s |
| Snapshot frequency | every 500 ops or 5 min | 100k ops/sec / 500 | 200 snapshots/sec to S3 — batch and coalesce |

Bandwidth: ops are tiny; fan-out is N per op (N = collaborators on doc, usually <10). 100k ops/sec × 10 fan-out × 100B = 100MB/s egress — manageable if doc-affine.

## API Design

```http
POST /v1/docs
{ "title":"Untitled", "content":"" }   // or from template
→ 201 { "docId":"doc_abc", "revision":0, "aclRole":"owner" }

GET /v1/docs/{docId}
Header: Authorization: Bearer <token>
→ 200 { "docId":"doc_abc", "title":"...","revision":42, "snapshotUrl":"s3://.../rev42.json", "aclRole":"editor" }

POST /v1/docs/{docId}/acl
{ "userId":"u_456", "role":"editor" }  // owner | editor | commenter | viewer
→ 200 { "updated": true }

GET /v1/docs/{docId}/history?fromRev=0&toRev=42&limit=20
→ 200 { "revisions":[{"rev":42,"author":"u_123","at":"...","opsSummary":"insert 'hello' at 10"}] }

POST /v1/docs/{docId}/comments
{ "range":{"from":10,"to":15}, "text":"fix this", "threadId": null }
→ 201 { "commentId":"c_1", "anchorRev":42 }

// Real-time — WebSocket
WS /v1/docs/{docId}/ws?token=...
Client → Server: { "type":"op", "clientId":"c_1", "baseRev":42, "ops":[{ "insert":"hello", "at":10 }] }
Server → Clients: { "type":"ack", "clientId":"c_1", "seq":43 }
Server → Clients: { "type":"remoteOp", "seq":43, "author":"u_123", "ops":[...] }
Client → Server: { "type":"cursor", "pos":15, "selection":[10,15] }
Server → Clients: { "type":"presence", "users":[{"userId":"u_123","color":"#f00","cursor":15}] }

GET /v1/docs/{docId}/snapshot?revision=latest  // for reconnect gap
```

All WS messages carry `docId` + `Authorization` on handshake; every op re-validates ACL (cached).

## High-Level Design (HLD)

```
[Browser/Editor] ──HTTPS/WS──▶ [CDN / Edge] ──▶ [API Gateway + Auth] ──▶ [Doc Metadata Service → Postgres (docs, acl)]
        │                               │                    │
        │  WS /docs/{id}                │                    └──▶ [S3] snapshot store: s3://docs/{docId}/rev{seq}.json
        │   (ops + presence)            │                          ▲  │
        │                               │                          │  └── [Snapshot Compactor] (periodic)
        │                               ▼                          │
        │                      [Doc Router / Discovery]  (Redis hash: docId → primary host)
        │                               │
        │                    ┌──────────▼──────────┐
        │                    │   Doc Server Fleet  │  sticky by docId (consistent hash)
        │                    │  ┌───────────────┐  │  in-memory doc + op log + seq
        │                    │  │ doc_abc shard │◀─┼── WS fan-out to N collaborators
        │                    │  │ seq=43        │  │  serialize ops, assign seq, broadcast
        │                    │  └──────┬────────┘  │
        │                    └─────────┼───────────┘
        │                              │  append ops
        │                    ┌─────────▼─────────┐
        │                    │   [Kafka] or      │  topic: doc.ops (partition by docId)
        │                    │   Postgres opLog  │  durable op journal
        │                    └─────────┬─────────┘
        │                              │
        │                    ┌─────────▼─────────┐
        │                    │ Presence Service  │  ephemeral: Redis (cursor, TTL 30s) + pub/sub
        │                    │ [Redis]           │  presence: doc:{id}:users → {userId: {cursor, color, ts}}
        │                    └───────────────────┘
        │
        └─────────────── Comments Service (anchors via OT), Search index (optional Elastic)
```

**Component roles:**
- **Doc Metadata Service:** CRUD for `docs` and `acl` in Postgres; validates share; issues doc-scoped token for WS.
- **Doc Router:** consistent hash `docId → host`; client WS connects to any gateway, gateway looks up primary and proxies or redirects. Keeps single primary per doc (with standby replica) to serialize ops.
- **Doc Server (the heart):** holds authoritative in-memory document (e.g., string + attributes). On `op(baseRev, ops)`, transforms against concurrent ops since `baseRev`, assigns `seq = ++revision`, appends to durable log ([Kafka](/system-design/kafka) or Postgres `doc_ops`), applies to memory, broadcasts `remoteOp(seq, ops)` to all subscribers. ACKs the sender.
- **S3 Snapshot Store:** every N ops (500) or T minutes (5), doc server flushes compacted snapshot `rev43.json` to S3 and truncates old ops. New joiners fetch snapshot + tail ops.
- **Presence Service:** not durable — cursor updates via WS → in-memory → [Redis](/system-design/redis) with TTL; broadcast via same WS fan-out; cleared on disconnect.
- **[Kafka](/system-design/kafka) / opLog:** durability + replay for history and snapshot rebuild if doc server crashes.

**Data flow — write path (typing):** User types "hello" → client sends `op(baseRev=42, insert hello at 10)` over WS → Doc Server locks doc, OT-transforms if `baseRev < currentRev`, assigns `seq=43`, appends to Kafka, applies, broadcasts to 9 other editors, ACKs sender with `seq`. Each remote client applies transformed op to local model.

**Data flow — read path (open doc):** `GET /docs/{id}` → Metadata Service checks ACL → returns `snapshotUrl` + `revision`. Client fetches S3 snapshot, then opens WS with `lastSeq=43` → server streams missed ops (or re-sends snapshot if gap > threshold). History `GET /history` reads opLog + snapshot index.

## Low-Level Design (LLD)

**Database schema:**

```sql
CREATE TABLE docs (
  id            UUID PRIMARY KEY,
  owner_id      UUID NOT NULL,
  title         TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  latest_rev    INT NOT NULL DEFAULT 0,
  snapshot_s3_key TEXT -- s3://bucket/docs/{id}/rev_{latest_rev}.json
);
CREATE TABLE doc_acl (
  doc_id        UUID REFERENCES docs(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('owner','editor','commenter','viewer')),
  PRIMARY KEY (doc_id, user_id)
);
CREATE INDEX ON doc_acl (user_id);

-- Durable op journal (or Kafka topic with same shape)
CREATE TABLE doc_ops (
  doc_id        UUID NOT NULL REFERENCES docs(id),
  seq           INT NOT NULL, -- per-doc monotonic
  author_id     UUID NOT NULL,
  client_id     TEXT NOT NULL,
  base_rev      INT NOT NULL,
  ops_json      JSONB NOT NULL, -- [{ retain:10, insert:"hello", attributes:{bold:true} }]
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (doc_id, seq)
);
CREATE INDEX ON doc_ops (doc_id, seq);

CREATE TABLE doc_snapshots (
  doc_id        UUID NOT NULL,
  rev           INT NOT NULL,
  s3_key        TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (doc_id, rev)
);

CREATE TABLE comments (
  id            UUID PRIMARY KEY,
  doc_id        UUID NOT NULL REFERENCES docs(id),
  author_id     UUID NOT NULL,
  thread_id     UUID, -- null = new thread
  anchor_from   INT NOT NULL, -- position at anchorRev
  anchor_to     INT NOT NULL,
  anchor_rev    INT NOT NULL, -- rev the anchor was created at
  text          TEXT NOT NULL,
  resolved      BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON comments (doc_id, thread_id);
```

**Key classes / modules:**

```text
DocServer           — Map<docId, DocState>; onConnect(docId, user) loads snapshot+ops into memory if not present
DocState            — text: Rope / PieceTable, revision: int, pendingOps: queue, subscribers: Set<WS>
OTEngine            — transform(opA, opB): opA' — classic OT; or CRDT: Yjs-style
Operation           — { retain, insert, delete, attributes } — composable
PresenceManager     — onCursor(pos): SETEX presence:docId:userId 30s {cursor, color}; publish presence event
SnapshotManager     — shouldSnapshot(): seq % 500==0; flushToS3() + update docs.snapshot_s3_key
AclChecker          — canEdit(user, doc): cached from Postgres (5s TTL), re-checked on every op
HistoryService      — getDiff(fromRev,toRev): replay ops between snapshots
```

**Important algorithms:**
- **OT (Operational Transform):** Server is authority. Client sends `op` based on `baseRev`. Server transforms `op` against all ops in `(baseRev, currentRev]` to produce `op'` that applies cleanly at `currentRev`. Assigns `seq`, broadcasts. Client on receiving `remoteOp` transforms its pending local ops against it. Guarantees convergence and intention preservation. Complexity lives in transform function — name it, don't implement fully in interview.
- **CRDT alternative:** Ops are commutative (e.g., Yjs `Y.Text` with unique IDs per character). Clients can apply offline ops and merge without central transform — server just broadcasts and persists. Easier offline story, fatter ops/history. Either answer scores if you stay consistent.
- **Large paste:** single op `{ retain: pos, insert: 10kString }` not 10k inserts — coalesce before send.
- **Comment anchor transform:** comment range `[from,to)` is transformed by subsequent text ops so it tracks the intended text (OT also transforms anchors).

**Design patterns:** Single Writer per aggregate (doc-affine primary), Event Sourcing (op log + snapshot), Pub/Sub fan-out, Cache-Aside for ACL, Flyweight for presence.

## Deep dive — Conflict handling (OT vs CRDT)

Last-write-wins on whole doc is the classic wrong answer — it clobbers concurrent edits (Alice inserts "X" at 5, Bob deletes line 2 — one change silently lost). Character-level merge is required.

**OT path (choose one, commit):** All ops flow through the doc primary. Suppose `rev=10` is "abc". Alice sends `insert "X" at 1` based on 10, Bob sends `delete 1 at 2` based on 10 concurrently. Server receives Alice first → `rev=11` "aXbc", then transforms Bob's `delete at 2` against Alice's insert → becomes `delete at 3` (since "X" shifted indices) → `rev=12` "aXc". Both clients receive transformed remote ops and converge. OT needs a correct `transform` and `compose` — you describe them, you don't code them.

**CRDT path:** Each character gets a globally unique ID `(clientId, clock)` and a position identifier (e.g., List CRDT with fractional indexing). Inserts are `insertAfter(predecessorId, newId, char)`, deletes are `delete(id)` tombstones. Because IDs are unique and ops commute, offline clients can apply locally and sync later — merge is just union of ops sorted by ID. Tradeoff: tombstone storage grows forever (needs GC via snapshot) and wire size larger than OT, but no central transform bottleneck and offline is natural.

Pick OT if you want Google Docs fidelity and can accept a single primary bottleneck; pick CRDT if you want simpler reasoning about offline. Say: *"I will place one primary per doc via consistent hashing; all ops serialize there under OT, or use CRDT for commutative merge — either converges, LWW on whole file does not."*

## Deep dive — Presence, history, and reconnect

**Presence is not edits.** Cursors churn at 10Hz — don't write them to Postgres or Kafka. Keep them in-memory on the doc server plus [Redis](/system-design/redis) `SETEX doc:{id}:presence:{userId} '{cursor:15,color:red}' 30` and pub/sub fan-out. On disconnect, TTL expires and user fades from UI.

**History & snapshots:** Replaying 2 years of keystrokes (millions of ops) to open a doc is wasteful. Doc server compacts every N ops: produce snapshot JSON (text + attributes + rev), upload to S3, update `docs.snapshot_s3_key`, and allow truncation of ops before snapshot (keep last K snapshots for version history). `GET /history?fromRev` can fetch snapshot + tail ops or diff ops between revisions.

**Reconnect:** Client stores `lastAckedSeq`. On WS drop, reconnect with `lastSeq=38`. Server compares to `currentRev=45` — if gap ≤ 1000, stream `doc_ops WHERE seq > 38`; if larger, send `snapshotUrl` for `rev=45` (client replaces local state). This avoids replaying huge gaps. Edits made offline are queued locally and sent as batch with `baseRev=lastAckedSeq` upon reconnect — server transforms them as normal.

## Handling failures and scale

- **Sharding:** Docs sharded by `docId` consistent hash across doc servers (e.g., 64 vnodes). No single doc hot-shards the DB because its working set is in memory on its primary; only opLog writes hit shared storage.
- **Replication & failover:** Each doc primary has a warm standby (replica subscribes to same [Kafka](/system-design/kafka) partition). On primary crash, router promotes standby (takes ~1-2s), replays unapplied Kafka tail, clients auto-reconnect. S3 snapshot + Kafka log = no data loss if both die? Replay from log.
- **Caching:** ACL cached 5s in Redis + local LRU; snapshot fetched via CDN (`Cache-Control: immutable` per rev). Quote-style invalidation not needed — rev is versioned.
- **Replication:** Postgres primary-replica for metadata; doc ops in [Kafka](/system-design/kafka) RF=3 or Postgres with streaming replica. S3 is 11-nines durable.
- **Failure modes:**
  - *Split brain (two primaries):* fencing via lease (Redis `SET NX doc:lease:{docId} host 10s`) — only lease holder accepts writes.
  - *Client offline 1 hour:* local ops queued, on reconnect transformed and merged — no silent loss.
  - *Large doc (1M chars):* snapshot is large — paginate load, apply ops incrementally, don't hold 1M-char string plus 1M tombstones in one RPC.
  - *Hot doc 500 editors:* single primary CPU bound — shard differently? Cap editors per doc or add read-replica fan-out for presence only (edits still single writer).
- **Probes:** doc server CPU per doc, WS connection count, op transform latency, Kafka lag on `doc.ops`, snapshot age (alert if > 30 min without snapshot on active doc).

## Extra probes / Interview follow-ups

1. **Rich text attributes:** How do you represent bold/heading? Attribute ops `{ retain:5, attributes:{bold:true} }` transformed like text ops — composition must carry attributes.
2. **Suggesting mode:** Overlay layer — edits stored as suggestions with `accept/reject` that apply as normal ops when accepted (extra state machine, not in core OT).
3. **Access control on WS:** Token is doc-scoped and short-lived (5m); gateway validates on handshake and doc server re-validates every op against cached ACL — revoke propagates within seconds.
4. **Search:** Index snapshots in [Elasticsearch](/system-design/elasticsearch) asynchronously via Kafka consumer; search doesn't block editing.
5. **Rate limiting per doc:** Per-user op rate 20/sec via [rate limiter](/system-design/rate-limiter) on gateway; large paste counts as 1 op but size-limited (1MB).
6. **Compare to [Dropbox](/system-design/dropbox):** Dropbox does file-level LWW + conflict copies; Docs does character-level merge — explain when each is appropriate.

**Phrase:** "One primary per document serializes ops (OT or CRDT), snapshots to storage, and replays from lastSeq on reconnect. Presence is ephemeral. ACL is checked on the socket."
