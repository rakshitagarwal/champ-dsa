# Interview Revision Questions

> Checklist for fullstack / MERN / frontend / backend interviews. Each item has a **hint** (what to cover) and **Read** links into notes that already explain the answer. Do not memorize this page alone — open the links and say the answer out loud.

---

## 1. JavaScript Core

**Q: var vs let vs const?**  
Hint: Scope, hoisting, temporal dead zone.  
Read: [var / let / const](/notes/javascript#2-var-let-const) · [Hoisting](/notes/javascript#3-hoisting)

**Q: Explain closures with a use case.**  
Hint: Data privacy, function factories, and the stale-closure gotcha in React.  
Read: [Scope & Closures](/notes/javascript#4-scope-closures) · [React useEffect patterns](/notes/react#10-useeffect) · [JD Q&A](/notes/javascript#36-javascript-full-stack-jd-interview-qa)

**Q: How does the event loop work?**  
Hint: Call stack, microtask queue (promises), macrotask queue (setTimeout), and the order of execution.  
Read: [Event Loop](/notes/javascript#8-event-loop) · [Execution Context & Call Stack](/notes/javascript#12-execution-context-call-stack)

**Q: Promise vs async/await, and Promise.all vs allSettled vs race?**  
Hint: Error handling with try/catch.  
Read: [Promises](/notes/javascript#9-promises) · [async / await](/notes/javascript#10-async-await) · [Error Handling](/notes/javascript#23-error-handling)

**Q: == vs ===, null vs undefined?**  
Hint: Type coercion pitfalls; prefer strict equality.  
Read: [Type Coercion](/notes/javascript#29-type-coercion) · [Data Types](/notes/javascript#1-data-types) · [JD Q&A](/notes/javascript#36-javascript-full-stack-jd-interview-qa)

**Q: What is this, and how do call/apply/bind differ?**  
Hint: Arrow functions and lexical this.  
Read: [this Keyword](/notes/javascript#5-this-keyword) · [call, apply, bind](/notes/javascript#35-call-apply-bind)

**Q: Prototypal inheritance and the prototype chain?**  
Hint: `__proto__` vs `prototype`, classes as sugar.  
Read: [Prototype & Prototype Chain](/notes/javascript#6-prototype-prototype-chain) · [Classes](/notes/javascript#7-classes)

**Q: Debounce vs throttle?**  
Hint: Search input and scroll examples.  
Read: [Debounce & Throttle](/notes/javascript#14-debounce-throttle)

**Q: Shallow vs deep copy?**  
Hint: Spread, `structuredClone`, nested reference pitfalls.  
Read: [Spread & Rest](/notes/javascript#17-spread-rest) · [JD Q&A](/notes/javascript#36-javascript-full-stack-jd-interview-qa)

**Q: Map, filter, reduce, and other array methods?**  
Hint: Be ready to write a small reduce.  
Read: [Array Methods](/notes/javascript#28-array-methods-important)

---

## 2. TypeScript

**Q: interface vs type?**  
Hint: Extending, unions, declaration merging.  
Read: [type vs interface](/notes/typescript#type-vs-interface)

**Q: any vs unknown vs never?**  
Hint: When each is correct; prefer unknown over any.  
Read: [any, unknown, never](/notes/typescript#any-unknown-never)

**Q: What are generics?**  
Hint: A reusable function or API response type example.  
Read: [Generics](/notes/typescript#generics)

**Q: Utility types: Partial, Pick, Omit, Record, Required?**  
Hint: Memorize and give one real DTO example.  
Read: [Utility types](/notes/typescript#utility-types-memorize-these)

**Q: How do you type API responses, request bodies, and Express handlers?**  
Hint: Validate at edges; typed req after Zod/Joi.  
Read: [Runtime is still JavaScript](/notes/typescript#runtime-is-still-javascript) · [TS Full Stack Q&A](/notes/typescript#typescript-full-stack-jd-interview-qa) · [Node validation](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe)

**Q: Type narrowing and type guards?**  
Hint: `typeof`, `in`, discriminated unions.  
Read: [Narrowing](/notes/typescript#narrowing-how-ts-gets-smart) · [Discriminated unions](/notes/typescript#discriminated-unions)

**Q: Enums vs union literal types?**  
Hint: Prefer string unions for most app code.  
Read: [Functions, optional, and literals](/notes/typescript#functions-optional-and-literals) · [TS checklist](/notes/typescript#interview-checklist)

---

## 3. Node.js

**Q: How does Node handle concurrency if it's single-threaded?**  
Hint: Event loop, libuv, thread pool.  
Read: [What is Node.js](/notes/node#1-what-is-nodejs) · [Architecture](/notes/node#2-nodejs-architecture) · [Event Loop](/notes/node#3-event-loop)

**Q: What is middleware in Express?**  
Hint: Order matters, `next()`, error-handling middleware with 4 args.  
Read: [Middleware](/notes/node#20-middleware) · [Express basics](/notes/node#19-expressjs-basics)

**Q: process.nextTick vs setImmediate vs setTimeout?**  
Hint: Priority and when each fires.  
Read: [nextTick vs setImmediate vs setTimeout](/notes/node#4-processnexttick-vs-setimmediate-vs-settimeout)

**Q: Streams and buffers?**  
Hint: Handling large file uploads and downloads.  
Read: [Streams](/notes/node#10-streams) · [Buffer](/notes/node#12-buffer) · [Streams & Piping in HTTP](/notes/node#24-streams-piping-in-http)

**Q: CommonJS vs ES Modules?**  
Hint: `require` vs `import`, `"type": "module"`.  
Read: [Modules System](/notes/node#5-modules-system) · [JS Modules (ESM)](/notes/javascript#25-modules-esm)

**Q: How do you handle errors globally?**  
Hint: Central error handler, `unhandledRejection`, `uncaughtException`.  
Read: [Error Handling](/notes/node#13-error-handling) · [Middleware](/notes/node#20-middleware)

**Q: Cluster vs worker threads vs child processes?**  
Hint: CPU-bound tasks and multi-core scaling.  
Read: [Child Processes](/notes/node#14-child-processes) · [Cluster](/notes/node#15-cluster-module) · [Worker Threads](/notes/node#16-worker-threads)

**Q: How do you manage environment variables and config?**  
Hint: dotenv, per-environment configs, never commit secrets.  
Read: [Environment Variables](/notes/node#18-environment-variables) · [Config & secrets](/notes/devops#16-configuration-secrets)

**Q: Authentication: JWT vs session-based?**  
Hint: Access and refresh tokens, cookie storage (httpOnly) vs localStorage.  
Read: [Authentication & JWT](/notes/node#23-authentication-jwt) · [Auth sessions/JWT/OAuth](/notes/advanced-topics#auth-sessions-jwt-oauth)

**Q: How do you secure a Node app?**  
Hint: Helmet, CORS, rate limiting, input validation (Joi/Zod), bcrypt, avoiding injection.  
Read: [Security Best Practices](/notes/node#27-security-best-practices) · [Security list](/notes/advanced-topics#security-the-boring-list-that-gets-you-hired)

**Q: File upload handling?**  
Hint: Multer, S3 uploads, size and type limits.  
Read: [Streams & Piping in HTTP](/notes/node#24-streams-piping-in-http) · [S3 storage](/notes/aws#5-s3-storage-very-common-in-full-stack-jds) · [Node JD Q&A](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe)

**Q: How do you structure a Node project?**  
Hint: Routes, controllers, services, models, and why layering matters.  
Read: [Node JD Q&A — folder structure](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe) · [Express basics](/notes/node#19-expressjs-basics)

---

## 4. REST APIs and Backend Architecture

**Q: What makes an API RESTful?**  
Hint: Statelessness, resource-based URLs, proper verbs.  
Read: [REST API Design Principles](/notes/node#22-rest-api-design-principles)

**Q: PUT vs PATCH, and idempotency?**  
Hint: Full vs partial replace; safe retries.  
Read: [REST API Design Principles](/notes/node#22-rest-api-design-principles) · [API habits](/notes/advanced-topics#api-habits-seniors-get-asked)

**Q: Common status codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500?**  
Hint: Know when each applies.  
Read: [REST API Design Principles](/notes/node#22-rest-api-design-principles) · [Node JD Q&A](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe)

**Q: How do you version, paginate, filter, and sort APIs?**  
Hint: Offset vs cursor pagination.  
Read: [API habits](/notes/advanced-topics#api-habits-seniors-get-asked) · [Databases pagination Q&A](/notes/databases#43-node-full-stack-jd-database-interview-qa)

**Q: How do you integrate a third-party API reliably?**  
Hint: Timeouts, retries with backoff, error mapping, webhooks.  
Read: [Node JD Q&A](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe) · [API habits](/notes/advanced-topics#api-habits-seniors-get-asked)

**Q: REST vs GraphQL?**  
Hint: Over-fetching and under-fetching.  
Read: [GraphQL in microservices](/notes/microservices#6-graphql-in-a-microservices-world)

**Q: How do you implement role-based access control?**  
Hint: AuthN vs AuthZ; check permission on every resource.  
Read: [Auth sessions/JWT/OAuth](/notes/advanced-topics#auth-sessions-jwt-oauth) · [Security list](/notes/advanced-topics#security-the-boring-list-that-gets-you-hired)

**Q: Caching: Redis, HTTP cache headers, cache invalidation?**  
Hint: Cache-aside, TTL, when Redis is wrong.  
Read: [Caching](/notes/node#26-caching) · [API & network](/notes/performance#6-api-network)

**Q: Monolith vs microservices? Message queues for background jobs?**  
Hint: RabbitMQ, SQS, BullMQ, Kafka/NATS.  
Read: [What are microservices](/notes/microservices#1-what-are-microservices) · [Event-driven architecture](/notes/microservices#7-event-driven-architecture-eda) · [Kafka](/notes/microservices#8-kafka-in-microservices) · [NATS](/notes/microservices#9-nats-in-microservices)

**Q: How do you improve API performance?**  
Hint: Indexing, caching, pagination, avoiding N+1, compression.  
Read: [Performance & Scaling](/notes/node#30-performance-scaling) · [Backend & Node](/notes/performance#4-backend-nodejs) · [Database performance](/notes/performance#5-database-performance)

---

## 5. React.js / Next.js

### React

**Q: Virtual DOM and reconciliation? Why keys matter in lists?**  
Hint: Diffing, stable keys vs index.  
Read: [Virtual DOM](/notes/react#2-virtual-dom) · [Reconciliation](/notes/react#26-reconciliation) · [Keys](/notes/react#25-keys)

**Q: useState vs useReducer, useEffect vs useLayoutEffect?**  
Hint: When complex state or sync DOM reads need each.  
Read: [useState](/notes/react#9-usestate) · [useReducer](/notes/react#12-usereducer) · [useEffect](/notes/react#10-useeffect) · [useLayoutEffect](/notes/react#16-uselayouteffect)

**Q: useEffect dependency array: cleanup, infinite loops, stale closures?**  
Hint: Common bugs and fixes.  
Read: [useEffect](/notes/react#10-useeffect) · [Common Interview Patterns](/notes/react#37-common-interview-patterns)

**Q: useMemo, useCallback, React.memo: when to use them and when not to?**  
Hint: Measure first; avoid cargo-cult memo.  
Read: [useMemo](/notes/react#14-usememo) · [useCallback](/notes/react#15-usecallback) · [React.memo](/notes/react#18-reactmemo) · [Performance summary](/notes/react#31-performance-optimization-summary)

**Q: Controlled vs uncontrolled components?**  
Hint: Forms, refs, file inputs.  
Read: [Controlled vs Uncontrolled](/notes/react#21-controlled-vs-uncontrolled-components)

**Q: State management: Context API vs Redux Toolkit vs Zustand? Prop drilling?**  
Hint: Client vs server state; when Context is enough.  
Read: [Context API](/notes/react#19-context-api) · [Zustand vs Redux Toolkit](/notes/react#39-client-state-zustand-vs-redux-toolkit) · [React Query](/notes/react#40-server-state-react-query-tanstack-query) · [Lifting State Up](/notes/react#36-lifting-state-up)

**Q: Custom hooks: be ready to write one (useDebounce, useFetch).**  
Hint: Extract reusable stateful logic.  
Read: [Custom Hooks](/notes/react#17-custom-hooks) · [Debounce](/notes/javascript#14-debounce-throttle)

**Q: How do you optimize React performance?**  
Hint: Code splitting, lazy loading, memoization, list virtualization.  
Read: [lazy & Suspense](/notes/react#20-reactlazy-suspense-code-splitting) · [Performance summary](/notes/react#31-performance-optimization-summary) · [Frontend bundle](/notes/performance#3-frontend-bundle-rendering)

**Q: How do you handle forms and validation?**  
Hint: React Hook Form, Zod/Yup (pattern + controlled forms).  
Read: [Controlled vs Uncontrolled](/notes/react#21-controlled-vs-uncontrolled-components) · [React Full Stack Q&A](/notes/react#42-react-full-stack-jd-interview-qa-23-yoe) · [TS at boundaries](/notes/typescript#runtime-is-still-javascript)

### Next.js

**Q: CSR vs SSR vs SSG vs ISR? When to use each?**  
Hint: Marketing vs dashboard vs personalization.  
Read: [Rendering strategies](/notes/next#7-rendering-strategies) · [Common interview questions](/notes/next#16-common-interview-questions)

**Q: App Router vs Pages Router? Server Components vs Client Components?**  
Hint: `"use client"` only where needed.  
Read: [App Router vs Pages Router](/notes/next#2-app-router-vs-pages-router) · [Server Components](/notes/next#4-server-components-rsc) · [Client Components](/notes/next#5-client-components)

**Q: Data fetching in Next.js?**  
Hint: fetch caching, server actions, `getServerSideProps` in the older router.  
Read: [Data fetching & caching](/notes/next#8-data-fetching-caching) · [Server Actions](/notes/next#9-server-actions) · [Common interview questions](/notes/next#16-common-interview-questions)

**Q: API routes / route handlers, middleware, dynamic routes?**  
Hint: BFF vs separate Node API.  
Read: [Route Handlers](/notes/next#10-route-handlers-api-routes) · [Middleware](/notes/next#11-middleware) · [File-based routing](/notes/next#3-file-based-routing-app-router) · [Next JD Q&A](/notes/next#18-nextjs-full-stack-jd-extra-qa-23-yoe)

**Q: SEO in Next.js?**  
Hint: Metadata API, `next/image`, `next/link`.  
Read: [Metadata & SEO](/notes/next#12-metadata-seo) · [Image & font optimization](/notes/next#13-image-font-optimization)

**Q: How do you handle authentication in Next.js?**  
Hint: NextAuth/Auth.js patterns, protected routes via middleware.  
Read: [Next common interview questions](/notes/next#16-common-interview-questions) · [Next JD Q&A](/notes/next#18-nextjs-full-stack-jd-extra-qa-23-yoe) · [Auth sessions/JWT/OAuth](/notes/advanced-topics#auth-sessions-jwt-oauth)

---

## 6. Databases

### MongoDB

**Q: When to choose MongoDB over SQL?**  
Hint: Flexible documents, embed patterns, scale story.  
Read: [Why use MongoDB](/notes/databases#8-why-use-mongodb) · [SQL vs NoSQL](/notes/databases#1-sql-vs-nosql) · [Which DB framework](/notes/databases#40-which-database-would-you-choose-framework)

**Q: Embedding vs referencing documents?**  
Hint: 1:few embed; unbounded/many:many reference.  
Read: [Embedding vs referencing](/notes/databases#9-embedding-vs-referencing)

**Q: Indexes: compound, text, TTL. Using explain()?**  
Hint: ESR rule, avoid collection scans.  
Read: [Indexes in MongoDB](/notes/databases#12-indexes-in-mongodb) · [Indexing overview](/notes/databases#4-indexing-all-three)

**Q: Aggregation pipeline: $match, $group, $lookup, $project?**  
Hint: Match early; know when lookup vs embed.  
Read: [Aggregation pipeline](/notes/databases#11-aggregation-pipeline)

**Q: Mongoose: schemas, middleware, populate, virtuals, lean queries?**  
Hint: N+1 with populate; lean for read APIs.  
Read: [Database Interaction (Mongoose)](/notes/node#25-database-interaction) · [Databases Node Q&A](/notes/databases#43-node-full-stack-jd-database-interview-qa)

### MySQL / PostgreSQL

**Q: Joins: INNER, LEFT, RIGHT. Write a query with a JOIN and GROUP BY.**  
Hint: Practice aloud with employees/orders style tables.  
Read: [JOINs](/notes/sql#11-joins) · [GROUP BY & HAVING](/notes/sql#9-group-by-having) · [Core SQL mental model](/notes/databases#19-core-sql-mental-model)

**Q: Indexes, primary/foreign keys, normalization vs denormalization?**  
Hint: Trade reads vs writes; when to denormalize.  
Read: [Indexes](/notes/sql#19-indexes) · [Constraints](/notes/sql#4-constraints) · [Normalization](/notes/sql#23-normalization) · [Norm vs denorm](/notes/databases#5-normalization-vs-denormalization)

**Q: ACID properties and transactions?**  
Hint: Isolation levels at a high level.  
Read: [ACID Properties](/notes/sql#22-acid-properties) · [Transactions](/notes/sql#21-transactions) · [ACID (databases)](/notes/databases#2-acid)

**Q: WHERE vs HAVING? DELETE vs TRUNCATE vs DROP?**  
Hint: Filter before vs after aggregation; DDL vs DML.  
Read: [GROUP BY & HAVING](/notes/sql#9-group-by-having) · [UPDATE & DELETE](/notes/sql#7-update-delete) · [MySQL quick FAQ](/notes/databases#26-mysql-quick-faq)

**Q: How do you find and fix a slow query?**  
Hint: EXPLAIN, indexing, avoid SELECT *.  
Read: [EXPLAIN](/notes/sql#20-explain-query-analysis) · [Performance Tips](/notes/sql#27-performance-tips) · [Database performance](/notes/performance#5-database-performance)

**Q: SQL vs NoSQL trade-offs? ORMs (Prisma, Sequelize, TypeORM)?**  
Hint: Choose from data shape and consistency needs.  
Read: [NoSQL vs SQL](/notes/sql#28-nosql-vs-sql-quick-reference) · [SQL vs NoSQL](/notes/databases#1-sql-vs-nosql) · [Databases Node Q&A](/notes/databases#43-node-full-stack-jd-database-interview-qa)

---

## 7. Git and GitHub/GitLab

**Q: merge vs rebase?**  
Hint: History shape; don't rebase shared main.  
Read: [Git & GitHub/GitLab Q&A](/notes/devops#23-git-githubgitlab-jd-interview-qa) · [Version control & branching](/notes/devops#5-version-control-branching)

**Q: How do you resolve merge conflicts?**  
Hint: Pull latest, fix files, test, continue.  
Read: [Git & GitHub/GitLab Q&A](/notes/devops#23-git-githubgitlab-jd-interview-qa)

**Q: git stash, cherry-pick, reset vs revert?**  
Hint: Undo safely on shared branches.  
Read: [Git & GitHub/GitLab Q&A](/notes/devops#23-git-githubgitlab-jd-interview-qa)

**Q: Your branching strategy? Feature branches, PR workflow, code review practices?**  
Hint: Trunk-based or GitFlow; small PRs.  
Read: [Version control & branching](/notes/devops#5-version-control-branching) · [Git Q&A](/notes/devops#23-git-githubgitlab-jd-interview-qa) · [Code review](/notes/node#34-full-stack-collaboration-answers-soft-but-asked)

---

## 8. HTML, CSS, Responsive Design

**Q: Semantic HTML and why it matters?**  
Hint: Accessibility and SEO.  
Read: [Semantic HTML Tags](/notes/html-css#4-semantic-html-tags) · [Accessibility](/notes/html-css#9-accessibility-a11y)

**Q: Flexbox vs Grid?**  
Hint: 1D vs 2D layouts.  
Read: [Flexbox](/notes/html-css#19-flexbox) · [CSS Grid](/notes/html-css#20-css-grid) · [Common patterns](/notes/html-css#35-common-interview-patterns)

**Q: CSS specificity and the box model?**  
Hint: Cascade conflicts; `border-box`.  
Read: [Specificity](/notes/html-css#14-specificity) · [Box Model](/notes/html-css#16-box-model)

**Q: position values: relative, absolute, fixed, sticky?**  
Hint: Containing block and scroll behavior.  
Read: [Position Property](/notes/html-css#18-position-property)

**Q: Mobile-first design, media queries, rem vs em vs px?**  
Hint: Fluid layouts and type scale.  
Read: [Responsive Design & Media Queries](/notes/html-css#23-responsive-design-media-queries) · [CSS Units](/notes/html-css#21-css-units) · [HTML/CSS JD Q&A](/notes/html-css#36-htmlcss-full-stack-jd-interview-qa)

**Q: Tailwind vs CSS Modules vs styled-components?**  
Hint: Pick team standard; avoid global leaks.  
Read: [HTML/CSS JD Q&A](/notes/html-css#36-htmlcss-full-stack-jd-interview-qa)

---

## 9. Preferred Skills: AWS, Docker, CI/CD, Agile

**Q: AWS services you've used: EC2, S3, RDS, Lambda, CloudFront, IAM?**  
Hint: Know what each did in your project.  
Read: [Core services map](/notes/aws#2-core-services-map-what-full-stack-interviews-expect) · [EC2](/notes/aws#4-ec2-compute) · [S3](/notes/aws#5-s3-storage-very-common-in-full-stack-jds) · [RDS](/notes/aws#6-rds-mysql-postgresql) · [Lambda](/notes/aws#9-lambda-api-gateway-serverless-path) · [IAM](/notes/aws#8-iam-security-interview-favorite) · [AWS JD Q&A](/notes/aws#15-full-stack-jd-interview-qa)

**Q: Docker: image vs container, Dockerfile basics, docker-compose, why use it?**  
Hint: Same artifact across environments.  
Read: [Containers & Docker](/notes/devops#6-containers-docker) · [Docker (advanced-topics)](/notes/advanced-topics#docker) · [Docker & CI/CD Q&A](/notes/devops#25-docker-cicd-preferred-skill-qa-full-stack)

**Q: CI/CD: explain a pipeline (lint → test → build → deploy)?**  
Hint: GitHub Actions or GitLab CI story.  
Read: [CI/CD (DevOps)](/notes/devops#4-cicd) · [CI/CD (advanced-topics)](/notes/advanced-topics#cicd) · [CI/CD with AWS](/notes/aws#13-cicd-with-aws)

**Q: Agile/Scrum: sprint, standup, retrospective, story points, your role?**  
Hint: Practical answers, not buzzwords.  
Read: [Agile / Scrum Q&A](/notes/devops#24-agile-scrum-jd-interview-qa)

---

## 10. Scenario and Behavioral Questions

**Q: Walk me through your latest project: architecture, your role, tech stack, challenges.**  
Hint: 2-minute architecture story; your ownership; one hard tradeoff.  
Read: [STAR stories](/notes/advanced-topics#stories-interviewers-want-star) · [Typical Node app on AWS](/notes/aws#3-typical-nodejs-app-architecture-on-aws)

**Q: Your API is slow in production. How do you debug it?**  
Hint: Measure → DB → N+1 → deps → profile.  
Read: [Node JD — slow endpoint](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe) · [Backend & Node](/notes/performance#4-backend-nodejs) · [DevOps incident scenario](/notes/devops#20-common-interview-scenarios)

**Q: How would you design a login system with JWT and refresh tokens?**  
Hint: httpOnly cookies, rotation, revocation.  
Read: [Authentication & JWT](/notes/node#23-authentication-jwt) · [Auth sessions/JWT/OAuth](/notes/advanced-topics#auth-sessions-jwt-oauth)

**Q: How would you design a notification system, or a file upload feature for large files?**  
Hint: Events/queues for notify; streams + S3 for large files.  
Read: [Event-driven architecture](/notes/microservices#7-event-driven-architecture-eda) · [Kafka](/notes/microservices#8-kafka-in-microservices) · [S3 uploads](/notes/aws#5-s3-storage-very-common-in-full-stack-jds) · [Streams](/notes/node#10-streams)

**Q: Describe a difficult bug you fixed and how.**  
Hint: STAR — logs, root cause, fix, prevention.  
Read: [STAR stories](/notes/advanced-topics#stories-interviewers-want-star) · [Node JD — production bug](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe)

**Q: How do you handle disagreements in code review or with a designer?**  
Hint: Data over ego; shared API contracts.  
Read: [Full-stack collaboration](/notes/node#34-full-stack-collaboration-answers-soft-but-asked)

**Q: How do you ensure code quality?**  
Hint: ESLint, Prettier, unit tests (Jest), reviews.  
Read: [Testing (Node)](/notes/node#28-testing) · [Testing React](/notes/react#41-testing-react-jest-testing-library) · [Testing (shipping)](/notes/advanced-topics#testing-what-to-test-not-100) · [Code review](/notes/node#34-full-stack-collaboration-answers-soft-but-asked)

**Q: How do you handle tight deadlines?**  
Hint: Cut scope with PO; ship vertical slice; flag risk early.  
Read: [Agile / Scrum Q&A](/notes/devops#24-agile-scrum-jd-interview-qa)

**Q: Why are you leaving your current job, and why this company?**  
Hint: Stay positive; growth + role fit; research their product.  
Prep: Write 3 bullets for each answer — no notes link needed.

**Q: Are you comfortable with 5 days working from office in Ahmedabad?**  
Hint: Clear, positive yes if you are applying; show readiness to collaborate on-site.  
Prep: One confident sentence — no notes link needed.

---

## 11. Live Coding Practice

Practice these quickly:

**Q: Reverse a string, check for palindrome, find duplicates in an array.**  
Hint: Two pointers / Set / hash map.  
Read: [Array Methods](/notes/javascript#28-array-methods-important) · [DSA practice](/practice) · [Patterns](/patterns)

**Q: Flatten a nested array, group array of objects by key.**  
Hint: `reduce` / recursion.  
Read: [Array Methods](/notes/javascript#28-array-methods-important)

**Q: Implement debounce, a custom Promise.all, or Array.prototype.map.**  
Hint: Closures + promises fundamentals.  
Read: [Debounce & Throttle](/notes/javascript#14-debounce-throttle) · [Promises](/notes/javascript#9-promises) · [Array Methods](/notes/javascript#28-array-methods-important)

**Q: Simple Express CRUD API with validation and error handling.**  
Hint: Router + Zod/Joi + central error middleware.  
Read: [Express](/notes/node#19-expressjs-basics) · [REST design](/notes/node#22-rest-api-design-principles) · [Middleware](/notes/node#20-middleware) · [Error Handling](/notes/node#13-error-handling)

**Q: React: todo list, search with debounce, fetch and display API data with loading and error states.**  
Hint: Controlled inputs; React Query or careful useEffect.  
Read: [useState](/notes/react#9-usestate) · [Debounce](/notes/javascript#14-debounce-throttle) · [React Query](/notes/react#40-server-state-react-query-tanstack-query) · [React Full Stack Q&A](/notes/react#42-react-full-stack-jd-interview-qa-23-yoe)

**Q: SQL: second highest salary, count per group, JOIN across 2–3 tables.**  
Hint: Window functions or subquery; GROUP BY; JOIN.  
Read: [Common Interview Queries](/notes/sql#26-common-interview-queries) · [JOINs](/notes/sql#11-joins) · [GROUP BY & HAVING](/notes/sql#9-group-by-having) · [Window Functions](/notes/sql#17-window-functions)

---

## 12. Extra high-frequency questions

Added on top of the JD checklist — common follow-ups interviewers ask after your first answer.

### JavaScript / TypeScript

**Q: What causes memory leaks in JS/Node, and how do you find them?**  
Hint: Retained closures, listeners, unbounded caches; heap snapshots.  
Read: [Garbage Collection](/notes/javascript#26-garbage-collection) · [Performance & Scaling](/notes/node#30-performance-scaling) · [Common Interview Patterns](/notes/node#32-common-interview-patterns)

**Q: What is EventEmitter, and where does Node use it?**  
Hint: Streams/HTTP inherit it; remember `error` without a listener.  
Read: [EventEmitter](/notes/node#11-eventemitter)

**Q: Optional chaining vs nullish coalescing — when each?**  
Hint: `?.` for safe access; `??` only for null/undefined (not `0`/`''`).  
Read: [Optional Chaining & Nullish Coalescing](/notes/javascript#30-optional-chaining-nullish-coalescing)

**Q: What belongs in package.json vs lockfile? dependencies vs devDependencies?**  
Hint: Reproducible installs; prod vs build-only packages.  
Read: [npm & package.json](/notes/node#17-npm-packagejson)

**Q: How do discriminated unions help model API/UI state?**  
Hint: Illegal states become unrepresentable; narrow with a tag field.  
Read: [Discriminated unions](/notes/typescript#discriminated-unions) · [TS Full Stack Q&A](/notes/typescript#typescript-full-stack-jd-interview-qa)

### React / Next

**Q: What is React batching, and why did it change in React 18?**  
Hint: Automatic batching across timeouts/promises reduces re-renders.  
Read: [Batching](/notes/react#27-batching) · [React 18 Concurrent Features](/notes/react#28-react-18-concurrent-features)

**Q: What do Error Boundaries catch — and what don't they?**  
Hint: Render errors only; not event handlers or async.  
Read: [Error Boundaries](/notes/react#24-error-boundaries)

**Q: How do you protect routes in a React SPA vs Next App Router?**  
Hint: `Navigate`/wrapper vs middleware + server checks.  
Read: [React Router](/notes/react#38-react-router-spa-routing) · [Next Middleware](/notes/next#11-middleware) · [Next interview Qs](/notes/next#16-common-interview-questions)

**Q: What causes hydration errors in Next.js?**  
Hint: Server HTML ≠ client first paint (dates, `window`, invalid nesting).  
Read: [Common interview questions](/notes/next#16-common-interview-questions) · [Next JD Q&A](/notes/next#18-nextjs-full-stack-jd-extra-qa-23-yoe)

**Q: Server Components vs fetching in useEffect — when each?**  
Hint: Default to server data; client only for interactivity/browser APIs.  
Read: [Server Components](/notes/next#4-server-components-rsc) · [Client Components](/notes/next#5-client-components) · [Data fetching](/notes/next#8-data-fetching-caching)

### Node / APIs / Security

**Q: Explain CORS — why browsers block, and how you configure it safely.**  
Hint: Allowlist origins; credentials + `*`; preflight.  
Read: [Security Best Practices](/notes/node#27-security-best-practices) · [Node JD Q&A](/notes/node#33-nodejs-full-stack-jd-interview-qa-23-yoe)

**Q: XSS vs CSRF — how do you prevent each in a cookie-based app?**  
Hint: Escape/CSP for XSS; SameSite + CSRF token for cookie sessions.  
Read: [Security list](/notes/advanced-topics#security-the-boring-list-that-gets-you-hired) · [Auth](/notes/advanced-topics#auth-sessions-jwt-oauth)

**Q: What is an idempotency key, and when do you require it?**  
Hint: Payments/create-order retries; store key → response.  
Read: [API habits](/notes/advanced-topics#api-habits-seniors-get-asked)

**Q: How does connection pooling work, and what causes “too many connections”?**  
Hint: One shared pool; cap `replicas × pool size`.  
Read: [Database Interaction](/notes/node#25-database-interaction) · [Connection pooling](/notes/databases#36-connection-pooling) · [Databases Node Q&A](/notes/databases#43-node-full-stack-jd-database-interview-qa)

**Q: Soft delete vs hard delete — tradeoffs?**  
Hint: `deleted_at` + partial unique indexes vs true removal.  
Read: [Databases Node Q&A](/notes/databases#43-node-full-stack-jd-database-interview-qa) · [PostgreSQL FAQ](/notes/databases#38-postgresql-quick-faq)

**Q: Single-document vs multi-document transactions in MongoDB?**  
Hint: Prefer single-doc atomicity; multi-doc when needed (costlier).  
Read: [Transactions in MongoDB](/notes/databases#14-transactions-in-mongodb)

**Q: How do you do graceful shutdown in Node?**  
Hint: Stop new traffic, drain connections, close DB, then exit.  
Read: [Common Interview Patterns](/notes/node#32-common-interview-patterns) · [Logging](/notes/node#29-logging)

### Microservices / Architecture

**Q: What does an API Gateway do that a load balancer does not?**  
Hint: Cross-cutting routing/auth vs spreading identical instances.  
Read: [API Gateway](/notes/microservices#3-api-gateway) · [High-level picture](/notes/microservices#2-high-level-picture)

**Q: Why “database per service,” and how do you get a joined view?**  
Hint: No cross-service SQL joins; compose via API, events, or read models.  
Read: [Database per service](/notes/microservices#5-database-per-service-multiple-dbs)

**Q: Sync HTTP vs async events between Node services — when each?**  
Hint: User needs answer now vs side effects / fan-out.  
Read: [Node microservices connection](/notes/microservices#4-how-nodejs-microservices-connect) · [Sync vs async](/notes/microservices#10-sync-vs-async-when-to-use-which)

**Q: What is the transactional outbox pattern?**  
Hint: Same DB txn as business write + outbox row → relay to Kafka.  
Read: [Event-driven architecture](/notes/microservices#7-event-driven-architecture-eda) · [Microservices Q&A](/notes/microservices#12-common-interview-qa)

**Q: How do you make Kafka consumers idempotent?**  
Hint: At-least-once delivery; dedupe by `eventId` or upsert.  
Read: [Kafka](/notes/microservices#8-kafka-in-microservices) · [Resilience & ops](/notes/microservices#11-resilience-ops-always-asked)

### Frontend performance / Web

**Q: What is the Critical Rendering Path?**  
Hint: HTML → DOM, CSS → CSSOM, render tree, layout, paint.  
Read: [Critical Rendering Path](/notes/web-optimisation#1-how-browsers-load-a-page-critical-rendering-path-crp)

**Q: Name the Core Web Vitals and how you’d improve a bad LCP.**  
Hint: LCP/INP/CLS; image, TTFB, server HTML, fonts.  
Read: [Core Web Vitals](/notes/performance#2-core-web-vitals-frontend) · [Web vitals + friends](/notes/web-optimisation#2-metrics-that-matter-core-web-vitals-friends) · [Measure first](/notes/performance#1-how-to-think-measure-first)

### AWS / DevOps

**Q: Public vs private subnet — where do you put the API and the database?**  
Hint: ALB public; app + RDS private; SG least privilege.  
Read: [VPC & networking](/notes/aws#7-vpc-networking-enough-for-23-yoe) · [Typical architecture](/notes/aws#3-typical-nodejs-app-architecture-on-aws)

**Q: How do pre-signed S3 URLs work for uploads?**  
Hint: Short-lived PUT URL; app never streams huge files.  
Read: [S3 storage](/notes/aws#5-s3-storage-very-common-in-full-stack-jds) · [AWS JD Q&A](/notes/aws#15-full-stack-jd-interview-qa)

**Q: Rolling vs blue/green vs canary deploy — pick one and why.**  
Hint: Risk vs cost vs rollback speed.  
Read: [Deployment strategies](/notes/devops#11-deployment-strategies) · [How we ship versions](/notes/advanced-topics#how-we-ship-versions)

**Q: What are logs, metrics, and traces — and why do you need a requestId?**  
Hint: Three pillars; correlate across services.  
Read: [Observability](/notes/devops#13-observability-three-pillars) · [Logging best practices](/notes/devops#14-logging-best-practices) · [Node Logging](/notes/node#29-logging)

**Q: Horizontal vs vertical scaling for a Node API?**  
Hint: Stateless app servers + load balancer; sticky sessions are a smell.  
Read: [Scaling](/notes/devops#17-scaling) · [Performance & Scaling](/notes/node#30-performance-scaling)

### Python / FastAPI (if the JD mentions it)

**Q: How is FastAPI similar to Express + Zod/TS?**  
Hint: Type hints + Pydantic validation + `/docs` OpenAPI.  
Read: [FastAPI](/notes/python#6-fastapi-express-for-someone-who-likes-types) · [Python interview Q&A](/notes/python#11-interview-self-check-qa) · [JS→Python mental model](/notes/python#1-mental-model-python-vs-javascript)

---

## Quick Prep Tips

- Tie answers to your projects: "In my project, I used X because…" beats textbook-only answers.
- Be ready to explain **why** you chose a tool, not just what it is.
- If you don't know something, say so and explain how you'd find out.
- Review your resume line by line — every tech you list is fair game.
- Prefer reading the linked note section, then closing the tab and answering in 60–90 seconds.
- For Ahmedabad WFO / company-fit questions, rehearse a short positive answer the night before.
- After finishing sections 1–11, drill **section 12** — these are the usual follow-ups when your first answer is good.
