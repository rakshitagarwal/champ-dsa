# Interview questions

> **Recruiter reality:** The debrief is: *"Can they own a system? Do they communicate? Any tenure or honesty flags?"* Senior loops add **system design**. Silent coding and fuzzy job dates fail more people than a missed DP trick.

## Do this today

- [ ] Write a 60-second "Tell me about yourself" with **SDE-2 / Senior** as the ask
- [ ] Draft STAR for **one** production story (gateway, events, payments, realtime lock)
- [ ] Draft a **45-second tenure story** if you have short stints (template below)
- [ ] Skim [System Design intro](/system-design/introduction) — 10 minutes

## "Tell me about yourself" (60 seconds)

```
I'm a full-stack engineer with [X] years shipping [SaaS / fintech / realtime] on NestJS and Next.js.
Most recently I [one system + metric — tenants, events, latency, or money].
Before that I [second highlight — locking, payments, or a user-facing loop].
I'm looking for SDE-2 / Senior Full Stack where I own a service end to end, not only tickets.
```

No college story. No tool laundry list.

## STAR (every behavioral)

| Letter | Do this |
|--------|---------|
| S | One sentence context |
| T | **Your** job, not "the team" |
| A | What you did — name the box (Redis lock, outbox, gateway) |
| R | Metric or a behavior that changed |

**90 seconds max.** They stop listening.

## Stories you must have (one each)

1. **Production incident** — how you found it, mitigated, prevented the next one
2. **Design trade-off** — sync vs NATS/Kafka, Mongo vs Postgres, gateway vs service logic
3. **Disagreement** — PM or teammate, decided with user/latency/cost, not ego
4. **Cut scope** — what you dropped to hit a date, how you told stakeholders
5. **Mentoring or review bar** — even informal: you raised a PR standard
6. **Why this company / why leave** — forward, never trash the current employer
7. **Tenure / hopping** — if dates are tight, this is not optional

## The hopping question (practice out loud)

They will ask. Answer in **four beats**:

1. **True constraint:** product consulting / project end / better ownership — one sentence, no novel
2. **What you shipped in that window:** one metric
3. **What you want now:** stay and own a platform for years
4. **Proof you are not a flight risk:** notice period, what you would own in 90 days here

**Weak:** "I like to learn new stacks."
**Strong:** "The engagement ended after we shipped X. I am targeting a product team where I can sit on one domain for years — that is why I am talking to you."

Do not invent overlapping jobs. Do not badmouth.

## Why Senior / SDE-2 (if they push years)

"I am applying at this level because I have already split services, run async at tens of thousands of events, and owned payment or realtime paths. I want the **scope** of SDE-2 — design + on-call + mentoring — not a title on a visiting card."

If they only hire Senior at 7 YOE, take SDE-2 and win inside. Do not argue the JD.

## Technical loop (what to study)

| Round | What "good" looks like | Prep |
|-------|------------------------|------|
| DSA | Talk, brute force, then cut. JS is fine if they allow it | [Patterns](/patterns) + [Solve](/practice) |
| System design | Requirements, APIs, boxes, **one** deep dive | [System Design](/system-design) — Bitly, WhatsApp, rate limiter first |
| Hiring manager | Ownership, conflict, 90-day plan | Stories above |
| Bar raiser / skip | Honesty on gaps, how you debug | Incident story |

Weekly rhythm:

| When | Do |
|------|----|
| 3 weekdays | 1 pattern or 2 LeetCode from the sheet |
| 2 weekdays | 1 design page: requirements → boxes → phrase |
| Weekend | 45 min mock: talk a design on a whiteboard or paper |

Depth on **15 patterns + 8 designs** beats 300 random LC.

## Questions to ask them (pick 2)

- What does a strong SDE-2 own in the first 90 days?
- How is on-call and who is paged for a customer-facing incident?
- Service vs monolith — what is actually in production?
- How do you review designs — RFC, Slack, or the loudest senior?

## Day-before

- [ ] JD: 3 keywords you will say naturally (tenancy, Kafka, Stripe — only if true)
- [ ] 2 questions for them
- [ ] Camera / mic if virtual
- [ ] Sleep

## Day-of

- [ ] Join 2 minutes early
- [ ] Coding: think aloud; brute force first if stuck
- [ ] Design: write requirements before boxes
- [ ] Optional thank-you in 24h if you have email

## When a round goes badly

Note **one** fix. Apply again the same week. Companies reject **fit for a req**, not your career.

**Next:** [DSA Patterns](/patterns) · [System Design](/system-design)
