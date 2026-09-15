import type { LldTopic } from "./types";

export const PROBLEMS2: LldTopic[] = [
  {
    slug: "logger-system",
    title: "Design Logger System",
    tag: "Interview Question",
    body: `Logger design combines three patterns — which is why interviewers love it. Requirements: log levels (DEBUG, INFO, WARN, ERROR), multiple outputs (console, file, remote), never slow the app (async), and file rotation (new file by size or time). Every request logs, the system never stalls.

Design a Logger singleton entry point, level filtering as Chain of Responsibility (messages below the set level never show), and outputs as Observer sinks (console, file, remote attach and detach freely). Heavy work — file writes, network calls — runs on a background worker queue so app threads never block.

## Core classes

Logger (singleton entry, sets level), Handler chain (level filter), Sink implementations (console, file, remote), AsyncWorker (writes from queue), Rotator (switches files by size or time).

\`\`\`js
// Level chain filters, sinks write, worker runs in background
class Logger {
  constructor() { this.level = 'INFO'; this.sinks = []; }
  addSink(sink) { this.sinks.push(sink); } // sinks attach Observer-style
  log(level, msg) {
    if (!this.passes(level)) return; // chain: below level never shows
    for (const s of this.sinks) s.write(level, msg);
  }
}
\`\`\`

## Key decisions

- **Ordered levels:** DEBUG < INFO < WARN < ERROR — set once, filter everything below.
- **Sinks attach freely:** runtime attach and detach, logger never cares who listens.
- **Async writes:** queue plus worker — app threads never block on disk or network.
- **Rotation policy:** size or time based — full disks are a failure mode.

## Walkthrough

The app calls logger.info('order placed') — level INFO passes the filter. The console sink prints immediately; the file sink queues to the background worker. Past 10MB the rotator opens a fresh file. DEBUG messages die at the filter before costing anything.

**Mistake:** "Write every log synchronously to file."
**Correct:** "Level chain filters, Observer-style sinks, background worker writes, rotation policy set."

## Keep in mind

- Three patterns together: Chain (levels), Observer (sinks), Singleton (entry).
- Levels are ordered: everything below the set level gets cut.
- Writes must be async — app threads never block.
- Rotation policy is mandatory — full disks are failures.
- Sinks attach and detach at runtime — the logger never cares.`,
  },
  {
    slug: "rate-limiter",
    title: "Design Rate Limiter",
    tag: "Interview Question",
    body: `Rate Limiter protects APIs from abuse and overload. Requirements: per-user or per-IP limits (100 requests per minute), multiple rules at once, minimal latency overhead, and clear rejection responses with retry guidance. Every request passes through it, so it must be fast and never the bottleneck.

Two algorithms dominate. Token Bucket: tokens refill at a fixed rate, each request spends one — bursts allowed up to bucket size. Sliding Window: count requests in the trailing window — smoother, stricter. Counters live in Redis with TTLs so limiters work across servers. Rejections return 429 plus a Retry-After header.

## Core classes

RateLimiter (rule evaluation), Rule (limit, window, key), CounterStore (Redis-backed counts with TTL), TokenBucket and SlidingWindow strategies.

\`\`\`js
// Token bucket: refill by time, spend per request
class TokenBucket {
  constructor(rate, capacity) { this.rate = rate; this.cap = capacity; this.tokens = capacity; this.last = Date.now(); }
  allow() {
    const now = Date.now();
    this.tokens = Math.min(this.cap, this.tokens + (now - this.last) * this.rate / 1000);
    this.last = now;
    if (this.tokens < 1) return false; // rejected
    this.tokens -= 1;
    return true;
  }
}
\`\`\`

## Key decisions

- **Algorithm per need:** token bucket allows bursts; sliding window stays strict.
- **Distributed counters:** Redis with TTL — local counters diverge across servers.
- **Rejection contract:** 429 plus Retry-After header, never silent drops.
- **Fail policy:** fail-open (allow) vs fail-closed (deny) when Redis is down — decide upfront.

## Walkthrough

A user fires 120 requests in a minute against a 100-per-minute bucket — first 100 pass, token count hits zero, request 101 gets 429 with Retry-After. Next minute refills and traffic flows. A second rule (1000 per hour) runs alongside without interference.

**Mistake:** "Fixed windows without edge handling."
**Correct:** "Token bucket for bursts or sliding window for strictness — Redis-backed, 429 with Retry-After."

## Keep in mind

- Token bucket allows bursts; sliding window stays strict.
- Counters belong in Redis with TTL for multi-server setups.
- Always return 429 plus Retry-After — never drop silently.
- Decide fail-open vs fail-closed for Redis outages upfront.
- Multiple rules stack — per-minute plus per-hour is normal.`,
  },
  {
    slug: "notification-system",
    title: "Design Notification System",
    tag: "Interview Question",
    body: `Notification System fans out across email, push, and SMS without spamming users or dropping alerts. Requirements: multi-channel templates, user preferences (opt-outs, quiet hours), retries with backoff, rate limits per provider, and delivery tracking.

Design Notification (channel, recipient, content, priority), Template per channel, PreferenceStore (who wants what, when), and a Dispatcher routing through provider adapters. High-priority alerts jump the queue; marketing digests batch hourly. Failed sends retry with exponential backoff, then land in a dead-letter queue for inspection.

## Core classes

Notification, Template (per channel rendering), PreferenceStore (opt-outs, quiet hours), Dispatcher (routing plus priority), Provider Adapters (email, push, SMS), RetryQueue with backoff.

\`\`\`js
// Preferences gate, priority orders, providers send
class Dispatcher {
  send(notification) {
    if (!this.prefs.allowed(notification)) return 'skipped'; // opt-out or quiet hours
    const provider = this.forChannel(notification.channel);
    return this.withRetry(() => provider.send(notification)); // backoff inside
  }
}
\`\`\`

## Key decisions

- **Preferences gate everything:** opt-outs and quiet hours checked before sending.
- **Priority queues:** alerts jump ahead of digests — separate lanes.
- **Provider adapters:** one interface per channel — swap vendors freely.
- **Retry with backoff plus DLQ:** transient failures retry, permanent ones park for review.

## Walkthrough

An order ships — the dispatcher checks preferences (push allowed, night quiet hours active → holds email variant). Morning arrives, the email sends via the provider adapter. A push fails twice — backoff retries, third failure parks it in the DLQ with the error attached.

**Mistake:** "Send everything synchronously inline."
**Correct:** "Preference-gated, priority-laned, adapter-sent, backoff-retried — with a DLQ at the end."

## Keep in mind

- Preferences (opt-outs, quiet hours) gate every send.
- Priority lanes separate alerts from digests.
- One adapter interface per channel — vendors swap freely.
- Retries use exponential backoff, then dead-letter queue.
- Track delivery per notification for debugging.`,
  },
  {
    slug: "payment-system",
    title: "LLD of Payment System",
    tag: "Interview Question",
    body: `A payment system routes money safely between customers, merchants, and banks. Requirements cover multiple payment methods (cards, UPI, netbanking, wallets), idempotent charge requests, webhook callbacks from banks, refunds, and full reconciliation. The non-negotiable invariant: never double-charge, never lose a payment state.

The design centers on Payment with a strict state machine (Initiated, Processing, Success, Failed, Refunded), an idempotency key on every charge so retries return the original result, and Strategy implementations per payment method behind one processor interface. Webhooks arrive out of order and duplicated — verify, deduplicate, then apply as transitions. A reconciliation job compares gateway records against bank settlements daily.

## Core classes

Payment (state machine), PaymentService (idempotency keys), Method Strategies (cards, UPI, netbanking, wallets), WebhookHandler (verify plus dedupe plus apply), ReconciliationJob (daily settlement match).

\`\`\`js
// Idempotency key plus state machine keeps money safe
class PaymentService {
  charge(idempotencyKey, money, method) {
    if (this.seen(idempotencyKey)) return this.previous(idempotencyKey);
    const payment = this.create(idempotencyKey, money); // Initiated
    return this.processor.forMethod(method).execute(payment); // transitions
  }
}
\`\`\`

## Key decisions

- **Idempotency key on every charge:** retries return stored results, never re-charge.
- **Strict state machine:** Initiated, Processing, Success, Failed, Refunded — no in-between states.
- **Webhooks distrusted:** untrusted, duplicated, unordered — verify, dedupe, then apply.
- **Daily reconciliation:** catches whatever automation misses against bank settlements.

## Walkthrough

A user pays 500 with an idempotency key — Payment opens Initiated, the UPI strategy executes, Processing turns Success. Network drops and the client retries with the same key — the stored Success returns, no second charge. A duplicate bank webhook arrives — deduped and ignored. Night reconciliation matches settlements cleanly.

**Mistake:** "New charge object per retry."
**Correct:** "Idempotency keys, strict states, verify-dedupe-apply webhooks, daily reconciliation — money code allows no shortcuts."

## Keep in mind

- Idempotency key on every charge: retries return stored results, never re-charge.
- Payment states form a strict machine: Initiated, Processing, Success, Failed, Refunded.
- Webhooks are untrusted, duplicated, and unordered: verify, dedupe, then apply.
- Method variety is a Strategy: cards, UPI, netbanking, wallets behind one interface.
- Daily reconciliation against bank settlements catches everything automation misses.`,
  },
  {
    slug: "shopping-cart",
    title: "Design Shopping Cart",
    tag: "Interview Question",
    body: `Shopping Cart holds intent between browsing and paying. Requirements: add, update, and remove items with quantities, price snapshots (prices change mid-shop), coupon application, persistence across sessions and devices, and expiration of abandoned carts.

Design Cart (user plus items), CartItem (product, quantity, price snapshot), and a PricingService computing totals with discounts and tax. Prices snapshot at add time — charging a changed price later breaks trust, so diffs surface explicitly at checkout. Guest carts merge into account carts on login. Abandoned carts expire after a window and optionally trigger reminders.

## Core classes

Cart (owner, items, status), CartItem (product, quantity, snapshot price), PricingService (totals, discounts, tax), CouponEngine (validates and applies).

\`\`\`js
// Snapshot prices at add time — never charge silently changed prices
class Cart {
  addItem(product, qty) {
    this.items.push({ product, qty, price: product.price }); // snapshot now
  }
  total() {
    return this.pricing.calculate(this.items); // discounts + tax inside
  }
}
\`\`\`

## Key decisions

- **Price snapshots:** freeze prices at add time; surface diffs at checkout, never silently charge.
- **Guest merge:** login merges guest cart into account cart, quantities combine.
- **Expiration:** abandoned carts expire; reminders are a separate scheduled flow.
- **Pricing centralized:** one service owns totals, discounts, and tax math.

## Walkthrough

A guest adds shoes at 2000 — price snapshots. Login merges the guest cart into the account cart. A coupon applies 10% off via the engine. Price rose to 2200 meanwhile — checkout shows the diff explicitly before charging the snapshot total. Thirty days idle — the cart expires.

**Mistake:** "Read live prices at checkout silently."
**Correct:** "Snapshot at add, surface diffs, merge on login, expire abandoned carts."

## Keep in mind

- Snapshot prices at add time — never silently charge changed prices.
- Guest carts merge into account carts on login.
- Abandoned carts expire; reminders are separate.
- One pricing service owns totals, discounts, and tax.
- Show price diffs explicitly before charging.`,
  },
  {
    slug: "coupons-shopping-cart",
    title: "LLD: Apply Coupons on Shopping Cart products",
    tag: "Interview Question",
    body: `Coupons on a cart test rule engines plus the Strategy and Chain combination. Requirements: a cart with items, multiple coupon types (percentage off, flat off, buy-one-get-one, free shipping), eligibility rules (minimum cart value, category restrictions, expiry, per-user limits), and stacking policies deciding which coupons combine.

Model Coupon with its type, rules, and validity window, plus a Discount face per coupon type behind one name. A CouponEngine validates eligibility, applies combinable coupons in a defined order, and returns an itemized price breakdown callers can audit. Application order matters financially — percentage discounts typically apply before flat ones — so the policy must be explicit.

## Core classes

Cart (items), Coupon (type, rules, validity), Discount faces per type (duck typing — same two methods), CouponEngine (validate, order, apply), Bill (itemized breakdown).

\`\`\`js
// Each coupon type keeps the same two methods (duck typing)
class PercentCoupon {
  eligible(cart, user) { /* expiry, min value, category, limits */ }
  apply(cart) { /* ... */ }
}
// Engine: validate, apply in policy order, bill with breakdown
\`\`\`

## Key decisions

- **Coupon types are Strategies:** percentage, flat, BOGO, free shipping.
- **Eligibility is a rule chain:** expiry, min value, category, per-user limits.
- **Application order changes the total:** policy must be explicit.
- **Stacking policy first:** combinable, exclusive, or best-only.

## Walkthrough

A 2000 cart holds a 10% coupon (min 1000) and a flat 200 coupon (min 1500). The engine validates both — both pass. Policy order applies percentage first (2000 to 1800), then flat (1800 to 1600) — itemized bill produced. An expired coupon would reject at step one with its reason.

**Mistake:** "Stack every coupon at once."
**Correct:** "Types as Strategies, eligibility as a chain, explicit order policy — checkout with an itemized bill."

## Keep in mind

- Coupon types are Strategies: percentage, flat, BOGO, free shipping.
- Eligibility is a rule chain: expiry, min value, category, per-user limits.
- Application order changes the total, so the policy must be explicit.
- Return an itemized breakdown so totals stay auditable.
- Stacking policy first: combinable, exclusive, or best-only.`,
  },
  {
    slug: "file-storage",
    title: "Design File Storage System",
    tag: "Interview Question",
    body: `File Storage (think Dropbox-lite) handles upload, sync, and sharing at scale. Requirements: file upload with resume, version history, sharing via links with permissions, delta sync (only changed chunks), and trash with restore.

Design User, StoredFile (metadata plus version list), Chunk (content-addressed blocks — same bytes stored once via hashing), and ShareLink (expiry plus permissions). Large uploads split into chunks, each hashed — unchanged chunks skip re-upload, which makes sync fast. Versions chain per file for history and rollback.

## Core classes

User, StoredFile (metadata, version chain), Chunk (hash plus bytes — deduplicated), ShareLink (expiry, permissions), SyncService (delta computation).

\`\`\`js
// Content-addressed chunks — same bytes stored once
class SyncService {
  upload(file) {
    const chunks = this.split(file); // fixed-size pieces
    for (const c of chunks) {
      const hash = this.hash(c);
      if (!this.store.has(hash)) this.store.save(hash, c); // new bytes only
    }
    return new StoredFile(file.name, chunks.map(c => this.hash(c)));
  }
}
\`\`\`

## Key decisions

- **Chunking plus hashing:** fixed-size pieces, content-addressed — dedup and resume come free.
- **Delta sync:** upload only changed chunks, never whole files twice.
- **Version chains:** every overwrite links back — history and rollback included.
- **Share links carry policy:** expiry plus read or write permissions on the link itself.

## Walkthrough

A user uploads a 100MB video — split into chunks, hashed, new bytes stored, a version recorded. Editing one scene re-uploads only changed chunks. Sharing creates a read-only link expiring in 7 days. Deleting moves to trash for 30 days before permanent removal.

**Mistake:** "Store whole files per version."
**Correct:** "Chunk, hash, dedupe — delta sync, version chains, policy-carrying share links."

## Keep in mind

- Fixed-size chunks with content hashing — dedup plus resume free.
- Delta sync uploads changed chunks only.
- Version chains give history and rollback.
- Share links carry expiry and permissions.
- Trash with restore precedes permanent deletion.`,
  },
  {
    slug: "task-scheduler",
    title: "Design Task Scheduler",
    tag: "Interview Question",
    body: `Task Scheduler runs jobs reliably — once, on cron, or after delays — with retries when workers fail. Requirements: schedule one-off and recurring tasks, at-least-once execution, retry with backoff, no duplicate runs across workers, and visibility into runs and failures.

Design Task (payload, schedule, retries left), Schedule (cron expression or delay), Worker pool pulling from a durable queue, and Run records tracking every attempt. A leader or atomic claim assigns each task to exactly one worker — two workers must never run the same task. Failed attempts requeue with exponential backoff until retries exhaust into a dead-letter queue.

## Core classes

Task (payload, schedule, retries), Scheduler (due-task scanning), Worker (claim plus execute), Run (attempt history), DeadLetterQueue (exhausted tasks).

\`\`\`js
// Atomic claim — exactly one worker runs each task
class Scheduler {
  dispatch() {
    for (const task of this.dueTasks()) {
      if (this.claim(task)) { // atomic: one winner only
        this.queue.push(task);
      }
    }
  }
}
\`\`\`

## Key decisions

- **Atomic claims:** exactly-once assignment via atomic claim or leader election.
- **Durable queue:** tasks survive restarts — in-memory scheduling loses work.
- **Backoff retries:** exponential delays, then dead-letter queue.
- **Idempotent tasks:** at-least-once execution demands tasks tolerate repeats.

## Walkthrough

A nightly report task becomes due — the scheduler claims it atomically, queues it, a worker executes. The worker crashes mid-run — the attempt times out, requeues with backoff, a second worker completes it. Three failures park it in the DLQ with full history for inspection.

**Mistake:** "In-memory timers for scheduled work."
**Correct:** "Durable queue, atomic claims, backoff retries, DLQ — tasks must survive restarts."

## Keep in mind

- Atomic claims give exactly-one-worker execution.
- Durable queue survives restarts — memory timers don't.
- Retries use exponential backoff, then dead-letter queue.
- Tasks must be idempotent under at-least-once execution.
- Every attempt gets a Run record for visibility.`,
  },
  {
    slug: "lru-cache",
    title: "Design LRU Cache",
    tag: "Interview Question",
    body: `LRU Cache is an almost-mandatory LLD problem: fixed capacity with O(1) get and put, evicting the least recently used entry when full. Requirements are just get, put, and capacity — but the O(1) constraint dictates the design.

The technique is HashMap plus doubly linked list: the map reaches any key in O(1), the list keeps order — head is freshest (MRU), tail is stalest (LRU). Gets refresh by moving nodes to the head; puts add at the head and evict from the tail past capacity. JavaScript shortcut: Map preserves insertion order — delete plus re-set refreshes, so a Map alone gives O(1) LRU.

## Core classes

LRUCache (capacity, map, head/tail), Node (key, value, prev, next). Gets refresh, puts evict from the tail.

\`\`\`js
// Map plus doubly linked list: O(1) get, O(1) put, O(1) evict
class LRUCache {
  constructor(capacity) { this.cap = capacity; this.map = new Map(); this.head = null; this.tail = null; }
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.refresh(node); // recently used — move to head
    return node.value;
  }
  put(key, value) { /* new node at head, evict tail past capacity */ }
}
\`\`\`

## Key decisions

- **Map for reach, list for order:** neither alone gives both O(1) operations.
- **Head fresh, tail stale:** keep the direction fixed or evictions go wrong.
- **Refresh on get:** reads count as use — forgetting this is the classic bug.
- **Evict from tail on put:** only past capacity, never before.

## Walkthrough

Capacity 2 — put(1,1), put(2,2) join at the head. get(1) returns 1 and moves the node to head. put(3,3) finds no room — tail (key 2) evicts. get(2) now returns -1. Every operation ran in O(1).

**Mistake:** "Track order with an array."
**Correct:** "Map for reach, list for order — refresh on get, evict tail on put, all O(1)."

## Keep in mind

- Map gives O(1) reach, list gives O(1) order — both are required.
- Head is freshest (MRU), tail is stalest (LRU) — fix the direction.
- Get refreshes too — not just put, the most forgotten line.
- Evict from the tail past capacity, never before.
- JS Maps preserve order — delete plus re-set is a valid shortcut.`,
  },
  {
    slug: "pubsub-system",
    title: "Design Pub-Sub System",
    tag: "Interview Question",
    body: `Pub-Sub in LLD form is HLD messaging shrunk to classes — the same ideas as Kafka and RabbitMQ without the servers. Requirements: topics to create, subscribe and unsubscribe, fan-out delivery to all subscribers, durable versus ephemeral choice, ordering per topic, and delivery guarantees.

Design Topic (subscriber list plus message log), Subscriber (callback plus offset), Message (id, payload, time), and Broker running it all. Ordering stays FIFO per topic. Delivery stays at-least-once with idempotent subscribers demanded — promising exactly-once is a distributed lie.

## Core classes

Topic (subscribers plus log), Subscriber (callback, offset), Message (id, payload, time), Broker (publish, subscribe, unsubscribe).

\`\`\`js
// Broker is the hub — peers never know each other (Mediator-like)
class Broker {
  constructor() { this.topics = new Map(); }
  subscribe(topic, subscriber) { /* join list, note offset */ }
  publish(topic, message) {
    const t = this.topics.get(topic);
    t.log.push(message); // stored when durable
    for (const s of t.subscribers) s.deliver(message); // fan-out
  }
}
\`\`\`

## Key decisions

- **Durable vs ephemeral first:** late joiners read history or they don't — decide upfront.
- **FIFO per topic:** global order promises never hold.
- **At-least-once plus idempotent:** duplicates will arrive — subscribers dedupe.
- **Slow subscribers:** drop or buffer policy needed, or the hub dies.

## Walkthrough

The order service publishes order.created — the broker logs it and delivers to all three subscribers (email, inventory, analytics). Slow inventory lags on offset while others advance. A new analytics subscriber joins and reads past events from the durable log.

**Mistake:** "Promise exactly-once delivery."
**Correct:** "Topic-wise FIFO, durable log, at-least-once delivery, idempotent subscribers — HLD Kafka in miniature."

## Keep in mind

- Peers talk through the hub — the Mediator pattern fits here.
- Decide durable vs ephemeral first — changing later hurts.
- Keep ordering FIFO per topic, never promise global order.
- Duplicates will arrive — demand idempotent subscribers.
- Set drop or buffer policy for slow subscribers.`,
  },
  {
    slug: "meeting-scheduler",
    title: "Design Meeting Scheduler",
    tag: "Interview Question",
    body: `Meeting Scheduler is intervals in LLD clothes. Requirements: users, meetings with time ranges, rooms, clash detection, recurring meetings, and notifications. Overlapping meetings must never share a room — that invariant drives the design, and rooms must stay minimal.

Design User, Meeting (start, end, attendees, room), Room, and Scheduler (book and cancel, clash checks, room allocation). Clash detection is interval overlap: a new meeting fits only where nothing overlaps. Minimum rooms come from classic interval partitioning — track end times in a min-heap. Recurring meetings split into a rule (every Monday) plus generated instances.

## Core classes

User, Meeting (range plus attendees plus room), Room, Scheduler (book, cancel, clash check, room allocate), RecurrenceRule.

\`\`\`js
// Overlap check is the whole game
class Scheduler {
  overlaps(a, b) { return a.start < b.end && b.start < a.end; }
  book(meeting) {
    for (const m of this.meetings) {
      if (this.overlaps(m, meeting)) throw new Error('Clash — pick another time');
    }
    meeting.room = this.allocateRoom(meeting);
    this.meetings.push(meeting);
  }
}
\`\`\`

## Key decisions

- **Overlap formula:** a.start < b.end && b.start < a.end — memorize this line.
- **Rooms minimal:** min-heap of end times — reuse free rooms, open new ones.
- **Recurring split:** store the rule, generate instances on demand — never infinite lists.
- **Timezone:** store everything in UTC, convert on display — interviewers notice this.

## Walkthrough

A user books 10-11 in Room A — no clash, confirmed. Another requests 10:30-11:30 — overlap caught, free Room B assigned. A third asks 10:15-10:45 with both rooms busy — rejected or waitlisted. Cancellation frees the room and notifies the waitlist.

**Mistake:** "Hardcode room counts."
**Correct:** "Catch clashes with the overlap formula, allocate rooms with a min-heap, generate recurrences from rules."

## Keep in mind

- Overlap formula memorized: a.start < b.end && b.start < a.end.
- Minimum rooms via min-heap — reuse free, open new.
- Recurring meetings store rules, never infinite instances.
- Keep all times in UTC — timezone bugs get caught in interviews.
- Notify the waitlist on cancellation — close the whole flow.`,
  },
  {
    slug: "ride-management",
    title: "Design Ride Management (Trip)",
    tag: "Interview Question",
    body: `Ride Management tracks a trip from request to receipt. Requirements: ride requests with pickup and drop, driver assignment, live location sharing during the trip, fare computation with surge, trip history per user, and split payments. The trip lifecycle is the backbone everything hangs on.

Design Rider, Driver (location plus status), Trip (rider, driver, route, status machine), and a TripManager owning assignment plus transitions. States run Requested, Matched, Arriving, Ongoing, Completed, Cancelled — guarded transitions, with cancel fees depending on state. Fare Strategy combines base, distance, time, and surge. History queries read the trip log, never live state.

## Core classes

Rider, Driver (location, status), Trip (route plus status machine), TripManager (assign plus transition), FareStrategy (base, distance, time, surge).

\`\`\`js
// Guarded transitions — illegal moves impossible
class Trip {
  constructor(rider, driver) { this.status = 'Requested'; }
  start() {
    if (this.status !== 'Matched') throw new Error('Cannot start yet');
    this.status = 'Ongoing';
  }
  complete(fareStrategy) {
    if (this.status !== 'Ongoing') throw new Error('Cannot complete yet');
    this.status = 'Completed';
    return fareStrategy.calculate(this);
  }
}
\`\`\`

## Key decisions

- **Lifecycle states:** Requested through Completed — every move guarded.
- **Assignment atomic:** one driver takes one trip — CAS on driver status.
- **Fare Strategy:** base, distance, time, surge combine without edits.
- **History from logs:** trip records answer history queries, never live objects.

## Walkthrough

A rider requests downtown to airport — nearest free driver matched atomically, trip Matched. Driver arrives, trip goes Ongoing with live location streaming. Arrival completes it — fare computed with 1.2x surge, split payment charged, both sides rated. History later lists the trip from logs.

**Mistake:** "Free-form status strings updated anywhere."
**Correct:** "Guarded lifecycle states, atomic assignment, Strategy fares, history from logs."

## Keep in mind

- Trip lifecycle: Requested, Matched, Arriving, Ongoing, Completed, Cancelled.
- Guard every transition — illegal moves throw.
- Driver assignment must be atomic — one driver, one trip.
- Fare math belongs in a Strategy: base, distance, time, surge.
- History queries read trip logs, never live state.`,
  },
];
