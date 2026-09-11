# Indexes

> Data ko fast search karne ke liye data structures — B-tree, hash, LSM.

> Database index data search ko fast karta hai — like book's index. B-tree (range queries), hash (exact match), LSM tree (write-heavy) types hain. Index create karna read fast karta hai, lekin write slow karta hai (index bhi update hona padta hai). Covering index = query mein saara data index se mil jaaye, table access nahi zaroori.

Database index data retrieval ko fast karta hai:

**Index types:**
- **B-tree** — Balanced tree, range queries, sorted data (default for SQL)
- **Hash index** — Exact match only, O(1) lookup (in-memory, Redis)
- **LSM tree** — Log-structured merge tree, write-heavy (Cassandra, LevelDB)
- **Composite index** — Multiple columns together
- **Covering index** — All query data in index, no table lookup

**Trade-offs:**
- Read faster, write slower (index update overhead)
- Storage cost — index extra space leta hai
- Selective columns pe create karo, not all columns

```mermaid
graph TD
    A[Index Types] --> B[B-tree]
    A --> C[Hash Index]
    A --> D[LSM Tree]
    A --> E[Composite/Covering]
    B -->|Range queries| F[SQL default, sorted]
    C -->|Exact match| G[O(1), in-memory]
    D -->|Write-heavy| H[Cassandra, LevelDB]
    E -->|Multi-column/optimized| I[Covering queries]
```

## Failure modes to mention

1. **Index bloat** — Too many indexes = write slowdown, storage waste — selective indexing
2. **Index not used** — Query not matching index columns → full table scan
3. **Write amplification** — LSM tree compaction = write overhead, CPU spike
4. **Stale statistics** — Query planner uses outdated stats → bad index choice

**🔴 Galti:** "Index zyada = zyada fast" — Zyada indexes = zyada write overhead, storage bhi zyada.
**✅ Sahi:** "Indexes speed up reads but slow down writes. B-tree (range), hash (exact), LSM (write-heavy). Selective indexing, covering index for optimization."

**Phrase:** Indexes data search ko fast karte hain — B-tree (range), hash (exact match), LSM (write-heavy). Read faster but write slower, selective indexing, covering index.

**Yaad rakho (Revision):** B-tree (range queries), hash (exact match, O(1)), LSM (write-heavy, compaction), composite/covering indexes, read faster/write slower trade-off, selective indexing.

**See also:** [Database Indexing](/hld/database-indexing), [SQL Databases](/hld/sql-databases), [NoSQL Databases](/hld/nosql-databases).
