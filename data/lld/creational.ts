import type { LldTopic } from "./types";

export const CREATIONAL: LldTopic[] = [
  {
    slug: "factory-vs-abstract-factory",
    title: "Factory Pattern Vs Abstract Factory Pattern (Creational)",
    tag: "Creational",
    body: `Factory Method ek seedhi dikkat suljhata hai: jagah-jagah bikhra new. Client khud tay na kare kaunsi subclass banegi — ek factory method key leke sahi cheez de de. Nayi type aaye to ek factory chhedo, das jagah nahi. Banane ka faisla ek jagah simat jaata hai, business logic saaf rehti hai.

Abstract Factory isse ek seedhi upar hai: related cheezon ka poora parivaar banata hai. UI toolkit ki factory Button, Checkbox aur Menu ek saath matching banati hai (Windows parivaar vs Mac parivaar) taaki style mix na ho. Seedha usool: ek product ke roop hon to Factory Method, poora parivaar consistent rakhna ho to Abstract Factory.

## How it works

- **Factory Method:** client key deta hai (jaise "car"), factory sahi subclass bana ke deti hai. Client ko subclass ka naam tak nahi pata hota.
- **Abstract Factory:** client parivaar chunta hai (jaise Windows), phir us parivaar ki har cheez matching milti hai — Button bhi Windows, Checkbox bhi Windows.
- Dono me client asli class se nahi judta — mocking se testing aasan ho jaati hai.

\`\`\`js
// Factory Method: client maange, factory subclass tay kare
class VehicleFactory {
  static create(type) {
    if (type === 'car') return new Car();
    return new Bike();
  }
}
// Abstract Factory: poora parivaar ek saath match kare
class WindowsFactory {
  button() { return new WindowsButton(); }
  checkbox() { return new WindowsCheckbox(); }
}
\`\`\`

## When to use

- Input dekh ke subclass chunni ho (parsers, vehicles, payment modes) — Factory Method.
- Related cheezein match karni hon (UI themes, DB dialects) — Abstract Factory.
- Banane ki logic test me mock karni ho — dono kaam aate hain.

## Common mistakes

- **Do stable types pe factory:** variation aani hi nahi to factory bekaar boilerplate hai.
- **Parivaar mix karna:** Windows button ke saath Mac checkbox — Abstract Factory ka poora maksad isi ko rokna hai.
- **Business logic factory me ghusedna:** factory sirf banaye, faisle aur kaam bahar rakho.

**🔴 Galti:** "Dono ek hi cheez hain" — Ye sabse aam confusion hai, interviewer isi pe pakadta hai.
**✅ Sahi:** "Ek product ke roop hon to Factory Method, poora matching parivaar ho to Abstract Factory — UI toolkit wali misaal do."

## Keep in mind

- Factory Method key dekh ke ek product banata hai.
- Abstract Factory related products ka parivaar banata hai jo aapas me match karein.
- Farq poochhein to parivaar vs single product bolo, UI toolkit wali misaal ke saath.
- Factory business logic se new bahar rakhta hai, jisse mocking se testing aasan hoti hai.
- Zyada mat lagao: do stable type jinme badlav aana hi nahi, wahan factory bekaar hai.`,
  },
  {
    slug: "builder-pattern",
    title: "Builder Design Pattern (Creational)",
    tag: "Creational",
    body: `Builder telescoping constructor wali musibat khatam karta hai: das optional fields wali class ke paanch confusing constructor ban jaate hain — kaunsa kab chalana hai, yaad rakhna mushkil. Iske bajaye ek Builder chained calls se fields jodta hai aur ek build() sab kuch ek jagah bana deta hai — validation bhi wahin rehti hai.

Iski pehchan hai kai optional parameters, khaas taur pe aisi objects me jo badalni na hon. Har field call site pe naam ke saath likhi jaati hai, isliye parameter order wale bugs gayab ho jaate hain. JS me Object.freeze se object ko sach me immutable banao — banne ke baad koi badlav nahi.

## How it works

1. **Chain karo:** har setter field set karke this lautata hai, taaki calls jud sakein.
2. **Validate karo:** build() me zaroori fields check hon — galat object ban hi na sake.
3. **Freeze karo:** final object immutable banao, taaki baad me koi bigaad na sake.

\`\`\`js
// Chained, saaf, validation ek jagah
class UserBuilder {
  setName(name) { this.name = name; return this; }
  setEmail(email) { this.email = email; return this; }
  setPhone(phone) { this.phone = phone; return this; }
  build() {
    if (!this.name) throw new Error('name zaroori hai');
    return Object.freeze({ name: this.name, email: this.email, phone: this.phone });
  }
}
// const u = new UserBuilder().setName('A').setEmail('a@x.com').build();
\`\`\`

## When to use

- Chaar ya zyada parameters hon, mostly optional (requests, configs, DTOs).
- Immutable object chahiye ho — banne ke baad badlav band.
- Call site pe readability chahiye ho — har field naam ke saath dikhe.

## Common mistakes

- **Zaroori field bhoolna:** validation build() me nahi rakhi to aadhi-bani objects ghumengi.
- **Do fields pe Builder:** chhoti class me seedha object literal kaafi hai, pattern zabardasti mat lagao.
- **Build ke baad mutation:** freeze karna bhool gaye to immutability ka vaada toota.

**🔴 Galti:** "Builder sirf lambe constructors ke liye hai" — Asal faayda validation ek jagah plus readability hai.
**✅ Sahi:** "Optional fields hon to Builder — chain karo, build me validate karo, freeze karke immutable banao."

## Keep in mind

- Chaar ya zyada parameters hon (mostly optional) to Builder lagao.
- Validation build() me rakho, taaki galat object ban hi na sake.
- Immutable objects ke saath best lagta hai — Object.freeze yaad rakho.
- Naam wale chained calls parameter-order bugs maar dete hain.
- Keemat boilerplate hai — chhoti class me seedha object literal hi kaafi hai.`,
  },
  {
    slug: "all-creational-patterns",
    title: "All Creational Design Patterns | Prototype, Singleton, Factory, AbstractFactory, Builder Pattern",
    tag: "Summary",
    body: `Creational patterns ek hi sawal ka jawab dete hain: cheezein paida kaise hon? Har pattern banane ki logic ko business logic se alag karta hai, taaki new ek jagah simte aur code test layak bane. Paanchon ko ek saath samajh lo to interview me "kaunsa pattern kyun" ka jawab turant nikalta hai.

Singleton ek hi instance ki guarantee deta hai (config ya pools ke liye) — JS me module hi singleton hota hai. Prototype mehengi template object ko dobara banane ke bajaye clone karta hai. Factory Method key dekh ke ek subclass chunta hai. Abstract Factory poore parivaar ko consistent rakhta hai. Builder complex object step by step jodta hai.

## Quick map

- **Singleton:** exactly ek chahiye — config, pools, loggers. JS me module export hi kaafi.
- **Prototype:** dobara banana clone se mehenga ho — editors, game spawns. Spread ya structuredClone.
- **Factory Method:** input dekh ke faisla ho — parsers, vehicles, payment modes.
- **Abstract Factory:** related products match karne hon — UI themes, DB dialects.
- **Builder:** kai optional fields hon — requests, immutable DTOs.

\`\`\`js
// Prototype: template clone karo, dobara mat banao
const circleTemplate = { r: 10, area() { return 3.14 * this.r * this.r; } };
const c2 = { ...circleTemplate, r: 20 }; // naya object, same shakl
// Gehri copy chahiye to structuredClone use karo
\`\`\`

## Common mistakes

- **Singleton har jagah:** sabse zyada galat jagah lagne wala pattern hai — global state testing maar deta hai, har baar wajah batao.
- **Prototype me shallow copy:** andar nested objects hon to spread kaafi nahi — structuredClone lo.
- **Factory bina variation:** do stable types pe factory bekaar boilerplate hai.

**🔴 Galti:** "Paanchon ke naam rata lo" — Naam se zyada "kab kaunsa" aana chahiye, map wali line bolo.
**✅ Sahi:** "Ek chahiye to Singleton, clone sasta ho to Prototype, key se faisla ho to Factory, parivaar match ho to Abstract Factory, fields zyada hon to Builder."

## Keep in mind

- Singleton: ek instance — config, pools, loggers (JS me module hi kaafi).
- Prototype: mehengi template clone karo — editors, game spawns.
- Factory Method: key se ek product — parsers, vehicles.
- Abstract Factory: matching parivaar — UI themes, DB dialects.
- Builder: kai optional fields — requests, DTOs.
- Interview trap: Singleton sabse zyada galat jagah lagta hai, har baar wajah batao.`,
  },
  {
    slug: "double-checked-locking",
    title: "BUG in Double-Checked Locking of Singleton Pattern and its Fix",
    tag: "Creational",
    body: `Double-checked locking lazy Singleton ko har call pe lock lagaye bina safe banane ki koshish hai: null check karo, lock lagao, phir null check karo, tab banao. Mashhoor bug ye hai ki volatile ke bina doosra thread aadhi-bani object dekh sakta hai. JVM writes ko aage-peeche kar sakta hai, isliye reference constructor khatam hone se pehle dikh sakta hai.

Fix instance ko volatile ghoshit karna hai, jo ye reordering rokta hai aur threads ke beech visibility pakki karta hai. Par tum JS me code karte ho, to tumhare liye asli baat ye hai: JS single-threaded hai (event loop), isliye lazy singleton wahan naturally safe hai — do threads wali race hoti hi nahi. Interview me bug samjhao (Java/JVM ka hai), fix batao (volatile), aur JS wala jawab bhi do (module pattern).

## How it works

1. **Pehla check (bina lock):** instance bana hua hai to turant lautao — fast path.
2. **Lock lagao:** sirf pehli baar banate time synchronized block me jao.
3. **Doosra check (lock ke andar):** kahin beech me koi aur bana to na gaya ho — phir banao.
4. **volatile fix:** reference tabhi dikhe jab construction poora ho — reordering band.

\`\`\`js
// JS single-threaded hai — lazy singleton naturally safe hai
let instance = null;
function getLogger() {
  if (!instance) instance = new Logger();
  return instance;
}
// Ya seedha module: export const config = Object.freeze({...});
// Asli DCL bug Java ka hai — wahan fix volatile tha.
\`\`\`

## When to use

- Lazy initialization chahiye ho (mehengi cheez pehli zaroorat pe bane) multi-threaded language me.
- JS me seedha module pattern lo — lock ki zaroorat hi nahi padti.

## Common mistakes

- **Volatile bhoolna:** bina volatile ke doosra check bekaar hai — aadhi-bani object mil sakti hai.
- **Har call pe lock:** poora method synchronized kar diya to DCL ka faayda hi khatam.
- **JS me lock dhoondhna:** event loop me race hoti hi nahi — wahan module pattern jawab hai.

**🔴 Galti:** "Double check kaafi hai, volatile optional hai" — Volatile hi poora fix hai, uske bina bug zinda hai.
**✅ Sahi:** "Check, lock, phir check, tab banao — aur instance volatile. JS me module pattern lo, race hoti hi nahi."

## Keep in mind

- Pattern yaad rakho: check, lock, phir check, tab banao.
- Bug reordering hai: reference pehle dikhe, constructor baad me khatam ho.
- Java me fix volatile hai — visibility + no-reordering ki guarantee.
- JS me race hoti hi nahi (single thread) — module pattern hi singleton hai.
- Ye sawal Java memory model test karta hai, sirf pattern nahi.`,
  },
  {
    slug: "object-pool-pattern",
    title: "Object Pool Design Pattern (Creational)",
    tag: "Creational",
    body: `Object Pool mehengi cheezon ko baar-baar bana ke phenkne ke bajaye dobara use karta hai. Database connections, threads aur bade buffers banane me asli time lagta hai, isliye pool taiyaar instances ka set rakhta hai: ek lo, use karo, wapas do. Banane ki keemat ek baar, aur pool tay karta hai ek saath kitni ho sakti hain.

Pool ko teen kaam aane chahiye: khali hone pe wait ya timeout ke saath dena, wapas lete time reset karna taaki agle ko saaf cheez mile, aur kharab cheez ko recycle ke bajaye phenkna. Wapasi pe reset bhoolna classic bug hai — purana state agle borrower me leak ho jaata hai.

## How it works

1. **Borrow:** pool se taiyaar object lo — khali ho to naya banao ya wait karo.
2. **Use:** apna kaam karo, object ganda ho jayega — normal hai.
3. **Return:** wapas dete time reset karo taaki agle ko saaf mile.
4. **Validate:** kharab nikle to pool me wapas mat dalo, phenk do.

\`\`\`js
// Lo, use karo, wapas do — wapas dete time reset zaroori
class ConnectionPool {
  constructor() { this.free = []; }
  borrow() { return this.free.pop() || new Connection(); }
  giveBack(conn) { conn.reset(); this.free.push(conn); }
}
\`\`\`

## When to use

- Banana sach me mehenga ho: DB connections, threads, bade buffers.
- Ek saath kitni ho sakti hain, ispe seema chahiye ho (load me bachav).
- Acquire/release cycle baar-baar chalta ho.

## Common mistakes

- **Reset bhoolna:** purana state agle borrower me leak — sabse aam bug.
- **Kharab object recycle:** tooti connection wapas pool me — har borrower fail hoga.
- **Sasti cheezon pe pool:** short-lived cheap objects pe pool ka kharcha faayde se zyada hai.
- **Unbounded pool:** seema na rakhi to pool hi memory leak ban jaata hai.

**🔴 Galti:** "Pool hamesha tez karta hai" — Sasti cheezon pe ulta slow karta hai, sirf mehengi creation pe lagao.
**✅ Sahi:** "Mehengi creation ho to pool — borrow, use, reset-on-return, kharab ko phenko, size seemit rakho."

## Keep in mind

- Sirf tab lagao jab banana sach me mehenga ho: connections, threads, buffers.
- Core API borrow aur return hai, reset-on-return state leak rokta hai.
- Pool size resource usage ko seema me rakhta hai — load me yehi feature hai.
- Dobara dene se pehle check karo: tooti cheez dobara mat do.
- Sasti short-lived objects ke liye pool ka kharcha bekaar hai.`,
  },
];
