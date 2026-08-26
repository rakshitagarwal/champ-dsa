# Web Optimisation — Interview Notes

> **Web optimisation = ship less, ship smarter, measure everything.** Users decide in 2 seconds. Interviewers test whether you can diagnose *real* bottlenecks (network, render, JS) and fix them without premature complexity.

Related: app performance → [Performance optimisation](/notes/performance) · rendering → [Next.js](/notes/next) · React renders → [React](/notes/react) · caching at scale → [Redis](/system-design/redis).

---

## 1. How browsers load a page — Critical Rendering Path (CRP)

The browser must do this before first paint:

```
HTML → Parse → DOM
CSS  → Parse → CSSOM
DOM + CSSOM → Render Tree → Layout → Paint → Composite
             ↑                ↑
          JS blocks parsing   Images/fonts block paint
```

**What blocks what:**
| Resource | Blocks | Why |
|----------|--------|-----|
| HTML | Everything — parsed top-down | Parser stops on sync `<script>` |
| CSS | Render | Browser waits for CSSOM before painting (FOUC otherwise) |
| Synchronous JS | HTML parse | `<script>` without `async/defer` halts parsing until executed |
| Fonts | Text paint | Invisible until font loads (FOIT) or fallback shown (FOUT) |
| Images | LCP only | Don't block render, but delay LCP |

**Senior phrase:** *"I optimise the CRP — inline critical CSS, defer non-critical JS, preload the LCP image, and preconnect to the API/CDN origin so the browser discovers resources earlier."*

---

## 2. Metrics that matter — Core Web Vitals + friends

| Metric | Measures | Good | How to improve |
|--------|----------|------|----------------|
| **LCP** — Largest Contentful Paint | Load — when hero is visible | < 2.5s | Preload LCP image, server-render it, compress, CDN |
| **INP** — Interaction to Next Paint | Responsiveness — tap → visual update | < 200ms | Break long tasks, avoid main-thread blocking JS |
| **CLS** — Cumulative Layout Shift | Visual stability | < 0.1 | Reserve width/height for images, ads, embeds |
| **FCP** — First Contentful Paint | First text/image paint | < 1.8s | Reduce blocking CSS/JS, faster TTFB |
| **TTFB** — Time To First Byte | Server + network latency | < 800ms | SSR/edge, CDN, lean server logic |
| **TBT** — Total Blocking Time | Sum of long tasks (>50ms) before INP | < 200ms | Code-split, defer, web workers |

**INP replaced FID in 2024** — interviews expect you to say INP. Measure with Lighthouse + field data (CrUX, RUM).

**Real vs Lab:**
- Lab: Lighthouse, PageSpeed Insights (single run, throttled Moto G4)
- Field: Chrome UX Report, Vercel Analytics, Datadog RUM — what users actually feel

---

## 3. Network — make requests faster and fewer

### 3.1 HTTP versions
| Version | Win | Notes |
|---------|-----|-------|
| HTTP/1.1 | Baseline | 6 connections per origin, head-of-line blocking |
| **HTTP/2** | Multiplexing, header compression, server push (deprecated) | One TCP connection, many streams — most CDNs default |
| **HTTP/3** (QUIC) | UDP, 0-RTT, no TCP head-of-line blocking | Best on lossy mobile networks — enable at CDN |

### 3.2 Resource hints — tell the browser early
```html
<!-- DNS + TCP + TLS handshake early -->
<link rel="preconnect" href="https://cdn.example.com" crossorigin />
<link rel="dns-prefetch" href="https://api.example.com" />

<!-- High-priority fetch — LCP image, critical font, critical CSS -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/hero.avif" as="image" imagesrcset="hero-400.avif 400w, hero-800.avif 800w" />

<!-- Low-priority future navigation -->
<link rel="prefetch" href="/dashboard" />
<link rel="modulepreload" href="/chunks/dashboard.js" />
```

| Hint | When |
|------|------|
| `preconnect` | CDN, API, font origin — 1 RTT saved per origin |
| `preload` | LCP image, above-the-fold font, critical CSS |
| `prefetch` | Next likely route — idle time |
| `modulepreload` | ES module graph for SPA routes |

**Anti-pattern:** `preload` everything — browser priority inversion and wasted bytes. Only 2-3 preloads per page.

### 3.3 Compression
- **Brotli** (`br`) beats gzip by 15-25% — enable at CDN/origin
- **Gzip** fallback for old clients
- Compress only `> 1KB` text assets (JS, CSS, JSON, SVG) — images/video already compressed
- Next.js does this automatically on Vercel; elsewhere set `Content-Encoding` at nginx/CDN

### 3.4 Caching — HTTP headers
```
# Hashed, immutable static assets — cache 1 year, never revalidate
Cache-Control: public, max-age=31536000, immutable
# → /_next/static/chunks/abc123.js  or  /assets/logo.a1b2c3.svg

# HTML / API — never cache or short revalidation
Cache-Control: public, max-age=0, must-revalidate       # SSR HTML
Cache-Control: public, max-age=60, stale-while-revalidate=300  # ISR / cacheable API
ETag: "abc" / Last-Modified + If-None-Match → 304 Not Modified
```

**Next.js mapping:** hashed `/_next/static/*` = immutable; `page` HTML = per-`revalidate` or `no-store`.

---

## 4. Assets — ship less bytes

### 4.1 JavaScript
- **Code splitting:** `import()` per route + `next/dynamic` for heavy components (charts, editors)
```js
const Chart = dynamic(() => import('./HeavyChart'), { loading: () => <Skeleton /> });
```
- **Tree shaking:** `import { debounce } from 'lodash-es'` not `import _ from 'lodash'`
- **Minify + dead code elimination:** done by bundler (Turbopack/Webpack)
- **Remove unused polyfills:** set `browserslist` correctly — don't ship IE11 code
- **Bundle analyzer:** `ANALYZE=true next build` → find the 300KB chart library you forgot

```bash
npm i -D @next/bundle-analyzer
# next.config.js: withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
```

### 4.2 CSS
- **Critical CSS:** inline above-the-fold CSS in `<head>`, defer the rest
- **Purge unused CSS:** Tailwind does this — don't ship 2MB of unused CSS
- **Defer non-critical CSS:**
```html
<link rel="stylesheet" href="/non-critical.css" media="print" onload="this.media='all'" />
```
- **Avoid `@import`** — blocks parallel fetching; use `<link>` or bundler imports

### 4.3 Images — biggest LCP win
```html
<!-- Modern: responsive, lazy, correct size -->
<img
  src="hero-800.avif"
  srcset="hero-400.avif 400w, hero-800.avif 800w, hero-1200.avif 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  width="800" height="600"
  loading="lazy" decoding="async"
  fetchpriority="high"  <!-- for LCP image: high, others: auto/low -->
  alt="hero"
/>
```

| Technique | Impact |
|-----------|--------|
| **AVIF/WebP** over JPEG/PNG | 30-50% smaller — use `<picture>` or Next `Image` auto |
| **Correct size** | Don't ship 3000px image for 400px container — use `srcset` |
| **Lazy loading** | `loading="lazy"` for below-the-fold — saves bytes on first paint |
| **Priority** | `fetchpriority="high"` + `preload` for LCP image only |
| **`width`/`height`** | Prevents CLS — browser reserves space before download |
| **CDN image service** | Cloudinary / Vercel Image Optimization — on-the-fly resize |

**Next.js `next/image`:**
```tsx
import Image from 'next/image';
<Image src="/hero.jpg" width={800} height={600} priority sizes="(max-width:768px) 100vw, 50vw" alt="" />
```
- `priority` = preloads LCP image, no lazy
- Configure `remotePatterns` for external images in `next.config.js`

### 4.4 Fonts
- **Self-host** with `next/font` — no external request, zero CLS, automatic subsetting
```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });
```
- **`display: swap`** — show fallback immediately, swap when font loads (no FOIT)
- **Subset:** only `latin` not all glyphs → 60-80% smaller
- **Preload only the LCP font** (1-2 weights), not all 9 weights

### 4.5 Video
- Never autoplay large MP4 without `muted` + `playsInline`
- Use HLS/DASH adaptive streaming for long video (see [YouTube system design](/system-design/youtube))
- Poster image prevents CLS: `<video poster="/poster.jpg">`

---

## 5. Rendering — when and where HTML is built

| Strategy | HTML built | JS needed | SEO | TTFB | Use |
|----------|------------|-----------|-----|------|-----|
| **SSR** | Server per request | Hydrates | Excellent | Slower | Dashboard, auth pages |
| **SSG** | Build time | Hydrates | Excellent | Fastest (CDN) | Marketing, docs |
| **ISR** | Build + revalidate | Hydrates | Excellent | Fast | Blog, product pages |
| **CSR** | Browser only | Full | Poor | Fast shell, slow content | Internal tools |
| **RSC (Next.js)** | Server, zero JS for server parts | Partial hydration | Excellent | Fast | Default in App Router — interactive islands only |

**Hydration cost:** Every Client Component ships JS. Push `"use client"` down the tree — server parent fetches, passes props to small client leaf.

**Streaming SSR / Suspense:**
```tsx
<Suspense fallback={<Skeleton />}>
  <SlowComponent /> {/* streams when ready, doesn't block rest of page */}
</Suspense>
```

---

## 6. JavaScript runtime — keep the main thread free

The main thread handles **JS, layout, paint, input**. Block it → INP suffers.

| Technique | When |
|-----------|------|
| `React.memo` | Expensive child, same props, parent re-renders often |
| `useMemo` | Expensive derived value; stable ref for memoized child |
| `useCallback` | Callback passed to memoized child or effect dep |
| `useTransition` | Keep typing responsive during heavy filter/sort |
| `useDeferredValue` | Lag expensive search behind fast keystrokes |
| Virtualization | 500+ row lists — `@tanstack/react-virtual` |
| Web Worker | CPU work off main thread — `new Worker('worker.js')` |
| `requestIdleCallback` | Non-urgent work in idle time |

**Long task:** JS > 50ms blocks input. Break with `setTimeout(0)` chunking or `scheduler.postTask`.

```js
// Bad — blocks for 600ms
items.forEach(heavyCompute);

// Good — yield to browser
async function chunked(items) {
  for (let i = 0; i < items.length; i++) {
    heavyCompute(items[i]);
    if (i % 100 === 0) await new Promise(r => setTimeout(r, 0));
  }
}
```

**Anti-patterns:** Context with frequently changing value at root (re-renders all consumers), `useEffect` + `setState` on every keystroke without deferral.

---

## 7. Caching layers — browser, CDN, and beyond

```
Browser cache (memory/disk — Cache-Control)
  → Service Worker / Cache API (offline, stale-while-revalidate)
    → CDN / Edge (Vercel, Cloudflare — cache HTML + assets geographically)
      → Origin cache (Redis — shared across instances)
        → Database
```

**Service Worker — stale-while-revalidate:**
```js
// sw.js — serve cache, update in background
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetched = fetch(e.request).then(r => { caches.open('v1').then(c => c.put(e.request, r.clone())); return r; });
      return cached || fetched;
    })
  );
});
```

| Layer | TTL | Invalidation |
|-------|-----|--------------|
| Hashed static | 1 year immutable | New hash on deploy — no invalidation needed |
| CDN HTML (ISR) | `revalidate: 60` | `revalidatePath()` / time |
| Redis API cache | 60s `stale-while-revalidate` | Explicit delete or TTL |
| Browser API | `max-age=0` for auth, otherwise short | ETag 304 |

See [distributed cache](/system-design/distributed-cache) and [Redis](/system-design/redis) for server-side patterns.

---

## 8. Loading strategies — script, CSS, and component level

```html
<!-- Blocking — avoid for non-critical -->
<script src="app.js"></script>

<!-- Parallel fetch, execute ASAP, order not guaranteed — analytics -->
<script src="analytics.js" async></script>

<!-- Parallel fetch, execute in order after parse — default for app code -->
<script src="app.js" defer></script>

<!-- ES module — deferred by default -->
<script type="module" src="app.js"></script>
```

**Priority order interviewers expect:** `preload (high) > preconnect > defer scripts > lazy images > prefetch (low/idle)`.

**Lazy components:**
```tsx
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('./Editor'), { ssr: false, loading: () => <Skeleton /> });
```

---

## 9. Mobile & responsive

- **Mobile-first CSS:** base = mobile, `@media (min-width: 768px)` escalates — fewer overrides, faster on constrained devices
- **Viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1">` — without it mobile renders desktop width
- **Touch:** `touch-action`, `passive` scroll listeners — `addEventListener('touchstart', fn, { passive: true })`
- **Responsive images:** `srcset` + `sizes` (see §4.3) — saves 50-70% bytes on 400px phones
- **Container queries:** `@container (min-width: 400px)` — component-level responsive, not just viewport

---

## 10. Measuring — lab vs field tools

| Tool | What it does |
|------|--------------|
| **Lighthouse** (Chrome DevTools) | Lab audit — performance, a11y, SEO, score |
| **PageSpeed Insights** | Lighthouse + CrUX field data for your URL |
| **WebPageTest** | Filmstrip, waterfall, multi-location, connection throttling |
| **Chrome Performance panel** | Flame chart, long tasks, layout thrashing |
| **Coverage tab** (DevTools) | Unused JS/CSS bytes |
| **Bundle analyzer** | Which package bloats the bundle |
| **CrUX / RUM** | Real user data — LCP/INP/CLS distribution |

**Workflow:**
1. Define SLO — LCP < 2.5s, INP < 200ms, CLS < 0.1 on p75
2. Measure lab + field baseline
3. Profile — biggest waterfall block or longest task?
4. Fix one bottleneck → deploy behind flag → compare p75 → repeat

---

## 11. Security & correctness that affect performance

- **`rel="noopener noreferrer"`** on `target="_blank"` — prevents `window.opener` access (perf + security)
- **SRI** for third-party scripts if you must load them — `integrity="sha384-..."`
- **Don't lazy-load LCP** — defeats preload; only lazy below-the-fold
- **Third-party scripts:** audit with `<script>` → `async` or Partytown (web worker) — each third-party is a potential long task

---

## 12. Production checklist — what to say is "done"

- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1 on p75 (field)
- [ ] Hashed static assets → `immutable, max-age=1y` + CDN
- [ ] HTML/API → `revalidate` or `no-store` — not `immutable`
- [ ] Hero image — AVIF/WebP, `srcset`, `width/height`, `preload` + `fetchpriority=high`
- [ ] Fonts — `next/font`, `display: swap`, subset, preload at most 1-2
- [ ] Scripts — `defer` for app, `async` for analytics, no blocking JS in `<head>`
- [ ] Preconnect to CDN + API origin (2 origins max)
- [ ] Bundle — code-split per route, analyzer < 200KB gzipped for main route
- [ ] Lazy — below-the-fold images/components only
- [ ] Compression — Brotli at CDN
- [ ] Observability — Lighthouse CI + RUM (Vercel Analytics / Datadog)
- [ ] No unused CSS/JS — Coverage tab < 15% unused

---

## 13. Interview answers — how to sound senior

**Q: "Page is slow — where do you start?"**
> *"I'd ask: slow for whom — LCP or INP? Check PageSpeed field data vs lab. Then waterfall: TTFB > 800ms → server/CDN; LCP > 2.5s → hero image preload/size; INP > 200ms → long task in Performance panel. Measure, fix one bottleneck, re-measure p75."*

**Q: "How would you optimise images?"**
> *"Serve AVIF/WebP via `next/image` with `srcset`/`sizes`, correct `width/height` to avoid CLS, `preload` only the LCP image with `fetchpriority=high`, lazy the rest, and serve from CDN with immutable cache. Target < 100KB for hero on mobile."*

**Q: "When would you NOT optimise?"**
> *"If metrics already meet SLO on p75 field data. Extra `memo` adds maintenance and bugs. I optimise the measured bottleneck, ship behind a flag, and compare — don't gold-plate."*

**Q: "Defer vs async vs preload?"**
> *"Defer for app scripts — parallel fetch, ordered execution after parse. Async for independent scripts like analytics — order not guaranteed. Preload for high-priority resources discovered late — LCP image/font. Budget 2-3 preloads, otherwise priority inversion."*

**Q: "How do you handle third-party scripts?"**
> *"Audit with Lighthouse — each script is a long-task risk. Load with `async`, set `fetchpriority=low`, or move to web worker via Partytown. If it blocks INP, ask product to defer or remove. Monitor with RUM."*

---

## 14. Quick references — copy-paste friendly

**Preconnect + preload head:**
```html
<head>
  <link rel="preconnect" href="https://cdn.example.com" crossorigin />
  <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/hero.avif" as="image" imagesrcset="/hero-400.avif 400w, /hero-800.avif 800w" />
</head>
```

**Defer non-critical CSS:**
```html
<link rel="stylesheet" href="/non-critical.css" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="/non-critical.css" /></noscript>
```

**Lazy component + image:**
```tsx
const Map = dynamic(() => import('./Map'), { loading: () => <Skeleton /> });
<Image src="/below-fold.jpg" width={600} height={400} loading="lazy" alt="" />
```

---

Next: measure one real page you ship → [Performance optimisation — deep dive](/notes/performance) → [Next.js rendering & caching](/notes/next).
