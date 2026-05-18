### Role: React Developer (4+ Years)

---

## 1. React JS – Core Concepts

---

### Q1. What is the Virtual DOM and how does React use it?

**Answer:**
The Virtual DOM is a lightweight in-memory representation of the real DOM. When state or props change, React:

1. Creates a new Virtual DOM tree.
2. Diffs it against the previous Virtual DOM (Reconciliation).
3. Computes the minimal set of changes.
4. Applies only those changes to the real DOM (Commit phase).

This makes UI updates efficient by avoiding full DOM re-renders.

---

### Q2. Explain the React component lifecycle (Class vs Hooks).

**Answer:**

| Lifecycle Phase | Class Component        | Hooks Equivalent                                |
| --------------- | ---------------------- | ----------------------------------------------- |
| Mount           | `componentDidMount`    | `useEffect(() => {}, [])`                       |
| Update          | `componentDidUpdate`   | `useEffect(() => {}, [dep])`                    |
| Unmount         | `componentWillUnmount` | `useEffect(() => { return () => cleanup }, [])` |

---

### Q3. What is the difference between `useMemo` and `useCallback`?

**Answer:**

- **`useMemo`** memoizes the _result_ of a computation.
- **`useCallback`** memoizes the _function reference_ itself.

```jsx
// useMemo - memoizes value
const sortedList = useMemo(() => list.sort(), [list]);

// useCallback - memoizes function
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

Use `useCallback` when passing callbacks to child components that rely on reference equality (e.g., wrapped in `React.memo`).

---

### Q4. What is `React.memo` and when should you use it?

**Answer:**`React.memo` is a Higher Order Component that prevents re-renders if props haven’t changed (shallow comparison).

```jsx
const MyComponent = React.memo(({ name }) => {
  return <div>{name}</div>;
});
```

Use it for:

- Pure functional components receiving the same props frequently.
- Expensive render operations.
- Child components in large lists.

**Avoid** overusing it — the comparison itself has a cost.

---

### Q5. Explain `useReducer` vs `useState`. When do you prefer one over the other?

**Answer:**

- **`useState`**: Best for simple, independent state values.
- **`useReducer`**: Best for complex state logic with multiple sub-values or when next state depends on the previous.

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
```

---

### Q6. What is Context API and what are its limitations?

**Answer:**
Context API provides a way to pass data through the component tree without prop drilling.

```jsx
const ThemeContext = React.createContext("light");

// Provider
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>;

// Consumer
const theme = useContext(ThemeContext);
```

**Limitations:**

- Every consumer re-renders when context value changes (even if only a small part changed).
- Not suitable for high-frequency updates (use Zustand/Redux for that).
- No built-in selector support.

---

### Q7. What are React Portals?

**Answer:**
Portals allow rendering a component outside its parent DOM hierarchy while maintaining React’s event bubbling behavior.

```jsx
ReactDOM.createPortal(child, document.getElementById("modal-root"));
```

**Common use cases:** Modals, tooltips, dropdowns that need to escape overflow:hidden or z-index stacking contexts.

---

### Q8. What is the Reconciliation algorithm in React?

**Answer:**
React uses a **Diffing Algorithm** with two assumptions:

1. Two elements of different types produce different trees.
2. The developer can hint at which child elements are stable using the `key` prop.

React compares element type → then props → then children recursively. `key` helps React identify moved items in lists without re-mounting them.

---

### Q9. What are React Concurrent Features?

**Answer:**
Introduced in React 18:

- **`useTransition`**: Marks a state update as non-urgent, keeping UI responsive.
- **`useDeferredValue`**: Defers re-rendering of a part of the UI.
- **`Suspense`**: Declaratively handles loading states for lazy-loaded components or async data.
- **Automatic Batching**: Multiple state updates in event handlers, timeouts, and promises are batched automatically.

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchQuery(input); // non-urgent update
});
```

---

### Q10. How do you handle error boundaries in React?

**Answer:**
Error boundaries are class components that catch JavaScript errors in their child tree.

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
```

Note: There’s no hooks equivalent yet; class components are required for error boundaries.

---

### Q11. Explain code splitting and lazy loading in React.

**Answer:**

```jsx
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

Route-based splitting with React Router is the most effective strategy to reduce initial bundle size.

---

### Q12. What is prop drilling and how do you avoid it?

**Answer:**
Prop drilling is passing props through multiple intermediate components that don’t use them.

**Solutions:**

- **Context API** for low-frequency global state (theme, locale, user).
- **State management libraries** (Redux, Zustand, Jotai) for app-wide state.
- **Component composition** — pass components as props or children.

---

## 2. Next JS

---

### Q13. What are the rendering strategies in Next.js?

**Answer:**

| Strategy          | Function                        | When to Use                 |
| ----------------- | ------------------------------- | --------------------------- |
| SSG (Static)      | `getStaticProps`                | Blog posts, marketing pages |
| ISR (Incremental) | `getStaticProps` + `revalidate` | Semi-dynamic data           |
| SSR (Server)      | `getServerSideProps`            | Per-request dynamic data    |
| CSR (Client)      | `useEffect` / SWR               | User-specific, private data |

In **App Router (Next 13+)**, components are Server Components by default; use `"use client"` for client-side logic.

---

### Q14. What is the difference between App Router and Pages Router?

**Answer:**

|               | Pages Router                           | App Router (Next 13+)       |
| ------------- | -------------------------------------- | --------------------------- |
| Directory     | `/pages`                               | `/app`                      |
| Default       | Client Components                      | Server Components           |
| Data Fetching | `getServerSideProps`, `getStaticProps` | `async/await` in components |
| Layouts       | Manual                                 | Built-in nested layouts     |
| Streaming     | Limited                                | Full support via Suspense   |

---

### Q15. What are Server Components vs Client Components?

**Answer:**

- **Server Components**: Render on the server. Can fetch data directly, access backend resources, reduce client JS bundle. Cannot use hooks or browser APIs.
- **Client Components**: Render on the client. Can use hooks, event handlers, browser APIs. Marked with `"use client"`.

```jsx
// Server Component (default)
async function ProductList() {
  const products = await fetchProducts(); // direct server fetch
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

---

### Q16. How does Next.js handle image optimization?

**Answer:**
The `<Image>` component from `next/image`:

- Automatically serves images in modern formats (WebP, AVIF).
- Lazy loads images by default.
- Prevents Cumulative Layout Shift (CLS) with explicit width/height.
- Resizes images on-demand via a built-in image optimization API.

```jsx
import Image from "next/image";
<Image src="/hero.jpg" width={800} height={600} alt="Hero" priority />;
```

---

### Q17. What is middleware in Next.js and what can you use it for?

**Answer:**
Middleware runs before a request is completed, at the Edge.

```jsx
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token) return NextResponse.redirect(new URL('/login', request.url));
  return NextResponse.next();
}
```

**Use cases:** Authentication, A/B testing, geolocation redirects, request rewriting.

---

### Q18. Explain Next.js file-based routing, including dynamic routes.

**Answer:**

```
/app
  /page.tsx          → /
  /about/page.tsx    → /about
  /blog/[slug]/page.tsx   → /blog/:slug
  /shop/[...params]/page.tsx → /shop/*
  /(auth)/login/page.tsx   → /login (route group, no URL segment)
```

Dynamic routes use `params` prop:

```jsx
export default function BlogPost({ params }) {
  return <h1>{params.slug}</h1>;
}
```

---

## 3. HTML, Modular CSS & JavaScript

---

### Q19. What is CSS Modules and how does it prevent style conflicts?

**Answer:**
CSS Modules scope class names locally by transforming them to unique identifiers at build time.

```css
/* Button.module.css */
.button {
  background: blue;
}
```

```jsx
import styles from "./Button.module.css";
<button className={styles.button}>Click</button>;
// Renders as: <button class="Button_button__xK2j9">
```

This eliminates global namespace pollution without needing BEM or other conventions.

---

### Q20. What is the difference between `==` and `===` in JavaScript?

**Answer:**

- `==` (Loose equality): Performs type coercion before comparison.
- `===` (Strict equality): No type coercion; both value and type must match.

```jsx
0 == "0"; // true  (coercion)
0 === "0"; // false (different types)
null == undefined; // true
null === undefined; // false
```

Always prefer `===` in production code.

---

### Q21. Explain closures and give a practical React example.

**Answer:**
A closure is a function that retains access to its outer scope even after the outer function has returned.

```jsx
// Classic closure issue in React
useEffect(() => {
  const id = setInterval(() => {
    console.log(count); // stale closure — always logs initial value
  }, 1000);
  return () => clearInterval(id);
}, []); // missing `count` in deps
```

**Fix:** Add `count` to the dependency array, or use a ref.

---

### Q22. What is event delegation and why is it useful?

**Answer:**
Event delegation attaches a single event listener to a parent element to handle events from multiple children via event bubbling.

```jsx
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log(e.target.textContent);
  }
});
```

**Benefits:** Better performance with large lists; works with dynamically added elements.

---

### Q23. What are Web Vitals and which HTML/CSS practices impact them?

**Answer:**

| Metric  | What It Measures                           | Key Fixes                          |
| ------- | ------------------------------------------ | ---------------------------------- |
| LCP     | Largest Contentful Paint (load speed)      | Preload fonts, optimize images     |
| CLS     | Cumulative Layout Shift (visual stability) | Set explicit width/height on media |
| FID/INP | Interactivity                              | Minimize long tasks, code split    |
| TTFB    | Server response time                       | SSR/CDN, caching                   |

---

## 4. Testing – Jest & Mocha

---

### Q24. What is the difference between unit, integration, and E2E testing?

**Answer:**

- **Unit**: Tests a single function/component in isolation. (Jest + React Testing Library)
- **Integration**: Tests how multiple units work together. (Jest + MSW for API mocking)
- **E2E**: Tests the full user flow in a real browser. (Cypress, Playwright)

---

### Q25. How do you test a React component with Jest and React Testing Library?

**Answer:**

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("increments counter on button click", () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /increment/i });
  fireEvent.click(button);
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

**Key principle:** Test behavior, not implementation. Use `getByRole`, `getByText` over `getByTestId`.

---

### Q26. How do you mock API calls in Jest?

**Answer:**

```jsx
// Using jest.fn()
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({ data: "mocked" }) }),
);

// Using jest.mock for modules
jest.mock("../api/users", () => ({
  fetchUsers: jest.fn().mockResolvedValue([{ id: 1, name: "Alice" }]),
}));
```

For more realistic mocking, use **MSW (Mock Service Worker)** which intercepts at the network level.

---

### Q27. What is snapshot testing and when should you use it?

**Answer:**
Snapshot testing captures the rendered output of a component and compares it on subsequent runs.

```jsx
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<Button label="Submit" />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

**Use for:** Stable UI components where you want to detect unintended changes.
**Avoid for:** Highly dynamic or data-driven components — snapshots become noisy and lose value.

---

### Q28. What is code coverage and what’s a good coverage target?

**Answer:**
Code coverage measures what percentage of your code is executed during tests.

```bash
jest --coverage
```

Coverage types: **Statements**, **Branches**, **Functions**, **Lines**.

A target of **70–80%** is practical for most projects. 100% coverage doesn’t guarantee bug-free code — focus on critical paths, edge cases, and business logic.

---

## 5. Performance & DevTools

---

### Q29. How do you use Chrome DevTools to diagnose performance issues?

**Answer:**

- **Performance Tab**: Record and analyze runtime performance. Look for long tasks (>50ms), layout thrashing, and paint events.
- **Network Tab**: Identify large assets, waterfall bottlenecks, and slow API calls.
- **Coverage Tab**: Find unused JS and CSS.
- **Memory Tab**: Detect memory leaks using heap snapshots.
- **Lighthouse**: Run audits for Performance, Accessibility, SEO, Best Practices.

---

### Q30. What is Lighthouse and what does it audit?

**Answer:**
Lighthouse is an automated tool for improving web page quality. It audits:

- **Performance**: LCP, FID, CLS, TTI, Speed Index.
- **Accessibility**: ARIA, color contrast, semantic HTML.
- **Best Practices**: HTTPS, modern APIs, no deprecated features.
- **SEO**: Meta tags, crawlability.
- **PWA**: Offline support, manifest.

Run via Chrome DevTools > Lighthouse tab, or `npx lighthouse <url>`.

---

### Q31. What optimizations would you make for a slow React app?

**Answer:**

1. **Code splitting** with `React.lazy` + `Suspense`.
2. **Memoization** with `React.memo`, `useMemo`, `useCallback`.
3. **Virtualize long lists** with `react-window` or `react-virtual`.
4. **Debounce/throttle** expensive event handlers.
5. **Avoid anonymous functions** in render to prevent unnecessary re-renders.
6. **Optimize images** — use WebP, proper sizing, lazy loading.
7. **Bundle analysis** with `webpack-bundle-analyzer`.
8. **Prefetch/preload** critical resources.

---

### Q32. What is WebPageTest and how is it different from Lighthouse?

**Answer:**

|                    | Lighthouse               | WebPageTest                           |
| ------------------ | ------------------------ | ------------------------------------- |
| Environment        | Local browser            | Real browsers across global locations |
| Focus              | Best practices & scoring | Deep performance waterfall analysis   |
| Filmstrip          | No                       | Yes (visual progress frames)          |
| Multi-step         | No                       | Yes (scripted tests)                  |
| Network simulation | Basic throttling         | Precise network profiles              |

Use WebPageTest for real-world performance analysis from different geographies and network conditions.

---

## 6. System Design & Architecture

---

### Q33. How would you architect a large-scale React application?

**Answer:**

```
src/
├── app/           # App-level setup (router, providers, store)
├── features/      # Feature-based modules (auth, dashboard, products)
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       └── store/
├── shared/        # Reusable components, utils, types
│   ├── components/
│   ├── hooks/
│   └── utils/
└── lib/           # Third-party library wrappers
```

- **Feature-first** folder structure over type-first.
- Separate business logic from UI using custom hooks.
- Use a component library + design tokens for consistency.

---

### Q34. How would you implement authentication in a Next.js app?

**Answer:**

- Use **NextAuth.js** (Auth.js) for OAuth and credential-based auth.
- Store session in **HTTP-only cookies** (not localStorage) to prevent XSS.
- Protect routes using **Next.js Middleware**.
- Refresh tokens server-side; never expose access tokens to the client.

```jsx
// middleware.ts
export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard/:path*"] };
```

---

## 7. Behavioral / Experience Questions

---

### Q35. Tell me about a performance issue you solved in a React app.

**Tip:** Use the STAR format (Situation → Task → Action → Result).

**Example Answer:**

> “In a dashboard project, the UI was freezing when rendering 5,000 rows in a data table. I profiled it using Chrome DevTools’ Performance tab and found the issue was React re-rendering every row on any state change. I implemented `react-window` for list virtualization, added `React.memo` on row components, and moved filter state to a debounced local state. The render time dropped from ~2s to under 100ms.”

---

### Q36. How do you ensure code quality in a team?

**Answer:**

- **ESLint + Prettier** for consistent formatting and linting.
- **TypeScript** for type safety.
- **Code reviews** with a checklist (performance, accessibility, test coverage).
- **Husky + lint-staged** pre-commit hooks.
- **CI/CD** pipeline running tests and linting on every PR.
- **Component documentation** with Storybook.

---

### Q37. How do you stay updated with the React ecosystem?

**Answer:**

- Follow the official React blog and RFC discussions on GitHub.
- Read the Next.js changelog for framework updates.
- Subscribe to newsletters: This Week in React, JavaScript Weekly.
- Engage with community: X (Twitter), Discord, DEV.to.

---

## 📋 Quick Revision Checklist

- [ ] React Hooks: useState, useEffect, useCallback, useMemo, useRef, useReducer, useContext
- [ ] React 18: Concurrent features, Suspense, automatic batching
- [ ] Next.js: SSG vs SSR vs ISR vs CSR, App Router, Server Components
- [ ] CSS Modules, BEM, CSS-in-JS trade-offs
- [ ] JavaScript: Closures, event loop, promises, async/await, prototypes
- [ ] Jest: unit tests, mocking, snapshot testing, coverage
- [ ] Performance: Web Vitals, Lighthouse score improvement, bundle optimization
- [ ] DevTools: Performance tab, Memory tab, Network analysis

---

> 💡 **Pro Tip:** For a 4+ years role, interviewers expect you to go beyond syntax. Be ready to discuss _why_ you chose a particular approach, trade-offs between solutions, and how you’ve applied these in real projects.

---

_Good luck with your interview! 🎯_
