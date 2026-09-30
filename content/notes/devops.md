# DevOps Interview Notes

> How software gets built, shipped, and kept healthy in production. Related: [AWS](/notes/aws), [Docker, CI/CD & production](/notes/advanced-topics), [Performance](/notes/performance), [system design](/system-design/introduction).

---

## 1. What is DevOps?

**DevOps** is a culture and set of practices that unify **development** and **operations** so teams can deliver software **frequently, reliably, and safely**.

It is not just tools. Interview answer should cover:
- **Culture** — shared ownership of production
- **Automation** — CI/CD, infra as code
- **Measurement** — metrics, logs, traces
- **Sharing** — blameless postmortems, runbooks

**Goals:** shorter lead time, fewer failed deploys, faster recovery (see DORA metrics below).

---

## 2. SDLC vs DevOps

| Traditional | DevOps |
|---|---|
| Dev throws code over the wall to Ops | Same team owns build → deploy → run |
| Infrequent big releases | Small, frequent releases |
| Manual servers | Infra as code + containers |
| "It works on my machine" | Reproducible pipelines |

---

## 3. DORA metrics (interview favorite)

| Metric | What it measures | Elite direction |
|---|---|---|
| **Deployment frequency** | How often you ship to prod | Multiple / day |
| **Lead time for changes** | Commit → production | Hours or less |
| **Change failure rate** | % of deploys that cause incidents | Low (0–15%) |
| **MTTR** | Time to restore service | Minutes to an hour |

Talk about improving these with automation, feature flags, and observability — not heroics.

---

## 4. CI/CD

**Continuous Integration (CI)** — every commit is automatically built and tested. Failures are cheap and early.

**Continuous Delivery** — main is always deployable; production release may need a button.

**Continuous Deployment** — every green main build goes to production automatically.

```
Push → Lint → Unit tests → Build artifact → Integration tests → Staging → Production
```

**Pipeline principles:**
- Fail fast (lint before e2e)
- Immutable artifacts (same image staging → prod)
- Secrets never in Git
- Environments differ by **config**, not by rebuilding differently

**Common tools:** GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps.

### GitHub Actions sketch

```yaml
name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm test
      - run: npm run build
```

---

## 5. Version control & branching

**GitFlow** — `main` + `develop` + feature/release/hotfix branches. Heavier; good for scheduled releases.

**Trunk-based** — short-lived branches, merge to `main` often. Pairs with feature flags. Preferred for fast CI/CD.

**PR hygiene:** small diffs, required checks, code review, protected main.

---

## 6. Containers & Docker

**Container** — process + filesystem + isolated networking, sharing the host kernel. Lighter than VMs.

**Image** — immutable snapshot. **Container** — running instance.

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

**Best practices:**
- Multi-stage builds (small prod image)
- Non-root user
- Pin base image tags / digests
- `.dockerignore` (no `node_modules`, `.git`)
- One process per container
- Config via env vars

**`docker compose`** — multi-service local stacks (app + db + redis).

---

## 7. Orchestration & Kubernetes (high level)

**Why Kubernetes?** Schedule containers across machines, restart crashes, scale, service discovery, rolling updates.

| Concept | Meaning |
|---|---|
| **Pod** | Smallest unit — one or more containers |
| **Deployment** | Desired replica count + rolling update |
| **Service** | Stable networking to pods |
| **Ingress** | HTTP routing from outside |
| **ConfigMap / Secret** | Config and sensitive values |
| **Namespace** | Logical isolation |

**Rolling update** — new pods up, old down gradually.  
**Rollback** — redeploy previous ReplicaSet.  
**Health probes:** liveness (restart if dead), readiness (stop traffic if not ready).

You don't need to memorize every kubectl flag — know the **mental model** and when you'd choose managed K8s (EKS/GKE/AKS) vs ECS/Cloud Run for simpler apps.

---

## 8. Infrastructure as Code (IaC)

Define infra in files, review it like code, recreate environments reliably.

| Tool | Style |
|---|---|
| **Terraform** | Declarative, multi-cloud |
| **Pulumi** | IaC in real languages |
| **CloudFormation / Bicep** | AWS / Azure native |
| **Ansible** | Config management / procedural |

**State** (Terraform) — tracks what exists; store remotely (S3 + lock) so teams don't clash.

**Idempotency** — apply twice → same result.

---

## 9. Cloud fundamentals

Know the shared vocabulary:

| Layer | Examples |
|---|---|
| **Compute** | EC2, Cloud Run, Lambda, AKS |
| **Storage** | S3, EBS, GCS |
| **Database** | RDS, Cloud SQL, DynamoDB |
| **Networking** | VPC, subnets, security groups, load balancers |
| **CDN** | CloudFront, Cloudflare |
| **Secrets** | Secrets Manager, Vault |

**IaaS vs PaaS vs SaaS:** you manage more → less as you go up the stack.

**Well-architected themes:** security, reliability, performance, cost, operational excellence.

---

## 10. Environments

Typical progression:

```
Local → Dev → Staging / QA → Production
```

- **Staging** ≈ production shape (similar data size/config where possible)
- **Prod** — change carefully; prefer progressive delivery
- Never debug by SSHing into random boxes as the primary strategy — prefer logs + ephemeral containers

---

## 11. Deployment strategies

| Strategy | Idea | Tradeoff |
|---|---|---|
| **Recreate** | Stop old, start new | Downtime |
| **Rolling** | Replace instances gradually | Simple, brief mixed versions |
| **Blue/Green** | Two full envs; switch traffic | Fast rollback; costs 2× infra briefly |
| **Canary** | Send % of traffic to new version | Safer; needs metrics + automation |
| **Feature flags** | Decouple deploy from release | Ship dark; enable when ready |

**Rollback plan** is part of the deploy plan. Always say how you'd undo.

---

## 12. Networking & load balancing

- **Load balancer** — distribute traffic (L4 TCP / L7 HTTP)
- **Reverse proxy** — nginx, Envoy, Traefik (TLS, routing, compression)
- **DNS** — names → IPs; TTL matters for cutovers
- **TLS termination** — encrypt in transit; renew certs (Let's Encrypt / ACM)
- **Zero-trust / VPN / private subnets** — don't expose DBs publicly

---

## 13. Observability (three pillars)

| Pillar | Question | Examples |
|---|---|---|
| **Logs** | What happened? | Structured JSON, requestId |
| **Metrics** | Is it healthy / how much? | Latency, error rate, CPU, queue depth |
| **Traces** | Where did time go across services? | OpenTelemetry, Jaeger |

**Golden signals:** latency, traffic, errors, saturation.

**Alerting:** page on **symptoms users feel**, not every CPU blip. Runbooks next to alerts.

**SLI / SLO / SLA:**
- **SLI** — measured indicator (e.g. success rate)
- **SLO** — target (e.g. 99.9%)
- **SLA** — contractual promise (with penalties)

---

## 14. Logging best practices

- Structured logs (`level`, `msg`, `requestId`, `userId`)
- Correlate with a **request/trace ID** across services
- Don't log secrets or full PII
- Centralize (ELK, Loki, CloudWatch, Datadog)
- Levels: `error` / `warn` / `info` / `debug` — keep prod noise down

---

## 15. Security in DevOps (DevSecOps)

- **Least privilege** IAM roles
- **Secrets** in a vault / secret manager — never commit `.env` with real keys
- **Scan** images and deps (Snyk, Trivy, Dependabot)
- **SBOMs** and pinned versions
- **Shift left** — security checks in CI, not only yearly audits
- **Network policies** / security groups as tight as practical
- **HTTPS everywhere**; HSTS where appropriate

---

## 16. Configuration & secrets

| Approach | Use |
|---|---|
| Env vars | Simple 12-factor config |
| ConfigMaps | Non-secret K8s config |
| Secrets Manager / Vault | API keys, DB passwords |
| Feature flag service | Runtime toggles |

**12-factor app:** config in environment, disposable processes, logs to stdout, backing services as attached resources.

---

## 17. Scaling

**Vertical** — bigger machine. Simple limits.  
**Horizontal** — more instances behind a load balancer. Needs stateless app design.

**Stateless app servers** + **stateful stores** (DB, Redis, object storage). Session affinity is a smell; prefer shared session store.

**Autoscaling** on CPU, RPS, queue depth, or custom metrics. Set min replicas for sudden spikes.

---

## 18. Reliability & SRE basics

- **Error budget** — allowed unreliability from SLO; spend it on shipping speed
- **Toil** — manual, repetitive ops work → automate
- **Postmortems** — blameless; what failed in the system, action items with owners
- **Runbooks** — step-by-step for common incidents
- **Chaos / game days** (advanced) — practice failure

**MTBF / MTTR** — mean time between failures / to repair. DevOps optimizes recovery as much as prevention.

---

## 19. Artifact & package management

- Container registries (ECR, GCR, GHCR, Docker Hub)
- Language registries (npm, PyPI, Maven)
- Version with **semver** / git SHA tags
- Promote the **same** artifact across environments

---

## 20. Common interview scenarios

**"Walk me through your deploy pipeline."**  
Commit → CI (lint/test/build image) → push to registry → deploy staging → smoke tests → canary/prod → watch metrics → rollback if error rate spikes.

**"Service is down. What do you do?"**  
1. Confirm blast radius (status page, metrics)  
2. Mitigate (rollback, scale, disable flag)  
3. Find cause (logs, last deploy, deps)  
4. Fix forward or roll back  
5. Postmortem + prevention  

**"How do you manage secrets?"**  
Inject at runtime from a secret store; short-lived credentials when possible; rotate; audit access; never bake into images.

**"Docker vs VM?"**  
Containers share the kernel → faster start, denser packing. VMs virtualize hardware → stronger isolation, heavier. Often: VMs as hosts, containers as app units.

**"What is GitOps?"**  
Desired cluster state lives in Git; an agent (Argo CD / Flux) reconciles the cluster to match. Auditable, declarative deploys.

---

## 21. Tool map (don't memorize all — know categories)

| Category | Examples |
|---|---|
| CI/CD | GitHub Actions, Jenkins, GitLab CI |
| Containers | Docker, Podman |
| Orchestration | Kubernetes, ECS |
| IaC | Terraform, Pulumi |
| Monitoring | Prometheus, Grafana, Datadog |
| Logging | ELK, Loki, CloudWatch |
| Tracing | Jaeger, Tempo, Honeycomb |
| Secrets | Vault, AWS Secrets Manager |

---

## 22. One-minute closing pitch

"DevOps is shared ownership of the path to production: automated CI/CD, reproducible infra as code, containers for consistency, and observability so we detect and recover fast. I measure success with DORA metrics — ship small, fail rarely, restore quickly — and I always deploy with a rollback path and secrets kept out of Git."

---

## 23. Git & GitHub/GitLab — JD interview Q&A

Almost every full-stack JD lists **Git**. Be fluent here.

**Q: Git vs GitHub/GitLab?**  
A: Git = version control locally. GitHub/GitLab = remote hosting + PRs, issues, CI, permissions.

**Q: Daily commands you use?**  
A: `status`, `add`, `commit`, `pull --rebase` (or merge), `push`, `checkout`/`switch`, `branch`, `stash`, `log`, `diff`, `merge`/`rebase`, resolve conflicts, open PR.

**Q: merge vs rebase?**  
A: Merge preserves history branch topology. Rebase replays commits for a linear history — great for local feature branches before PR; don't rebase shared main history others use.

**Q: What is a good PR?**  
A: Small, focused, description of why, screenshots for UI, linked ticket, green CI, self-reviewed diff, no secrets, migrations called out.

**Q: How do you resolve conflicts?**  
A: Pull latest main → merge/rebase into feature → open conflicted files → keep correct logic → test → commit/continue rebase → push.

**Q: commit message style?**  
A: Imperative, why-focused: `fix(api): prevent double charge on retry`. Not `update stuff`.

**Q: .gitignore essentials for Node?**  
A: `node_modules/`, `.env*`, build outputs (`dist/`, `.next/`), logs, IDE junk, coverage. Never commit secrets.

**Q: How do you undo mistakes?**  
A: Unstaged: `checkout --` / `restore`. Staged: `restore --staged`. Last commit not pushed: `commit --amend` (only if alone on branch). Pushed bad commit: revert with new commit — avoid force-push on shared branches.

---

## 24. Agile / Scrum — JD interview Q&A

Preferred on many JDs — keep answers practical, not buzzwordy.

**Q: What is Agile?**  
A: Deliver value in small increments, feedback loops, adapt scope — not big-bang releases with no user feedback.

**Q: Scrum roles & ceremonies?**  
A: **PO** prioritizes backlog; **SM** facilitates; **Dev team** delivers. Ceremonies: sprint planning, daily standup, review/demo, retrospective; backlog refinement.

**Q: What do you say in standup?**  
A: Yesterday / today / blockers — keep it under a minute; raise blockers early (API contract, access, unclear AC).

**Q: Story points / velocity?**  
A: Relative effort estimates for planning capacity — not a performance score for individuals.

**Q: Definition of Done?**  
A: Code merged, tests pass, reviewed, deployed to staging (or agreed env), AC met, no open Sev blockers — agree DoD with the team.

**Q: How do you handle mid-sprint scope change?**  
A: Flag impact on sprint goal; PO swaps/cuts scope; don't silently overcommit.

---

## 25. Docker & CI/CD — preferred-skill Q&A (full stack)

**Q: Why Docker for a Node app?**  
A: Same image in dev/staging/prod; no "works on my machine"; easy dependency isolation; pairs with CI.

**Q: What goes in a production Node Dockerfile?**  
A: Multi-stage build, `npm ci`, non-root user, only prod deps in final image, `.dockerignore`, `NODE_ENV=production`, healthcheck.

**Q: What does your CI pipeline run?**  
A: Install → lint → typecheck → unit/integration tests → build → (optional) Docker image → deploy staging on main.

**Q: How do you deploy without downtime?**  
A: Rolling / blue-green / restart behind load balancer with health checks; run backward-compatible migrations first.

**Q: Where do cloud skills fit?**  
A: See dedicated [AWS notes](/notes/aws) — EC2/ECS, S3, RDS, IAM, CloudWatch.

---
