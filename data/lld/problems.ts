import type { LldTopic } from "./types";

export const PROBLEMS: LldTopic[] = [
  {
    slug: "parking-lot",
    title: "Design Parking Lot",
    tag: "Interview Question",
    body: `Parking Lot is the most asked LLD problem, so the bar is a complete working design. Requirements: multiple floors with spots sized for bikes, cars, and trucks, entry gates issuing tickets, exit gates computing fees from duration and vehicle type, and real-time availability display. Entry concurrency matters: two cars must never receive the same spot.

Structure ParkingLot owning Floors owning Spots; Vehicle carries its size, Ticket records entry time and spot, and a PricingStrategy computes fees so hourly, daily, and surge rules swap cleanly. Allocation picks the nearest free compatible spot and marks it atomically. Walk entry and exit as one story: ticket in, fee out.

## Core classes

ParkingLot, Floor, Spot (size plus occupied flag), Vehicle (size), Ticket (spot, entry time), Gate, PricingStrategy. Allocation targets the nearest free compatible spot.

\`\`\`js
// Allocation must be atomic; pricing swaps via Strategy
class ParkingLot {
  park(vehicle) {
    const spot = this.findNearestFree(vehicle.size()); // atomic pick
    spot.occupy(); return new Ticket(spot, Date.now());
  }
  checkout(ticket) { return this.pricing.calculate(ticket); }
}
\`\`\`

## Key decisions

- **Atomic allocation:** pick plus mark as one unit — two cars never share a spot.
- **Pricing as Strategy:** hourly, daily, surge swap without edits.
- **Nearest-free:** beats random allocation, matches real lots.
- **Availability from spot state:** separate counters drift — read the source.

## Walkthrough

A car reaches the entry gate — the system picks the nearest free car-size spot atomically and issues a Ticket (spot plus time). At exit, duration feeds PricingStrategy, payment clears, the spot frees. A second car asking mid-way sees occupied and moves to the next candidate.

**Mistake:** "Track availability in a separate counter."
**Correct:** "Name entities, allocate atomically, price via Strategy — ticket in, fee out."

## Keep in mind

- Entities first: Lot, Floor, Spot, Vehicle, Ticket, Gate, Pricing.
- Spot allocation must be atomic or two cars share one spot.
- Keep pricing in a Strategy: hourly, daily, surge swap without edits.
- Nearest-free allocation beats random for real lots — say it.
- Availability display reads spot state, never a drifting counter.`,
  },
  {
    slug: "elevator-system",
    title: "LLD of Elevator System",
    tag: "Interview Question",
    body: `The elevator system tests concurrent state machines plus scheduling. Requirements: multiple elevators across floors, inside panel buttons plus outside up and down buttons, movement with door open and close states, and a dispatch strategy assigning the best elevator per request. Concurrency is inherent: passengers press buttons while elevators move.

Design around an Elevator with floor, direction, and a State object (Idle, Moving, DoorsOpen), a Request with source floor and direction, and a Dispatcher owning the scheduling strategy. The classic algorithm is SCAN: keep moving one direction serving queued stops, then reverse. Button panels produce requests; the dispatcher alone decides.

## Core classes

Elevator (floor, direction, state), Request (source floor plus direction), Dispatcher (strategy owner). States stay classes — Idle, Moving, DoorsOpen — never boolean flags.

\`\`\`js
// Dispatcher owns strategy, elevators own state
class Elevator {
  move() { /* depends on state */ }
  openDoors() { /* ... */ }
  addStop(floor) { /* ... */ }
}
class Dispatcher {
  assign(request) { /* SCAN: nearest in-direction car wins */ }
}
\`\`\`

## Key decisions

- **SCAN scheduling:** serve along the direction, then reverse — the expected algorithm.
- **States as classes:** flags grow switch jungles.
- **Synchronized intake:** button presses race movement — guard request intake.
- **Single decider:** panels produce, the dispatcher chooses.

## Walkthrough

An up request arrives from floor 5 — the dispatcher picks the nearest same-direction car and queues the stop. The car arrives, opens doors (DoorsOpen), the passenger presses 9 inside — the internal request joins the queue. After serving its direction, the car reverses.

**Mistake:** "Nearest elevator is always best."
**Correct:** "A nearest car heading away loses — SCAN weighs direction; show one outside plus one inside request."

## Keep in mind

- Name entities first: Elevator, Floor, Panel buttons, Request, Dispatcher.
- SCAN scheduling is the expected algorithm: serve along direction, then reverse.
- Model Idle, Moving, and DoorsOpen as states, not boolean flags.
- Concurrency lives in button presses versus movement: guard request intake.
- Walk one external plus one internal request end to end.`,
  },
  {
    slug: "atm",
    title: "LLD of ATM",
    tag: "Interview Question",
    body: `ATM design covers secure transactional flows with hardware. Requirements: card authentication with PIN, balance inquiry, cash withdrawal with denomination breakup, deposit, and PIN change — all within daily limits and cash availability. Every cash movement must be transactional: dispense and debit succeed or fail together.

Entities are Card, Account, Transaction records, a CashDispenser with denomination inventory, and the ATM controller running screens. Withdrawal is the walkthrough to master: authenticate, validate limits and balance, reserve the amount, dispense notes via Chain of Responsibility over denominations, and commit the ledger only after successful dispense. Failures at any step roll back cleanly.

## Core classes

Card, Account, Transaction (audit record), CashDispenser (denomination inventory), ATM controller (drives screens). Flow: authenticate, validate, dispense, commit.

\`\`\`js
// Dispense and debit are one atomic unit
class ATM {
  withdraw(card, pin, amount) {
    const account = this.bank.authenticate(card, pin);
    this.validate(account, amount); // limits, balance, cash stock
    this.dispense(amount);           // chain over denominations
    return this.bank.debit(account, amount); // commit only after dispense
  }
}
\`\`\`

## Key decisions

- **Atomic dispense+debit:** money out and ledger cut together — never one without the other.
- **Denomination chain:** biggest notes first across note types.
- **Validation order:** PIN, daily limits, balance, machine cash stock — in that sequence.
- **Audit everything:** every action writes a Transaction record for reconciliation.

## Walkthrough

Card inserted, PIN correct — 5000 requested. The system checks limits, balance, and machine stock, then the chain dispenses 2000x2 plus 1000x1. Only after notes leave does the ledger debit commit. A mid-dispense jam fails the dispense — no debit happens, money stays safe.

**Mistake:** "Debit first, dispense after."
**Correct:** "Validate, dispense, then commit the debit — with an audit record at every step."

## Keep in mind

- Cash dispense plus account debit must be atomic: never one without the other.
- Denomination breakup is a Chain of Responsibility over note types.
- Validate in order: PIN, daily limits, balance, machine cash stock.
- Every action writes an audit Transaction record for reconciliation.
- Card retention after repeated wrong PINs is expected detail — say it.`,
  },
  {
    slug: "vending-machine",
    title: "Design Vending Machine",
    tag: "Interview Question",
    body: `Vending Machine is the State pattern made concrete: coin handling, selection, dispensing, and change across NoCoin, HasCoin, Dispensing, and SoldOut states. Requirements: accept coins, select items, dispense with correct change, cancel with refund, and handle sold-out items gracefully.

Design VendingMachine holding items with prices and quantities, a CoinStore tracking inserted money, and a State object per phase. Inserting a coin in NoCoin moves to HasCoin; pressing a button in HasCoin dispenses and returns change; cancel anytime refunds. Each state class owns its transitions — no switch statements.

## Core classes

VendingMachine (items, coin store, current state), Item (name, price, quantity), State classes (NoCoin, HasCoin, Dispensing, SoldOut).

\`\`\`js
// States own transitions — the machine only delegates
class HasCoin {
  pressButton(machine, item) {
    if (machine.stock(item) === 0) { machine.setState(new SoldOut()); return; }
    machine.dispense(item); // item out, change back
    machine.setState(new NoCoin());
  }
  cancel(machine) { machine.refund(); machine.setState(new NoCoin()); }
}
\`\`\`

## Key decisions

- **State classes:** NoCoin, HasCoin, Dispensing, SoldOut — transitions live inside.
- **Change math:** inserted minus price, greedy over denominations.
- **Cancel path:** refund from any pre-dispense state.
- **SoldOut handling:** selection of empty items moves to SoldOut, then back.

## Walkthrough

User inserts 100 for a 70 item — NoCoin becomes HasCoin. Button pressed — stock checked, item dispensed, 30 returned, back to NoCoin. Cancel pressed instead — full 100 refunded. Empty item selected — SoldOut shown, money kept for another choice.

**Mistake:** "One class with a state enum and switches."
**Correct:** "One class per state, transitions inside states — cancel and refund paths included."

## Keep in mind

- Four states: NoCoin, HasCoin, Dispensing, SoldOut.
- Change = inserted minus price, greedy over denominations.
- Cancel refunds from any pre-dispense state.
- SoldOut keeps money for another choice, never swallows it.
- Stock decrements only on successful dispense.`,
  },
  {
    slug: "library-system",
    title: "Design Library Management System",
    tag: "Interview Question",
    body: `Library System is classic OOP practice — state machines plus Strategy in one design. Requirements: books with multiple copies, members, borrowing with due dates, fines, reservations, and search. Every copy's condition must stay tracked.

Design Book (title and author metadata), BookCopy (the physical copy with barcode — Available, Borrowed, Reserved states), Member, Loan (copy plus dates), and Reservation. Fines go in a Strategy (student vs faculty rates differ). The state machine guards transitions — a Borrowed copy can never issue twice.

## Core classes

Book (metadata), BookCopy (barcode plus state), Member, Loan (copy, member, due date), Reservation (queue), FineStrategy.

\`\`\`js
// Copy state machine blocks illegal transitions
class BookCopy {
  constructor(barcode) { this.barcode = barcode; this.status = 'Available'; }
  borrow() {
    if (this.status !== 'Available') throw new Error('Copy not available');
    this.status = 'Borrowed';
  }
  returnCopy() { this.status = 'Reserved'; } // or Available when no waitlist
}
\`\`\`

## Key decisions

- **Book vs BookCopy split:** metadata once, physical copies many — the first and most important call.
- **State machine:** Available, Borrowed, Reserved — illegal issues become impossible.
- **Fine Strategy:** rates vary by member type without code changes.
- **Reservation queue:** returns offer to the waitlist first.

## Walkthrough

A member requests "Clean Code" — an available copy issues, a Loan opens with a 14-day due date, the copy turns Borrowed. Returned on time — back to Available. Returned late — the FineStrategy computes the charge. Both copies busy — a Reservation queues the member, and the next return notifies them first.

**Mistake:** "One class for Book and copy."
**Correct:** "Split Book from BookCopy, guard transitions with states, price fines with Strategy."

## Keep in mind

- Book (metadata) and BookCopy (physical) stay separate — decide this first.
- Copy states Available/Borrowed/Reserved make bad issues impossible.
- Fines live in a Strategy — rates vary by member type.
- Keep a reservation queue — returns offer to the waitlist first.
- Walk due dates and fines end to end.`,
  },
  {
    slug: "hotel-booking",
    title: "Design Hotel Booking System",
    tag: "Interview Question",
    body: `Hotel Booking centers on date-range inventory: the same room cannot host overlapping stays. Requirements: hotels with room types, search by city and dates, reservation with payment, check-in and check-out, cancellation with policy-based refunds.

Design Hotel, Room (type plus nightly rate), Booking (room, guest, date range, status), and Payment. Availability is a range-overlap query per room — the same invariant as car rental. Booking must be atomic: check range, hold room, charge. Cancellation refunds by policy (free before 48h, partial after).

## Core classes

Hotel, Room (type, rate), Booking (room, guest, range, status), Payment, CancellationPolicy (Strategy per policy).

\`\`\`js
// Range check plus hold must be atomic
class BookingService {
  book(guest, room, range) {
    // production: DB transaction or version check around this unit
    if (this.overlaps(room, range)) throw new Error('Room taken for these dates');
    const booking = new Booking(guest, room, range);
    this.charge(booking);
    return booking;
  }
}
\`\`\`

## Key decisions

- **Overlap invariant:** one room, no overlapping confirmed stays — state it first.
- **Atomic book:** check plus hold as one unit — locks or optimistic versioning.
- **Cancellation as Strategy:** free, partial, and non-refundable policies swap cleanly.
- **Search vs book split:** cached availability reads, transactional writes.

## Walkthrough

A guest searches Udaipur for Dec 20-22 — available rooms list from a cached range query. Booking runs atomically: no overlap found, room held, payment charged. Cancelled Dec 18 — free-cancellation policy refunds fully. Same dates requested twice concurrently — the second sees the overlap and fails cleanly.

**Mistake:** "Check availability, then book in two steps."
**Correct:** "Atomic check-and-hold, overlap invariant stated first, cancellation by policy."

## Keep in mind

- One room, no overlapping confirmed stays — the invariant.
- Check-and-hold must be atomic: locks or version checks, never two steps.
- Overlap detection is a range query — index room plus dates.
- Cancellation policies belong in a Strategy.
- Cache availability reads; transact the booking.`,
  },
  {
    slug: "bookmyshow",
    title: "LLD of BookMyShow | Design MovieTicketBooking",
    tag: "Interview Question",
    body: `BookMyShow stands on one hard problem: two users grabbing the same seat. Requirements span movies, theatres, shows with seat maps, temporary seat holds, payment, and confirmed bookings with cancellation. The hold-then-confirm flow with a timeout is the design every interviewer wants to hear.

Model Movie, Theatre, Show (movie plus screen plus time), Seat with a state machine (Available, Held, Booked), and Booking tying user to seats plus payment. The flow: select seats, hold them with a TTL (say ten minutes), pay within the window, confirm on success or release on timeout. The hold must be atomic per seat, and payment failure must always release.

## Core classes

Movie, Theatre, Show, Seat (Available/Held/Booked states), Hold (seats plus expiry), Booking (user, seats, payment). Holds carry TTL; confirms need payment; failures release.

\`\`\`js
// TTL hold, confirm on payment, release on timeout
class BookingService {
  holdSeats(user, show, seats) {
    // transition every seat Available -> Held atomically
    return { user, seats, expiresAt: Date.now() + 10 * 60 * 1000 };
  }
  confirm(hold, payment) { /* pay, then Held -> Booked */ }
}
\`\`\`

## Key decisions

- **Seat states:** Available, Held, Booked — Held carries a TTL.
- **Atomic hold:** per-seat transition in one unit or double booking happens.
- **Failure releases:** payment failure always frees held seats, no exceptions.
- **Cancellation:** seats return to Available and trigger the refund flow.

## Walkthrough

A user picks 2 seats — both check Available and flip to Held atomically with a 10-minute TTL. Payment succeeds in 5 minutes — Held becomes Booked, tickets confirmed. Payment fails instead — seats release immediately. Timeout expires — an expiry job releases them.

**Mistake:** "Mark Booked on selection."
**Correct:** "Available-Held-Booked states, atomic hold, TTL expiry, guaranteed release on failure."

## Keep in mind

- Seat states Available, Held, Booked with TTL on holds — the core.
- Hold must be atomic per seat or double booking is certain.
- Failed payments must always release held seats, no exceptions.
- Cancellation returns seats to Available and triggers refunds.
- Concurrency answer: lock or CAS on the seat state transition.`,
  },
  {
    slug: "cab-booking",
    title: "Design Cab Booking (Uber)",
    tag: "Interview Question",
    body: `Cab Booking blends matching, location, and trip state. Requirements: riders requesting rides with pickup and drop, nearby driver search, fare estimate with surge, trip lifecycle (requested, matched, ongoing, completed, cancelled), and payments plus ratings at the end.

Design Rider, Driver (location plus status), Trip (state machine across its lifecycle), and a MatchingService pairing requests with nearby available drivers. Nearby search uses geohash-indexed driver locations. Fare comes from a pricing Strategy (base plus distance plus surge multiplier). Trip states transition strictly — cancel rules and charges depend on the current state.

## Core classes

Rider, Driver (location, status), Trip (rider, driver, route, status), MatchingService (nearby search plus assignment), PricingStrategy (fare math).

\`\`\`js
// Match nearest available driver, trip owns the lifecycle
class MatchingService {
  requestTrip(rider, pickup, drop) {
    const driver = this.nearestAvailable(pickup); // geohash lookup
    if (!driver) throw new Error('No drivers nearby');
    return new Trip(rider, driver, pickup, drop); // status: Requested
  }
}
\`\`\`

## Key decisions

- **Nearby search:** geohash-indexed driver locations, not full scans.
- **Trip state machine:** Requested, Matched, Ongoing, Completed, Cancelled — transitions guarded.
- **Pricing Strategy:** base plus distance plus surge — swap rules without edits.
- **Assignment atomicity:** one driver takes one trip — CAS on driver status.

## Walkthrough

A rider requests airport pickup — geohash search finds the nearest available driver, the trip opens as Matched, fare estimated with 1.5x surge. Driver arrives, trip goes Ongoing; arrival completes it, payment charges, both rate each other. Cancel mid-way applies the state-dependent fee.

**Mistake:** "Scan all drivers for matching."
**Correct:** "Geohash-indexed nearby search, atomic assignment, strict trip states."

## Keep in mind

- Nearby search uses geohash indexes, never full scans.
- Trip lifecycle is a strict state machine — cancel rules depend on state.
- Pricing belongs in a Strategy: base, distance, surge.
- Driver assignment must be atomic — one driver, one trip.
- Payments and ratings close the lifecycle.`,
  },
  {
    slug: "food-delivery",
    title: "Design Food Delivery",
    tag: "Interview Question",
    body: `Food Delivery chains three parties: customer, restaurant, and delivery partner. Requirements: restaurant listing with menus, cart plus order placement, restaurant accept and prepare flow, partner assignment and live tracking, and delivery confirmation with payments.

Design Customer, Restaurant (menu plus prep states), Order (state machine: Placed, Accepted, Preparing, Ready, PickedUp, Delivered), and DeliveryPartner (location plus status). Assignment matches ready orders with nearby free partners. Each handoff — restaurant accept, partner pickup, customer delivery — advances the state machine and notifies the next party.

## Core classes

Customer, Restaurant (menu, prep queue), Order (items, status), DeliveryPartner (location, status), AssignmentService (order to partner matching).

\`\`\`js
// Each handoff advances the order state machine
class OrderService {
  placeOrder(customer, items) { return new Order(customer, items); } // Placed
  assignPartner(order) {
    const partner = this.nearestFree(order.restaurant); // geohash lookup
    order.assign(partner); // Ready -> PickedUp later
    return partner;
  }
}
\`\`\`

## Key decisions

- **Order state machine:** Placed through Delivered — every handoff is a transition.
- **Assignment:** ready orders meet nearby free partners — same matching shape as cabs.
- **Notifications per transition:** each state change pings the next party.
- **Prep vs delivery split:** restaurant owns food states, partner owns movement states.

## Walkthrough

A customer orders biryani — order Placed, restaurant Accepts, food Prepares. Ready fires assignment: nearest free partner matched, PicksUp, live location streams, Delivers on arrival. Payment settles, ratings close the loop. Restaurant rejects — instant refund, no partner assigned.

**Mistake:** "One status field updated from everywhere."
**Correct:** "Guarded state machine with per-transition notifications — each handoff explicit."

## Keep in mind

- Order lifecycle: Placed, Accepted, Preparing, Ready, PickedUp, Delivered.
- Assignment matches ready orders with nearby free partners.
- Every transition notifies the next party.
- Restaurant owns food states; partner owns movement states.
- Rejections refund immediately without assignment.`,
  },
  {
    slug: "splitwise",
    title: "LLD of Splitwise",
    tag: "Interview Question",
    body: `Splitwise is a graph problem disguised as an app: track who paid what, compute who owes whom, and simplify debts. Requirements cover users, groups, expenses with equal or custom splits, payments recording, and balance sheets per user and group. The simplification algorithm separates good answers from great ones.

Model User, Group, Expense with a list of splits, and Payment records. Balances derive from expenses minus payments — never stored as primary truth. Debt simplification uses the classic greedy: repeatedly match the biggest creditor with the biggest debtor until all settle, minimizing transaction count. Walk through one group dinner with unequal shares to prove splits work.

## Core classes

User, Group, Expense (payer, amount, splits), Payment, Settlement (greedy simplifier). Balances derive — events are truth.

\`\`\`js
// Balances derive from events; simplification is greedy max-match
class Expense { /* payer, amount, list of splits */ }
class Settlement {
  simplify(balances) {
    // repeatedly match max creditor with max debtor
  }
}
\`\`\`

## Key decisions

- **Events are truth, balances derive:** expenses plus payments stored, math derived.
- **Three split types:** equal, exact, and percentage supported from day one.
- **Greedy simplify:** max creditor to max debtor minimizes transactions.
- **Scopes differ:** groups scope expenses; friendships scope direct payments.

## Walkthrough

Four friends split a 4000 dinner unequally (2000/1000/500/500) — one Expense with three splits records it. Balances derive debtors. Greedy simplification compresses three payments into two — each recorded, balances re-derived to zero.

**Mistake:** "Store balances directly."
**Correct:** "Store events, derive balances; support three splits; simplify greedily — show one unequal dinner end to end."

## Keep in mind

- Store expenses and payments as truth, derive balances — never the reverse.
- Support equal, exact, and percentage splits from the start.
- Greedy max-creditor to max-debtor minimizes settlement transactions.
- Groups scope expenses; friendships scope direct payments.
- Show one unequal dinner split end to end in the walkthrough.`,
  },
  {
    slug: "chess-game",
    title: "Design Chess Game",
    tag: "Interview Question",
    body: `Chess is Tic-Tac-Toe's bigger sibling — same turn-based skeleton, but pieces move differently. Requirements: 8x8 board, two players, legal moves for all 6 piece types, turn alternation, check, checkmate and stalemate detection, move validation, and game history. Scope first: two humans play, no AI opponent.

Design Board (8x8 cells), a Piece base with 6 subclasses (or move strategies), Player, Move records, and the Game loop. The key decision is check detection: after every move, verify your own king is safe by simulating. Special moves (castling, en passant, promotion) are edge cases — name them, build them with time.

## Core classes

Board (cells), Piece base plus 6 faces (Pawn, Rook, Knight, Bishop, Queen, King), Player (color), Move (from, to, captured), Game (turn loop, status).

\`\`\`js
// Each piece knows its moves — Game only runs turns
class Piece {
  constructor(color) { this.color = color; }
  legalMoves(board, from) { throw new Error('piece defines this'); }
}
class Knight extends Piece {
  legalMoves(board, from) { /* 8 L-jumps, inside board, not own piece */ }
}
class Game {
  play() { /* take turn, validate move, check for check/checkmate */ }
}
\`\`\`

## Key decisions

- **Moves live in pieces:** Game with a switch over six pieces becomes a jungle — polymorphism instead.
- **Check by simulation:** move, test own king safety, keep or revert.
- **Special moves scoped:** castling, en passant, promotion named upfront, built with time.
- **History kept:** Move records enable undo and draw-by-repetition claims.

## Walkthrough

White plays e2-e4 — validated against Pawn moves, board updates, check tested (none), turn passes to Black. Black answers e7-e5. Play continues until a king is caught with no legal moves left — checkmate ends the Game with status set.

**Mistake:** "All movement logic in Game with if-else."
**Correct:** "Piece base plus 6 faces, simulate for check, scope special moves."

## Keep in mind

- Each piece knows its legal moves — never a switch in Game.
- Check detection simulates: move, then test own king safety.
- Castling, en passant, promotion are edge cases — name them, build with time.
- Keep move history — undo and draw claims come from it.
- The Tic-Tac-Toe turn loop works here too — reuse the pattern.`,
  },
  {
    slug: "tic-tac-toe",
    title: "Design Tic Tac Toe game",
    tag: "Interview Question",
    body: `Tic Tac Toe is the warm-up LLD problem: small enough to finish, rich enough to show method. Requirements are a 3x3 board, two players alternating X and O, win detection across rows, columns, and diagonals, plus draw detection when the board fills. Clarify board size upfront: interviewers often generalize to NxN afterward.

The clean design centers on Board holding a grid of Piece objects, Player holding a symbol, and Game orchestrating turns with a queue. Win detection in O(1) per move uses counters per row, column, and diagonal instead of rescanning the board. Walk through one full game to prove turns, validation of occupied cells, and termination all work.

## Core classes

Board (cells plus counters), Player (symbol), Game (turn queue plus win checks). Design for N from the start.

\`\`\`js
// Core entities: Board owns cells, Game owns turn order
class Board {
  place(r, c, piece) { /* false if occupied */ }
  hasWinner(r, c, piece) { /* O(1) via counters */ }
}
class Game {
  play() { /* array as queue: shift a player, push back after */ }
}
\`\`\`

## Key decisions

- **NxN from the start:** generalization comes later as a trap — preempt it.
- **O(1) win check:** row, column, diagonal counters beat rescans.
- **Validate placement:** occupied and out-of-bounds checks explicit.
- **Draw is terminal:** full board without a winner ends the game too.

## Walkthrough

First player marks (0,0) with X — placed, counters updated, no win. Second marks (1,1) with O — same flow. Play continues until some row counter hits 3 — hasWinner returns true, Game loop stops and declares the winner. A full board with no complete counter ends in a draw.

**Mistake:** "Rescan the whole board every move."
**Correct:** "NxN design, O(1) counter win checks, occupied validation, draw included in walkthrough."

## Keep in mind

- Clarify NxN generalization before coding; design for N from the start.
- O(1) win check with row, column, and diagonal counters impresses immediately.
- Validate occupied cells and out-of-bounds moves explicitly.
- Turn order with a queue keeps the loop clean and extensible.
- End the walkthrough naming draw detection, not just wins.`,
  },
  {
    slug: "snake-and-ladder",
    title: "LLD of Snake and Ladder game",
    tag: "Interview Question",
    body: `Snake and Ladder tests clean turn-based modeling with a twist in movement rules. Requirements: a numbered board, two or more players, dice rolls, ladders that jump forward, snakes that slide back, exact-landing win rule, and extra turns on sixes per standard rules. Clarify the rules first because variants differ.

The natural entities are Board holding cells plus maps of snake and ladder jumps, Dice as a separate rollable object, Player with position, and Game running the turn loop. Representing jumps as a single map from start to end square elegantly unifies snakes and ladders: landing on a key teleports to its value. The win check is exact position equals board size.

## Core classes

Board (cells plus jump map), Dice (rollable, testable with loaded dice), Player (position), Game (turn loop). One map unifies both jump types.

\`\`\`js
// One jump map unifies snakes and ladders
class Board {
  move(pos, roll) {
    const next = pos + roll;
    return this.jumps.get(next) ?? next;
  }
}
class Game { play() { /* turns, dice, exact-win check */ } }
\`\`\`

## Key decisions

- **Single jump map:** start-to-end covers snakes (down) and ladders (up) uniformly.
- **Dice as its own class:** loaded dice make deterministic tests possible.
- **Exact landing:** overshoots don't count — keep the rule explicit.
- **Sixes grant turns:** encode the rule in turn logic, never hardcode.

## Walkthrough

A player on 4 rolls 3 — lands 7 holding a ladder to 21, teleports up. Next turn rolls 5 — lands 26 holding a snake to 9, slides down. Only an exact landing on 100 wins; overshooting from 99 waits.

**Mistake:** "Separate logic for snakes and ladders."
**Correct:** "One start-to-end map, separate Dice class, exact-landing rule — show both landings."

## Keep in mind

- Clarify rules first: board size, sixes grant extra turns, exact landing to win.
- One jump map for both snakes and ladders keeps movement logic uniform.
- Dice as its own class allows loaded dice in tests.
- Turn loop with a queue extends cleanly to any player count.
- Walk through a ladder landing and a snake landing explicitly.`,
  },
];
