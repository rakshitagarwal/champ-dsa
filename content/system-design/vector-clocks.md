# Vector Clocks

> Bina global ghadi ke kaun pehle hua pata karo — har node apna counter rakhe.

> **TL;DR Hinglish:** Vector clock ek register jaisa jahan har server apne hisse pe tick maare. `A=[1,0,1]` vs `B=[1,1,0]` dekhe to pata chale ek dusre ka nahi dekha — concurrent, warna ek purana.

Dynamo, Cassandra, Riak, CRDT me.

## How it works

3 nodes, har write pe apna counter badhao, dusre ka vector saath bhejo.

- Client 1 → Node A: `A:1 => [1,0,0]`
- Client 2 → Node B: `B:1 => [0,1,0]` — concurrent (`[1,0,0]` vs `[0,1,0]` → koi bada nahi)
- A ne B ka `[0,1,0]` dekha, merge → `[1,1,0]` → write → `[2,1,0]` — ab `A` bada.

**Compare:** `VC1 < VC2` agar har element `<=` aur ek `<`. Agar mixed → concurrent.

**Wall clock kyun nahi?** NTP 10ms skew — event order galat ho jayega.

## Dynamo me?

`PUT key` → vector clock saath. `GET` pe 2 vectors mile → client ko bolo merge karo (sibling). Last-write-wins nahi — data lose.

**Dotted version vector:** har actor ka counter + id — Riak me.

```mermaid
graph LR
    A[Node A<br/>[1,0,0]] --> C[Merged<br/>[1,1,0]]
    B[Node B<br/>[0,1,0]] --> C
    C --> D[Next write A<br/>[2,1,0] > [1,1,0]]
```

## CRDT me?

OR-Set me vector se pata chale `add` aur `remove` concurrent to add jeete.

**🔴 Galti:** "Timestamp se order" — Clock skew se galat.
**✅ Sahi:** "Vector compare, concurrent to client merge / CRDT."

**Phrase:** "Vector har node ka counter, compare se pehle/baad/concurrent, Dynamo me sibling."

**Yaad rakho:** No global clock, `VC1<VC2` all <=, mixed = concurrent, Dynamo sibling.

**See also:** [replication](/system-design/replication), [eventual-consistency](/system-design/eventual-consistency), [dynamodb](/system-design/dynamodb).
