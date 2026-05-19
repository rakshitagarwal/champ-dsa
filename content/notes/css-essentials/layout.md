# Layout

## Flex vs grid

- **Flex** — one-dimensional flow (toolbar, centering, nav).
- **Grid** — two-dimensional tracks (dashboards, card galleries).

## Flex gotchas

- `min-width: 0` on flex children prevents overflow blowout.
- `margin-left: auto` pushes item to end (classic header pattern).

## Grid gotchas

```css
grid-template-columns: minmax(0, 1fr) 300px;
```

`minmax(0, 1fr)` allows shrinking below content intrinsic width.

## Gap vs margin

`gap` on flex/grid — no margin collapse surprises.

## Subgrid

`grid-template-columns: subgrid` — align nested cards to parent columns (check browser support for your audience).

## Sticky + overflow

`position: sticky` fails if any ancestor has `overflow: hidden` — common table header bug.
