# Stacking & specificity

## Stacking contexts

Created by: `position` + z-index, `opacity < 1`, `transform`, `filter`, `isolation: isolate`, flex/grid children with z-index.

Modals and tooltips need known context — portal to `document.body` or use `@layer`.

## z-index scale

Design tokens: dropdown 100, sticky 200, modal 300, toast 400. Avoid `99999` arms race.

## Specificity

`(inline, IDs, classes, elements)`. Prefer single class or data-attribute over chaining selectors.

## `@layer`

```css
@layer base, components, utilities;
```

Predictable override order — Tailwind v4 / modern resets use this.

## BEM vs utility

BEM for stable component API in design systems; utilities for product velocity. Hybrid is normal.

## `:where()`

Zero specificity wrapper for resets:

```css
:where(h1, h2) { margin: 0; }
```
