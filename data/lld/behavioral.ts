import type { LldTopic } from "./types";

export const BEHAVIORAL: LldTopic[] = [
  {
    slug: "strategy-pattern",
    title: "Strategy Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Strategy extracts interchangeable algorithms behind one interface so the client picks behavior at runtime instead of branching on if-else. A payment service holds a PaymentStrategy reference: UPI, Card, and Wallet are swappable implementations, and adding Crypto touches no existing code. It is the textbook implementation of the Open/Closed principle.

The sign you need it is a growing conditional on type. Sorting comparators, pricing rules, and route planners are everyday examples. The context object stays stable while strategies come and go, which also makes each algorithm unit-testable in isolation.

\`\`\`java
// Behavior injected behind one interface, chosen at runtime
interface PaymentStrategy { void pay(int amount); }
class UPIStrategy implements PaymentStrategy { /* ... */ }
class Cart {
    private PaymentStrategy strategy;
    void setStrategy(PaymentStrategy s) { strategy = s; }
    void checkout(int amount) { strategy.pay(amount); }
}
\`\`\`

## Keep in mind

- Kills if-else on type: each branch becomes a swappable class.
- It is the classic Open/Closed example: new strategy, zero edits.
- Context holds the interface reference and delegates to it.
- Examples: payment modes, sorting comparators, pricing and routing rules.
- Strategies should be stateless so they can be shared safely.`,
  },
  {
    slug: "observer-pattern",
    title: "Observer Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Observer creates a one-to-many subscription: when the subject changes state, every registered observer is notified automatically. A YouTube channel publishes a video and all subscribers get notified; the channel never knows who they are or what they do with the event. That decoupling is the entire value.

Implementation is a subscriber list with attach, detach, and notify. Push the event data with the notification when observers always need it, or let them pull state when needs vary. Watch for two traps: notification order is not guaranteed unless you enforce it, and observers that modify the subscriber list during notification cause concurrent modification bugs.

\`\`\`java
// Subject notifies, observers react, nobody knows each other
interface Subscriber { void update(String video); }
class Channel {
    private final List<Subscriber> subs = new ArrayList<>();
    void subscribe(Subscriber s) { subs.add(s); }
    void publish(String video) {
        for (Subscriber s : new ArrayList<>(subs)) s.update(video);
    }
}
\`\`\`

## Keep in mind

- One-to-many subscription with full decoupling between subject and observers.
- Copy the subscriber list before notifying to avoid concurrent modification.
- Push event data when all observers need the same thing, pull when needs vary.
- Examples: pub-sub systems, event listeners, stock price alerts.
- Risk is notification storms: one change fanning out to thousands of observers.`,
  },
  {
    slug: "chain-of-responsibility",
    title: "Chain of Responsibility Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Chain of Responsibility passes a request along a linked series of handlers until one handles it. An ATM dispenser breaks 3700 into 2000, 1000, 500, 200 notes by handing the remainder down the chain; a support ticket escalates L1 to L2 to L3 the same way. The sender only knows the first handler, never the full chain.

Each handler decides to process, partially process, or forward, so ordering the chain is the real design work. Logging frameworks and servlet filters use it because new handlers slot in without touching existing ones. The failure mode to name is a request falling off the end unhandled, so always define a default terminal handler.

\`\`\`java
// Each handler processes what it can, forwards the rest
abstract class Dispenser {
    protected Dispenser next;
    void setNext(Dispenser n) { next = n; }
    void dispense(int amount) {
        int count = amount / denomination();
        // ... dispense count notes ...
        if (next != null) next.dispense(amount % denomination());
    }
    abstract int denomination();
}
\`\`\`

## Keep in mind

- Request flows down the chain until a handler claims it.
- Sender knows only the first link, which decouples it from all handlers.
- Chain order is the design decision: put cheapest or most common first.
- Examples: ATM denominations, support escalation, logging levels, servlet filters.
- Always add a terminal handler so no request falls off silently.`,
  },
  {
    slug: "null-object-pattern",
    title: "LLD of NULL Object Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Null Object replaces null checks with a do-nothing implementation of the same interface. Instead of scattering if (user != null) before every call, a NullUser implements the interface with safe defaults: empty name, zero discount, no-op save. Client code calls methods uniformly and never branches on absence.

The payoff is the disappearance of NullPointerExceptions by construction rather than by vigilance. It fits optional collaborators like loggers, discount policies, and default strategies. The honest limit: it hides the distinction between absent and present, so when missing data is itself meaningful, Optional or explicit handling is the better call.

\`\`\`java
// No null checks: the null object just does nothing safely
interface Logger { void log(String msg); }
class NullLogger implements Logger {
    public void log(String msg) { /* intentionally nothing */ }
}
class Service {
    private final Logger logger; // never null, sometimes a NullLogger
    void work() { logger.log("done"); } // no branch needed
}
\`\`\`

## Keep in mind

- Same interface, do-nothing behavior: clients never check for null.
- Kills NullPointerExceptions by construction, not by careful checking.
- Fits optional collaborators: loggers, default policies, guest users.
- When absence carries meaning, prefer Optional over silent no-ops.
- The object must be genuinely inert: no hidden side effects allowed.`,
  },
  {
    slug: "state-pattern-vending-machine",
    title: "State Design Pattern (Behavioral) | Design Vending Machine",
    tag: "Behavioral",
    body: `State lets an object change behavior when its internal state changes, by delegating to a state object. A vending machine behaves differently with no coin, with coin, and while dispensing: inserting a coin, pressing a button, and canceling each mean different things per state. Without the pattern this becomes a tangled switch on an enum; with it, each state is a class implementing the same interface.

Adding a new state means adding a class, never editing a giant conditional, which is the Open/Closed win. The context holds the current state reference and forwards calls to it, and states themselves trigger transitions. TCP connections, media players, and order lifecycles all share this shape.

\`\`\`java
// Context delegates, states transition themselves
interface VMState { void insertCoin(VendingMachine m); void pressButton(VendingMachine m); }
class NoCoin implements VMState {
    public void insertCoin(VendingMachine m) { m.setState(new HasCoin()); }
    public void pressButton(VendingMachine m) { System.out.println("Insert coin first"); }
}
class VendingMachine {
    private VMState state = new NoCoin();
    void setState(VMState s) { state = s; }
}
\`\`\`

## Keep in mind

- Each state is a class, transitions live inside states, context just delegates.
- Kills the giant switch-on-enum that every state machine grows otherwise.
- New state means new class, zero edits to existing states.
- Vending machine is the canonical interview build: NoCoin, HasCoin, Dispensing, SoldOut.
- States can be shared singletons since they hold no per-machine data.`,
  },
  {
    slug: "command-undo-redo",
    title: "Design Undo, Redo feature with Command Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Command turns a request into an object with execute and undo, so actions can be stored, queued, and reversed. An editor wraps every keystroke and format change as a command pushed on a history stack: undo pops and reverses, redo re-executes. The invoker (button, shortcut) never knows what the action does, which decouples UI from logic.

Each command must capture enough state to reverse itself: a delete command stores the removed text and position. That memory cost is the real trade-off, so real editors cap history depth and merge keystrokes. The same objects also enable macro recording, job queues, and transactional batching for free.

\`\`\`java
// Requests as objects: executable, storable, reversible
interface Command { void execute(); void undo(); }
class TypeCommand implements Command {
    private final Document doc; private final String text;
    public void execute() { doc.insert(text); }
    public void undo() { doc.deleteLast(text.length()); }
}
// history.push(cmd) on execute; undo pops and calls undo()
\`\`\`

## Keep in mind

- execute plus undo on every command object is the core contract.
- History stack gives undo, a second stack gives redo.
- Each command stores what it needs to reverse itself: text plus position.
- Memory cost is real: cap history depth and merge fine-grained commands.
- Bonus uses from the same objects: macros, queues, audit logs.`,
  },
  {
    slug: "iterator-pattern",
    title: "Iterator Design Pattern Explained with Example (Behavioral)",
    tag: "Behavioral",
    body: `Iterator gives sequential access to a collection without exposing its internals. Client code walks hasNext and next while the collection hides whether it is an array, a linked list, or a tree. Java's Iterator and enhanced for-loop are this pattern built into the language.

The value is uniform traversal across different structures plus multiple simultaneous iterations, each with its own cursor state. Custom collections in interviews (a song playlist, a paginated feed) should expose an iterator rather than leaking internal arrays. Fail-fast behavior on concurrent modification is the standard safety expectation to mention.

\`\`\`java
// Uniform traversal, internals hidden
class Playlist {
    private final List<Song> songs = new ArrayList<>();
    Iterator<Song> iterator() { return songs.iterator(); }
    Iterator<Song> shuffled() { /* custom iterator, same interface */ return null; }
}
\`\`\`

## Keep in mind

- hasNext plus next hides array, list, or tree internals uniformly.
- Enables multiple independent traversals with separate cursor state.
- Custom collections should expose iterators, never raw internal arrays.
- Mention fail-fast on concurrent modification as expected behavior.
- Java for-each works because collections return Iterators.`,
  },
  {
    slug: "mediator-auction-system",
    title: "Design Online Auction System with Mediator Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Mediator routes all peer-to-peer communication through one hub so objects never reference each other directly. In an online auction, bidders do not call each other: every bid goes to the AuctionMediator, which validates it, updates the highest bid, and notifies all participants. N peers drop from N-squared references to N references to the hub.

The auction design shows the interview shape: Bidder objects, an Auction lot with start and end time, and the mediator enforcing minimum increments, closing time, and anti-sniping extensions. The honest cost is the mediator itself growing into a god object, so keep peripheral logic (payments, notifications) in separate services behind it.

\`\`\`java
// Peers talk to the hub, never to each other
interface AuctionHub { void placeBid(Bidder b, int amount); }
class Auction implements AuctionHub {
    private int highest; private final List<Bidder> bidders = new ArrayList<>();
    public void placeBid(Bidder b, int amount) {
        if (amount <= highest) { b.reject(); return; }
        highest = amount;
        for (Bidder x : bidders) x.notify(highest);
    }
}
\`\`\`

## Keep in mind

- Peers reference only the hub: N-squared links collapse to N.
- The hub owns the rules: increments, closing time, anti-sniping extension.
- Examples: auction houses, chat rooms, air traffic control, UI dialogs.
- Watch the god-object risk: keep payments and notifications outside the mediator.
- Contrast with Facade: Mediator routes peer talk, Facade simplifies a subsystem.`,
  },
  {
    slug: "visitor-pattern",
    title: "Visitor Design Pattern | Double Dispatch (Behavioral)",
    tag: "Behavioral",
    body: `Visitor adds new operations to object structures without modifying their classes. A document has Text, Image, and Table nodes; an ExportVisitor implements visit methods for each, so adding PDF export means a new visitor class, never touching node code. The mechanism is double dispatch: node.accept(visitor) calls back visitor.visit(this), so the runtime types of both sides pick the right method.

It shines when the structure is stable but operations grow: compilers, tax calculators over item types, and report generators. The price is the reverse: adding a new node type forces edits across every visitor, so only use it when operations change more often than the structure.

\`\`\`java
// Double dispatch: node type picks the visit overload
interface Node { void accept(Visitor v); }
interface Visitor { void visit(Text t); void visit(Image i); }
class Text implements Node {
    public void accept(Visitor v) { v.visit(this); } // Text overload chosen
}
\`\`\`

## Keep in mind

- New operations mean new visitor classes, zero edits to node classes.
- Double dispatch is the mechanism: accept calls back the matching visit overload.
- Use when operations grow faster than node types: exporters, analyzers, compilers.
- Adding a node type edits every visitor, so structures must be stable.
- Encapsulation weakens slightly since visitors need node internals.`,
  },
  {
    slug: "mvc-pattern",
    title: "MVC Design Pattern | MVC Architecture Overview",
    tag: "Behavioral",
    body: `MVC splits an application into Model (data and business rules), View (what the user sees), and Controller (input handling that updates the model). The user acts on the controller, the controller mutates the model, and the view re-renders from the model. Each layer has one job, so UI redesigns never touch business logic.

Frameworks implement flavors of it: server-rendered apps keep controllers on the backend, while frontend frameworks blur lines with view-models. The interview point is separation of concerns and testability: models can be tested without any UI, and views stay dumb. The classic smell of violation is SQL queries inside JSP files or business rules inside click handlers.

\`\`\`java
// Three roles, one direction of dependence
class OrderModel { /* data + rules, no UI knowledge */ }
class OrderView { void render(OrderModel m) { /* display only */ } }
class OrderController {
    void placeOrder() { model.submit(); view.render(model); }
}
\`\`\`

## Keep in mind

- Model holds data plus rules, View only displays, Controller handles input.
- Flow is user to controller to model to view, always in that direction.
- Benefit is testability: models test without UI, views stay dumb.
- Violation smell: SQL in templates, business rules in click handlers.
- MVP and MVVM are the same idea adapted for different UI stacks.`,
  },
  {
    slug: "memento-pattern",
    title: "Memento Design Pattern explanation (Behavioral)",
    tag: "Behavioral",
    body: `Memento captures and restores an object's state without exposing its internals. An editor takes snapshots of document content onto a history stack; restore pops a snapshot back. The Originator creates and consumes snapshots, the Memento itself is opaque, and the Caretaker stack only stores and returns them.

It differs from Command-based undo in what it stores: full state versus reverse actions. Snapshots are simpler but heavier, so real systems cap depth or store deltas. Game save points and form draft recovery are the everyday analogues interviewers recognize instantly.

\`\`\`java
// Opaque snapshots, owner-only restore
class Editor {
    private String text;
    Memento save() { return new Memento(text); }
    void restore(Memento m) { text = m.state; }
    static class Memento { private final String state; /* ... */ }
}
// Stack<Memento> history; undo pops and restores
\`\`\`

## Keep in mind

- Three roles: Originator owns state, Memento is the opaque snapshot, Caretaker stores them.
- State snapshots versus Command reverse-actions: know both undo strategies.
- Snapshots are simple but memory-heavy: cap depth or store deltas.
- Memento must stay opaque to everyone except the Originator.
- Examples: editor checkpoints, game saves, draft recovery.`,
  },
  {
    slug: "template-method-pattern",
    title: "Template Method Design Pattern Explanation in Java (Behavioral)",
    tag: "Behavioral",
    body: `Template Method defines an algorithm skeleton in a base class and lets subclasses fill in specific steps. A beverage maker has one final template: boil, brew, pour, add condiments. Tea and Coffee inherit the template but override only brew and condiments, so the overall sequence can never be reordered or skipped by mistake.

The template method itself is final to protect the sequence, while the variable steps are abstract or hook methods with defaults. Frameworks run on this: servlets, test runners, and data pipelines all fix the flow and invite customization at designated points. The trade-off is inheritance coupling, so when steps vary wildly, composition with Strategy fits better.

\`\`\`java
// Skeleton fixed and final, steps overridden
abstract class Beverage {
    final void prepare() { boil(); brew(); pour(); addCondiments(); }
    abstract void brew();
    abstract void addCondiments();
    void boil() { /* shared */ } void pour() { /* shared */ }
}
\`\`\`

## Keep in mind

- Algorithm skeleton lives once in the base class, steps vary in subclasses.
- Mark the template final so subclasses cannot reorder the sequence.
- Hollywood principle: do not call us, we will call you.
- Examples: servlet lifecycle, test fixtures, ETL pipelines.
- If steps vary too much, prefer Strategy composition over inheritance.`,
  },
  {
    slug: "interpreter-pattern",
    title: "Interpreter Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Interpreter evaluates sentences of a small language by representing each grammar rule as a class. Terminal expressions handle leaves like numbers, non-terminal expressions combine them like addition, and a context object carries shared state through evaluation. A rule engine checking discount eligibility reads almost like the business sentence it implements.

It is the rarest GoF pattern in production because real languages outgrow it fast: performance drops and grammars get complex. Its honest niche is tiny stable DSLs: search filters, validation rules, and configuration expressions. For anything bigger, name a parser generator instead.

\`\`\`java
// Each grammar rule is a class with interpret
interface Expr { int interpret(Map<String, Integer> ctx); }
class Number implements Expr {
    private final int value;
    public int interpret(Map<String, Integer> ctx) { return value; }
}
class Add implements Expr {
    private final Expr left, right;
    public int interpret(Map<String, Integer> ctx) {
        return left.interpret(ctx) + right.interpret(ctx);
    }
}
\`\`\`

## Keep in mind

- Terminal expressions are leaves, non-terminals combine children, context carries state.
- Fits tiny stable DSLs: filters, validation rules, config expressions.
- Rarely used in production: performance and grammar complexity kill it at scale.
- For real languages, say parser generator instead of hand-rolled interpreter.
- Each rule as a class keeps the grammar readable and testable.`,
  },
  {
    slug: "all-behavioral-patterns",
    title: "All Behavioral Design Patterns in 1 Video",
    tag: "Summary",
    body: `Behavioral patterns govern how objects communicate and share work. Chain passes requests down handler links. Command wraps requests as reversible objects. Interpreter evaluates grammar rule by rule. Iterator walks collections uniformly. Mediator routes peers through a hub. Memento snapshots state for restore. Null Object replaces null checks with safe no-ops. Observer broadcasts state changes to subscribers. State swaps behavior per state class. Strategy swaps algorithms behind one interface. Template Method fixes the skeleton and varies steps. Visitor adds operations without touching structures.

A one-line map for revision: link handlers means Chain, reversible actions means Command, grammar rules means Interpreter, uniform traversal means Iterator, peer hub means Mediator, snapshots means Memento, kill null checks means Null Object, subscriptions means Observer, behavior per state means State, swappable algorithm means Strategy, fixed skeleton means Template Method, new operations on stable trees means Visitor.

\`\`\`java
// Behavioral patterns are all about who talks to whom, and how
// Chain -> Command -> Interpreter -> Iterator -> Mediator -> Memento
// NullObject -> Observer -> State -> Strategy -> TemplateMethod -> Visitor
\`\`\`

## Keep in mind

- Chain vs Command: flowing requests versus stored reversible actions.
- Observer vs Mediator: broadcast subscription versus routed peer talk.
- State vs Strategy: same structure, different intent — internal state versus swappable algorithm.
- Memento vs Command-undo: snapshots versus reverse actions.
- Visitor needs stable structures; Interpreter needs tiny grammars.
- MVC sits above these as an architectural arrangement, not a peer.`,
  },
];
