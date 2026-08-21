# Project work

> **Recruiter reality:** At **3+ YOE**, GitHub is a **tie-break**, not the resume. They glance 10 seconds: is this a shipped product or a tutorial folder? Job bullets still carry the loop.

## Do this today

- [ ] Pick **one** repo to make interview-ready (do not start a fourth clone)
- [ ] README: problem → design → stack → **one number** → live URL
- [ ] Be able to answer: hardest bug, what breaks at 10x, what you would not do again

## What "senior-shaped" looks like

Hiring managers for SDE-2 / Senior want **production habits**, not another Netflix clone.

| Signal | Why |
|--------|-----|
| Live URL or 2-min demo | You deploy |
| Auth, data model, failure path | You did not stop at the happy path |
| README with trade-offs | You can whiteboard it |
| Commits in the last 90 days | Not abandoned |
| Tests or CI | You have a bar |

They do **not** care: 15 half repos, "AI wrapper" with no auth, certificates listed as projects.

## If you already have job experience

**Default:** 0–1 project on the resume. Your NestJS gateway, auction locking, Stripe tax, or multi-tenant SaaS **is** the project. Put side work only if it shows something the jobs do not (public product, OSS, or a system you can show).

**ChampDSA-shaped work is a good extra:** a real app with auth-adjacent flows, notes, design content, job tools — something you can demo in 3 minutes and defend (Next.js, routing, content model, what you would cache).

Do not list intern-style clones next to production microservices. It **lowers** perceived seniority.

## If you still need a side project

Build **one** of these, then stop:

1. **B2B slice:** auth, roles, audit log, CSV export, one money or booking invariant (no double charge / no double book)
2. **Event-backed API:** write to DB + outbox, consumer, idempotency key, dead-letter — even a small version
3. **Realtime room:** Socket.IO + Redis adapter, reconnect, last-write rules — you already know this domain if you have done auctions or live apps

Skip: todo, weather, another ChatGPT UI, 10 bootcamp repos.

## README template

```markdown
# Name — one-line value

**Problem:** Who hurts and why existing tools fail.
**What I built:** 2–3 sentences.
**Stack:** Only what is in production.
**Design notes:**
- Why Postgres vs Mongo for this data
- How I avoid double-processing events
**Live:** https://...
**Hardest part:** one paragraph you can say in interview
```

## Interview questions they will ask

1. What was actually hard? (locking, tenancy, payments, deploy — pick a real one)
2. What fails at 10x users? (indexes, queue, cache, hotspot)
3. What did you own vs copy from a tutorial?
4. How do you test the scary path? (idempotency, failed webhook)

If you cannot answer #1, do not put it on the resume yet.

## Resume placement

| YOE | Projects section |
|-----|------------------|
| Under 1 | 2–3 projects can carry the page |
| 2–6 | **1–2 lines.** Lead with jobs. Link GitHub in contact only if pinned repos match |
| Switch into product | 2 strong projects + skills aligned to the JD |

Empty GitHub linked from the PDF is worse than no GitHub.

## 4-week cap (only if you have nothing to show)

| Week | Ship |
|------|------|
| 1 | Domain, schema, auth, **deployed** hello world |
| 2 | Core user loop + one test |
| 3 | One ugly production problem (payments retry, unique constraint, reconnect) |
| 4 | README, demo, **one resume bullet** — then apply |

Week 5 is interviews, not v2.

**Next:** Put the bullet on the PDF → [Score my resume](/jobs) · talk the design → [System Design](/system-design)
