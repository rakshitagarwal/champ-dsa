# Introduction

> Design the system on paper before writing code — HLD is what separates senior thinking from junior execution.

> High Level Design is the map of a system — which boxes exist (API, cache, queue, database, CDN), how data flows between them, and what happens under load or failure. It gets decided before code because a wrong architecture costs ten times more after code is written.

HLD matters in three places. First, big systems are never built in someone's head — 50M WhatsApp connections or a Ticketmaster flash sale cannot be handled without thinking. Boxes and data flow get proven on paper first. Second, HLD gives a team one language — frontend, backend, and DevOps all work from the same diagram, so assumptions stop hiding. Third, interviews hinge on the HLD round — after DSA, it is the round that hires or rejects for senior roles, because it reveals trade-off thinking, not memorization.

HLD versus LLD is simple: HLD talks about machines (servers, databases, load balancers), LLD talks about classes (Parking Lot models, SOLID, design patterns). Different interviews, different preparation. This section is HLD — concepts, technologies, and complete design breakdowns.

## How to use this section

Start with **Key Concepts** — the theory behind every design (fundamentals, networking, databases, caching, queues, distributed systems). Skim **Key Technologies** so you can name each tool with a reason (why Redis, when Kafka). Spend the most time on **Question Breakdowns** — Bitly, Uber, and WhatsApp style walkthroughs are where patterns stick.

Every design page follows the same shape: what the real question is, requirements, APIs, boxes, one deep dive the interviewer will definitely probe, and one line you can say out loud. Say in the interview: *"First a simple design that meets the APIs, then harden it for scale and failure."*

## Keep in mind

- HLD is about machines, LLD is about classes — say this line first.
- Prove the design on paper, not in code — catch mistakes at the cheap stage.
- After the happy path, always ask about scale and failure — that is the deep dive.
- There is no single right answer — reason with trade-offs: "If X then Y, else Z."
- Apply non-functionals only where the product needs them — don't recite CAP for every app.
- Do capacity math only when the number changes the design — no theater.
