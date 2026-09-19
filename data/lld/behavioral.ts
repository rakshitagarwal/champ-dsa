import type { LldTopic } from "./types";

export const BEHAVIORAL: LldTopic[] = [
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
    slug: "interpreter-pattern",
    title: "Interpreter Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Interpreter evaluates sentences of a small language by representing each grammar rule as a class. Terminal expressions handle leaves like numbers, non-terminal expressions combine them like addition, and a context object carries shared state through evaluation. A rule engine checking discount eligibility reads almost like the business sentence it implements.

It is the rarest GoF pattern in production because real languages outgrow it fast: performance drops and grammars get complex. Its honest niche is tiny stable DSLs: search filters, validation rules, and configuration expressions. For anything bigger, name a parser generator instead.

## How it works

1. **Terminals are leaves:** numbers and variables evaluate directly.
2. **Non-terminals combine:** addition or conditions recurse into children.
3. **Context travels:** shared state (variable values) passes through every call.

\`\`\`js
// Each grammar rule is a class with interpret
class Add {
  constructor(left, right) { this.left = left; this.right = right; }
  interpret(ctx) { return this.left.interpret(ctx) + this.right.interpret(ctx); }
}
class Number {
  constructor(value) { this.value = value; }
  interpret(ctx) { return this.value; }
}
// new Add(new Number(2), new Number(3)).interpret({}) === 5
\`\`\`

## When to use

- Tiny stable grammars: search filters, validation rules, config expressions.
- Rules change often but stay small — classes beat string parsing.
- Business sentences should read as code.

## Common mistakes

- **Real languages:** performance and complexity kill hand-rolled interpreters at scale — use parser generators.
- **Growing grammars:** dozens of rules need tooling, not more classes.
- **No memoization:** repeated subtrees recompute exponentially — cache evaluations.

**Mistake:** "Interpreter for any language task."
**Correct:** "Small stable DSLs only — filters, validation, config. Real languages need real parsers."

## Keep in mind

- Terminal expressions are leaves, non-terminals combine children, context carries state.
- Fits tiny stable DSLs: filters, validation rules, config expressions.
- Rarely used in production: performance and grammar complexity kill it at scale.
- For real languages, say parser generator instead of hand-rolled interpreter.
- Each rule as a class keeps the grammar readable and testable.`,
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
  {
    slug: "memento-pattern",
    title: "Memento Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Memento captures and restores an object's state without exposing its internals. An editor takes snapshots of document content onto a history stack; restore pops a snapshot back. The Originator creates and consumes snapshots, the Memento itself is opaque, and the Caretaker stack only stores and returns them.

It differs from Command-based undo in what it stores: full state versus reverse actions. Snapshots are simpler but heavier, so real systems cap depth or store deltas. Game save points and form draft recovery are the everyday analogues interviewers recognize instantly.

## How it works

1. **Snapshot:** the originator packages its state into an opaque memento.
2. **Store:** a caretaker stack holds mementos without inspecting them.
3. **Restore:** popping feeds the snapshot back — state returns intact.

\`\`\`js
// Opaque snapshots, owner-only restore
class Editor {
  save() { return { text: this.text }; } // outsiders see a sealed envelope
  restore(snapshot) { this.text = snapshot.text; }
}
// history stack holds snapshots: undo = pop + restore
\`\`\`

## When to use

- Full state must return (checkpoints, game saves, drafts).
- Reverse actions are hard to write — snapshots are simpler.
- Audit needs point-in-time states.

## Common mistakes

- **Unbounded snapshots:** full copies every keystroke eat memory — cap depth or store deltas.
- **Leaky mementos:** outsiders reading snapshots breaks opacity — seal them.
- **Command confusion:** light reverse actions beat heavy snapshots — choose per need.

**Mistake:** "Memento and Command undo are the same."
**Correct:** "Snapshots versus reverse actions — memory against complexity, pick per need."

## Keep in mind

- Three roles: Originator owns state, Memento is the opaque snapshot, Caretaker stores them.
- State snapshots versus Command reverse-actions: know both undo strategies.
- Snapshots are simple but memory-heavy: cap depth or store deltas.
- Memento must stay opaque to everyone except the Originator.
- Examples: editor checkpoints, game saves, draft recovery.`,
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
- Vending machine is the canonical interview build: NoCoin, HasCoin, Dispensing, SoldOut.
- States can be shared since they hold no per-machine data.`,
  },
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
    slug: "template-method-pattern",
    title: "Template Method Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Template Method fixes an algorithm skeleton in a base class and lets subclasses fill specific steps. A beverage maker has one template: boil, brew, pour, add condiments. Tea and Coffee inherit the template but override only brew and condiments — the overall sequence can never reorder or skip by mistake.

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

**Mistake:** "Template Method inheritance jaisa hi hai."
**Correct:** "Inheritance is the tool; fixing the sequence is the intent."

## Keep in mind

- Algorithm skeleton lives once in the base class, steps vary in subclasses.
- Keep the template fixed by convention so order never changes.
- Hollywood principle: don't call us, we'll call you.
- Examples: test fixtures, ETL pipelines, framework lifecycles.
- Widely varying steps fit Strategy composition over inheritance.`,
  },
  {
    slug: "visitor-pattern",
    title: "Visitor Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Visitor adds new operations to object structures without modifying their classes. A document has Text, Image, and Table nodes; an ExportVisitor implements visit methods for each, so adding PDF export means a new visitor class, never touching node code. The mechanism is double dispatch: node.accept(visitor) calls back visitor.visit(this), so the runtime types of both sides pick the right method.

It shines when the structure is stable but operations grow: compilers, tax calculators over item types, and report generators. The price is the reverse: adding a new node type forces edits across every visitor, so only use it when operations change more often than the structure.

## How it works

1. **Nodes accept:** each node calls back the matching visit method.
2. **Visitors operate:** one class per operation across all node types.
3. **Never touch nodes:** new operations arrive as new visitor classes.

\`\`\`js
// Double dispatch: node type picks the visit overload
class Text {
  accept(visitor) { visitor.visitText(this); }
}
class Image {
  accept(visitor) { visitor.visitImage(this); }
}
// new PdfExportVisitor() with visitText/visitImage — nodes untouched
\`\`\`

## When to use

- Operations grow faster than node types: exporters, analyzers, compilers.
- One operation must span many element types uniformly.
- Element classes are stable or frozen (libraries).

## Common mistakes

- **New node types:** every visitor needs edits — stable structures only.
- **JS overloads:** no native overloading — name methods per type (visitText/visitImage).
- **Encapsulation leaks:** visitors need node internals — expose narrowly.

**Mistake:** "Visitor for unstable trees."
**Correct:** "Stable structure plus growing operations — otherwise every change ripples everywhere."

## Keep in mind

- New operations mean new visitor classes, zero edits to node classes.
- Double dispatch is the mechanism: accept calls back the matching visit overload.
- Use when operations grow faster than node types: exporters, analyzers, compilers.
- Adding a node type edits every visitor, so structures must be stable.
- Encapsulation weakens slightly since visitors need node internals.`,
  },
];
