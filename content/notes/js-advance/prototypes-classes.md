# Prototypes & classes

## Prototype chain lookup

Property read walks `obj → proto → ... → null`. Assignment always sets **own** property unless setter on prototype.

```js
class A { m() {} }
class B extends A {}
Object.getPrototypeOf(B.prototype) === A.prototype;
```

## `class` is syntax sugar

Methods are non-enumerable on `prototype`. Static methods live on constructor. Private fields `#x` are truly private (not on prototype).

## `extends` and `super`

- `super()` required in derived constructor before `this`.
- `super.method()` in instance methods uses home object — don't detach methods.

## Composition over inheritance

Prefer small objects, functions, and interfaces (TS) over deep hierarchies. Mixins and `Object.assign` prototype pollution are legacy patterns.

## `instanceof` and symbols

`instanceof` checks prototype chain of constructor. Cross-realm (iframes) breaks it — use duck typing or `Symbol.hasInstance`.

## Performance

Hidden classes (V8) like stable object shapes. Adding random keys to many instances deoptimizes. Known shape: initialize all fields in constructor.
