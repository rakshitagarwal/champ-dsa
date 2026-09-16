import type { LldTopic } from "./types";

export const CREATIONAL: LldTopic[] = [
  {
    slug: "factory-vs-abstract-factory",
    title: "Factory vs Abstract Factory Pattern (Creational)",
    tag: "Creational",
    body: `**Intent:** Move object creation out of business code so callers depend on abstractions, not concrete classes. **Factory Method** creates one product whose concrete type varies by input. **Abstract Factory** creates a *family* of related products that must stay visually or semantically consistent.

**Structure:** A factory (static method, class, or registry) maps keys or context to implementations. Abstract Factory exposes one method per product in the family (e.g. \`createButton()\`, \`createCheckbox()\`), all from the same concrete factory class. Clients talk to interfaces; they never \`new\` vendor-specific types.

**When it wins:** New variants arrive often (payment rails, parsers, themes). You need one place to register types, swap implementations in tests, or enforce “all pieces match” across a toolkit.

Factory Method fixes scattered \`new\` calls: instead of the client deciding which subclass to build, a factory method takes a key and returns the right implementation. Add a new type by touching one factory, not ten call sites.

Abstract Factory goes one level higher: it builds whole families of matching objects. A UI toolkit factory creates Button, Checkbox, and Menu together (Windows family vs Mac family) so styles never mix. Simple rule: variants of **one** product → Factory Method; a **family** that must stay consistent → Abstract Factory.

## How it works

1. **Factory Method:** client passes a key (\`"card"\`), factory returns the right implementation behind a shared interface. The client never imports subclass names.
2. **Abstract Factory:** client picks a family (\`WindowsThemeFactory\`), then every product from it matches — button and checkbox both Windows.
3. **Testability:** creation hidden behind interfaces makes fakes and stubs trivial in unit tests.

\`\`\`ts
interface PaymentProcessor {
  charge(amountCents: number): Promise<void>;
}

class StripeProcessor implements PaymentProcessor {
  async charge(amountCents: number): Promise<void> { /* ... */ }
}

class PayPalProcessor implements PaymentProcessor {
  async charge(amountCents: number): Promise<void> { /* ... */ }
}

// Factory Method: one product, many implementations
class PaymentFactory {
  static create(provider: "stripe" | "paypal"): PaymentProcessor {
    if (provider === "stripe") return new StripeProcessor();
    return new PayPalProcessor();
  }
}

interface UiButton { render(): void }
interface UiCheckbox { render(): void }

// Abstract Factory: matching family
interface UiToolkitFactory {
  createButton(): UiButton;
  createCheckbox(): UiCheckbox;
}
\`\`\`

## Real-world example

Stripe, Adyen, and internal billing each expose different SDK shapes, but checkout code should only know \`PaymentProcessor\`. A factory registers providers from config; adding Apple Pay means a new class plus one registry entry, not edits across every controller.

- **Stripe / payment routing:** \`PaymentFactory.create(env.PROVIDER)\` picks the live processor; integration tests inject a fake that records charges.
- **Database dialects:** ORMs use factory methods for \`MySqlConnection\` vs \`PostgresConnection\` while queries stay dialect-agnostic at the boundary.
- **Cross-platform UI:** Flutter/Material and Cupertino widgets are abstract-factory families — mixing families breaks platform conventions.
- **Plugin systems:** VS Code or webpack loaders resolve implementation by string key without the core importing every plugin class.

## When to use

- Subclass picked by input (parsers, vehicles, payment modes) — **Factory Method**.
- Matching product families (UI themes, DB dialects, cloud resource bundles) — **Abstract Factory**.
- Creation logic must be mockable, configurable, or feature-flagged in tests.

## Common mistakes

- **Factory for two stable types:** no variation on the horizon means useless indirection.
- **Mixed families:** Windows button with Mac checkbox defeats abstract factory’s whole purpose.
- **Logic inside factories:** factories *construct* only — pricing, validation, and workflows stay outside.
- **Leaking concretes:** returning \`StripeProcessor\` where callers expect \`PaymentProcessor\` breaks the abstraction at the type level.

**Mistake:** "Both patterns are the same thing."
**Correct:** "Variants of one product use Factory Method; a matching family uses Abstract Factory — UI toolkit or payment + receipt + webhook bundle."

## Keep in mind

- Factory Method → one product interface, many implementations.
- Abstract Factory → several related products, one consistent family per factory instance.
- Interview cue: *family vs single product* — give the UI toolkit or themed control set example.
- Factories keep \`new\` out of domain logic; prefer \`interface\` for the product contract in TypeScript.
- Don't overuse: two stable types with no variation need a plain constructor or literal, not a factory hierarchy.`,
  },
  {
    slug: "builder-pattern",
    title: "Builder Design Pattern (Creational)",
    tag: "Creational",
    body: `**Intent:** Separate *construction* of a complex object from its *representation*, so the same build process can create different views or validated snapshots. **Structure:** A builder accumulates optional fields through fluent steps; \`build()\` runs validation and returns an immutable (or readonly) product — often a plain object or class with a private constructor.

**When it wins:** Telescoping constructors (many overloads), objects with invariants (“end date after start date”), and API clients where every field should be named at the call site. Builders shine for HTTP requests, config blobs, and domain entities with four or more optional parameters.

Builder kills the telescoping constructor problem: a class with ten optional fields ends up with five confusing constructors. Instead, a Builder collects fields through chained calls, and one \`build()\` constructs everything in a single place — validation lives there too.

The signal is many optional parameters, especially for objects that should not change. Every field is named at the call site, so parameter-order bugs disappear. In TypeScript, return \`Readonly<T>\` or freeze plain objects for immutability; use a private constructor on the product class when you want a true build gate.

## How it works

1. **Chain:** each setter stores a field and returns \`this\`, so calls link fluently.
2. **Validate:** \`build()\` checks required fields and cross-field rules — invalid objects can never exist.
3. **Seal:** return frozen or readonly data so callers cannot mutate invariants after construction.

\`\`\`ts
interface User {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
}

class UserBuilder {
  private name?: string;
  private email?: string;
  private phone?: string;

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setPhone(phone: string): this {
    this.phone = phone;
    return this;
  }

  build(): User {
    if (!this.name?.trim()) throw new Error("name is required");
    if (!this.email?.includes("@")) throw new Error("email invalid");
    return Object.freeze({
      name: this.name,
      email: this.email,
      phone: this.phone,
    });
  }
}

// const u = new UserBuilder().setName("A").setEmail("a@x.com").build();
\`\`\`

## Real-world example

The Stripe Node SDK builds \`PaymentIntentCreateParams\` through nested objects; large teams often wrap that in an internal builder so required fields (\`amount\`, \`currency\`) are enforced before any network call. Same idea appears in \`fetch\` wrappers and gRPC clients where headers, timeouts, and retries compose cleanly.

- **HTTP clients:** Axios/fetch request builders set method, headers, and body step-by-step; \`build()\` rejects missing \`Authorization\` on protected routes.
- **Test fixtures:** builders create valid \`Order\` graphs for integration tests without 12-arg constructors.
- **Immutable config:** Next.js and bundler configs use builder-like objects (\`withX\`) so partial updates stay readable in CI pipelines.
- **SQL/query DSLs:** Knex and similar APIs chain \`.where()\`, \`.orderBy()\`, then \`build()\` or execute — validation catches empty WHERE on updates.

## When to use

- Four or more parameters, mostly optional (requests, configs, DTOs, query specs).
- Immutable or readonly result wanted after building.
- Readable call sites matter — every field named; cross-field validation in one place.

## Common mistakes

- **Skipped validation:** without checks in \`build()\`, half-built objects leak into the domain.
- **Tiny classes:** two fields deserve a plain object literal or single constructor, not a Builder.
- **Forgetting immutability:** returning mutable objects breaks the “built once” promise.
- **Builder as God object:** one builder assembling unrelated types — split builders per aggregate.

**Mistake:** "Builders are only for long constructors."
**Correct:** "Optional fields and invariants call for Builder — chain, validate in build(), return readonly or frozen product."

## Keep in mind

- Four or more mostly-optional parameters → strong Builder signal.
- Validation lives in \`build()\` — invalid objects must not escape.
- Pairs naturally with immutability — \`Readonly<T>\`, \`Object.freeze\`, or private constructors.
- Named chained calls kill parameter-order bugs in TypeScript call sites.
- Cost is boilerplate — small structs deserve plain literals or factory functions.`,
  },
  {
    slug: "singleton-pattern",
    title: "Singleton Design Pattern (Creational)",
    tag: "Creational",
    body: `**Intent:** Guarantee exactly one instance of a type and provide a global access point — when the resource truly is singular (config snapshot, process-wide logger, connection pool facade). **Structure:** private constructor (or module closure), static accessor or exported module binding, optional lazy initialization on first use.

**When it wins:** Expensive one-time setup that must be shared, or reading immutable global config. **When it loses:** anything that needs isolated tests, per-request state, or horizontal scaling — prefer dependency injection and factory-scoped instances instead.

Singleton guarantees one instance with global access. In TypeScript/Node, the simplest singleton is often a **module**: the loader evaluates the file once and every importer shares the same binding — no classic \`getInstance()\` ceremony.

The lazy class-based version builds on first use: check, create if missing, return. In multi-threaded languages the check-then-create races (double-checked locking + \`volatile\`). Node’s main thread avoids that race for pure JS, but workers and some runtimes still need careful init; interviews still expect you to name the bug and the fix.

## How it works

1. **One instance:** creation happens once; everyone shares the reference.
2. **Lazy or eager:** build on first \`getInstance()\`, or at module load for simplicity.
3. **TypeScript shortcut:** \`export const config = Object.freeze({ ... })\` — singleton by module semantics.
4. **Test escape hatch:** allow resetting or injecting a fake via constructor params in test builds only — avoid hard-coded globals in domain code.

\`\`\`ts
interface AppConfig {
  readonly apiUrl: string;
  readonly retries: number;
}

// Module singleton — idiomatic in Node/TS
export const appConfig: Readonly<AppConfig> = Object.freeze({
  apiUrl: "https://api.example.com",
  retries: 3,
});

class Logger {
  private static instance: Logger | null = null;

  private constructor(private readonly stream: NodeJS.WritableStream) {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(process.stderr);
    }
    return Logger.instance;
  }

  info(message: string): void {
    this.stream.write(\`[info] \${message}\\n\`);
  }
}
\`\`\`

## Real-world example

Database connection pools (pg, mysql2) are effectively singletons per process: opening a pool per request exhausts file descriptors. AWS SDK v3 clients are often created once and reused; the SDK documents client reuse for performance. Logging facades (\`winston\`, \`pino\`) export a default logger instance while still allowing child loggers for context.

- **Connection pools:** one pool per app instance; requests borrow connections instead of reconnecting.
- **Feature flags / config:** frozen config loaded at startup from env or SSM; importers read \`appConfig\` without re-parsing.
- **Metrics clients:** DogStatsD or OpenTelemetry meter providers registered once per process.
- **Browser note:** true singletons are rarer; prefer React context or module scope for theme/auth client stubs.

## When to use

- Truly single resources: config, pools, process-wide loggers, metric registries.
- Shared read-mostly state is deliberate and documented.
- Module \`export const\` suffices in TypeScript/Node for most “single config object” cases.

## Common mistakes

- **Singleton everywhere:** hidden global state kills testability — justify each one.
- **Hidden dependencies:** classes calling \`Logger.getInstance()\` internally instead of receiving \`Logger\` — inject instead.
- **Thread/worker races:** lazy init in parallel contexts may double-create unless guarded.
- **Mutable singletons:** shared mutable singletons become action-at-a-distance bugs — prefer readonly config plus explicit services.

**Mistake:** "Make everything a singleton for convenience."
**Correct:** "One instance only with a clear reason — config, pools, loggers — and prefer injection over static reach-in."

## Keep in mind

- One instance, controlled access — not a license for global mutable state.
- In TS/Node, an exported frozen module object is often the cleanest singleton.
- Lazy class singletons: know double-checked locking for JVM interviews; know module semantics for Node.
- Most overused pattern in interviews — justify it and mention test doubles / DI every time.`,
  },
  {
    slug: "prototype-pattern",
    title: "Prototype Design Pattern (Creational)",
    tag: "Creational",
    body: `**Intent:** Create new objects by copying an existing instance (the prototype) rather than running expensive construction again. **Structure:** A prototype interface exposes \`clone()\` (or you clone via language copy utilities); clients hold a template configured once, then duplicate per use with small deltas.

**When it wins:** Construction involves parsing, I/O, or heavy graph setup; instances differ only slightly from a master template. Games, editors, and document models spawn thousands of near-identical objects — cloning beats reconstructing from scratch.

Prototype clones an expensive template instead of rebuilding it. Document editors clone styles, games spawn enemies from archetypes, and config systems duplicate defaults then patch overrides.

TypeScript/JavaScript offers \`structuredClone\` for deep copies, spread for shallow own-properties, and \`Object.create\` for prototype-chain linkage — different tools. The classic trap is **shallow** copies: nested objects stay shared, so mutations leak across clones. Match copy depth to your object graph.

## How it works

1. **Build once:** construct the expensive template a single time (or load from disk/API).
2. **Clone per use:** copy for each new instance; override only differing fields.
3. **Pick depth:** spread / \`Object.assign\` for flat data; \`structuredClone\` or custom \`clone()\` for nested graphs.

\`\`\`ts
interface Circle {
  readonly r: number;
  area(): number;
}

const circleTemplate: Circle = {
  r: 10,
  area() {
    return Math.PI * this.r * this.r;
  },
};

function cloneCircle(overrides: Partial<Pick<Circle, "r">>): Circle {
  return { ...circleTemplate, ...overrides };
}

// Lodash-style deep clone for nested config trees
interface ThemeConfig {
  colors: { primary: string; muted: string };
  spacing: number;
}

const defaultTheme: ThemeConfig = {
  colors: { primary: "#0066cc", muted: "#666" },
  spacing: 8,
};

function cloneTheme(patch?: Partial<ThemeConfig>): ThemeConfig {
  return structuredClone({ ...defaultTheme, ...patch });
}
\`\`\`

## Real-world example

Lodash \`cloneDeep\` is the prototype pattern in library form: copy complex object graphs without re-running constructors. Redux and Immer treat state updates as “clone with patches.” Game engines keep enemy archetypes in memory and clone stats per spawn. Office suites clone cell formats and paragraph styles from a master style object.

- **Lodash \`cloneDeep\` / Immer:** safe duplication of nested state before immutable updates.
- **Game spawns:** one \`EnemyTemplate\` loaded from assets; each wave clones HP/drop tables with tweaks.
- **Document editors:** “Duplicate slide” or “Copy formatting” clones prototype slides/styles, not rebuild from XML.
- **Kubernetes/GitOps:** default manifests cloned per environment with strategic merge patches — same shape, different values.

## When to use

- Construction is expensive and instances vary slightly (editors, game spawns, theme variants).
- Many similar objects needed quickly from a shared template.
- You need copy semantics explicit in the API (\`clone()\`, \`duplicate()\`).

## Common mistakes

- **Shallow surprise:** nested objects shared after spread — mutations leak between clones.
- **Cloning cheap objects:** a simple \`new Foo()\` beats clone machinery for trivial types.
- **Prototype vs clone confusion:** \`Object.create\` sets inheritance; spread copies own props — different jobs.
- **Functions and class instances:** \`structuredClone\` cannot clone functions; implement custom \`clone()\` on classes when needed.

**Mistake:** "Clone is always faster."
**Correct:** "Clone pays when construction is expensive — and match copy depth to nesting; use deep clone for config trees."

## Keep in mind

- Clone expensive templates — editors, games, nested config.
- Spread for flat; \`structuredClone\` for deep plain data — pick by nesting.
- Shared nested state leaking across clones is the classic production bug.
- Construction cost must justify the machinery; trivial objects use constructors.
- Mention Lodash \`cloneDeep\` or Immer as real-world prototype-style copying in TS codebases.`,
  },
];
