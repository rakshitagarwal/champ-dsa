# Job Search Cold-Outreach Tracker

Excel workbook for tracking company targets and personalized cold outreach for **Software Engineer / MERN / Full-stack** roles in India (3–6 YOE).

## Quick start

```bash
cd tools/job-search
pip install -r requirements.txt
python generate_tracker.py
python verify_tracker.py
```

Output: [`job_search_tracker.xlsx`](./job_search_tracker.xlsx)

Open in Excel or LibreOffice Calc. Formulas recalculate on open (`TODAY()`, reply rate, stat counters).

## Tabs

| Tab | Purpose |
|-----|---------|
| **README** | Workflow, free tools, warnings |
| **Company Tracker** | 50 curated companies with LinkedIn + careers links |
| **Outreach Tracker** | Log contacts, hooks, sends, replies, follow-ups |
| **Email Template** | Version A (TA), Version B (EM advice), follow-up |

## Regenerate

Edit [`companies.json`](./companies.json) to swap companies, then run `python generate_tracker.py` again.

From repo root:

```bash
npm run generate:job-tracker
```

## Notes

- LinkedIn links are pre-built people searches: `{company} recruiter OR talent acquisition`
- **Explain again** / Groq is unrelated — this is a standalone offline tracker
- Do not commit API keys; email finding and sending happen outside this sheet
