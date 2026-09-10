import type { LldTopic } from "./types";

export const STRUCTURAL: LldTopic[] = [
  {
    slug: "decorator-pattern",
    title: "Decorator Design Pattern (Structural)",
    tag: "Structural",
    body: `Decorator adds behavior to an object at runtime by wrapping it, without touching its class and without exploding subclasses. A plain Pizza gets wrapped by Cheese, then by Olives, each wrapper adding its own cost and delegating the rest inward. Every decorator implements the same interface as what it wraps, so wrapping stays transparent to the client.

The alternative it kills is subclass explosion: four toppings would need sixteen subclasses, while four decorators compose freely. Java I/O is the canonical example: new BufferedReader(new FileReader(...)) is decorators all the way down.

\`\`\`java
// Each wrapper implements the same interface it wraps
interface Pizza { int cost(); }
class Cheese implements Pizza {
    private final Pizza inner;
    Cheese(Pizza inner) { this.inner = inner; }
    public int cost() { return inner.cost() + 30; }
}
// new Cheese(new Olives(new BasePizza()))
\`\`\`

## Keep in mind

- Wrapping happens at runtime, inheritance is fixed at compile time — that is the core difference.
- Kills subclass explosion: N toppings compose instead of multiplying classes.
- Every decorator holds a reference to the same interface type it implements.
- Canonical example: Java I/O streams (BufferedReader over FileReader).
- Order of wrapping can matter, so document it when behavior depends on order.`,
  },
  {
    slug: "proxy-pattern",
    title: "Proxy Design Pattern (Structural)",
    tag: "Structural",
    body: `Proxy is a stand-in object with the same interface as the real one, controlling access to it. The three classic uses are lazy loading (create the heavy object only on first use), access control (check permissions before delegating), and remote or caching proxies (hide network calls or repeated work behind the same interface).

It looks like Decorator structurally, but intent differs: Decorator adds behavior, Proxy controls access. Virtual proxies power ORMs that load database rows lazily, and protection proxies guard sensitive operations.

\`\`\`java
// Same interface, access controlled before delegating
interface Image { void display(); }
class ImageProxy implements Image {
    private RealImage real; private final String file;
    public void display() {
        if (real == null) real = new RealImage(file); // lazy load
        real.display();
    }
}
\`\`\`

## Keep in mind

- Three uses: lazy (virtual), permission check (protection), network or cache hiding (remote).
- Same interface as the real object, so the client never knows.
- Decorator adds behavior, Proxy controls access — interviewers love this distinction.
- Examples: ORM lazy loading, API gateways, caching proxies.
- Lazy proxies must be thread-safe if first access can come from two threads.`,
  },
  {
    slug: "composite-pattern-file-system",
    title: "Composite Design Pattern (Structural) | Design File System",
    tag: "Structural",
    body: `Composite lets clients treat single objects and groups uniformly. A File and a Directory both implement Node with a size() method: File returns its own size, Directory sums its children. The client calls size() without caring which one it holds, and nesting works to any depth.

This is the standard answer for Design File System, and the same shape fits org charts, UI trees, and menu structures. The price is a uniform interface that can feel forced: operations like addChild make no sense on a leaf, so they either no-op or throw on files.

\`\`\`java
// Leaf and container share one interface
interface Node { int size(); }
class File implements Node {
    private final int bytes;
    public int size() { return bytes; }
}
class Directory implements Node {
    private final List<Node> children = new ArrayList<>();
    public int size() {
        int total = 0;
        for (Node n : children) total += n.size();
        return total;
    }
}
\`\`\`

## Keep in mind

- Uniform treatment of leaf and container is the entire point.
- File System is the canonical interview application: File plus Directory.
- Recursion does the work: container methods delegate to children.
- Leaf operations like addChild need a policy: throw or ignore, and say which.
- Also fits org charts, UI component trees, and nested menus.`,
  },
  {
    slug: "adapter-pattern",
    title: "Adapter Design Pattern (Structural)",
    tag: "Structural",
    body: `Adapter converts one interface into another that the client expects, so incompatible classes can work together without changing either side. Your code expects a Charger with USB-C, the legacy library only offers MicroUSB: an adapter wraps the old class and exposes the new interface.

It appears constantly in real code: third-party SDKs, legacy payment gateways, and library upgrades. Prefer object adapters (wrapping via composition) over class adapters (multiple inheritance), since Java favors composition and wrappers stay flexible.

\`\`\`java
// Wrap the old interface, expose the expected one
interface NewPrinter { void print(String doc); }
class LegacyPrinter { void printDocument(String d) { /* old API */ } }
class PrinterAdapter implements NewPrinter {
    private final LegacyPrinter legacy = new LegacyPrinter();
    public void print(String doc) { legacy.printDocument(doc); }
}
\`\`\`

## Keep in mind

- It bridges incompatible interfaces without modifying either side.
- Use it for legacy code, third-party SDKs, and gateway integrations.
- Object adapter (composition) beats class adapter (inheritance) in Java.
- One-way translation only: it does not add business logic.
- If both sides are yours to change, refactoring beats adapting.`,
  },
  {
    slug: "facade-pattern",
    title: "Facade Design Pattern (Structural)",
    tag: "Structural",
    body: `Facade gives a complex subsystem one simple entry point. A home theater has projector, amplifier, lights, and player with a ten-step startup sequence; a WatchMovie facade collapses it to one method. Clients stop depending on subsystem details, and the subsystem stays free to evolve behind the stable front door.

It is the everyday pattern behind service layers and helper APIs. The limit to state honestly: a facade simplifies the common path but cannot cover every exotic combination, so power users may still need the subsystem directly.

\`\`\`java
// One simple method hides a ten-step subsystem
class HomeTheater {
    private final Projector p; private final Lights l; private final Player v;
    void watchMovie() { l.dim(); p.on(); p.setInput(v); v.play(); }
    void endMovie() { v.stop(); p.off(); l.bright(); }
}
\`\`\`

## Keep in mind

- One simple entry point over a complex subsystem is the whole pattern.
- Reduces client coupling: subsystem changes do not ripple outward.
- Examples: service layers, helper SDKs, startup/shutdown sequences.
- It simplifies, not replaces: exotic cases can still use the subsystem.
- Do not confuse with Mediator: Facade hides complexity, Mediator routes peer communication.`,
  },
  {
    slug: "bridge-pattern",
    title: "Bridge Design Pattern (Structural)",
    tag: "Structural",
    body: `Bridge separates an abstraction from its implementation so both can vary independently. A Shape abstraction (Circle, Square) delegates rendering to a Renderer implementation (Vector, Raster) through composition. Adding a new shape never touches renderers, and adding a renderer never touches shapes: M shapes times N renderers stays M plus N classes instead of M times N.

The classic confusion is with Adapter, and the difference is intent and timing: Adapter fixes an existing incompatibility after the fact, Bridge is designed upfront so two hierarchies evolve separately. Device and remote control examples (TV plus Remote with Basic and Advanced variants) show the same split.

\`\`\`java
// Abstraction holds the implementation behind an interface
interface Renderer { void drawCircle(double r); }
abstract class Shape { protected final Renderer renderer; /* ... */ }
class Circle extends Shape {
    void draw() { renderer.drawCircle(radius); } // no renderer knowledge
}
\`\`\`

## Keep in mind

- Two independent hierarchies connected by composition: M plus N, not M times N.
- Bridge is designed upfront for variation; Adapter fixes incompatibility after the fact.
- Examples: Shape/Renderer, Device/Remote, themeable UI layers.
- If only one side ever varies, a plain Strategy is simpler.
- Composition over inheritance is the mechanism, independent evolution is the goal.`,
  },
  {
    slug: "flyweight-word-processor",
    title: "Design Word Processor using Flyweight Design Pattern (Structural)",
    tag: "Structural",
    body: `Flyweight shares one object among thousands of users by splitting state: intrinsic state (shareable, like font family and size) lives in the shared flyweight, extrinsic state (context-specific, like position and color run) is passed in by the caller. A word processor with a million characters does not create a million character objects; it shares a few hundred glyph objects and stores positions separately.

A factory with a pool hands out the shared instances, keyed by the intrinsic state. The pattern only pays when objects are numerous, mostly identical, and the extrinsic state can live outside. Game engines use it for particles and tiles for exactly these reasons.

\`\`\`java
// Shared glyphs, positions passed in per use
class Glyph { // intrinsic: font, size — shared
    void draw(int x, int y, String color) { /* extrinsic passed in */ }
}
class GlyphFactory {
    private final Map<String, Glyph> pool = new HashMap<>();
    Glyph get(String font, int size) {
        return pool.computeIfAbsent(font + size, k -> new Glyph(font, size));
    }
}
\`\`\`

## Keep in mind

- Split state: intrinsic (shared, inside) vs extrinsic (passed in per call).
- Factory plus pool hands out shared instances keyed by intrinsic state.
- Pays off only with huge counts of near-identical objects: glyphs, particles, tiles.
- Shared objects should be immutable, or one user corrupts everyone.
- The classic trap question: where does position live? Outside, passed in.`,
  },
  {
    slug: "all-structural-patterns",
    title: "All Structural Design Patterns in 1 Video",
    tag: "Summary",
    body: `Structural patterns answer how classes and objects compose into bigger structures. Adapter converts an old interface into the expected one. Bridge splits abstraction from implementation so both vary. Composite treats single objects and groups uniformly. Decorator wraps objects to add behavior at runtime. Facade puts one simple door over a complex subsystem. Flyweight shares objects by splitting intrinsic and extrinsic state. Proxy stands in for the real object to control access.

A one-line map for revision: incompatible interface means Adapter, two varying hierarchies means Bridge, trees of part and whole means Composite, runtime behavior means Decorator, simplify the subsystem means Facade, millions of tiny objects means Flyweight, control access means Proxy.

\`\`\`java
// The structural decision in one glance
// incompatible -> Adapter | vary both sides -> Bridge | tree -> Composite
// add at runtime -> Decorator | simplify -> Facade | share -> Flyweight | guard -> Proxy
\`\`\`

## Keep in mind

- Adapter: convert interface. Bridge: split hierarchies. Composite: uniform trees.
- Decorator: wrap for behavior. Facade: simplify entry. Flyweight: share state. Proxy: guard access.
- Decorator vs Proxy is the favorite trap: add behavior vs control access.
- Adapter vs Bridge: fix after the fact vs design upfront for variation.
- Facade vs Mediator: hide complexity vs route peer talk.`,
  },
];
