import type { LldTopic } from "./types";

export const PROBLEMS: LldTopic[] = [
  {
    slug: "tic-tac-toe",
    title: "Design Tic Tac Toe game (Interview Question)",
    tag: "Interview Question",
    body: `Tic Tac Toe is the warm-up LLD problem: small enough to finish, rich enough to show method. Requirements are a 3x3 board, two players alternating X and O, win detection across rows, columns, and diagonals, plus draw detection when the board fills. Clarify board size up front: interviewers often generalize to NxN afterward.

The clean design centers on Board holding a grid of Piece objects, Player holding a symbol, and Game orchestrating turns with a queue. Win detection in O(1) per move uses counters per row, column, and diagonal instead of rescanning the board. Walk through one full game to prove turns, validation of occupied cells, and termination all work.

\`\`\`java
// Core entities: Board owns cells, Game owns turn order
class Board {
    private final Piece[][] grid;
    boolean place(int r, int c, Piece p); // false if occupied
    boolean hasWinner(int r, int c, Piece p); // O(1) via counters
}
class Game {
    private final Queue<Player> turns; private final Board board;
    void play(); // loop: pop player, read move, validate, check end
}
\`\`\`

## Keep in mind

- Clarify NxN generalization before coding; design for N from the start.
- O(1) win check with row, column, and diagonal counters impresses immediately.
- Validate occupied cells and out-of-bounds moves explicitly.
- Turn order with a queue keeps the loop clean and extensible.
- End the walkthrough naming draw detection, not just wins.`,
  },
  {
    slug: "elevator-system",
    title: "LLD of Elevator System with Complete Implementation (Interview Question)",
    tag: "Interview Question",
    body: `The elevator system tests concurrent state machines and scheduling. Requirements: multiple elevators across floors, internal panel buttons plus external up and down buttons, movement with door open and close states, and a dispatch strategy assigning the best elevator per request. Concurrency is inherent: many passengers press buttons while elevators move.

Design around an Elevator with floor, direction, and a State object (Idle, Moving, DoorsOpen), a Request with source floor and direction, and a Dispatcher owning the scheduling strategy. The classic algorithm is SCAN: keep moving in one direction serving queued stops, then reverse. Separate the button panels as request producers and the dispatcher as the single decision point.

\`\`\`java
// Dispatcher owns strategy, elevators own state
class Elevator {
    int floor; Direction dir; ElevatorState state;
    void move(); void openDoors(); void addStop(int floor);
}
class Dispatcher {
    Elevator assign(Request r); // SCAN: nearest in-direction car wins
}
\`\`\`

## Keep in mind

- Name the entities first: Elevator, Floor, Panel buttons, Request, Dispatcher.
- SCAN scheduling is the expected algorithm: serve along direction, then reverse.
- Model Idle, Moving, and DoorsOpen as states, not boolean flags.
- Concurrency lives in button presses versus movement: synchronize request intake.
- Walk through one external plus one internal request end to end.`,
  },
  {
    slug: "car-rental-system",
    title: "LLD of Car Rental System with Concurrency handling (Interview Question)",
    tag: "Interview Question",
    body: `Car rental is chosen specifically to test concurrency: two users must never book the same car for overlapping dates. Requirements cover vehicle inventory across stores, search by type and date range, reservation with payment, and return with billing. The double-booking race is the heart of the problem and must be addressed head-on.

The design needs Vehicle, Store, Reservation with date ranges, and Payment entities. Overlap detection is a date-range query per vehicle, and the booking itself must be atomic: check availability and reserve inside one transaction or lock, using optimistic versioning or SELECT FOR UPDATE semantics. State the invariant out loud: the same car can never hold two overlapping confirmed reservations.

\`\`\`java
// Availability check plus reserve must be atomic
class ReservationService {
    Reservation book(User u, Vehicle v, DateRange d) {
        lock(v); // or optimistic version check
        if (overlaps(v, d)) throw new UnavailableException();
        return confirm(u, v, d); // single atomic unit
    }
}
\`\`\`

## Keep in mind

- State the invariant first: no overlapping confirmed reservations per car.
- Check-and-reserve must be atomic: locks or optimistic versioning, never two steps.
- Overlap detection is a range query, so index vehicle plus dates.
- Separate search (read-heavy, cacheable) from booking (write-critical path).
- Returns and billing are separate flows: compute from actual return time.`,
  },
  {
    slug: "snake-and-ladder",
    title: "LLD of Snake and Ladder game (Interview Question)",
    tag: "Interview Question",
    body: `Snake and Ladder tests clean turn-based modeling with a twist in movement rules. Requirements: a numbered board, two or more players, dice rolls, ladders that jump forward, snakes that slide back, exact-landing win rule, and extra turns on sixes per standard rules. Clarify the rules first because variants differ.

The natural entities are Board holding cells plus maps of snake and ladder jumps, Dice as a separate rollable object, Player with position, and Game running the turn loop. Representing jumps as a single map from start to end square elegantly unifies snakes and ladders: landing on a key teleports to its value. The win check is exact position equals board size.

\`\`\`java
// One jump map unifies snakes and ladders
class Board {
    private final Map<Integer, Integer> jumps; // start -> end
    int move(int pos, int roll) {
        int next = pos + roll;
        return jumps.getOrDefault(next, next);
    }
}
class Game { void play() { /* turns, dice, exact-win check */ } }
\`\`\`

## Keep in mind

- Clarify rules first: board size, sixes grant extra turns, exact landing to win.
- One jump map for both snakes and ladders keeps movement logic uniform.
- Dice as its own class allows loaded dice in tests.
- Turn loop with a queue extends cleanly to any player count.
- Walk through a ladder landing and a snake landing explicitly.`,
  },
  {
    slug: "parking-lot",
    title: "Design Parking Lot with Complete Implementation (Interview Question)",
    tag: "Interview Question",
    body: `Parking Lot is the most asked LLD problem, so the bar is a complete working design. Requirements: multiple floors with spots sized for bikes, cars, and trucks, entry gates issuing tickets, exit gates computing fees from duration and vehicle type, and real-time availability display. Concurrency matters at entry: two cars must never get the same spot.

Structure it as ParkingLot owning Floors owning Spots, with Vehicle carrying its size, Ticket recording entry time and spot, and a PricingStrategy computing fees so hourly, daily, and surge rules swap cleanly. Spot allocation picks the nearest free compatible spot and marks it atomically. Walk through entry and exit as one story: ticket in, fee out.

\`\`\`java
// Allocation must be atomic; pricing swaps via Strategy
class ParkingLot {
    Ticket park(Vehicle v) {
        Spot s = findNearestFree(v.size()); // synchronized
        s.occupy(); return new Ticket(s, now());
    }
    double checkout(Ticket t) { return pricing.calculate(t); }
}
\`\`\`

## Keep in mind

- Entities first: Lot, Floor, Spot, Vehicle, Ticket, Gate, Pricing.
- Spot allocation must be atomic or two cars share one spot.
- Pricing as Strategy: hourly, daily, and surge swap without edits.
- Nearest-free allocation beats random for real lots, so say it.
- Availability display reads spot state, never a separate counter that drifts.`,
  },
  {
    slug: "bookmyshow",
    title: "LLD of BookMyShow (Interview Question) | Design MovieTicketBooking",
    tag: "Interview Question",
    body: `BookMyShow centers on one hard problem: two users grabbing the same seat. Requirements span movies, theatres, shows with seat maps, temporary seat holds, payment, and confirmed bookings with cancellation. The hold-then-confirm flow with a timeout is the design every interviewer wants to hear.

Model Movie, Theatre, Show (movie plus screen plus time), Seat with a state machine (Available, Held, Booked), and Booking tying user to seats plus payment. The flow: select seats, hold them with a TTL (say ten minutes), pay within the window, confirm on success or release on timeout. The hold must be atomic per seat, and payment failure must always release.

\`\`\`java
// Hold with TTL, confirm on payment, release on timeout
class BookingService {
    Hold holdSeats(User u, Show s, List<Seat> seats) {
        lock(seats); // atomic per-seat transition Available -> Held
        return new Hold(u, seats, now().plusMinutes(10));
    }
    Booking confirm(Hold h, Payment p) { /* pay, then Held -> Booked */ }
}
\`\`\`

## Keep in mind

- Seat states Available, Held, Booked with a TTL on holds is the core.
- Hold must be atomic per seat or double booking happens.
- Payment failure must always release held seats, no exceptions.
- Cancellation returns seats to Available and triggers refund flow.
- Concurrency answer: lock or CAS on the seat state transition.`,
  },
  {
    slug: "atm",
    title: "LLD of ATM (Interview question)",
    tag: "Interview Question",
    body: `ATM design is about secure transactional flows with hardware. Requirements: card authentication with PIN, balance inquiry, cash withdrawal with denomination breakup, deposit, and PIN change, all against daily limits and cash availability. Every cash movement must be transactional: dispense and debit succeed or fail together.

The entities are Card, Account, Transaction records, CashDispenser with denomination inventory, and the ATM controller orchestrating screens. Withdrawal is the walkthrough to master: authenticate, validate limits and balance, reserve the amount, dispense notes via Chain of Responsibility over denominations, and commit the ledger only after successful dispense. Failures at any step roll back cleanly.

\`\`\`java
// Dispense and debit are one atomic unit
class ATM {
    Receipt withdraw(Card c, int pin, int amount) {
        Account a = bank.authenticate(c, pin);
        validate(a, amount); // limits, balance, cash stock
        dispense(amount);    // chain over denominations
        return bank.debit(a, amount); // commit only after dispense
    }
}
\`\`\`

## Keep in mind

- Cash dispense plus account debit must be atomic: never one without the other.
- Denomination breakup is a Chain of Responsibility over note types.
- Validate in order: PIN, daily limits, balance, machine cash stock.
- Every action writes an audit Transaction record for reconciliation.
- Card retention on repeated wrong PINs is expected detail, so mention it.`,
  },
  {
    slug: "splitwise",
    title: "LLD of Splitwise (Interview Question)",
    tag: "Interview Question",
    body: `Splitwise is a graph problem disguised as an app: track who paid what, compute who owes whom, and simplify debts. Requirements cover users, groups, expenses with equal or custom splits, payments recording, and balance sheets per user and group. The simplification algorithm is what separates good answers from great ones.

Model User, Group, Expense with a list of splits, and Payment records. Balances derive from expenses minus payments, never stored as primary truth. Debt simplification uses the classic greedy: repeatedly match the biggest creditor with the biggest debtor until all settle, which minimizes transaction count. Walk through one group dinner with unequal shares to prove splits work.

\`\`\`java
// Balances derive from events; simplification is greedy max-match
class Expense { User payer; int amount; List<Split> splits; }
class Settlement {
    List<Payment> simplify(Map<User, Integer> balances) {
        // repeatedly match max creditor with max debtor
    }
}
\`\`\`

## Keep in mind

- Store expenses and payments as truth, derive balances: never the reverse.
- Support equal, exact, and percentage splits from the start.
- Greedy max creditor to max debtor minimizes settlement transactions.
- Groups scope expenses; friendships scope direct payments.
- Show one unequal dinner split end to end in the walkthrough.`,
  },
  {
    slug: "cricbuzz",
    title: "LLD of Cricbuzz / Cricinfo",
    tag: "Interview Question",
    body: `Cricbuzz is a live-score fan-out problem: one ball event must reach millions of viewers within seconds. Requirements include matches across formats, ball-by-ball commentary, scorecards with batting and bowling figures, points tables, and push notifications for key events. The read-to-write ratio is extreme, so the design is read-optimized.

Structure it as Match owning Innings owning Overs of Ball events, with Scorecard as a derived projection updated per ball. The write path is tiny (one ball event), while reads fan out through caching layers and WebSocket or SSE push channels. Key events like wickets and milestones publish to a notification topic. Over and innings transitions are state changes worth modeling explicitly.

\`\`\`java
// Tiny write path, massive cached read fan-out
class Match {
    void recordBall(Ball b) {
        innings.add(b);          // append event
        scorecard.apply(b);      // update projection
        publisher.publish(b);    // fan out to viewers
    }
}
\`\`\`

## Keep in mind

- Ball is the atomic event: everything derives from the ball stream.
- Scorecard is a projection, not the source of truth.
- Extreme read-write skew means cache plus push, never per-request computation.
- Model over and innings transitions as explicit state changes.
- Key events (wickets, fifties) go to a separate notification topic.`,
  },
  {
    slug: "inventory-management",
    title: "LLD of Inventory Management System",
    tag: "Interview Question",
    body: `Inventory management is about correctness under concurrency: stock counts must never go negative and two orders must never consume the same unit. Requirements span products with SKUs, warehouses with stock levels, purchase orders inbound, sales orders outbound, low-stock alerts, and audit history of every movement.

The core entities are Product, Warehouse, StockLevel per product per warehouse, and StockMovement records for every inbound and outbound change. Current levels derive from the movement log, and decrements use atomic check-and-decrement so overselling is impossible. Low-stock thresholds publish alerts, and every adjustment carries a reason for audit.

\`\`\`java
// Decrement must be atomic: check and update as one unit
class Inventory {
    boolean reserve(SKU sku, Warehouse w, int qty) {
        synchronized (lock(sku, w)) {
            if (level(sku, w) < qty) return false;
            apply(new Movement(sku, w, -qty, "order"));
            return true;
        }
    }
}
\`\`\`

## Keep in mind

- Never let stock go negative: atomic check-and-decrement is the invariant.
- Movement log is truth, current levels are derived: full auditability.
- Separate reservation (temporary hold) from final deduction.
- Low-stock alerts fire on thresholds via Observer-style notification.
- Multi-warehouse adds allocation strategy: nearest, cheapest, or fullest first.`,
  },
  {
    slug: "coupons-shopping-cart",
    title: "LLD: Apply Coupons on Shopping Cart products",
    tag: "Interview Question",
    body: `Coupons on a cart test rule engines and the Strategy plus Chain combination. Requirements: a cart with items, multiple coupon types (percentage off, flat off, buy-one-get-one, free shipping), eligibility rules (minimum cart value, category restrictions, expiry, per-user limits), and stacking policies deciding which coupons combine.

Model Coupon with its type, rules, and validity window, and a DiscountStrategy per coupon type behind one interface. A CouponEngine validates eligibility, applies combinable coupons in a defined order, and returns a price breakdown callers can audit. Order of application matters financially, so percentage discounts typically apply before flat ones, and the policy must be explicit.

\`\`\`java
// Each coupon type is a strategy; the engine orders them
interface Discount { int apply(Cart c); boolean eligible(Cart c, User u); }
class CouponEngine {
    Bill checkout(Cart c, List<Coupon> coupons, User u) {
        // validate all, sort by policy, apply sequentially with breakdown
    }
}
\`\`\`

## Keep in mind

- Coupon types are Strategies: percentage, flat, BOGO, free shipping.
- Eligibility is a rule chain: expiry, min value, category, per-user limits.
- Application order changes the total, so the policy must be explicit.
- Return an itemized breakdown so totals stay auditable.
- Stacking policy first: combinable, exclusive, or best-only.`,
  },
  {
    slug: "payment-gateway",
    title: "LLD of Payment Gateway | Low Level Design of Payments App",
    tag: "Interview Question",
    body: `A payment gateway routes money safely between customers, merchants, and banks. Requirements cover multiple payment methods (cards, UPI, netbanking, wallets), idempotent charge requests, webhook callbacks from banks, refunds, and full reconciliation. The non-negotiable invariant is never double-charge and never lose a payment state.

The design centers on Payment with a strict state machine (Initiated, Processing, Success, Failed, Refunded), an idempotency key on every charge so retries return the original result, and Strategy implementations per payment method behind one processor interface. Webhooks arrive out of order and duplicated, so they must be verified, deduplicated, and applied as transitions. A reconciliation job compares gateway records against bank settlements daily.

\`\`\`java
// Idempotency key plus state machine makes money safe
class PaymentService {
    Payment charge(String idempotencyKey, Money m, Method method) {
        if (seen(idempotencyKey)) return previous(idempotencyKey);
        Payment p = create(idempotencyKey, m); // Initiated
        return processor.forMethod(method).execute(p); // transitions
    }
}
\`\`\`

## Keep in mind

- Idempotency key on every charge: retries return the stored result, never re-charge.
- Payment states are a strict machine: Initiated, Processing, Success, Failed, Refunded.
- Webhooks are untrusted, duplicated, and unordered: verify, dedupe, then apply.
- Method variety is a Strategy: cards, UPI, netbanking, wallets behind one interface.
- Daily reconciliation against bank settlements catches everything automation misses.`,
  },
];
