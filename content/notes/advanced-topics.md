# Shipping software (Docker, CI/CD, production)

> **Goal:** Pass the "how do you actually ship?" half of a senior interview. Mid-level finishes the feature. Senior gets it to production **safely**, sees it break, and can roll it back. Related: [Performance](/notes/performance), [HLD](/notes/system-design-hld), [Data stores](/notes/data-stores).

---

## What "senior" means here

You are not graded on memorizing kubectl flags. You are graded on owning **delivery**:

- a change is **tested** before users see it
- a change can be **undone** in minutes
- when it fails, you can **see** why (`requestId`, metrics, traces)
- secrets are not in Git
- you can tell a short story of an incident without blaming a person

The rest of this page is those habits, in simple language.

---

## CI/CD

**CI (continuous integration)** — every push is built and tested automatically. "Works on my machine" is not a release process.

**CD (continuous delivery / deployment)** — a green build **can** go to production (delivery) or **does** go (deployment) without a human copying files.

Picture a kitchen pass:

```
Commit → lint → unit tests → build image → integration tests → staging → (approve) → production
```

If lint fails, the plate never leaves the pass. That is the whole point.

### What each stage is for

| Stage | Question it answers | Keep it |
|-------|---------------------|---------|
| **Lint / typecheck** | Is this even valid? | Seconds. Fail fast. |
| **Unit tests** | Does this function lie? | Fast, no real network |
| **Build** | Can we make an artifact? | Docker image or `next build` |
| **Integration** | Does API + DB still talk? | Real Postgres in CI (container) |
| **E2E** | Can a user log in and pay? | Few journeys, not every click |
| **Deploy** | Is it running in an environment? | Staging first |

**PR pipeline** (every branch): lint + unit + build.  
**Main pipeline:** also deploy staging.  
**Production:** tag, button, or automatic after staging soak — team choice. Say yours.

### GitHub Actions (mental model)

- **Workflow** — a YAML file. Starts on `push`, `pull_request`, cron, or a button
- **Job** — a machine (runner). Jobs can run in parallel
- **Step** — one command (`npm test`)
- **Secrets** — `GROQ_API_KEY` lives in GitHub Secrets, **not** in the YAML

```yaml
# idea, not a full file
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
```

**Senior habits:**

- Cache `node_modules` / npm cache so CI is minutes, not 15
- Pin action versions (`@v4`), do not float on `main`
- Protected `main`: no force-push, required checks green
- Same commands locally (`npm test`) so CI is not a surprise

### Branching without religion

| Model | How | When |
|-------|-----|------|
| **Trunk-based** | Short branches, merge daily, flags hide unfinished work | Teams that deploy often |
| **GitFlow lite** | `main` + feature PRs | Most product teams |

Long-lived branches that diverge for three weeks are how merge hell and "works on staging only" happen.

**Interview phrase:** *"Every PR runs lint and tests. Main deploys to staging. Production is a tag or an approval, and we can roll back the previous image."*

---

## Docker

A **container** is your app plus just enough OS to run it, isolated from the laptop. A **Docker image** is the **recipe** (immutable snapshot). A **container** is **one cooking** of that recipe.

| | Image | Container |
|--|-------|-----------|
| Picture | Recipe / meal kit | The meal on the table |
| Changes | You build a new one | You throw it away and start another |
| Store | Registry (Docker Hub, ECR, GHCR) | Runs on a machine |

Why seniors like this: **dev, CI, and prod run the same artifact**. "Works on my machine" becomes "runs this image digest."

### A Dockerfile that shows you know layers

Docker caches **each line**. If `package.json` did not change, it reuses `npm ci`. Copy source **after** install so code edits do not redo the slow step.

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN adduser -D appuser
COPY --from=build /app ./
USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

**Multi-stage:** compile in a fat image, ship a thin one. Smaller = faster deploys, smaller attack surface.

### Habits that show seniority

- **`.dockerignore`** — skip `node_modules`, `.git`, `.env` (secrets do not belong in layers)
- **Pin versions** — `node:20-alpine`, not `node:latest` (yesterday's latest is not today's)
- **Non-root user** — if the process is owned, damage is smaller
- **One process per container** — app here, Redis in another container
- **Healthcheck** — so orchestrators stop sending traffic to a dead process

**Docker Compose** — a YAML file that starts app + Postgres + Redis on one laptop. Great for local and CI. Not a substitute for Kubernetes in a 50-service company, and not required for a monolith on one VM.

**Interview phrase:** *"An image is immutable. We promote the same digest from staging to prod instead of rebuilding on the server."*

---

## Kubernetes (only what interviews ask)

**Kubernetes (K8s)** is a manager for many containers: keep N copies running, replace dead ones, roll out new images, give them a stable name on the network.

You do not need to pass CKA. You need this vocabulary:

| Object | Job |
|--------|-----|
| **Pod** | Smallest unit — one or more containers that share a network |
| **Deployment** | "I want 3 copies of this image"; handles rolling update |
| **Service** | Stable DNS/IP in front of pods that come and go |
| **Ingress** | HTTP routes from the internet into services |
| **ConfigMap** | Non-secret config (feature names, log level) |
| **Secret** | Passwords, tokens (still encrypt and restrict who can read) |
| **HPA** | Add pods when CPU / custom metrics rise |

**Why it exists:** VMs + SSH + "please restart the box" does not scale to many services. K8s **self-heals** (pod dies → new pod) and **rolls** (new version, old version drains).

**When you do not need it:** one Node app on a PaaS (Railway, Render, ECS, Cloud Run). Saying "we'll Kubernetes it" for a 2-person startup is a smell. Say that.

---

## How we ship versions

Building is not releasing. These are the patterns:

| Strategy | How | Cost / risk |
|----------|-----|-------------|
| **Rolling** | Replace instances a few at a time | Cheap; mixed versions for a bit |
| **Blue-green** | Two full environments; switch the load balancer | Double cost; instant switch |
| **Canary** | 5% of users on new code, then 25%, then all | Needs metrics; best default for risky changes |
| **Feature flag** | Code is in prod but off; flip per user | Deploy ≠ release. Best friend of trunk-based |

**Rollback:** keep the previous **image digest**. Revert the Deployment or the flag. A rollback you have never practiced is a wish.

**Migrations:** expand schema **before** the new code needs it (add column nullable → deploy app → backfill → constrain). Never "deploy code that requires a column that does not exist yet" if two versions run during a roll.

**Senior story:** *"We canaried payments at 10%, watched error rate and p95 for 30 minutes, then 100%. Rollback was the flag, not a 40-minute rebuild."*

---

## Testing (what to test, not 100%)

```
        / E2E \           few, slow — checkout, login
       / integration \    API + real test DB
      /   unit tests   \  lots, fast — pricing, permissions
```

| Layer | Good test | Bad test |
|-------|-----------|----------|
| **Unit** | Discount math, RBAC helper | Asserting that React rendered a `<div>` |
| **Integration** | POST /orders writes a row and publishes outbox | Mocking the entire world so nothing is real |
| **E2E** | User signs in and sees their order | Clicking every pixel in the design system |

**Coverage %** is a vanity metric if it is all snapshots. Seniors protect **money paths** and **auth**. Flaky E2E is worse than no E2E — people ignore the red build.

Contract tests (OpenAPI / Pact) help when two teams own API and client.

---

## Observability and on-call

If you cannot see it, you cannot own it.

| Pillar | Question | Practice |
|--------|----------|----------|
| **Logs** | What happened to request X? | JSON, `level`, `requestId`, user id (careful with PII) |
| **Metrics** | Is it bad *right now*? | QPS, error rate, p95 latency, queue depth |
| **Traces** | Which hop was slow? | OpenTelemetry across API → DB → Redis |

**RED** (services): Rate, Errors, Duration.  
**USE** (machines): Utilization, Saturation, Errors.

**SLI** — what you measure (p99 latency).  
**SLO** — the target (99.9% of reads < 200 ms).  
**SLA** — the contract with a customer (money if you miss).

Alert on **symptoms** (error rate, SLO burn), not "CPU is 61%." Every alert needs a **runbook**: first three commands, who to ping, how to roll back.

**Postmortem:** timeline, impact, what went well, action items. Blame-free. The action is "add a timeout," not "be more careful."

**Health vs ready:**

- **Liveness** — process is not deadlocked. Fail → restart the container
- **Readiness** — can this instance take traffic (DB pool up)? Fail → stop sending requests, do not necessarily kill

**Graceful shutdown:** on `SIGTERM`, stop the load balancer / fail readiness, finish in-flight requests, close DB, then exit. Kubernetes sends SIGTERM, then SIGKILL after `terminationGracePeriodSeconds`. If you ignore SIGTERM, users see cut connections.

---

## Auth (sessions, JWT, OAuth)

**Authentication** — who are you?  
**Authorization** — what may you do? (RBAC: admin / member / viewer)

### Sessions

Server stores a session id (`sid_…`) in an **httpOnly, Secure, SameSite** cookie. Redis or Postgres holds `{ userId, expires }`. Logout = delete the session. Easy to revoke.

Works well for browsers on **your** domain.

### JWT

A JWT is three Base64 pieces: `header.payload.signature`. The server **signs** it; later it **verifies** without a DB lookup. That is why people like it for APIs and microservices.

**Problems seniors mention:**

- You cannot revoke easily unless you keep a blocklist (then it is not purely stateless)
- Putting secrets in the payload is public (it is encoded, not encrypted)
- `localStorage` + JWT = XSS can steal it. Prefer **httpOnly cookies** or short-lived memory

**Pattern that actually ships:** **access token** (5–15 min) + **refresh token** (longer, rotated, stored server-side or httpOnly). On leak, refresh rotation detects reuse.

Node examples → [Node JWT](/notes/node).

### OAuth 2.0 / OIDC (the 30-second version)

User clicks "Sign in with Google." Your app **never sees their Google password**.

1. Redirect to Google with your **client id** and a **redirect URI**
2. User consents
3. Google sends an **authorization code** to your backend
4. Backend trades the code for tokens (this step uses **client secret** — only on the server)
5. You create **your** session

**OIDC** is OAuth plus an **ID token** (who the user is).  
**Never** do the code exchange in a public SPA with a secret in the JavaScript bundle.

**API keys** for server-to-server: hashed at rest, shown once, scoped, rotatable.

**Interview phrase:** *"Browser apps: httpOnly session or short JWT in cookie. Revocation matters for support. OAuth for 'login with X' — secrets stay on the server."*

---

## API habits seniors get asked

**Idempotency:** `POST /payments` with header `Idempotency-Key: uuid`. Same key + same body = one charge, even if the client retries. Store the key.

**Pagination:** offset is simple and breaks on inserts. **Cursor** (`createdAt + id`) is the feed pattern.

**Versioning:** `/v1/` when you will break clients. Prefer additive fields as long as you can.

**Timeouts and retries:** every outbound call has a timeout. Retry **only** idempotent operations, with backoff and jitter. Pair with a **circuit breaker** (stop calling a sick dependency).

**Webhooks:** verify **signatures**, return 2xx fast, do the work async, tolerate **retries** (idempotent handlers). Stripe-style.

**Rate limit:** Redis counter, 429, `Retry-After`. Protect login and expensive search first.

**Pagination, gzip, field filtering** — [Performance notes](/notes/performance).

---

## Security (the boring list that gets you hired)

| Risk | Simple defense |
|------|----------------|
| **Injection** | Parameterized SQL; never string-build queries. ORM still needs care |
| **XSS** | Framework escaping; CSP; no `dangerouslySetInnerHTML` with user HTML |
| **CSRF** | SameSite cookies; CSRF token on cookie-based session mutating routes |
| **SSRF** | Do not fetch user-supplied URLs without an allowlist |
| **Auth holes** | Check **authorization** on every object (`order.userId === me`), not just "is logged in" |
| **Secrets** | Env / secret manager; rotate; never commit `.env`; never log tokens |
| **Dependencies** | lockfile, `npm audit` / Dependabot, pin images |
| **HTTPS** | TLS everywhere; HSTS in prod |
| **PII** | Least data; encrypt at rest if required; do not log full cards or OTPs |

**Least privilege:** the API role can `UPDATE orders`, not `DROP DATABASE`. IAM per service.

**Supply chain:** CI deploys from **protected main**, not from a random fork. Images scanned.

---

## Config, migrations, automation

**12-factor config:** environment variables for `DATABASE_URL`, not a `prod.json` in Git. Same image, different env.

**Migrations:** numbered, in Git, run by CI/CD or a job (`Prisma migrate`, Flyway). Expand/contract. Never hand-edit prod.

**IaC (Terraform / Pulumi):** cloud boxes described as code, reviewed in PRs. Interview awareness is enough unless the role is platform.

**Cron:** nightly cleanup, reconciliation ("charges without orders"). Make jobs **idempotent**. Alert if they skip a night.

**Feature flags:** launch darkly / homemade table. Kill switch for a bad feature without a rollback of the whole app.

---

## Stories interviewers want (STAR)

Prepare **one real example** each. If you lack prod stories, describe what you **would** have done on a project they can see (this repo's CI, Docker, health checks).

| Theme | Shape of the answer |
|-------|---------------------|
| **Safer deploys** | Tests + canary or flag + rollback path |
| **Incident** | Detect (alert) → mitigate (roll back / feature off) → postmortem → one fix |
| **MTTR** | requestId, runbook, previous image tagged |
| **Tech debt** | error budget / "this path has no test and handles money" |
| **Mentoring** | review checklist, pairing on CI, written runbook |

**Phrase:** *"Production is part of the feature. Observability and rollback ship in the same PR as the code."*

---

## Checklist before you call it production

- [ ] CI on every PR (lint, types, tests)
- [ ] Secrets not in the repo; prod keys in a manager
- [ ] Docker image pinned and non-root (or a PaaS that is equivalent)
- [ ] `/health` (live) and `/ready` (DB reachable)
- [ ] Structured logs with `requestId`
- [ ] Timeouts on outbound HTTP
- [ ] Migrations in Git, expand-then-contract
- [ ] Rollback: previous image or flag, practiced once
- [ ] Alert on error rate / latency, not noise
- [ ] Authz check on every resource, not only login

**Related:** [Data stores](/notes/data-stores), [Message brokers](/notes/message-brokers), [TypeScript](/notes/typescript) (`strict` in CI).
