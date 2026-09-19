import type { LldTopic } from "./types";

export const CREATIONAL: LldTopic[] = [
  {
    slug: "factory-method-pattern",
    title: "Factory Method Design Pattern (Creational)",
    tag: "Creational",
    body: `Factory Method solves scattered creation logic: instead of the client deciding which subclass to build, a factory method takes a key and returns the right implementation. Add a new type by touching one factory, not ten call sites. Creation decisions gather in one place and business logic stays clean.

The client never learns subclass names — it asks by key and receives behavior. Testing turns easy because factories hand out mocks as happily as real objects.

## How it works

1. **Ask by key:** the client passes a string like "car", never a class name.
2. **Factory decides:** one method maps keys to subclasses.
3. **Return the role:** every product shares method names, so callers stay uniform.

\`\`\`js
// Factory Method: client asks, factory decides the subclass
class VehicleFactory {
  static create(type) {
    if (type === 'car') return new Car();
    return new Bike();
  }
}
// const v = VehicleFactory.create('car'); v.drive();
\`\`\`

## When to use

- Subclass picked by input (parsers, vehicles, payment modes).
- Creation logic must be mockable in tests.
- New variants arrive without touching call sites.

## Common mistakes

- **Factory for two stable types:** no coming variation means useless boilerplate.
- **Leaking subclasses:** clients importing concrete classes defeats the pattern.
- **Logic inside factories:** factories build only — decisions and work stay outside.

**Mistake:** "Switch on type scattered across call sites."
**Correct:** "One factory method maps keys to subclasses — add types in one place."

## Keep in mind

- Factory Method creates one product behind a name, chosen by a key.
- Clients never import concrete subclasses.
- New variants touch one factory, zero call sites.
- Factories keep new out of business logic, so mocking stays easy.
- Don't overuse: two stable types with no variation need no factory.`,
  },
  {
    slug: "abstract-factory-pattern",
    title: "Abstract Factory Design Pattern (Creational)",
    tag: "Creational",
    body: `Abstract Factory builds whole families of matching objects. A UI toolkit factory creates Button, Checkbox, and Menu together — Windows family or Mac family — so styles never mix. Where Factory Method picks one product, Abstract Factory keeps an entire family consistent.

The rule of thumb: one product with variants means Factory Method; a family that must stay consistent means Abstract Factory. The client picks a family once, then every product it receives matches.

## How it works

1. **Pick a family:** client chooses Windows or Mac a single time.
2. **Build matching parts:** every creation method returns that family's member.
3. **Never mix:** Button and Checkbox always come from the same factory.

\`\`\`js
// Abstract Factory: whole family stays consistent
class WindowsFactory {
  button() { return new WindowsButton(); }
  checkbox() { return new WindowsCheckbox(); }
}
class MacFactory {
  button() { return new MacButton(); }
  checkbox() { return new MacCheckbox(); }
}
// const ui = new WindowsFactory(); ui.button(); ui.checkbox(); // always matching
\`\`\`

## When to use

- Related products must match (UI themes, DB dialects, report exporters).
- Families swap as units (testing theme vs production theme).
- Consistency rules span multiple object types.

## Common mistakes

- **Mixed families:** Windows button with Mac checkbox defeats the entire purpose.
- **Single-product overkill:** one varying product needs Factory Method, not this.
- **Bloated factories:** families keep growing — split when creation methods pass a dozen.

**Mistake:** "Abstract Factory and Factory Method are the same."
**Correct:** "One product by key is Factory Method; a matching family is Abstract Factory — UI toolkit example."

## Keep in mind

- Abstract Factory creates a family that must match.
- Client picks the family once, receives consistent parts.
- Examples: UI themes, DB dialects, cross-platform widgets.
- New family means one new class, zero client edits.
- Single varying product? Step down to Factory Method.`,
  },
  {
    slug: "builder-pattern",
    title: "Builder Design Pattern (Creational)",
    tag: "Creational",
    body: `Builder kills the telescoping constructor problem: a class with ten optional fields ends up with five confusing constructors. Instead, a Builder collects fields through chained calls, and one build() constructs everything in a single place — validation lives there too.

The signal is many optional parameters, especially for objects that should not change. Every field is named at the call site, so parameter-order bugs disappear. In JavaScript, freeze the result with Object.freeze for true immutability.

## How it works

1. **Chain:** each setter stores a field and returns this, so calls link up.
2. **Validate:** build() checks required fields — invalid objects can never exist.
3. **Freeze:** seal the result so nothing mutates it later.

\`\`\`js
// Chained, readable, validated in one place
class UserBuilder {
  setName(name) { this.name = name; return this; }
  setEmail(email) { this.email = email; return this; }
  setPhone(phone) { this.phone = phone; return this; }
  build() {
    if (!this.name) throw new Error('name is required');
    return Object.freeze({ name: this.name, email: this.email, phone: this.phone });
  }
}
// const u = new UserBuilder().setName('A').setEmail('a@x.com').build();
\`\`\`

## When to use

- Four or more parameters, mostly optional (requests, configs, DTOs).
- Immutable result wanted — frozen after building.
- Readable call sites matter — every field named.

## Common mistakes

- **Skipped validation:** without checks in build(), half-built objects roam free.
- **Tiny classes:** two fields need a plain object literal, not a Builder.
- **Forgetting freeze:** without it the immutability promise breaks.

**Mistake:** "Builders are only for long constructors."
**Correct:** "Optional fields call for Builder — chain, validate in build, freeze the result."

## Keep in mind

- Four or more mostly-optional parameters means Builder.
- Validation lives in build() — invalid objects can never exist.
- Pairs naturally with immutability — Object.freeze it.
- Named chained calls kill parameter-order bugs.
- Cost is boilerplate — small classes deserve plain literals.`,
  },
  {
    slug: "singleton-pattern",
    title: "Singleton Design Pattern (Creational)",
    tag: "Creational",
    body: `Singleton guarantees exactly one instance with global access — config objects, connection pools, and loggers are the classic residents. In JavaScript the simplest singleton is a module: the module system hands out the same object to every importer, no ceremony needed.

The lazy version builds on first use: check, create if missing, return. In multi-threaded languages that check-then-create races, which is where double-checked locking comes from — JavaScript's single thread avoids the race, but the interview question still appears, so know both the bug and the volatile fix.

## How it works

1. **One instance:** creation happens once, everyone shares the reference.
2. **Lazy or eager:** build on first use, or at startup for simplicity.
3. **JS shortcut:** export a frozen object from a module — singleton by construction.

\`\`\`js
// Simplest JS singleton: the module itself
// config.js
const config = Object.freeze({ apiUrl: 'https://api.x.com', retries: 3 });
export default config; // every importer shares this one object

// Lazy version when construction is expensive
let instance = null;
function getLogger() {
  if (!instance) instance = new Logger();
  return instance;
}
\`\`\`

## When to use

- Truly single resources: config, pools, loggers.
- Shared mutable state is deliberate and guarded.
- Module pattern suffices in JavaScript most of the time.

## Common mistakes

- **Singleton everywhere:** global state kills testability — justify each one.
- **Hidden dependencies:** classes reaching for the singleton instead of receiving it — inject instead.
- **Thread races:** in multi-threaded code, lazy init needs locking (double-checked + volatile in Java).

**Mistake:** "Make everything a singleton for convenience."
**Correct:** "One instance only with a reason — config, pools, loggers — and prefer injection over global reach."

## Keep in mind

- One instance, global access — config, pools, loggers.
- In JS, an exported frozen module object is already a singleton.
- Lazy build needs care in threaded languages, not in single-threaded JS.
- Most overused pattern in interviews — justify it every time.`,
  },
  {
    slug: "prototype-pattern",
    title: "Prototype Design Pattern (Creational)",
    tag: "Creational",
    body: `Prototype clones an expensive template instead of rebuilding it. When construction costs real work — parsing, network calls, heavy setup — copying a ready-made exemplar is cheaper. Document editors clone styles, games spawn enemies from archetypes.

JavaScript makes this natural: object spread copies own properties, Object.create sets the prototype chain, and structuredClone deep-copies. The trap is shallow copies — nested objects stay shared, so mutations leak across clones. Know which depth you need before choosing the tool.

## How it works

1. **Build once:** construct the expensive template a single time.
2. **Clone per use:** copy it for each new instance.
3. **Pick depth:** spread for flat objects, structuredClone for nested ones.

\`\`\`js
// Clone the template instead of rebuilding
const circleTemplate = { r: 10, area() { return 3.14 * this.r * this.r; } };
const c2 = { ...circleTemplate, r: 20 }; // new object, same shape
// Deep copy needed? structuredClone(template)
\`\`\`

## When to use

- Construction is expensive and instances vary slightly (editors, game spawns).
- Many similar objects needed fast.
- Template configuration shared across instances.

## Common mistakes

- **Shallow surprise:** nested objects stay shared after spread — mutations leak.
- **Cloning cheap objects:** constructor call beats clone machinery for simple cases.
- **Prototype chain confusion:** Object.create links prototypes; spread copies properties — different tools.

**Mistake:** "Clone is always faster."
**Correct:** "Clone pays when construction is expensive — and match copy depth to nesting."

## Keep in mind

- Clone expensive templates — document editors, game spawns.
- Spread copies flat, structuredClone copies deep — pick by nesting.
- Shared nested state leaks across clones — the classic bug.
- Construction cost must justify the machinery.`,
  },
];
