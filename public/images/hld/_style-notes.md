# HLD architecture SVG style (agent reference)

Not user-facing. Match [request-path.svg](./request-path.svg).

## Palette

| Token | Hex | Use |
|-------|-----|-----|
| bg | `#0f172a` | Canvas |
| grid | `rgba(230,237,247,0.06)` | 28px grid |
| boxFill | `#111c30` | Default entity |
| boxStroke | `#e6edf7` | Default border |
| hotFill | `#10332f` | Hot-path entity |
| hotStroke | `#38d0b8` | Hot-path border |
| text | `#e6edf7` | Labels |
| muted | `#8fa1bd` | Notes, captions, arrows |
| groupStroke | `rgba(230,237,247,0.25)` | Dashed fleet groups |

## Typography

- Family: `ui-monospace, Menlo, Consolas, monospace`
- Box title: 11–12px
- Note under box: 9–10px muted
- Caption: 11px muted at bottom

## Rules

1. Hot path (LB, primary service, critical store on write/read hot path) uses teal.
2. Every major box needs one concrete note (store, key, TTL, shard).
3. Fleet / multi-instance: dashed rounded group rect + label.
4. One caption soundbite at bottom.
5. Output: `public/images/hld/{slug}-architecture.svg`
6. Markdown: image first under `## High-Level Design (HLD)`; keep ASCII/components for study.

## Generator

```bash
node scripts/generate-hld-diagrams.mjs
```
