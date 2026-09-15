import type { LldTopic } from "./types";

export const FUNDAMENTALS: LldTopic[] = [
  {
    slug: "what-is-lld",
    title: "What is LLD (Low Level Design)",
    tag: "Concept",
    body: `Low Level Design is the class-level blueprint of a system. High Level Design talks about servers, databases, and load balancers. LLD talks about classes, their relationships, and design patterns. A typical LLD interview asks you to design something like Parking Lot or BookMyShow on a whiteboard in 45 minutes.

Designing before coding is cheap. A wrong class structure becomes technical debt in production, where every new feature costs double. LLD interviews test your OOP grip: can you pull classes out of requirements, name their relationships correctly, and reason about trade-offs.

## How LLD interviews work

1. **Clarify requirements (~10 min).** Pin down scope — what gets built, what does not. Ask about entities, limits, and edge cases.
2. **List entities (~10 min).** Nouns in the statement become classes. Verbs become methods.
3. **Define relationships (~10 min).** Inheritance (is-a), composition (has-a), association — name each one with a reason.
4. **Apply SOLID and patterns (~10 min).** Use one or two patterns where they genuinely fit. Forced patterns score negatively.
5. **Walk through (~5 min).** Run one use case end to end — happy path plus one edge case.

\`\`\`js
// LLD interview loop: Requirements -> Entities -> Relationships -> Patterns -> Walkthrough
class ParkingLot {
  constructor() { this.floors = []; }
  generateTicket(vehicle) { /* use case starts here */ }
  checkout(ticket) { /* walk this end to end */ }
}
\`\`\`

## Common mistakes

- **Starting to code directly.** Without entities thought through, the design breaks midway.
- **Skipping the walkthrough.** Boxes without a run-through prove nothing.

**Mistake:** "Start writing code immediately."
**Correct:** "Nouns to classes first, then relationships, then patterns, then walkthrough — run this loop on every problem."

## Keep in mind

- HLD is about machines, LLD is about classes — say this line first.
- Loop to remember: requirements, entities, relationships, patterns, walkthrough.
- Nouns become classes, verbs become methods.
- Prefer composition over inheritance unless there is a true is-a relationship.
- A simple working design beats a fancy broken one — get the happy path running first.
- Split time: requirements 10, entities 10, relationships 10, patterns 10, walkthrough 5.`,
  },
  {
    slug: "classes-objects",
    title: "Classes and Objects",
    tag: "Concept",
    body: `A class is a blueprint. An object is a thing built from it. The class defines fields (data) and methods (behavior). Objects hold their own state — two User objects can have different names while sharing the same shape.

In JavaScript, classes are syntactic sugar over prototypes, but they read the same as Java or C++ classes: constructor sets up state, methods define behavior. Every LLD problem starts here — if you cannot turn nouns into clean classes, patterns cannot save you.

## How it works

1. **Find nouns:** User, Ticket, Spot — each becomes a class.
2. **Give state:** fields the object must remember (id, status, balance).
3. **Give behavior:** methods that operate on that state (book, cancel, calculate).
4. **Hide internals:** outside code talks through methods, never raw fields.

\`\`\`js
// Blueprint once, objects many times
class Ticket {
  constructor(spot) {
    this.spot = spot;
    this.entryTime = Date.now();
    this.status = 'Active';
  }
  close() { this.status = 'Closed'; } // behavior lives with data
}
const t1 = new Ticket('A1'); // object 1
const t2 = new Ticket('B2'); // object 2, independent state
\`\`\`

## When to use

- Every LLD problem starts here — entities first, always.
- When data and the operations on it belong together.

## Common mistakes

- **Data-only classes:** a class with only fields and no methods is just a struct — push behavior inside.
- **God class:** one class doing everything — split by responsibility.
- **Exposing fields:** letting outsiders mutate internals breaks every guarantee.

**Mistake:** "Make everything public for ease."
**Correct:** "State private, behavior through methods — each class owns its data."

## Keep in mind

- Class is the blueprint, object is the built thing.
- Fields remember state, methods define behavior.
- One class, one responsibility — split god classes early.
- Keep fields private; expose behavior, not data.`,
  },
  {
    slug: "oop-pillars",
    title: "OOP Pillars (Encapsulation, Inheritance, Polymorphism, Abstraction)",
    tag: "Concept",
    body: `The four pillars of OOP show up in every LLD interview. Encapsulation bundles data with the methods that use it and hides internals. Inheritance lets a new class reuse a parent (is-a relationship). Polymorphism means one name, many behaviors — the same method call does different things on different objects. Abstraction shows what to do and hides how.

Two JavaScript facts to state: there is no interface keyword — matching method names (duck typing) is the contract. And there is no overloading — a second same-name method overwrites the first, so use different names or optional parameters. Prefer composition over inheritance — say this line in every interview.

## How it works

1. **Encapsulate:** fields inside the class, access through methods — truly private with #.
2. **Inherit:** extend only for true is-a relationships.
3. **Override:** subclass gives its own version of a method — same name, own behavior.
4. **Abstract:** base class defines the shape, subclasses fill the details.

\`\`\`js
// All four pillars in one example
class Animal { // abstraction: shape lives here
  speak() { throw new Error('subclass speaks'); }
}
class Dog extends Animal { // inheritance: is-a relationship
  #name; // encapsulation: closed from outside
  constructor(name) { super(); this.#name = name; }
  speak() { return this.#name + ' barks'; } // polymorphism: same name, own work
}
\`\`\`

## When to use

- Start of every design — relationships are built from these four.
- Deciding inheritance vs composition.
- When the interviewer directly asks "explain OOP pillars" — theory round.

## Common mistakes

- **Inheriting for reuse:** use extends just to share code — take has-a instead.
- **Public everything:** no encapsulation means no guarantees.
- **Overloading in JS:** two same-name methods — the second silently kills the first.

**Mistake:** "Recite definitions without examples."
**Correct:** "Each pillar with a one-line example — plus the composition-over-inheritance line."

## Keep in mind

- Encapsulation: data closed, face open — # makes it truly private.
- Inheritance only for is-a — reuse wants composition.
- Polymorphism: one name, many behaviors — caller sees no difference.
- Abstraction: show what, hide how.
- JS has no interfaces (duck typing) and no overloading — state both differences.`,
  },
  {
    slug: "oop-relationships",
    title: "Association, Aggregation, Composition",
    tag: "Concept",
    body: `Objects relate in three strengths. Association is the weakest — one object uses another (Player plays Game). Aggregation is has-a where parts live independently — Team has Players, but a Player exists without the Team. Composition is ownership — House owns Rooms; destroy the House and Rooms go with it.

In interviews, draw these with UML arrows: plain line for association, hollow diamond for aggregation, filled diamond for composition. The classic trap is modeling everything as composition and then being unable to share parts. Ask one question: can the part outlive the whole? Yes means aggregation, no means composition.

## How it works

1. **Association:** temporary use — pass as parameter, no ownership stored.
2. **Aggregation:** store the reference, but lifetime stays independent.
3. **Composition:** create the part inside the whole — lifetimes tied together.

\`\`\`js
// Lifetime decides the relationship
class Engine { /* ... */ }
class Car {
  constructor() { this.engine = new Engine(); } // composition: dies with Car
  setDriver(d) { this.driver = d; } // aggregation: Driver lives independently
  service(mechanic) { mechanic.fix(this); } // association: temporary use
}
class EV extends Car {} // inheritance: is-a relationship
\`\`\`

## When to use

- Every class diagram — each connection needs one of these names.
- Deciding who creates and destroys shared objects.
- Avoiding shared mutable state bugs.

## Common mistakes

- **Everything composition:** shared parts get destroyed with the wrong owner.
- **No lifetime thinking:** drawing lines without asking who outlives whom.
- **Confusing with inheritance:** relationships connect objects; inheritance connects classes.

**Mistake:** "Draw lines without names."
**Correct:** "Name every connection — association, aggregation, or composition — and say who outlives whom."

## Keep in mind

- Association: temporary use, no ownership.
- Aggregation: has-a, parts live independently.
- Composition: ownership, lifetimes tied together.
- UML marks: line, hollow diamond, filled diamond.
- Ask one question: can the part outlive the whole?`,
  },
  {
    slug: "interfaces-abstract-classes",
    title: "Interfaces vs Abstract Classes",
    tag: "Concept",
    body: `Both define a contract, but they differ in commitment. An interface promises only method names — any class can sign up, with zero shared code. An abstract class provides shared code plus some unfinished methods that subclasses must complete. In JavaScript there is no interface keyword, so matching method names (duck typing) play that role.

Rule of thumb: unrelated classes sharing behavior need an interface (Fly and Swim across Bird and Fish). Related classes sharing code need an abstract class (a template with some steps filled). When both fit, prefer the interface — it keeps classes decoupled and testable with mocks.

## How it works

1. **Interface role:** list method names only — implementers fill everything.
2. **Abstract base:** fill shared steps, leave varying steps to subclasses.
3. **Duck typing in JS:** if it has the methods, it qualifies — no declaration needed.

\`\`\`js
// Interface role: same names, independent classes
class UPIPayment {
  pay(amount) { /* UPI rails */ }
}
class CardPayment {
  pay(amount) { /* card rails */ } // same method name = same contract
}
// Abstract base: shared skeleton, subclasses fill steps
class Report {
  generate() { const data = this.fetch(); return this.format(data); }
  fetch() { throw new Error('subclass fills this'); }
}
\`\`\`

## When to use

- Plugin-style swapping needed (payments, notifications, strategies) — interface role.
- Shared skeleton with varying steps — abstract base.
- Testing with mocks — depend on the role, inject fakes.

## Common mistakes

- **Abstract for everything:** unrelated classes forced into one family tree.
- **Interface with one implementer:** premature abstraction with zero payoff.
- **Forgetting JS has neither keyword:** declare contracts by naming, enforce by tests.

**Mistake:** "Use abstract classes for unrelated classes."
**Correct:** "Unrelated sharing behavior gets an interface role; related sharing code gets an abstract base."

## Keep in mind

- Interface: names only, anyone can sign up, zero shared code.
- Abstract class: shared code plus unfinished steps for subclasses.
- JS: duck typing replaces interfaces — same names are the contract.
- Prefer interfaces for decoupling; mocks become trivial.
- One implementer means no abstraction needed yet.`,
  },
  {
    slug: "dependency-injection",
    title: "Dependency Injection (DI)",
    tag: "Concept",
    body: `Dependency Injection means a class does not create what it needs — it receives it. If OrderService needs a PaymentGateway, pass it through the constructor instead of calling new inside. The payoff is double: tests inject mocks, production injects the real thing, and the Dependency Inversion principle applies itself.

Three forms exist: constructor injection (cleanest — for required things), setter injection (for optional things), and containers (Spring, InversifyJS) that wire big systems. Avoid service locators — global lookups are hidden coupling, the opposite of DI. In JavaScript, constructor injection covers 90% of cases.

## How it works

1. **Ask, don't make:** needs become constructor parameters.
2. **Supply outside:** pass real or mock at creation time.
3. **Depend on roles:** duck-typed behavior, not concrete classes.

\`\`\`js
// Ask, don't make — testing and swapping come free
class OrderService {
  constructor(paymentGateway, notifier) {
    this.payment = paymentGateway; // real or mock, comes from outside
    this.notify = notifier;
  }
  checkout(cart) {
    this.payment.charge(cart.total());
    this.notify.send(cart.user());
  }
}
// test: new OrderService(mockPay, mockNotify) — production code untouched
\`\`\`

## When to use

- Mocks needed in tests — without DI, fakes are painful to insert.
- Implementations may swap (test gateway vs real gateway).
- Big systems where hand wiring gets hard — take a container.

## Common mistakes

- **New inside:** every internal new closes the door on testing.
- **Service locator:** fetching from globals is hidden coupling, not DI.
- **Injecting values:** stable value objects (Money, DateRange) should be created, not injected.

**Mistake:** "DI means using a framework."
**Correct:** "DI is a principle starting at the constructor — frameworks only wire it up."

## Keep in mind

- Ask, don't make — constructor injection is the cleanest form.
- Testing comes free: inject mocks, production code untouched.
- Take roles (duck typing), not concrete classes.
- Service locator is not DI — it is hidden global state.
- Don't inject stable value objects — keep creating those.`,
  },
  {
    slug: "solid-principles",
    title: "SOLID Principles with Easy Examples",
    tag: "Concept",
    body: `SOLID is five principles that keep object-oriented code maintainable. Single Responsibility: one class, one reason to change — a Payment class should not send emails. Open/Closed: open for extension, closed for modification — new behavior arrives as new classes, not edits to tested code. Liskov Substitution: a subclass must work everywhere its parent works — break the parent contract and the hierarchy is wrong.

Interface Segregation: many small focused contracts beat one fat one — don't force a Robot to implement eat(). Dependency Inversion: depend on roles, not concrete classes — NotificationService wants a sender role, with SMS and Email as faces. In JavaScript, matching method names (duck typing) are the contract.

## The five principles

1. **SRP (Single Responsibility):** one reason to change per class — move email logic out of Payment.
2. **OCP (Open/Closed):** extend with new classes — Strategy is the classic example.
3. **LSP (Liskov Substitution):** subclass honors the parent contract — remember the Square/Rectangle violation.
4. **ISP (Interface Segregation):** small focused contracts — give Robot only work(), never eat().
5. **DIP (Dependency Inversion):** take roles, inject implementations — testing and swapping get easy.

\`\`\`js
// Dependency Inversion: depend on the role, not the class
class SmsSender {
  send(to, msg) { /* ... */ }
}
class NotificationService {
  constructor(sender) { this.sender = sender; } // injected, never new-ed
  notify(to, msg) { this.sender.send(to, msg); }
}
\`\`\`

## Common mistakes

- **God class:** everything in one class — split by responsibility.
- **Opening tested code:** editing stable code for each new type — extend instead.
- **Reuse inheritance:** extending just to share code breaks LSP — compose instead.
- **Fat contracts:** forcing unneeded methods on implementers — split them.

**Mistake:** "Apply all five everywhere."
**Correct:** "One violation and one fix per principle — depth shows, rote does not."

## Keep in mind

- SRP: one reason to change — email logic out of Payment.
- OCP: extend with new classes (Strategy is the classic example).
- LSP: subclass honors the parent contract — Square/Rectangle is the famous violation.
- ISP: many small contracts beat one fat one.
- DIP: take roles, inject implementations — testing and swapping get easy.
- Name one violation and one fix per principle and the interviewer is convinced.`,
  },
  {
    slug: "design-principles",
    title: "Design Principles (DRY, KISS, YAGNI and More)",
    tag: "Concept",
    body: `Beyond SOLID, a handful of short principles guide everyday design calls. DRY (Don't Repeat Yourself): every piece of knowledge lives in exactly one place — duplication means every fix must happen twice. KISS (Keep It Simple): the simplest design that works wins — complexity needs justification. YAGNI (You Aren't Gonna Need It): don't build for imagined futures — speculative frameworks rot.

Three more complete the set. Separation of Concerns: each module owns one concern — UI, rules, and storage never mix. Law of Demeter: talk only to immediate neighbors — 'a.getB().getC().do()' chains expose internals. Favor Composition over Inheritance, Program to an Interface, and Loose Coupling with High Cohesion: modules connect through narrow contracts and each module's parts belong together.

## The nine principles

1. **DRY:** one source of truth — duplicated logic means duplicated bugs.
2. **KISS:** simplest working design — complexity must earn its place.
3. **YAGNI:** no speculative features — build what today needs.
4. **Separation of Concerns:** UI, rules, storage in separate modules.
5. **Law of Demeter:** one dot if possible — chains like a.b.c.do() leak internals.
6. **Composition over Inheritance:** has-a beats is-a for reuse.
7. **Program to an Interface:** depend on roles, not classes.
8. **Loose Coupling:** narrow contracts between modules — changes stay local.
9. **High Cohesion:** each module's parts belong together — no grab-bags.

\`\`\`js
// Law of Demeter: talk to neighbors, not strangers
class Order {
  checkout(cart, gateway) {
    return gateway.charge(cart.total()); // one dot into gateway — good
    // avoid: gateway.client().connection().send() — chains expose internals
  }
}
\`\`\`

## When to use

- Smell duplication — extract once (DRY).
- Tempted by clever design — pick the simple one (KISS).
- Building "just in case" features — stop (YAGNI).
- Modules tangling together — split concerns, narrow contracts.

## Common mistakes

- **DRY obsession:** extracting three-line code used twice — abstraction costs too.
- **KISS as excuse:** simple doesn't mean sloppy — cover edge cases.
- **YAGNI vs extensibility:** don't build futures, but don't paint corners either.

**Mistake:** "Quote principles without applying them."
**Correct:** "Point at your own design — here is the duplication removed, here the chain shortened."

## Keep in mind

- DRY: one truth — duplicated logic means duplicated bugs.
- KISS: simplest working design wins.
- YAGNI: build for today, not imagined futures.
- Demeter: one dot — chains leak internals.
- Composition over inheritance, interfaces over classes, narrow contracts, tight modules.`,
  },
  {
    slug: "uml-diagrams",
    title: "UML Diagrams (Class, Sequence and More)",
    tag: "Concept",
    body: `UML is the drawing language of design interviews — six diagram types cover everything you will ever sketch. Class diagrams show structure: boxes with name, fields, and methods, joined by arrows for relationships. Sequence diagrams show time: lifelines with messages flowing in order. Entity-relationship sketches map data: which records link to which.

Three more complete the set. Object interaction (collaboration) diagrams show the same messages as sequence diagrams but arranged by structure instead of time. Component diagrams draw deployable boxes and their dependencies. State diagrams draw lifecycles: states as bubbles, events as labeled arrows between them.

In interviews, class diagrams carry 80% of the weight — draw those first and well. Add a sequence sketch only for tricky flows (payment callbacks, booking races). Never draw all six; pick what proves your design works.

## How it works

1. **Class first:** boxes for entities, arrows for relationships, multiplicity (1, *) on each link.
2. **Sequence for flows:** lifelines top to bottom, messages in call order — tricky flows only.
3. **State for lifecycles:** bubbles for states, labeled arrows for events that move between them.

\`\`\`js
// What each diagram answers — pick per need
// Structure? -> class diagram (boxes + arrows)
// Order of calls? -> sequence diagram (lifelines + messages)
// Lifecycle? -> state diagram (bubbles + events)
// Deploy units? -> component diagram (boxes + dependencies)
\`\`\`

## When to use

- Every LLD interview opens with a class diagram — non-negotiable.
- Tricky time-ordered flows (payments, races) earn a sequence sketch.
- Lifecycles (orders, bookings, seats) earn a state sketch.

## Common mistakes

- **Diagram everything:** six diagrams for a parking lot wastes the round — class first, rest on need.
- **No arrows:** boxes without relationship arrows prove nothing about structure.
- **Sequence for static structure:** wrong tool — structure questions want class diagrams.

**Mistake:** "Skip drawing, jump to code."
**Correct:** "Class diagram first — interviewers read thinking in diagrams, not in code."

## Keep in mind

- Class diagrams carry 80% of interview weight — draw them first and well.
- Sequence diagrams serve time-ordered flows only.
- State diagrams serve lifecycles: bubbles plus labeled event arrows.
- Components show deploy units and dependencies.
- Never draw all six — prove the design with the fewest that work.`,
  },
];
