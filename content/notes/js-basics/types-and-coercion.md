# Types & coercion

Revision focus: predict **comparison** and **serialization** surprises in code review, not learning what types are.

## Strict equality is the default

Use `===` / `!==` unless you have a documented reason for coercion. The rare valid `==` cases: `value == null` (matches `null` and `undefined` only).

## Number gotchas

```js
0.1 + 0.2 === 0.3; // false
Number.isNaN(NaN); // true — prefer over isNaN (coerces strings)
Object.is(-0, +0); // false — only when you care about signed zero
```

`parseInt("08")` is still octal in very old engines; use `Number()` or `parseInt(x, 10)`.

## Truthy traps

- `[]` and `{}` are truthy (empty but objects).
- `document.all` was historically funky in browsers — avoid clever truthiness on DOM collections.
- `new Boolean(false)` is truthy — don't wrap booleans in objects.

## `typeof` limits

```js
typeof null === "object"; // historical
typeof [] === "object";
```

Use `Array.isArray`, `instanceof`, or schema validators at boundaries.

## JSON boundary

`JSON.stringify` drops `undefined`, converts `NaN`/`Infinity` to `null`, loses `Date` unless you replacer/revive. **API contracts** should use explicit types (ISO strings for dates).

## `BigInt` mixing

```js
1n + 1; // TypeError — coerce deliberately
```

## Review heuristic

At system boundaries (HTTP, DB, `localStorage`), **parse once** into validated types (zod, valibot, hand-rolled). Coercion bugs cluster at boundaries, not in business logic.
