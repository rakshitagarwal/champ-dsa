# Cold email strategy

> **Recruiter reality:** Inboxes are flooded. Subject line + first sentence decide open rate. **Specific role or stack + city** beats clever wordplay.

## Do this today

- [ ] Pick 3 companies from [Companies](/companies)
- [ ] Find a **live job post** or recruiter for each — reference it in subject line
- [ ] Copy Version A or B, add one hook, attach resume PDF
- [ ] Send **3 emails** before optimizing anything else

## Weekly targets

| Metric | Target |
|--------|--------|
| New cold emails | 10/week |
| Follow-ups (5 days later) | 2–5/week |
| Time per email | 5–10 min max |
| Personalized hook | 1 sentence minimum |

Track sends: `npm run generate:job-tracker`

## Subject lines that get opened

**Weak:** `Opportunity` · `Resume` · `Job application`

**Strong:**
- `Full-stack engineer — React/Node — Bangalore — quick question`
- `Re: [Job title] req on Greenhouse — [Your name]`
- `Advice on engineering at {{Company}}? (full-stack, 4 YOE)`

Recruiters search inbox by **role title and location**.

## Version A — Recruiters / Talent Acquisition

Attach **resume PDF**. Many will not reply without it.

```
Subject: Full-stack engineer (React/Node) — {{City}} — {{Company}}

Hi {{First Name}},

{{Hook}}

I'm a full-stack engineer with [X] years on [stack], currently in [city] with [notice period] notice. I'm applying to [specific role title or req link if you have it] and wanted to reach out directly.

Happy to share more context in a 15-minute call if there's alignment.

Best,
[Your Name]
[Phone] · [LinkedIn]
[Resume attached]
```

## Version B — Engineering Managers (advice framing)

Higher reply rate when you are not asking for a job in line one.

```
Subject: 10 min advice on engineering at {{Company}}?

Hi {{First Name}},

{{Hook}}

I'm a full-stack engineer with ~[X] years on [stack], shipping [domain] products. I'm not asking for a referral — I'd value your perspective on what strong mid-level engineers look like on your team and how you'd suggest someone with my background approach {{Company}}.

I can keep it to 10 minutes async or on a call — whichever is easier.

Thanks,
[Your Name]
[LinkedIn]
```

## Example hooks (replace {{Hook}})

One **specific** sentence — product, tech blog, funding news, or feature you used:

1. **Razorpay:** "Your merchant onboarding docs are unusually clear — that's the product quality bar I want to build toward."
2. **Freshworks:** "I've followed Freshworks' Chennai-to-global product story and want to contribute to that kind of B2B velocity."
3. **Juspay:** "Checkout reliability at the scale Juspay operates is the fintech depth I'm targeting next."

Generic "I admire your company" gets deleted.

## Follow-up (5 days, no reply)

```
Subject: Re: [same subject as original]

Hi {{First Name}},

Bumping my note from last week — totally understand if you're swamped.

Still interested in [role/team] if there's fit. Happy to keep this to a short reply or call.

Best,
[Your Name]
```

**One** follow-up only. More than that risks spam reports.

## What recruiters do with cold email

| Good signal | Bad signal |
|-------------|------------|
| Role + location in subject | No attachment when they asked for resume |
| Short, scannable body | 400-word life story |
| Hook shows you know the company | Mass BCC to 50 people |
| Polite single follow-up | Daily pings |

## Anti-overthinking rules

| Don't | Do instead |
|-------|------------|
| Research 30 min before writing | Find req + 1 hook + send |
| Wait for perfect company list | Start with 3, expand weekly |
| Skip follow-up | One bump at day 5 |
| Send 0 because inbox is quiet | 10/week — pipeline needs volume |

## Find contacts

LinkedIn: `{Company} recruiter OR talent acquisition`

Or open roles on Greenhouse/Lever from [Companies](/companies) — email recruiter listed on posting when available.

**Next step:** `npm run generate:job-tracker` in `tools/job-search/`
