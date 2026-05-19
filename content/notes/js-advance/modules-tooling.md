# Modules & bundlers

## ESM rules

- Static `import`/`export` only at top level (with exceptions for dynamic `import()`).
- Live bindings for exports — reassigning exported `let` visible to importers.
- `import.meta.url` for asset paths in Node ESM.

## CJS interop

`require()` is sync; ESM is async graph. Default import from CJS may be `module.exports` or `.default` depending on bundler — check your toolchain.

## Dynamic import

```js
const mod = await import("./heavy.js");
```

Use for route-level code splitting, feature flags, optional plugins.

## Tree shaking

Works on **named** ESM exports with side-effect-free modules. `package.json` `"sideEffects": false` helps. CommonJS often prevents shaking.

## Resolution

`exports` field in `package.json` controls modern entry points. Duplicated packages in bundle (two Reacts) → broken hooks — dedupe with `resolve.alias` or pnpm overrides.

## Barrel files

`index.ts` re-exporting everything can harm tree shaking and slow dev server. Prefer direct imports in app code; barrels OK for public library API surface.
