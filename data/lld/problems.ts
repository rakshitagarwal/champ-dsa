import type { LldTopic } from "./types";

export const PROBLEMS: LldTopic[] = [
  {
    slug: "parking-lot",
    title: "Design Parking Lot",
    tag: "Interview Question",
    body: `Parking Lot is the most asked LLD problem, so interviewers expect a complete object model—not just a diagram. **Functional requirements:** multiple floors; spot sizes for bikes, compact cars, and trucks; entry gates that issue tickets; exit gates that compute fees from duration and vehicle type; and a live availability board. **Non-functional:** entry concurrency—two vehicles must never be assigned the same spot; fee rules should change (hourly, daily, surge) without rewriting core logic.

**Entities and relationships:** \`ParkingLot\` aggregates \`Floor\` objects; each floor owns many \`Spot\` instances tagged with a \`SpotSize\`. A \`Vehicle\` (with size) enters through an \`EntryGate\`; the lot returns a \`Ticket\` binding vehicle, spot, and entry timestamp. Exit uses the same ticket plus a \`PricingStrategy\` to produce a fee. Spots are the source of truth for occupancy—gates only orchestrate.

**Key algorithm—nearest compatible allocation:** scan floors/spots (often smallest floor first) for the first free spot whose size fits the vehicle; **atomically** flip \`occupied\` (DB row lock, \`SELECT FOR UPDATE\`, or compare-and-set). On exit: \`fee = strategy.calculate(ticket, exitTime)\`, collect payment, then free the spot.

## Real-world example

Airport and mall parking apps (ParkWhiz, SpotHero, FastTag-linked garage systems) mirror this model: a **facility** has **levels**, each level has **slots** by vehicle class, **ANPR or ticket** on entry, and **tariff engines** on exit.

- **ParkingLot / Floor / Spot** map to garage hierarchy in operator dashboards; occupancy is per-slot telemetry or loop detectors.
- **Ticket** is the QR/barcode or license-plate session; duration drives billing.
- **PricingStrategy** swaps peak/off-peak, event surge, or member discounts without changing allocation code.
- **Atomic allocation** is why production uses row-level locks or reservation tokens—double booking causes physical conflicts.

## Core classes

\`ParkingLot\`, \`Floor\`, \`Spot\` (size + occupied), \`Vehicle\` (size), \`Ticket\` (spot, vehicle, entry time), \`Gate\` (entry/exit), \`PricingStrategy\` (hourly/daily/surge). Allocation = nearest free compatible spot in one atomic step.

\`\`\`ts
enum SpotSize { Bike, Compact, Large }

interface PricingStrategy {
  calculate(ticket: Ticket, exitTime: Date): number;
}

class Spot {
  constructor(
    readonly id: string,
    readonly size: SpotSize,
    private occupied = false,
  ) {}
  isFree(): boolean { return !this.occupied; }
  occupy(): void { this.occupied = true; }
  release(): void { this.occupied = false; }
}

class Ticket {
  constructor(
    readonly spot: Spot,
    readonly vehicle: Vehicle,
    readonly entryTime: Date,
  ) {}
}

class ParkingLot {
  constructor(
    private floors: Floor[],
    private pricing: PricingStrategy,
  ) {}

  park(vehicle: Vehicle): Ticket {
    const spot = this.findNearestFree(vehicle.size); // must be atomic in production
    spot.occupy();
    return new Ticket(spot, vehicle, new Date());
  }

  checkout(ticket: Ticket): number {
    const fee = this.pricing.calculate(ticket, new Date());
    ticket.spot.release();
    return fee;
  }

  private findNearestFree(size: SpotSize): Spot { /* scan floors */ throw new Error("impl"); }
}
\`\`\`

## Key decisions

- **Atomic allocation:** find + mark occupied as one unit—two cars never share a spot.
- **Pricing as Strategy:** hourly, daily, surge, and vehicle-type multipliers swap without editing \`ParkingLot\`.
- **Nearest-free (or smallest-fit):** better UX and traffic flow than random assignment.
- **Availability from spot state:** aggregate counts for display, but never treat counters as authoritative—they drift.

## Walkthrough

A car reaches the entry gate—the system picks the nearest free car-size spot atomically and issues a \`Ticket\` (spot + timestamp). The availability board reflects one fewer compact slot. At exit, duration and vehicle type feed \`PricingStrategy\`; after payment, the spot frees and the board updates. A second car requesting mid-allocation sees the spot already occupied and receives the next candidate.

**Mistake:** "Track availability in a separate counter and decrement on entry."
**Correct:** "Spots own occupancy; allocate atomically; price via Strategy—ticket in, fee out, spot released."

## Keep in mind

- Name entities first: Lot, Floor, Spot, Vehicle, Ticket, Gate, Pricing.
- Spot allocation must be atomic or two cars share one spot in concurrent entry.
- Keep pricing in a Strategy: hourly, daily, surge swap without core edits.
- Nearest-free (or best-fit by size) beats random—say it explicitly.
- Display availability by scanning spot state (or cached projection), not a lone counter.`,
  },
  {
    slug: "elevator-system",
    title: "LLD of Elevator System",
    tag: "Interview Question",
    body: `Elevator LLD tests **concurrent state machines** and **dispatch scheduling**. **Requirements:** multiple elevators serving many floors; hall buttons (up/down) and car buttons (floor destinations); door open/close and movement; a policy that picks which car serves each hall call. Passengers press buttons while cars move—request intake must be thread-safe.

**Entities:** \`Building\` holds \`Elevator\` cars and \`Floor\` indices. Each \`Elevator\` has current floor, direction (\`Up\` | \`Down\` | \`Idle\`), a **State** (\`Idle\`, \`Moving\`, \`DoorsOpen\`), and a stop queue. \`HallRequest\` = (floor, direction); \`CarRequest\` = destination floor. \`Dispatcher\` applies a **scheduling strategy** (SCAN is the interview default).

**SCAN algorithm:** each car keeps moving in its current direction, serving all queued stops in order; when no stops remain ahead, it reverses or idles. Dispatch scores cars by distance, direction match, and load—**a nearest car heading away is worse** than a farther car already moving toward the floor.

## Real-world example

Otis, KONE, and Schindler group controllers implement the same abstractions: **cars** as state machines, **hall/car calls** as events, and **dispatch** as configurable algorithms (SCAN, LOOK, destination dispatch in modern systems).

- **Elevator + State** mirror firmware modes: idle at floor, running, door cycle, out of service.
- **Request** objects are persisted call records; panels only emit requests—they do not pick the car.
- **Dispatcher** is the group supervisor assigning calls to minimize wait and energy (direction-aware).
- **Synchronized queues** on each car match why stop lists are updated under locks during motion.

## Core classes

\`Building\`, \`Elevator\` (floor, direction, state, stop set), \`HallRequest\`, \`CarRequest\`, \`Dispatcher\` (strategy owner). States as classes—never a pile of booleans.

\`\`\`ts
enum Direction { Up, Down, Idle }

interface ElevatorState {
  onMove(e: Elevator): void;
  onOpenDoors(e: Elevator): void;
}

class Elevator {
  floor = 0;
  direction: Direction = Direction.Idle;
  private stops = new Set<number>();
  constructor(private state: ElevatorState) {}

  addStop(floor: number): void { this.stops.add(floor); }
  move(): void { this.state.onMove(this); }
  openDoors(): void { this.state.onOpenDoors(this); }
  setState(state: ElevatorState): void { this.state = state; }
}

class HallRequest {
  constructor(readonly floor: number, readonly direction: Direction) {}
}

class Dispatcher {
  assign(request: HallRequest, cars: Elevator[]): Elevator {
    // SCAN: prefer in-direction, then distance
    throw new Error("impl");
  }
}
\`\`\`

## Key decisions

- **SCAN (or LOOK) scheduling:** serve along direction, then reverse—the algorithm interviewers expect.
- **States as classes:** \`Idle\`, \`Moving\`, \`DoorsOpen\` avoid nested switches as features grow.
- **Synchronized intake:** hall and car buttons race movement—guard stop lists and state transitions.
- **Single decider:** panels produce requests; only the dispatcher assigns cars.

## Walkthrough

An up request arrives from floor 5—the dispatcher picks the nearest car already heading up (or idle nearby) and adds floor 5 to its stop queue. The car arrives, enters \`DoorsOpen\`, passenger presses 9 inside—9 joins the car queue. After serving all stops upward, the car reverses or idles. Show one external hall call plus one internal floor press end to end.

**Mistake:** "Always assign the geographically nearest elevator."
**Correct:** "Direction-aware SCAN—a nearest car heading away loses; walk hall + car requests."

## Keep in mind

- Entities: Elevator, Floor, Panel, Request, Dispatcher, State.
- SCAN: serve along direction, then reverse—name it early.
- Model Idle, Moving, DoorsOpen as states, not boolean flags.
- Concurrency: button events vs. motion—protect shared stop sets.
- Walk one outside request and one inside destination through the full cycle.`,
  },
  {
    slug: "atm",
    title: "LLD of ATM",
    tag: "Interview Question",
    body: `ATM design covers **secure transactional flows** and **hardware coupling**. **Requirements:** card + PIN authentication; balance inquiry; cash withdrawal with denomination mix; deposit; PIN change; daily limits and machine cash inventory. **Invariant:** dispense and ledger debit succeed together or neither happens.

**Entities:** \`Card\` links to \`Account\` at the \`BankService\`. \`ATM\` drives UI screens and coordinates hardware. \`CashDispenser\` tracks note counts per denomination. Every action creates an immutable \`Transaction\` audit row. Withdrawal path: authenticate → validate (PIN, limits, balance, stock) → compute note mix → dispense → **commit debit** only after notes leave.

**Denomination algorithm:** greedy from largest note downward (or backtracking if greedy fails)—often modeled as **Chain of Responsibility** where each handler tries one denomination then passes remainder.

## Real-world example

NCR and Diebold ATMs and bank switch networks (Visa/Mastercard rails) use the same separation: **terminal controller**, **host authorization**, **cassette inventory**, and **atomic settlement**.

- **ATM** orchestrates screens and hardware; it does not own account truth—the host does.
- **CashDispenser** maps to physical cassettes; low-stock alerts block large withdrawals.
- **Transaction** records match ISO 8583-style audit trails for reconciliation.
- **Validate-then-dispense-then-debit** mirrors two-phase commit: never debit before cash is physically dispensed.

## Core classes

\`Card\`, \`Account\`, \`Transaction\`, \`CashDispenser\` (denomination inventory), \`BankService\`, \`ATM\` (screen flow). Withdrawal = validate → dispense → commit.

\`\`\`ts
class Account {
  constructor(readonly id: string, private balance: number) {}
  canWithdraw(amount: number): boolean { return this.balance >= amount; }
  debit(amount: number): void { this.balance -= amount; }
}

class CashDispenser {
  constructor(private notes: Map<number, number>) {} // denomination -> count
  canDispense(amount: number): boolean { /* check inventory */ return true; }
  dispense(amount: number): Map<number, number> { /* greedy / chain */ return new Map(); }
}

class ATM {
  constructor(private bank: BankService, private dispenser: CashDispenser) {}

  withdraw(card: Card, pin: string, amount: number): Transaction {
    const account = this.bank.authenticate(card, pin);
    this.validate(account, amount);
    const mix = this.dispenser.dispense(amount); // hardware step
    const txn = this.bank.debit(account, amount, mix); // commit after dispense
    return txn;
  }

  private validate(account: Account, amount: number): void {
    /* limits, balance, dispenser stock */
  }
}
\`\`\`

## Key decisions

- **Atomic dispense + debit:** money out and ledger cut together—rollback if jam or host timeout.
- **Denomination chain:** largest notes first; fail early if no valid mix exists.
- **Validation order:** PIN → daily limits → balance → machine cash stock.
- **Audit everything:** each step writes a \`Transaction\` for dispute resolution.

## Walkthrough

Card inserted, PIN correct—₹5000 requested. System checks limits, balance, and cassette stock; chain dispenses e.g. 2000×2 + 1000×1. Only after notes exit does the host debit commit. Mid-dispense jam aborts dispense—**no debit**, customer sees error, audit logs failure. Mention card capture after repeated wrong PINs.

**Mistake:** "Debit the account first, then dispense cash."
**Correct:** "Validate, dispense, then commit debit—with audit at each step."

## Keep in mind

- Dispense and debit must be one logical transaction.
- Denomination breakup = Chain of Responsibility or bounded greedy search.
- Validate: PIN, limits, balance, machine stock—in that order.
- Immutable audit \`Transaction\` rows for every action.
- Card retention after N failed PINs is expected follow-up detail.`,
  },
  {
    slug: "vending-machine",
    title: "Design Vending Machine",
    tag: "Interview Question",
    body: `Vending Machine is the **State pattern** in miniature. **Requirements:** accept coins/cash, select a product, dispense item and change, cancel with refund, handle sold-out SKUs. The machine must reject illegal actions (select before payment, double dispense).

**Entities:** \`VendingMachine\` holds \`Item\` inventory (price, quantity), a \`CoinStore\` (inserted value), and \`currentState\`. Each **state class** (\`NoCoin\`, \`HasCoin\`, \`Dispensing\`, \`SoldOut\`) implements allowed transitions: insert coin, select item, cancel, dispense complete. Change = inserted − price, returned via greedy coin breakdown.

**Flow:** \`NoCoin\` + insert → \`HasCoin\`; \`HasCoin\` + valid selection → dispense + change → \`NoCoin\`; cancel from \`HasCoin\` refunds → \`NoCoin\`; zero stock → \`SoldOut\` (often still allows another selection after refund path).

## Real-world example

Canteen and airport vending platforms (Crane, Sanden) use the same phased controller: **idle**, **credit accumulated**, **vend motor active**, **fault/sold out**.

- **State classes** map to PLC states—transitions are explicit, not scattered \`if\` chains.
- **Item** + slot inventory mirrors spiral columns and motor feedback.
- **CoinStore** corresponds to coin mech + bill validator running totals.
- **Cancel/refund** paths are first-class because cash handling is regulated.

## Core classes

\`VendingMachine\`, \`Item\`, \`CoinStore\`, \`VendingState\` implementations (\`NoCoin\`, \`HasCoin\`, \`Dispensing\`, \`SoldOut\`).

\`\`\`ts
interface VendingState {
  insertCoin(machine: VendingMachine, amount: number): void;
  selectItem(machine: VendingMachine, code: string): void;
  cancel(machine: VendingMachine): void;
}

class HasCoin implements VendingState {
  insertCoin(machine: VendingMachine, amount: number): void {
    machine.addCredit(amount);
  }
  selectItem(machine: VendingMachine, code: string): void {
    const item = machine.getItem(code);
    if (!item || item.quantity === 0) {
      machine.setState(new SoldOut());
      return;
    }
    machine.dispense(item);
    machine.returnChange();
    machine.setState(new NoCoin());
  }
  cancel(machine: VendingMachine): void {
    machine.refund();
    machine.setState(new NoCoin());
  }
}

class VendingMachine {
  private credit = 0;
  constructor(private state: VendingState, private items: Map<string, Item>) {}
  setState(state: VendingState): void { this.state = state; }
  addCredit(n: number): void { this.credit += n; }
  dispense(item: Item): void { item.quantity -= 1; }
  refund(): void { this.credit = 0; }
  returnChange(): void { /* price vs credit */ }
  getItem(code: string): Item | undefined { return this.items.get(code); }
}
\`\`\`

## Key decisions

- **State classes own transitions**—the machine delegates; no giant \`switch(status)\`.
- **Change math:** inserted minus price; greedy over available coin denominations.
- **Cancel path:** full refund from any pre-dispense state.
- **Stock:** decrement only on successful dispense; sold-out is a state/response, not silent failure.

## Walkthrough

User inserts ₹100 for a ₹70 item—\`NoCoin\` → \`HasCoin\`. Button pressed—stock OK, item drops, ₹30 returned, → \`NoCoin\`. User inserts again but picks empty slot—→ \`SoldOut\`, credit retained for another pick or cancel refunds ₹100.

**Mistake:** "One enum and a switch for all behavior."
**Correct:** "One class per state; transitions inside states; cancel and sold-out explicit."

## Keep in mind

- Four states: NoCoin, HasCoin, Dispensing, SoldOut (names may vary).
- Change = credit − price; greedy breakdown.
- Cancel refunds from any pre-dispense state.
- SoldOut must not swallow money—refund or reselect.
- Quantity updates only after successful vend.`,
  },
  {
    slug: "library-system",
    title: "Design Library Management System",
    tag: "Interview Question",
    body: `Library Management combines **catalog metadata**, **copy-level inventory**, and **loan lifecycle**. **Requirements:** books (many copies), members, checkout with due dates, fines, reservations/waitlists, search by title/author/ISBN. Each **physical copy** has its own status—never lend the same copy twice.

**Entities:** \`Book\` = bibliographic record (title, author, ISBN). \`BookCopy\` = barcode + state (\`Available\`, \`Borrowed\`, \`Reserved\`). \`Member\` has type (student/faculty) for fine rules. \`Loan\` links member, copy, checkout/ due dates. \`Reservation\` queues members when all copies are out. **FineStrategy** computes overdue charges without hardcoding rates in \`Loan\`.

**State machine:** only \`Available\` copies may \`borrow()\`; return moves to \`Available\` or \`Reserved\` if waitlist head exists—notify next member.

## Real-world example

Koha, Evergreen, and university ILS products split **bibliographic** vs **holdings** exactly this way—think WorldCat metadata vs shelf barcode.

- **Book vs BookCopy** = MARC record vs item barcode scanned at circulation desk.
- **Loan** rows power due-date emails and fine calculation on return scan.
- **Reservation queue** becomes "holds" in OPAC—next return triggers pickup notice.
- **FineStrategy** maps to patron categories (staff, student, public) in policy tables.

## Core classes

\`Book\`, \`BookCopy\` (barcode + status), \`Member\`, \`Loan\`, \`Reservation\`, \`FineStrategy\`.

\`\`\`ts
enum CopyStatus { Available, Borrowed, Reserved }

interface FineStrategy {
  compute( loan: Loan, returnDate: Date): number;
}

class BookCopy {
  status: CopyStatus = CopyStatus.Available;
  constructor(readonly barcode: string, readonly book: Book) {}

  borrow(): void {
    if (this.status !== CopyStatus.Available) throw new Error("Copy not available");
    this.status = CopyStatus.Borrowed;
  }

  returnCopy(hasWaitlist: boolean): void {
    this.status = hasWaitlist ? CopyStatus.Reserved : CopyStatus.Available;
  }
}

class Loan {
  constructor(
    readonly member: Member,
    readonly copy: BookCopy,
    readonly dueDate: Date,
  ) {}
}

class LibraryService {
  checkout(member: Member, copy: BookCopy): Loan {
    copy.borrow();
    return new Loan(member, copy, this.dueDateFor(member));
  }
}
\`\`\`

## Key decisions

- **Book vs BookCopy:** metadata once, many lendable items—decide this first.
- **Copy state machine:** illegal double-issue becomes impossible.
- **Fine Strategy:** member-type rates without changing checkout code.
- **Reservation queue:** on return, offer copy to head of queue before open shelf.

## Walkthrough

Member requests *Clean Code*—available copy A123 checks out, \`Loan\` due in 14 days, copy \`Borrowed\`. Returned on time → \`Available\`. Returned late → \`FineStrategy\` charge. Both copies out—\`Reservation\` queues member; next return sets copy \`Reserved\` and notifies waitlist.

**Mistake:** "Single Book class with a borrowed boolean."
**Correct:** "Split Book/BookCopy; state-guarded borrow; fines via Strategy; reservation queue."

## Keep in mind

- Book (metadata) and BookCopy (physical) stay separate.
- States: Available / Borrowed / Reserved.
- Fines in Strategy—rates vary by member type.
- Waitlist on return before re-shelving.
- Walk due date → overdue fine in the narrative.`,
  },
  {
    slug: "hotel-booking",
    title: "Design Hotel Booking System",
    tag: "Interview Question",
    body: `Hotel booking is **date-range inventory**: one physical room cannot overlap two confirmed stays. **Requirements:** hotels and room types, search by city + check-in/check-out, book with payment, check-in/out, cancel with policy-based refund.

**Entities:** \`Hotel\` has \`Room\` instances (type, nightly rate). \`Guest\` / \`User\` places \`Booking\` (room, date range, status: Pending/Confirmed/Cancelled/CheckedIn). \`Payment\` captures charge/refund. **Overlap query:** for room R and [start, end), no other Confirmed booking intersects. **CancellationPolicy** (Strategy) returns refund amount from cancel time vs check-in.

**Booking algorithm:** in one transaction—lock room row or version field → run overlap check → insert booking → charge. Concurrent double-book fails on overlap or optimistic conflict.

## Real-world example

Booking.com, Marriott Bonvoy, and OYO expose the same core: **property**, **room nights**, **hold/confirm**, **cancellation tiers**.

- **Room + date range** is the inventory unit—OTA calendars are per-room-type aggregation of this invariant.
- **BookingService** overlap check matches PMS (Opera, Cloudbeds) night-level allotments.
- **CancellationPolicy** mirrors non-refundable vs free-cancel-before-48h product flags.
- **Search** reads cached availability; **book** writes transactionally—CQRS-lite.

## Core classes

\`Hotel\`, \`Room\`, \`Booking\`, \`Payment\`, \`CancellationPolicy\`, \`BookingService\`.

\`\`\`ts
type DateRange = { checkIn: Date; checkOut: Date };

interface CancellationPolicy {
  refundAmount(booking: Booking, cancelledAt: Date): number;
}

class Booking {
  constructor(
    readonly guest: Guest,
    readonly room: Room,
    readonly range: DateRange,
    public status: "Confirmed" | "Cancelled" = "Confirmed",
  ) {}
}

class BookingService {
  constructor(private policy: CancellationPolicy) {}

  book(guest: Guest, room: Room, range: DateRange): Booking {
    // DB transaction: overlap check + insert + charge
    if (this.overlaps(room, range)) throw new Error("Room taken for these dates");
    const booking = new Booking(guest, room, range);
    this.charge(booking);
    return booking;
  }

  cancel(booking: Booking): number {
    const refund = this.policy.refundAmount(booking, new Date());
    booking.status = "Cancelled";
    return refund;
  }

  private overlaps(room: Room, range: DateRange): boolean { return false; }
  private charge(booking: Booking): void {}
}
\`\`\`

## Key decisions

- **Overlap invariant:** state it first—one room, no overlapping confirmed stays.
- **Atomic book:** check + hold + pay as one unit (lock or optimistic versioning).
- **Cancellation as Strategy:** free, partial, non-refundable products swap cleanly.
- **Search vs book:** cached reads for browsing; transactional writes for confirm.

## Walkthrough

Guest searches Udaipur Dec 20–22—available rooms from range query (minus confirmed bookings). Book runs atomically: no overlap, room held, payment captured. Cancel Dec 18 under free-cancel policy → full refund. Two concurrent books for same room—second transaction sees overlap and fails cleanly.

**Mistake:** "Check availability in UI, then book in a separate request without locking."
**Correct:** "Atomic check-and-hold; overlap invariant; cancellation via policy Strategy."

## Keep in mind

- Core invariant: no overlapping confirmed stays per room.
- Check-and-hold must be atomic—never two-step race.
- Overlap = interval intersection—index (room_id, dates).
- Cancellation policies belong in Strategy.
- Cache search; transact booking.`,
  },
  {
    slug: "bookmyshow",
    title: "LLD of BookMyShow | Design MovieTicketBooking",
    tag: "Interview Question",
    body: `Movie ticketing LLD hinges on **seat-level concurrency**. **Requirements:** movies, theatres/screens, shows (movie + time + layout), interactive seat map, temporary holds, payment, confirmed tickets, cancellation/refund. Two users must never confirm the same seat.

**Entities:** \`Movie\`, \`Theatre\`, \`Screen\` (seat layout), \`Show\` (screen + start time). Each \`Seat\` has state \`Available | Held | Booked\` and optional \`holdExpiry\`. \`Hold\` groups seats for one user with TTL (~10 min). \`Booking\` ties user, show, seats, payment status.

**Flow:** select seats → **atomic** Available→Held for all seats in cart → pay before expiry → Held→Booked; on payment failure or timeout → release to Available. Use per-seat row lock or CAS on status.

## Real-world example

BookMyShow, Ticketmaster, and AMC use **hold baskets**, **inventory locks**, and **payment webhooks** with the same state machine.

- **Seat** state maps to real-time seat maps backed by row-level locks or Redis CAS.
- **Hold + TTL** is the shopping cart timer—expiry cron or delayed queue releases inventory.
- **BookingService.confirm** runs after payment gateway success—never on click alone.
- **Cancellation** reverses Booked→Available and triggers refund pipeline.

## Core classes

\`Movie\`, \`Theatre\`, \`Show\`, \`Seat\`, \`Hold\`, \`Booking\`, \`BookingService\`.

\`\`\`ts
enum SeatStatus { Available, Held, Booked }

class Seat {
  constructor(
    readonly id: string,
    public status: SeatStatus = SeatStatus.Available,
    public holdExpiry?: Date,
  ) {}
}

class Hold {
  constructor(
    readonly userId: string,
    readonly showId: string,
    readonly seatIds: string[],
    readonly expiresAt: Date,
  ) {}
}

class BookingService {
  holdSeats(userId: string, show: Show, seats: Seat[]): Hold {
    // transaction: all seats Available -> Held or rollback
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    for (const s of seats) {
      if (s.status !== SeatStatus.Available) throw new Error("Seat taken");
      s.status = SeatStatus.Held;
      s.holdExpiry = expiresAt;
    }
    return new Hold(userId, show.id, seats.map(s => s.id), expiresAt);
  }

  confirm(hold: Hold, paymentId: string): Booking {
    // verify payment, Held -> Booked
    throw new Error("impl");
  }

  release(hold: Hold): void {
    /* Held -> Available */
  }
}
\`\`\`

## Key decisions

- **Seat states:** Available → Held (TTL) → Booked—never skip Held in interview answers.
- **Atomic hold:** all seats in cart transition together or none.
- **Failure releases:** payment failure and timeout always free seats.
- **Cancellation:** Booked → Available + refund workflow.

## Walkthrough

User picks 2 seats—both flip to Held atomically, 10-minute TTL starts. Payment succeeds at T+5 → Booked, tickets issued. Payment fails → immediate release. TTL expires → background job releases. Mention lock/CAS on seat row for concurrency story.

**Mistake:** "Mark Booked when user clicks a seat."
**Correct:** "Available–Held–Booked; atomic hold; TTL; release on failure/timeout."

## Keep in mind

- Held carries TTL—core of the design.
- Hold must be atomic per transaction/cart.
- Failed payments always release—no exceptions.
- Cancellation restores inventory and triggers refund.
- Concurrency: row lock, CAS, or serializable transaction on seat.`,
  },
  {
    slug: "cab-booking",
    title: "Design Cab Booking (Uber)",
    tag: "Interview Question",
    body: `Cab booking blends **spatial matching**, **pricing**, and **trip lifecycle**. **Requirements:** rider requests pickup/drop; find nearby available drivers; fare estimate with surge; trip states Requested → Matched → Ongoing → Completed (or Cancelled); payment and mutual ratings.

**Entities:** \`Rider\`, \`Driver\` (location, status: Available/OnTrip/Offline), \`Trip\` (parties, route, fare, status). \`MatchingService\` queries drivers near pickup (geohash/H3 cell, not full table scan). \`PricingStrategy\` = base + distance/time + surge multiplier. **Assignment** must be atomic—one driver accepts one trip (CAS on driver status).

**Trip state machine** gates cancel fees and location sharing—cancel rules depend on current state (e.g. fee after Matched).

## Real-world example

Uber, Ola, and Lyft production stacks separate **supply location indexes**, **dispatch**, **trip state**, and **fare engines** the same way.

- **Driver** location streams update geospatial indexes (Redis GEO, S2/H3)—matching is cell-local.
- **Trip** status drives rider/driver UI and billing (metered vs upfront estimate).
- **PricingStrategy** encodes surge as dynamic multiplier on top of base fare tables.
- **Atomic assignment** prevents double dispatch when two riders match one driver.

## Core classes

\`Rider\`, \`Driver\`, \`Trip\`, \`MatchingService\`, \`PricingStrategy\`.

\`\`\`ts
enum DriverStatus { Available, OnTrip, Offline }
enum TripStatus { Requested, Matched, Ongoing, Completed, Cancelled }

class Driver {
  constructor(
    readonly id: string,
    public location: { lat: number; lng: number },
    public status: DriverStatus = DriverStatus.Available,
  ) {}
}

class Trip {
  constructor(
    readonly rider: Rider,
    public driver: Driver | null,
    readonly pickup: GeoPoint,
    readonly drop: GeoPoint,
    public status: TripStatus = TripStatus.Requested,
    public estimatedFare?: number,
  ) {}
}

class MatchingService {
  requestTrip(rider: Rider, pickup: GeoPoint, drop: GeoPoint): Trip {
    const driver = this.nearestAvailable(pickup); // geohash bucket lookup
    if (!driver) throw new Error("No drivers nearby");
    driver.status = DriverStatus.OnTrip;
    return new Trip(rider, driver, pickup, drop);
  }

  private nearestAvailable(pickup: GeoPoint): Driver | null { return null; }
}
\`\`\`

## Key decisions

- **Nearby search:** geohash/H3 indexed locations—not O(n) over all drivers.
- **Trip state machine:** strict transitions; cancel policy per state.
- **Pricing Strategy:** base + distance + surge—swap rules without touching matching.
- **Assignment atomicity:** compare-and-set driver Available → OnTrip.

## Walkthrough

Rider requests airport pickup—geohash finds nearest Available driver, trip Matched, fare shown with 1.5× surge. Driver arrives → Ongoing; drop-off → Completed, payment capture, ratings. Rider cancels after Matched → cancellation fee per policy.

**Mistake:** "Loop all drivers to find closest."
**Correct:** "Geospatial index, atomic driver claim, strict trip states, Strategy pricing."

## Keep in mind

- Geohash (or similar) for nearby supply.
- Trip lifecycle is a guarded state machine.
- Pricing in Strategy—base, distance, surge.
- One driver, one active trip—atomic assignment.
- Payment + ratings close the loop after Completed.`,
  },
  {
    slug: "food-delivery",
    title: "Design Food Delivery",
    tag: "Interview Question",
    body: `Food delivery orchestrates **customer**, **restaurant**, and **delivery partner** with a shared **order state machine**. **Requirements:** browse restaurants/menus, cart, place order, restaurant accept/reject and prep, assign rider when food is ready, live tracking, deliver, pay, rate.

**Entities:** \`Customer\`, \`Restaurant\` (menu, prep queue), \`OrderLine\`, \`Order\` (status, items, restaurant, optional \`DeliveryPartner\`). \`AssignmentService\` matches **Ready** orders to nearby free partners (same geospatial pattern as cabs). Each transition notifies the next actor (push/SMS/webhook).

**Split ownership:** restaurant advances Placed→Accepted→Preparing→Ready; partner advances Ready→PickedUp→Delivered. Reject from restaurant → cancel + refund, no rider assigned.

## Real-world example

Swiggy, Zomato, and DoorDash use **order state buses**, **merchant tablets**, and **rider dispatch** with the same handoffs.

- **Order** status is the cross-party contract—Kafka/event logs often mirror these enums.
- **Restaurant** KDS marks Accepted/Preparing/Ready—dispatch triggers on Ready, not Placed.
- **DeliveryPartner** app mirrors Trip/Ongoing tracking from cab systems.
- **Reject path** auto-refunds payment intents—no partner allocation.

## Core classes

\`Customer\`, \`Restaurant\`, \`Order\`, \`DeliveryPartner\`, \`AssignmentService\`, \`OrderService\`.

\`\`\`ts
enum OrderStatus {
  Placed, Accepted, Preparing, Ready, PickedUp, Delivered, Cancelled,
}

class Order {
  constructor(
    readonly customer: Customer,
    readonly restaurant: Restaurant,
    readonly items: OrderLine[],
    public status: OrderStatus = OrderStatus.Placed,
    public partner: DeliveryPartner | null = null,
  ) {}
}

class OrderService {
  placeOrder(customer: Customer, items: OrderLine[], restaurant: Restaurant): Order {
    return new Order(customer, restaurant, items);
  }

  markReady(order: Order): void {
    order.status = OrderStatus.Ready;
    this.assignPartner(order);
  }

  private assignPartner(order: Order): void {
    const partner = this.assignment.nearestFree(order.restaurant.location);
    order.partner = partner;
    order.status = OrderStatus.PickedUp; // after pickup scan in full design
  }

  constructor(private assignment: AssignmentService) {}
}
\`\`\`

## Key decisions

- **Order state machine:** every handoff is an explicit transition + notification.
- **Assign on Ready:** partners not wasted on unaccepted or slow prep orders (variant: assign earlier with tradeoffs—state your choice).
- **Geospatial assignment:** nearby free partners—same index pattern as ride-hail.
- **Reject/refund:** immediate on restaurant decline.

## Walkthrough

Customer orders biryani—Placed. Restaurant Accepts → Preparing → Ready. Ready triggers nearest free partner → PickedUp → live location → Delivered, payment settled, ratings. Restaurant rejects at Placed—Cancelled, instant refund, partner never assigned.

**Mistake:** "Single status string updated from anywhere."
**Correct:** "Guarded transitions, notify on each step, split restaurant vs rider ownership."

## Keep in mind

- Lifecycle: Placed through Delivered (plus Cancelled).
- Match Ready orders to nearby free partners.
- Notify customer/restaurant/rider per transition.
- Restaurant owns kitchen states; partner owns last-mile states.
- Rejection path refunds without assignment.`,
  },
  {
    slug: "splitwise",
    title: "LLD of Splitwise",
    tag: "Interview Question",
    body: `Splitwise is **ledger design plus graph simplification**. **Requirements:** users, groups, expenses (who paid, how to split), payments/settlements, balances per user and per group. Users should settle with **few transactions**, not every pairwise micro-debt.

**Entities:** \`User\`, \`Group\`, \`Expense\` (payer, total, list of \`Split\` shares), \`Payment\` (from → to, amount). **Balances are derived:** net(user) = sum owed to user − sum user owes, computed from expenses and payments—never authoritative duplicated balance fields without events.

**Simplification algorithm (greedy):** while debts remain, match largest creditor with largest debtor, settle min of their magnitudes, repeat—reduces edge count (not always globally optimal for all constraints, but interview-standard).

**Split types:** equal, exact amounts, percentages—encode in \`Split\` strategy or typed split records.

## Real-world example

Splitwise, Tricount, and Settle Up store **events** and run **debt simplification** on read or on settle—same mental model.

- **Expense** rows are immutable event log entries—edits create adjusting entries in production.
- **Group** scopes balances; **Payment** records Venmo/UPI settlements between users.
- **Settlement.simplify** mirrors "Settle up" UX minimizing number of transfers.
- **Derived balances** power "you owe / you are owed" without drift from double-written totals.

## Core classes

\`User\`, \`Group\`, \`Expense\`, \`Split\`, \`Payment\`, \`BalanceSheet\`, \`Settlement\`.

\`\`\`ts
type Split =
  | { kind: "equal"; memberIds: string[] }
  | { kind: "exact"; amounts: Map<string, number> }
  | { kind: "percent"; percents: Map<string, number> };

class Expense {
  constructor(
    readonly groupId: string,
    readonly payerId: string,
    readonly amount: number,
    readonly split: Split,
    readonly createdAt: Date,
  ) {}
}

class Settlement {
  simplify(balances: Map<string, number>): Array<{ from: string; to: string; amount: number }> {
    const txs: Array<{ from: string; to: string; amount: number }> = [];
    // repeatedly match max creditor with max debtor
    return txs;
  }
}

class BalanceSheet {
  static fromEvents(expenses: Expense[], payments: Payment[]): Map<string, number> {
    return new Map();
  }
}
\`\`\`

## Key decisions

- **Events are truth; balances derive**—expenses + payments stored, nets computed.
- **Three split types:** equal, exact, percentage—model from day one.
- **Greedy simplify:** max creditor ↔ max debtor minimizes transaction count in practice.
- **Scopes:** group expenses vs direct friend payments may differ.

## Walkthrough

Four friends, ₹4000 dinner, payer A, splits ₹2000/₹1000/₹500/₹500—one \`Expense\`, derived nets show B/C/D owe A. Greedy simplification may collapse to two transfers instead of three pairwise payments. Recording \`Payment\` zeros nets.

**Mistake:** "Update running balance column on each expense."
**Correct:** "Append events, derive nets; support split types; greedy simplify—walk one unequal dinner."

## Keep in mind

- Store expenses and payments; derive balances.
- Equal, exact, and percent splits upfront.
- Greedy max-creditor/debtor for "settle up."
- Group vs direct scopes—mention both.
- Walk unequal split numbers in the narrative.`,
  },
  {
    slug: "chess-game",
    title: "Design Chess Game",
    tag: "Interview Question",
    body: `Chess extends the turn-based board pattern with **piece-specific movement** and **check rules**. **Requirements:** 8×8 board, two players, legal moves for all six piece types, turn alternation, check/checkmate/stalemate, move history. Scope: two humans locally—no AI unless asked.

**Entities:** \`Board\` (8×8 \`Cell\` or nullable \`Piece\`), \`Piece\` hierarchy (Pawn…King), \`Player\` (color), \`Move\` (from, to, optional promotion/capture), \`Game\` (turn loop, status). Each piece implements \`getLegalMoves(board, from)\`. **Check detection:** simulate candidate move, ask if own king is attacked, reject illegal self-check moves.

**Special moves** (castling, en passant, promotion)—name in design; implement if time permits via flags on \`Move\` or game state (\`enPassantTarget\` square).

## Real-world example

Chess.com and Lichess server models use **board + move list**, **piece generators**, and **legality** via attack maps—same responsibilities, optimized with bitboards in production.

- **Piece polymorphism** keeps \`Game\` thin—engines generate pseudo-legal moves then filter checks.
- **Move history** enables PGN export, undo, and threefold repetition draws.
- **Game status** (active, checkmate, stalemate, draw) drives UI end screens.
- **Simulate-for-check** matches naive interview approach; prod uses pin/skewer pruning.

## Core classes

\`Board\`, \`Piece\` (+ six types), \`Player\`, \`Move\`, \`Game\`.

\`\`\`ts
enum Color { White, Black }

abstract class Piece {
  constructor(readonly color: Color) {}
  abstract legalMoves(board: Board, from: Square): Square[];
}

class Knight extends Piece {
  legalMoves(board: Board, from: Square): Square[] {
    /* L-jumps, block own color */
    return [];
  }
}

class Game {
  private turn: Color = Color.White;
  constructor(private board: Board) {}

  playMove(m: Move): void {
    if (!this.isLegal(m)) throw new Error("Illegal move");
    this.board.apply(m);
    if (this.isCheckmate(this.turn)) { /* end */ }
    this.turn = this.turn === Color.White ? Color.Black : Color.White;
  }

  private isLegal(m: Move): boolean {
    /* piece rules + does not leave own king in check */
    return true;
  }

  private isCheckmate(color: Color): boolean { return false; }
}
\`\`\`

## Key decisions

- **Moves in pieces:** polymorphism beats six-way switches in \`Game\`.
- **Check by simulation:** apply move, test king safety, revert if illegal.
- **Special moves scoped:** list upfront; optional follow-up methods.
- **History:** \`Move[]\` for undo and repetition rules.

## Walkthrough

White e2→e4—pawn rules validate, board updates, no check on white king, turn Black. Black e7→e5. Continue until king has no legal moves while in check—checkmate, \`Game\` status set. Mention stalemate as king not in check but no legal moves.

**Mistake:** "All movement in Game with if-else on piece type."
**Correct:** "Piece subclasses, simulate for check, history list, special moves named."

## Keep in mind

- Each piece computes its own legal moves.
- Check = simulate move, verify own king not attacked.
- Castling, en passant, promotion—edge cases to name.
- Move history powers undo/draw claims.
- Same turn loop pattern as Tic-Tac-Toe at the \`Game\` level.`,
  },
  {
    slug: "tic-tac-toe",
    title: "Design Tic Tac Toe game",
    tag: "Interview Question",
    body: `Tic-Tac-Toe is the **warm-up LLD**: small surface area, clear OOP story. **Requirements:** 3×3 board (clarify generalization to N×N), two players (X/O), win on row/column/diagonal, draw when full. Invalid moves (occupied, out of bounds) rejected.

**Entities:** \`Board\` (grid), \`Player\` (symbol), \`Game\` (turn order, status). **Win detection:** maintain row/column/diagonal **counters** per player; on place at (r,c), increment counters—O(1) win check vs scanning board each turn.

**Turn loop:** queue or index swap between two players until win or draw.

## Real-world example

Chess.com mini-games, classroom demos, and mobile SDK samples use the same **Board + Game loop**—production adds networking (\`GameSession\`) on top.

- **Board.place** validates occupancy—multiplayer servers reject stale moves the same way.
- **Counter-based win** is how optimized engines avoid full-board scans each ply.
- **Game status** enum drives rematch UX—identical to larger board games.
- **N×N generalization** appears in interview follow-ups—design arrays sized by \`n\`.

## Core classes

\`Board\`, \`Player\`, \`Game\`, optional \`GameStatus\`.

\`\`\`ts
enum Symbol { X, O }
enum GameStatus { InProgress, Win, Draw }

class Board {
  private grid: (Symbol | null)[][] = [];
  private rowCount: number[];
  private colCount: number[];

  place(r: number, c: number, s: Symbol): boolean {
    if (this.grid[r][c] !== null) return false;
    this.grid[r][c] = s;
    this.updateCounters(r, c, s);
    return true;
  }

  hasWinner(r: number, c: number, s: Symbol): boolean {
    return this.rowCount[r] === this.size /* etc */;
  }

  constructor(private size: number) {
    this.rowCount = Array(size).fill(0);
    this.colCount = Array(size).fill(0);
  }

  private updateCounters(r: number, c: number, s: Symbol): void {}
}

class Game {
  private players: Player[];
  private idx = 0;
  constructor(private board: Board, p1: Player, p2: Player) {
    this.players = [p1, p2];
  }

  play(r: number, c: number): GameStatus {
    const p = this.players[this.idx];
    if (!this.board.place(r, c, p.symbol)) throw new Error("Invalid move");
    if (this.board.hasWinner(r, c, p.symbol)) return GameStatus.Win;
    this.idx = 1 - this.idx;
    return GameStatus.InProgress;
  }
}
\`\`\`

## Key decisions

- **Design for N×N** early—interviewers often ask generalization.
- **O(1) win check** via row/col/diag counters.
- **Validate placement** explicitly—occupied and bounds.
- **Draw detection:** move count == n² without win.

## Walkthrough

X at (0,0)—placed, counters updated, no win. O at (1,1). Continue until a row counter hits 3—winner declared. Full board with no counter at n → draw. State invalid second mark on (0,0).

**Mistake:** "Scan all cells after every move."
**Correct:** "NxN board, O(1) counters, validation, draw in walkthrough."

## Keep in mind

- Clarify N×N before coding; size-parameterize board.
- O(1) win via counters impresses quickly.
- Reject occupied and OOB moves.
- Turn alternation via index or queue.
- Mention draw, not only win.`,
  },
  {
    slug: "snake-and-ladder",
    title: "LLD of Snake and Ladder game",
    tag: "Interview Question",
    body: `Snake and Ladder tests **turn-based rules** and **rule variants**. **Requirements:** numbered board (usually 100), 2+ players, dice rolls, ladders (jump up), snakes (slide down), **exact landing** to win, often **extra turn on rolling 6**—confirm rules up front.

**Entities:** \`Board\` (size, \`jumps: Map<from, to>\`), \`Dice\` (\`roll(): number\`), \`Player\` (id, position), \`Game\` (turn queue, winner). **Movement:** \`next = pos + roll\`; if \`next > boardSize\`, stay (exact landing rule); else if \`jumps.has(next)\`, teleport to \`jumps.get(next)\`—**one map** covers snakes (to < from) and ladders (to > from).

**Turn loop:** dequeue player, roll, update position, check win, re-queue; if roll==6, same player again (standard rule).

## Real-world example

Digital board-game apps (Ludo King-style engines, Hasbro licensed games) encapsulate **rules engines** with pluggable **boards** and **dice**—same class boundaries.

- **Jump map** is data-driven level design—designers edit JSON rather than code forks.
- **Dice** interface allows \`FixedDice(4)\` in unit tests—production uses RNG.
- **Exact win rule** matches official Snake & Ladder—products encode variants in config.
- **Game loop** matches other turn-based titles—reuse queue pattern from Tic-Tac-Toe.

## Core classes

\`Board\`, \`Dice\`, \`Player\`, \`Game\`.

\`\`\`ts
class Dice {
  roll(): number { return 1 + Math.floor(Math.random() * 6); }
}

class Board {
  constructor(
    readonly size: number,
    private jumps: Map<number, number>,
  ) {}

  move(pos: number, roll: number): number {
    const raw = pos + roll;
    if (raw > this.size) return pos; // exact landing: overshoot stays
    return this.jumps.get(raw) ?? raw;
  }
}

class Player {
  constructor(readonly id: string, public position = 0) {}
}

class Game {
  private queue: Player[];
  constructor(private board: Board, private dice: Dice, players: Player[]) {
    this.queue = [...players];
  }

  playTurn(): Player | null {
    const p = this.queue.shift()!;
    const roll = this.dice.roll();
    p.position = this.board.move(p.position, roll);
    if (p.position === this.board.size) return p;
    this.queue.push(p);
    if (roll !== 6) { /* standard: only re-front on 6 — adjust per rules */ }
    return null;
  }
}
\`\`\`

## Key decisions

- **Single jump map** for snakes and ladders—uniform teleport after roll.
- **Dice as class**—inject fixed sequences in tests.
- **Exact landing** explicit—overshoot does not wrap or bounce unless variant says so.
- **Sixes rule** in turn manager, not buried in board math.

## Walkthrough

Player on 4 rolls 3 → lands 7, ladder to 21. Later on 26, snake to 9. From 99, roll 1 wins exactly; roll 2 stays on 99. Show extra turn when rolling 6 if using standard rules.

**Mistake:** "Duplicate snake vs ladder methods."
**Correct:** "One from→to map; Dice class; exact landing; walk ladder + snake hits."

## Keep in mind

- Clarify rules: board size, sixes, exact win.
- One jump map unifies movement modifiers.
- Injectable \`Dice\` for deterministic tests.
- Turn queue scales to N players.
- Walkthrough includes both ladder and snake landing.`,
  },
];
