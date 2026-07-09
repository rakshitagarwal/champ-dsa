# Project work

> **Recruiter reality:** Hiring managers skim GitHub for **5–10 seconds**. They are not reading every file — they check whether you ship real software, not tutorial homework.

## Do this today

- [ ] Pick **one** project to improve (not start a fourth clone)
- [ ] Add a README with: problem → your approach → stack → **one metric or scope number**
- [ ] Deploy it or record a **2-minute demo video** — dead repos get skipped

## What recruiters actually look for

| Signal | Why it matters |
|--------|----------------|
| Live URL or demo | Proves you deploy, not just code locally |
| README with architecture | Shows you think like an engineer, not a student |
| Recent commits (last 90 days) | Stale repos look abandoned |
| Tests or CI badge | Signals production habits |
| Clear ownership | "I built X" — not "we used React" with no depth |

**They do not care:** 15 half-finished repos, Netflix/Uber clones with zero differentiation, or certificates listed as projects.

## Good project types (by target role)

### Full-stack / product engineer (MERN, Next.js)

Build something with **auth + database + payments or file upload + admin view**. Examples that interview well:

- **Invoice / billing tool** for freelancers — PDF export, Razorpay/Stripe test mode, role-based access
- **Internal ops dashboard** — CRUD, filters, export CSV, audit log of who changed what
- **Booking or waitlist app** — concurrency (double-booking prevention), email notifications, mobile-responsive UI

What makes these strong: real user flows, edge cases, and something you can whiteboard in an interview.

### Backend-leaning

- API with **rate limiting, pagination, caching**, and OpenAPI docs
- Webhook consumer (payment events, GitHub events) with idempotent handling
- Background job queue (emails, reports) — even if Redis/Bull is overkill, explain the design

### Frontend-leaning

- Performance-focused app: lazy routes, skeleton states, error boundaries, Lighthouse score you can cite
- Complex form wizard with validation and optimistic updates
- Accessible component library usage — not reinventing buttons, but composing well

## Projects that waste your time

| Skip | Build instead |
|------|----------------|
| Todo app with no twist | Same stack, but a **domain you care about** (finance, logistics, education) |
| 10 tutorial clones | **2 projects** you can defend for 20 minutes each |
| AI wrapper with no backend | Something with **data model, auth, and error handling** |
| README that says "coming soon" | Ship v1 ugly — **deployed** beats perfect local |
| Copy-paste bootcamp capstone | Add **one feature recruiters ask about**: search, permissions, or payments |

## The 2-project rule

For 3–6 YOE full-stack roles in India:

1. **Project A — depth:** Your best work. Full stack, deployed, README with architecture diagram (even ASCII is fine).
2. **Project B — breadth or domain:** Complements A — e.g. A is consumer app, B is API-heavy or fintech-adjacent.

Put both on resume **only if** you can explain trade-offs: why Mongo vs Postgres, why you chose JWT vs sessions, what breaks at 10k users.

## README template (copy this)

```markdown
# Project name — one-line value prop

**Problem:** Who has this problem and why existing tools fail.
**Solution:** What you built in 2–3 sentences.
**Stack:** React, Node, Postgres, Redis — only what you actually used.
**Highlights:**
- Auth with refresh tokens + role-based routes
- Cut page load from Xs to Ys (or: handles N concurrent bookings)
**Live:** https://...
**Demo:** 2-min Loom link (optional but powerful)
```

## How to talk about projects in interviews

Recruiters forward candidates who can answer:

1. **What was hardest?** (concurrency, auth, state, deployment — pick one real struggle)
2. **What would you change at 10x scale?** (caching, DB indexes, queue, read replicas)
3. **What did you ship alone vs with a team?** (be honest — solo ownership is fine)

If you cannot answer #1, the project is not ready to list yet.

## Resume placement

| Experience | Projects section |
|------------|------------------|
| Fresher or &lt;1 YOE | 2–3 projects can carry the resume |
| 2–6 YOE | **1–2 bullets max** under Projects — experience bullets matter more |
| Career switch | 2 strong projects + skills section aligned to target JD |

Link GitHub only if pinned repos match what you claim. Empty GitHub hurts more than no link.

## 4-week build plan (if starting from zero)

| Week | Focus |
|------|-------|
| 1 | Pick domain, schema, auth, deploy "hello world" to prod |
| 2 | Core feature + tests for happy path |
| 3 | One hard edge case (payments, permissions, race condition) |
| 4 | README, demo video, add **one metric** to resume bullet |

**Stop at week 4 and apply.** Perfect v2 can wait until you have interviews.

**Next step:** Put your best project bullet on resume → [Score my resume](/jobs)
