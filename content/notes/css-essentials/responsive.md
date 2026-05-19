# Responsive & units

## `clamp()` fluid type

```css
font-size: clamp(1rem, 0.5rem + 2vw, 1.25rem);
```

## Container queries

`@container (min-width: 40rem)` — component responds to **parent** width, not viewport. Set `container-type: inline-size` on parent.

## Viewport units

`100vh` mobile URL bar issues → `100dvh` (dynamic viewport). `svh`/`lvh` for min/max stable layouts.

## `rem` vs `em`

`rem` from root — predictable. `em` compounds in nested components — good for padding relative to local font-size.

## Media queries

`prefers-reduced-motion`, `prefers-color-scheme` — ship accessible defaults.

## Breakpoints

Content-based breakpoints beat device lists. Don't match iPhone widths in CSS comments — fragile.
