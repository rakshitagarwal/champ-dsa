import type { LldTopic } from "./types";

export const STRUCTURAL: LldTopic[] = [
  {
    slug: "decorator-pattern",
    title: "Decorator Design Pattern (Structural)",
    tag: "Structural",
    body: `Decorator kisi object me runtime pe khubi jodta hai — usko lapet ke, uski class chhede bina aur subclass ki baadh laye bina. Saadi Pizza Cheese me lapto, phir Olives me — har wrapper apni keemat jodta hai aur baaki andar bhej deta hai. Har decorator wahi method naam rakhta hai jo andar wali cheez ka hai, isliye client ko farq nahi padta.

Jis cheez ko ye maarta hai wo hai subclass explosion: chaar toppings ke liye solah subclass chahiye hoti, jabki chaar decorator aapas me jud jaate hain. JS me ye pattern roz dikhta hai — higher-order functions aur Express ke middleware bilkul isi tarah lapet-te hain.

## How it works

1. **Same naam rakho:** decorator aur andar wali cheez ke methods ek jaise hon.
2. **Andar rakho:** decorator wrapped object ka reference pakadta hai.
3. **Jodo aur bhejo:** apni khubi jodo, baaki andar delegate karo — chaaho jitni parat lapeto.

\`\`\`js
// Har wrapper same method naam rakhta hai, andar delegate karta hai
class Cheese {
  constructor(pizza) { this.pizza = pizza; }
  cost() { return this.pizza.cost() + 30; }
}
// new Cheese(new Olives(new BasePizza()))
\`\`\`

## When to use

- Runtime pe khubi jodni ho, compile time pe nahi pata ho kaunsi lagegi.
- Subclass explosion dikh raha ho — combinations guna ho rahe hon.
- Kisi teesri party ki class chhede bina extend karni ho.

## Common mistakes

- **Order bhoolna:** lapetne ka order matter kare to document karo, warna ulte nateeje.
- **Bahut gehri lapet:** das parat ke baad debug mushkil — zaroorat pe hi lapeto.
- **Interface todna:** wrapper ne method naam badla to transparency gayi, pattern toota.

**🔴 Galti:** "Decorator inheritance jaisa hi hai" — Inheritance compile time fix hai, decorator runtime pe judta hai — yehi core farak hai.
**✅ Sahi:** "Runtime khubi chahiye to lapeto — same naam, andar delegate, subclass explosion khatam."

## Keep in mind

- Lapetna runtime pe hota hai, inheritance compile time pe fix hai — yehi core farak hai.
- Subclass explosion khatam: N toppings jud jaati hain, classes multiply nahi hoti.
- Har decorator andar same method naam wali cheez pakadta hai.
- JS me higher-order functions aur middleware isi pattern ke roop hain.
- Lapetne ka order matter kar sakta hai — behavior depend kare to document karo.`,
  },
  {
    slug: "proxy-pattern",
    title: "Proxy Design Pattern (Structural)",
    tag: "Structural",
    body: `Proxy asli cheez ka humshakl hai — same method naam, par andar jaane pe control. Teen classic istemal hain: lazy loading (bhaari cheez pehli zaroorat pe banao), access control (delegate se pehle permission check), aur remote ya caching proxy (network calls ya dohra kaam same cover me chhupao).

Dekhne me Decorator jaisa lagta hai, par neeyat alag hai: Decorator khubi jodta hai, Proxy pehra deta hai. Aur JS walon ke liye khushkhabri — language me native Proxy hai, jo get/set ko pakad ke lazy ya validation logic lagane deta hai.

## How it works

1. **Humshakl banao:** proxy asli cheez wale method naam rakhta hai.
2. **Pehle check karo:** lazy ho to pehli call pe banao, protection ho to permission dekho.
3. **Phir delegate karo:** asli kaam andar wali cheez kare — client ko khabar nahi.

\`\`\`js
// Same method naam, delegate se pehle access control
class ImageProxy {
  constructor(file) { this.file = file; this.real = null; }
  display() {
    if (!this.real) this.real = new RealImage(this.file); // lazy load
    this.real.display();
  }
}
\`\`\`

## When to use

- Bhaari cheez der se banani ho (lazy/virtual) — images, ORM rows.
- Permission lagani ho (protection) — sensitive operations.
- Network ya dohra kaam chhupana ho (remote/cache) — gateway, caches.

## Common mistakes

- **Lazy me race:** pehli access do jagah se aaye to do object banenge — guard lagao.
- **Har jagah proxy:** simple direct call kaafi ho to proxy bekaar layer hai.
- **Decorator confusion:** khubi jodni hai ya pehra dena hai — pehle ye tay karo.

**🔴 Galti:** "Proxy aur Decorator ek hi hain" — Shakal same, neeyat opposite: ek jodta hai, doosra rokta hai.
**✅ Sahi:** "Access control chahiye to Proxy — same naam, pehle check, phir delegate. Teen istemal: lazy, protection, remote."

## Keep in mind

- Teen istemal: lazy (virtual), permission check (protection), network/cache chhupana (remote).
- Client ko kabhi pata nahi chalta — method naam same hai.
- Decorator khubi jodta hai, Proxy pehra deta hai — interviewer ko ye farak bahut pasand hai.
- Misaal: ORM lazy loading, API gateways, caching proxies.
- JS me native Proxy bhi hai — get/set trap karke lazy ya validation lagao.`,
  },
  {
    slug: "composite-pattern-file-system",
    title: "Composite Design Pattern (Structural) | Design File System",
    tag: "Structural",
    body: `Composite akeli cheez aur samooh se ek jaisa bartav karwata hai. File aur Directory dono size() rakhte hain: File apna size deti hai, Directory bachchon ka jod. Client ko parwah nahi kaun pakda hai, aur nesting kitni bhi gehri ho sakti hai.

Ye Design File System ka standard jawab hai, aur org charts, UI trees aur menu structures me bhi yehi shakl hai. Keemat hai ek jaisa interface jo zabardasti lag sakta hai: addChild jaise operations leaf pe be-maani hain, to wahan ya to error phenko ya chup-chaap ignore karo — aur batao kaunsa chuna.

## How it works

1. **Ek naam do:** leaf aur container dono same methods rakhein (jaise size()).
2. **Leaf seedha jawab de:** File apna bytes gin ke de deti hai.
3. **Container jod ke de:** Directory bachchon pe same method chala ke total karti hai — recursion khud kaam karta hai.

\`\`\`js
// Leaf aur container — dono ka same method naam
class FileNode {
  constructor(bytes) { this.bytes = bytes; }
  size() { return this.bytes; }
}
class Directory {
  constructor() { this.children = []; }
  size() { return this.children.reduce((t, n) => t + n.size(), 0); }
}
\`\`\`

## When to use

- Ped jaisi structure ho: file system, org chart, UI trees, nested menus.
- Client ko farq na padna chahiye akeli cheez hai ya samooh.
- Gehri nesting ho jahan recursion fitri lage.

## Common mistakes

- **Leaf pe addChild:** be-maani operation pe policy batao — throw ya ignore, chup mat raho.
- **Cache bhoolna:** ped badle to cached totals stale honge — invalidate karo.
- **Chakr (cycles):** bachcha apne dada ko pakde to recursion infinite — aisa design me roko.

**🔴 Galti:** "Har tree me Composite" — Do level se zyada gehrai na ho to saada arrays kaafi hain.
**✅ Sahi:** "Akeli aur samooh se ek jaisa bartav chahiye to Composite — File plus Directory wali misaal do."

## Keep in mind

- Leaf aur container se ek jaisa bartav — yehi poora pattern hai.
- File System canonical interview application hai: File plus Directory.
- Recursion kaam karta hai: container ke method bachchon ko bhej dete hain.
- addChild jaise operations pe policy batao: throw ya ignore.
- Org charts, UI component trees aur nested menus me bhi yehi lagta hai.`,
  },
  {
    slug: "adapter-pattern",
    title: "Adapter Design Pattern (Structural)",
    tag: "Structural",
    body: `Adapter ek interface ko doosre me badal deta hai jo client expect karta hai, taaki be-mel cheezein bina dono ko chhede saath kaam karein. Tumhara code USB-C wala Charger maangta hai, purani library me sirf MicroUSB hai: adapter purani class ko lapet ke naya chehra de deta hai.

Asli code me ye har jagah milta hai: third-party SDKs, purane payment gateways, library upgrades. Lapetne wala (composition) roop lo — JS me multiple inheritance hoti hi nahi, aur wrapper lachakdar rehta hai.

## How it works

1. **Naya chehra do:** adapter wahi methods rakhta hai jo client maangta hai.
2. **Purana andar rakho:** purani class ka instance composition se pakdo.
3. **Anuvaad karo:** naye method calls ko purane method calls me badlo — business logic mat jodo.

\`\`\`js
// Purana cover, naya chehra
class PrinterAdapter {
  constructor() { this.legacy = new LegacyPrinter(); }
  print(doc) { this.legacy.printDocument(doc); } // purana naam, naya cover
}
\`\`\`

## When to use

- Purana code ya third-party SDK naye interface se mel nahi khata.
- Dono taraf haath lagana allowed nahi (library, legacy system).
- Gateway integrations jahan protocol/version badal gaya ho.

## Common mistakes

- **Business logic ghusedna:** adapter sirf anuvaad kare, faisle na le.
- **Dono taraf apni hon:** apna code hai to refactor karo, adapter mat lagao.
- **Do-tarefa anuvaad:** ek taraf kaafi ho to do taraf mat banao — complexity badhti hai.

**🔴 Galti:** "Adapter Bridge jaisa hai" — Adapter baad ki be-mel theek karta hai, Bridge pehle se variation ke liye design hota hai.
**✅ Sahi:** "Be-mel ho aur dono taraf haath na lagana ho to Adapter — purana andar, naya chehra, sirf anuvaad."

## Keep in mind

- Be-mel interfaces jodta hai, dono taraf haath lagaye bina.
- Purana code, third-party SDKs aur gateway integration me lagao.
- Composition wala adapter lo — JS me wahi natural hai.
- Sirf ek-tarfa anuvaad hai: business logic mat jodo.
- Dono taraf tumhare hon to refactor karo, adapter mat lagao.`,
  },
  {
    slug: "facade-pattern",
    title: "Facade Design Pattern (Structural)",
    tag: "Structural",
    body: `Facade complex system pe ek seedha darwaza de deta hai. Home theater me projector, amplifier, lights aur player ka das-step startup hai; WatchMovie facade usko ek method me samet deta hai. Client system ki detail bhool jaata hai, aur system stable darwaze ke peeche aaram se badalta rehta hai.

Ye service layers aur helper APIs ke peeche roz ka pattern hai. Imaandari se limit bhi batao: facade aam rasta aasan karta hai, har ajeeb combination cover nahi karta — power users ko kabhi seedha system chahiye hoga.

## How it works

1. **Aam raste chuno:** 90% users jo karte hain, unko ek method me sameto.
2. **Tartib andar rakho:** steps ka order, cleanup aur error handling facade sambhale.
3. **System khula rakho:** ajeeb cases ke liye subsystem direct accessible rahe.

\`\`\`js
// Ek seedha method, das-step system chhupa hua
class HomeTheater {
  watchMovie() { this.lights.dim(); this.projector.on(); this.player.play(); }
  endMovie() { this.player.stop(); this.projector.off(); this.lights.bright(); }
}
\`\`\`

## When to use

- Subsystem ke das steps hon aur aam user ko ek call chahiye ho.
- Client coupling ghatana ho — system badle, bahar kuch na hile.
- Service layers, helper SDKs, startup/shutdown sequences me.

## Common mistakes

- **Sab kuch chhupana:** ajeeb cases ke liye subsystem band kar diya to power users phasenge.
- **Business logic ghusedna:** facade tartib chalaye, faisle na le.
- **Mediator confusion:** doston ki baat chalani ho to Mediator hai, darwaza nahi.

**🔴 Galti:** "Facade poora system replace karta hai" — Ye aasan karta hai, replace nahi — exotic cases seedhe system se hon.
**✅ Sahi:** "Aam rasta ek method me sameto, subsystem khula rakho — coupling ghate, flexibility rahe."

## Keep in mind

- Complex system pe ek seedha entry point — yehi poora pattern hai.
- Client ka coupling ghat-ta hai: system badle, bahar kuch nahi hilta.
- Misaal: service layers, helper SDKs, startup/shutdown sequences.
- Ye aasan karta hai, replace nahi karta — ajeeb cases seedhe system se hon.
- Mediator se confuse mat karo: Facade mushkil chhupata hai, Mediator doston ki baat chalata hai.`,
  },
  {
    slug: "bridge-pattern",
    title: "Bridge Design Pattern (Structural)",
    tag: "Structural",
    body: `Bridge khaaka (abstraction) ko amal (implementation) se alag kar deta hai taaki dono azaad badlein. Shape ka khaaka (Circle, Square) rendering ka kaam Renderer ko saunp deta hai (Vector, Raster) — jodne ke liye composition se. Nayi shape aaye to renderer untouched, naya renderer aaye to shape untouched: M shapes guna N renderers ki jagah M jama N classes rehti hain.

Adapter se confusion classic hai, farak neeyat aur timing ka hai: Adapter baad me bani be-mel ko theek karta hai, Bridge pehle se design hota hai taaki do khandaan alag-alag badlein. Device aur remote wali misaal (TV plus Remote ke Basic/Advanced roop) wahi baant dikhati hai.

## How it works

1. **Do taraf alag karo:** khaaka (kya hai) aur amal (kaise hota hai) do hierarchies banao.
2. **Composition se jodo:** khaaka amal ka reference pakadta hai, inheritance nahi.
3. **Azaad badlo:** nayi shape jodo ya naya renderer — doosri taraf untouched rahe.

\`\`\`js
// Khaake ke paas amal ka reference (composition se)
class Circle {
  constructor(renderer) { this.renderer = renderer; }
  draw() { this.renderer.drawCircle(this.radius); } // renderer ki detail nahi pata
}
\`\`\`

## When to use

- Dono taraf badlav aana ho: shapes bhi, renderers bhi.
- M guna N explosion dikh raha ho — wahi Bridge ki nishaani hai.
- Themeable layers, device/remote jaise jode hon.

## Common mistakes

- **Ek taraf stable ho:** sirf ek side badalni ho to saada Strategy kaafi hai, Bridge overkill hai.
- **Adapter confusion:** baad ki theek vs pehle ki design — timing ka farak bolo.
- **Leaky abstraction:** khaake se amal ki detail jhalke to faayda khatam.

**🔴 Galti:** "Har do-hierarchy me Bridge" — Sirf variation dono taraf ho tabhi; warna Strategy lo.
**✅ Sahi:** "Dono taraf azaad badlav ho to Bridge — composition se jodo, M jama N rakho."

## Keep in mind

- Do azaad khandaan composition se jude: M jama N, M guna N nahi.
- Bridge pehle se variation ke liye design hota hai; Adapter baad ki be-mel theek karta hai.
- Misaal: Shape/Renderer, Device/Remote, theme wali UI layers.
- Sirf ek taraf badalni ho to saada Strategy kaafi hai.
- Composition zariya hai, azaad evolution manzil hai.`,
  },
  {
    slug: "flyweight-word-processor",
    title: "Design Word Processor using Flyweight Design Pattern (Structural)",
    tag: "Structural",
    body: `Flyweight ek object ko hazaaron users me baant deta hai — haalat ko do hisson me kaat ke: intrinsic haalat (baantne layak, jaise font family aur size) shared flyweight me rehti hai, extrinsic haalat (context wali, jaise position) caller har baar de deta hai. Das lakh characters wala word processor das lakh object nahi banata; chand sau glyph objects baant-ta hai, positions alag rakhta hai.

Ek factory pool ke saath shared instances baant-ti hai, intrinsic haalat ke naam pe. Ye pattern sirf tab faayda deta hai jab objects beshumaar hon, taqreeban ek jaise hon, aur extrinsic haalat bahar reh sake. Game engines particles aur tiles me isi liye use karte hain.

## How it works

1. **Haalat kaato:** shared (font, size) andar rakho; context wali (position, color) har call pe lo.
2. **Pool banao:** factory intrinsic naam pe shared instance de — nayi sirf pehli baar bane.
3. **Immutable rakho:** shared object badla to sab bigdenge — freeze ya read-only rakho.

\`\`\`js
// Shared glyphs, position har baar bahar se
class GlyphFactory {
  constructor() { this.pool = new Map(); }
  get(font, size) {
    const key = font + size;
    if (!this.pool.has(key)) this.pool.set(key, { font, size });
    return this.pool.get(key);
  }
}
\`\`\`

## When to use

- Objects karodon me hon aur taqreeban ek jaise (glyphs, particles, tiles).
- Extrinsic haalat bahar nikal sakti ho (positions alag store hon).
- Memory hi bottleneck ho, CPU nahi.

## Common mistakes

- **Shared ko mutate karna:** ek user ne badla to sab bigde — immutable rakho.
- **Chhoti counts pe lagana:** sau objects pe pool ka kharcha faayde se zyada hai.
- **Position andar rakhna:** extrinsic andar gayi to sharing khatam — classic trap.

**🔴 Galti:** "Har repeated object pe Flyweight" — Sirf beshumaar near-identical objects pe faayda hai.
**✅ Sahi:** "Haalat kaato — shared andar, context bahar; pool se baanto; shared ko immutable rakho."

## Keep in mind

- Haalat kaato: intrinsic (shared, andar) vs extrinsic (har call pe bahar se).
- Factory plus pool intrinsic naam pe shared instances baant-ti hai.
- Sirf beshumaar taqreeban-ek-jaise objects pe faayda: glyphs, particles, tiles.
- Shared objects immutable hone chahiye, warna ek user sab bigaad dega.
- Classic trap sawal: position kahan rehti hai? Bahar, har baar di jaati hai.`,
  },
  {
    slug: "all-structural-patterns",
    title: "All Structural Design Patterns in 1 Video",
    tag: "Summary",
    body: `Structural patterns batate hain classes aur objects jud ke bade structure kaise bante hain. Adapter purane interface ko expected roop me badalta hai. Bridge khaake ko amal se alag karta hai taaki dono badlein. Composite akeli aur samooh se ek jaisa bartav karwata hai. Decorator runtime pe lapet ke khubi jodta hai. Facade complex system pe ek seedha darwaza rakhta hai. Flyweight intrinsic/extrinsic kaat ke objects baant-ta hai. Proxy asli cheez ki jagah khada ho ke pehra deta hai.

Revision ke liye ek-line naksha: be-mel interface matlab Adapter, do badalte khandaan matlab Bridge, hissa-kul ped matlab Composite, runtime khubi matlab Decorator, system aasan karna matlab Facade, karodon chhoti cheezein matlab Flyweight, access control matlab Proxy.

## Quick map

- **Adapter:** purana interface, naya chehra — legacy, SDKs.
- **Bridge:** do azaad khandaan — shapes/renderers, device/remote.
- **Composite:** ped uniform — file system, org charts.
- **Decorator:** runtime lapet — toppings, middleware.
- **Facade:** seedha darwaza — service layers, startup sequences.
- **Flyweight:** baant ke bachao — glyphs, particles.
- **Proxy:** pehre pe khada — lazy, protection, remote.

\`\`\`js
// Structural faisla ek nazar me
// be-mel -> Adapter | dono taraf variation -> Bridge | ped -> Composite
// runtime pe jodo -> Decorator | aasan karo -> Facade | baanto -> Flyweight | pehra -> Proxy
\`\`\`

## Common mistakes

- **Decorator vs Proxy mix:** khubi jodna vs pehra dena — neeyat poocho, shakal nahi.
- **Adapter vs Bridge mix:** baad ki theek vs pehle ki design — timing poocho.
- **Facade vs Mediator mix:** mushkil chhupana vs doston ki baat chalana.

**🔴 Galti:** "Naam rata lo" — Jodon ke farak aane chahiye, naam to side effect hai.
**✅ Sahi:** "Har pattern ek line me bolo, phir teen mashhoor jode (Decorator/Proxy, Adapter/Bridge, Facade/Mediator) khud suna do."

## Keep in mind

- Adapter: interface badlo. Bridge: khandaan alago. Composite: ek jaise ped.
- Decorator: lapet ke khubi. Facade: seedha darwaza. Flyweight: baanto. Proxy: pehra.
- Decorator vs Proxy favorite trap hai: khubi jodna vs pehra dena.
- Adapter vs Bridge: baad me theek karna vs pehle se variation ke liye design.
- Facade vs Mediator: mushkil chhupana vs doston ki baat chalana.`,
  },
];
