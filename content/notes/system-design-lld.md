# System Design — Low-Level Design (LLD)

> **What seniors are evaluated on:** Can you design a **module** someone can build — clear entities, APIs, schema, error handling, and extension points? Hiring managers want ownership signal, not UML theater.

For boxes-and-arrows architecture, see [System Design — HLD](/notes/system-design-hld).

---

## 1. When LLD shows up

| Round type | Typical prompt |
|------------|----------------|
| Mid/senior technical | "Design a parking lot / elevator / splitwise" |
| Feature design | "Design the notification module for our app" |
| API design | "Design REST APIs for an e-commerce checkout" |
| Code review depth | "How would you structure this service layer?" |

**Interview flow:** Clarify scope → identify entities → define APIs → schema → walk one happy path + one edge case → discuss concurrency if relevant.

---

## 2. SOLID (practical, not textbook)

| Principle | In practice (Node/TS) |
|-----------|------------------------|
| **S** — Single responsibility | `OrderService` creates orders; `PaymentService` charges — not one god class |
| **O** — Open/closed | Add payment providers via interface + new class, not `if (type === 'razorpay')` everywhere |
| **L** — Liskov substitution | Any `PaymentProvider` implementation works where the interface is expected |
| **I** — Interface segregation | Split fat interfaces: `ReadableStore` vs `WritableStore` if callers differ |
| **D** — Dependency inversion | Routes depend on `IOrderRepository`, not `MongoOrderRepository` directly |

**Senior phrase:** *"I'd inject dependencies so we can swap the DB or payment gateway in tests without touching HTTP handlers."*

---

## 3. Design patterns (when they actually help)

| Pattern | Web app use case |
|---------|------------------|
| **Factory** | Create email/SMS/push notifiers from config |
| **Strategy** | Pricing rules, tax calculation, shipping calculators |
| **Observer** | Domain events: `OrderPlaced` → inventory + analytics listeners |
| **Adapter** | Wrap third-party payment SDK behind your `PaymentProvider` interface |
| **Repository** | Hide Mongo/SQL queries behind `UserRepository.findByEmail()` |
| **Singleton** | DB connection pool — one per process, not per request |

**Avoid:** Naming patterns without a problem. Interviewers prefer *"I'd use Strategy here because we have N pricing rules that change independently."*

---

## 4. Layered module design (MERN / Node)

```
HTTP (routes/controllers)
  → Application services (use cases, transactions)
    → Domain models + validation
      → Repositories (data access)
        → DB / external APIs
```

**Rules:**
- Controllers: parse input, call service, map response — **no business logic**
- Services: orchestrate, enforce invariants, handle transactions
- Repositories: queries only — no HTTP concepts

**Example structure:**

```
src/
  modules/
    orders/
      order.routes.ts
      order.controller.ts
      order.service.ts
      order.repository.ts
      order.types.ts
```

---

## 5. API contract design

### Resource modeling

- Nouns, plural: `/orders`, `/users/:id/orders`
- Version in path: `/v1/orders` when breaking changes ship

### Idempotency

Payment and create operations: accept `Idempotency-Key` header; store key + result for 24h; return same response on retry.

### Error shape (consistent)

```json
{
  "error": {
    "code": "ORDER_NOT_FOUND",
    "message": "Order 123 does not exist",
    "requestId": "abc-xyz"
  }
}
```

### Status codes

| Code | Use |
|------|-----|
| 200 | Success with body |
| 201 | Created |
| 204 | Success, no body |
| 400 | Client validation error |
| 401 | Not authenticated |
| 403 | Authenticated but not allowed |
| 404 | Resource missing |
| 409 | Conflict (duplicate, version mismatch) |
| 429 | Rate limited |
| 500 | Server error (log details, generic message to client) |

### Pagination

Prefer **cursor-based** for feeds and real-time lists; offset OK for admin tables.

---

## 6. Database schema design

### Normalization vs denormalization

- **Normalize** when writes are frequent and consistency matters (orders, payments)
- **Denormalize** read models when joins are hot (user profile with display name on every comment)

### Index for access patterns

List queries you'll actually run:

```sql
-- Feed by user, newest first
CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);
```

**Covering index:** Include columns in index so query never hits table heap.

### Soft deletes

`deleted_at` column — filter in all queries or use views. Trade-off: unique constraints get harder.

---

## 7. Concurrency basics (interview level)

| Problem | Approach |
|---------|----------|
| Double booking | DB unique constraint + transaction; or optimistic locking (`version` column) |
| Inventory oversell | `UPDATE stock SET qty = qty - 1 WHERE id = ? AND qty > 0` — check rows affected |
| Race on read-modify-write | Row lock (`SELECT FOR UPDATE`) or atomic operations in Redis |
| Distributed lock | Redis Redlock — use sparingly; prefer idempotent design |

**Senior phrase:** *"I'd make the operation idempotent first; locks are a last resort."*

---

## 8. Classic LLD prompts — skeletons

### Parking lot

**Entities:** `ParkingLot`, `Floor`, `Slot` (type: compact/large/handicapped), `Ticket`, `Vehicle`, `Payment`

**Operations:** `park(vehicle)` → assign slot → issue ticket; `unpark(ticketId)` → calculate fee → free slot

**Design choices:** Singleton lot config; strategy for pricing (hourly vs flat); slot finder scans nearest free slot by type

### Elevator system

**Entities:** `Elevator`, `Floor`, `Request` (source, destination, direction)

**Operations:** `requestElevator(floor, direction)`; scheduler picks elevator (SCAN algorithm mention is bonus)

**Concurrency:** Queue requests per elevator; state machine: IDLE, MOVING, DOORS_OPEN

### Split expense / bill split

**Entities:** `User`, `Group`, `Expense`, `Split` (equal/exact/percentage)

**Operations:** `addExpense(payer, splits)`, `getBalances(groupId)` — simplify debts optional

**Schema:** `expenses`, `expense_splits` tables; balance = sum owed − sum paid

### Notification service

**Entities:** `Notification`, `Template`, `Channel` (email/push/sms), `UserPreference`

**Operations:** `send(userId, templateId, payload)` → fan-out to channels user opted into

**Async:** Queue per channel; retry with backoff; idempotency key per notification

---

## 9. MERN example — order checkout module

**API:**

- `POST /v1/carts/:id/checkout` — body: `{ addressId, paymentMethodId }`
- `GET /v1/orders/:id`

**Service flow:**

1. Validate cart not empty, items in stock
2. Begin transaction
3. Reserve inventory
4. Create order + line items
5. Call payment provider
6. On payment success → commit; on fail → release inventory, rollback

**Validation layer:** Zod/Joi at controller boundary — never trust client.

**Testing hooks:** Mock `PaymentProvider` and `InventoryRepository` in unit tests.

---

## 10. LLD interview checklist

- [ ] Named 3–5 core entities
- [ ] Defined main APIs or public methods
- [ ] Sketched schema or class relationships
- [ ] Walked one happy path end-to-end
- [ ] Handled one failure (payment fail, slot full, duplicate request)
- [ ] Mentioned how you'd test it
- [ ] Kept scope bounded — "v1 doesn't need multi-currency"

**Next:** Architecture trade-offs → [HLD notes](/notes/system-design-hld)
