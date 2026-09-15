import type { LldTopic } from "./types";

export const STRUCTURAL: LldTopic[] = [
  {
    slug: "adapter-pattern",
    title: "Adapter Design Pattern (Structural)",
    tag: "Structural",
    body: `Adapter converts one interface into another the client expects, so incompatible classes work together without changing either side. Your code wants a USB-C charger, the legacy library offers only MicroUSB: the adapter wraps the old class and exposes the new face.

It appears constantly in real code: third-party SDKs, legacy payment gateways, library upgrades. Take the wrapping (composition) form — JavaScript has no multiple inheritance anyway, and wrappers stay flexible.

## How it works

1. **Offer the new face:** the adapter carries the methods the client wants.
2. **Hold the old inside:** wrap the legacy object with composition.
3. **Translate calls:** convert new-method calls into old-method calls — no business logic added.

\`\`\`js
// Old cover, new face
class PrinterAdapter {
  constructor() { this.legacy = new LegacyPrinter(); }
  print(doc) { this.legacy.printDocument(doc); } // old name, new cover
}
\`\`\`

## When to use

- Legacy code or third-party SDKs mismatch the expected interface.
- Neither side may be modified (libraries, legacy systems).
- Gateway integrations where protocol or version changed.

## Common mistakes

- **Adding business logic:** adapters translate only — decisions live elsewhere.
- **Adapting your own code:** if both sides are yours, refactor instead.
- **Two-way translation:** one direction suffices — both ways doubles complexity.

**Mistake:** "Adapter is like Bridge."
**Correct:** "Adapter fixes existing mismatch afterwards; Bridge is designed upfront for variation."

## Keep in mind

- Bridges incompatible interfaces without touching either side.
- Use for legacy code, third-party SDKs, gateway integrations.
- Composition adapter is natural in JavaScript.
- One-way translation only: it adds no business logic.
- If both sides are yours to change, refactoring beats adapting.`,
  },
  {
    slug: "decorator-pattern",
    title: "Decorator Design Pattern (Structural)",
    tag: "Structural",
    body: `Decorator adds behavior to an object at runtime — by wrapping it, without touching its class and without exploding subclasses. A plain Pizza gets wrapped by Cheese, then Olives — each wrapper adds its own cost and forwards the rest inward. Every decorator keeps the same method names as what it wraps, so clients notice no difference.

What it kills is subclass explosion: four toppings would need sixteen subclasses, while four decorators compose freely. In JavaScript this shape appears daily — higher-order functions and Express middleware wrap exactly this way.

## How it works

1. **Keep names:** decorator and wrapped object share method names.
2. **Hold inside:** the decorator keeps a reference to the wrapped object.
3. **Add and forward:** add your behavior, delegate the rest — wrap as deep as needed.

\`\`\`js
// Each wrapper keeps the same method names, delegates inward
class Cheese {
  constructor(pizza) { this.pizza = pizza; }
  cost() { return this.pizza.cost() + 30; }
}
// new Cheese(new Olives(new BasePizza()))
\`\`\`

## When to use

- Behavior must attach at runtime, unknown at compile time.
- Subclass counts are multiplying — combinations scream for decorators.
- Extending third-party classes without touching them.

## Common mistakes

- **Order blindness:** when wrapping order matters, document it — results flip otherwise.
- **Too deep:** ten layers get undebuggable — wrap only from need.
- **Renamed methods:** change a name and transparency dies with it.

**Mistake:** "Decorator is just inheritance."
**Correct:** "Inheritance is fixed at compile time; decorators attach at runtime — that is the core difference."

## Keep in mind

- Wrapping happens at runtime, inheritance is fixed at compile time.
- Subclass explosion dies: N toppings compose instead of multiplying.
- Every decorator holds the same method names as what it wraps.
- Higher-order functions and middleware are this pattern in JS.
- Wrapping order can matter — document it when behavior depends on it.`,
  },
  {
    slug: "facade-pattern",
    title: "Facade Design Pattern (Structural)",
    tag: "Structural",
    body: `Facade gives a complex subsystem one simple door. A home theater has projector, amplifier, lights, and player with a ten-step startup; a WatchMovie facade collapses it to one method. Clients forget subsystem details, and the subsystem keeps evolving behind the stable door.

It sits behind service layers and helper APIs every day. State the limit honestly: a facade smooths the common path but cannot cover every exotic combination — power users sometimes need the subsystem directly.

## How it works

1. **Pick common paths:** collapse what 90% of users do into one method.
2. **Own the sequence:** order, cleanup, and error handling live in the facade.
3. **Stay open:** keep the subsystem reachable for exotic cases.

\`\`\`js
// One simple method, ten-step system hidden
class HomeTheater {
  watchMovie() { this.lights.dim(); this.projector.on(); this.player.play(); }
  endMovie() { this.player.stop(); this.projector.off(); this.lights.bright(); }
}
\`\`\`

## When to use

- Ten-step subsystems need one-call entry points.
- Client coupling must shrink — subsystem changes ripple nowhere.
- Service layers, helper SDKs, startup and shutdown sequences.

## Common mistakes

- **Hiding everything:** exotic cases need the subsystem — leave it reachable.
- **Decisions inside:** facades run sequences, they don't make business calls.
- **Mediator confusion:** routing peer talk is Mediator's job, not Facade's.

**Mistake:** "Facade replaces the whole system."
**Correct:** "It simplifies, never replaces — exotic cases still use the subsystem directly."

## Keep in mind

- One simple entry point over a complex subsystem — the whole pattern.
- Client coupling drops: subsystem changes ripple nowhere.
- Examples: service layers, helper SDKs, startup/shutdown sequences.
- It simplifies, not replaces — exotic cases use the subsystem directly.
- Don't confuse with Mediator: Facade hides complexity, Mediator routes peer talk.`,
  },
  {
    slug: "proxy-pattern",
    title: "Proxy Design Pattern (Structural)",
    tag: "Structural",
    body: `Proxy is a lookalike of the real thing — same method names, but with control before entry. Three classic uses: lazy loading (build the heavy object on first need), access control (check permission before delegating), and remote or caching proxies (hide network calls or repeated work under the same cover).

It looks like Decorator, but intent differs: Decorator adds behavior, Proxy stands guard. Good news for JavaScript developers — the language has a native Proxy that traps get and set for lazy or validation logic.

## How it works

1. **Match names:** the proxy carries the real object's method names.
2. **Check first:** lazy-build on first call, or verify permission.
3. **Delegate after:** the real object does the work — the client never knows.

\`\`\`js
// Same names, access control before delegating
class ImageProxy {
  constructor(file) { this.file = file; this.real = null; }
  display() {
    if (!this.real) this.real = new RealImage(this.file); // lazy load
    this.real.display();
  }
}
\`\`\`

## When to use

- Heavy objects needed late (lazy/virtual) — images, ORM rows.
- Permission checks (protection) — sensitive operations.
- Hiding network or repeated work (remote/cache) — gateways, caches.

## Common mistakes

- **Racy laziness:** first access from two places builds twice — guard it.
- **Proxy everywhere:** direct calls suffice somewhere — extra layers cost.
- **Intent confusion:** adding behavior means Decorator; guarding means Proxy — decide first.

**Mistake:** "Proxy and Decorator are the same."
**Correct:** "Same shape, opposite intent: one adds, the other guards."

## Keep in mind

- Three uses: lazy (virtual), permission check (protection), hiding network/cache (remote).
- The client never knows — method names stay identical.
- Decorator adds behavior, Proxy stands guard — interviewers love this distinction.
- Examples: ORM lazy loading, API gateways, caching proxies.
- JavaScript has a native Proxy too — trap get/set for lazy or validation logic.`,
  },
  {
    slug: "composite-pattern-file-system",
    title: "Composite Design Pattern (Structural) | Design File System",
    tag: "Structural",
    body: `Composite makes single objects and groups behave alike. File and Directory both carry size(): File returns its own bytes, Directory sums its children. Clients call size() without caring which one they hold, and nesting runs arbitrarily deep.

This is the standard answer for Design File System, and the same shape fits org charts, UI trees, and menu structures. The price is a uniform interface that can feel forced: operations like addChild make no sense on a leaf, so either throw or ignore on files — and say which.

## How it works

1. **One name:** leaf and container share the same methods (like size()).
2. **Leaf answers directly:** File just returns its bytes.
3. **Container aggregates:** Directory runs the same method on children and combines — recursion does the work.

\`\`\`js
// Leaf and container — same method names
class FileNode {
  constructor(bytes) { this.bytes = bytes; }
  size() { return this.bytes; }
}
class Directory {
  constructor() { this.children = []; }
  size() { return this.children.reduce((t, n) => t + n.size(), 0); }
}
\`\`\`

## When to use

- Tree-shaped structures: file system, org charts, UI trees, nested menus.
- Clients shouldn't care single vs group.
- Deep nesting where recursion feels natural.

## Common mistakes

- **Leaf operations:** state the policy for addChild on files — throw or ignore, never silence.
- **Stale caches:** totals cached on containers go stale on change — invalidate.
- **Cycles:** a child holding its ancestor recurses forever — prevent by design.

**Mistake:** "Composite for every tree."
**Correct:** "Use it when clients must treat single and group alike — File plus Directory example."

## Keep in mind

- Uniform treatment of leaf and container — the entire point.
- File System is the canonical interview application: File plus Directory.
- Recursion does the work: container methods delegate to children.
- Leaf operations like addChild need a policy: throw or ignore, and say which.
- Also fits org charts, UI component trees, and nested menus.`,
  },
];
