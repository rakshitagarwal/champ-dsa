# Google Docs

> Collaborative editing. The puzzle is **concurrent edits on one document**, not storing files (that's [Dropbox](/system-design/dropbox)).

## What they ask

Two people type in the same doc. Cursors. History. It shouldn't clobber.

## Requirements

**Functional:** create doc, edit, share ACL, presence, comments (scoped), offline (optional).

**Non-functional:** low latency ops, eventual consistent doc that **converges**, no silent lost writes.

**Clarify:** rich text vs plain; how many concurrent editors (10 vs 500).

## API

1. `GET /docs/{id}` snapshot
2. `WS /docs/{id}` send ops, receive ops + presence
3. `POST /docs/{id}/acl`

## Design

**Snapshot store:** S3 / Postgres for the last compact document + revision number.

**Live:** a **doc server** (sticky by `docId`) keeps the in-memory doc. Clients send operations.

**Two valid answers:**

1. **OT (operational transform)** — like classic Google Docs. Server is the authority; transforms concurrent ops. Hard to implement in an interview; **name it** and describe the server serializing ops.
2. **CRDT** — commutative ops (Yjs, Automerge). Easier mentally for "offline then merge." Slightly fatter.

Pick one and stay consistent. Server assigns a global `seq`. Clients ACK.

**Presence:** ephemeral in Redis / memory: `{ userId, color, cursor }`. TTL.

**Share:** ACL in DB; WS handshake checks it.

**History:** log of ops (Kafka / table) + periodic snapshot so you don't replay 2 years of keystrokes.

## Deep dive — conflict

Last-write-wins on the whole file is **wrong** (that's Dropbox conflict copies). Character-level merge is the point.

**Fan-out:** editors on the same docId hit one primary (or a small replica group). 1M docs → shard by `docId`. Don't put all docs on one process.

**Reconnect:** client sends `lastSeq`; server replays missing ops or sends a snapshot if the gap is huge.

**Large paste:** one op with a range, not 10k single inserts if you can help it.

## Extra probes

1. Comments as annotations with anchors that OT also transforms
2. Images: not in the OT log — object ids + S3
3. Suggesting mode — extra layer

**Phrase:** "One primary per document serializes ops (OT or CRDT), snapshots to storage, and replays from lastSeq on reconnect. Presence is ephemeral. ACL is checked on the socket."
