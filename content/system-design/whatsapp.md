# WhatsApp

> Mobile messaging. Online path is **WebSockets**; offline is **push + stored messages**. Groups and media are the usual extras.

> Persist to Cassandra first, then deliver — WebSocket if online, push if offline. Group fan-out via Kafka async; media in S3.

## What they ask

**Scenario:** Design WhatsApp-style messaging: 1:1 and groups (~256), text/photos, sent/delivered/read ticks, typing, presence, multi-device history.

**What the interviewer really tests:**
- **WebSocket** vs durable log ([Cassandra](/hld/nosql-databases)) vs **FCM/APNS**.
- **Group fan-out** without blocking `send()` on 100 pushes.
- **Ordering, presence, multi-device** sync.
- **Media** off chat nodes (presigned S3 + CDN).

**Example scale:** 500M DAU × 30 msgs/day ≈ 173K msgs/s avg (~350K peak); 50M concurrent WebSockets; media dominates bytes, not message rows.

## Requirements

**Functional:**
- Send/receive text and media; group CRUD (≤256); history pagination.
- Delivered/read receipts, typing, online/last-seen, multi-device.

**Non-functional:**
- Online p95 < 100ms; durable messages; per-chat ordering; 99.9% availability.
- E2E often out of scope — "server stores ciphertext" is enough for 45 min.

**Clarify:** Max group size? Retention/TTL? E2E required or server plaintext?

**Out of scope (v1):** Voice/video (WebRTC), Stories, 1M broadcast channels, full Signal protocol.

## Scale estimation

| Metric | Result |
|--------|--------|
| Messages | ~173K/s avg, ~350K/s peak |
| Text storage | ~52 MB/s → PB/year in Cassandra/Dynamo |
| Media | ~10% × 1 MB → S3 + CDN, not DB |
| Connections | ~50M concurrent WS → fleet sharded by userId |

## API Design

| Method / channel | Description |
|------------------|-------------|
| `POST /v1/auth/login` | Phone OTP → `userId`, `wsUrl` |
| `WS /ws?token=…` | `send`, `ack`, `message`, `delivered`, `read`, `typing` |
| `GET /v1/chats/{chatId}/messages?cursor=&limit=50` | History |
| `POST /v1/media/presign` | S3 upload URL → `cdnUrl` |
| `POST /v1/groups` | Create group chat |

Use `clientMsgId` + `Idempotency-Key` for dedup. Media body references `mediaId` + CDN URL, never inline bytes.

## High-Level Design (HLD)

![WhatsApp architecture: WS gateway, chat, message store, media, push](/images/hld/whatsapp-architecture.svg)

- **Chat fleet (WS):** `userId → nodeId` in [Redis](/hld/caching-strategies); consistent hash or lookup.
- **Cassandra:** `PK=chatId, SK=ts/msgId` append-only log; optional Redis cache of last 100.
- **[Kafka](/hld/message-queue):** `message.created` → fanout workers for groups.
- **Push gateway:** offline → [Notification System](/hld/notification-system) (FCM/APNS).
- **S3 + CDN:** presigned upload; chat nodes never proxy bytes.

**Send (online):** validate → server `msgId`/ts → **quorum write Cassandra** → ack sent → route to recipient WS or enqueue push.

**History:** CQL range by `chatId`; reconnect catch-up since `lastSeenMsgId`.

**Auth/users:** phone OTP in Postgres; chat path never blocks on relational joins — member sets cached `SET chat:{id}:members`.

| Path | Consistency |
|------|-------------|
| Message persist | Quorum write before ack |
| Delivery | At-least-once + client dedup |
| Presence / receipts | Eventual (Redis TTL) |

## Deep dive — groups and fan-out

Group of 100: one durable write + ack, then Kafka consumer pushes to each member (Redis pub/sub to WS nodes or push). `send()` must not await 99 sequential deliveries. Mega-broadcast (1M) → pull model, not per-member push.

## Deep dive — receipts, ordering, multi-device

Per-chat monotonic ts (Snowflake + `INCR chat:{id}:seq`). Client dedup by `msgId`. Presence: heartbeat 15s, Redis TTL 30s. Multi-device: separate WS per device; `read upToMsgId` syncs to sender and user's other devices. At-least-once Kafka OK with client dedup.

## Failures and scale

- WS node crash: reconnect + Cassandra catch-up — no loss after quorum ack.
- Viral group partition hotspot: time-window compaction; write-behind buffer if needed.
- Kafka lag delays delivery only — durability already in Cassandra.
- Push failure: retry with collapse key per chat.
- 50M sockets: ~50K connections/node, autoscale, least-conn LB.
- Cross-region: chat primary by region; async cross-region fan-out ([distributed systems](/hld/distributed-systems)).
- Search: optional Elasticsearch indexer over Kafka — never inline on send.
- [Rate Limiter](/hld/rate-limiter) on `send` + async spam scoring.

**Phrase:** Persist first, then deliver. WebSocket if online, push if not. Media is S3. Groups fan out asynchronously so send() returns after the log write.

**Remember:** Cassandra before ack → Kafka group fan-out → WS online / push offline → per-chat ordering.
