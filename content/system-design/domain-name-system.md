# Domain Name System

> DNS — domain name ko IP address mein translate karta hai. Ye internet ka phone book hai.

> **TL;DR Hinglish:** DNS domain name (google.com) ko IP address (142.250.74.46) mein convert karta hai. Hierarchical hai — root → TLD (.com) → authoritative server. Caching se speed hota hai — browser, OS, router, ISP sab cache karte hain. TTL bolta hai kitna cache karana.

Jab hum `google.com` type karte hain, browser ko IP address chahiye. DNS is translate karta hai:

1. **Browser cache** — pehle dekhte hain, cached hai to answer
2. **OS cache** — `/etc/hosts` ya DNS cache
3. **Router cache** — local network router
4. **ISP DNS** — ISP ka recursive resolver
5. **Root server** → **TLD server** (.com, .org) → **Authoritative server** (google.com ka actual IP)

## How it works

1. Recursive query — DNS resolver sab peeche jaata hai (root → TLD → authoritative)
2. Iterative query — resolver se poochta hai, wo kisi aur ko point karta hai
3. **Caching** — har level pe cache hota hai, TTL (time-to-live) decide karta kitna rahega
4. **Record types:** A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), NS (nameserver)

```mermaid
graph LR
    A[Browser: google.com] --> B[OS DNS Cache]
    B -->|miss| C[Router Cache]
    C -->|miss| D[ISP Recursive Resolver]
    D -->|root| E[Root Server .]
    E -->|TLD| F[.com TLD Server]
    F -->|authoritative| G[google.com Authoritative]
    G -->|IP 142.250.74.46| D
    D -->|response| A
```

## Failure modes to mention

1. **DNS outage** — Entire website down if DNS fails
2. **DNS spoofing** — Fake DNS response redirect traffic
3. **Slow DNS** — No caching, recursive resolution takes 100ms+
4. **TTL too high** — Cached stale records after IP change

**🔴 Galti:** "DNS mein data store hota hai" — DNS sirf resolution karta hai, data store nahi.
**✅ Sahi:** "DNS is a distributed phone book. Root → TLD → authoritative hierarchy. Caching at every level for speed. TTL controls cache duration."

**Phrase:** DNS domain name ko IP address mein convert karta hai — root → TLD → authoritative hierarchy, caching se fast, record types A/AAAA/CNAME/MX.

**Yaad rakho (Revision):** DNS hierarchical resolution (root→TLD→auth), recursive vs iterative, caching everywhere, record types (A, AAAA, CNAME, MX), TTL for cache expiry.

**See also:** [IP](/system-design/ip), [Load Balancing](/system-design/load-balancing), [CDN](/system-design/cdn).
