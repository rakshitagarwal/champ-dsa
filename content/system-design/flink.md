# Flink

> Stream processor. You run **jobs** over Kafka (or Kinesis): windows, joins, aggregations, with watermarks for late data. Think "Spark, but streaming-first."

In interviews Flink (or Spark Structured Streaming, or Kafka Streams) appears when **counting or joining a firehose** cannot happen inside the API process: ad clicks, view counts, fraud scores, Top-K trending.

## When you pick it

1. [Ad click aggregator](/system-design/ad-click-aggregator) — billable counts with exactly-once sinks
2. [YouTube Top K](/system-design/youtube-top-k) — sliding window over views
3. Fraud / anomaly on payments or login streams
4. Enrich clicks with campaign metadata (stream-table join)

Do **not** put Flink on the user's HTTP request path. It is a **pipeline**. The API writes an event; Flink updates a store; dashboards read the store.

## Ideas to name

**Event time vs processing time.** Clicks have a timestamp. A late event still belongs in yesterday's window. **Watermarks** say "I think I have seen most events up to time T."

**Windows.** Tumbling (fixed buckets), sliding, session. Top-K over 10 minutes is a sliding window + state.

**State.** Flink keeps keyed state (per campaign id) in RocksDB / memory, checkpointed so a restart does not lose the count.

**Exactly-once.** Checkpoints + transactional sinks (Kafka / DB). At-least-once plus idempotent writes is often enough to say.

## Shape of a design

Producer (pixel, mobile) → Kafka topic `clicks` → Flink job keyed by `adId` → sink to [Cassandra](/system-design/cassandra) / [Redis](/system-design/redis) / warehouse.

API `GET /stats/:adId` reads the sink, not Flink itself.

## Failure modes

1. **Backpressure** — job slower than Kafka; lag grows
2. **State blow-up** — too many keys (one key per user forever)
3. **Watermark stuck** — idle source; windows never close
4. **Rebalance** — checkpoints must finish or you reprocess

**Phrase:** "The request path only publishes events. Flink aggregates with event-time windows and writes a serving store. Users never wait on the job."

**See also:** [Kafka](/system-design/kafka), [metrics monitoring](/system-design/metrics-monitoring).
