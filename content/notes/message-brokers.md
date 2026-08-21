# Message brokers, queues & pub/sub

> **Goal:** Understand why systems talk through a broker, how a **queue** differs from **pub/sub**, and when to pick **RabbitMQ**, **Kafka**, or **NATS (JetStream)** — in language you can reuse in a design interview. Complements [HLD notes](/notes/system-design-hld). Topic split follows [Karan Pratap Singh — System Design](https://www.karanpratapsingh.com/courses/system-design) (Message Brokers, Message Queues, Publish-Subscribe).

---

## The problem messaging solves

Picture a food-delivery app. A user taps **Place order**. That one tap wants many things to happen:

- charge the card
- notify the restaurant
- find a rider
- send a push notification
- write an analytics event

If the order API **calls each of those services itself**, three bad things show up:

1. **Coupling** — the order service must know every other service, its URL, and whether it is up.
2. **Slow requests** — the user waits for the slowest dependency. A payment timeout becomes *their* timeout.
3. **Traffic spikes** — a lunch rush that the restaurant service cannot handle also knocks over the order API.

A **message broker** sits in the middle. The order service writes one event — `OrderPlaced` — and moves on. Other services read that event when they can. The user gets a fast "order received". Heavy work happens in the background.

**That is the whole idea:** senders do not wait on receivers, and receivers do not need to know who sent the message.

**When you do not need a broker:** a single service, a request that must succeed or fail together in one database transaction, or a simple CRUD app. Do not add Kafka because it is fashionable.

---

## Message brokers

A **message broker** is software that takes messages from producers, stores or routes them, and delivers them to consumers. Producers and consumers never talk to each other directly.

The broker can:

- **Decouple** services written in different languages
- **Buffer** work when consumers are slow or down
- **Route** a message to one worker, or to many subscribers
- **Retry** delivery when something fails

Think of the broker as a **post office**. You drop a letter. You do not walk it to the recipient. The post office decides the route, holds it if the house is empty (within limits), and can deliver a copy to more than one address if you ask.

### Two distribution models

Almost every broker you will meet is some mix of these two:

| Model | Everyday picture | Who gets the message? |
|-------|------------------|------------------------|
| **Point-to-point (queue)** | A ticket rail in a kitchen. One cook takes the next ticket. | **One** consumer. If three cooks share the rail, each ticket still goes to only one cook. |
| **Publish-subscribe (topic)** | A radio station. Anyone tuned in hears the song. | **Every** subscriber gets a **copy**. |

A kitchen ticket is a **job** (resize this image). A radio broadcast is an **event** (this order was placed — analytics, search, and email may all care).

Same physical product can do both. RabbitMQ, Kafka, and NATS all support "one worker" and "many listeners" with different knobs. The model in your **head** matters more than the brand name.

### Broker vs "event streaming" vs ESB

| | Message broker (classic) | Event streaming (log) | ESB (enterprise bus) |
|--|--------------------------|------------------------|----------------------|
| Job | Route and deliver messages | Keep an ordered history you can replay | Heavy integration hub with lots of transforms |
| Typical | RabbitMQ, SQS, Core NATS | Kafka, NATS JetStream, Pulsar | Older enterprise products |
| Feel | Mailbox: take a letter, it is gone | Notebook: read a page, the notebook stays | One giant adapter for the whole company |

**Interview translation:** microservices usually want a **lightweight broker or a log**, not a central ESB that every team must configure.

---

## Message queues

A **message queue** is asynchronous, **one-message-one-consumer** communication. Producers put work on a list. Consumers pull (or get pushed) items off that list and process them.

```
Producer  →  [ msg1 | msg2 | msg3 ]  →  Consumer
                  the queue
```

### How it works

1. A **producer** publishes a job (`ResizeImage { imageId }`) and often tells the user "we're on it" immediately.
2. The message **sits in the queue** until a consumer is free.
3. A **consumer** takes the job, does the work, then **acks** (acknowledges) it.
4. After a successful ack, the broker **removes** the message (classic queue). If the consumer crashes before ack, the message becomes visible again.

If **three consumers** share one queue, they are **competing consumers**. Work is load-balanced. That is still point-to-point — each message is processed once, not three times.

### Why queues help

- **Decoupling** — upload API does not import the ffmpeg library. A worker does.
- **Smoothing spikes** — 10,000 uploads in one minute become a backlog workers drain over ten minutes.
- **Retries** — a failed job can return to the queue instead of failing the user's HTTP request.
- **Independent scale** — add more workers on the consumer side without touching the producer.

### Push vs pull

| Style | Meaning | Typical |
|-------|---------|---------|
| **Pull** | Consumer asks "any work?" | Kafka, SQS, NATS JetStream pull consumers |
| **Push** | Broker delivers when a message arrives | RabbitMQ default, SNS, Core NATS |
| **Long poll** | Pull, but wait a few seconds if the queue is empty | SQS |

Push feels simpler. Pull gives the consumer control over rate (natural **backpressure**).

### Features you should know by name

**FIFO.** Oldest message first. Needed when "create user" must happen before "send welcome email" for the *same* user. Global FIFO across a huge queue is expensive; most systems give you FIFO **per key** (user id, order id).

**Delayed / scheduled delivery.** "Retry this in 30 seconds." Useful for backoff. Not the same as a cron job — it is still one message, just not visible yet.

**Dead-letter queue (DLQ).** After N failures, move the message aside instead of blocking the main queue forever. Humans (or a debugger service) inspect the DLQ. Without a DLQ, one bad JSON blob can stall a FIFO queue.

**Poison message.** A message that *cannot* be processed (bad schema, missing field). It is not "poison pill" in the shutdown-signal sense — it is a landmine. DLQ + max retries is the fix.

**Backpressure.** If producers are faster than consumers, the queue grows. Memory fills, disk thrashes, latency explodes. Limit queue depth, slow producers (HTTP 503 / retry later), or scale consumers. A queue is a **shock absorber**, not infinite storage.

**Task queues.** Same idea, specialized for "run this function with these args" (image resize, PDF generate, email). Celery, BullMQ, Sidekiq sit on Redis/Rabbit. For interviews, "background worker + queue" is enough.

**Security.** Brokers authenticate producers/consumers, encrypt in transit (TLS), and often encrypt at rest. Do not put raw card numbers in a message body.

---

## Publish-Subscribe

**Pub/sub** is also async, but the intent is **broadcast**. A producer **publishes** to a **topic** (or subject). Every **subscriber** currently interested in that topic gets a copy — and each subscriber can do something *different* with it.

```
                    ┌─► Analytics (count orders)
Producer  →  topic ─┼─► Search indexer
                    └─► Push notification
```

The publisher does **not** keep a list of listeners. New services can subscribe later without changing the producer. That is the superpower.

### How it differs from a queue

| | Queue | Pub/sub |
|--|-------|---------|
| Copies | One | One per subscriber |
| Intent | **Do this work** (command / job) | **This happened** (event) |
| Producer knowledge | Often knows "this is the resize queue" | Should not know who is listening |
| Typical delivery | Stored until consumed | Often pushed immediately (some systems still persist) |

A queue answers: *"Who will process this job?"*  
Pub/sub answers: *"Who cares that this happened?"*

### Features

**Fan-out.** One publish, many parallel consumers. This is how `OrderPlaced` can hit billing, kitchen, and notifications at the same time.

**Filtering.** A subscriber may only want `order.created` from `region=IN`, not every message on `orders`. Brokers filter by routing key (RabbitMQ), subject wildcards (NATS), or record headers — so you do not ship everything to everyone and filter in app code.

**Durability.** "If my subscriber was down, do I still get the message?" Core pub/sub (Core NATS, basic Redis Pub/Sub, some SNS setups) says **no** unless you add persistence (JetStream, Kafka, SNS→SQS). Always ask this in a design.

**Multiple endpoints.** Cloud pub/sub (SNS, Google Pub/Sub) can push to queues, HTTP webhooks, and functions. The topic is the **meeting point**.

### A hybrid you will use constantly

Real systems mix both:

1. Publish `OrderPlaced` to a topic (fan-out).
2. Each downstream team **binds its own queue** to that topic.
3. Inside that team, **several workers compete** on *their* queue.

You get broadcast **across** teams and load-balancing **inside** a team. Kafka consumer groups and RabbitMQ "fanout/topic exchange + one queue per service" are this pattern with different names.

---

## Delivery guarantees

This is the section interviewers poke. Be honest: **exactly-once is hard**. Most production systems are **at-least-once + idempotent consumers**.

| Guarantee | What it means | What you risk | When it is OK |
|-----------|---------------|---------------|---------------|
| **At-most-once** | Send and forget. No retry (or drop on failure). | Lost messages | Metrics you can miss, ephemeral presence |
| **At-least-once** | Retry until ack. After a crash you may see the message again. | Duplicates | Almost everything (payments, email, orders) *if* consumers are idempotent |
| **Exactly-once** | Appears once as a *side effect* | Complexity, locking, broker-specific transactions | Ledgers, some Kafka pipelines — still design for duplicates |

**Idempotent consumer** means processing the same message twice does not double-charge, double-email, or double-insert.

Practical recipe:

1. Put a stable **`eventId`** (or idempotency key) on every message.
2. Consumer writes to a `processed_events` table (or unique constraint on `orderId + eventType`).
3. If the id is already there, **ack and skip**.

```
message: { eventId: "evt_91", type: "charge", orderId: "ord_7", amount: 499 }

consumer:
  1. INSERT INTO processed_events(event_id) — unique
  2. If conflict → already done → ack
  3. Else charge, then ack
```

**Ack timing:** ack **after** the side effect succeeds. Ack-before-work is at-most-once (you can lose work). Work-without-ack is at-least-once (you can duplicate). There is no free lunch.

**"Exactly-once" in Kafka** (idempotent producer + transactions) reduces duplicates *inside Kafka*. Your consumer still needs a unique key if it writes to a database. Say *"effectively once"* in interviews.

---

## Queue vs log

This one distinction explains 80% of RabbitMQ vs Kafka arguments.

| | **Queue** (mailbox) | **Log** (notebook) |
|--|---------------------|---------------------|
| After consume | Message is **gone** | Message **stays** until retention expires |
| Replay | Usually no (unless you built extra storage) | Yes — rewind an offset |
| Many independent readers | Need a copy per reader (extra queues) | Cheap — each consumer group tracks its own position |
| Typical question | "Did someone take this job?" | "What is the history of this stream?" |

```
QUEUE (RabbitMQ classic, SQS)
  [A][B][C]  -- consumer takes A -->  [B][C]
  A is no longer in the broker for anyone else

LOG (Kafka, JetStream, RabbitMQ Streams)
  [A][B][C][D][E]   offsets →
  consumer group 1 at offset 3
  consumer group 2 at offset 1   (still catching up)
  both can read the same A, B, C
```

Use a **queue** when the message is a *unit of work* that should happen once.  
Use a **log** when the message is a *fact* that many systems will want, including tomorrow's new service that needs to backfill.

---

## RabbitMQ

**RabbitMQ** is a traditional **message broker**. It is excellent at **routing jobs** and **reliable task delivery**. Default mental model: AMQP **exchanges + queues**, not a long event history.

### Building blocks

```
Producer  →  Exchange  →  (binding + routing key)  →  Queue  →  Consumer
```

- **Exchange** — where producers publish. It does not store messages; it **routes**.
- **Queue** — where messages wait. Consumers subscribe to queues, not to exchanges.
- **Binding** — a rule: "this queue wants messages that match X."
- **Routing key** — a label on the message (for example `order.created.us`).

### Exchange types (this is RabbitMQ's superpower)

| Type | Behavior | Use |
|------|----------|-----|
| **Direct** | Exact routing-key match | `payments` key goes to the payments queue |
| **Fanout** | Ignore the key; copy to **every** bound queue | True broadcast |
| **Topic** | Wildcard match (`order.*`, `order.#`) | `order.created.us` vs `order.shipped.eu` |
| **Headers** | Match on header map instead of a key | Rare; when a string key is not enough |

`*` = one word. `#` = zero or more words. So `order.#` catches `order.created` and `order.created.us`.

### Acknowledgements and prefetch

Consumers **ack** after success, **nack/reject** on failure (requeue or drop to DLX). **Prefetch** (QoS) limits how many unacked messages a consumer may hold — that is Rabbit's backpressure knob. Prefetch of 1 is fair but slower; a modest prefetch is the usual default.

### What RabbitMQ is good at

- Background jobs and work queues
- Complex routing (region, event type, priority)
- Request/reply (RPC-style) over AMQP
- Multiple protocols (AMQP, MQTT, STOMP) when you integrate weird clients
- Moderate throughput with strong "this job is in a mailbox" semantics

### What it is not

- A data lake. Classic queues are **not** built for "replay last 7 days of events" (RabbitMQ **Streams** exist if you need log-like behavior — still not Kafka's ecosystem).
- The first pick for millions of events per second of click analytics.

**Interview phrase:** *"RabbitMQ if I need flexible routing and competing consumers for jobs. Messages are consumed and removed — I am not building an event history."*

---

## Kafka

**Apache Kafka** is a **distributed log**. You do not "take a letter from a mailbox". You **append** records to a topic, and consumers **read by offset**. The same data can feed many teams, and a new team can **replay from the beginning** (within retention).

### Building blocks

```
Topic "orders"
  partition 0:  [e0][e1][e2]...     consumer A
  partition 1:  [e0][e1]...         consumer B
  partition 2:  [e0][e1][e2][e3]    consumer C
                 ↑
           same consumer group — each partition has at most one consumer
```

- **Topic** — a named stream (`orders`, `page-views`).
- **Partition** — a topic is split into ordered logs. **Ordering is per partition, not global.**
- **Offset** — the consumer's bookmark ("I have read up to 1842").
- **Consumer group** — a team of consumers sharing work. Kafka assigns each partition to **one** consumer in the group.
- **Key** — records with the same key (for example `userId`) go to the **same partition**, so that user's events stay in order.

### Consumer groups = queue *and* pub/sub

This is the Kafka idea people undersell:

- **One group** (`billing-service`, 8 instances): each `OrderPlaced` is processed **once** by that service. Queue-like.
- **Second group** (`search-indexer`): it also sees **every** `OrderPlaced`. Pub/sub-like.
- Scale a group by adding instances — but you cannot have more useful instances than **partitions**.

Want 20 parallel billing workers? You need at least 20 partitions (and a key that does not collapse everything onto one of them).

### Retention and replay

Messages stay for a time (`7 days`) or size budget, **whether or not** anyone has read them. Consumers can:

- continue from last committed offset (normal)
- rewind to an old offset (bug fix, rebuild a cache)
- start from `earliest` (new service backfill)

That is why Kafka shows up in **analytics, CDC, activity feeds, and event-driven designs**. The log *is* the history.

### Ordering, keys, and hot partitions

- Need order for one entity? **Partition by that entity's id.**
- Need global order? One partition — and you just threw away parallelism. Usually wrong.
- **Hot partition:** a celebrity `userId` as the key funnels huge traffic onto one partition. Same problem as a hot shard in a database. Mix a better key or isolate VIPs.

### What Kafka is good at

- High throughput event streams (often hundreds of thousands+ messages/sec when tuned)
- Many independent consumers of the same data
- Replay, lag monitoring, "rebuild this read model from events"
- Ecosystem: Kafka Connect (ingest/sink), Schema Registry, stream processors

### What it is not

- A simple job queue for 50 emails a minute (operationally heavy)
- A low-latency RPC bus (p50 can be fine; it is still a disk log, not a nanosecond messenger)
- Automatic "exactly-once in my Postgres table" — you still design idempotency

**Interview phrase:** *"Kafka is a durable partitioned log. Consumer groups let each service read independently. I pick a partition key for local ordering, accept lag, and make consumers idempotent."*

---

## NATS and JetStream

**NATS** is a small, fast **messaging system**. It feels like the opposite of Kafka's moving parts: a binary you can run quickly, subject-based pub/sub, and optional persistence.

There are **two layers**. Mixing them up is the usual confusion.

### Core NATS (no JetStream)

Core NATS is **ephemeral pub/sub** plus a few extras:

- Publish to a **subject**: `orders.created`, `sensors.temp.device-9`
- Subscribe with wildcards: `orders.*` (one token), `orders.>` (rest of the subject)
- **Queue groups:** several subscribers share a group name → each message goes to **one** of them (competing consumers)
- **Request-reply** is built in (service A asks, service B answers on a reply subject)

If nobody is listening when you publish, **the message is gone**. There is no disk copy. Latency is extremely low (often sub-millisecond on a local network). Memory and ops cost stay small.

Use Core NATS for:

- Service-to-service chatter ("what's the price of ride X?")
- Live fan-out where a missed tick is acceptable (presence, telemetry you sample anyway)
- Replacing a mesh of ad-hoc HTTP calls between internal services

Do **not** use Core NATS as your source of truth for payments or orders.

### JetStream (persistence on NATS)

**JetStream** is a layer *on* NATS. It stores messages in **streams** and lets **consumers** read them with acks, replay, and durability — Kafka-shaped ideas with a NATS-shaped API.

| JetStream idea | Meaning |
|----------------|---------|
| **Stream** | Durable log of messages matching some subjects (`orders.>`) |
| **Consumer** | How an app reads a stream: durable name, start at first/last/time/sequence, ack policy |
| **Push or pull** | Broker pushes, or app pulls (pull is nicer for backpressure) |
| **Replay** | New consumer can start from the beginning of the stream |
| **KV / Object store** | Bonus: key-value and blob storage built on streams |

So:

- **Core NATS** = shout in a room
- **JetStream** = shout, and also write it in a notebook for anyone who shows up late

### NATS vs Kafka vs RabbitMQ (honest)

JetStream can replace Kafka for **many mid-size event workloads** (simpler ops, shorter retention, fewer ecosystem tools). Kafka still wins when you need a huge ecosystem, very long retention, Connect/CDC, or well-worn "company event bus" practices.

NATS does **not** try to copy RabbitMQ's exchange types. Routing is **subjects + wildcards**, not a graph of bindings. That is simpler and less flexible for "priority + header + alternate-exchange" topologies.

**Interview phrase:** *"NATS for low-latency service messaging. JetStream when I want persistence and replay without standing up a Kafka cluster. Core NATS alone is not durable."*

---

## Choosing a broker

Start from the **workload**, not the logo.

| If you need… | Reach for | Why |
|--------------|-----------|-----|
| Job queue, retries, DLQ, fancy routing | **RabbitMQ** (or SQS if you are all-in on AWS) | Mailbox semantics, exchanges |
| Event history, many consumer teams, replay, analytics | **Kafka** | Partitioned log, consumer groups |
| Tiny latency, request-reply, simple pub/sub | **Core NATS** | Ephemeral, fast, small |
| Log-like persistence, simpler than Kafka | **NATS JetStream** | Streams + consumers on NATS |
| Fully managed, "please no cluster to babysit" | **SQS + SNS**, cloud Kafka, NATS cloud | Ops is a feature |

**A normal large system uses more than one.** Example: NATS between checkout services for RPC-like calls, Kafka as the company event log for analytics and search, RabbitMQ or SQS for "send this email / resize this image" workers.

### Decision questions (use these in interviews)

1. Is this a **command** (do work once) or an **event** (this happened)?
2. Must a **new service next year** replay old data?
3. Do we need **order** for a given key?
4. What happens if the consumer is **down for an hour**?
5. Can we tolerate **duplicates**? (If no, say how we dedupe.)
6. Who will **operate** this at 3 a.m.?

If you cannot answer (2) and (4), you are not ready to pick Kafka vs Rabbit vs NATS.

### Tiny examples

**Image upload.** API stores the file in S3, pushes `{imageId}` to a **queue**, returns 202. Workers resize. **RabbitMQ / SQS / BullMQ.** Not Kafka.

**Order placed.** Many systems must react, and data science will replay a week of orders. **Kafka topic** `orders` (or JetStream stream). Billing uses its own consumer group; search uses another.

**Live driver locations.** 10 updates/sec/driver, missing a point is OK, need sub-ms fan-out to the rider app. **Core NATS** or Redis Pub/Sub. Persist *snapshots* elsewhere if you need history.

**Payment capture.** At-least-once + **idempotency key**. Broker of choice is secondary to "never double charge."

---

## Patterns to remember

These show up in HLD interviews more often than broker brand names.

**Competing consumers.** Several workers share one queue / one consumer group. Throughput goes up. Watch prefetch and partition count.

**Fan-out on write.** Publish once; many subscribers. Twitter-style feeds sometimes use this too (different problem, same shape).

**Outbox (avoid dual-write).** Never `INSERT order` in Postgres and `publish()` to Kafka as two unrelated steps — one can succeed and the other fail. Write the event to an `outbox` table **in the same database transaction**, then a relay publishes to the broker.

**Inbox / processed-ids.** The consumer-side twin of outbox. Unique `eventId` before side effects.

**DLQ + retry with backoff.** Retry transient errors (network). Do not retry poison forever. Cap attempts, then DLQ, alert.

**Backpressure.** Slow consumers → growing lag (Kafka) or growing queue depth (Rabbit). Scale consumers, drop/sample non-critical events, or shed producer load.

**Schema.** Agree a contract (JSON + version field, or Avro/Protobuf + registry). Additive changes (`new optional field`) are safer than renaming. Producers should not break old consumers.

**Poison-pill (shutdown).** A special message that tells a worker "stop waiting, exit." Different from a poison *message* that fails processing. Same name family, different use. In interviews, prefer "graceful shutdown on SIGTERM" unless they ask.

**Saga / choreography.** Long business flow (book flight + hotel) as events between services, with compensating events on failure. The broker is the glue, not the transaction manager.

---

## Interview checklist

- [ ] Said **why** we are async (spike, slow work, decoupling) — not "because microservices"
- [ ] Named **queue vs pub/sub** and which this API needs
- [ ] Picked **RabbitMQ / Kafka / NATS** with one reason that matches the workload
- [ ] Called out **at-least-once** and **idempotent consumers**
- [ ] Mentioned **DLQ** and what happens if consumers die
- [ ] For Kafka: **partition key**, consumer groups, lag, not global order
- [ ] For NATS: Core vs **JetStream** (durability)
- [ ] For RabbitMQ: **exchange → queue**, competing consumers
- [ ] Avoided dual-write (**outbox**) if DB and broker must stay in sync
- [ ] Did not put Kafka on a 100 QPS CRUD service

**Maps to Karan's course:** [Message Brokers](https://www.karanpratapsingh.com/courses/system-design/message-brokers), [Message Queues](https://www.karanpratapsingh.com/courses/system-design/message-queues), [Publish-Subscribe](https://www.karanpratapsingh.com/courses/system-design/publish-subscribe). Company designs that use this: chat notifications, Twitter fan-out, Netflix transcode pipeline — see [HLD notes](/notes/system-design-hld).
