# Next.js Interview Notes

---

## 1. What is Next.js?

Next.js is a **React framework** (not a replacement for React) that adds routing, rendering strategies, API routes, and production optimizations out of the box.

**Why teams use it:**
- File-based routing (App Router)
- Server Components — smaller client bundles, better SEO
- Built-in data fetching and caching
- Image, font, and script optimization
- Full-stack: Route Handlers + Server Actions

**Stack fit:** React for UI → Next.js for routing, SSR/SSG, deployment. Node still runs the server.

---

## 2. App Router vs Pages Router

| | **App Router** (`app/`) | **Pages Router** (`pages/`) |
|---|-------------------------|-----------------------------|
| Default since | Next.js 13+ | Next.js 12 and earlier |
| Components | Server Components by default | Client-side React |
| Layouts | Nested `layout.tsx` | `_app.js` only |
| Data fetching | `async` Server Components, `fetch` cache | `getServerSideProps`, `getStaticProps` |
| Recommendation | **New projects** | Legacy / migration |

Both can coexist during migration. Interviews expect **App Router** knowledge for senior roles in 2024+.

---

## 3. File-based routing (App Router)

| File | Purpose |
|------|---------|
| `page.tsx` | Route UI — makes URL public |
| `layout.tsx` | Shared shell; **persists** on child navigation |
| `loading.tsx` | Suspense fallback for segment |
| `error.tsx` | Error boundary for segment |
| `not-found.tsx` | 404 UI |
| `route.ts` | Route Handler (API endpoint) |

**Dynamic segments:** `[id]`, `[...slug]` (catch-all), `[[...slug]]` (optional catch-all).

**Route groups:** `(marketing)/about` — organize folders without affecting URL.

**Static paths:** `generateStaticParams()` for SSG dynamic routes.

```
app/
  page.tsx              → /
  about/page.tsx        → /about
  blog/[slug]/page.tsx  → /blog/:slug
  (shop)/cart/page.tsx  → /cart
```

---

## 4. Server Components (RSC)

**Default in App Router** — no `"use client"` directive.

**Can do:**
- `async/await` data fetching directly in component
- Access server-only resources (DB, secrets, filesystem)
- Zero client JS for that component's logic

**Cannot do:**
- `useState`, `useEffect`, or other hooks
- Browser APIs (`window`, `localStorage`)
- Event handlers (`onClick`)

```tsx
// Server Component
async function getPosts() {
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

---

## 5. Client Components

Add `"use client"` at the **top of the file** — everything below is a client boundary.

**Use when you need:** interactivity, hooks, browser APIs, context providers.

**Composition pattern:** Server parent fetches data → passes serializable props to Client child. Don't re-fetch the same data on client unless needed.

**Serialization limits:** Props must be JSON-serializable — no functions, class instances, or DOM nodes.

**Bundle discipline:** Push `"use client"` **down the tree** — large client subtrees inflate JS.

```tsx
"use client";
import { useState } from "react";

export function Counter({ initial }: { initial: number }) {
  const [n, setN] = useState(initial);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
```

---

## 6. Layouts & navigation

**Layouts** wrap child routes and **do not remount** on sibling navigation — good for sidebars, auth shells.

**Root layout** (`app/layout.tsx`) is required — must include `<html>` and `<body>`.

**Reset state on navigation:** pass `key` on a segment if you need remount behavior.

**Navigation:**
- `<Link href="/about">` — prefetches by default
- `useRouter().push('/path')` — imperative (client)
- `redirect('/login')` — server-side redirect in Server Components / actions

---

## 7. Rendering strategies

| Strategy | When | How (App Router) |
|----------|------|------------------|
| **SSG** | Static content | Default static generation; `generateStaticParams` |
| **SSR** | Per-request dynamic | `fetch(..., { cache: 'no-store' })` or `dynamic = 'force-dynamic'` |
| **ISR** | Static + periodic refresh | `fetch(..., { next: { revalidate: 60 } })` |
| **CSR** | Client-only interactivity | Client Components + client fetch (React Query, SWR) |

**Interview phrase:** *"I'd default to static/ISR for marketing pages, SSR or no-store for authenticated dashboards, and Client Components only for interactive islands."*

---

## 8. Data fetching & caching

**`fetch` on server (App Router):**
- Default: caches GET requests
- Opt out: `{ cache: 'no-store' }`
- ISR: `{ next: { revalidate: 60 } }` — seconds
- Tags: `next: { tags: ['posts'] }` + `revalidateTag('posts')` after mutation

**Escape hatches:**
```tsx
export const dynamic = 'force-dynamic';  // always SSR
export const dynamic = 'force-static';     // always static
```

**Duplicate request deduping:** Same URL in one render tree dedupes automatically.

**Stale-while-revalidate:** Serve cached page fast; refresh in background — great for dashboards; use `no-store` for auth-sensitive data.

---

## 9. Server Actions

Colocate mutations with UI — `"use server"` on async functions or file top.

```tsx
"use server";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  await db.post.create({ data: { title } });
  revalidatePath("/posts");
}
```

**Use in forms:** `<form action={createPost}>` — progressive enhancement.

**Security:** Framework handles CSRF for same-origin forms; still validate input server-side.

---

## 10. Route Handlers (API routes)

`app/api/users/route.ts` — export `GET`, `POST`, etc.

```tsx
export async function GET() {
  const users = await db.user.findMany();
  return Response.json(users);
}
```

**When to use:** Webhooks, third-party integrations, non-React consumers. Prefer Server Actions for form mutations from your own UI.

---

## 11. Middleware

`middleware.ts` at project root — runs **before** route match on Edge.

**Use cases:** Auth redirects, geo headers, A/B tests, rate limiting.

**Keep fast:** No heavy DB calls — use JWT verify or edge KV.

```tsx
export function middleware(request: NextRequest) {
  if (!request.cookies.get("session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = { matcher: ["/dashboard/:path*"] };
```

---

## 12. Metadata & SEO

**Static metadata:**
```tsx
export const metadata = { title: "Home", description: "..." };
```

**Dynamic metadata:**
```tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return { title: post.title };
}
```

Server-rendered HTML improves SEO vs pure CSR SPAs.

---

## 13. Image & font optimization

**`next/image`:** Automatic resizing, WebP/AVIF, lazy loading, layout shift prevention. Configure `remotePatterns` in `next.config` for external images.

**`next/font`:** Self-hosted fonts, no layout shift, zero external requests.

---

## 14. Edge vs Node runtime

| | Edge | Node |
|---|------|------|
| Cold start | Faster | Slower |
| APIs | Subset of Node | Full `fs`, native modules |
| Use | Middleware, geo, JWT verify | DB drivers, heavy compute |

Per route: `export const runtime = 'edge'`.

---

## 15. Environment variables

| Prefix | Exposed to browser? |
|--------|---------------------|
| `NEXT_PUBLIC_*` | Yes — bundled into client |
| No prefix | Server only — secrets safe |

Never put API keys in `NEXT_PUBLIC_`.

---

## 16. Common interview questions

**Q: Why Server Components?**
Smaller JS bundle, direct server data access, better TTFB and SEO. Client Components only where interactivity is needed.

**Q: How is Next.js different from React?**
React is the UI library. Next.js adds routing, rendering modes, bundling, and full-stack primitives on top.

**Q: When would you use `getServerSideProps` (Pages) vs Server Component fetch?**
Greenfield App Router → async Server Component + `fetch` cache. Pages Router legacy → `getServerSideProps`.

**Q: How do you handle auth in App Router?**
Middleware for route protection; session in httpOnly cookie; Server Components read session server-side; Client Components for login form only.

**Q: What causes hydration errors?**
Server HTML doesn't match client render — often browser-only APIs in SSR, wrong date formatting, or invalid HTML nesting.

**Q: How do you optimize a slow Next.js page?**
Check TTFB (RSC payload), Client JS bundle size, `next/image`, caching strategy, move data fetching to server, code-split client islands.

---

## 17. Anti-patterns

- `"use client"` on entire `page.tsx` — defeats RSC benefits
- Fetching same data in Server Component and again in `useEffect`
- Putting secrets in `NEXT_PUBLIC_` env vars
- Heavy logic in middleware
- `force-dynamic` everywhere — kills caching benefits

---

## 18. Next.js Full Stack JD — extra Q&A (2–3 YOE)

**Q: How would you build a full-stack feature in Next (e.g. user profile)?**  
A: Server Component page fetches profile from DB/API with cookies; Client Component for the edit form; Server Action or route handler for `PATCH`; validate with Zod; revalidate tag/path after mutate. Keep secrets server-only.

**Q: App Router route handlers vs separate Node Express API?**  
A: Route handlers are great for BFF / same-deploy fullstack. Separate Express/Nest service when you need independent scaling, many consumers (mobile), or heavier background workers. Many teams use Next for UI + Node API — both are valid; explain your choice.

**Q: How do you call your Node API from Next?**  
A: From Server Components: `fetch` to internal URL with forwarded cookies/auth header. From client: call same-origin Next proxy/route handler to avoid exposing secrets and to simplify CORS. Cache deliberately (`no-store` for private user data).

**Q: SSR vs SSG vs CSR — pick for a dashboard?**  
A: Private dashboard → dynamic SSR or client fetch with auth (`no-store`). Marketing blog → SSG/ISR. Highly interactive widgets → Client Components islands.

**Q: How do you handle env vars across local / staging / prod?**  
A: `.env.local` locally; hosting provider / [AWS SSM](/notes/aws) in deploy. `NEXT_PUBLIC_*` only for non-secrets. Document required vars; fail fast if missing at startup.

**Q: Image uploads in a Next + Node stack?**  
A: Prefer **S3 pre-signed URL** from the API ([AWS](/notes/aws)); don't stream multi‑MB files through Next serverless if avoidable. Use `next/image` for display.

**Q: Middleware use cases?**  
A: Auth gate, redirects, geo/locale, A/B headers — keep it **fast** and edge-safe (no heavy DB). Full authz still checked in server handlers.

**Q: How do you deploy Next?**  
A: Vercel is common; or Docker → Node server / ECS on [AWS](/notes/aws); or static export when no server features. Mention CI: lint, test, build, then promote.

---

## 19. Related notes

- React fundamentals → [React js](/notes/react)
- Node runtime, Express → [Node js](/notes/node)
- Databases → [Databases](/notes/databases)
- Cloud → [AWS](/notes/aws)
- Caching at scale → [Redis](/system-design/redis) and [distributed cache](/system-design/distributed-cache)
- Core Web Vitals → [Performance optimization](/notes/performance)
- Docker & CI/CD → [DevOps](/notes/devops) / [production notes](/notes/advanced-topics)
- TypeScript → [TypeScript notes](/notes/typescript)
