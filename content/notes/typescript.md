# TypeScript

> **Goal:** Use TypeScript like a senior — catch real bugs before runtime, pick the right type tool, and explain it in an interview without reciting the handbook. Complements [JavaScript notes](/notes/javascript). React usage → [React notes](/notes/react).

---

## Why TypeScript exists

JavaScript is happy to run `user.nmae` and give you `undefined` in production. TypeScript is a **spellcheck for data shapes**. You describe what a value is allowed to be. The compiler complains **before** the code ships.

```ts
function greet(user: { name: string }) {
  return "Hi " + user.name;
}

greet({ name: "Ada" });
// greet({ nmae: "Ada" }); // error: 'nmae' does not exist
```

**The catch seniors forget:** types are **erased** when the code compiles to JavaScript. They do not exist at runtime. `typeof` in the browser will never say `"User"`. If you need to check a JSON API body, you still validate with code (or Zod). TypeScript only protects the paths the compiler can see.

**When you do not need a novel type system:** a 20-line script. For any app a team will touch for years, TypeScript pays rent in refactors and onboarding.

**Interview phrase:** *"TypeScript is a compile-time contract. It does not replace runtime validation at the HTTP boundary."*

---

## Mental model

Think in three layers:

1. **Value** — what actually runs (`42`, `"hi"`, `{ id: 1 }`).
2. **Type** — a set of allowed values (`number`, `string`, `{ id: number }`).
3. **Check** — does this value belong to that set?

TypeScript is **structural**. If it has the fields you asked for, it fits — names of types do not have to match. Two teams can both have a `{ id: string }` and they are compatible. That is duck typing with a checker.

```ts
type UserId = { id: string };
type OrderId = { id: string };

const user: UserId = { id: "u_1" };
const order: OrderId = user; // allowed — same shape
```

If you need "this UserId must not be passed where OrderId is expected", wrap the id in a branded type (advanced) or use different field names. Most apps do not need that on day one.

---

## Types you will use every day

| Type | Meaning | Watch-out |
|------|---------|-----------|
| `string`, `number`, `boolean` | Primitives | `number` includes `NaN`. IDs from APIs are often `string`. |
| `null` / `undefined` | Empty | With `strictNullChecks`, you must handle them. |
| `object` | Almost anything that is not a primitive | Too vague. Prefer a real shape. |
| arrays | `string[]` or `Array<string>` | Same thing. |
| tuples | `[string, number]` | Length and position matter. |
| `any` | Turn the checker **off** | Avoid. Spreads silently. |
| `unknown` | "I have a value, I have not checked it yet" | Must narrow before use. |
| `never` | No value can exist here | Exhaustive `switch` leftover. |
| `void` | Function returns nothing useful | Callbacks that should not use the return value. |

```ts
let id: string = "u_1";
let tags: string[] = ["mern", "node"];
let pair: [string, number] = ["page", 1];
```

**Union** — this **or** that: `string | number`.  
**Intersection** — this **and** that: `A & B` (must satisfy both).

```ts
type Id = string | number;
type Timestamped = { createdAt: Date };
type User = { name: string } & Timestamped;
```

---

## type vs interface

Both describe object shapes. Seniors pick on purpose, not by habit.

| | `type` | `interface` |
|--|--------|-------------|
| Objects | Yes | Yes |
| Unions / tuples | Yes | No (not directly) |
| Merge same name | No | Yes (declaration merging) |
| `extends` | Use `&` | `extends` |

**Practical rule:**

- **`interface`** for public object shapes that a library or app might extend (`Props`, `User`).
- **`type`** for unions, tuples, mapped types, and function types.

```ts
interface User {
  id: string;
  name: string;
}

type Result =
  | { ok: true; user: User }
  | { ok: false; error: string };
```

Do not waste interview time on a holy war. Say the rule above and move on.

---

## Narrowing (how TS gets smart)

A union is wide. **Narrowing** is proving which branch you are in so the checker allows the right fields.

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toFixed(0);
}
```

Common narrowing tools:

- `typeof` — primitives
- `===` / `"key" in obj` — literals and fields
- `Array.isArray`
- `instanceof` — classes / `Date` / `Error`
- custom **type guards**: `function isUser(v: unknown): v is User`

```ts
function isUser(v: unknown): v is { id: string } {
  return (
    typeof v === "object" &&
    v !== null &&
    "id" in v &&
    typeof (v as { id: unknown }).id === "string"
  );
}
```

Truthy checks work (`if (user)`) but be careful: `0` and `""` are also falsy.

---

## any, unknown, never

**`any`** — "trust me." You lose autocomplete and the next line can explode. A single `any` infects everything it touches.

**`unknown`** — the honest type for `JSON.parse`, `req.body`, and `catch (err)`. You cannot read properties until you narrow.

```ts
function load(raw: unknown) {
  if (!isUser(raw)) throw new Error("bad user");
  return raw.id; // safe
}
```

**`never`** — this code should be unreachable. Use it so adding a new union member **fails the build** until you handle it:

```ts
type Shape = { kind: "circle"; r: number } | { kind: "square"; s: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.r ** 2;
    case "square":
      return s.s ** 2;
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}
```

**Interview phrase:** *"I type untrusted input as unknown and narrow it. any is a last resort, not a shortcut."*

---

## Discriminated unions

This is the pattern seniors actually use for API results, UI state, and events. One field (the **discriminant**) tells you which shape you have.

```ts
type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function view(s: FetchState): string {
  switch (s.status) {
    case "idle":
      return "Ready";
    case "loading":
      return "…";
    case "success":
      return s.data;
    case "error":
      return s.message;
  }
}
```

Better than `data: string | null` plus `error: string | null` plus `loading: boolean` — those combinations lie (`success` with an error set).

Same idea as Redux actions: `{ type: "added"; payload }` vs `{ type: "removed"; id }`.

---

## Generics

A **generic** is a blank the caller fills in. The function stays reusable, but the output type still matches the input.

Everyday picture: a labeled box. "Whatever you put in, you get the same kind back."

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

first(["a", "b"]); // string | undefined
first([1, 2]);     // number | undefined
```

**Constraint** — "T must at least have this":

```ts
function byId<T extends { id: string }>(rows: T[], id: string): T | undefined {
  return rows.find((r) => r.id === id);
}
```

**Multiple params:** `function map<A, B>(items: A[], fn: (a: A) => B): B[]`

**Default:** `type Api<T = unknown> = { data: T }`

Do not generic-everything. If there is only one type you will ever use, write that type.

---

## Utility types (memorize these)

Built-in transformers. You will see them in every codebase.

| Utility | From | Meaning |
|---------|------|---------|
| `Partial<T>` | T | Every field optional (patch / update) |
| `Required<T>` | T | Every field required |
| `Pick<T, Keys>` | T | Keep only those keys |
| `Omit<T, "a">` | T | Drop those keys |
| `Record<K, V>` | keys K | Object whose keys are K and values are V |
| `Readonly<T>` | T | Cannot assign to fields |
| `ReturnType<typeof fn>` | function | Whatever that function returns |
| `Parameters<typeof fn>` | function | Tuple of arguments |
| `Awaited<T>` | Promise | Unwrapped promise type |
| `NonNullable<T>` | T | Drop `null` and `undefined` |

```ts
type User = { id: string; name: string; email: string };
type UserUpdate = Partial<Pick<User, "name" | "email">>;
type ById = Record<string, User>;
```

**`keyof`** — union of keys: `keyof User` is `"id" | "name" | "email"`.

**`typeof`** (type position) — capture a value's type: `const config = { retries: 3 }; type Config = typeof config;`

---

## Functions, optional, and literals

```ts
function send(to: string, body: string, urgent?: boolean): void {}

type Click = (e: MouseEvent) => void;

type Status = "idle" | "loading" | "done"; // string literal union — prefer this over enum
```

**Optional `x?`** means `x: T | undefined` and you may omit it. That is not the same as `null`. APIs often use `null`; model what the JSON actually has.

**`as const`** — freeze literals so they stay `"idle"` instead of widening to `string`:

```ts
const STATUSES = ["idle", "loading", "done"] as const;
type Status = (typeof STATUSES)[number]; // "idle" | "loading" | "done"
```

**`satisfies`** — check a value matches a type **without** widening it. Handy for configs.

**Type assertion `as`** — "treat this as X." The compiler stops arguing. Use at boundaries (DOM, JSON) after you have a reason. `as unknown as T` is a smell; prefer a guard.

**Enums:** numeric enums are surprising (reverse mapping). Prefer `type Status = "a" | "b"` or `as const` objects. If the team already uses enums, match the team.

---

## tsconfig that actually matters

Seniors turn **strict** on and leave it on.

| Flag | Why |
|------|-----|
| `strict` | Bundle of the important checks (null, any, etc.) |
| `noImplicitAny` | Forgotten types become errors, not `any` |
| `strictNullChecks` | `string` is not also `null` |
| `noUncheckedIndexedAccess` | `arr[i]` may be missing — honest |
| `skipLibCheck` | Faster builds; do not typecheck all of `node_modules` |
| `isolatedModules` | Each file must compile alone (bundlers need this) |
| `moduleResolution: bundler` | Modern Next/Vite apps |

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

`any` in a `.tsx` file to "just ship" is how large codebases rot. Fix the type or isolate the escape with a tiny helper.

---

## Runtime is still JavaScript

TypeScript will **not** stop this:

```ts
type User = { id: string };
const user = JSON.parse('{"id": 1}') as User;
user.id.toUpperCase(); // runtime boom — id is a number
```

**Boundary rule:** at the edge of your system (HTTP, env vars, `localStorage`, queue messages), parse with a schema.

```ts
import { z } from "zod";

const User = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof User>;

const user = User.parse(JSON.parse(body));
```

`z.infer` keeps the TypeScript type and the runtime check in one place. That is a senior move.

Same story for `catch (err)`: type is `unknown`. Narrow with `err instanceof Error` before using `.message`.

---

## React + TypeScript (enough to be dangerous)

```tsx
type Props = {
  title: string;
  count?: number;
  onSave: (id: string) => void;
  children?: React.ReactNode;
};

export function Card({ title, count = 0, onSave, children }: Props) {
  return (
    <button type="button" onClick={() => onSave("1")}>
      {title} ({count}) {children}
    </button>
  );
}
```

- Prefer `function Foo(props: Props)` over `React.FC` (FC adds an implicit `children` and has odd generic defaults).
- Events: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`.
- State: `useState<User | null>(null)` when the first value cannot infer.
- Lists: `key` is a string/number, not an index if the list can reorder.

Full React behavior → [React notes](/notes/react).

---

## Common mistakes

- **`any` to silence an error** — you deleted the alarm, not the fire.
- **`as` everywhere** — same problem with extra confidence.
- **`interface User { id: number }` when the API sends strings** — IDs from JSON are usually strings.
- **Optional `user?: User` vs `user: User | null`** — pick what your data actually uses.
- **Huge `enum` for two strings** — use a union.
- **Copying types by hand** instead of `Pick` / `Omit` — they drift.
- **Forgetting `strict`** in a new repo.
- **Typing `err: any` in catch** — use `unknown`.
- **Believing TS validates `process.env.FOO`** — it is `string | undefined` unless you guarantee it.

---

## Interview checklist

- [ ] Types erase at compile time — runtime still needs validation
- [ ] Can explain `any` vs `unknown` vs `never`
- [ ] Discriminated union for state / results
- [ ] One generic example with a constraint (`T extends { id: string }`)
- [ ] Name five utilities: Partial, Pick, Omit, Record, ReturnType
- [ ] `type` vs `interface` in one sentence
- [ ] `strict` is on; IDs modeled as they really are
- [ ] Zod (or similar) at HTTP boundaries

**Phrase:** *"I keep domain types strict, validate at the edges, and use discriminated unions so illegal states cannot be represented."*

**Related:** [JavaScript](/notes/javascript) (runtime), [Node](/notes/node) (Zod, APIs), [React](/notes/react).
