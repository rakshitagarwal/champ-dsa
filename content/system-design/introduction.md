# Introduction

> Design the system on paper before writing code — HLD is what separates senior thinking from junior execution.

> High Level Design is the map of a system — which boxes exist (API, cache, queue, database, CDN), how data flows between them, and what happens under load or failure. It gets decided before code because a wrong architecture costs ten times more after code is written.

HLD matters in three places. First, big systems are never built in someone's head — 50M WhatsApp connections or a Ticketmaster flash sale cannot be handled without thinking. Boxes and data flow get proven on paper first. Second, HLD gives a team one language — frontend, backend, and DevOps all work from the same diagram, so assumptions stop hiding. Third, interviews hinge on the HLD round — after DSA, it is the round that hires or rejects for senior roles, because it reveals trade-off thinking, not memorization.

HLD versus LLD is simple: HLD talks about machines (servers, databases, load balancers), LLD talks about classes (Parking Lot models, SOLID, design patterns). Different interviews, different preparation. This section is HLD — concepts, technologies, and complete design breakdowns.

## How to use this section

1. **Key Concepts** — theory behind every design (fundamentals, capacity, networking, databases, caching, queues, [distributed systems](/hld/distributed-systems)).
2. **Skim Key Technologies** — name each tool with a reason (why Redis, when Kafka). Open the tech page when a design links it.
3. **Question Breakdowns** — most of your study time. Bitly, Uber, WhatsApp-style walkthroughs are where patterns stick.

Every design page follows the same shape: what the real question is, requirements, APIs, boxes, one deep dive the interviewer will probe, failures/scale, and a line you can say out loud.

**Say in the interview:** *"First a simple design that meets the APIs, then harden it for scale and failure."*

## Study order (suggested)

| Week focus | Read | Then practice aloud |
|------------|------|---------------------|
| Theory spine | [Fundamentals](/hld/fundamentals) → [Capacity](/hld/capacity-estimation) → [Caching](/hld/caching-strategies) → [Load balancing](/hld/load-balancing) → [Message queues](/hld/message-queue) → [Distributed systems](/hld/distributed-systems) | Explain CAP + cache-aside without notes |
| Data & APIs | [SQL](/hld/sql-databases) → [NoSQL](/hld/nosql-databases) → [Sharding](/hld/sharding) → [API design](/hld/api-design) | Pick Postgres vs Cassandra for a chat app |
| Tech flashcards | [Redis](/hld/redis), [Kafka](/hld/kafka), [Postgres](/hld/postgresql), [Cassandra](/hld/cassandra), [DynamoDB](/hld/dynamodb), [Elasticsearch](/hld/elasticsearch) | "When would you *not* use this?" |
| Classic designs | [Bitly](/hld/bitly) → [Rate limiter](/hld/rate-limiter) → [WhatsApp](/hld/whatsapp) → [Uber](/hld/uber) → [Ticketmaster](/hld/ticketmaster) → [FB News Feed](/hld/fb-news-feed) | Draw boxes from memory, then open the page |
| Harder / money | [Payment](/hld/payment-system), [Dropbox](/hld/dropbox), [YouTube](/hld/youtube), [Google Docs](/hld/google-docs) | Consistency + failure story for each |

## Blank interview checklist (use on every problem)

Copy this into a scratch pad before you open the answer page:

1. **Clarify** — actors, v1 scope, out of scope, read/write ratio, retention.
2. **NFRs with numbers** — p99 latency, availability nines, consistency (strong vs eventual) per path.
3. **Capacity** — DAU → QPS (×2–3 peak), storage, bandwidth — only if the number changes boxes.
4. **APIs** — 4–8 endpoints; errors (`409`, `429`, `404`).
5. **Boxes** — client → CDN/LB → gateway → services → cache / DB / queue / object store.
6. **Deep dive** — the one hard part (unique IDs, seat hold, geo match, fan-out…).
7. **Failure** — what dies, what degrades, what never loses data; RPO/RTO if multi-region.
8. **Close** — one phrase that captures the design.

## Theory map (where ideas live)

| If you need… | Open |
|--------------|------|
| CAP, PACELC, quorum, locks, saga, idempotency | [Distributed systems](/hld/distributed-systems), [Idempotency](/hld/idempotency) |
| Cache-aside, stampede, Redis patterns | [Caching](/hld/caching-strategies), [Redis](/hld/redis) |
| L4/L7, sticky sessions, consistent hashing | [Load balancing](/hld/load-balancing) |
| Split a database write path | [Sharding](/hld/sharding), [SQL databases](/hld/sql-databases) |
| Fail fast when a dependency is down | [Circuit breaker](/hld/circuit-breaker), [Reliability](/hld/reliability-fault-tolerance) |
| Geo nearby search | [Geohashing & quadtrees](/hld/geohashing-and-quadtrees), [Uber](/hld/uber) / [Yelp](/hld/yelp) |
| Dedup / "probably not in set" | [Bloom filter](/hld/bloom-filter) |
| Core Web / CDN / object storage | [CDN](/hld/cdn), [Storage](/hld/storage), [S3](/hld/s3) |

## Name aliases (interview prompt → our page)

| They say | Study |
|----------|--------|
| Twitter / X timeline | [FB News Feed](/hld/fb-news-feed) (+ [Instagram](/hld/instagram)) |
| URL shortener / TinyURL | [Bitly](/hld/bitly) |
| Chat / Messenger | [WhatsApp](/hld/whatsapp) |
| Ride sharing / Lyft | [Uber](/hld/uber) |
| Ticket booking flash sale | [Ticketmaster](/hld/ticketmaster) |
| Video streaming | [YouTube](/hld/youtube) |
| Collaborative editing | [Google Docs](/hld/google-docs) |

## Keep in mind

- HLD is about machines, LLD is about classes — say this line first.
- Prove the design on paper, not in code — catch mistakes at the cheap stage.
- After the happy path, always ask about scale and failure — that is the deep dive.
- There is no single right answer — reason with trade-offs: "If X then Y, else Z."
- Apply non-functionals only where the product needs them — don't recite CAP for every app.
- Do capacity math only when the number changes the design — no theater.
- State consistency **per path** (payments strong, feed eventual) — one label for the whole product is usually wrong.
