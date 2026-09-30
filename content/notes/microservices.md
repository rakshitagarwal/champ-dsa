# Microservices Interview Notes

> Important concepts only — how services talk, API Gateway, Node wiring, multi-DB, GraphQL, event-driven design, Kafka vs NATS. Related: [Node](/notes/node), [Databases](/notes/databases), [DevOps](/notes/devops), [AWS](/notes/aws), [HLD](/hld).

---

## 1. What are microservices?

A **microservice** is a small, independently deployable service that owns **one business capability** (orders, users, payments) and usually its **own data**.

| Monolith | Microservices |
|---|---|
| One codebase, one deploy | Many services, many deploys |
| One shared DB (often) | DB per service (usually) |
| Simple locally | Complex ops: network, discovery, tracing |
| Scale the whole app | Scale only hot services |

**When they make sense:** large team, independent release cadence, different scale/tech per domain.  
**When they don't:** small team/product — a modular monolith is often better. Say this in interviews.

**Core rules:**
- Service is reachable over the network (HTTP/gRPC/events)
- **No shared database tables** across services (share via APIs/events)
- Failures are normal — timeouts, retries, circuit breakers
- Observability is mandatory (`requestId` / trace across services)

---

## 2. High-level picture

```
Client (Web / Mobile)
        │
        ▼
   API Gateway  ────── auth, rate limit, routing, TLS
        │
   ┌────┼────┬────────────┐
   ▼    ▼    ▼            ▼
 Users  Orders  Payments  Notifications
   │      │        │            │
   ▼      ▼        ▼            ▼
  DB1    DB2      DB3     (email/SMS provider)
        │
        └──► Kafka / NATS  (async events)
```

**Sync path:** Client → Gateway → Service A → (maybe) Service B → response.  
**Async path:** Service A publishes event → bus → Service B reacts later.

---

## 3. API Gateway

**API Gateway** = single entry for clients. It does **not** hold business logic.

**Responsibilities:**
| Job | Example |
|---|---|
| Routing | `/users/*` → users service |
| AuthN | Verify JWT / session at the edge |
| Rate limiting | Protect backends |
| TLS termination | HTTPS ends at gateway |
| Request shaping | Path rewrite, headers |
| Aggregation (optional) | BFF combines 2–3 calls |

**Examples:** Kong, NGINX, AWS API Gateway, Traefik, Express Gateway, custom Node BFF.

**Interview phrase:**  
*"Clients hit one gateway. Gateway authenticates and routes. Domain rules stay inside each service."*

**Gateway vs load balancer:**  
- LB spreads traffic to healthy instances of *the same* service  
- Gateway routes to *different* services by path/host and often handles cross-cutting concerns

---

## 4. How Node.js microservices connect

### 4.1 Sync: HTTP/REST between services

```js
// orders-service calling users-service
import axios from "axios";

async function getUser(userId, requestId) {
  const { data } = await axios.get(
    `${process.env.USERS_URL}/internal/users/${userId}`,
    {
      timeout: 2000,
      headers: { "x-request-id": requestId },
    }
  );
  return data;
}
```

**Musts:**
- **Timeouts** on every outbound call
- Propagate **`x-request-id` / trace headers**
- Prefer **internal** URLs (private network), not public internet
- Retry only **idempotent** GETs (backoff + jitter)
- **Circuit breaker** (e.g. opossum) when dependency is sick

### 4.2 Sync: gRPC (optional interview mention)

Binary, typed contracts (Protobuf), faster than JSON REST for service-to-service. Same rules: timeouts, retries, discovery.

### 4.3 Service discovery

How does Orders know Users' address?
- **K8s DNS:** `http://users-service:3000` (most common answer)
- Env vars / config for small setups
- Consul / Eureka in older stacks

### 4.4 Auth between services

| Pattern | Idea |
|---|---|
| Gateway validates user JWT | Downstream trusts gateway + internal network |
| Service-to-service mTLS | Stronger zero-trust |
| Propagate user JWT | Service checks scopes again (defense in depth) |

Never expose internal ports publicly.

### 4.5 Tiny multi-service Node layout

```text
apps/
  api-gateway/     # express/fastify: auth + proxy
  users-service/
  orders-service/
packages/
  shared/          # types, logger, error shape (optional)
```

Each service: own `package.json`, own Dockerfile, own deploy.

---

## 5. Database per service (multiple DBs)

**Rule:** each service owns its schema. Orders DB does not JOIN Users tables.

| Service | Typical DB |
|---|---|
| Users | Postgres / MySQL |
| Catalog | MongoDB (flexible attrs) |
| Orders | Postgres (transactions) |
| Search | Elasticsearch |
| Sessions / cache | Redis |

**Why:** independent deploy/scale/schema evolution.  
**Cost:** no cross-service SQL JOIN — you **compose in the app** or use events / read models.

### Cross-service data patterns

1. **API composition** — Gateway/BFF calls Users + Orders, merges JSON  
2. **CQRS / read model** — Orders keeps a local `customerName` copy updated via events  
3. **Saga** — multi-step business flow across services with compensations (not one ACID txn)

**Distributed transaction trap:** avoid 2PC across microservices in interviews unless asked — prefer **saga + idempotent handlers**.

**Saga (choreography) example — place order:**
```
Orders: create order (PENDING) → publish OrderCreated
Payments: charge card → publish PaymentCompleted | PaymentFailed
Orders: mark PAID or cancel (compensation)
Inventory: reserve stock on PaymentCompleted
```

---

## 6. GraphQL in a microservices world

**GraphQL** = query language + single endpoint. Client asks for exact fields.

```graphql
query {
  order(id: "o1") {
    id
    total
    user { name email }   # may resolve from another service
  }
}
```

### Where it sits

```
Client → GraphQL Gateway / BFF → REST/gRPC microservices
```

Resolvers fetch from underlying services (or a federated graph).

| REST + Gateway | GraphQL Gateway |
|---|---|
| Many endpoints | One endpoint, flexible queries |
| Over/under fetching | Client picks fields |
| Simple caching at HTTP | Caching trickier (GET query / persisted queries) |

**Federation (Apollo):** each service owns a piece of the schema; gateway stitches them.

**Interview cautions:**
- GraphQL is **not** a replacement for service boundaries — still call microservices underneath  
- Protect against expensive queries (depth/complexity limits)  
- N+1 in resolvers → DataLoader  
- Auth still at gateway + per-field/service authorization  

**When to say GraphQL:** mobile/web needs many shape variants of the same data; BFF team wants one contract.  
**When REST is fine:** simple CRUD, public APIs, strong HTTP cache needs.

---

## 7. Event-driven architecture (EDA)

**Idea:** services communicate by publishing **facts that happened** (`OrderCreated`), not by commanding each other for everything.

```
Orders                          Notifications
  │ publish OrderCreated              │
  └──────────► Kafka/NATS ───────────►│ send email
                     │
                     └──────────────► Analytics
```

**Benefits:** loose coupling, fan-out to many consumers, smoother traffic spikes (buffer in the log/queue).  
**Costs:** eventual consistency, harder debugging, need idempotency.

### Commands vs events

| | Command | Event |
|---|---|---|
| Meaning | "Do this" | "This happened" |
| Example | `ChargeCard` | `PaymentCompleted` |
| Coupling | Knows a target | Publisher doesn't know consumers |

### Guarantees you must mention

- **At-least-once delivery** is common → consumers must be **idempotent** (process same event twice safely)  
- Store `eventId` processed set, or use upsert by natural key  
- **Ordering** per key (e.g. `orderId`) — not global order across all keys  
- **Schema** for payloads (JSON Schema / Avro / Protobuf) so consumers don't break

### Outbox pattern (important)

Don't: write DB + publish message in two steps (one can fail).  
Do: write business row + **outbox row** in same DB transaction → publisher relay reads outbox → Kafka. Keeps "save + emit" consistent.

---

## 8. Kafka in microservices

**Apache Kafka** = distributed **commit log**. Producers append events to **topics**; consumers read at their own pace.

```
Producer → Topic (partitions) → Consumer Group
```

| Concept | Meaning |
|---|---|
| **Topic** | Named stream (`orders.created`) |
| **Partition** | Split for parallelism; **key** (e.g. orderId) keeps order inside a partition |
| **Consumer group** | Competing consumers — each message goes to one member of the group |
| **Offset** | Position in the log — can replay history |
| **Retention** | Keep data for time/size even after read |

**Why Kafka for microservices:**
- High throughput event bus  
- Multiple independent consumer groups (notifications + analytics both read `OrderCreated`)  
- Replay for new services / recovery  

**Node usage (concept):** `kafkajs` producer/consumer; commit offsets after successful DB write (or use outbox).

**Interview pitfalls:**
- Don't treat Kafka as a DB (though log compaction exists)  
- Hot partition if key cardinality is bad  
- Rebalancing when consumers join/leave  

---

## 9. NATS in microservices

**NATS** = lightweight cloud-native messaging (often simpler ops than Kafka).

| Mode | Use |
|---|---|
| **Core pub/sub** | Fire-and-forget events, request/reply |
| **Queue groups** | Load-balanced workers (like consumer group) |
| **JetStream** | Persistence, ack, replay (Kafka-like features) |

```js
// Conceptual — publish / subscribe
await nc.publish("orders.created", sc.encode(JSON.stringify(event)));

const sub = nc.subscribe("orders.created", { queue: "notifications-workers" });
for await (const msg of sub) {
  await sendEmail(JSON.parse(sc.decode(msg.data)));
}
```

### Kafka vs NATS (say this clearly)

| | Kafka | NATS |
|---|---|---|
| Strength | Durable log, replay, huge throughput, analytics | Simple, fast, low latency, easy request/reply |
| Complexity | Higher ops / conceptual weight | Lighter; JetStream adds persistence |
| Typical fit | Event backbone, many consumer groups, retention | Service mesh messaging, commands, lighter events |
| Node ecosystem | kafkajs | nats.js |

**Pick line for interviews:**  
*"Kafka when we need a durable event log and replay. NATS when we want simple, fast messaging; JetStream if we need persistence."*

Also know **RabbitMQ** (queues, routing keys) as a third option — classic work queues.

---

## 10. Sync vs async — when to use which

| Need | Prefer |
|---|---|
| User waits for answer now | Sync HTTP/gRPC |
| Side effects (email, metrics) | Events |
| Multi-service workflow | Saga + events |
| Spike traffic / buffer | Queue/log (Kafka/NATS) |
| Strong consistency in one domain | Single service + its DB transaction |

---

## 11. Resilience & ops (always asked)

- **Timeouts + retries + circuit breaker + bulkhead**  
- **Idempotency keys** on payments/order create  
- **Health checks** + graceful shutdown  
- **Distributed tracing** (OpenTelemetry) — one trace across gateway → services  
- **Structured logs** with `service`, `requestId`, `userId`  
- **Version APIs** (`/v1`) and event schemas carefully  
- Deploy independently; use feature flags for risky cuts

---

## 12. Common interview Q&A

**Q: Monolith vs microservices — how do you choose?**  
A: Start modular monolith unless team size, scale, or release independence clearly demand services. Microservices trade code simplicity for distributed complexity.

**Q: How does the API Gateway talk to Node services?**  
A: Reverse proxy / HTTP to internal service URLs (K8s DNS). Gateway verifies auth, then forwards `Authorization` / user id headers. Services enforce authorization on their data.

**Q: How do services share data without a shared DB?**  
A: Sync API calls for request-time needs; events + local read models for autonomy; never couple via another team's tables.

**Q: What is a saga?**  
A: Sequence of local transactions across services coordinated by events (or an orchestrator), with compensating actions on failure — not one global ACID transaction.

**Q: GraphQL vs REST for microservices?**  
A: GraphQL often as a BFF/gateway over REST/gRPC services. Microservices stay separate. GraphQL helps clients; it doesn't remove service boundaries.

**Q: Kafka at-least-once — how do you handle duplicates?**  
A: Idempotent consumers: unique `eventId` table, or upsert by business key; commit offset after successful side effect (or outbox).

**Q: Partition key choice?**  
A: Key by entity id you need ordered updates for (`orderId`). Bad key → skew/hot partition.

**Q: How do you debug a failed request across 5 services?**  
A: Trace id from gateway through every hop; centralized logs/metrics; see which span timed out or returned 5xx.

---

## 13. One-minute closing pitch

"Microservices split the system by business capability with **separate deploys and databases**. Clients enter through an **API Gateway** that handles auth and routing to Node services over internal HTTP/gRPC. For side effects and decoupling we use **events** on **Kafka** (durable log, replay) or **NATS** (lightweight messaging / JetStream). Cross-service workflows use **sagas** and **idempotent** consumers — not distributed ACID. GraphQL, if used, sits as a **BFF** on top of those services, not instead of them."
