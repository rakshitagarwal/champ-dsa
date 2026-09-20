# HLD Cheat Sheet

> Numbers and timing you should say without opening notes.

> Memorize latency orders of magnitude, availability nines, estimation shortcuts, and the 45-minute interview split. Use this page for weekly recall drills, not for first-time learning.

## Latency numbers (order of magnitude)

| Operation | Typical latency | Interview use |
|-----------|-----------------|---------------|
| L1 / L2 cache reference | ~0.5–7 ns | "In-process is free vs network" |
| Main memory reference | ~100 ns | Local RAM vs remote call |
| SSD random read | ~100 μs | Local disk still ≫ RAM |
| HDD seek | ~10 ms | Avoid random HDD on hot path |
| Same-datacenter RTT | ~0.5–1 ms | Redis/DB in same DC |
| Same-region cross-AZ | ~1–2 ms | Multi-AZ cost is small |
| Cross-continent RTT | ~100–150 ms | Don't sync-replicate money cross-region for free |
| Packet CA → Europe → CA | ~150 ms | Round-trip budget for geo |

**Soundbite:** *"Same-DC Redis is ~1 ms; cross-continent is ~100× that — put strong consistency inside a region."*

## Availability nines

| Nines | Downtime / year | Downtime / month | Typical bar |
|-------|-----------------|------------------|-------------|
| 99% (two nines) | ~3.65 days | ~7.2 hours | Internal tools |
| 99.9% (three) | ~8.76 hours | ~43 minutes | Many consumer APIs |
| 99.99% (four) | ~52.6 minutes | ~4.3 minutes | Payments, redirect hot paths |
| 99.999% (five) | ~5.3 minutes | ~26 seconds | Rare; expensive multi-region |

**Soundbite:** *"I target four nines on the read path (~50 min/year). That means multi-AZ, health checks, and a degrade plan — not zero failure."*

## Estimation shortcuts

| Shortcut | Value | Use |
|----------|-------|-----|
| Seconds in a day | ≈ 10⁵ (86,400) | DAU → QPS |
| Seconds in a month | ≈ 2.5 × 10⁶ | Monthly → per-second |
| Peak vs average | 2–3× (sometimes 10× flash sales) | Size for peak |
| Read:write (URL shortener) | often 100:1–1000:1 | Cache the read path |
| ASCII char / UUID | 1 B / 16 B | Storage math |
| 1 MB photo × 1M users/day | ~1 TB/day media | Object store, not DB |
| Cache hot set | 20% keys → ~80% traffic | Size Redis for hot set |

**Quick QPS:** `avg QPS ≈ daily_ops / 10⁵`, then multiply peak factor.

**Quick storage:** `rows × bytes × retention` — if media exists, separate object storage immediately.

## 45-minute interview split

| Minutes | Phase | What you do |
|---------|-------|-------------|
| 0–5 | Clarify | Actors, v1 scope, out of scope, read/write ratio |
| 5–12 | NFRs + capacity | Latency, nines, consistency **per path**; only math that changes boxes |
| 12–25 | APIs + HLD | 4–8 endpoints; draw Client → CDN → LB → apps → cache/DB/queue |
| 25–38 | Deep dive | The one hard part (IDs, fan-out, geo, holds, idempotency) |
| 38–45 | Failure + close | What dies, what degrades, closing phrase |

If they push scale early, compress APIs and spend more on the deep dive. If they care about product, spend more on clarify and NFRs.

## Pocket phrases

- *"Simple design first that meets the APIs, then harden for scale and failure."*
- *"Consistency is per path — payments strong, feed eventual."*
- *"Cache is not the source of truth."*
- *"At-least-once delivery + idempotent consumers."*

**See also:** [Introduction](/hld/introduction), [Capacity estimation](/hld/capacity-estimation), [Fundamentals](/hld/fundamentals).
