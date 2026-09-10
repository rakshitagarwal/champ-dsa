import type { LldTopic } from "./types";

export const CREATIONAL: LldTopic[] = [
  {
    slug: "factory-vs-abstract-factory",
    title: "Factory Pattern Vs Abstract Factory Pattern (Creational)",
    tag: "Creational",
    body: `Factory Method solves a simple problem: object creation logic scattered with new everywhere. Instead of the client deciding which subclass to instantiate, a factory method takes a key and returns the right implementation behind an interface. Adding a new type means touching one factory, not ten call sites.

Abstract Factory goes one level higher: it creates families of related objects. A UI toolkit factory creates a matching Button, Checkbox, and Menu together (Windows family vs Mac family) so styles never mix. Rule of thumb: one product with variants means Factory Method, a family of products that must stay consistent means Abstract Factory.

\`\`\`java
// Factory Method: client asks, factory decides the subclass
interface Vehicle { void drive(); }
class VehicleFactory {
    static Vehicle create(String type) {
        if (type.equals("car")) return new Car();
        return new Bike();
    }
}
// Abstract Factory: whole family stays consistent
interface UIFactory { Button button(); Checkbox checkbox(); }
class WindowsFactory implements UIFactory { /* Windows Button + Windows Checkbox */ }
\`\`\`

## Keep in mind

- Factory Method creates one product behind an interface, chosen by a key.
- Abstract Factory creates a family of related products that must match each other.
- If interviewer asks the difference, say family vs single product with the UI toolkit example.
- Factories keep new out of business logic, which makes testing with mocks easy.
- Do not overuse: two stable types with no variation coming do not need a factory.`,
  },
  {
    slug: "builder-pattern",
    title: "Builder Design Pattern (Creational)",
    tag: "Creational",
    body: `Builder solves the telescoping constructor problem: a class with ten optional fields ends up with five confusing constructors. Instead, a nested Builder collects fields through chained calls and a single build() constructs the object in one place, where validation can also live.

The classic sign you need it is many optional parameters, especially in immutable objects. Effective Java popularized it, and APIs like StringBuilder, Lombok @Builder, and HTTP request builders all follow it. Parameter order bugs disappear because every field is named at the call site.

\`\`\`java
// Chained, readable, validated in one place
class User {
    private final String name, email, phone; // immutable
    private User(Builder b) { name = b.name; email = b.email; phone = b.phone; }
    static class Builder {
        private String name, email, phone;
        Builder name(String n) { name = n; return this; }
        Builder email(String e) { email = e; return this; }
        User build() {
            if (name == null) throw new IllegalStateException("name required");
            return new User(this);
        }
    }
}
// User u = new User.Builder().name("A").email("a@x.com").build();
\`\`\`

## Keep in mind

- Use it when a class has four or more parameters, mostly optional.
- Validation lives in build(), so invalid objects can never exist.
- It pairs naturally with immutable objects: all fields final.
- Named chained calls kill parameter-order bugs at the call site.
- Cost is boilerplate, which Lombok @Builder or records can remove.`,
  },
  {
    slug: "all-creational-patterns",
    title: "All Creational Design Patterns | Prototype, Singleton, Factory, AbstractFactory, Builder Pattern",
    tag: "Summary",
    body: `Creational patterns answer one question: how should objects come into existence? Singleton guarantees exactly one instance with global access, typically for config or connection pools. Prototype clones a costly-to-build template object instead of rebuilding it. Factory Method picks one subclass behind an interface. Abstract Factory keeps a whole family of products consistent. Builder assembles complex objects step by step.

A quick map for interviews: need exactly one, use Singleton. Copying an expensive object is cheaper than rebuilding, use Prototype. Creation logic depends on input, use Factory Method. Related products must match, use Abstract Factory. Many optional fields, use Builder. Each pattern hides a new behind an abstraction, which is what makes code testable.

\`\`\`java
// Prototype: clone the template instead of rebuilding
interface Shape extends Cloneable { Shape copy(); double area(); }
class Circle implements Shape {
    double r;
    public Shape copy() { Circle c = new Circle(); c.r = this.r; return c; }
}
\`\`\`

## Keep in mind

- Singleton: one instance, global access — config, pools, loggers.
- Prototype: clone expensive templates — document editors, game spawns.
- Factory Method: one product picked by key — parsers, vehicles.
- Abstract Factory: matching families — UI themes, DB dialects.
- Builder: many optional fields — requests, immutable DTOs.
- Interview trap: Singleton is the most overused pattern, justify it every time.`,
  },
  {
    slug: "double-checked-locking",
    title: "BUG in Double-Checked Locking of Singleton Pattern and its Fix",
    tag: "Creational",
    body: `Double-checked locking tries to make lazy Singleton thread-safe without synchronizing every call: check null, synchronize, check null again, then create. The famous bug is that without volatile, the second thread can see a partially constructed object. The JVM is allowed to reorder writes, so the reference can become visible before the constructor finishes.

The fix is declaring the instance volatile, which forbids that reordering and guarantees visibility across threads. Modern interviews also accept simpler answers: an enum Singleton, which the JVM guarantees, or static holder initialization, which is lazy and thread-safe with zero synchronization code.

\`\`\`java
// Fixed version: volatile is the entire fix
class Singleton {
    private static volatile Singleton instance;
    static Singleton get() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) instance = new Singleton();
            }
        }
        return instance;
    }
}
// Simplest correct answer: enum Singleton { INSTANCE; }
\`\`\`

## Keep in mind

- The bug is instruction reordering: reference visible before construction finishes.
- volatile is the fix: it blocks reordering and guarantees visibility.
- Know the two simpler alternatives: enum singleton and static holder class.
- This is asked to test Java memory model knowledge, not just patterns.
- Say the line expected: check, lock, check again, create.`,
  },
  {
    slug: "object-pool-pattern",
    title: "Object Pool Design Pattern (Creational)",
    tag: "Creational",
    body: `Object Pool reuses expensive objects instead of creating and destroying them. Database connections, threads, and large buffers cost real time to initialize, so a pool keeps a set of ready instances: borrow one, use it, return it. Creation cost is paid once, and the pool bounds how many can exist at once.

The pool needs three behaviors: checkout with waiting or timeout when empty, check-in that resets state so the next borrower gets a clean object, and validation so broken objects are discarded instead of recycled. Stale state leaking between borrowers is the classic bug, so reset-on-return matters more than people expect.

\`\`\`java
// Borrow, use, return — state must be reset on return
class ConnectionPool {
    private final BlockingQueue<Connection> free;
    Connection borrow() throws InterruptedException { return free.take(); }
    void giveBack(Connection c) { c.reset(); free.offer(c); }
}
\`\`\`

## Keep in mind

- Use it only when construction is genuinely expensive: connections, threads, buffers.
- Core API is borrow and return, with reset-on-return to avoid state leaks.
- Pool size bounds resource usage, which is itself a feature under load.
- Validate before reuse: never hand out a broken object twice.
- Modern note: for short-lived cheap objects the pool overhead is not worth it.`,
  },
];
