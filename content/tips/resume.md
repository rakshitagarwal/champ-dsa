# Resume optimise

> **Recruiter reality:** First screen is **6–10 seconds**. For Senior / SDE-2 they match **title, years, last company, and the first two bullets** to the req. They are not grading your Canva skills.

## Do this today

- [ ] Run the PDF through the [CV Analyzer](/jobs) — fix only the **top 3** issues
- [ ] Keep your **current title honest** (Software Engineer). Target **SDE-2 / Senior Full Stack** in the summary line, not by inflating the job title
- [ ] Rewrite bullet 1 of the latest role as **architecture + metric** (services, events, latency, tenants) — not "delivered N features"
- [ ] Stop after **2 revision rounds** this week — then send applications

## Which roles to apply for

| Your profile | Apply as | Skip for now |
|--------------|----------|--------------|
| ~3–5 YOE, full-stack, product features + some infra | **SDE-2**, Senior Full Stack at startups / Series B, "Software Engineer II" | Staff, EM, FAANG Senior unless they list 4 YOE |
| Strong Nest/Next, payments, realtime, microservices | Product companies that run **event-driven** backends | Pure Java/Spring shops if you cannot defend that stack in 45 min |
| Service-company tenure, short stints | Product roles where you **name the product**, not the client | "10+ YOE Senior" JDs — you will lose the years filter |

Do not put **Senior** on the resume if nobody has given you that title. Hiring managers check LinkedIn. Aim the **search** at Senior; keep the **document** accurate.

## What they scan first (in order)

1. Current title + company (brand helps; service-company names need a **product one-liner** in the bullet)
2. Years vs req (3–5 vs 5–8) — if you are under, **scope** in bullets has to look senior
3. Location, remote, **notice period** (India: put this near contact)
4. Boolean skills: Node, NestJS, TypeScript, React, Next.js, Postgres, Kafka/NATS — mirror the JD
5. GitHub only if [ChampDSA-level](/tips?tab=projects) repos are alive

They **skip:** a paragraph summary, 40-tool skill dump, ChatGPT/Cursor listed as skills, skill bars, hobbies.

## One-page structure

| Section | Rule |
|---------|------|
| Contact | Email, phone, LinkedIn, city. GitHub only if pinned repos match the stack you claim |
| Summary | **2 lines max.** Role you want + years + one proof. Example: "Full-stack engineer, 3+ years shipping NestJS/Next SaaS (multi-tenant, events, payments). Targeting SDE-2 / Senior Full Stack." |
| Experience | Newest first. **2–4 bullets.** Bullet 1 = hardest system, not a feature list |
| Projects | **At most 1–2** if you have 3+ YOE. Experience wins. See [Project work](/tips?tab=projects) |
| Skills | **8–12 terms**, grouped: Languages, Backend, Frontend, Data, Cloud. Drop tools you cannot defend |
| Education | One line |

## Senior bullets (XYZ)

**Weak:** "Worked on backend APIs using Node.js."

**Still weak:** "Delivered 15+ production-ready features across modules."

**Strong:** "Split a monolith into **6 NestJS services** behind an API gateway for **20+ tenants**, cutting p95 latency **~30%** and allowing per-service deploys."

**Strong:** "Handled **50k+ async events/day** on NATS so writes were not coupled to notifications — system stayed up when one consumer lagged."

Template: **Shipped [system] for [users/tenants], measured by [metric], by doing [design choice].**

Senior screens want **trade-offs**: why events vs sync, why Mongo vs Postgres, what fails at 10x.

## Tenure (if you changed jobs often)

Recruiters will count months. Do not hide dates. Do this instead:

1. **One honest line** in summary or first role: "Contract / product consulting then full-time on [product]" if that is true
2. Every short stint needs a **shipped outcome** in 90 days — otherwise it looks like you left before impact
3. Practice the [hopping answer](/tips?tab=interview) until it is 45 seconds, not a speech

Never fake overlapping employment.

## ATS rules

- Headings: Experience, Projects, Skills, Education
- PDF from Google Docs or Word — not a designed image
- **1 page** under ~6 YOE
- Paste **3–5 real keywords** from each JD into skills / bullets — not 30
- No tables or two-column layouts that break parsers
- Certifications (Coursera, NIIT) **off the resume** unless the JD asks. They burn space that should be a latency bullet

## Cut this from the skills line

AI **product** work (Gemini in a fintech assistant, RAG, evals) can stay as **one bullet** under the job.

Do **not** list ChatGPT, Claude, Cursor as skills. Everyone uses them. It reads as junior.

## When to stop rewriting

| Signal | Action |
|--------|--------|
| Same bullet rewritten 3 times | Ship it |
| Second ATS scan this week | Apply |
| Missing a keyword from today's JD | Add 3, not 30 |
| Zero applications in 7 days | Resume is good enough — [send emails](/tips?tab=email) |

**Maximum 2 ATS scans per week.** Pipeline beats polish.

**Next:** [Score my resume](/jobs)
