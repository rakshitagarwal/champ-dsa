import type { LldTopic } from "./types";

export const STRUCTURAL: LldTopic[] = [
  {
    slug: "adapter-pattern",
    title: "Adapter Design Pattern (Structural)",
    tag: "Structural",
    body: `**Intent:** Let classes work together that could not otherwise because of incompatible interfaces — without modifying the original types. **Structure:** The adapter implements the interface the *client* expects and holds (composition) an instance of the *adaptee*, translating each call. Object adapter (wrapper) is the default in TypeScript because the language has single inheritance.

**When it wins:** Integrating third-party SDKs, legacy HTTP/XML APIs, or version-skewed libraries where you cannot change source. Adapters are thin translation layers at system boundaries.

Adapter converts one interface into another the client expects. Your code wants USB-C; the legacy library offers Micro-USB: the adapter wraps the old class and exposes the new face.

It appears constantly in real code: payment gateways, analytics SDKs, and database drivers upgraded under you. Prefer composition wrappers — they stay testable and swappable.

## How it works

1. **Offer the target interface:** the adapter implements what new code expects (\`Printer\`, \`PaymentGateway\`).
2. **Hold the legacy inside:** wrap the adaptee with a private readonly field.
3. **Translate calls:** map method names, types, and error shapes — no business rules in the adapter.

\`\`\`ts
interface DocumentPrinter {
  print(doc: string): void;
}

class LegacyPrinter {
  printDocument(raw: string): void {
    console.log(raw);
  }
}

class PrinterAdapter implements DocumentPrinter {
  constructor(private readonly legacy: LegacyPrinter) {}

  print(doc: string): void {
    this.legacy.printDocument(doc);
  }
}
\`\`\`

## Real-world example

Stripe’s REST API and an older in-house billing module rarely share method names or error types. An adapter implements your internal \`BillingPort\` and delegates to Stripe’s SDK, mapping \`StripeCardError\` to your \`PaymentFailed\` type. Same pattern wraps AWS SDK v2-shaped helpers behind v3 clients during migration.

- **Payment gateways:** unify \`charge()\`, \`refund()\` across Stripe, Adyen, and legacy XML endpoints.
- **AWS SDK migration:** adapter exposes old \`.promise()\` style while calling v3 command clients underneath.
- **Analytics:** Segment-style \`track(event)\` adapter over disparate vendor SDKs (\`gtag\`, Mixpanel).
- **Date/time libraries:** wrap moment.js behind a \`Clock\` or \`DateFormatter\` interface while migrating to \`date-fns\`.

## When to use

- Legacy code or third-party SDKs mismatch the interface your domain expects.
- Neither side may be modified (vendor libs, locked legacy services).
- Gateway integrations where protocol, auth, or version changed upstream.

## Common mistakes

- **Adding business logic:** adapters translate only — pricing and validation live in domain services.
- **Adapting your own greenfield code:** if both sides are yours, refactor to a shared interface instead.
- **Two-way translation:** one direction suffices; bidirectional adapters double maintenance.
- **Leaking adaptee types:** public methods should not return vendor-specific classes through the port.

**Mistake:** "Adapter is like Bridge."
**Correct:** "Adapter fixes existing mismatch after the fact; Bridge designs abstraction and implementation upfront for variation."

## Keep in mind

- Bridges incompatible interfaces without editing either original.
- Use at boundaries: legacy, third-party SDKs, gateway integrations.
- Composition adapter is natural in TypeScript — \`implements\` target, \`private readonly\` adaptee.
- One-way translation only; zero business logic inside.
- If you own both sides, refactoring beats permanent adapter layers.`,
  },
  {
    slug: "decorator-pattern",
    title: "Decorator Design Pattern (Structural)",
    tag: "Structural",
    body: `**Intent:** Attach additional responsibilities to an object dynamically, keeping the same interface so clients stay unaware of wrapping. **Structure:** Decorator and component share an interface; each decorator holds a reference to the wrapped object, adds behavior before/after delegating inward. Stacking decorators builds behavior like layers.

**When it wins:** Combinations of features explode subclass counts (toppings, middleware, logging + metrics + retry). You must extend third-party classes you cannot subclass. Behavior is chosen at runtime (plugin stacks, HTTP pipelines).

Decorator adds behavior at runtime by wrapping — without modifying the original class and without subclass explosion. A plain \`Pizza\` gets wrapped by \`Cheese\`, then \`Olives\`; each wrapper adds cost and forwards inward. Every decorator implements the same interface as the core.

In TypeScript this shape appears daily: higher-order functions, Express/Fastify middleware, and React HOCs that wrap components while preserving props shape.

## How it works

1. **Shared interface:** \`Pizza\`, \`HttpHandler\`, or \`Repository\` — decorator and core both implement it.
2. **Hold inside:** \`private readonly inner\` reference to the wrapped object.
3. **Add and forward:** extend return values or side effects; delegate everything else — nest as deep as needed.

\`\`\`ts
interface Pizza {
  cost(): number;
  description(): string;
}

class BasePizza implements Pizza {
  cost(): number {
    return 200;
  }
  description(): string {
    return "Plain";
  }
}

class CheeseDecorator implements Pizza {
  constructor(private readonly pizza: Pizza) {}

  cost(): number {
    return this.pizza.cost() + 30;
  }

  description(): string {
    return \`\${this.pizza.description()}, cheese\`;
  }
}

// new CheeseDecorator(new BasePizza())
\`\`\`

## Real-world example

Express middleware is a decorator chain: each function wraps \`next\`, adds auth or logging, then passes control inward. React higher-order components wrap a base component with extra props or lifecycle behavior without editing the child. OpenTelemetry wraps fetch or gRPC clients to add spans while preserving the original API.

- **HTTP middleware:** compression, auth, rate-limit decorators on a core handler — order documented in app bootstrap.
- **React HOCs / wrapper components:** \`withAuth(Dashboard)\`, \`withTheme(Button)\` — same render contract, extra behavior.
- **Data access:** caching decorator around a repository interface; metrics decorator around the same interface.
- **I/O streams:** Node \`Transform\` streams decorate readable/writable endpoints with encoding or encryption.

## When to use

- Behavior must attach at runtime, not fixed at compile time.
- Subclass counts multiply with feature combinations — decorators compose instead.
- Extending third-party or sealed classes without forking them.

## Common mistakes

- **Order blindness:** when wrapping order matters (auth before handler), document it — results flip otherwise.
- **Too deep:** ten layers become undebuggable — prefer composition roots and named stacks.
- **Broken transparency:** changing method signatures on the decorator breaks Liskov — keep the interface identical.
- **Confusing with Proxy:** decorators *add* behavior; proxies *control access* — state intent clearly.

**Mistake:** "Decorator is just inheritance."
**Correct:** "Inheritance fixes behavior at compile time; decorators stack at runtime — that composability is the point."

## Keep in mind

- Runtime wrapping vs compile-time inheritance — core interview distinction.
- Subclass explosion dies: N toppings compose instead of 2^N subclasses.
- Every decorator implements the same interface as the component it wraps.
- Middleware and HOCs are this pattern in TypeScript ecosystems.
- Wrapping order can matter — document stacks where behavior depends on sequence.`,
  },
  {
    slug: "facade-pattern",
    title: "Facade Design Pattern (Structural)",
    tag: "Structural",
    body: `**Intent:** Provide a unified, higher-level interface to a subsystem of many classes — simplifying common workflows without hiding the subsystem entirely. **Structure:** A facade class knows subsystem collaborators (often injected), orchestrates call order, and exposes a small API (\`watchMovie()\`, \`placeOrder()\`). Subsystem types remain available for advanced callers.

**When it wins:** Boot/shutdown sequences, multi-step integrations, and “80% use case” APIs over noisy SDKs. Facades reduce coupling: clients depend on the facade, not ten subsystem classes.

Facade gives a complex subsystem one simple door. Home theater startup might touch projector, amplifier, lights, and player; \`WatchMovieFacade\` collapses it to one method. Clients forget subsystem details; internals can evolve behind the stable entry.

Service layers in backends and thin SDK wrappers in front of AWS or Kubernetes clients are facades in production. State the limit honestly: facades smooth common paths but cannot cover every exotic combination — power users still reach subsystem APIs.

## How it works

1. **Pick common paths:** collapse what most callers do into named methods.
2. **Own the sequence:** ordering, cleanup, retries, and error translation live in the facade.
3. **Stay open:** expose subsystem types or “advanced” methods for edge cases.

\`\`\`ts
interface Lights {
  dim(): void;
  bright(): void;
}
interface Projector {
  on(): void;
  off(): void;
}
interface MediaPlayer {
  play(): void;
  stop(): void;
}

class HomeTheaterFacade {
  constructor(
    private readonly lights: Lights,
    private readonly projector: Projector,
    private readonly player: MediaPlayer,
  ) {}

  watchMovie(): void {
    this.lights.dim();
    this.projector.on();
    this.player.play();
  }

  endMovie(): void {
    this.player.stop();
    this.projector.off();
    this.lights.bright();
  }
}
\`\`\`

## Real-world example

The AWS SDK’s high-level \`S3.upload\` facade wraps multipart logic, retries, and progress callbacks that lower-level \`PutObject\` commands expose separately. Application “service” classes (\`CheckoutService\`, \`UserOnboardingService\`) facades over repositories, email, and billing. Logging libraries expose \`logger.info()\` while routing to formatters, transports, and serializers behind the scenes.

- **Cloud SDKs:** S3 multipart upload, DynamoDB document client — simple methods over many low-level calls.
- **Backend service layer:** one \`createOrder()\` orchestrates inventory, payment, and notifications.
- **Build tooling:** Vite/Webpack config presets facade dozens of loader options for the default app template.
- **Mobile SDKs:** Firebase \`signInWithEmail()\` facades auth, token refresh, and persistence setup.

## When to use

- Multi-step subsystems need one-call entry points for the common case.
- Client coupling must shrink — subsystem refactors should not ripple to every caller.
- Service layers, helper SDKs, startup/shutdown, onboarding flows.

## Common mistakes

- **Hiding everything:** exotic cases need direct subsystem access — export escape hatches.
- **Business decisions inside:** facades orchestrate; they should not own pricing rules or authorization policy alone.
- **Mediator confusion:** routing peer-to-peer chat is Mediator; simplifying one client’s view of many services is Facade.
- **God facade:** one class knowing the entire app — split facades by bounded context.

**Mistake:** "Facade replaces the whole system."
**Correct:** "It simplifies the common path — advanced callers still use subsystem classes or advanced APIs."

## Keep in mind

- One simple entry point over a complex subsystem — the whole pattern in one sentence.
- Coupling drops for typical clients; subsystem internals stay replaceable.
- Examples: service layers, cloud helper methods, startup/shutdown sequences.
- Simplifies, never fully replaces — document when to bypass the facade.
- Not Mediator: Facade is one-sided convenience; Mediator coordinates many peers.`,
  },
  {
    slug: "proxy-pattern",
    title: "Proxy Design Pattern (Structural)",
    tag: "Structural",
    body: `**Intent:** Provide a surrogate or placeholder for another object to control access, defer expensive creation, or hide remote/cached details. **Structure:** Proxy implements the same interface as the real subject; clients call the proxy unaware of indirection. The proxy may lazy-init the subject, check permissions, or serve cached results before delegating.

**When it wins:** Large binaries or DB rows loaded on demand, protected operations, remote services that should look local, and memoization with identical API. Distinct from Decorator: **Proxy controls access**; **Decorator adds behavior**.

Proxy is a lookalike of the real thing — same method names, control before entry. Classic forms: virtual (lazy), protection (authz), remote (RPC), and caching proxies.

TypeScript also has the language-level \`Proxy\` for trapping property access — useful for validation and reactive objects — separate from the Gang-of-Four class wrapper but same idea of interception.

## How it works

1. **Match interface:** proxy and real subject share \`display()\`, \`getUser()\`, etc.
2. **Intercept first:** lazy-build, permission check, cache lookup, or network hop.
3. **Delegate after:** real subject performs work; client sees one stable type.

\`\`\`ts
interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private readonly file: string) {
    // expensive load
  }

  display(): void {
    console.log(\`Showing \${this.file}\`);
  }
}

class ImageProxy implements Image {
  private real: RealImage | null = null;

  constructor(private readonly file: string) {}

  display(): void {
    if (!this.real) {
      this.real = new RealImage(this.file);
    }
    this.real.display();
  }
}
\`\`\`

## Real-world example

ORM lazy relations (TypeORM, Prisma field selection) load associations only when accessed — virtual proxy over SQL. API gateways sit in front of microservices: same REST shape to the browser, routing and auth inside the proxy. CDN edge caches act as caching proxies for static assets. Java RMI and gRPC stubs are remote proxies with local interfaces.

- **ORM lazy loading:** first \`order.customer\` access triggers a query; until then a proxy stands in.
- **API gateways:** Kong/AWS API Gateway proxy paths to internal services with rate limits and JWT checks.
- **Caching:** memoized service proxy returns cached \`getProduct(id)\` until TTL expires.
- **Protection:** admin-only \`deleteUser()\` proxy checks roles before delegating to the real service.

## When to use

- Heavy objects needed late (images, large reports, lazy relations).
- Permission checks before sensitive operations (protection proxy).
- Hiding network latency or repeated work (remote/cache proxy).

## Common mistakes

- **Racy laziness:** concurrent first access may double-create — guard with promise or lock where needed.
- **Proxy everywhere:** direct calls suffice for cheap objects — extra layers add latency and confusion.
- **Intent confusion:** adding toppings is Decorator; guarding or deferring is Proxy — decide by intent.
- **Stale cache:** caching proxies need invalidation strategy or TTL — document consistency guarantees.

**Mistake:** "Proxy and Decorator are the same."
**Correct:** "Same shape, different intent: Decorator adds responsibilities; Proxy controls access, loading, or location."

## Keep in mind

- Three interview buckets: virtual (lazy), protection (authz), remote/cache.
- Client sees identical interface — transparency is required.
- ORM lazy loading, API gateways, and caching layers are production proxies.
- TypeScript \`Proxy\` traps are meta-programming — related but not the class-wrapper pattern.
- Choose Proxy when control/deferral is the goal; choose Decorator when enriching behavior.`,
  },
  {
    slug: "composite-pattern-file-system",
    title: "Composite Design Pattern (Structural) | Design File System",
    tag: "Structural",
    body: `**Intent:** Compose objects into tree structures so clients treat individual objects and compositions uniformly. **Structure:** Component interface declares operations like \`size()\` or \`render()\`. **Leaf** nodes implement directly; **Composite** nodes store children and delegate/recurse. Clients call the same API on either without \`instanceof\` branching.

**When it wins:** Hierarchical data where aggregates are common — file systems, org charts, UI trees, scene graphs. Recursion on the component interface keeps client code simple; new node types plug in without changing callers.

Composite makes leaves and groups behave alike. \`File\` and \`Directory\` both expose \`size()\`: file returns bytes, directory sums children. Clients call \`size()\` without caring which they hold; nesting runs arbitrarily deep.

Standard answer for **Design File System** interviews; same shape fits React component trees, nested menus, and permission inheritance. Price: uniform interface forces policy for operations that only composites support (\`addChild\` on files).

## How it works

1. **One component interface:** leaf and composite both implement \`size()\`, \`print()\`, etc.
2. **Leaf answers directly:** file returns its own metric.
3. **Composite aggregates:** directory maps over children and combines — recursion does the work.
4. **Child management (optional):** \`add\`/\`remove\` on composites only; leaves reject or no-op with clear rules.

\`\`\`ts
interface FileSystemNode {
  readonly name: string;
  size(): number;
}

class FileNode implements FileSystemNode {
  constructor(
    readonly name: string,
    private readonly bytes: number,
  ) {}

  size(): number {
    return this.bytes;
  }
}

class DirectoryNode implements FileSystemNode {
  private readonly children: FileSystemNode[] = [];

  constructor(readonly name: string) {}

  add(child: FileSystemNode): void {
    this.children.push(child);
  }

  size(): number {
    return this.children.reduce((total, node) => total + node.size(), 0);
  }
}
\`\`\`

## Real-world example

Operating systems expose files and folders through unified APIs (\`stat\`, tree walks). React’s element tree treats host components and fragment/group nodes as nodes in reconciliation — callers traverse without special-casing every node type. Organization charts compute roll-up headcount: employees are leaves, departments are composites summing reports.

- **File systems:** \`du\`, backup tools, and IDEs traverse \`FileSystemNode\` trees with one \`size()\` or \`walk()\`.
- **UI trees:** DOM, React, and Flutter widget trees — containers and leaves share layout/measure contracts.
- **Menus:** nested \`MenuItem\` and \`SubMenu\` both implement \`render()\` / \`activate()\`.
- **Permissions:** composite roles inherit grants from child roles and direct assignments (with explicit deny rules).

## When to use

- Tree-shaped structures: file system, org charts, UI trees, nested menus, scene graphs.
- Clients should not branch on leaf vs container for core operations.
- Deep nesting where recursive algorithms are natural.

## Common mistakes

- **Leaf operations:** state policy for \`addChild\` on files — throw, no-op, or unsupported — never silent wrong behavior.
- **Stale caches:** cached \`size()\` on directories goes stale on mutation — invalidate or compute lazily.
- **Cycles:** a directory containing an ancestor causes infinite recursion — prevent on \`add\`.
- **Fat interface:** forcing leaves to implement irrelevant methods — split optional interfaces or use type guards at composite-only APIs.

**Mistake:** "Composite for every tree."
**Correct:** "Use it when clients must treat leaf and group uniformly — File plus Directory, not every adjacency list."

## Keep in mind

- Uniform treatment of leaf and container — the entire point of Composite.
- File System is the canonical LLD prompt: \`FileNode\` + \`DirectoryNode\`, recursive \`size()\`.
- Recursion lives in composite methods delegating to children.
- Leaf-only operations need an explicit policy — interviewers notice \`add\` on files.
- Also fits org charts, UI component trees, nested menus, and roll-up metrics.`,
  },
];
