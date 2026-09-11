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
];
