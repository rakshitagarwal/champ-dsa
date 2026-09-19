# Elasticsearch

> Full-text search and aggregations. Index asynchronously from the database; accept a little lag.

> Elasticsearch is a book index for your data — it knows where every word appears instantly. The database stays source of truth; Elasticsearch is its search-optimized copy, typically 1–2 seconds behind. Product search, log analytics, and autocomplete live here.

## When to pick it

1. Text search with relevance ranking (products, posts, docs)
2. Facets and aggregations (filters, counts, histograms)
3. Log analytics at volume (paired with Kibana)
4. Autocomplete and typo tolerance

**Don't use for:** primary storage, transactions, or exact analytics over billions of rows ([ClickHouse](/hld/clickhouse) territory).

## How indexing works

Documents flow from the database via CDC or [Kafka](/hld/kafka) into index **shards**; **analyzers** tokenize text (lowercase, stem, stopwords); **inverted indexes** map terms → documents. Writes refresh segments on a schedule — **near-real-time**, not instant. Size shards around 20–50GB; route by tenant or time for logs.

```mermaid
graph LR
    A[Postgres] -->|CDC / queue| B[Indexer]
    B --> C[Elasticsearch<br/>shards + replicas]
    D[Client] -->|search query| C
```

## Consistency story (say this)

- **Source of truth:** Postgres / primary DB.
- **Search index:** eventually consistent copy — "user just posted" may miss search for ~1s.
- **Read-your-write for author:** bypass ES and read primary, or wait on refresh for that doc id.
- **Deletes / updates:** must flow through the same pipeline or the index lies.

## Queries worth naming

- **Match / multi-match** — relevance-ranked text.
- **Term / terms filters** — exact faceting (cheap, cacheable).
- **Aggregations** — counts, histograms, stats.
- **Completion suggesters** — as-you-type autocomplete.
- **search_after** — deep pagination without costly `from + size`.

## Failure modes to mention

1. **Shard imbalance** — hot tenants overload shards; route deliberately.
2. **Mapping explosions** — unbounded dynamic fields bloat cluster state; use **explicit mappings**.
3. **Refresh lag** — just-written docs may not search for a second; say it upfront.
4. **Deep pagination cost** — prefer `search_after` / point-in-time.
5. **Split brain / yellow cluster** — replica missing; still searchable but not HA — alert on it.

**Mistake:** "Make Elasticsearch the primary database."
**Correct:** "Database is truth, Elasticsearch is its async search copy — slight lag accepted."

**Phrase:** "Elasticsearch is the book index — async from the database, slight lag accepted, relevance plus facets out of the box."

**Remember (Revision):** Inverted index; analyzers; near-real-time refresh; explicit mappings; search_after; DB stays truth.

**See also:** [fb post search](/hld/fb-post-search), [yelp](/hld/yelp), [kafka](/hld/kafka).
