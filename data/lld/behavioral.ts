import type { LldTopic } from "./types";

export const BEHAVIORAL: LldTopic[] = [
  {
    slug: "strategy-pattern",
    title: "Strategy Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Strategy moves swappable algorithms behind one name, so clients pick behavior at runtime instead of branching on if-else. A payment service holds a strategy reference: UPI, Card, and Wallet swap freely, and adding Crypto touches no existing code. It is the textbook Open/Closed example.

The signal is a growing conditional on type. Sorting comparators, pricing rules, and route planners are everyday examples. The context object stays stable while strategies come and go — and each algorithm tests in isolation.

## How it works

1. **One name:** all strategies share method names (duck typing is the contract in JS).
2. **Context holds it:** the context keeps a strategy reference, never concrete classes.
3. **Swap at runtime:** a setter changes behavior — old code stays untouched.

\`\`\`js
// Behavior behind one name, chosen at runtime
class Cart {
  setStrategy(strategy) { this.strategy = strategy; }
  checkout(amount) { this.strategy.pay(amount); }
}
// setStrategy(new UPIStrategy()) or new CardStrategy() — Cart untouched
\`\`\`

## When to use

- Conditionals on type keep growing (payment modes, pricing rules).
- Algorithms chosen at runtime (sorting, routing).
- Each algorithm should test independently.

## Common mistakes

- **Logic in context:** deciding inside the context kills the pattern — choose from outside.
- **Stateful strategies:** shared strategies holding state corrupt each other — keep them stateless.
- **Two algorithms:** no coming variation means plain if is enough.

**Mistake:** "Strategy and State are the same."
**Correct:** "Same shape, different intent: Strategy is chosen from outside, State changes from inside."

## Keep in mind

- Kills if-else on type: each branch becomes a swappable class.
- Classic Open/Closed example: new strategy, zero edits.
- Context holds the name reference and delegates to it.
- Examples: payment modes, sorting comparators, pricing and routing rules.
- Keep strategies stateless so they share safely.`,
  },
  {
    slug: "observer-pattern",
    title: "Observer Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Observer builds one-to-many subscriptions: when the subject changes state, every registered observer hears automatically. A channel publishes a video and all subscribers learn; the channel never knows who they are or what they do with the news. That ignorance (decoupling) is the entire value.

The mechanism is a subscriber list — attach, detach, notify. Push event data when all observers need the same thing, or let them pull when needs vary. Two traps: notification order is never guaranteed unless enforced, and observers editing the list mid-notification cause modification bugs.

## How it works

1. **Subscribe:** observers join the subject's list.
2. **Publish:** the subject broadcasts on change — no idea who listens.
3. **Unsubscribe:** leaving interest removes the entry, or memory leaks.

\`\`\`js
// Subject announces, observers react, nobody knows each other
class Channel {
  constructor() { this.subs = []; }
  subscribe(s) { this.subs.push(s); }
  publish(video) {
    for (const s of [...this.subs]) s.update(video); // loop over a copy
  }
}
\`\`\`

## When to use

- One change must reach many places (pub-sub, event listeners, stock alerts).
- Senders must not know receivers (decoupling wanted).
- Observers come and go dynamically.

## Common mistakes

- **Editing mid-loop:** unsubscribing during notify corrupts iteration — loop over a copy.
- **Assuming order:** no guaranteed delivery order exists — add priority when needed.
- **Leaked subscriptions:** dead observers pile up — unsubscribe paths are mandatory.

**Mistake:** "Observers arrive in order."
**Correct:** "No order guaranteed — copy the list before notifying, add priority when order matters."

## Keep in mind

- One-to-many subscription with full decoupling between subject and observers.
- Copy the list before notifying — avoids concurrent modification.
- Push shared data, let differing needs pull.
- Examples: pub-sub systems, event listeners, stock price alerts.
- Risk is notification storms: one change fanning out to thousands.`,
  },
  {
    slug: "chain-of-responsibility",
    title: "Chain of Responsibility Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Chain of Responsibility passes a request hand to hand until someone handles it. An ATM dispenser breaks 3700 into 2000, 1000, 500, 200 notes by forwarding remainders; a support ticket climbs L1 to L2 to L3 the same way. The sender knows only the first link, never the whole chain.

Each link decides to handle, partially handle, or forward — so chain order is the real design work. Logging frameworks and servlet filters run on it because new links slot in without touching old ones. Name the failure mode: a request falling off the end unhandled, so always define a default terminal link.

## How it works

1. **Link up:** each handler holds the next reference.
2. **Handle what fits:** process your share, forward the rest.
3. **Catch the end:** a default handler guarantees nothing falls silently.

\`\`\`js
// Each link handles what it can, forwards the rest
class Dispenser {
  setNext(next) { this.next = next; return next; }
  dispense(amount) {
    const count = Math.floor(amount / this.denomination());
    // ... dispense count notes ...
    if (this.next) this.next.dispense(amount % this.denomination());
  }
}
\`\`\`

## When to use

- One handler will claim the request, decided at runtime (ATM notes, escalation).
- Handlers join and leave over time (logging levels, filters, middleware).
- Senders must stay ignorant of handlers.

## Common mistakes

- **Missing tail:** requests vanish silently — always add a default handler.
- **Wrong order:** expensive handler first makes every request costly — common or cheap first.
- **Loops:** a link pointing back upstream spins forever — keep chains straight.

**Mistake:** "Every link does everything."
**Correct:** "Each link handles its share and forwards the rest — with a default catch at the end."

## Keep in mind

- Request flows link to link until someone claims it.
- Sender knows only the first link — decoupled from all handlers.
- Chain order is the design decision: cheapest or most common first.
- Examples: ATM denominations, support escalation, logging levels, servlet filters.
- Always add a terminal handler so nothing falls silently.`,
  },
  {
    slug: "command-undo-redo",
    title: "Command Pattern: Undo and Redo (Behavioral)",
    tag: "Behavioral",
    body: `Command turns a request into an object carrying execute and undo, so actions can be stored, queued, and reversed. An editor wraps every keystroke as a command pushed on a history stack: undo pops and reverses, redo re-executes. The invoker (button, shortcut) never knows what the action does — UI stays decoupled from logic.

Each command must capture enough state to reverse itself: a delete command stores removed text and position. That memory cost is the real trade-off, so real editors cap history depth and merge keystrokes. The same objects also enable macro recording, job queues, and batched transactions for free.

## How it works

1. **Objectify:** every action becomes an object with execute plus undo.
2. **Stack it:** push on execute; undo pops and reverses; a second stack redoes.
3. **Capture reversal state:** store what undo needs — text plus position.

\`\`\`js
// Requests as objects: executable, storable, reversible
class TypeCommand {
  constructor(doc, text) { this.doc = doc; this.text = text; }
  execute() { this.doc.insert(this.text); }
  undo() { this.doc.deleteLast(this.text.length); }
}
// history.push(cmd); undo pops and calls undo()
\`\`\`

## When to use

- Undo/redo needed (editors, design tools, games).
- Actions queued or deferred (job queues).
- Macros, audit logs, or transactional batching wanted.

## Common mistakes

- **Missing reversal state:** without captured data, undo cannot run.
- **Unbounded history:** thousands of fine commands eat memory — cap depth, merge keystrokes.
- **Irreversible actions:** sent emails can't un-send — need compensating actions or refusal.

**Mistake:** "Save full state for undo."
**Correct:** "Reverse actions are lighter than snapshots — execute plus undo per command, depth capped."

## Keep in mind

- execute plus undo on every command object — the core contract.
- History stack gives undo, a second stack gives redo.
- Each command stores what reversal needs: text plus position.
- Memory cost is real: cap history depth and merge fine-grained commands.
- Bonus uses from the same objects: macros, queues, audit logs.`,
  },
  {
    slug: "state-pattern",
    title: "State Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `State lets an object change behavior when its internal state changes — by delegating to a state object. A vending machine acts differently with no coin, with coin, and while dispensing: inserting a coin or pressing a button means different things per state. Without the pattern this becomes a tangled switch on an enum; with it, each state is a class sharing method names.

Adding a state means adding a class, never editing a giant conditional — the Open/Closed win. The context holds the current state reference and forwards calls; states trigger transitions themselves. TCP connections, media players, and order lifecycles share this shape.

## How it works

1. **One class per state:** NoCoin, HasCoin, Dispensing, SoldOut share methods.
2. **Context delegates:** the machine itself does nothing but forward.
3. **States transition:** inserting a coin moves NoCoin to HasCoin from inside.

\`\`\`js
// Context delegates, states transition themselves
class NoCoin {
  insertCoin(machine) { machine.setState(new HasCoin()); }
  pressButton(machine) { console.log('Insert coin first'); }
}
class VendingMachine {
  constructor() { this.state = new NoCoin(); }
  setState(s) { this.state = s; }
}
\`\`\`

## When to use

- Behavior depends on state (vending machines, TCP, media players, order lifecycles).
- Enum switches are sprouting — the classic signal.
- New states arrive without touching old code.

## Common mistakes

- **Transitions in context:** if-else in the machine defeats the pattern — keep them in states.
- **Stateful shared states:** per-machine data in shared states leaks across machines — keep them stateless.
- **Silent gaps:** every state must answer every action, or nothing happens quietly.

**Mistake:** "An enum is enough for states."
**Correct:** "Two states fit an enum; the third grows a switch jungle — one class per state."

## Keep in mind

- Each state is a class, transitions live inside states, context only delegates.
- Kills the giant switch-on-enum every state machine grows.
- New state means new class, zero edits to old states.
- Vending machine is the canonical build: NoCoin, HasCoin, Dispensing, SoldOut.
- States can be shared since they hold no per-machine data.`,
  },
  {
    slug: "template-method-pattern",
    title: "Template Method Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Template Method fixes an algorithm skeleton in a base class and lets subclasses fill specific steps. A beverage maker has one template: boil, brew, pour, add condiments. Tea and Coffee inherit the template but override only brew and condiments — the sequence can never reorder or skip by mistake.

Keep the template protected by convention so the sequence stays safe, while variable steps throw until subclasses fill them. Frameworks run on this: test runners and data pipelines fix the flow and invite customization at set points. The trade-off is inheritance coupling — wildly varying steps fit Strategy composition better. (JavaScript has no final keyword; convention plus comments do the job.)

## How it works

1. **Fix the skeleton once:** the base class owns the full order.
2. **Leave steps open:** subclasses fill what varies, error otherwise.
3. **Share the common:** boil and pour live once in the base.

\`\`\`js
// Skeleton fixed, steps overridden
class Beverage {
  prepare() { this.boil(); this.brew(); this.pour(); this.addCondiments(); }
  brew() { throw new Error('subclass fills this'); }
  addCondiments() { throw new Error('subclass fills this'); }
  boil() { /* shared */ } pour() { /* shared */ }
}
\`\`\`

## When to use

- Algorithm order is fixed, steps vary (ETL, test fixtures, lifecycles).
- Frameworks inviting customization at set points.
- Duplicate sequences spreading across subclasses.

## Common mistakes

- **Overriding the template:** subclasses rewriting prepare() kills the pattern — protect the skeleton.
- **Deep hierarchies:** three template levels defy understanding — consider composition.
- **Every step abstract:** some steps deserve defaults (hooks), or each subclass carries dead weight.

**Mistake:** "Template Method is just inheritance."
**Correct:** "Inheritance is the tool; fixing the sequence is the intent."

## Keep in mind

- Algorithm skeleton lives once in the base class, steps vary in subclasses.
- Keep the template fixed by convention so order never changes.
- Hollywood principle: don't call us, we'll call you.
- Examples: test fixtures, ETL pipelines, framework lifecycles.
- Widely varying steps fit Strategy composition over inheritance.`,
  },
  {
    slug: "iterator-pattern",
    title: "Iterator Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Iterator walks a collection in order without exposing internals. Clients advance while the collection hides whether it holds an array, a linked list, or a tree. In JavaScript the pattern is built into the language: Symbol.iterator plus for...of loops are exactly this.

The value is uniform traversal across structures plus simultaneous iterations, each with its own cursor. Custom collections in interviews (song playlist, paginated feed) should expose iterators rather than leaking internal arrays.

## How it works

1. **Expose an iterator:** the collection offers a walking method, not raw internals.
2. **Hide the structure:** array, list, or tree — outsiders only see values.
3. **Separate cursors:** each traversal tracks its own position independently.

\`\`\`js
// Symbol.iterator powers for...of loops
class Playlist {
  constructor() { this.songs = []; }
  [Symbol.iterator]() { return this.songs.values(); }
}
// for (const song of playlist) { ... } — array inside, nobody cares outside
\`\`\`

## When to use

- Custom collections exist (playlists, feeds, trees) needing traversal.
- Internals may change — array today, tree tomorrow, clients unmoved.
- Multiple simultaneous traversals must not interfere.

## Common mistakes

- **Leaking raw arrays:** outsiders mutate internals — expose iterators, never arrays.
- **Shared cursor:** two loops on one cursor fight — every iterator owns its position.
- **Mid-walk edits:** define a policy — fail-fast or snapshot — and state it.

**Mistake:** "Indexes are enough for loops."
**Correct:** "Indexes leak structure; change it and every loop breaks — expose iterators."

## Keep in mind

- Symbol.iterator drives for...of — array, list, or tree stays hidden.
- Separate cursors allow simultaneous traversals.
- Custom collections expose iterators, never raw internal arrays.
- State a mid-walk edit policy: fail-fast or snapshot.
- for...of works precisely because collections return iterators.`,
  },
  {
    slug: "mediator-auction-system",
    title: "Mediator Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Mediator routes all peer talk through one hub so objects never reference each other directly. In an online auction, bidders never call each other: every bid reaches the mediator, which validates it, updates the highest bid, and notifies all participants. N peers collapse from N-squared references to N hub references.

The auction shows the interview shape: Bidder objects, an Auction lot with start and end time, and the mediator enforcing minimum increments, closing time, and anti-sniping extensions. The honest cost is the mediator growing into a god object — keep peripheral logic (payments, notifications) in separate services behind it.

## How it works

1. **Peers hold the hub:** every peer knows only the mediator.
2. **Hub owns rules:** validation, increments, timing live in one place.
3. **Hub broadcasts:** results fan out from the center to all peers.

\`\`\`js
// Peers talk to the hub, never to each other
class Auction {
  constructor() { this.highest = 0; this.bidders = []; }
  placeBid(bidder, amount) {
    if (amount <= this.highest) { bidder.reject(); return; }
    this.highest = amount;
    for (const b of this.bidders) b.notify(this.highest);
  }
}
\`\`\`

## When to use

- Many peers interact (auctions, chat rooms, air traffic control).
- N-squared references are tangling — collapse them through a hub.
- Rules must centralize (increments, timing, extensions).

## Common mistakes

- **God object:** stuffing payments and notifications inside — keep peripherals behind it.
- **Direct side channels:** one peer-to-peer reference breaks the pattern — route everything via hub.
- **Facade confusion:** hiding complexity is Facade; routing peer talk is Mediator.

**Mistake:** "Stuff all logic into the mediator."
**Correct:** "The hub owns rules and broadcast — peripheral work lives in services behind it."

## Keep in mind

- Peers reference only the hub: N-squared links collapse to N.
- The hub owns the rules: increments, closing time, anti-sniping extension.
- Examples: auction houses, chat rooms, air traffic control, UI dialogs.
- Watch the god-object risk: keep payments and notifications outside the mediator.
- Contrast with Facade: Mediator routes peer talk, Facade simplifies a subsystem.`,
  },
];
