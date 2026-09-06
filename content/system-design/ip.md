# IP

> Internet Protocol — har device ko ek unique address deta hai taake packets sahi jagah pahunch sakein.

> **TL;DR Hinglish:** IP ek addressing system hai — har device ko IP address milta hai (jaise ghar ka pin code). Packet mein source aur destination IP hota hai, routers iske basis pe forward karte hain. IPv4 (32-bit) aur IPv6 (128-bit) dono hain.

IP networking ka foundation hai. Har device ka IP address hota hai — IPv4 32-bit (e.g., `192.168.1.1`), IPv6 128-bit (e.g., `2001:db8::1`) taaki addresses na khatam ho. Packet mein header mein source IP, destination IP, TTL (time-to-live), protocol type hota hai. Routers is IP address ko dekhte hain aur packet forward karte hain — hop-by-hop routing.

## How IP works

1. **Packet creation** — Application data ko chunks (packets) mein split karo, har packet mein source/dest IP add karo
2. **Routing** — Routers destination IP dekhte hain, routing table se next hop decide karte hain
3. **Forwarding** — Packet ek router se doosre router tak jaata hai, TTL kam hota jaata hai
4. **Reassembly** — Destination pe packets ko original order mein joddo

## Key concepts

- **IPv4 vs IPv6** — IPv4 addresses khatam ho rahe hain, IPv6 se zyada addresses mil sakte hain
- **Subnetting** — IP ko chunks mein divide karna for efficient routing
- **TTL (Time to Live)** — Packet ki max hops count, infinite loop se bachne ke liye

```mermaid
graph LR
    A[Source Device] -->|Packet with Src/Dest IP| B[Router 1]
    B -->|Forward based on routing table| C[Router 2]
    C -->|TTL decremented| D[Destination Device]
```

## Failure modes to mention

1. **IP Spoofing** — Fake source IP use karna attacks ke liye
2. **Fragmentation issues** — Packet too big to one network mein, fragment hota hai, reassembly fail ho sakta hai
3. **NAT issues** — Private IP to Public IP mapping failures

**🔴 Galti:** "IP guarantees delivery" — IP connectionless hai, delivery guarantee nahi. TCP karta hai.
**✅ Sahi:** "IP is unreliable and connectionless. It routes packets best-effort. TCP provides reliability on top."

**Phrase:** IP connectionless hai, best-effort delivery karta hai, reliability TCP pe depend karti hai.

**Yaad rakho (Revision):** IPv4 32-bit, IPv6 128-bit, packet header mein src/dest IP + TTL, routers forward karte hain, spoofing/fragmentation risk.

**See also:** [TCP and UDP](/system-design/tcp-and-udp), [DNS](/system-design/domain-name-system), [Load Balancing](/system-design/load-balancing).
