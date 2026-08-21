# Elasticsearch

> Search engine, not a database. You **index documents** for full-text and aggregations. The system of record stays in Postgres / object storage.

Elasticsearch (and OpenSearch) stores inverted indexes. You send JSON documents; you query with relevance, filters, and aggregations. It is great at "find posts matching `pizza near me`" and bad at "transfer $10 with a serializable transaction."

## When you pick it

1. Full-text search (posts, businesses, videos, code)
2. Multi-field filters + sort (Yelp: geo + rating + open now)
3. Analytics dashboards that can be **slightly stale**
4. Autocomplete / suggestions (with care — often a separate suggester)

Do **not** use it as the only copy of user data. Cluster restarts, split brain, and mapping explosions are real. Dual-write without an [outbox](/system-design/kafka) will drift.

## How it shows up in a design

**Write path.** API writes Postgres. A worker (or Debezium) publishes `PostCreated`. An indexer upserts the ES document. Search can lag by seconds. Say that out loud — interviewers like it.

**Read path.** Search box → ES → list of IDs → hydrate from DB/cache if you need fresh privacy or counts. Or store enough fields in `_source` to render the result card.

**Privacy (FB post search).** Filter by `visibleTo` at index time or query time. Wrong filter = leaking friends-only posts. This is the deep dive, not BM25 trivia.

## Ideas worth naming

1. **Inverted index** — term → list of docs
2. **Analyzer** — tokenize, lowercase, stem
3. **N-grams** — autocomplete; fatter index
4. **Geo point** — distance filter for Yelp / Tinder
5. **Shards** — split the index; more shards ≠ always faster

## Failure modes

1. **Mapping conflict** — one field cannot be both text and date
2. **Hot shards** — one index / one day of logs eating the cluster
3. **Refresh interval** — near-realtime, not realtime chat
4. **Reindex** — schema change means a new index + alias swap

**Phrase:** "Search is a derived read model. I write the DB first, index asynchronously, and I accept lag. Hydrate from the source of truth when correctness matters."

**See also:** [Yelp](/system-design/yelp), [FB Post Search](/system-design/fb-post-search), [PostgreSQL](/system-design/postgresql).
