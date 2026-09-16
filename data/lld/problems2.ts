import type { LldTopic } from "./types";

export const PROBLEMS2: LldTopic[] = [
  {
    slug: "logger-system",
    title: "Design Logger System",
    tag: "Interview Question",
    body: `Logger design combines three patterns — which is why interviewers love it. Requirements: log levels (DEBUG, INFO, WARN, ERROR), multiple outputs (console, file, remote), never slow the app (async), and file rotation (new file by size or time). Every request logs, the system never stalls.

**Entities:** \`LogRecord\` (level, message, timestamp, context), \`Logger\` (entry point), \`Handler\` (filter chain), \`Sink\` (output destination), \`AsyncWorker\` (background queue), \`Rotator\` (file policy).

**Invariants:** A message below the configured minimum level is never emitted. Sinks must not block the caller thread. Rotation must never truncate an in-flight write. The singleton logger is the only public entry for application code.

**Patterns:** Singleton (one \`Logger\` instance), Chain of Responsibility (level handlers), Observer (sinks subscribe/unsubscribe at runtime), Producer–Consumer (async queue + worker).

Design a Logger singleton entry point, level filtering as Chain of Responsibility (messages below the set level never show), and outputs as Observer sinks (console, file, remote attach and detach freely). Heavy work — file writes, network calls — runs on a background worker queue so app threads never block.

## Core classes

Logger (singleton entry, sets level), Handler chain (level filter), Sink implementations (console, file, remote), AsyncWorker (writes from queue), Rotator (switches files by size or time).

\`\`\`ts
type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

interface LogRecord {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

interface Sink {
  write(record: LogRecord): void;
}

const LEVEL_ORDER: LogLevel[] = ["DEBUG", "INFO", "WARN", "ERROR"];

class Logger {
  private static instance: Logger;
  private minLevel: LogLevel = "INFO";
  private sinks: Sink[] = [];

  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }

  addSink(sink: Sink): void {
    this.sinks.push(sink);
  }

  private passes(level: LogLevel): boolean {
    return LEVEL_ORDER.indexOf(level) >= LEVEL_ORDER.indexOf(this.minLevel);
  }

  log(level: LogLevel, message: string): void {
    if (!this.passes(level)) return;
    const record: LogRecord = { level, message, timestamp: new Date() };
    for (const s of this.sinks) s.write(record);
  }
}
\`\`\`

## Key decisions

- **Ordered levels:** DEBUG < INFO < WARN < ERROR — set once, filter everything below.
- **Sinks attach freely:** runtime attach and detach, logger never cares who listens.
- **Async writes:** queue plus worker — app threads never block on disk or network.
- **Rotation policy:** size or time based — full disks are a failure mode.

## Real-world example

Production apps rarely hand-roll loggers; they compose libraries that mirror this design. **Winston** and **Pino** (Node.js) use level ordering, pluggable transports (console, file, HTTP), and async serialization so the event loop stays responsive. **Java Logback/SLF4J** chains appenders behind a single \`LoggerFactory\` entry point with rolling file policies.

- Winston \`transports\` map to Observer-style sinks; \`level\` on the logger is the chain cutoff.
- Pino writes JSON lines off-thread via worker threads — same async invariant as \`AsyncWorker\`.
- Log rotation in Logback (\`RollingFileAppender\`) matches size/time \`Rotator\` policies.
- Structured fields (\`context\` on \`LogRecord\`) align with OpenTelemetry trace IDs in modern stacks.

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

**Entities:** \`RateLimiter\` (evaluates rules), \`Rule\` (limit, window, key extractor), \`CounterStore\` (distributed counts), \`LimitResult\` (allowed, retryAfterMs).

**Invariants:** A rejected request never increments usage incorrectly. Rules keyed by user/IP must be independent. Clock skew across nodes must not double-count or skip windows when using shared storage.

**Patterns:** Strategy (Token Bucket vs Sliding Window), Composite (multiple rules per request), Facade (\`RateLimiter.allow(key)\` hides algorithm details).

Two algorithms dominate. Token Bucket: tokens refill at a fixed rate, each request spends one — bursts allowed up to bucket size. Sliding Window: count requests in the trailing window — smoother, stricter. Counters live in Redis with TTLs so limiters work across servers. Rejections return 429 plus a Retry-After header.

## Core classes

RateLimiter (rule evaluation), Rule (limit, window, key), CounterStore (Redis-backed counts with TTL), TokenBucket and SlidingWindow strategies.

\`\`\`ts
interface LimitResult {
  allowed: boolean;
  retryAfterMs?: number;
}

interface RateLimitStrategy {
  allow(key: string, nowMs: number): LimitResult;
}

class TokenBucket implements RateLimitStrategy {
  private tokens: number;
  private lastRefillMs: number;

  constructor(
    private readonly refillPerSec: number,
    private readonly capacity: number,
  ) {
    this.tokens = capacity;
    this.lastRefillMs = Date.now();
  }

  allow(_key: string, nowMs: number): LimitResult {
    const elapsed = (nowMs - this.lastRefillMs) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillPerSec);
    this.lastRefillMs = nowMs;
    if (this.tokens < 1) {
      return { allowed: false, retryAfterMs: Math.ceil((1 - this.tokens) / this.refillPerSec * 1000) };
    }
    this.tokens -= 1;
    return { allowed: true };
  }
}

class RateLimiter {
  constructor(private readonly strategies: RateLimitStrategy[]) {}

  check(key: string): LimitResult {
    const now = Date.now();
    for (const s of this.strategies) {
      const r = s.allow(key, now);
      if (!r.allowed) return r;
    }
    return { allowed: true };
  }
}
\`\`\`

## Key decisions

- **Algorithm per need:** token bucket allows bursts; sliding window stays strict.
- **Distributed counters:** Redis with TTL — local counters diverge across servers.
- **Rejection contract:** 429 plus Retry-After header, never silent drops.
- **Fail policy:** fail-open (allow) vs fail-closed (deny) when Redis is down — decide upfront.

## Real-world example

**AWS API Gateway** usage plans and **Cloudflare Rate Limiting** enforce per-key quotas at the edge before traffic hits origin. **Stripe** returns \`429\` with \`Retry-After\` on overloaded endpoints. **Redis** (\`INCR\` + \`EXPIRE\`) or **Envoy**'s global rate limit service back multi-node token buckets.

- API Gateway combines burst (token bucket) and steady-state limits — same dual-rule stacking as multiple \`RateLimitStrategy\` instances.
- Sliding-window log in Redis avoids the “double quota at window boundary” bug of fixed windows.
- Fail-open vs fail-closed mirrors whether you prefer availability or abuse protection when the counter store is unavailable.
- Key extractors map JWT \`sub\`, API key, or client IP — the \`Rule\` key dimension in LLD.

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

**Entities:** \`Notification\` (channel, recipient, payload, priority), \`Template\` (render per channel), \`UserPreferences\`, \`DeliveryAttempt\`, \`ProviderAdapter\`.

**Invariants:** Opted-out users never receive marketing on that channel. Quiet hours defer non-critical sends — they do not drop transactional alerts if policy says otherwise. Every send attempt is recorded for audit.

**Patterns:** Adapter (email/push/SMS providers), Strategy (channel selection), Priority Queue (alerts vs digests), Template Method (render then send).

Design Notification (channel, recipient, content, priority), Template per channel, PreferenceStore (who wants what, when), and a Dispatcher routing through provider adapters. High-priority alerts jump the queue; marketing digests batch hourly. Failed sends retry with exponential backoff, then land in a dead-letter queue for inspection.

## Core classes

Notification, Template (per channel rendering), PreferenceStore (opt-outs, quiet hours), Dispatcher (routing plus priority), Provider Adapters (email, push, SMS), RetryQueue with backoff.

\`\`\`ts
type Channel = "email" | "push" | "sms";
type Priority = "critical" | "normal" | "bulk";

interface Notification {
  id: string;
  channel: Channel;
  userId: string;
  templateId: string;
  data: Record<string, string>;
  priority: Priority;
}

interface NotificationProvider {
  send(notification: Notification): Promise<void>;
}

interface PreferenceStore {
  allowed(n: Notification, at: Date): boolean;
}

class Dispatcher {
  constructor(
    private readonly prefs: PreferenceStore,
    private readonly providers: Map<Channel, NotificationProvider>,
  ) {}

  async send(notification: Notification): Promise<"sent" | "skipped" | "failed"> {
    if (!this.prefs.allowed(notification, new Date())) return "skipped";
    const provider = this.providers.get(notification.channel);
    if (!provider) return "failed";
    await this.withRetry(() => provider.send(notification));
    return "sent";
  }

  private async withRetry(fn: () => Promise<void>, attempts = 3): Promise<void> {
    for (let i = 0; i < attempts; i++) {
      try {
        await fn();
        return;
      } catch {
        await new Promise((r) => setTimeout(r, 2 ** i * 1000));
      }
    }
    throw new Error("DLQ");
  }
}
\`\`\`

## Key decisions

- **Preferences gate everything:** opt-outs and quiet hours checked before sending.
- **Priority queues:** alerts jump ahead of digests — separate lanes.
- **Provider adapters:** one interface per channel — swap vendors freely.
- **Retry with backoff plus DLQ:** transient failures retry, permanent ones park for review.

## Real-world example

**Firebase Cloud Messaging (FCM)** and **OneSignal** fan out push; **SendGrid** / **Amazon SES** handle email; **Twilio** handles SMS. Products like **Intercom** or **Customer.io** centralize templates, preferences, and delivery analytics — the same shape as \`Dispatcher\` + \`PreferenceStore\`.

- OneSignal segments and quiet-hour rules map to \`PreferenceStore.allowed\`.
- FCM topic subscriptions are Observer-style fan-out at provider scale.
- Provider rate limits require per-adapter throttling — separate from your API rate limiter.
- DLQ + delivery webhooks mirror \`DeliveryAttempt\` tracking for “did the push arrive?”

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

**Entities:** \`Payment\` (amount, method, state), \`IdempotencyRecord\`, \`PaymentMethodStrategy\`, \`WebhookEvent\`, \`SettlementLine\`.

**Invariants:** Same idempotency key → same outcome, never a second capture. State transitions are one-way and logged. Webhooks are untrusted until signature-verified and deduplicated.

**Patterns:** State Machine (\`Payment\` lifecycle), Strategy (per payment method), Idempotent Receiver (store key → result), Saga-like compensation on refund.

The design centers on Payment with a strict state machine (Initiated, Processing, Success, Failed, Refunded), an idempotency key on every charge so retries return the original result, and Strategy implementations per payment method behind one processor interface. Webhooks arrive out of order and duplicated — verify, deduplicate, then apply as transitions. A reconciliation job compares gateway records against bank settlements daily.

## Core classes

Payment (state machine), PaymentService (idempotency keys), Method Strategies (cards, UPI, netbanking, wallets), WebhookHandler (verify plus dedupe plus apply), ReconciliationJob (daily settlement match).

\`\`\`ts
type PaymentState = "Initiated" | "Processing" | "Success" | "Failed" | "Refunded";
type PaymentMethod = "card" | "upi" | "netbanking" | "wallet";

interface Money {
  amountMinor: number;
  currency: string;
}

interface Payment {
  id: string;
  idempotencyKey: string;
  money: Money;
  method: PaymentMethod;
  state: PaymentState;
}

interface PaymentMethodStrategy {
  execute(payment: Payment): Promise<Payment>;
}

class PaymentService {
  private readonly idempotency = new Map<string, Payment>();

  constructor(private readonly strategies: Map<PaymentMethod, PaymentMethodStrategy>) {}

  async charge(idempotencyKey: string, money: Money, method: PaymentMethod): Promise<Payment> {
    const existing = this.idempotency.get(idempotencyKey);
    if (existing) return existing;

    const payment: Payment = {
      id: crypto.randomUUID(),
      idempotencyKey,
      money,
      method,
      state: "Initiated",
    };
    this.idempotency.set(idempotencyKey, payment);

    const strategy = this.strategies.get(method)!;
    payment.state = "Processing";
    const result = await strategy.execute(payment);
    this.idempotency.set(idempotencyKey, result);
    return result;
  }
}
\`\`\`

## Key decisions

- **Idempotency key on every charge:** retries return stored results, never re-charge.
- **Strict state machine:** Initiated, Processing, Success, Failed, Refunded — no in-between states.
- **Webhooks distrusted:** untrusted, duplicated, unordered — verify, dedupe, then apply.
- **Daily reconciliation:** catches whatever automation misses against bank settlements.

## Real-world example

**Stripe** is the reference LLD: \`Idempotency-Key\` header, PaymentIntent state machine, signed webhooks, and balance reconciliation reports. **Razorpay** / **PayPal** follow the same primitives for UPI and wallets in local markets.

- Stripe PaymentIntent states map 1:1 to \`PaymentState\` — illegal transitions return API errors.
- Webhook \`event.id\` deduplication prevents double-applying \`payment_intent.succeeded\`.
- Refunds are new transitions (Success → Refunded), not delete-and-recreate.
- Nightly settlement files vs ledger rows = your \`ReconciliationJob\`.

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

**Entities:** \`Cart\`, \`CartItem\` (productId, qty, unitPriceSnapshot), \`CartOwner\` (guest token vs userId), \`PricingService\`.

**Invariants:** Checkout charges snapshot prices unless the user explicitly accepts a diff. One active cart per owner per merchant context. Merging guest + logged-in cart combines line items without duplicate product rows (increment qty).

**Patterns:** Aggregate Root (\`Cart\` owns items), Value Object (money snapshots), Repository (persist cart by owner), Domain Service (\`PricingService\`).

Design Cart (user plus items), CartItem (product, quantity, price snapshot), and a PricingService computing totals with discounts and tax. Prices snapshot at add time — charging a changed price later breaks trust, so diffs surface explicitly at checkout. Guest carts merge into account carts on login. Abandoned carts expire after a window and optionally trigger reminders.

## Core classes

Cart (owner, items, status), CartItem (product, quantity, snapshot price), PricingService (totals, discounts, tax), CouponEngine (validates and applies).

\`\`\`ts
interface Product {
  id: string;
  name: string;
  priceMinor: number;
}

interface CartItem {
  productId: string;
  quantity: number;
  unitPriceSnapshotMinor: number;
}

interface Cart {
  id: string;
  ownerId: string;
  items: CartItem[];
  updatedAt: Date;
}

interface PricingService {
  subtotal(items: CartItem[]): number;
  total(items: CartItem[], taxRate: number): number;
}

class CartService {
  constructor(private readonly pricing: PricingService) {}

  addItem(cart: Cart, product: Product, qty: number): void {
    const existing = cart.items.find((i) => i.productId === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.items.push({
        productId: product.id,
        quantity: qty,
        unitPriceSnapshotMinor: product.priceMinor,
      });
    }
    cart.updatedAt = new Date();
  }

  checkoutTotal(cart: Cart): number {
    return this.pricing.total(cart.items, 0.18);
  }
}
\`\`\`

## Key decisions

- **Price snapshots:** freeze prices at add time; surface diffs at checkout, never silently charge.
- **Guest merge:** login merges guest cart into account cart, quantities combine.
- **Expiration:** abandoned carts expire; reminders are a separate scheduled flow.
- **Pricing centralized:** one service owns totals, discounts, and tax math.

## Real-world example

**Amazon** and most e-commerce platforms persist carts server-side, merge on login, and show “price changed” at checkout. **Shopify** cart APIs store line items with \`presentment_prices\` captured at add time for audit.

- Guest cart cookie / local storage ID maps to \`ownerId\` before account merge.
- Abandoned-cart emails are a scheduled job reading expired-near carts — not inline in \`addItem\`.
- Inventory reservation is often a separate service; cart only holds intent, not stock locks.
- Multi-device sync is “last write wins” or version field on \`Cart.updatedAt\`.

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

**Entities:** \`Coupon\`, \`DiscountStrategy\`, \`EligibilityRule\`, \`CouponEngine\`, \`PricedBill\` (line-level breakdown).

**Invariants:** Ineligible coupons never mutate the cart. Application order is deterministic and documented. Stacking policy is enforced before any discount math.

**Patterns:** Strategy (discount type), Chain of Responsibility (eligibility rules), Composite (stackable set), Specification (isEligible).

Model Coupon with its type, rules, and validity window, plus a Discount face per coupon type behind one name. A CouponEngine validates eligibility, applies combinable coupons in a defined order, and returns an itemized price breakdown callers can audit. Application order matters financially — percentage discounts typically apply before flat ones — so the policy must be explicit.

## Core classes

Cart (items), Coupon (type, rules, validity), Discount faces per type (duck typing — same two methods), CouponEngine (validate, order, apply), Bill (itemized breakdown).

\`\`\`ts
interface CartLine {
  productId: string;
  categoryId: string;
  quantity: number;
  unitPriceMinor: number;
}

interface UserContext {
  userId: string;
  redemptionsForCoupon: (code: string) => number;
}

interface DiscountStrategy {
  code: string;
  eligible(cart: CartLine[], user: UserContext, now: Date): boolean;
  apply(subtotalMinor: number, cart: CartLine[]): number;
}

class PercentCoupon implements DiscountStrategy {
  constructor(
    readonly code: string,
    private readonly percent: number,
    private readonly minSubtotalMinor: number,
    private readonly expiresAt: Date,
  ) {}

  eligible(cart: CartLine[], _user: UserContext, now: Date): boolean {
    if (now > this.expiresAt) return false;
    const sub = cart.reduce((s, l) => s + l.unitPriceMinor * l.quantity, 0);
    return sub >= this.minSubtotalMinor;
  }

  apply(subtotalMinor: number, _cart: CartLine[]): number {
    return Math.round(subtotalMinor * (1 - this.percent / 100));
  }
}

class CouponEngine {
  constructor(private readonly applyOrder: DiscountStrategy[]) {}

  price(cart: CartLine[], user: UserContext, coupons: DiscountStrategy[]): number {
    let subtotal = cart.reduce((s, l) => s + l.unitPriceMinor * l.quantity, 0);
    const now = new Date();
    for (const c of this.applyOrder) {
      if (!coupons.includes(c)) continue;
      if (!c.eligible(cart, user, now)) continue;
      subtotal = c.apply(subtotal, cart);
    }
    return subtotal;
  }
}
\`\`\`

## Key decisions

- **Coupon types are Strategies:** percentage, flat, BOGO, free shipping.
- **Eligibility is a rule chain:** expiry, min value, category, per-user limits.
- **Application order changes the total:** policy must be explicit.
- **Stacking policy first:** combinable, exclusive, or best-only.

## Real-world example

**Amazon** “clip coupon” + cart promotions, **Uber Eats** promo stacks, and **Shopify** discount codes all separate eligibility from application order. Tax is often computed on post-discount subtotal — another policy line in \`PricedBill\`.

- BOGO and category-scoped coupons need line-item targeting, not cart-wide percent only.
- Per-user redemption limits live in \`UserContext.redemptionsForCoupon\`.
- “Best single coupon” mode = pick max savings without stacking — explicit stacking policy.
- Itemized receipt lines match audit requirements for finance and support.

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

**Entities:** \`User\`, \`StoredFile\`, \`FileVersion\`, \`Chunk\` (content hash), \`ShareLink\`, \`BlobStore\`.

**Invariants:** Chunk bytes are immutable and addressed by hash — duplicate content stores once. A version points to an ordered chunk list; rollback swaps the head pointer. Share links enforce expiry and permission on every download.

**Patterns:** Content-Addressable Storage (hash → bytes), Flyweight (shared chunks), Memento (version chain), Facade (\`SyncService\`).

Design User, StoredFile (metadata plus version list), Chunk (content-addressed blocks — same bytes stored once via hashing), and ShareLink (expiry plus permissions). Large uploads split into chunks, each hashed — unchanged chunks skip re-upload, which makes sync fast. Versions chain per file for history and rollback.

## Core classes

User, StoredFile (metadata, version chain), Chunk (hash plus bytes — deduplicated), ShareLink (expiry, permissions), SyncService (delta computation).

\`\`\`ts
interface ChunkRef {
  hash: string;
  sizeBytes: number;
}

interface FileVersion {
  versionId: string;
  createdAt: Date;
  chunks: ChunkRef[];
}

interface StoredFile {
  id: string;
  ownerId: string;
  name: string;
  versions: FileVersion[];
}

interface BlobStore {
  has(hash: string): boolean;
  put(hash: string, data: Uint8Array): void;
}

class SyncService {
  constructor(private readonly blobs: BlobStore) {}

  upload(name: string, data: Uint8Array, chunkSize: number): StoredFile {
    const chunks: ChunkRef[] = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      const slice = data.subarray(i, i + chunkSize);
      const hash = this.hash(slice);
      if (!this.blobs.has(hash)) this.blobs.put(hash, slice);
      chunks.push({ hash, sizeBytes: slice.length });
    }
    return {
      id: crypto.randomUUID(),
      ownerId: "user",
      name,
      versions: [{ versionId: "v1", createdAt: new Date(), chunks }],
    };
  }

  private hash(data: Uint8Array): string {
    return "sha256:" + data.length; // interview stub
  }
}
\`\`\`

## Key decisions

- **Chunking plus hashing:** fixed-size pieces, content-addressed — dedup and resume come free.
- **Delta sync:** upload only changed chunks, never whole files twice.
- **Version chains:** every overwrite links back — history and rollback included.
- **Share links carry policy:** expiry plus read or write permissions on the link itself.

## Real-world example

**Dropbox** block hashing and **Amazon S3** multipart upload + ETag semantics are the production versions of chunking. **Google Drive** revision history and shared link expiry mirror \`FileVersion\` + \`ShareLink\`.

- Client computes rolling hashes (rsync-style) to find changed blocks — same delta as \`SyncService\`.
- S3 stores objects by key; dedup layers (e.g. backup products) use content hashes like \`ChunkRef\`.
- Trash retention then hard delete matches compliance “restore window” requirements.
- Write permissions on share links map to upload-capable shared folders.

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

**Entities:** \`Task\` (payload, schedule, retryBudget), \`Schedule\` (cron or runAt), \`Run\` (attempt log), \`JobQueue\`, \`Worker\`.

**Invariants:** At most one worker owns a runnable task at a time (claim). Tasks survive process restarts (durable queue). Exhausted retries land in DLQ with full history.

**Patterns:** Command (\`Task\` payload), Scheduler (time-based trigger), Worker Pool, Leader Election / atomic claim, Retry with exponential backoff.

Design Task (payload, schedule, retries left), Schedule (cron expression or delay), Worker pool pulling from a durable queue, and Run records tracking every attempt. A leader or atomic claim assigns each task to exactly one worker — two workers must never run the same task. Failed attempts requeue with exponential backoff until retries exhaust into a dead-letter queue.

## Core classes

Task (payload, schedule, retries), Scheduler (due-task scanning), Worker (claim plus execute), Run (attempt history), DeadLetterQueue (exhausted tasks).

\`\`\`ts
interface TaskPayload {
  type: string;
  data: Record<string, unknown>;
}

interface Task {
  id: string;
  payload: TaskPayload;
  runAt: Date;
  retriesLeft: number;
  claimedBy?: string;
}

interface TaskStore {
  due(now: Date): Task[];
  tryClaim(taskId: string, workerId: string): boolean;
}

class Scheduler {
  constructor(
    private readonly store: TaskStore,
    private readonly queue: Task[],
  ) {}

  dispatch(now = new Date()): void {
    for (const task of this.store.due(now)) {
      if (this.store.tryClaim(task.id, "scheduler")) {
        this.queue.push(task);
      }
    }
  }
}

class Worker {
  constructor(private readonly workerId: string) {}

  async execute(task: Task): Promise<void> {
    // idempotent handler runs here; Run record appended per attempt
  }
}
\`\`\`

## Key decisions

- **Atomic claims:** exactly-once assignment via atomic claim or leader election.
- **Durable queue:** tasks survive restarts — in-memory scheduling loses work.
- **Backoff retries:** exponential delays, then dead-letter queue.
- **Idempotent tasks:** at-least-once execution demands tasks tolerate repeats.

## Real-world example

**Cron** on Linux, **Sidekiq** / **Celery** / **BullMQ** job queues, and **AWS EventBridge** scheduled rules all share: durable storage, visibility timeout, and retry. **Kubernetes CronJob** adds leader-aware scheduling at the cluster layer.

- BullMQ \`jobId\` + Redis \`SET NX\` ≈ \`tryClaim\` for single-consumer execution.
- Celery \`acks_late\` + retry kwargs mirror backoff and DLQ routing.
- Cron expressions map to \`Schedule\`; one-off delays map to \`runAt\`.
- Idempotent job design (e.g. “send email if not sent”) is mandatory under at-least-once.

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

**Entities:** \`LRUCache\`, \`Node\` (key, value, prev, next), internal \`Map\` for key → node.

**Invariants:** Size never exceeds capacity after \`put\`. \`get\` and successful \`put\` mark an entry as most recently used. Eviction always removes the tail (LRU), never arbitrary entries.

**Patterns:** Hash Map + doubly linked list (classic), or ordered Map trick in JS/TS interviews.

The technique is HashMap plus doubly linked list: the map reaches any key in O(1), the list keeps order — head is freshest (MRU), tail is stalest (LRU). Gets refresh by moving nodes to the head; puts add at the head and evict from the tail past capacity. TypeScript note: native \`Map\` preserves insertion order — delete plus re-set refreshes MRU in O(1) for interview shortcuts; still explain the list + map for language-agnostic interviews.

## Core classes

LRUCache (capacity, map, head/tail), Node (key, value, prev, next). Gets refresh, puts evict from the tail.

\`\`\`ts
class ListNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public prev: ListNode<K, V> | null = null,
    public next: ListNode<K, V> | null = null,
  ) {}
}

class LRUCache<K, V> {
  private readonly map = new Map<K, ListNode<K, V>>();
  private head: ListNode<K, V> | null = null;
  private tail: ListNode<K, V> | null = null;

  constructor(private readonly capacity: number) {}

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) return undefined;
    this.moveToHead(node);
    return node.value;
  }

  put(key: K, value: V): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      this.moveToHead(existing);
      return;
    }
    const node = new ListNode(key, value);
    this.map.set(key, node);
    this.insertHead(node);
    if (this.map.size > this.capacity) this.evictTail();
  }

  private moveToHead(node: ListNode<K, V>): void {
    /* unlink + insertHead */
  }

  private evictTail(): void {
    if (!this.tail) return;
    this.map.delete(this.tail.key);
    /* unlink tail */
  }

  private insertHead(_node: ListNode<K, V>): void {
    /* push at MRU */
  }
}
\`\`\`

## Key decisions

- **Map for reach, list for order:** neither alone gives both O(1) operations.
- **Head fresh, tail stale:** keep the direction fixed or evictions go wrong.
- **Refresh on get:** reads count as use — forgetting this is the classic bug.
- **Evict from tail on put:** only past capacity, never before.

## Real-world example

**Redis** \`maxmemory-policy allkeys-lru\` evicts keys by approximate LRU at scale. **Memcached** slab allocation + LRU per class is a variant. Application caches (CDN edge, ORM second-level cache) use the same get/put/evict API.

- Redis samples keys for eviction — trade exact LRU for O(1) amortized at millions of keys.
- Guava \`CacheBuilder.maximumSize\` in Java exposes the same LLD interface.
- Thread-safe wrappers add locking around \`get\`/\`put\` — mention if asked after core design.
- TTL + LRU combined: eviction picks LRU among non-expired entries — common interview follow-up.

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

**Entities:** \`Topic\`, \`Message\`, \`Subscriber\` (handler + offset), \`Broker\`.

**Invariants:** FIFO ordering holds per topic partition, not globally. Durable topics append to a log before fan-out. Subscribers must tolerate duplicate delivery (at-least-once).

**Patterns:** Mediator (\`Broker\` decouples publishers/subscribers), Observer (fan-out), Event Log (durable replay), Pub-Sub (topic routing).

Design Topic (subscriber list plus message log), Subscriber (callback plus offset), Message (id, payload, time), and Broker running it all. Ordering stays FIFO per topic. Delivery stays at-least-once with idempotent subscribers demanded — promising exactly-once is a distributed lie.

## Core classes

Topic (subscribers plus log), Subscriber (callback, offset), Message (id, payload, time), Broker (publish, subscribe, unsubscribe).

\`\`\`ts
interface Message<T = unknown> {
  id: string;
  topic: string;
  payload: T;
  createdAt: Date;
}

interface Subscriber<T = unknown> {
  id: string;
  offset: number;
  onMessage(msg: Message<T>): void | Promise<void>;
}

interface TopicState<T = unknown> {
  log: Message<T>[];
  subscribers: Subscriber<T>[];
}

class Broker {
  private readonly topics = new Map<string, TopicState>();

  subscribe<T>(topic: string, subscriber: Subscriber<T>): void {
    const t = this.topics.get(topic) ?? { log: [], subscribers: [] };
    t.subscribers.push(subscriber);
    this.topics.set(topic, t);
  }

  publish<T>(topic: string, payload: T): void {
    const t = this.topics.get(topic);
    if (!t) return;
    const msg: Message<T> = {
      id: crypto.randomUUID(),
      topic,
      payload,
      createdAt: new Date(),
    };
    t.log.push(msg);
    for (const s of t.subscribers) void s.onMessage(msg);
  }
}
\`\`\`

## Key decisions

- **Durable vs ephemeral first:** late joiners read history or they don't — decide upfront.
- **FIFO per topic:** global order promises never hold.
- **At-least-once plus idempotent:** duplicates will arrive — subscribers dedupe.
- **Slow subscribers:** drop or buffer policy needed, or the hub dies.

## Real-world example

**Apache Kafka** topics/partitions/consumer offsets, **RabbitMQ** exchanges and queues, and **Google Pub/Sub** subscriptions are the distributed scale-out of this LLD. **Redis Pub/Sub** is ephemeral (no log); **Kafka** is durable log + consumer groups.

- Partition key → single FIFO stream — maps to “per topic” ordering in LLD.
- Consumer offset commit ≈ \`Subscriber.offset\` for replay and crash recovery.
- Idempotent consumers use \`message.id\` dedupe store — required for at-least-once.
- Back-pressure: block publish vs drop slow consumers — explicit policy in production brokers.

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

**Entities:** \`User\`, \`Meeting\` (interval, attendees, roomId), \`Room\`, \`RecurrenceRule\`, \`Scheduler\`.

**Invariants:** No two meetings overlap in the same room. User double-booking is either forbidden or explicitly allowed per product policy. All stored instants are UTC; display converts time zones.

**Patterns:** Interval overlap check, Greedy + min-heap (minimum rooms), Factory (expand recurrence instances), Observer (notify on book/cancel).

Design User, Meeting (start, end, attendees, room), Room, and Scheduler (book and cancel, clash checks, room allocation). Clash detection is interval overlap: a new meeting fits only where nothing overlaps. Minimum rooms come from classic interval partitioning — track end times in a min-heap. Recurring meetings split into a rule (every Monday) plus generated instances.

## Core classes

User, Meeting (range plus attendees plus room), Room, Scheduler (book, cancel, clash check, room allocate), RecurrenceRule.

\`\`\`ts
interface TimeRange {
  startUtc: Date;
  endUtc: Date;
}

interface Meeting {
  id: string;
  organizerId: string;
  attendeeIds: string[];
  range: TimeRange;
  roomId?: string;
}

interface Room {
  id: string;
  capacity: number;
}

class Scheduler {
  private meetings: Meeting[] = [];

  overlaps(a: TimeRange, b: TimeRange): boolean {
    return a.startUtc < b.endUtc && b.startUtc < a.endUtc;
  }

  book(meeting: Meeting): void {
    for (const m of this.meetings) {
      if (m.roomId && meeting.roomId && m.roomId === meeting.roomId && this.overlaps(m.range, meeting.range)) {
        throw new Error("Room clash");
      }
    }
    meeting.roomId = meeting.roomId ?? this.allocateRoom(meeting);
    this.meetings.push(meeting);
  }

  private allocateRoom(meeting: Meeting): string {
    return "room-b"; // min-heap over end times in full solution
  }
}
\`\`\`

## Key decisions

- **Overlap formula:** a.start < b.end && b.start < a.end — memorize this line.
- **Rooms minimal:** min-heap of end times — reuse free rooms, open new ones.
- **Recurring split:** store the rule, generate instances on demand — never infinite lists.
- **Timezone:** store everything in UTC, convert on display — interviewers notice this.

## Real-world example

**Google Calendar** / **Outlook** free-busy APIs, room resources, and recurrence RRULE expansion are the product-scale version. **Calendly** adds availability windows on top of the same overlap primitive.

- Free-busy = query intervals per user, merge, then overlap-check proposed slot.
- Room resources are \`Room\` entities with capacity and equipment tags.
- RRULE “every Monday 10am” stored once; instances materialized for clash checks in range.
- Cancellation triggers notifications and may promote waitlisted meetings — close the loop in LLD narrative.

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

**Entities:** \`Rider\`, \`Driver\` (location, availability), \`Trip\` (route, status, fare), \`TripManager\`, \`FareStrategy\`.

**Invariants:** Illegal state transitions throw — no \`Completed\` → \`Ongoing\`. One active trip per driver during assignment window. Fare computed only from terminal states (\`Completed\` / cancelled with fee policy).

**Patterns:** State Machine (\`Trip\` lifecycle), Strategy (\`FareStrategy\`), Observer (location updates to rider), Service (\`TripManager\` orchestrates match + transition).

Design Rider, Driver (location plus status), Trip (rider, driver, route, status machine), and a TripManager owning assignment plus transitions. States run Requested, Matched, Arriving, Ongoing, Completed, Cancelled — guarded transitions, with cancel fees depending on state. Fare Strategy combines base, distance, time, and surge. History queries read the trip log, never live state.

## Core classes

Rider, Driver (location, status), Trip (route plus status machine), TripManager (assign plus transition), FareStrategy (base, distance, time, surge).

\`\`\`ts
type TripStatus =
  | "Requested"
  | "Matched"
  | "Arriving"
  | "Ongoing"
  | "Completed"
  | "Cancelled";

interface GeoPoint {
  lat: number;
  lng: number;
}

interface Trip {
  id: string;
  riderId: string;
  driverId?: string;
  pickup: GeoPoint;
  dropoff: GeoPoint;
  status: TripStatus;
}

interface FareStrategy {
  calculate(trip: Trip): number;
}

class TripEntity {
  constructor(public readonly trip: Trip) {}

  start(): void {
    if (this.trip.status !== "Matched") throw new Error("Cannot start yet");
    this.trip.status = "Ongoing";
  }

  complete(fare: FareStrategy): number {
    if (this.trip.status !== "Ongoing") throw new Error("Cannot complete yet");
    this.trip.status = "Completed";
    return fare.calculate(this.trip);
  }
}

class TripManager {
  match(trip: Trip, nearestFreeDriverId: string): void {
    trip.driverId = nearestFreeDriverId;
    trip.status = "Matched";
  }
}
\`\`\`

## Key decisions

- **Lifecycle states:** Requested through Completed — every move guarded.
- **Assignment atomic:** one driver takes one trip — CAS on driver status.
- **Fare Strategy:** base, distance, time, surge combine without edits.
- **History from logs:** trip records answer history queries, never live objects.

## Real-world example

**Uber** / **Lyft** trip state machines, surge pricing multipliers, and live map streaming are the canonical mapping. Dispatch matches supply (drivers) to demand (riders) with geo indexes — LLD focuses on \`TripManager.match\` + guarded transitions.

- States like EN_ROUTE, ON_TRIP map to \`Arriving\` / \`Ongoing\` in simplified LLD.
- Surge = dynamic multiplier inside \`FareStrategy\`, not hard-coded in \`Trip\`.
- Split fare / pooled rides = composite payment after \`complete\` — payment LLD stays separate.
- Trip history reads immutable \`Trip\` records written at each transition — not mutable driver objects.

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
