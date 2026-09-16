import type { LldTopic } from "./types";

export const FUNDAMENTALS: LldTopic[] = [
  {
    slug: "what-is-lld",
    title: "What is LLD (Low Level Design)",
    tag: "Concept",
    body: `Low Level Design is the class-level blueprint of a system. High Level Design (HLD) talks about servers, databases, load balancers, and data flow at scale. LLD talks about classes, their responsibilities, relationships, and the design patterns that keep the code maintainable. A typical LLD interview asks you to design something like a Parking Lot, BookMyShow, or URL shortener on a whiteboard in about 45 minutes — not to write production code, but to prove you can structure a problem in objects.

Designing before coding is cheap. A wrong class structure becomes technical debt in production: every new feature touches three unrelated classes, tests become brittle, and "just one more if-statement" accumulates. LLD interviews test your OOP grip — can you extract entities from requirements, assign clear responsibilities, name relationships correctly, and articulate trade-offs when two designs both work?

Good LLD answers are **specific** (named classes, named methods, one happy-path walkthrough) and **pragmatic** (simple design that handles stated requirements beats a pattern parade that ignores edge cases).

## How LLD interviews work

1. **Clarify requirements (~10 min).** Pin down scope — what gets built, what does not. Ask about entities, limits, concurrency, and edge cases (full lot, duplicate booking, invalid payment).
2. **List entities (~10 min).** Nouns in the statement become candidate classes. Verbs become methods on the class that owns the data. Resist turning every string into a class — start with the core domain objects.
3. **Define relationships (~10 min).** Inheritance (is-a), composition (has-a), association — name each link and say who creates whom and who outlives whom.
4. **Apply SOLID and patterns (~10 min).** Use one or two patterns where they genuinely reduce change cost (Strategy for payment types, Factory for ticket creation). Forced patterns score negatively.
5. **Walk through (~5 min).** Run one use case end to end — happy path plus one edge case — calling methods on your diagram in order.

\`\`\`ts
// LLD interview loop: Requirements -> Entities -> Relationships -> Patterns -> Walkthrough
type Vehicle = { plate: string };

class ParkingLot {
  private readonly floors: ParkingFloor[] = [];

  generateTicket(vehicle: Vehicle): Ticket {
    const spot = this.findSpot(vehicle);
    return new Ticket(spot, vehicle, Date.now());
  }

  checkout(ticket: Ticket): number {
    ticket.close();
    return ticket.computeFee(Date.now());
  }
}
\`\`\`

## Real-world example

**Netflix playback** separates concerns the same way a strong LLD sketch would: a \`PlaybackSession\` orchestrates, a \`CatalogService\` resolves titles, a \`CDNSelector\` picks an edge node, and a \`DRMClient\` handles license checks — each class has one reason to change.

- HLD decides regions, CDNs, and storage; LLD decides which objects talk to which and through what interfaces.
- Swapping CDN vendor means changing one implementation, not rewriting the session object (Open/Closed at class level).
- Tests mock \`DRMClient\` while integration tests use the real stack — constructor injection makes that possible.
- A 45-minute interview version would name 5–8 classes and walk "user presses play" once; production has hundreds of classes, same design habits.

## Common mistakes

- **Starting to code directly.** Without entities thought through, the design breaks midway and you rewrite under time pressure.
- **Skipping the walkthrough.** Boxes without a run-through prove nothing — interviewers want to see messages flow.
- **HLD in an LLD round.** Talking only about Kafka and Redis when asked for class design misses the question.

**Mistake:** "Start writing code immediately."
**Correct:** "Nouns to classes first, then relationships, then patterns, then walkthrough — run this loop on every problem."

## Keep in mind

- HLD is about machines, LLD is about classes — say this line first when the round is ambiguous.
- Loop to remember: requirements, entities, relationships, patterns, walkthrough.
- Nouns become classes, verbs become methods on the owner of the data.
- Prefer composition over inheritance unless there is a true is-a relationship.
- A simple working design beats a fancy broken one — get the happy path running first.
- Split time roughly: requirements 10, entities 10, relationships 10, patterns 10, walkthrough 5.`,
  },
  {
    slug: "classes-objects",
    title: "Classes and Objects",
    tag: "Concept",
    body: `A **class** is a blueprint: it defines the shape (fields) and behavior (methods) that every instance of that type will have. An **object** is a concrete instance built from that blueprint, living in memory with its own state. The class \`Ticket\` might define \`spotId\`, \`entryTime\`, and \`close()\`; object \`t1\` and \`t2\` each hold different values for those fields.

In TypeScript, classes give you explicit types for fields and methods, \`private\`/\`readonly\` for encapsulation, and compile-time checks when callers pass the wrong shape. At runtime, JavaScript still uses prototypes under the hood, but for LLD you think in terms of typed blueprints and instances — the same mental model as Java or C#. Every LLD problem starts here: if you cannot turn nouns into cohesive classes with behavior attached to data, patterns only rearrange the mess.

**Cohesion** is the goal: data that changes together and operations that interpret that data should live in one class. **Coupling** is what you limit: other classes should call small, stable methods, not reach into fields.

## How it works

1. **Find nouns:** User, Ticket, ParkingSpot — each becomes a class when it has identity and lifecycle.
2. **Give state:** fields the object must remember (\`id\`, \`status\`, \`balance\`) with types that match the domain.
3. **Give behavior:** methods that operate on that state (\`book()\`, \`cancel()\`, \`calculateFee()\`) — not free functions scattered elsewhere.
4. **Hide internals:** mark fields \`private\`; outside code talks through methods so invariants (non-negative balance, valid status transitions) stay enforceable.

\`\`\`ts
// Blueprint once, objects many times — independent state per instance
class Ticket {
  private readonly spotId: string;
  private readonly entryTime: number;
  private status: "Active" | "Closed" = "Active";

  constructor(spotId: string, entryTime: number = Date.now()) {
    this.spotId = spotId;
    this.entryTime = entryTime;
  }

  close(): void {
    this.status = "Closed";
  }

  isActive(): boolean {
    return this.status === "Active";
  }
}

const t1 = new Ticket("A1");
const t2 = new Ticket("B2"); // same class, different state
\`\`\`

## Real-world example

**Stripe's** domain model treats a \`PaymentIntent\` as an object with state (\`requires_payment_method\`, \`succeeded\`) and methods (\`confirm()\`, \`cancel()\`) rather than a loose JSON bag mutated from everywhere.

- Each intent instance tracks its own amount and customer; millions of intents share one class definition.
- Public API surface is methods; internal fields are not part of the contract — encapsulation matches API stability.
- Invalid transitions (capture after cancel) are rejected inside the object or its small collaborator, not in random controllers.
- TypeScript types at the boundary (\`CreatePaymentIntentParams\`) document what callers may supply when constructing or updating.

## When to use

- Every LLD problem starts here — identify entities and their lifecycles before patterns.
- When data and the operations on it belong together and share invariants.
- When you need multiple instances with the same behavior but different state (users, seats, orders).

## Common mistakes

- **Data-only classes:** a class with only public fields and no methods is a struct — push behavior inside so rules stay in one place.
- **God class:** one class doing booking, payment, notification, and reporting — split by responsibility (SRP).
- **Exposing fields:** \`public balance\` lets any caller break invariants; use methods like \`debit(amount)\` with checks.
- **Anemic domain:** all logic in a \`Service\` layer and entities are dumb bags — fine for CRUD apps, weak in LLD interviews unless you justify it.

**Mistake:** "Make everything public for ease."
**Correct:** "State private, behavior through methods — each class owns its data and rules."

## Keep in mind

- Class is the blueprint, object is the built thing with its own field values.
- Fields remember state, methods define behavior and enforce rules.
- One class, one responsibility — split god classes early.
- Use \`private\` / \`readonly\` in TypeScript examples; expose behavior, not raw mutable data.`,
  },
  {
    slug: "oop-pillars",
    title: "OOP Pillars (Encapsulation, Inheritance, Polymorphism, Abstraction)",
    tag: "Concept",
    body: `The four pillars of OOP show up in every LLD interview. **Encapsulation** bundles data with the methods that use it and hides internals so callers cannot bypass your rules. **Inheritance** models a true is-a relationship: a \`ElectricCar\` is a \`Car\` and may override or extend behavior. **Polymorphism** means one interface, many implementations — code that calls \`processor.pay(amount)\` does not care whether the instance is UPI or card, as long as the contract holds. **Abstraction** exposes what an object does and hides how — base types, interfaces, and abstract classes define the "what."

In TypeScript you express contracts with \`interface\` and \`abstract class\`; both support polymorphism. TypeScript does **not** support method overloading the way Java does in a single runtime dispatch sense — overload signatures are a compile-time aid, and duplicate method names in a class body still collapse to one implementation. Prefer **composition over inheritance** for reuse: has-a plus delegation ages better than deep trees.

Interviewers listen for **examples tied to design**: encapsulation is not "private fields" alone — it is "only \`Wallet\` can change balance." Polymorphism is not jargon — it is "payment strategies plugged into checkout."

## How it works

1. **Encapsulate:** keep fields \`private\`; expose narrow methods; use \`readonly\` where state should not change after construction.
2. **Inherit:** \`extends\` only for stable is-a relationships; keep hierarchies shallow.
3. **Override:** subclass provides its own \`speak()\` or \`calculateFee()\` — same method name, subtype behavior.
4. **Abstract:** \`interface\` or \`abstract class\` defines the shape; concrete classes fill details.

\`\`\`ts
// All four pillars in one small example
abstract class Animal {
  abstract speak(): string; // abstraction: contract without full implementation
}

class Dog extends Animal {
  private readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  speak(): string {
    return \`\${this.name} barks\`; // polymorphism: override fills the contract
  }
}

function announce(pet: Animal): string {
  return pet.speak(); // caller depends on abstraction, not Dog
}
\`\`\`

## Real-world example

**Uber's** trip pricing uses polymorphism: surge, flat rate, and subscription discounts are different \`FareCalculator\` implementations selected at runtime, while \`Trip\` only calls \`calculate(context)\`.

- Encapsulation: \`Trip\` status changes go through methods that validate transitions, not public field writes.
- Inheritance is used sparingly (e.g. shared \`RideRequest\` base); most reuse is composition (\`Trip\` has a \`Driver\`, \`Route\`, \`FarePolicy\`).
- Abstraction: dispatch code depends on \`LocationProvider\` interface, not a concrete maps vendor — swap for tests or regions.
- TypeScript interfaces document those roles for engineers and the compiler.

## When to use

- Start of every design — relationships and extension points are built from these four ideas.
- Deciding inheritance vs composition when two classes share behavior.
- When the interviewer asks "explain OOP pillars" — tie each pillar to a line in your parking-lot or payment design.

## Common mistakes

- **Inheriting for reuse:** \`extends\` just to copy helper methods — use composition or a shared utility module instead.
- **Public everything:** no encapsulation means no invariants — "negative ticket fee" becomes possible.
- **Deep inheritance trees:** fragile overrides; prefer small interfaces and delegation.
- **Confusing polymorphism with overloads:** in TS, prefer one method with union parameters or separate strategy classes.

**Mistake:** "Recite definitions without examples."
**Correct:** "Each pillar with a one-line example from your design — plus composition-over-inheritance."

## Keep in mind

- Encapsulation: data closed, intentional surface open — \`private\` fields, typed public methods.
- Inheritance only for is-a — reuse wants composition or shared modules.
- Polymorphism: depend on \`interface\` / base type; callers stay unchanged when you add implementations.
- Abstraction: show what, hide how — unfinished steps live in abstract bases or interfaces.
- TypeScript has interfaces and abstract classes — use them in LLD sketches instead of duck typing alone.`,
  },
  {
    slug: "oop-relationships",
    title: "Association, Aggregation, Composition",
    tag: "Concept",
    body: `Objects rarely exist alone; LLD is largely about naming **how instances relate**. **Association** is the weakest link: one object uses another temporarily, often via a method parameter, with no long-lived ownership (a \`Mechanic\` fixes a \`Car\` during a service call). **Aggregation** is has-a where the part can outlive the whole — a \`Team\` has \`Player\`s, but a player can transfer teams or exist on a free-agent list. **Composition** is strong ownership: the whole creates the part and destroys it with itself — a \`House\` owns \`Room\`s; delete the house and rooms are not meaningful alone.

**Inheritance** is separate: it connects **classes** (is-a), not just object lifetime. Mixing these up leads to bugs like shared \`Engine\` instances destroyed with the wrong \`Car\`, or impossible "move room to another house" because you modeled a room as composition when it should be aggregation.

In interviews, draw UML consistently: plain line for association, hollow diamond for aggregation, filled diamond for composition. The one question that settles most debates: **if the whole disappears, should the part still exist as a valid object?**

## How it works

1. **Association:** pass dependency into a method; no field, or a short-lived reference — "uses."
2. **Aggregation:** store a reference created elsewhere; whole does not own exclusive lifetime — "has, shared."
3. **Composition:** create the part inside the whole (constructor or factory); whole is responsible for lifecycle — "owns."
4. **Inheritance:** \`extends\` for subtype polymorphism — not a substitute for has-a.

\`\`\`ts
class Engine {
  start(): void {
    /* ... */
  }
}

class Driver {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Mechanic {
  fix(car: Car): void {
    car.engine.start();
  }
}

class Car {
  readonly engine: Engine; // composition: created with Car
  private driver?: Driver; // aggregation: driver exists independently

  constructor() {
    this.engine = new Engine();
  }

  assignDriver(driver: Driver): void {
    this.driver = driver;
  }
}

class EV extends Car {} // inheritance: is-a Car
\`\`\`

## Real-world example

**BookMyShow-style booking:** a \`Show\` aggregates \`Seat\` references from a venue layout (seats exist without that show), a \`Booking\` composes \`TicketLineItem\`s (cancel booking and line items go away), and a \`PaymentGateway\` is associated only during \`checkout()\`.

- Wrong composition on seats → double-booking or deleting seats when a show ends.
- Aggregation fits "seat in venue" vs "seat held for this show instance."
- Association fits payment provider invoked for one transaction without owning the gateway object forever.
- Saying lifetimes out loud scores points: "Booking owns tickets; Seat outlives Booking."

## When to use

- Every class diagram — each connection should be labeled association, aggregation, composition, or inheritance.
- Deciding who calls \`new\` and who is allowed to destroy or reassign references.
- Avoiding shared mutable state when two aggregates reference the same mutable object unintentionally.

## Common mistakes

- **Everything composition:** shared catalog objects get destroyed with the wrong parent.
- **No lifetime thinking:** drawing lines without "who creates whom."
- **Confusing with inheritance:** "Manager has Employee" is not "Manager extends Employee."
- **Bidirectional spaghetti:** every class knowing every class — prefer one-way dependencies.

**Mistake:** "Draw lines without names."
**Correct:** "Name every connection — association, aggregation, or composition — and say who outlives whom."

## Keep in mind

- Association: temporary use, no ownership.
- Aggregation: has-a, parts can outlive the whole.
- Composition: ownership, lifetimes tied together.
- UML: line, hollow diamond, filled diamond; inheritance is hollow triangle on parent.
- Ask: can the part outlive the whole? Yes → aggregation (or association); no → composition.`,
  },
  {
    slug: "interfaces-abstract-classes",
    title: "Interfaces vs Abstract Classes",
    tag: "Concept",
    body: `Both **interfaces** and **abstract classes** define a contract, but they differ in how much shared implementation you commit to. An **interface** in TypeScript lists method (and property) shapes — any class or object that satisfies the shape is assignable, with **zero** inherited code. An **abstract class** can provide concrete helper methods plus **abstract** members subclasses must implement — useful when several subtypes share the same boilerplate sequence.

Rule of thumb for interviews: **unrelated types** that must be interchangeable (pay by UPI, card, wallet) → \`interface PaymentMethod\`. **Related subtypes** that share a workflow with one varying step (fetch → format → publish report) → \`abstract class Report\` with \`abstract fetch()\`. When both fit, **prefer the interface** for maximum decoupling and trivial test doubles — abstract classes anchor you to a single inheritance chain.

TypeScript allows **implements** multiple interfaces but **extends** only one class — another reason interfaces win for cross-cutting roles (\`Serializable\`, \`Auditable\`). Abstract classes fit template-method patterns where duplication would otherwise violate DRY inside a family of classes.

## How it works

1. **Interface:** declare method signatures; classes \`implements\`; structs can satisfy via explicit typing.
2. **Abstract class:** mix implemented methods + \`abstract\` hooks; subclasses \`extend\` and fill hooks.
3. **Program to the contract:** variables typed as \`PaymentMethod\`, not \`StripeCardPayment\`.
4. **Default implementations:** abstract base can hold shared validation; interface + standalone functions is an alternative in TS.

\`\`\`ts
interface PaymentMethod {
  pay(amountCents: number): Promise<void>;
}

class UpiPayment implements PaymentMethod {
  async pay(amountCents: number): Promise<void> {
    /* UPI rails */
  }
}

class CardPayment implements PaymentMethod {
  async pay(amountCents: number): Promise<void> {
    /* card rails */
  }
}

abstract class Report {
  generate(): string {
    const data = this.fetch();
    return this.format(data);
  }

  protected abstract fetch(): Record<string, unknown>;
  protected format(data: Record<string, unknown>): string {
    return JSON.stringify(data);
  }
}
\`\`\`

## Real-world example

**Express / Node middleware** is interface-shaped: anything with \`(req, res, next)\` works, whether it logs, authenticates, or rate-limits — no shared base class required.

- Framework code depends on the function signature (contract), not your class hierarchy.
- **Java-style** abstract \`HttpFilter\` with shared \`before()\` / \`after()\` would be an abstract-class template; Express chose duck typing / function types.
- In TypeScript APIs, \`interface Logger\` with \`info(msg: string)\` lets you swap Winston vs console in tests.
- Pick abstract class when three report types share identical \`generate()\` steps and only \`fetch()\` differs.

## When to use

- Plugin-style swapping (payments, notifications, storage backends) — interface.
- Shared multi-step algorithm with one or two variant steps — abstract class (template method).
- Testing with mocks — depend on interface, inject fake implementation.
- Public SDK boundary — interface documents promises without locking consumers into your inheritance tree.

## Common mistakes

- **Abstract class for unrelated classes:** forces one tree where interfaces suffice.
- **Interface with one implementer and no test need:** YAGNI — concrete class until a second variant appears.
- **Fat interfaces:** one type with twenty methods violates ISP — split roles.
- **Leaking abstract base everywhere:** callers should still see the interface, not the abstract class, when possible.

**Mistake:** "Use abstract classes for unrelated classes."
**Correct:** "Unrelated interchangeable behavior → interface; related shared skeleton → abstract base."

## Keep in mind

- Interface: shape only, multiple implements, best for decoupling and mocks.
- Abstract class: shared code + hooks, single extends, best for template workflows.
- TypeScript supports both — use \`interface\` in whiteboard LLD for swap points.
- Prefer interfaces when you do not need inherited implementation.
- One implementer and no swap pressure → concrete class until requirements grow.`,
  },
  {
    slug: "dependency-injection",
    title: "Dependency Injection (DI)",
    tag: "Concept",
    body: `**Dependency Injection** means a class does not create its collaborators — it receives them from the outside, usually via the constructor. If \`OrderService\` needs a \`PaymentGateway\`, the gateway is passed in: \`new OrderService(gateway, notifier)\`. The class **asks** for dependencies instead of **making** them with \`new\` internally.

The payoff is structural: production wiring uses real implementations; unit tests pass fakes or mocks; and you satisfy **Dependency Inversion** — high-level \`OrderService\` depends on \`PaymentGateway\` interface, not Stripe's concrete client. Without DI, every test hits the network or requires fragile monkey-patching.

Three common forms: **constructor injection** (required deps, immutable, preferred), **setter / property injection** (optional or reconfigurable deps), and **DI containers** (InversifyJS, NestJS, Angular) that build object graphs in large apps. Avoid the **service locator** anti-pattern — hidden global lookups (\`Container.get('Payment')\`) obscure dependencies and make tests painful. In TypeScript LLD sketches, constructor injection covers most cases; mention a container only when the system has dozens of wired services.

## How it works

1. **Identify collaborators:** anything external (DB, API, clock, random) is a dependency.
2. **Type to interfaces:** constructor params use \`PaymentGateway\`, not concrete vendor class.
3. **Compose at the edge:** \`main\` or factory builds the graph; domain classes stay pure.
4. **Test with doubles:** same constructor, pass \`FakePaymentGateway\` that records calls.

\`\`\`ts
interface PaymentGateway {
  charge(amountCents: number, customerId: string): Promise<void>;
}

interface Notifier {
  send(userId: string, message: string): Promise<void>;
}

interface Cart {
  totalCents(): number;
  userId(): string;
}

class OrderService {
  constructor(
    private readonly payment: PaymentGateway,
    private readonly notifier: Notifier,
  ) {}

  async checkout(cart: Cart): Promise<void> {
    await this.payment.charge(cart.totalCents(), cart.userId());
    await this.notifier.send(cart.userId(), "Order confirmed");
  }
}

// Test: new OrderService(fakePay, fakeNotify) — no change to OrderService source
\`\`\`

## Real-world example

**NestJS / Angular** applications treat DI as a first-class feature: services declare constructor deps, the framework resolves them per module, and tests override providers with mocks.

- \`UserController\` receives \`UserService\` — controller never calls \`new UserService()\`.
- Swapping email provider vs SMS provider is a module config change, not a rewrite of business logic.
- Request-scoped vs singleton lifetime is container concern; LLD interview mentions "who creates the graph."
- Even without a framework, manual composition root (\`createApp()\`) is DI — frameworks automate wiring, not the idea.

## When to use

- Any collaborator that is slow, non-deterministic, or external (network, disk, clock).
- When you need mocks in tests without changing production code paths.
- When implementations swap by environment (sandbox vs live payment gateway).
- Large systems where a composition root or container avoids copy-paste \`new\` chains.

## Common mistakes

- **New inside:** \`this.payment = new StripeGateway()\` locks the class to one vendor and blocks tests.
- **Service locator:** global registry hides real dependencies — constructor signature lies about what is needed.
- **Injecting everything:** value objects (\`Money\`, \`EmailAddress\`) are usually constructed locally, not injected.
- **God factory:** one 500-line wiring function — split modules or use a container.

**Mistake:** "DI means using a framework."
**Correct:** "DI is constructor (or setter) injection of abstractions — frameworks only automate the graph."

## Keep in mind

- Ask, don't make — constructor injection is the cleanest default in TypeScript.
- Tests inject mocks; production injects real implementations at the composition root.
- Depend on interfaces, not concrete classes (DIP).
- Service locator is not DI — it hides dependencies.
- Don't inject trivial immutable value objects — create those inside methods.`,
  },
  {
    slug: "solid-principles",
    title: "SOLID Principles with Easy Examples",
    tag: "Concept",
    body: `**SOLID** is five guidelines that keep object-oriented systems changeable under real product pressure. They are not badges to recite — interviewers want one **violation** and one **fix** per letter, tied to your diagram.

**S — Single Responsibility:** a class should have one reason to change. If \`PaymentService\` also sends receipt emails, a copy change to email templates forces redeploying payment logic — split \`ReceiptNotifier\`.

**O — Open/Closed:** extend behavior with new types, not by editing stable classes. Adding \`CryptoPayment\` as a new \`PaymentMethod\` beats adding another \`if\` in \`checkout()\`.

**L — Liskov Substitution:** subtypes must honor the parent's contract. If \`Square extends Rectangle\` but breaks \`setWidth\` semantics, callers of \`Rectangle\` fail — the hierarchy is wrong.

**I — Interface Segregation:** many small interfaces beat one fat one. Do not force \`Robot\` to implement \`eat()\` because humans do — split \`Worker\` and \`HumanWorker\`.

**D — Dependency Inversion:** depend on abstractions. \`NotificationService\` takes \`MessageSender\`, not \`TwilioClient\`.

In TypeScript, abstractions are \`interface\` types; SOLID applies the same as in Java or C#.

## The five principles

1. **SRP:** one reason to change — extract email from \`Payment\`.
2. **OCP:** new behavior via new classes — Strategy / plugin implementations.
3. **LSP:** subclass safe wherever parent expected — watch setter/getter symmetry traps.
4. **ISP:** split fat interfaces — role-specific types.
5. **DIP:** inject interfaces at constructors — see Dependency Injection topic.

\`\`\`ts
interface MessageSender {
  send(to: string, body: string): Promise<void>;
}

class SmsSender implements MessageSender {
  async send(to: string, body: string): Promise<void> {
    /* SMS provider */
  }
}

class NotificationService {
  constructor(private readonly sender: MessageSender) {}

  async notify(to: string, body: string): Promise<void> {
    await this.sender.send(to, body);
  }
}
\`\`\`

## Real-world example

**Stripe** evolving payment methods without rewriting core checkout illustrates OCP + DIP: new rails ship as new strategy implementations behind a stable \`PaymentIntent\` API.

- SRP: webhooks, billing, and fraud are separate services — change fraud rules without touching invoice PDFs.
- OCP: add \`Link\` or \`BNPL\` as new processors instead of branching a 2,000-line god method.
- LSP: any \`PaymentMethod\` that throws on \`confirm()\` when the API promised success violates substitutability — document preconditions.
- ISP: merchant-facing API surfaces are split (Customers, Charges, Connect) rather than one mega-client.
- DIP: SDK consumers mock \`StripeClient\` interface in tests; internals depend on HTTP abstractions.

## Common mistakes

- **God class:** violates SRP — split by actor or change rate.
- **Editing stable code for each variant:** violates OCP — use polymorphism.
- **Inheritance for code reuse only:** often violates LSP — favor composition.
- **One interface, ten empty methods:** violates ISP — split or use optional roles.
- **Concrete imports in domain:** violates DIP — inject interfaces.

**Mistake:** "Apply all five everywhere."
**Correct:** "One violation and one fix per principle on your own design — depth beats listing."

## Keep in mind

- SRP: one reason to change per class.
- OCP: extend with new types; keep core closed to risky edits.
- LSP: if it extends, it must not surprise callers of the base type.
- ISP: small, role-focused interfaces.
- DIP: high-level modules depend on abstractions; details implement them.
- Name one violation and one fix per principle to convince the interviewer.`,
  },
  {
    slug: "design-principles",
    title: "Design Principles (DRY, KISS, YAGNI and More)",
    tag: "Concept",
    body: `Beyond SOLID, short **design principles** guide everyday trade-offs when SOLID alone does not pick a winner. They are intentionally memorable — use them to **justify** a choice, not to win arguments.

**DRY (Don't Repeat Yourself):** every piece of knowledge should have a single authoritative representation. Copy-pasted fee calculation in web and mobile means double bugs when tax rules change — extract shared domain logic once.

**KISS (Keep It Simple, Stupid):** the simplest design that meets requirements wins. Extra layers "just in case" slow reviews and onboarding.

**YAGNI (You Aren't Gonna Need It):** do not build speculative plugin frameworks before a second variant exists — but do not confuse YAGNI with ignoring obvious extension points stated in requirements.

**Separation of Concerns:** UI, business rules, and persistence change for different reasons — keep them in separate modules or classes.

**Law of Demeter:** a method should talk to friends, not strangers — avoid \`order.getCustomer().getAddress().getZip()\` chains that couple you to someone else's graph.

Also remember **composition over inheritance**, **program to an interface**, **loose coupling** (narrow contracts), and **high cohesion** (module internals belong together). Principles conflict sometimes: DRY vs YAGNI when duplication is two lines — prefer duplication until a third copy appears.

## The nine principles

1. **DRY:** one source of truth for each rule or calculation.
2. **KISS:** simplest working structure; justify every extra class.
3. **YAGNI:** build today's requirements; extensibility only where product commits.
4. **Separation of Concerns:** split UI, domain, infrastructure.
5. **Law of Demeter:** minimize deep navigation; add methods on the right object instead.
6. **Composition over Inheritance:** reuse by has-a.
7. **Program to an Interface:** depend on contracts.
8. **Loose Coupling:** modules know little about each other's internals.
9. **High Cohesion:** each module does one well-defined job.

\`\`\`ts
interface PaymentGateway {
  charge(amountCents: number): Promise<void>;
}

class Cart {
  totalCents(): number {
    return 0;
  }
}

class Order {
  async checkout(cart: Cart, gateway: PaymentGateway): Promise<void> {
    await gateway.charge(cart.totalCents()); // talk to immediate collaborator
    // avoid: gateway.client().connection().send(...) — Demeter violation
  }
}
\`\`\`

## Real-world example

**React** component guidelines echo these principles: presentational vs container separation (SoC), custom hooks to DRY stateful logic, and avoiding prop-drilling chains that mirror Demeter violations (use context or a facade method on a parent).

- KISS: a single \`useReducer\` before introducing Redux for three fields of state.
- YAGNI: don't abstract \`ButtonFactory\` until multiple button families exist.
- DRY: shared validation in one schema (Zod) consumed by API and form — one truth for rules.
- Loose coupling: components receive \`onSubmit\` callback, not global singletons.

## When to use

- Smell duplication that encodes business rules — extract once (DRY).
- Tempted by clever hierarchies — pick the flat design (KISS).
- Building "just in case" extensibility with zero second use case — stop (YAGNI).
- Long getter chains in LLD walkthrough — refactor with Demeter-friendly methods.

## Common mistakes

- **DRY obsession:** deduplicating three-line UI snippets creates opaque helpers — duplication is cheaper than wrong abstraction.
- **KISS as excuse:** simple ≠ skipping stated edge cases.
- **YAGNI vs extensibility:** don't build futures nobody asked for; do honor explicit "we will add payment types" in requirements (OCP).
- **SoC over-split:** ten one-line classes harm KISS — balance cohesion.

**Mistake:** "Quote principles without applying them."
**Correct:** "Point at your design — here duplication was removed, here a chain became one method."

## Keep in mind

- DRY: one truth for each business rule.
- KISS: simplest design that passes requirements and walkthrough.
- YAGNI: no speculative frameworks.
- Demeter: don't traverse object graphs — add behavior where the data lives.
- Composition, interfaces, narrow contracts, cohesive modules — say them when they explain your diagram.`,
  },
  {
    slug: "uml-diagrams",
    title: "UML Diagrams (Class, Sequence and More)",
    tag: "Concept",
    body: `**UML (Unified Modeling Language)** is the shared sketch notation for LLD interviews. You are not graded on perfect arrowheads — you are graded on whether the diagram **communicates structure, order, or lifecycle** clearly enough to implement.

Six diagram types appear in textbooks; interviews lean hard on **class** and sometimes **sequence** or **state**. A **class diagram** shows types (boxes), their fields/methods, and relationships (inheritance, association, aggregation, composition) with multiplicities (\`1\`, \`*\`, \`0..1\`). A **sequence diagram** shows **time**: lifelines top-to-bottom, horizontal messages in call order — ideal for payment callbacks, OTP verification, or race-prone booking. A **state diagram** shows one object's lifecycle: states as nodes, transitions labeled with events/guards (Order: Created → Paid → Shipped).

**Component diagrams** map deployable units (API service, worker, DB). **ER diagrams** map persistent records — useful when LLD blends with data modeling. **Communication / collaboration diagrams** emphasize object links over time; rare in timed rounds.

Strategy: **class diagram first** — it anchors entities. Add sequence for one non-obvious flow. Add state when the prompt screams lifecycle (ticket, seat, order). Drawing all six wastes minutes and suggests unclear thinking.

## Relationship notation

Before drawing boxes, lock the four relationship symbols interviewers expect. Wrong diamonds are the fastest way to lose credibility.

![UML relationship notation — association, aggregation, composition, inheritance](/images/lld/uml-relationships-legend.png)

- **Association** — solid line: objects know each other (\`Order\` uses \`Shipment\`).
- **Aggregation** — hollow diamond on the whole: part can outlive the whole (\`Department\` ◇— \`Employee\`).
- **Composition** — filled diamond on the whole: part dies with the whole (\`Order\` ◆— \`LineItem\`).
- **Inheritance** — hollow triangle on the parent: is-a (\`CreditCard\` —▷ \`PaymentMethod\`).

## Class diagram

Boxes hold class name, key fields, and key methods. Arrows carry meaning — label roles and multiplicities (\`1\`, \`1..*\`, \`0..1\`). Start every LLD whiteboard here.

![UML class diagram — Order, LineItem, Payment, Shipment](/images/lld/uml-class-order.png)

- \`Order\` **composes** \`LineItem\` (filled diamond) — line items do not exist without the order.
- \`Order\` **aggregates** \`Payment\` (hollow diamond) — payment records may outlive a canceled UI cart session.
- \`Order\` **associates** with \`Shipment\` — tracking can be assigned later (\`0..1\`).

## Sequence diagram

Lifelines are vertical; messages are horizontal in call order. Use one sequence for the non-obvious path (payment + inventory), not every CRUD endpoint.

![UML sequence diagram — place order across Cart, Inventory, Payment, Fulfillment](/images/lld/uml-sequence-place-order.png)

- Solid arrows = calls; dashed arrows = returns.
- Activation bars show when an object is "busy" handling a call.
- Perfect for races: reserve inventory **before** charge, or hold + release on payment failure.

## State diagram

One object, many statuses. Nodes are states; labeled arrows are events. Mark initial (filled circle) and final (bullseye) states.

![UML state diagram — Order lifecycle from Placed to Delivered](/images/lld/uml-state-order.png)

- Happy path: Placed → Paid → Shipped → OutForDelivery → Delivered.
- Edge cases live here: Cancelled from Placed, Returned from Delivered.
- If status rules are simple (\`open\`/\`closed\`), skip the diagram and say so.

## Component diagram

Only when the interviewer asks about deployment boundaries. Boxes are deployable units; dashed arrows are dependencies.

![UML component diagram — Order Service and dependencies](/images/lld/uml-component-order.png)

- Keep this thin — LLD is about classes; components answer "which service owns which box."
- Useful bridge sentence: "Order Service owns the class diagram above; Payment is a separate service behind an interface."

## How it works

1. **Class diagram:** box per entity; show key methods; arrow per relationship; label roles and multiplicities.
2. **Sequence diagram:** actor or controller lifeline calls services in order; show return messages when async matters.
3. **State diagram:** one focused object; label events (\`paySuccess\`, \`timeout\`); mark initial/final states.
4. **Pick minimally:** prove structure + one flow + lifecycle if needed — stop.

\`\`\`ts
// Mental map — which diagram answers which question (not runtime code)
type DiagramKind =
  | "class" // structure: types + relationships
  | "sequence" // time: message order
  | "state" // lifecycle: states + events
  | "component"; // deployment: boxes + dependencies

const pickDiagram = (question: "structure" | "order" | "lifecycle" | "deploy"): DiagramKind => {
  switch (question) {
    case "structure":
      return "class";
    case "order":
      return "sequence";
    case "lifecycle":
      return "state";
    case "deploy":
      return "component";
  }
};
\`\`\`

## Real-world example

**Amazon order tracking** is often explained to engineers with a state diagram (Placed → Shipped → OutForDelivery → Delivered) plus a sequence diagram for "place order" (Cart → Inventory → Payment → Fulfillment). The images above are that exact story in UML form.

- Class diagram: \`Order\`, \`LineItem\`, \`Payment\`, \`Shipment\` relationships for static LLD.
- Sequence: show idempotent payment retry and inventory hold — concurrency story.
- State: return/refund transitions branch from Delivered — interview edge case.
- Component: optional HLD blur — "Order Service" box depends on "Payment Service" — only if interviewer asks deployment.

## When to use

- Every LLD interview: start drawing a class diagram while clarifying requirements.
- Tricky time-ordered flows — sequence for one path.
- Entities with strict status rules — state diagram for that entity.
- Never substitute sequence for missing class structure.

## Common mistakes

- **Diagram everything:** six diagrams for a parking lot wastes time — class + one flow is enough.
- **Nameless arrows:** unlabeled lines do not prove you know composition vs aggregation.
- **Class diagram as ER only:** fields without behavior miss LLD — show key methods.
- **Sequence for static structure:** use class diagram for "what exists."

**Mistake:** "Skip drawing, jump to code."
**Correct:** "Class diagram first — interviewers read object thinking in boxes and arrows."

## Keep in mind

- Class diagrams carry most interview weight — entities, methods, relationships, multiplicities.
- Sequence diagrams for one complex call chain — payments, notifications, locks.
- State diagrams for one object with non-trivial status rules.
- Component diagrams when deployment boundaries matter.
- Draw the fewest diagrams that prove your design — clarity over completeness.`,
  },
];
