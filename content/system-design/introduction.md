# Introduction

> Learn system design the way interviews actually work: pick a working design fast, then go deep where it matters. Style follows [Hello Interview — System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction).

These notes are for **product / infrastructure** interviews — "Design Bitly", "Design Uber", "Design a rate limiter". You take a fuzzy problem, turn it into APIs, then into boxes that scale and fail in a way you can explain.

There is no single right diagram. Interviewers grade how you **navigate** the problem, how you **trade off**, and whether you can **talk like a colleague**.

## What they are testing

Most companies use the same four ideas, even if the rubric words differ.

**Problem navigation.** Did you ask the right requirements, skip trivia, and still ship a working system? Candidates fail here by designing a CDN for 20 minutes when the interesting part was matching or consistency.

**Solution design.** Can you name the pieces (cache, queue, DB, CDN) and how data actually moves? Spaghetti boxes with no request path lose points.

**Technical excellence.** Do you know current tools — Redis, Kafka, Postgres, S3 — and when they are the wrong tool? 2015 advice like "always shard MySQL first" is a yellow flag.

**Communication.** Think out loud. When the interviewer pushes back, adjust. Do not defend a bad design.

Mid-level: a complete simple design is enough. Senior: skim the basics so you have time for one or two **deep dives**.

## Two interview flavors

**Product design** — Bitly, WhatsApp, YouTube, Uber. Users, APIs, storage, scale.

**Infrastructure design** — rate limiter, distributed cache, job scheduler, web crawler. The "product" is a platform other services sit on.

This page is **not** class-diagram LLD (parking lot, elevator). If they ask for classes and SOLID, that is a different interview.

## Delivery framework

Use this every time. Aim for a **working system first**, then harden.

1. **Requirements (~5 min).** Top 3 functional ("users can…") and 3–5 non-functional (latency, availability, consistency, scale). Write them down. Ask what is in scope for 45 minutes.
2. **Entities (~2 min).** Nouns: User, Ride, ShortUrl. First draft only.
3. **API (~5 min).** Default REST. Sketch 4–5 endpoints. Move on.
4. **High-level design (~10–15 min).** Boxes that satisfy each API. Talk the **happy path** end to end. Say "cache later" without drawing Redis yet if it is not needed for v1.
5. **Deep dives (~10 min).** The interesting NFR: celebrity fan-out, bid consistency, transcoding, geo search. Senior candidates **lead** this.

**Phrase:** "I'll start with a simple design that meets the functional APIs, then harden for scale and failure."

**Capacity math:** skip theater. Estimate only when a number **changes the design** ("can Top-K fit in one machine?").

## Non-functional checklist

Pick what matters for *this* product. Do not recite CAP for a to-do app.

1. **Consistency vs availability** under partition
2. **Scale** — read-heavy vs write-heavy; bursty (tickets, auctions)
3. **Latency** — which path must be under ~200ms?
4. **Durability** — can we lose events? Chat vs analytics
5. **Abuse** — rate limits, auth, bots
6. **Failure** — SPOFs, retries, multi-AZ

## How to use this section

Read **Introduction**, then skim **Key Technologies** so you can name tools with a reason. Spend most of your time on **Question Breakdowns** — that is how the knowledge sticks.

Each design page uses the same shape: what they really ask, requirements, APIs, boxes, the one deep dive interviewers probe, and a sentence you can say out loud.

**Related:** shipping and Docker → [production notes](/notes/advanced-topics). SQL depth → [SQL & DBMS](/notes/sql).
