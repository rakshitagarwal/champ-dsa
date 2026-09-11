# Introduction

> Code likhne se pehle system sochna — yahi HLD hai, aur yahi senior engineer ko junior se alag karta hai.

> HLD (High Level Design) system ka naksha hai — kaunse boxes honge (API, cache, queue, database, CDN), data unke beech kaise bahega, aur load ya failure pe kya hoga. Code se pehle ye tay hota hai, kyunki galat architecture ka kharcha code likhne ke baad das guna padta hai.

HLD ki importance teen jagah dikhti hai. Pehle, bade systems dimaag mein nahi bante — WhatsApp ke 50M connections ya Ticketmaster ki flash sale bina soche handle nahi hoti; boxes aur data flow pehle paper pe prove hote hain. Doosra, HLD team ko ek bhasha deta hai — frontend, backend, DevOps sab same diagram dekh ke kaam karte hain, assumptions chhupti nahi. Teesra, interviews mein HLD round decide karta hai — DSA ke baad yahi wo round hai jo senior roles mein hire ya reject karta hai, kyunki isme trade-off thinking dikhti hai, ratta nahi.

HLD aur LLD ka farak seedha hai: HLD machines ki baat karta hai (servers, databases, load balancers), LLD classes ki (Parking Lot ke models, SOLID, design patterns). Dono ke interview alag hote hain, dono ki taiyaari alag. Ye section HLD ka hai — concepts, technologies, aur pure design breakdowns.

## Why HLD matters

**1. Costly mistakes saste mein pakadta hai.** Design phase mein ek galat DB choice whiteboard pe mit jaati hai; production mein wahi migration mahino ka kaam hai. HLD galti ko saste stage pe pakadta hai.

**2. Scale aur failure pehle se sochwata hai.** Happy path to koi bhi bana le — HLD poochta hai celebrity post pe fan-out kaise hoga, DB down ho to kya hoga, traffic 10x ho to kaun tootega. Yehi sawal interviewer bhi poochta hai.

**3. Trade-off thinking sikhata hai.** HLD mein sahi jawab ek nahi hota — SQL ya NoSQL, sync ya async, strong ya eventual. Har choice ki keemat samajhna hi senior thinking hai, aur ye skill sirf HLD practice se aati hai.

**4. Real career value.** Mid-level ke baad promotions aur top companies ke rounds HLD pe tikte hain. System design karna aana matlab bade systems own karne ke layak hona.

## How to use this section

Pehle **Key Concepts** padho — ye HLD ki theory hai (caching, CAP, sharding, consistent hashing) jo har design mein kaam aati hai. Fir **Key Technologies** skim karo taaki tool ka naam reason ke saath le sako (Redis kyun, Kafka kab). Sabse zyada time **Question Breakdowns** par lagao — Bitly, Uber, WhatsApp jaise pure designs se hi pattern yaad hota hai.

Har design page ka same shape hai: asli sawal kya hai, requirements, APIs, boxes, ek deep dive jo interviewer zaroor puchega. Interview mein bolo: *"Pehle simple design jo APIs meet kare, fir scale aur failure ke liye harden karenge."*

## Keep in mind

- HLD machines ki baat hai, LLD classes ki — farak pehle line mein bolo
- Design paper pe prove hota hai, code mein nahi — galti saste stage pe pakdo
- Happy path ke baad hamesha scale aur failure poocho — yehi deep dive hai
- Ek sahi jawab nahi hota — trade-off bolke jao: "Agar X to Y, warna Z"
- NFR sirf wahi jo is product mein matter kare — CAP har app pe mat rato
- Capacity math tabhi jab number design badle — naatak mat karo
