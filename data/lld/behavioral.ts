import type { LldTopic } from "./types";

export const BEHAVIORAL: LldTopic[] = [
  {
    slug: "strategy-pattern",
    title: "Strategy Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Define a family of interchangeable algorithms, encapsulate each one, and make them swappable at runtime so the client depends on behavior names, not concrete implementations.

**Participants:** \`Context\` (holds a strategy and delegates work), \`Strategy\` interface (the shared contract), concrete strategies (\`UPIStrategy\`, \`CardStrategy\`, …). The client or factory chooses which strategy to inject — the context never branches on payment type.

**Flow:** Client configures context with a strategy → context receives a request → context calls \`strategy.execute(...)\` → swapping strategies changes behavior without editing the context. Adding a new algorithm means a new class implementing the interface — classic Open/Closed.

Strategy moves swappable algorithms behind one name. A checkout service holds a \`PaymentStrategy\` reference: UPI, card, and wallet swap freely; adding crypto touches no existing code. The signal in code reviews is a growing \`switch\` or \`if-else\` on type — sorting comparators, pricing rules, and route planners are everyday examples.

## How it works

1. **One contract:** all strategies implement the same interface (typed methods, not duck typing alone).
2. **Context holds it:** the context keeps a \`Strategy\` reference, never concrete classes.
3. **Swap at runtime:** \`setStrategy\` changes behavior — old context code stays untouched.

\`\`\`ts
interface PaymentStrategy {
  pay(amount: number): Promise<void>;
}

class Cart {
  private strategy!: PaymentStrategy;

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  checkout(amount: number): Promise<void> {
    return this.strategy.pay(amount);
  }
}
// cart.setStrategy(new UPIStrategy()); or new CardStrategy() — Cart unchanged
\`\`\`

## Real-world example

**Checkout with multiple payment methods (Stripe, Razorpay, wallets):** The order service exposes \`pay(orderId, method)\`. Each method is a strategy: card tokenization, UPI intent, wallet debit. Product adds “Pay with BNPL” by shipping a new strategy class and registering it in config — no edits to \`CheckoutService\` conditionals.

- Runtime choice from user selection or A/B tests (show UPI first in India, card in EU).
- Unit-test each strategy with mocked gateways; context tests with a fake strategy.
- Strategies stay stateless; per-order data lives in method arguments or a small DTO.
- Contrast with State: strategy is **chosen from outside**; state **transitions from inside** the object.

## When to use

- Conditionals on type keep growing (payment modes, pricing rules).
- Algorithms chosen at runtime (sorting, routing, compression).
- Each algorithm should test independently.

## Common mistakes

- **Logic in context:** \`if (type === 'UPI')\` inside the context kills the pattern — choose strategy from outside (factory, DI, or caller).
- **Stateful strategies:** shared singleton strategies holding mutable state corrupt concurrent checkouts — keep them stateless or scope per request.
- **Two algorithms:** if variation will never grow, a plain function or small branch is enough — do not over-pattern.
- **Leaking concrete types:** context methods returning strategy-specific types break the abstraction — keep the interface as the boundary.

**Mistake:** "Strategy and State are the same."
**Correct:** "Same shape, different intent: Strategy is chosen from outside; State changes from inside when the object's mode changes."

## Keep in mind

- Kills \`if-else\` on type: each branch becomes a swappable class implementing one interface.
- Classic Open/Closed: new strategy, zero edits to context (only wiring/DI).
- Context holds the strategy reference and delegates — it does not decide which algorithm runs.
- Examples: payment modes, sorting comparators, tax/pricing rules, navigation routing.
- Pair with Factory when construction of strategies is non-trivial.`,
  },
  {
    slug: "observer-pattern",
    title: "Observer Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Define a one-to-many dependency so when one object (subject) changes state, all dependents (observers) are notified automatically — without the subject knowing their concrete types.

**Participants:** \`Subject\` (maintains observer list, \`attach\` / \`detach\` / \`notify\`), \`Observer\` interface (\`update(event)\`), concrete observers (email notifier, analytics, cache invalidator). Optional: event payload type for push semantics.

**Flow:** Observers subscribe → subject mutates → subject \`notify(payload)\` → each observer reacts independently. Unsubscribe on teardown or observers leak. Order of delivery is undefined unless you add explicit priority queues.

Observer builds pub-sub inside a process: a channel publishes a video and every subscriber learns; the channel never enumerates who they are or what they do with the news. That ignorance (decoupling) is the entire value. Push when all observers need the same snapshot; let observers pull from the subject when needs diverge.

## How it works

1. **Subscribe:** observers register on the subject's list (\`attach\`).
2. **Publish:** the subject broadcasts on change — no direct calls to concrete observer classes.
3. **Unsubscribe:** \`detach\` on unmount or shutdown, or references and callbacks leak.

\`\`\`ts
interface Observer<T> {
  update(payload: T): void;
}

class Channel<T> {
  private subs: Observer<T>[] = [];

  attach(observer: Observer<T>): void {
    this.subs.push(observer);
  }

  detach(observer: Observer<T>): void {
    this.subs = this.subs.filter((s) => s !== observer);
  }

  publish(payload: T): void {
    for (const s of [...this.subs]) {
      s.update(payload);
    }
  }
}
\`\`\`

## Real-world example

**YouTube-style subscriptions:** When a creator uploads a video, the \`Channel\` subject notifies subscribers — push notification service, recommendation indexer, subscriber feed cache, and analytics each implement \`Observer<VideoPublishedEvent>\`. The upload API only calls \`channel.publish(video)\`; it does not import every downstream system.

- Fan-out can storm: batch or debounce notify for high-frequency events (live chat vs. one upload).
- Copy the observer list before iterating so \`detach\` mid-callback does not skip or double-notify.
- Weak references or explicit unsubscribe in SPA \`useEffect\` cleanup prevent memory leaks.
- Event buses (Redis, in-app) scale the same idea across services — local Observer is the in-process form.

## When to use

- One change must reach many places (pub-sub, DOM events, stock alerts).
- Senders must not know receivers (decoupling, plugin-style reactions).
- Observers come and go dynamically.

## Common mistakes

- **Editing mid-loop:** unsubscribing during \`notify\` corrupts iteration — always iterate a copy or use a snapshot list.
- **Assuming order:** no guaranteed delivery order — add priority queues when order matters (e.g. security before analytics).
- **Leaked subscriptions:** components that attach but never detach pile up — mandatory lifecycle hooks.
- **Fat subjects:** subject doing heavy work for each observer — keep notify thin; observers pull or async queue heavy work.

**Mistake:** "Observers arrive in order."
**Correct:** "No order guaranteed — copy the list before notifying; add priority when order matters."

## Keep in mind

- One-to-many subscription with decoupling: subject knows interface, not implementations.
- Copy the list before notifying — avoids concurrent modification bugs.
- Push shared payload; pull from subject when observer needs different slices of state.
- Examples: DOM \`addEventListener\`, RxJS streams, Redux subscribers, domain event handlers.
- Watch notification storms: one state change fanning out to thousands of handlers needs batching.`,
  },
  {
    slug: "chain-of-responsibility",
    title: "Chain of Responsibility Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Avoid coupling the sender to multiple receivers by giving more than one object a chance to handle a request — linked handlers pass the request along until something processes it (fully or partially).

**Participants:** \`Handler\` interface (\`handle(request)\`, optional \`setNext\`), concrete handlers (auth, rate limit, validation, business logic), \`Client\` sends only to the first link. A **terminal** handler catches stragglers (404, default error page).

**Flow:** Request enters first handler → handler processes its slice or skips → forwards remainder/next link → repeat until handled or terminal responds. Chain **order** is design: cheap checks before expensive ones; auth before DB hits.

Chain of Responsibility passes a request hand to hand until someone handles it. Express middleware is the canonical web shape: each function calls \`next()\` or ends the response. ATM dispensers, support escalation L1→L2→L3, and servlet filters share the same topology — sender knows only the entry point.

## How it works

1. **Link up:** each handler holds an optional \`next\` reference (builder-style \`setNext\` returns next for fluency).
2. **Handle what fits:** process your share, then forward what remains (or the whole request if you pass-through).
3. **Catch the end:** a default handler guarantees nothing falls silently (404, “unable to dispense”, generic error).

\`\`\`ts
interface Request {
  amount: number;
}

abstract class Dispenser {
  protected next: Dispenser | null = null;

  setNext(next: Dispenser): Dispenser {
    this.next = next;
    return next;
  }

  abstract denomination(): number;
  abstract dispense(req: Request): void;
}

class NoteDispenser extends Dispenser {
  constructor(private readonly value: number) {
    super();
  }

  denomination(): number {
    return this.value;
  }

  dispense(req: Request): void {
    const count = Math.floor(req.amount / this.value);
    req.amount %= this.value;
    if (this.next && req.amount > 0) this.next.dispense(req);
  }
}
\`\`\`

## Real-world example

**Express middleware chain:** An HTTP request hits \`cors\` → \`auth\` → \`rateLimit\` → \`validateBody\` → \`controller\`. Each middleware is a handler: it can respond (terminate) or call \`next()\` to forward. Adding request logging inserts a new link without rewriting controllers — same as CoR.

- Order matters: authenticate before authorization; parse body before validation.
- Terminal handler: global error middleware maps unhandled errors to 500 JSON.
- Avoid cycles — \`next\` must form a DAG/line, never loop back upstream.
- Partial handling: compression middleware transforms response stream then passes to next.

## When to use

- Exactly one handler may claim the request, decided at runtime (escalation, filters).
- Handlers join and leave over time (logging levels, feature flags on middleware).
- Senders must stay ignorant of the full handler list.

## Common mistakes

- **Missing tail:** requests vanish silently — always wire a default/404/error handler.
- **Wrong order:** expensive handler first makes every request pay — put cheap/common first.
- **Loops:** a link pointing back upstream spins forever — keep chains acyclic.
- **Forgot to call next:** middleware that neither responds nor forwards hangs the client.

**Mistake:** "Every link does everything."
**Correct:** "Each link handles its slice and forwards the rest — with a default catch at the end."

## Keep in mind

- Request flows link to link until someone handles or terminal responds.
- Sender knows only the first link — decoupled from individual handlers.
- Chain order is explicit design: auth, validation, then business logic.
- Examples: Express/Koa middleware, servlet filters, ATM denominations, support tiers.
- Document who may **terminate** vs **pass-through** for each link.`,
  },
  {
    slug: "command-undo-redo",
    title: "Command Pattern: Undo and Redo (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Encapsulate a request as an object so you can parameterize clients with different requests, queue operations, log them, and support undo/redo.

**Participants:** \`Command\` interface (\`execute\`, \`undo\`), concrete commands (insert text, delete node), \`Invoker\` (UI, scheduler — calls execute), \`Receiver\` (document, canvas — actual domain mutations). Optional: \`CommandHistory\` with undo/redo stacks.

**Flow:** Invoker builds command with receiver state → \`execute()\` mutates receiver and pushes onto undo stack → \`undo()\` reverses using captured state → redo stack re-applies execute after undo. New user action clears redo stack.

Command turns requests into first-class objects. Redux time-travel and editor undo stacks are the same idea: each action is a serializable command with an inverse (or replay from prior state). The invoker (button, shortcut, dispatch) stays decoupled from document logic.

## How it works

1. **Objectify:** every action implements \`execute\` plus \`undo\` (and sometimes \`redo\` as re-execute).
2. **Stack it:** push on execute; undo pops and calls \`undo\`; redo pops from redo stack and \`execute\` again.
3. **Capture reversal state:** store text, indices, old values — whatever makes undo deterministic.

\`\`\`ts
interface Command {
  execute(): void;
  undo(): void;
}

interface TextDocument {
  insert(text: string): void;
  deleteLast(count: number): void;
}

class TypeCommand implements Command {
  constructor(
    private readonly doc: TextDocument,
    private readonly text: string,
  ) {}

  execute(): void {
    this.doc.insert(this.text);
  }

  undo(): void {
    this.doc.deleteLast(this.text.length);
  }
}

class History {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  run(cmd: Command): void {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = [];
  }

  undo(): void {
    const cmd = this.undoStack.pop();
    if (cmd) {
      cmd.undo();
      this.redoStack.push(cmd);
    }
  }
}
\`\`\`

## Real-world example

**Redux undo/redo and design tools:** Each user gesture becomes a command: \`MoveLayerCommand\`, \`SetColorCommand\`. The store or history manager runs \`execute\`, keeps a stack, and \`undo\` restores prior property values. Figma-style editors merge micro-commands (drag end) to cap memory while keeping keystroke-level undo in text fields.

- Capture minimal inverse state — not full document snapshots unless needed.
- Irreversible ops (send email, charge card) use compensating commands or block undo.
- Macro = composite command executing child commands in sequence with group undo.
- Same command objects enable job queues, audit logs, and transactional batching.

## When to use

- Undo/redo needed (editors, design tools, games, config UIs).
- Actions queued, deferred, or retried (workers, outbox pattern).
- Macros, audit trails, or transactional batching wanted.

## Common mistakes

- **Missing reversal state:** without captured data, \`undo\` cannot run — design commands with inverse in mind upfront.
- **Unbounded history:** thousands of fine-grained commands eat memory — cap depth, merge keystrokes/drag sessions.
- **Irreversible actions:** sent emails cannot un-send — compensating action or disable undo for that command type.
- **Mutating command after execute:** frozen command objects keep history consistent.

**Mistake:** "Save full state for undo."
**Correct:** "Inverse commands are lighter than snapshots — execute plus undo per command, depth capped."

## Keep in mind

- \`execute\` + \`undo\` on every command — the core contract.
- Undo stack + redo stack; new execute clears redo.
- Store what reversal needs: offsets, old values, selection ranges.
- Memory is real: merge, cap, and compress history in production editors.
- Bonus: macros, queues, CQRS write models, and audit logs reuse command objects.`,
  },
  {
    slug: "state-pattern",
    title: "State Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Allow an object to alter its behavior when its internal state changes — the object appears to change class by delegating state-specific work to a state object.

**Participants:** \`Context\` (holds current \`State\`, forwards requests), \`State\` interface (methods for each context action), concrete states (\`NoCoin\`, \`HasCoin\`, \`Dispensing\`). States call \`context.setState(...)\` to transition.

**Flow:** Context receives event → delegates to current state → state performs logic and may transition → context behavior for the **same method name** differs by active state. Transitions live in state classes, not in a central \`switch\`.

State kills giant \`switch (mode)\` blocks. TCP connections (CLOSED, SYN_SENT, ESTABLISHED), media players (playing, paused, buffering), and order lifecycles (placed, paid, shipped) all map cleanly — each state is a class implementing the same interface.

## How it works

1. **One class per state:** each implements the same \`State\` interface for context actions.
2. **Context delegates:** the machine forwards \`insertCoin\`, \`pressButton\`, etc. to \`this.state\`.
3. **States transition:** valid events call \`context.setState(new NextState())\` from inside the state object.

\`\`\`ts
interface VendingState {
  insertCoin(machine: VendingMachine): void;
  pressButton(machine: VendingMachine): void;
}

class NoCoin implements VendingState {
  insertCoin(machine: VendingMachine): void {
    machine.setState(new HasCoin());
  }

  pressButton(_machine: VendingMachine): void {
    console.log("Insert coin first");
  }
}

class VendingMachine {
  private state: VendingState = new NoCoin();

  setState(state: VendingState): void {
    this.state = state;
  }

  insertCoin(): void {
    this.state.insertCoin(this);
  }

  pressButton(): void {
    this.state.pressButton(this);
  }
}
\`\`\`

## Real-world example

**TCP connection states:** A socket context delegates \`connect\`, \`send\`, \`close\` to \`ClosedState\`, \`SynSentState\`, \`EstablishedState\`. \`send\` in CLOSED errors; in ESTABLISHED writes to the buffer; transitions follow the protocol graph inside state classes — not one 800-line \`switch\`.

- Every state should define behavior for every event (even if “illegal operation”).
- Shared stateless state objects (\`SoldOut\`) are safe; per-connection data stays on context.
- State charts document transitions; code mirrors one class per chart node.
- Versus Strategy: state **changes itself** on events; strategy is **injected** externally.

## When to use

- Behavior depends on internal mode (machines, protocols, workflows).
- Enum \`switch\` blocks are sprouting with intertwined transition logic.
- New states arrive without editing every branch in the context.

## Common mistakes

- **Transitions in context:** \`if-else\` in the machine defeats the pattern — keep transitions in state classes.
- **Stateful shared states:** static fields on state classes leak across contexts — keep state objects stateless.
- **Silent gaps:** undefined methods or empty handlers make events no-op without feedback — handle illegal transitions explicitly.
- **Confusing with Strategy:** same delegation shape; intent and who triggers change differ.

**Mistake:** "An enum is enough for states."
**Correct:** "Two states fit an enum; the fifth transition turns it into a switch jungle — one class per state."

## Keep in mind

- Each state is a class; transitions live inside states; context only delegates and holds current state.
- Kills giant \`switch (state)\` on enums in state machines.
- New state = new class; minimize edits to existing states (Open/Closed).
- Canonical interview build: vending machine or TCP subset.
- Document illegal transitions (error, ignore, or queue) consistently.`,
  },
  {
    slug: "template-method-pattern",
    title: "Template Method Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Define the skeleton of an algorithm in a base class, deferring some steps to subclasses so subclasses redefine certain steps without changing the algorithm's structure.

**Participants:** \`AbstractClass\` with \`final\`-by-convention \`templateMethod()\` calling hook/abstract steps, concrete subclasses overriding \`brew()\`, \`addCondiments()\`, etc. The **Hollywood principle:** don't call us, we'll call you — the base drives the flow.

**Flow:** Client calls \`prepare()\` on subclass → base runs fixed sequence → at each hook, polymorphism runs subclass override → shared steps (\`boil\`, \`pour\`) live once in the base.

Template Method fixes order when variation is **which step**, not **whether to run steps**. React class lifecycle (deprecated but illustrative), test \`beforeEach/test/afterEach\`, and ETL pipelines (extract → transform → load) are templates — frameworks own the sequence; you fill hooks.

## How it works

1. **Fix the skeleton once:** the base owns \`templateMethod()\` and its call order.
2. **Leave steps open:** abstract methods or hooks subclasses override; default hooks optional.
3. **Share the common:** identical steps implemented once in the abstract base.

\`\`\`ts
abstract class Beverage {
  prepare(): void {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }

  protected boilWater(): void {
    /* shared */
  }

  protected pourInCup(): void {
    /* shared */
  }

  protected abstract brew(): void;
  protected abstract addCondiments(): void;
}

class Coffee extends Beverage {
  protected brew(): void {
    /* drip */
  }

  protected addCondiments(): void {
    /* milk */
  }
}
\`\`\`

## Real-world example

**React render pipeline (conceptual):** Framework template: reconcile → render host components → commit DOM updates → run layout effects. Custom components override render (hook step) without reordering reconciliation — you do not replace the whole scheduler. Test runners fix \`setup → run → teardown\`; subclasses override fixtures.

- Protect \`prepare()\` from override (TypeScript \`final\` pattern: do not expose as overridable, or document heavily).
- Hooks with empty default avoid forcing subclasses to implement optional steps.
- When steps vary wildly or multiply, **Strategy** composition beats deep template hierarchies.
- Template Method uses inheritance; Strategy uses composition — choose by how fixed the sequence is.

## When to use

- Algorithm order is fixed, individual steps vary (ETL, test lifecycles, build pipelines).
- Frameworks invite extension at well-defined points.
- Duplicate sequences spread across subclasses with only step differences.

## Common mistakes

- **Overriding the template:** subclasses rewriting \`prepare()\` breaks guaranteed order — keep skeleton non-overridable by convention.
- **Deep hierarchies:** three template levels become unreadable — flatten or compose strategies for steps.
- **Every step abstract:** provide default hooks where sensible so subclasses are not forced to implement no-ops.
- **Business logic in base:** base orchestrates; domain rules belong in overridden steps or injected services.

**Mistake:** "Template Method is just inheritance."
**Correct:** "Inheritance is the mechanism; fixing the algorithm sequence while varying steps is the intent."

## Keep in mind

- Skeleton lives once in the base; subclasses vary hooks only.
- Hollywood principle: base calls subclass steps, not the other way around.
- Examples: JUnit-style tests, build tools, beverage/ETL tutorials, game loop templates.
- Widely varying or optional steps → Strategy inside template hooks.
- TypeScript: use \`abstract\` methods for required hooks; protected for extension points.`,
  },
  {
    slug: "iterator-pattern",
    title: "Iterator Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Provide a way to access elements of an aggregate object sequentially without exposing its underlying representation.

**Participants:** \`Iterable\` (provides \`[Symbol.iterator]()\`), \`Iterator\` (\`next(): IteratorResult<T>\`), concrete aggregate (playlist, binary tree, paginated API wrapper). Multiple iterators = independent cursors.

**Flow:** Client requests iterator from aggregate → loop \`next()\` or \`for...of\` → iterator tracks position internally → aggregate structure (array, linked list, B-tree) stays hidden. Concurrent traversals each hold their own iterator instance.

In TypeScript/JavaScript, the pattern is first-class: \`Symbol.iterator\`, \`Iterator<T>\`, and \`for...of\` are the standard contract. Custom collections in interviews (song playlist, paginated feed, file tree) should expose iterators rather than leaking internal arrays.

## How it works

1. **Expose an iterator:** \`[Symbol.iterator]()\` or \`createIterator()\` — not raw internal storage.
2. **Hide the structure:** consumers see \`T\` values only.
3. **Separate cursors:** each \`for...of\` or manual loop gets its own iterator state.

\`\`\`ts
class Playlist implements Iterable<string> {
  constructor(private readonly songs: string[]) {}

  [Symbol.iterator](): Iterator<string> {
    let index = 0;
    const songs = this.songs;

    return {
      next(): IteratorResult<string> {
        if (index < songs.length) {
          return { value: songs[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

for (const song of new Playlist(["a", "b"])) {
  /* structure hidden */
}
\`\`\`

## Real-world example

**Collection iterators in language/runtime and APIs:** Java \`Iterable\`, C++ iterators, and JS \`Map\`/\`Set\` let you walk data without index arithmetic. A **paginated REST feed** wraps pages: the iterator fetches \`next\` URL when the current page exhausts — callers use uniform \`for await\` while backend switches from offset to cursor pagination internally.

- Never return mutable internal arrays — callers could break invariants.
- Define policy for mutation during iteration: fail-fast (version stamp) or snapshot.
- Async iterators (\`AsyncIterable\`) extend the same idea for streams and pagination.
- Tree iterators: in-order, pre-order as separate iterator classes over the same aggregate.

## When to use

- Custom aggregates need standard traversal (trees, graphs, composite UI trees).
- Internal representation may change — clients depend on iterator contract only.
- Multiple simultaneous traversals must not share one cursor.

## Common mistakes

- **Leaking raw arrays:** \`getItems(): T[]\` invites mutation — prefer iteration API or readonly views.
- **Shared cursor:** one iterator instance reused across loops — factory a fresh iterator per traversal.
- **Mid-walk edits undefined:** document fail-fast vs snapshot; JavaScript arrays behave differently under concurrent splice.
- **Skipping \`done\`:** manual iterators must return \`{ done: true }\` without reading \`value\`.

**Mistake:** "Indexes are enough for loops."
**Correct:** "Indexes leak structure; change representation and every indexed loop breaks — expose iterators."

## Keep in mind

- \`Symbol.iterator\` + \`for...of\` is the idiomatic TypeScript/JavaScript contract.
- Separate cursors enable nested and parallel traversals.
- Custom collections implement \`Iterable<T>\` for ergonomic consumer code.
- State mid-walk edit policy explicitly (especially in interview follow-ups).
- Generators (\`function*\`) are concise iterator implementations for linear sequences.`,
  },
  {
    slug: "mediator-auction-system",
    title: "Mediator Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `**Intent:** Define an object that encapsulates how a set of objects interact — peers communicate only through the mediator, reducing many-to-many dependencies to many-to-one.

**Participants:** \`Mediator\` interface (\`notify(sender, event)\` or domain methods like \`placeBid\`), \`Colleague\` peers (bidders, chat users, UI controls), concrete mediator enforcing rules and broadcasting updates. Peers hold mediator reference, not each other.

**Flow:** Peer sends event to mediator → mediator validates, updates central state → mediator notifies all (or relevant) peers → peers react without direct peer references. Rules (min increment, sniping extension) live in one place.

Mediator collapses N² wiring to N links to the hub. Chat rooms route messages through the room object; air traffic control coordinates planes through the tower; UI dialogs coordinate controls through a dialog mediator so buttons and lists do not reference each other directly.

## How it works

1. **Peers hold the hub:** colleagues know only the \`Mediator\`.
2. **Hub owns rules:** validation, timing, increments centralized.
3. **Hub broadcasts:** outcomes fan out from mediator to registered peers.

\`\`\`ts
interface Bidder {
  onBidAccepted(amount: number): void;
  onBidRejected(reason: string): void;
}

interface AuctionMediator {
  register(bidder: Bidder): void;
  placeBid(bidder: Bidder, amount: number): void;
}

class LiveAuction implements AuctionMediator {
  private highest = 0;
  private readonly bidders = new Set<Bidder>();

  register(bidder: Bidder): void {
    this.bidders.add(bidder);
  }

  placeBid(bidder: Bidder, amount: number): void {
    if (amount <= this.highest) {
      bidder.onBidRejected("Bid too low");
      return;
    }
    this.highest = amount;
    for (const b of this.bidders) {
      b.onBidAccepted(this.highest);
    }
  }
}
\`\`\`

## Real-world example

**Live auction or chat room:** Bidders call \`mediator.placeBid(amount)\`; the mediator checks minimum increment, extends closing time on late bids (anti-sniping), and pushes \`currentPrice\` to all registered UI panels. Chat users send \`mediator.sendMessage(text)\`; the room validates, logs, and broadcasts — users never hold references to every other participant.

- Split god-object risk: payments, email, and push notifications stay in services the mediator calls.
- No peer-to-peer shortcuts — one direct reference between colleagues reintroduces N² coupling.
- Versus **Facade:** Facade simplifies a subsystem for an external client; Mediator coordinates **equals** who talk to each other.
- Event aggregator in front-end state management is a mediator variant for cross-component signals.

## When to use

- Many peers interact with complex rules (auctions, chat, wizards, form coordination).
- N² references are tangling object graphs.
- Central policy must change without editing every peer.

## Common mistakes

- **God object:** stuffing payments, persistence, and notifications inside the mediator — delegate to services.
- **Direct side channels:** peer A calling peer B bypasses rules — route all interaction through mediator.
- **Facade confusion:** Facade hides complexity for outsiders; Mediator orchestrates insiders.
- **Over-notification:** broadcasting every keystroke — batch or filter events at the hub.

**Mistake:** "Stuff all logic into the mediator."
**Correct:** "The hub owns coordination rules and broadcast — peripheral work lives in services behind it."

## Keep in mind

- Peers reference only mediator: N² links collapse to N.
- Hub owns interaction rules: increments, roles, timing, anti-sniping.
- Examples: chat rooms, auction houses, dialog/wizard UI mediators, ATC tower metaphor.
- Watch god-object growth — extract domain services early.
- Contrast Facade (outward simplicity) vs Mediator (inward peer decoupling).`,
  },
];
