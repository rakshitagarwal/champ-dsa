import type { LldTopic } from "./types";

export const FUNDAMENTALS: LldTopic[] = [
  {
    slug: "what-is-lld",
    title: "What is LLD (Low Level Design)",
    tag: "Concept",
    body: `LLD matlab system ka class-level naksha. HLD me tum servers, databases aur load balancers ki baat karte ho — LLD me classes, unke beech ke rishte aur design patterns ki. Interview me aam taur pe 45 minute me Parking Lot, Splitwise ya BookMyShow jaisa kuch whiteboard pe design karne ko milta hai.

LLD ki importance isliye hai kyunki code likhne se pehle sochna sasta padta hai. Galat class structure production me technical debt banta hai — har nayi feature me kaam do guna hota hai. LLD wahi debt design stage pe pakadta hai. Aur interviews me ye round tumhari OOP pakad test karta hai: kya tum requirements se classes nikaal sakte ho, rishton ko sahi naam de sakte ho, aur trade-off bol sakte ho.

## How LLD interviews work

1. **Requirements clear karo (~10 min).** Functional scope pakdo — kya banega, kya nahi. Entities, limits aur edge cases poocho.
2. **Entities nikalo (~10 min).** Statement ke nouns hi classes bante hain — User, Ticket, Spot. Verbs methods bante hain.
3. **Rishte tay karo (~10 min).** Inheritance (is-a), composition (has-a), association — har rishte ka naam aur wajah bolo.
4. **SOLID aur patterns (~10 min).** Ek-do patterns wahan lagao jahan dil se fit hon. Zabardasti pattern negative jata hai.
5. **Walkthrough (~5 min).** Ek use case end tak chalao — happy path plus ek edge case.

\`\`\`js
// LLD interview loop: Requirements -> Entities -> Relationships -> Patterns -> Walkthrough
class ParkingLot {
  constructor() { this.floors = []; }
  generateTicket(vehicle) { /* use case yahan se shuru */ }
  checkout(ticket) { /* isko end tak chala ke dikhao */ }
}
\`\`\`

## What interviewers check

- **Entities:** kya saari zaroori classes nikli, koi core noun chhoota to nahi.
- **Relationships:** inheritance vs composition ka faisla sahi hai ya bas aadat se.
- **SOLID:** single responsibility dikh rahi hai ya god class ban gayi.
- **Patterns:** pattern fit ho raha hai ya naam ke liye thopa gaya hai.
- **Walkthrough:** design kagaz pe chalti hai ya sirf boxes bane hain.

**🔴 Galti:** "Seedha code likhna shuru kar dena" — Bina entities soche code likhoge to beech me design tootega.
**✅ Sahi:** "Pehle nouns se classes, phir rishte, phir patterns, aakhir me walkthrough — ye loop har problem me chalao."

## Keep in mind

- HLD machines ki baat hai, LLD classes ki — interview me ye line sabse pehle bolo.
- Loop yaad rakho: requirements, entities, relationships, patterns, walkthrough.
- Statement ke nouns classes bante hain, verbs methods bante hain.
- Composition ko inheritance pe tarjeeh do, jab tak sach me is-a rishta na ho.
- Sada kaam karta design, fancy toote design se behtar hai — pehle happy path chalao.
- Time baanto: requirements 10, entities 10, rishte 10, patterns 10, walkthrough 5.`,
  },
  {
    slug: "solid-principles",
    title: "SOLID Principles with Easy Examples",
    tag: "Concept",
    body: `SOLID paanch usool hain jo object-oriented code ko sambhalne layak rakhte hain. Single Responsibility: ek class ke badalne ki ek wajah honi chahiye — Payment class ko email nahi bhejna chahiye. Open/Closed: extension ke liye khula, modification ke liye band — naya behavior nayi class se aaye, test kiye code me haath daal ke nahi. Liskov Substitution: subclass apne parent ki jagah har jagah chalni chahiye — agar parent ka vaada tode to hierarchy hi galat hai.

Interface Segregation: ek moti cheez se kai chhoti focused cheezein behtar hain — Robot se eat() mat mangwao jo wo karta hi nahi. Dependency Inversion: asli class pe nahi, uske role pe nirbhar raho — NotificationService ko MessageSender role chahiye, SMS aur Email uske roop hain. Dhyan rahe, JS me interface keyword nahi hota — same method naam (duck typing) hi contract hota hai.

## The five principles

1. **SRP (Single Responsibility):** ek class, ek kaam — Payment se email logic bahar nikalo. Pehchan: class ka naam "aur" se samjhana pade to tooti hui hai.
2. **OCP (Open/Closed):** nayi class jodo, purani mat chhedo — Strategy iska classic namuna hai.
3. **LSP (Liskov Substitution):** subclass parent ki jagah chale — Square/Rectangle wala mashhoor violation yaad rakho.
4. **ISP (Interface Segregation):** chhoti focused cheezein — Robot ko sirf work() do, eat() mat do.
5. **DIP (Dependency Inversion):** role lo, implementation inject karo — testing aur swapping aasan.

\`\`\`js
// Dependency Inversion: asli class nahi, role inject karo
class SmsSender {
  send(to, msg) { /* ... */ }
}
class NotificationService {
  constructor(sender) { this.sender = sender; } // andar new mat karo
  notify(to, msg) { this.sender.send(to, msg); }
}
\`\`\`

## Common mistakes

- **God class:** sab kuch ek class me — User jo auth bhi kare, billing bhi, email bhi. SRP se todo.
- **Switch pe switch:** har nayi type pe purana code kholo — OCP todo, Strategy lagao.
- **Galat inheritance:** sirf code reuse ke liye extends — LSP toot-ta hai, composition lo.
- **Fat interface:** har implementer ko bekaar methods — ISP se todo.

**🔴 Galti:** "Har class me paanchon usool dikhana" — Zabardasti lagane se design complex hota hai, simple rehne do.
**✅ Sahi:** "Har usool pe ek violation aur ek fix sunao — interviewer ko depth dikhti hai, ratta nahi."

## Keep in mind

- SRP: har class ke badalne ki ek wajah — email ka logic Payment se bahar nikalo.
- OCP: nayi class se extend karo (Strategy iska classic namuna hai).
- LSP: subclass parent ka vaada nibhaye — Square/Rectangle wala mashhoor violation yaad rakho.
- ISP: kai chhoti cheezein, ek moti cheez se behtar.
- DIP: role lo, implementation inject karo — testing aur swapping aasan ho jaati hai.
- Har usool pe ek violation aur ek fix suna do, interviewer maan jayega.`,
  },
  {
    slug: "oop-pillars",
    title: "OOP Pillars (Encapsulation, Inheritance, Polymorphism, Abstraction)",
    tag: "Concept",
    body: `OOP ke chaar stambh har LLD interview ki neenv hain. Encapsulation matlab data aur uspe chalne wale methods ek class me bandho, bahar walon ko sirf zaroori chehra dikhao. Inheritance matlab nayi class purani ka bartav paaye (is-a rishta). Polymorphism matlab ek naam, kai roop — same method call alag objects pe alag kaam kare. Abstraction matlab kya karna hai dikhao, kaise hota hai chhupao.

JS me do baatein yaad rakho: interface keyword nahi hota — same method naam (duck typing) hi contract hai. Aur overloading nahi hoti — same naam ka doosra method pehle wale ko overwrite kar deta hai, isliye alag naam ya optional parameters lo. Composition (has-a) ko inheritance (is-a) pe tarjeeh do — ye line har interview me bolo.

## How it works

1. **Encapsulation:** fields class ke andar, bahar se sirf methods — JS me # se truly private banao.
2. **Inheritance:** extends se paao, override se badlo — sirf sach me is-a ho tabhi.
3. **Polymorphism:** same method naam, alag classes me alag kaam — caller ko farq nahi padta.
4. **Abstraction:** base class dhancha de, detail subclass chhupaye.

\`\`\`js
// Chaaron stambh ek misaal me
class Animal { // abstraction: khaaka yahan
  speak() { throw new Error('subclass bolegi'); }
}
class Dog extends Animal { // inheritance: is-a rishta
  #name; // encapsulation: bahar se band
  constructor(name) { super(); this.#name = name; }
  speak() { return this.#name + ' barks'; } // polymorphism: same naam, apna kaam
}
\`\`\`

## When to use

- Har LLD problem ki shuruaat me — entities ke rishte inhi chaaron se bante hain.
- Inheritance vs composition ka faisla karna ho.
- Interviewer seedha poochhe "OOP pillars samjhao" — ye theory round hai.

## Common mistakes

- **Har cheez inherit karna:** code reuse ke liye extends — has-a ko is-a mat banao, composition lo.
- **Encapsulation todna:** har field public kar diya to class ka vaada khatam — # lagao.
- **JS me overloading:** do same-naam methods me doosri pehli ko maar deti hai — alag naam do.

**🔴 Galti:** "Theory rat ke suna dena" — Bina misaal ke pillars khokhle lagte hain, har ek pe ek-line example do.
**✅ Sahi:** "Chaar stambh naam plus ek-line misaal ke saath — aur composition-over-inheritance ki line zaroor bolo."

## Keep in mind

- Encapsulation: data band, chehra khula — # se truly private banao.
- Inheritance sirf is-a pe — reuse ke liye composition lo.
- Polymorphism: ek naam, kai roop — caller ko farq nahi padta.
- Abstraction: kya dikhao, kaise chhupao.
- JS me interface nahi (duck typing) aur overloading nahi — ye do farak bolo.`,
  },
  {
    slug: "uml-diagrams",
    title: "UML Class Diagrams for Interviews",
    tag: "Concept",
    body: `UML class diagram whiteboard pe design samjhane ki zubaan hai. Har class ek dabba hai teen khaanon me: naam, fields, methods. Nishaan (+ public, - private, # protected) se visibility dikhao. Interview me 5-6 dabbe saaf bane hon to aadhi baat wahin ban jaati hai — code baad me aata hai, diagram pehle.

Asli kaam teeron (arrows) ka hai — chaar rishte, chaar nishaan: inheritance khokhla triangle (Dog se Animal), association seedhi line (Player khelta hai Game), aggregation khokhla diamond (Team ke paas Players — alag jee sakte hain), composition bhara diamond (House ke Rooms — saath jeete-marte hain). Dependency dotted line hai (sirf use karta hai).

## How it works

1. **Dabbe banao:** har entity ek box — naam upar, fields beech me, methods neeche.
2. **Teer jodo:** rishta pehchano — is-a (triangle), has-a kamzor (khokhla diamond), has-a pakka (bhara diamond), use-karta (dotted).
3. **Multiplicity likho:** 1, *, 1..* — ek ParkingLot me * Floors, ye line confusion khatam karti hai.

\`\`\`js
// UML rishton ka JS me matlab
class Engine { /* ... */ }
class Car {
  constructor() { this.engine = new Engine(); } // composition: Car mare to Engine mare
  setDriver(d) { this.driver = d; } // aggregation: Driver alag jee sakta hai
}
class EV extends Car {} // inheritance: is-a rishta
\`\`\`

## When to use

- Har LLD interview ke shuru me — code se pehle diagram banao.
- Rishte samjhane hon — teer dekh ke interviewer turant pakadta hai.
- Design review ya documentation me.

## Common mistakes

- **Bina teer ke dabbe:** rishte na dikhe to diagram adhura hai — har jod pe teer lagao.
- **Aggregation vs composition mix:** lifecycle saath hai ya alag — yehi farak hai, bolo.
- **Bahut detail:** har getter-setter mat likho — important fields/methods hi dikhao.

**🔴 Galti:** "Seedha code, diagram skip" — Interviewer tumhari soch diagram me dekhta hai, code me nahi.
**✅ Sahi:** "Pehle 5-6 dabbe teeron ke saath — rishte dikhe to design aadha samajh aa gaya."

## Keep in mind

- Dabba teen khaane: naam, fields, methods (+/-/# visibility).
- Chaar teer: triangle (inheritance), line (association), khokhla diamond (aggregation), bhara diamond (composition).
- Composition me lifecycle saath hai, aggregation me alag — ye farak bolo.
- Multiplicity likho: 1, *, 1..* — confusion khatam.
- Detail kam rakho — important cheezein hi dikhao.`,
  },
  {
    slug: "concurrency-essentials",
    title: "Concurrency Essentials for LLD",
    tag: "Concept",
    body: `Concurrency ka matlab hai kai kaam aage-peeche chal rahe hon aur shared cheez ko chhoote hon — aur wahi race shuru hoti hai. LLD me ye booking problems me aata hai: do users same seat, do cars same spot. Critical section wo hissa hai jahan ek time pe ek hi hona chahiye — isko lock (mutex) se guard karte hain. Check-then-act do kadam me toota to race pakki: check aur act ek atomic unit me hone chahiye.

Deadlock chaar sharton pe hota hai: mutual exclusion, hold-and-wait, no preemption, circular wait. Bachav: locks hamesha same order me lo, timeouts rakho. Optimistic tareeka version check hai — padhte time version note karo, likhte time wahi ho to likho, warna dobara try karo. Aur JS walon ke liye khaas baat: JS single-threaded hai (event loop), isliye shared memory race hoti hi nahi — par DB calls ke beech ka gap phir bhi race deta hai, isliye DB-level atomicity chahiye.

## How it works

1. **Critical section pehchano:** shared cheez chhoone wala hissa lock karo.
2. **Check-and-act jodo:** check plus act ek atomic unit — beech me koi na ghuse.
3. **Version se ladho:** optimistic approach — version badli to retry karo.
4. **Deadlock roko:** lock order fix rakho, timeouts lagao.

\`\`\`js
// Optimistic version check: padho, badlo sirf agar waisa hi ho
function holdSeat(seat, seenVersion) {
  if (seat.version !== seenVersion) {
    throw new Error('Seat badal chuki — dobara try karo');
  }
  seat.version++;
  seat.status = 'Held';
}
// DB me ye version check + update ek transaction me hota hai
\`\`\`

## When to use

- Booking/inventory problems me (seats, cars, stock) — race wahi hoti hai.
- Counter ya shared state badal rahi ho.
- Interviewer "do users ek saath aaye to?" poochhe — yehi jawab hai.

## Common mistakes

- **Check phir act, alag-alag:** beech ka gap hi race hai — atomic unit banao.
- **Har jagah lock:** poora method lock kar diya to throughput mari — critical section chhota rakho.
- **Lock order ulta:** do locks alag order me liye to deadlock pakka — order fix rakho.
- **JS me lock dhoondhna:** event loop me race nahi hoti — DB atomicity hi jawab hai.

**🔴 Galti:** "Concurrency ka zikr hi nahi karna" — Booking problem me race na bolo to design adhura hai.
**✅ Sahi:** "Critical section pehchano, check-and-act atomic karo, version se retry karo — DB level pe."

## Keep in mind

- Race check-then-act ke gap me hoti hai — dono ek atomic unit me rakho.
- Deadlock chaar sharton pe: order fix + timeout se bacho.
- Optimistic version check: padho, wahi ho to likho, warna retry.
- Critical section chhota rakho — poora method lock mat karo.
- JS single-threaded hai — race DB gap me hoti hai, DB atomicity lo.`,
  },
  {
    slug: "dependency-injection",
    title: "Dependency Injection (DI)",
    tag: "Concept",
    body: `Dependency Injection ka matlab hai class apni zarooratein khud na banaye — bahar se le. OrderService ko PaymentGateway chahiye to andar new mat karo, constructor me lo. Faayda dohra hai: testing me mock de sakte ho, production me asli — aur DIP usool apne aap lag jaata hai.

Teen tareeke hain: constructor injection (sabse saaf — zaroori cheezein), setter injection (optional cheezein), aur container (Spring, InversifyJS) jo bada system me wiring sambhalta hai. Service locator se bacho — wo chhupa global state hai, DI ka ulta. JS me constructor injection hi 90% cases me kaafi hai.

## How it works

1. **Maango, mat banao:** zaroorat constructor parameter banao.
2. **Bahir se do:** banate time asli ya mock inject karo.
3. **Role pe nirbhar raho:** concrete class nahi, duck-typed role lo.

\`\`\`js
// Maango, mat banao — testing aur swapping muft me
class OrderService {
  constructor(paymentGateway, notifier) {
    this.payment = paymentGateway; // asli ya mock, bahar se aayega
    this.notify = notifier;
  }
  checkout(cart) {
    this.payment.charge(cart.total());
    this.notify.send(cart.user());
  }
}
// test: new OrderService(mockPay, mockNotify) — production code untouched
\`\`\`

## When to use

- Testing me mocks chahiye hon — bina DI mock ghusana mushkil hai.
- Implementation badalni ho (test gateway vs real gateway).
- Bada system ho jahan wiring haath se mushkil ho — container lo.

## Common mistakes

- **Andar new karna:** har new testing ka darwaza band karta hai.
- **Service locator:** global se nikalna DI nahi, chhupa coupling hai.
- **Har cheez inject:** stable value objects (Money, DateRange) inject mat karo — banate raho.

**🔴 Galti:** "DI matlab framework" — Framework container hai, DI usool hai — constructor se shuru hota hai.
**✅ Sahi:** "Zaroorat constructor me lo — test me mock, production me asli; value objects inject mat karo."

## Keep in mind

- Maango, mat banao — constructor injection sabse saaf hai.
- Testing muft me milti hai: mock do, code untouched rahe.
- Role lo (duck typing), concrete class nahi.
- Service locator DI nahi hai — chhupa global state hai.
- Stable value objects inject mat karo — unhe banate raho.`,
  },
];
