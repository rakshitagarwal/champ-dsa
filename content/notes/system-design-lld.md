# System Design — Low-Level Design (LLD)

> **Goal:** Design a **module someone can build** — entities, APIs/methods, schema, concurrency, and extension points. Hiring signal is ownership and clarity, not UML art.
>
> Complements [HLD notes](/notes/system-design-hld) (boxes & arrows). LLD is what Hello Interview calls **object-oriented / class design** interviews — parking lot, elevator, rate limiter class, notification module, etc.

---

## 0. LLD interview flow

| Step | Do this |
|------|---------|
| 1. Clarify | Actors, scale of *objects* (floors, not millions of QPS unless asked), must-have vs out of scope |
| 2. Entities | 4–8 classes / tables with clear responsibilities |
| 3. Public API | Methods or REST endpoints the "client" of this module calls |
| 4. Relationships | Who owns whom; enums for states |
| 5. Happy path | Walk one scenario end-to-end |
| 6. Edge + concurrency | Full lot, double book, payment fail, duplicate request |
| 7. Extensibility | Strategy/Factory where rules will change |

**Phrase:** *"I'll keep v1 scoped — we can add X later without rewriting the core interfaces."*

---

## 1. SOLID (say it with code intent)

| | Practical meaning |
|--|-------------------|
| **S** | `OrderService` creates orders; `PaymentService` charges — no god class |
| **O** | New payment provider = new class implementing `PaymentProvider`, not more `if`s |
| **L** | Any `PaymentProvider` works wherever the interface is expected |
| **I** | Don't force clients to depend on unused methods — split read/write interfaces if needed |
| **D** | Depend on `IOrderRepository`, not `PostgresOrderRepository` in controllers |

**Senior line:** *"Handlers depend on interfaces so tests can mock the DB and payment gateway."*

---

## 2. Patterns that actually show up

| Pattern | Use when |
|---------|----------|
| **Strategy** | Pricing, fare, notification channel, slot search policy |
| **Factory / Abstract Factory** | Create channel senders or vehicle types from config |
| **Observer / events** | `OrderPlaced` → inventory, email, analytics |
| **Adapter** | Wrap Stripe/Razorpay behind your interface |
| **Repository** | Hide SQL/Mongo behind `findById` / `save` |
| **Singleton** | Process-wide connection pool (not "every class") |
| **State** | Elevator / trip lifecycle (`REQUESTED → ACCEPTED → …`) |

Don't name-drop patterns without the pain they solve.

---

## 3. Layering (service module)

```
HTTP / CLI / RPC
  → Application service (use case + transactions)
    → Domain model (invariants)
      → Ports (repositories, gateways)
        → Adapters (Postgres, Redis, Stripe)
```

- Controllers: validate input, call service, map DTO — **no business rules**  
- Services: orchestrate + enforce invariants  
- Repositories: persistence only  

---

## 4. API & schema craft (module level)

### REST habits
- Plural nouns: `/orders`, `/users/{id}/orders`  
- Auth user from **token**, never trust `userId` in body alone  
- Idempotency-Key on payments / creates  
- Consistent errors: `{ code, message, requestId }`  
- Cursor pagination for feeds; offset OK for admin  

### Schema
- Model **access patterns** first; add indexes for real queries  
- Normalize writes; denormalize read models when joins hurt  
- Soft delete (`deleted_at`) if you need audit — plan unique constraints  

### Concurrency cheatsheet

| Problem | Fix |
|---------|-----|
| Double booking | Unique constraint + transaction; optimistic `version` |
| Oversell stock | `UPDATE … WHERE qty >= :n` check rowcount |
| Read-modify-write | `SELECT FOR UPDATE` or atomic Redis ops |
| Distributed lock | Last resort; prefer idempotent retries |

---

## 5. Classic LLD prompts (skeletons)

### 5.1 Parking lot

**Entities:** `ParkingLot`, `Floor`, `ParkingSpot` (type), `Vehicle`, `Ticket`, `Payment`, `PricingStrategy`

**API:**
- `park(vehicle) → Ticket`  
- `unpark(ticketId) → Receipt`  
- `getAvailability(spotType)?`

**Design notes:** Spot finder Strategy (nearest / any); fee Strategy (hourly / flat); spot state FREE/OCCUPIED; ticket stores entry time + spotId.

**Edge:** Lot full; wrong vehicle type; lost ticket.

---

### 5.2 Elevator system

**Entities:** `Elevator`, `ElevatorController`, `Request` (floor, direction), `ElevatorState` (IDLE, MOVING_UP, MOVING_DOWN, DOORS_OPEN)

**API:**
- `requestElevator(floor, direction)`  
- `requestFloor(elevatorId, floor)` (inside panel)  
- `step()` / tick simulation for interviews  

**Design notes:** Per-elevator request queues; scheduler assigns closest elevator moving that direction (SCAN/LOOK mention = bonus). Thread-safety if multi-threaded sim.

---

### 5.3 Splitwise / expense split

**Entities:** `User`, `Group`, `Expense`, `ExpenseSplit` (EQUAL / EXACT / PERCENT), `Balance`

**API:**
- `addExpense(groupId, payerId, amount, splits)`  
- `getBalances(groupId)`  
- `settle(from, to, amount)` optional  

**Invariant:** Sum of splits == expense amount. Balances = net of paid vs owed. Optional debt simplification (min cash flow) as stretch.

---

### 5.4 Rate limiter (library / service)

**Entities:** `RateLimiter` interface; `TokenBucket` / `SlidingWindow` impl; storage backend (memory / Redis)

**API:**
- `allow(key: string): boolean` or `allow(key) → { allowed, retryAfterMs }`

**Design notes:** Interface so algorithm is swappable; Redis for multi-instance; return 429 at gateway. Mention burst vs steady rate.

---

### 5.5 Notification module

**Entities:** `Notification`, `Template`, `Channel` (EMAIL/PUSH/SMS), `UserPreference`, `DeliveryAttempt`

**API:**
- `send(userId, templateId, data)`  
- Preferences: `updatePreferences(userId, channels)`

**Flow:** Resolve template → filter channels by prefs → enqueue per channel → workers send with retry/backoff → idempotency key per notification.

**Patterns:** Strategy per channel; Observer if domain events trigger sends.

---

### 5.6 Snake & ladder / board game (OOD)

**Entities:** `Board`, `Cell`, `Snake`, `Ladder`, `Player`, `Dice`, `Game`

**API:** `start(players)`, `rollDice()`, `getStatus()`

**Invariant:** Snakes/ladders map start→end; win at exact final cell (or configurable). Good for showing clean state machine.

---

### 5.7 Bookstore / library

**Entities:** `Book` (ISBN), `BookItem` (barcode, status), `Member`, `Loan`, `Reservation`

**API:** `checkout`, `returnBook`, `reserve`, `search`

**Invariant:** One loan per item; overdue fees Strategy; catalog vs physical copy separation.

---

### 5.8 Chess / tic-tac-toe (game rules)

**Entities:** `Board`, `Piece` hierarchy, `Move`, `Game`, `Player`

**Focus:** Polymorphism for piece moves; validate check/checkmate as stretch; keep UI out of domain.

---

## 6. Mini case — Order checkout (service LLD)

**Endpoints:**
- `POST /v1/carts/{id}/checkout` `{ addressId, paymentMethodId, idempotencyKey }`  
- `GET /v1/orders/{id}`

**Service steps:**
1. Validate cart + stock  
2. Begin transaction / reserve inventory  
3. Create order + lines  
4. Charge payment (idempotent)  
5. Commit on success; release stock + mark failed on payment fail  

**Tests:** Mock `PaymentProvider` + `InventoryRepository`; cover payment fail and duplicate idempotency key.

---

## 7. Mapping LLD ↔ HLD company topics

When HLD interview deep-dives a component, switch to LLD thinking:

| HLD system | LLD-shaped deep dive |
|------------|----------------------|
| URL shortener | Key generator interface, collision handling, encoder |
| WhatsApp | Message service, ACK state machine, presence TTL |
| Twitter | Feed service API, fan-out worker, ranking Strategy |
| Netflix | Transcode job state machine, playlist generator |
| Uber | Matching service, trip state enum, surge Strategy |

Keep drawing the **class/module** boundaries even inside a big HLD.

---

## 8. LLD checklist

- [ ] Scope locked (v1 features listed)  
- [ ] 4–8 entities with responsibilities  
- [ ] Public methods / APIs named  
- [ ] Happy path walked  
- [ ] One failure + one concurrency case  
- [ ] One extension point (Strategy/Factory/event)  
- [ ] Testing approach mentioned  

**Next:** Distributed architecture & company designs → [HLD notes](/notes/system-design-hld)

**References:** [Hello Interview — System Design](https://www.hellointerview.com/learn/courses/system-design) (LLD vs product design split), [Karan Pratap Singh — System Design](https://www.karanpratapsingh.com/courses/system-design) (APIs & data models inside each case study).
