# Motion & paint

## Compositor-friendly

Animate **`transform`** and **`opacity`** only when possible — skips layout/paint on GPU layer.

Avoid animating `width`, `height`, `top`, `left` on large subtrees.

## `will-change`

Hints layer promotion — use sparingly on elements about to animate; remove after. Overuse wastes memory.

## `content-visibility: auto`

Skip rendering off-screen sections — great for long docs; pair with `contain-intrinsic-size` to avoid scrollbar jump.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

Or disable non-essential motion in JS.

## INP

Long tasks during click handlers hurt INP — defer work, use `requestAnimationFrame` for visual updates.

## Dark mode transitions

Transitioning `background-color` on `body` triggers full repaint — optional; many apps snap theme without transition.
