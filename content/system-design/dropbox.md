# Dropbox

> File sync. The product is **metadata + chunks**, not "put one blob in a table." Conflict handling and upload resume are the senior bits.

## What they ask

Upload a file from laptop A, see it on laptop B and the web. Share a folder. Don't re-upload the whole 2GB video after a Wi-Fi blip.

## Requirements

**Functional:** upload/download, folder tree, share link, sync clients, version history (scoped).

**Non-functional:** durable storage, resumable uploads, sync that doesn't burn battery, strong metadata consistency per user.

**Out of scope:** full Google Docs editing (that's [Google Docs](/system-design/google-docs)).

## API

1. `POST /files/begin` → `{ uploadId, chunkSize }`
2. `PUT /files/{uploadId}/chunks/{n}` (idempotent)
3. `POST /files/{uploadId}/complete` `{ name, parentId, checksum }`
4. `GET /files/{id}/url` → pre-signed S3 GET
5. `GET /namespace/delta?cursor=` — what changed since last sync

## Design

**Object storage (S3)** holds **chunks** (e.g. 4MB). Content-addressed: hash of bytes = chunk id. Identical files across users **dedup**.

**Metadata DB (Postgres):** User, Namespace, File (logical), Revision, Chunk list (ordered hashes), sharing ACLs.

**Block server:** clients talk here; it hands out pre-signed URLs so the API box doesn't proxy gigabytes.

**Notification:** after commit, push via WebSocket / long poll: "namespace X cursor moved." Clients pull delta. Same idea as Dropbox's old long-poll.

**Sync:** client keeps local journal. Upload new chunks, then commit metadata. Download: metadata first, then missing chunks.

## Deep dive — conflicts and consistency

Two laptops edit `notes.txt` offline. Last-write-wins **loses data**. Better: keep both revisions (`notes (laptop2).txt`) or a conflict copy. Metadata commit is **compare-and-swap** on `parent + name + rev`.

**Never** dual-write S3 + DB without a story: upload chunks first (orphans OK, GC later), then commit the file row. If commit fails, retry complete. If DB commits and notification fails, clients poll.

**Large files:** chunk + checksum (Merkle / rolling hash) so a 1-byte change uploads one chunk.

## Extra probes

1. Sharing: ACL on the namespace; don't leak via guessable IDs
2. Preview: async thumbnails via [Kafka](/system-design/kafka) workers
3. Encryption: client-side vs at-rest keys
4. Hot metadata: cache folder listings in [Redis](/system-design/redis) per user

**Phrase:** "S3 stores chunks addressed by hash. Postgres stores the tree and which hashes make a file. Clients sync deltas. Commits are CAS so two offline edits become two versions, not a silent overwrite."
