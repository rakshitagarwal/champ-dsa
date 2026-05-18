# Next.js Interview Guide (v13/14/15)

## 1. Next.js Basics & Framework Overview

**Definition:** Next.js is a React framework that provides server-side rendering, static site generation, routing, and full-stack capabilities out of the box.

**Key Points:**

- Built on top of React
- File-system based routing
- Automatic code splitting
- Supports SSR, SSG, ISR, and CSR
- Built-in optimization (images, fonts, scripts)
- API routes for backend functionality

**Example:**

```jsx
// app/page.js (App Router - Next.js 13+)
export default function HomePage() {
  return (
    <main>
      <h1>Welcome to Next.js</h1>
      <p>A powerful React framework for production</p>
    </main>
  );
}

// This file automatically creates the route at "/"
// No need for React Router setup!
```

---

## 2. App Router vs Pages Router

**Definition:** Next.js has two routing systems: the new App Router (app directory, Next.js 13+) and the legacy Pages Router (pages directory).

**Key Points:**

- **App Router:** Server Components by default, layouts, streaming
- **Pages Router:** Client components, traditional approach
- App Router recommended for new projects
- Can use both simultaneously during migration
- Different file conventions and features

**Example:**

```jsx
// PAGES ROUTER (Legacy - pages directory)
// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}

// pages/blog/[slug].js
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>;
}

// APP ROUTER (Modern - app directory)
// app/about/page.js
export default function About() {
  return <h1>About Page</h1>;
}

// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>;
}

// Key differences:
// Pages: One file = one route
// App: page.js inside folders = route

```

---

## 3. File-Based Routing

**Definition:** Next.js uses the file system to define routes, where the folder structure determines the URL paths.

**Key Points:**

- Files in `app` directory create routes
- `page.js` creates a route
- `layout.js` wraps multiple pages
- Dynamic routes use `[param]` brackets
- Catch-all routes use `[...param]`
- Route groups use `(folder)` for organization

**Example:**

```
app/
├── page.js                    → /
├── about/
│   └── page.js               → /about
├── blog/
│   ├── page.js               → /blog
│   └── [slug]/
│       └── page.js           → /blog/:slug
├── shop/
│   └── [...categories]/
│       └── page.js           → /shop/* (catch-all)
└── (marketing)/              → Route group (doesn't affect URL)
    ├── contact/
    │   └── page.js           → /contact
    └── careers/
        └── page.js           → /careers

```

```jsx
// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return <h1>Reading: {params.slug}</h1>;
}

// app/shop/[...categories]/page.js
export default function ShopCategories({ params }) {
  // /shop/electronics/phones → ['electronics', 'phones']
  return <div>Categories: {params.categories.join(' > ')}</div>;
}

```

---

## 4. Server Components (RSC)

**Definition:** React Server Components render on the server and send HTML to the client, reducing JavaScript bundle size and improving performance.

**Key Points:**

- Default in App Router
- No JavaScript sent to client for server components
- Can directly access backend resources (databases, APIs)
- Cannot use hooks or browser APIs
- Better performance and SEO
- Prefix with 'use server' directive (for server actions)

**Example:**

```jsx
// app/posts/page.js - Server Component (default)
async function getPosts() {
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  // This runs on the server
  // No useState, useEffect, or event handlers allowed
  return (
    <div>
      <h1>Posts (rendered on server)</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Benefits:
// ✅ Faster initial load (no JS for this component)
// ✅ Direct database access
// ✅ Better SEO
// ✅ Smaller client bundle
```

---

## 5. Client Components

**Definition:** Client Components render in the browser and can use React hooks, state, and browser APIs.

**Key Points:**

- Must add `'use client'` directive at top
- Can use useState, useEffect, event handlers
- Access to browser APIs (window, localStorage)
- Required for interactivity
- Should be used sparingly (prefer Server Components)

**Example:**

```jsx
// app/components/Counter.js - Client Component
'use client'; // This directive makes it a Client Component

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  // Can use hooks and event handlers
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// app/page.js - Server Component
import Counter from './components/Counter';

export default function Home() {
  // Server Component can import Client Components
  return (
    <div>
      <h1>My App</h1>
      <Counter /> {/* Interactive client component */}
    </div>
  );
}

// Best Practice:
// Keep Server Components at top level
// Use Client Components only where needed

```

---

## 6. Layouts

**Definition:** Layouts are UI components that wrap multiple pages and preserve state across navigation.

**Key Points:**

- Defined in `layout.js` files
- Wrap all child pages/layouts
- Persist across navigation (don't re-render)
- Can be nested
- Root layout is required (app/layout.js)
- Cannot use `useState` (use client component if needed)

**Example:**

```jsx
// app/layout.js - Root Layout (Required)
export const metadata = {
  title: 'My App',
  description: 'Created with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        {children}
        <footer>© 2024 My App</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.js - Nested Layout
export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>
        <h2>Dashboard Menu</h2>
        <ul>
          <li><a href="/dashboard">Overview</a></li>
          <li><a href="/dashboard/settings">Settings</a></li>
        </ul>
      </aside>
      <main>{children}</main>
    </div>
  );
}

// app/dashboard/page.js
export default function Dashboard() {
  return <h1>Dashboard Overview</h1>;
}

// Result: Dashboard pages have both root layout AND dashboard layout

```

---

## 7. Server-Side Rendering (SSR)

**Definition:** SSR generates HTML on the server for each request, providing fresh data and better SEO.

**Key Points:**

- HTML generated per request
- Always up-to-date data
- Slower than SSG (server processes each request)
- Good for dynamic, user-specific content
- In App Router: dynamic by default if using fetch/database

**Example:**

```jsx
// App Router - SSR (dynamic rendering)
// app/posts/[id]/page.js
async function getPost(id) {
  // This runs on every request (SSR)
  // No caching by default
  const res = await fetch(`https://api.example.com/posts/${id}`, {
    cache: 'no-store' // Force dynamic rendering
  });
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>Generated at: {new Date().toISOString()}</p>
      <div>{post.content}</div>
    </article>
  );
}

// Pages Router - SSR
// pages/posts/[id].js
export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: { post }
  };
}

export default function PostPage({ post }) {
  return <h1>{post.title}</h1>;
}

```

---

## 8. Static Site Generation (SSG)

**Definition:** SSG generates HTML at build time, creating static pages that are served quickly from CDN.

**Key Points:**

- HTML generated at build time
- Fastest page loads (served from CDN)
- Best for content that doesn't change often
- Can be combined with ISR
- In App Router: default behavior

**Example:**

```jsx
// App Router - SSG (static rendering)
// app/blog/page.js
async function getPosts() {
  // This runs at build time
  const res = await fetch('https://api.example.com/posts', {
    cache: 'force-cache' // Default in App Router
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}

// Pages Router - SSG
// pages/blog.js
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 3600 // ISR: revalidate every hour
  };
}

export default function BlogPage({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}

```

---

## 9. Incremental Static Regeneration (ISR)

**Definition:** ISR allows you to update static pages after build without rebuilding the entire site.

**Key Points:**

- Combines benefits of SSG and SSR
- Pages regenerate in background after time interval
- Serves stale content while regenerating
- Great for semi-dynamic content
- Set revalidation time in seconds

**Example:**

```jsx
// App Router - ISR
// app/products/page.js
async function getProducts() {
  const res = await fetch("https://api.example.com/products", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products (updates every 60 seconds)</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// How it works:
// 1. First request: Serves cached static page
// 2. If revalidate time passed: Triggers regeneration in background
// 3. Next request: Serves fresh page
// 4. Stale pages shown until new version ready

// Pages Router - ISR
// pages/products.js
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();

  return {
    props: { products },
    revalidate: 60, // Revalidate every 60 seconds
  };
}
```

---

## 10. Dynamic Routes & generateStaticParams

**Definition:** Dynamic routes use URL parameters, and generateStaticParams pre-generates static pages for dynamic routes at build time.

**Key Points:**

- Use `[param]` for dynamic segments
- `generateStaticParams` replaces `getStaticPaths`
- Pre-generate specific dynamic pages
- Ungenerated paths can be 404 or generated on-demand
- Multiple dynamic segments supported

**Example:**

```jsx
// app/blog/[slug]/page.js
export async function generateStaticParams() {
  // Generate static pages for these slugs at build time
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());

  return posts.map(post => ({
    slug: post.slug
  }));
}

async function getPost(slug) {
  const res = await fetch(`https://api.example.com/posts/${slug}`);
  return res.json();
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// Multiple dynamic segments
// app/shop/[category]/[product]/page.js
export async function generateStaticParams() {
  return [
    { category: 'electronics', product: 'laptop' },
    { category: 'electronics', product: 'phone' },
    { category: 'books', product: 'novel' }
  ];
}

export default function ProductPage({ params }) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
      <h2>Product: {params.product}</h2>
    </div>
  );
}

```

---

## 11. Data Fetching in App Router

**Definition:** Next.js App Router provides multiple ways to fetch data with built-in caching and revalidation.

**Key Points:**

- Use `fetch()` with extended options
- Server Components can be async
- `cache: 'force-cache'` = SSG (default)
- `cache: 'no-store'` = SSR
- `next: { revalidate }` = ISR
- Automatic request deduplication

**Example:**

```jsx
// app/users/page.js

// SSG - Cached forever (default)
async function getUsers() {
  const res = await fetch('https://api.example.com/users', {
    cache: 'force-cache' // Default, can be omitted
  });
  return res.json();
}

// SSR - No caching
async function getLiveData() {
  const res = await fetch('https://api.example.com/live', {
    cache: 'no-store' // Fetch on every request
  });
  return res.json();
}

// ISR - Revalidate periodically
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  return res.json();
}

// Tag-based revalidation
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] } // Can revalidate by tag
  });
  return res.json();
}

export default async function Page() {
  const users = await getUsers();
  const liveData = await getLiveData();
  const products = await getProducts();

  return (
    <div>
      <h1>Data Fetching Examples</h1>
      {/* Render data */}
    </div>
  );
}

// Parallel data fetching
export default async function ParallelPage() {
  // These fetch in parallel
  const [users, products] = await Promise.all([
    getUsers(),
    getProducts()
  ]);

  return <div>{/* Render */}</div>;
}

```

---

## 12. Loading UI & Streaming

**Definition:** Next.js provides built-in loading states and streaming to show UI while data loads.

**Key Points:**

- `loading.js` shows while page/layout loads
- Automatic with Suspense boundaries
- Streaming sends HTML progressively
- Better perceived performance
- Works with Server Components

**Example:**

```jsx
// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="loading-spinner">
      <p>Loading dashboard...</p>
    </div>
  );
}

// app/dashboard/page.js
async function getData() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { data: 'Dashboard data' };
}

export default async function Dashboard() {
  const data = await getData();

  return <div>{data.data}</div>;
}

// Manual Suspense boundaries for streaming
import { Suspense } from 'react';

async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <div>Slow data loaded!</div>;
}

async function FastComponent() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return <div>Fast data loaded!</div>;
}

export default function StreamingPage() {
  return (
    <div>
      <h1>Streaming Example</h1>

      {/* Fast component loads first */}
      <Suspense fallback={<div>Loading fast...</div>}>
        <FastComponent />
      </Suspense>

      {/* Slow component streams in later */}
      <Suspense fallback={<div>Loading slow...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}

```

---

## 13. Error Handling

**Definition:** Next.js provides built-in error handling with error.js files for graceful error recovery.

**Key Points:**

- `error.js` catches errors in route segment
- Must be Client Component
- Receives error and reset function
- Automatically wraps route in Error Boundary
- `global-error.js` catches errors in root layout

**Example:**

```jsx
// app/dashboard/error.js
'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

// app/dashboard/page.js
async function getData() {
  const res = await fetch('https://api.example.com/data');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Dashboard() {
  const data = await getData(); // Error caught by error.js
  return <div>{data.title}</div>;
}

// app/global-error.js - Catches errors in root layout
'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Application Error!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

```

---

## 14. Route Handlers (API Routes)

**Definition:** Route handlers are server-side endpoints to create APIs in Next.js using route.js files.

**Key Points:**

- Create in `route.js` files (App Router)
- Support GET, POST, PUT, DELETE, PATCH methods
- Can't coexist with page.js in same route
- Access request body, headers, cookies
- Return Response or NextResponse
- Replace API Routes from Pages Router

**Example:**

```jsx
// app/api/users/route.js
import { NextResponse } from "next/server";

// GET /api/users
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const users = await fetch("https://api.example.com/users").then((r) =>
    r.json(),
  );

  if (id) {
    const user = users.find((u) => u.id === id);
    return NextResponse.json(user);
  }

  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request) {
  const body = await request.json();

  // Process data
  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email,
  };

  return NextResponse.json(newUser, { status: 201 });
}

// Dynamic route handler
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const user = await fetch(`https://api.example.com/users/${params.id}`).then(
    (r) => r.json(),
  );

  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  // Delete user logic
  return NextResponse.json({ message: "User deleted" });
}

// Usage from client:
// fetch('/api/users?id=123')
// fetch('/api/users', { method: 'POST', body: JSON.stringify(data) })
```

---

## 15. Middleware

**Definition:** Middleware runs before a request is completed, allowing you to modify responses, redirect, or rewrite URLs.

**Key Points:**

- Runs on every request (or matched paths)
- Create `middleware.js` in root or src folder
- Can redirect, rewrite, set headers, handle auth
- Runs at edge (fast, globally distributed)
- Cannot use Node.js APIs (edge runtime)

**Example:**

```jsx
// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Authentication check
  const token = request.cookies.get("auth-token");

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Add custom header
  const response = NextResponse.next();
  response.headers.set("x-custom-header", "my-value");

  // Rewrite (show different page, URL stays same)
  if (pathname === "/old-path") {
    return NextResponse.rewrite(new URL("/new-path", request.url));
  }

  return response;
}

// Configure which routes middleware runs on
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/:path*"],
};

// More advanced example
export function middleware(request) {
  const response = NextResponse.next();

  // Rate limiting (simplified)
  const ip = request.ip || "unknown";
  // Check rate limit...

  // A/B testing
  const bucket = Math.random() > 0.5 ? "a" : "b";
  response.cookies.set("ab-test", bucket);

  // Geo-based redirect
  const country = request.geo?.country || "US";
  if (country === "FR" && !request.nextUrl.pathname.startsWith("/fr")) {
    return NextResponse.redirect(new URL("/fr", request.url));
  }

  return response;
}
```

---

## 16. Image Optimization

**Definition:** Next.js Image component automatically optimizes images for better performance and Core Web Vitals.

**Key Points:**

- Use `next/image` component
- Automatic lazy loading
- Serves modern formats (WebP, AVIF)
- Responsive images with srcset
- Prevents layout shift with width/height
- Optimizes on-demand (not at build time)

**Example:**

```jsx
// app/page.js
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      {/* Local image - auto width/height from import */}
      <Image
        src="/profile.jpg"
        alt="Profile"
        width={500}
        height={300}
        priority // Load eagerly (above fold)
      />

      {/* Remote image - must specify width/height */}
      <Image
        src="https://example.com/photo.jpg"
        alt="Photo"
        width={800}
        height={600}
        quality={85} // 1-100, default 75
      />

      {/* Responsive with fill */}
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        <Image
          src="/hero.jpg"
          alt="Hero"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw" // Responsive sizes
        />
      </div>

      {/* Placeholder blur */}
      <Image
        src="/photo.jpg"
        alt="Photo"
        width={600}
        height={400}
        placeholder="blur"
        blurDataURL="data:image/..." // Base64 tiny image
      />
    </div>
  );
}

// next.config.js - Configure allowed domains
module.exports = {
  images: {
    domains: ["example.com", "cdn.example.com"],
    formats: ["image/avif", "image/webp"],
  },
};
```

---

## 17. Metadata & SEO

**Definition:** Next.js provides built-in support for managing metadata, SEO tags, and Open Graph data.

**Key Points:**

- Export `metadata` object from pages/layouts
- Dynamic metadata with `generateMetadata`
- Automatic merge from layouts
- Supports Open Graph, Twitter cards
- Sitemap and robots.txt generation

**Example:**

```jsx
// app/layout.js - Static metadata
export const metadata = {
  title: 'My App',
  description: 'Best app ever',
  keywords: ['next.js', 'react', 'javascript'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'My App',
    description: 'Best app ever',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    images: ['/twitter-image.jpg'],
  }
};

// app/blog/[slug]/page.js - Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
    .then(r => r.json());

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    }
  };
}

export default async function BlogPost({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`)
    .then(r => r.json());

  return <article>{post.content}</article>;
}

// Template titles
// app/layout.js
export const metadata = {
  title: {
    template: '%s | My App',
    default: 'My App'
  }
};

// app/blog/page.js
export const metadata = {
  title: 'Blog' // Becomes "Blog | My App"
};

// Generate sitemap
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];
}

```

---

## 18. Server Actions

**Definition:** Server Actions are server-side functions that can be called directly from Client Components, simplifying form handling and mutations.

**Key Points:**

- Functions with `'use server'` directive
- Can be called from Client Components
- Automatic serialization of arguments
- Progressive enhancement (works without JS)
- Great for forms and mutations
- Next.js 13.4+ feature

**Example:**

```jsx
// app/actions.js
'use server';

import { revalidatePath } from 'next/cache';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  // Save to database
  await fetch('https://api.example.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content })
  });

  // Revalidate the posts page
  revalidatePath('/posts');

  return { success: true, message: 'Post created!' };
}

export async function deletePost(postId) {
  await fetch(`https://api.example.com/posts/${postId}`, {
    method: 'DELETE'
  });

  revalidatePath('/posts');
}

// app/posts/new/page.js
import { createPost } from '@/app/actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}

// Client Component usage
// app/components/DeleteButton.js
'use client';

import { deletePost } from '@/app/actions';
import { useState } from 'react';

export default function DeleteButton({ postId }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deletePost(postId);
    setLoading(false);
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}

// Inline server actions
export default function Page() {
  async function handleSubmit(formData) {
    'use server';
    const name = formData.get('name');
    console.log('Submitted:', name);
  }

  return (
    <form action={handleSubmit}>
      <input name="name" />
      <button>Submit</button>
    </form>
  );
}

```

---

## 19. Environment Variables

**Definition:** Environment variables store configuration and secrets securely in Next.js applications.

**Key Points:**

- `.env.local` for local development
- `NEXT_PUBLIC_` prefix for browser exposure
- Different files for environments (.env.production, .env.development)
- Never commit .env.local to git
- Loaded automatically by Next.js

**Example:**

```bash
# .env.local
DATABASE_URL="postgresql://..."
API_SECRET="secret123"

# Exposed to browser (use carefully!)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_SITE_NAME="My App"

```

```jsx
// app/page.js - Server Component
async function getData() {
  // Can access all env variables
  const res = await fetch(process.env.API_URL, {
    headers: {
      'Authorization': `Bearer ${process.env.API_SECRET}`
    }
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      {/* Can use NEXT_PUBLIC_ variables */}
      <h1>Welcome to {process.env.NEXT_PUBLIC_SITE_NAME}</h1>
    </div>
  );
}

// app/components/ClientComponent.js
'use client';

export default function ClientComponent() {
  // Only NEXT_PUBLIC_ variables available in client
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return <div>API: {apiUrl}</div>;
}

// Different environment files:
// .env                  - All environments
// .env.local            - Local (overrides .env, not committed)
// .env.development      - Development only
// .env.production       - Production only
// .env.test             - Test only

```

---

## 20. Caching Strategies

**Definition:** Next.js provides multiple caching layers to optimize performance and reduce server load.

**Key Points:**

- **Request Memoization:** Deduplicates same fetch in one render
- **Data Cache:** Persistent cache for fetch results
- **Full Route Cache:** Cached HTML/RSC for static routes
- **Router Cache:** Client-side cache of visited routes
- Control with cache options and revalidation

**Example:**

```jsx
// Request Memoization (automatic)
// app/page.js
async function getUser(id) {
  // This fetch is memoized within single request
  return fetch(`https://api.example.com/users/${id}`).then((r) => r.json());
}

export default async function Page() {
  // Both calls use same fetch result (request memoization)
  const user1 = await getUser(1);
  const user2 = await getUser(1); // Uses memoized result

  return <div>{user1.name}</div>;
}

// Data Cache Control
async function getCachedData() {
  // Cached indefinitely (default)
  const res = await fetch("https://api.example.com/data", {
    cache: "force-cache",
  });
  return res.json();
}

async function getNoCacheData() {
  // Never cached (SSR)
  const res = await fetch("https://api.example.com/data", {
    cache: "no-store",
  });
  return res.json();
}

async function getRevalidatedData() {
  // Cached with revalidation (ISR)
  const res = await fetch("https://api.example.com/data", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// Tag-based revalidation
async function getTaggedData() {
  const res = await fetch("https://api.example.com/posts", {
    next: { tags: ["posts"] },
  });
  return res.json();
}

// In server action or route handler:
import { revalidateTag, revalidatePath } from "next/cache";

export async function createPost() {
  "use server";

  // Create post...

  // Revalidate all requests with 'posts' tag
  revalidateTag("posts");

  // Or revalidate entire route
  revalidatePath("/blog");
}

// Opt out of caching for entire route
// app/dashboard/page.js
export const dynamic = "force-dynamic"; // No caching
export const revalidate = 0; // Revalidate on every request

// Full Route Cache
// Static routes are cached as HTML/RSC payload
// Dynamic routes (with cookies(), headers(), searchParams) are not cached
```

---

## 21. Parallel Routes & Intercepting Routes

**Definition:** Parallel routes render multiple pages in the same layout simultaneously. Intercepting routes show a route in a modal while preserving URL.

**Key Points:**

- **Parallel Routes:** Use `@folder` convention
- Multiple pages render in same layout
- **Intercepting Routes:** Use `(..)` convention
- Great for modals, side panels, dashboards
- Conditional rendering with slots

**Example:**

```jsx
// Parallel Routes
// app/dashboard/layout.js
export default function DashboardLayout({ children, analytics, team }) {
  return (
    <div>
      <div>{children}</div>
      <div className="sidebar">
        {team}
        {analytics}
      </div>
    </div>
  );
}

// app/dashboard/@analytics/page.js
export default function Analytics() {
  return <div>Analytics Panel</div>;
}

// app/dashboard/@team/page.js
export default function Team() {
  return <div>Team Panel</div>;
}

// app/dashboard/page.js
export default function Dashboard() {
  return <div>Main Dashboard</div>;
}

// Result: All three components render simultaneously

// Intercepting Routes (Modals)
// app/layout.js
export default function RootLayout({ children, modal }) {
  return (
    <html>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}

// app/@modal/(.)photos/[id]/page.js
// (.) intercepts same level
import Modal from '@/components/Modal';

export default function PhotoModal({ params }) {
  return (
    <Modal>
      <h1>Photo {params.id} in Modal</h1>
    </Modal>
  );
}

// app/photos/[id]/page.js
export default function PhotoPage({ params }) {
  return <h1>Full Photo Page {params.id}</h1>;
}

// Behavior:
// - Click link to /photos/1 → Shows modal (intercepted)
// - Direct navigation to /photos/1 → Shows full page
// - Refresh on /photos/1 → Shows full page

// Intercepting conventions:
// (.) same level
// (..) one level up
// (..)(..) two levels up
// (...) from root app

```

---

## 22. Route Groups

**Definition:** Route groups organize routes without affecting the URL structure using parentheses notation.

**Key Points:**

- Use `(folder)` for organization
- Don't affect URL paths
- Can have separate layouts per group
- Great for different sections (marketing, app, admin)
- Multiple root layouts possible

**Example:**

```
app/
├── (marketing)/
│   ├── layout.js          → Marketing layout
│   ├── page.js            → / (home)
│   ├── about/
│   │   └── page.js        → /about
│   └── contact/
│       └── page.js        → /contact
│
├── (shop)/
│   ├── layout.js          → Shop layout
│   ├── products/
│   │   └── page.js        → /products
│   └── cart/
│       └── page.js        → /cart
│
└── (dashboard)/
    ├── layout.js          → Dashboard layout
    ├── analytics/
    │   └── page.js        → /analytics
    └── settings/
        └── page.js        → /settings

```

```jsx
// app/(marketing)/layout.js
export default function MarketingLayout({ children }) {
  return (
    <div>
      <nav>Marketing Nav</nav>
      {children}
      <footer>Marketing Footer</footer>
    </div>
  );
}

// app/(shop)/layout.js
export default function ShopLayout({ children }) {
  return (
    <div>
      <nav>Shop Nav</nav>
      {children}
      <footer>Shop Footer</footer>
    </div>
  );
}

// Multiple root layouts (different HTML structure)
// app/(marketing)/layout.js
export default function MarketingRootLayout({ children }) {
  return (
    <html lang="en">
      <body className="marketing">
        {children}
      </body>
    </html>
  );
}

// app/(app)/layout.js
export default function AppRootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app">
        {children}
      </body>
    </html>
  );
}

```

---

## 23. Internationalization (i18n)

**Definition:** Next.js supports multiple languages and locales for building internationalized applications.

**Key Points:**

- Use `[lang]` dynamic segment for locale
- Middleware for locale detection/redirect
- Separate content per language
- Can use i18n libraries (next-intl, react-i18next)
- No built-in i18n in App Router (manual setup)

**Example:**

```jsx
// middleware.js
import { NextResponse } from 'next/server';

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if pathname has locale
  const hasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return;

  // Redirect to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)']
};

// app/[lang]/layout.js
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }, { lang: 'es' }];
}

export default function LangLayout({ children, params }) {
  return (
    <html lang={params.lang}>
      <body>{children}</body>
    </html>
  );
}

// app/[lang]/page.js
const dictionaries = {
  en: {
    welcome: 'Welcome',
    description: 'This is a Next.js app'
  },
  fr: {
    welcome: 'Bienvenue',
    description: 'Ceci est une application Next.js'
  },
  es: {
    welcome: 'Bienvenido',
    description: 'Esta es una aplicación Next.js'
  }
};

export default function HomePage({ params }) {
  const dict = dictionaries[params.lang];

  return (
    <div>
      <h1>{dict.welcome}</h1>
      <p>{dict.description}</p>
      <nav>
        <a href="/en">English</a>
        <a href="/fr">Français</a>
        <a href="/es">Español</a>
      </nav>
    </div>
  );
}

// Using next-intl library (recommended)
// app/[locale]/layout.js
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

```

---

## 24. Authentication Patterns

**Definition:** Common patterns for implementing authentication in Next.js applications.

**Key Points:**

- Middleware for route protection
- Server-side session validation
- Client-side auth state
- Popular: NextAuth.js, Clerk, Auth0
- Secure cookies for tokens
- Protected API routes

**Example:**

```jsx
// Using NextAuth.js
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  }
});

export { handler as GET, handler as POST };

// middleware.js - Protected routes
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  }
});

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};

// app/components/LoginButton.js
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return <button onClick={() => signIn('google')}>Sign in</button>;
}

// app/layout.js
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

// Protected page
// app/dashboard/page.js
import { getServerSession } from 'next-auth';

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return <h1>Welcome {session.user.name}</h1>;
}

// Manual JWT approach
// lib/auth.js
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function createToken(userId) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function getSession() {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

```

---

## 25. Deployment & Production Optimization

**Definition:** Best practices and configurations for deploying Next.js applications to production.

**Key Points:**

- Vercel (official platform) or self-hosting
- Automatic optimization in production build
- Configure `next.config.js`
- Environment variables per environment
- CDN for static assets
- Analytics and monitoring

**Example:**

```jsx
// next.config.js
module.exports = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // Compression
  compress: true,

  // Custom headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true
      }
    ];
  },

  // Rewrites (proxy)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*'
      }
    ];
  },

  // Webpack customization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      };
    }
    return config;
  }
};

// Production build commands
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}

// Self-hosting with Docker
// Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

// Performance monitoring
// app/layout.js
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

// Environment-specific configs
// .env.production
NEXT_PUBLIC_API_URL=https://api.production.com
DATABASE_URL=postgresql://prod-db...

// Vercel deployment (automatic)
// - Push to GitHub
// - Vercel auto-deploys
// - Preview deployments for PRs
// - Production deployment on main branch

// Manual deployment
// npm run build
// npm run start

// Key production optimizations:
// ✅ Image optimization
// ✅ Font optimization
// ✅ Script optimization
// ✅ Automatic code splitting
// ✅ Minification
// ✅ Tree shaking
// ✅ Compression (Gzip/Brotli)

```

---

## Quick Interview Tips

1. **App Router vs Pages Router:** App Router is newer, uses Server Components, better for new projects
2. **Rendering Methods:**
   - SSG (build time) → Fast, cached
   - SSR (request time) → Dynamic, slower
   - ISR (periodic rebuild) → Best of both
3. **When to use Server vs Client Components:**
   - Server: Default, data fetching, no interactivity
   - Client: Hooks, events, browser APIs
4. **Data Fetching Caching:**
   - `cache: 'force-cache'` → SSG
   - `cache: 'no-store'` → SSR
   - `next: { revalidate: N }` → ISR
5. **File Conventions:**
   - `page.js` → Route UI
   - `layout.js` → Shared wrapper
   - `loading.js` → Loading state
   - `error.js` → Error handling
   - `route.js` → API endpoint
6. **Metadata:** Export `metadata` object or `generateMetadata` function
7. **Route Protection:** Use middleware for auth checks before rendering
8. **Performance:** Use Image component, lazy loading, code splitting, ISR
9. **Key Features:** File-based routing, automatic optimization, hybrid rendering, built-in API routes
10. **Deployment:** Vercel (easiest), Docker (self-host), supports edge functions

Good luck with your Next.js interview! 🚀
