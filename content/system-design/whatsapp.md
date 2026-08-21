# WhatsApp

> Mobile messaging. Online path is **WebSockets**. Offline path is **push + stored messages**. Groups and media are the usual extras.

## What they ask

1:1 chat, groups (~100), send text and photos, ticks for delivered/read.

## Requirements

**Functional:** send/receive, history, group membership, media.

**Non-functional:** low latency for online users, messages durable, last-seen optional.

**Scale sketch:** tens of thousands of messages/s globally is normal to talk through; media dominates storage.

## API

HTTP for auth, profile, history pages. **WebSocket** (or similar) for live send/receive.

1. `POST /login` → session
2. `WS /chat` — `{ type: send, chatId, body }`
3. `GET /chats/{id}/messages?cursor=`
4. `POST /media/presign` → upload to S3

## Design

**Chat service** holds WS connections. Map `userId → { node, conn }` in [Redis](/system-design/redis). If the receiver is on another box, route via pub/sub or a connection broker.

**Message store:** [Cassandra](/system-design/cassandra) / Dynamo `PK=chatId, SK=timestamp`. Don't put the chat log in Redis except a tiny hot cache.

**Online:** sender → chat service → persist → push on receiver's socket.

**Offline:** persist still. Queue a push via FCM/APNS ([notification system](/system-design/notification-system)). On open app, fetch missed messages.

**Media:** client uploads to S3 with pre-signed URL. Message body is the object key + size. CDN for download. Never pipe gigabytes through the chat node.

**Receipts:** receiver's client ACKs → `delivered`. Open thread → `read`. Store those timestamps; fan out to sender's socket.

## Deep dive — groups and fan-out

A group of 100: one write to the log, then notify 99 members. Fan-out via [Kafka](/system-design/kafka) so the sending API doesn't wait on 99 pushes. For huge broadcast channels, treat as pub/sub, not 1:1 replication of every inbox.

**Ordering:** per-chat monotonic id / timestamp from the server. Clients reorder.

**E2E encryption (WhatsApp-real):** interviews often skip Signal protocol. Mention "payload encrypted, server stores ciphertext" if they want authenticity.

## Extra probes

1. Multi-device: each device is a consumer; don't mark read on the wrong phone without sync
2. Presence: heartbeat in Redis with TTL
3. Shard chats by `chatId`

**Phrase:** "Persist first, then deliver. WebSocket if online, push if not. Media is S3. Groups fan out asynchronously so send() returns after the log write."
