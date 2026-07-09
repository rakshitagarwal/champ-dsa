# Advanced topics

> **What seniors are evaluated on:** You don't just build features — you **ship safely**, debug production, and improve release confidence. Mid-level writes code; senior owns delivery and operability.

Related: observability metrics in [Performance](/notes/performance) and [HLD monitoring](/notes/system-design-hld).

---

## 1. CI/CD pipeline mental model

```
Commit → Lint → Unit tests → Build → Integration tests → Deploy staging → E2E (optional) → Deploy prod
```

| Stage | Purpose |
|-------|---------|
| **Lint / format** | Catch style and static errors early |
| **Unit tests** | Fast feedback on logic |
| **Build** | Artifact: Docker image, `next build`, bundle |
| **Integration** | API + DB, contract tests |
| **Deploy** | Rolling, blue-green, or canary |

### GitHub Actions (conceptual)

- **Workflow** — triggered on `push`, `pull_request`, `schedule`
- **Jobs** — parallel or sequential steps on runners
- **Secrets** — API keys in GitHub Secrets, never in YAML plaintext

**Senior phrase:** *"Every PR runs lint + tests; main branch auto-deploys to staging; prod needs approval or tag."*

### Branching (pragmatic)

| Model | When |
|-------|------|
| **Trunk-based** | Small team, continuous deploy, feature flags |
| **GitFlow lite** | `main` + short-lived feature branches + PR review |

Avoid long-lived branches that diverge for weeks.

---

## 2. Containers & Docker

**Image** — immutable snapshot (app + runtime + deps).
**Container** — running instance of an image.

**Dockerfile basics:**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Best practices:**
- Multi-stage builds — smaller prod image (build stage + slim runtime)
- `.dockerignore` — exclude `node_modules`, `.git`
- Non-root user in container
- Pin base image versions

**Docker Compose** — local dev: app + Postgres + Redis on one command.

**Interview level:** Explain image vs container, why immutability helps deploys, not Kubernetes certification.

---

## 3. Deployment strategies

| Strategy | How | Risk |
|----------|-----|------|
| **Rolling** | Replace instances gradually | Mixed versions briefly |
| **Blue-green** | Two identical envs; switch traffic | Double infra cost |
| **Canary** | 5% traffic to new version, then ramp | Needs metrics + fast rollback |
| **Feature flags** | Deploy code dark; enable per user | Decouples deploy from release |

**Rollback:** Keep previous image tag; revert traffic or flag in minutes — practice this.

**Senior story template:** *"We canaried the payment refactor at 10% traffic, watched error rate and p95 for 30 minutes, then full rollout — rollback was flipping the flag."*

---

## 4. Testing pyramid

```
        / E2E \          few, slow, brittle — critical user journeys only
       / integration \   API + DB, contracts
      /   unit tests   \  many, fast, isolated
```

| Layer | What to test | Tools (examples) |
|-------|--------------|------------------|
| **Unit** | Pure functions, service logic with mocks | Vitest, Jest |
| **Integration** | Routes + real/test DB | Supertest, testcontainers |
| **E2E** | Login → checkout flow | Playwright, Cypress |

**Senior expectation:** Advocate tests where failures are expensive; don't chase 100% coverage on UI boilerplate.

---

## 5. Observability

| Pillar | Question | Examples |
|--------|----------|----------|
| **Logs** | What happened? | Structured JSON, `requestId`, levels |
| **Metrics** | How much / how fast? | Prometheus, Datadog, CloudWatch |
| **Traces** | Where in the chain? | OpenTelemetry, Jaeger |

**RED method (services):** Rate, Errors, Duration.

**USE method (resources):** Utilization, Saturation, Errors.

### On-call basics

- **Alert** on symptoms (error rate, SLO burn) not every log line
- **Runbook** — first steps for common alerts
- **Postmortem** — blameless, action items, timeline

---

## 6. Kubernetes (interview overview)

| Object | Role |
|--------|------|
| **Pod** | One or more containers, smallest deploy unit |
| **Deployment** | Desired replica count, rolling updates |
| **Service** | Stable network endpoint to pods |
| **Ingress** | HTTP routing into cluster |
| **ConfigMap / Secret** | Config and sensitive data |

**You should explain:** Why orchestration (scale, self-heal, rolling deploy) — not operate a prod cluster solo in interview.

---

## 7. Security essentials

| Area | Practice |
|------|----------|
| **Secrets** | Vault, env vars, rotation — never commit `.env` |
| **Dependencies** | `npm audit`, Dependabot, pin versions |
| **OWASP top risks** | Injection, broken auth, XSS, SSRF — know one mitigation each |
| **Auth** | JWT short expiry + refresh; httpOnly cookies for sessions |
| **HTTPS** | TLS everywhere; HSTS in prod |
| **Least privilege** | IAM roles per service, not shared admin creds |

**Supply chain:** Lockfiles, verify CI only deploys from protected branches.

---

## 8. Automation beyond CI

| Automation | Example |
|------------|---------|
| **Cron jobs** | Nightly reports, cleanup, reconciliation |
| **IaC** | Terraform/Pulumi for cloud resources (interview awareness) |
| **Scripts** | Idempotent deploy hooks, DB migration runner |
| **Webhooks** | GitHub → Slack on failed build |

**Idempotent:** Running twice produces same result — critical for deploy and payment scripts.

---

## 9. Senior talking points (STAR-ready)

Prepare one story each:

| Theme | Prompt |
|-------|--------|
| **Release confidence** | "How did you improve deploy safety?" — tests, canary, flags |
| **Incident response** | "Tell me about a production outage" — detect, mitigate, postmortem |
| **MTTR** | "How did you reduce time to recover?" — better logs, runbooks, rollback |
| **Tech debt** | "How do you balance features vs reliability?" — error budget, prioritization |
| **Mentoring** | "How do you raise team quality?" — reviews, standards, pairing |

**Phrase:** *"I treat production as a feature — observability and rollback path ship with the code."*

---

## 10. Checklist before calling yourself "production-ready"

- [ ] CI runs on every PR
- [ ] Secrets not in repo
- [ ] Health check endpoint (`/health`)
- [ ] Structured logging with request IDs
- [ ] DB migrations versioned and automated
- [ ] Rollback procedure documented and tested once
- [ ] Alerts on error rate and latency SLO
- [ ] Dependency scanning enabled
