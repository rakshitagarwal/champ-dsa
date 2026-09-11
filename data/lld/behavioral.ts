import type { LldTopic } from "./types";

export const BEHAVIORAL: LldTopic[] = [
  {
    slug: "strategy-pattern",
    title: "Strategy Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Strategy adla-badli algorithms ko ek naam ke peeche nikaal deta hai, taaki client if-else lagane ke bajaye runtime pe bartav chun le. Payment service ke paas strategy ka reference hai: UPI, Card aur Wallet aapas me badle ja sakte hain, aur Crypto jodne me purana code chhedna hi nahi padta. Ye Open/Closed usool ka textbook namuna hai.

Iski nishaani hai type pe badhta conditional. Sorting comparators, pricing rules aur route planners roz ki misaalein hain. Context object stable rehta hai jabki strategies aati-jaati rehti hain — aur har algorithm alag se test ho jaata hai.

## How it works

1. **Ek naam do:** saari strategies same methods rakhein (JS me duck typing hi contract hai).
2. **Context pakde:** context strategy ka reference rakhta hai, asli class nahi jaanta.
3. **Runtime pe badlo:** setter se strategy badlo — purana code untouched rahe.

\`\`\`js
// Bartav naam ke peeche, runtime pe chuno
class Cart {
  setStrategy(strategy) { this.strategy = strategy; }
  checkout(amount) { this.strategy.pay(amount); }
}
// setStrategy(new UPIStrategy()) ya new CardStrategy() — Cart untouched
\`\`\`

## When to use

- Type pe if-else badh raha ho (payment modes, pricing rules).
- Runtime pe algorithm chunna ho (sorting, routing).
- Har algorithm alag se test karna ho.

## Common mistakes

- **Context me logic:** faisla context me ghus gaya to pattern bekaar — chunna bahar se aaye.
- **Stateful strategies:** shared strategy me state rakhi to users aapas me bigaadenge — stateless rakho.
- **Do algorithms pe pattern:** variation aani hi nahi to seedha if kaafi hai.

**🔴 Galti:** "Strategy aur State ek hi hain" — Shakal same, neeyat alag: Strategy bahar se chuni jaati hai, State andaruni haalat se badalti hai.
**✅ Sahi:** "Type pe if-else dikhe to Strategy — naam ke peeche algorithms, runtime pe chunao, purana code untouched."

## Keep in mind

- Type pe if-else maar deta hai: har branch badli ja sakne wali class banti hai.
- Classic Open/Closed misaal: nayi strategy, zero edits.
- Context naam ka reference pakadta hai aur kaam saunp deta hai.
- Misaal: payment modes, sorting comparators, pricing aur routing rules.
- Strategies stateless rakho taaki aaram se share hon.`,
  },
  {
    slug: "observer-pattern",
    title: "Observer Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Observer ek-se-kai subscription banata hai: subject ki haalat badle to har registered observer ko khud khabar mil jaati hai. YouTube channel video daalta hai, sab subscribers ko pata chalta hai; channel ko na pata kaun hain, na wo khabar ka kya karte hain. Yehi be-khabri (decoupling) poori keemat hai.

Tarkeeb subscriber list hai — jodo, hatao, khabar do. Event ka data saath bhejo jab sab observers ko wahi chahiye, ya unhe khud padhne do jab zarooratein alag hon. Do jaal se bacho: khabar ka order pakka nahi hota jab tak force na karo, aur khabar dete time list badalne wale observers concurrent modification laate hain.

## How it works

1. **Subscribe karo:** observer subject ki list me judta hai.
2. **Publish karo:** subject badlav pe sabko khabar bhejta hai — kaun hai, parwah nahi.
3. **Unsubscribe karo:** interest khatm to list se niklo, warna memory leak.

\`\`\`js
// Subject khabar de, observers react karein, koi kisi ko na jaane
class Channel {
  constructor() { this.subs = []; }
  subscribe(s) { this.subs.push(s); }
  publish(video) {
    for (const s of [...this.subs]) s.update(video); // copy pe loop
  }
}
\`\`\`

## When to use

- Ek badlav kai jagah pohchana ho (pub-sub, event listeners, stock alerts).
- Bhejne wale ko paane walon ki parwah na ho (decoupling chahiye).
- Observers aate-jaate rehte hon (dynamic subscriptions).

## Common mistakes

- **List pe loop me edit:** khabar dete time unsubscribe hua to crash — copy pe loop chalao.
- **Order assume karna:** kis observer ko pehle milegi, pakka nahi — zaroori ho to priority lagao.
- **Unsubscribe bhoolna:** mare hue observers list me sadte hain — memory leak pakka.

**🔴 Galti:** "Observer me sabko order me milta hai" — Order ki guarantee nahi hoti, chahiye to explicitly banao.
**✅ Sahi:** "Ek-se-kai subscription — jodo, khabar do, hatao; loop copy pe chalao; order chahiye to priority do."

## Keep in mind

- Ek-se-kai subscription, subject aur observers me poori be-khabri.
- Khabar dene se pehle list copy karo — concurrent modification se bacho.
- Sabko same data chahiye to push karo, alag-alag to pull karne do.
- Misaal: pub-sub systems, event listeners, stock price alerts.
- Khatra notification storm hai: ek badlav hazaaron observers tak phoot padta hai.`,
  },
  {
    slug: "chain-of-responsibility",
    title: "Chain of Responsibility Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Chain of Responsibility request ko haathon-haath aage badhati hai jab tak koi sambhal na le. ATM dispenser 3700 ko 2000, 1000, 500, 200 ke noton me baaki bhej ke todta hai; support ticket L1 se L2 se L3 waise hi chadhta hai. Bhejne wala sirf pehli kadi jaanta hai, poori zanjeer kabhi nahi.

Har kadi tay karti hai sambhalna hai, thoda sambhalna hai ya aage bhejna hai — isliye zanjeer ka order hi asal design hai. Logging frameworks aur servlet filters isi pe chalte hain kyunki nayi kadi purani chhede bina jud jaati hai. Jo failure bolo wo hai request ka aakhir se bina sambhle gir jana — isliye hamesha default aakhri kadi rakho.

## How it works

1. **Kadiyan jodo:** har handler agle ka reference pakadta hai.
2. **Jitna ho sambhalo:** apna hissa process karo, baaki aage bhejo.
3. **Aakhir pakdo:** aakhri kadi default handle kare — koi request beech me na gire.

\`\`\`js
// Har kadi jitna ho sake sambhale, baaki aage bheje
class Dispenser {
  setNext(next) { this.next = next; return next; }
  dispense(amount) {
    const count = Math.floor(amount / this.denomination());
    // ... itne note nikalo ...
    if (this.next) this.next.dispense(amount % this.denomination());
  }
}
\`\`\`

## When to use

- Request koi ek sambhalega, par kaun — ye runtime pe tay ho (ATM notes, escalation).
- Handlers judte-hat-te rehte hon (logging levels, filters, middleware).
- Bhejne wale ko handlers ki parwah na ho.

## Common mistakes

- **Aakhri kadi nahi:** request beech me giri to chup-chaap gayab — default handler rakho.
- **Galat order:** mehenga handler pehle laga diya to har request mehengi pade — aam/sasta pehle.
- **Chakr banana:** kadi wapas pehli pe aayi to infinite loop — chain seedhi rakho.

**🔴 Galti:** "Chain me har kadi sab karti hai" — Har kadi apna hissa karke baaki aage bhejti hai, poora kaam ek ki zimma nahi.
**✅ Sahi:** "Request kadi-dar-kadi chale — jitna ho sambhalo, baaki aage bhejo, aakhir me default pakdo."

## Keep in mind

- Request kadi-dar-kadi chalti hai jab tak koi daava na kare.
- Bhejne wala sirf pehli kadi jaanta hai — baaki sab se be-khabri.
- Zanjeer ka order hi design hai: sasta ya aam pehle rakho.
- Misaal: ATM denominations, support escalation, logging levels, servlet filters.
- Hamesha aakhri kadi rakho taaki koi request chup-chaap na gire.`,
  },
  {
    slug: "null-object-pattern",
    title: "LLD of NULL Object Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Null Object null checks ki jagah same naam wala be-amal roop rakh deta hai. Har call se pehle null check bikherne ke bajaye, NullUser same methods safe defaults ke saath deta hai: khaali naam, zero discount, kuch-na-karne wala save. Client code ek jaise call karta hai, ghair-maujoodgi pe branch kabhi nahi.

Faayda hai null errors ka buniyaad se khatma, chaukasi se nahi. (JS me null/undefined pe method call turant TypeError deta hai — isliye ye pattern wahan aur bhi keemti hai.) Optional saathiyon pe jachta hai — loggers, discount policies, default strategies. Imaandar limit: ye ghair-maujood aur maujood ka farak chhupa deta hai, to jahan missing data khud maani rakhta ho wahan explicit handling behtar hai.

## How it works

1. **Same naam do:** null roop wahi methods rakhta hai jo asli rakhta hai.
2. **Safe default do:** khaali string, zero, no-op — kuch aisa jo nuksaan na kare.
3. **Branch hatao:** client seedha call kare — ghair-maujoodgi ka sawaal hi khatam.

\`\`\`js
// Null checks nahi: null object bas safe kuch-nahi karta hai
class NullLogger {
  log(msg) { /* jaanboojh ke kuch nahi */ }
}
class Service {
  constructor(logger) { this.logger = logger; } // kabhi null nahi
  work() { this.logger.log('done'); } // branch ki zaroorat nahi
}
\`\`\`

## When to use

- Optional saathi ho jo aksar ghair-haazir rehta hai (loggers, guest users).
- Har jagah null check bikhra ho aur code ganda lag raha ho.
- Default bartav safe ho (no-op, khaali, zero).

## Common mistakes

- **Maani wali ghair-maujoodgi:** missing data khud signal ho to silent no-op dhokha dega — explicit handle karo.
- **Aadha inert:** null object ne side effect kar diya to poora maksad khatam — genuinely kuch-nahi hona chahiye.
- **Har null pe lagana:** zaroori nulls (jo bug dikhate hain) chhupane se debugging mushkil hoti hai.

**🔴 Galti:** "Null kabhi aayega hi nahi" — Aayega, aur TypeError dega. Null Object isi ka ilaaj hai.
**✅ Sahi:** "Optional saathi ho to Null Object do — same naam, safe default, branch khatam."

## Keep in mind

- Same naam, be-amal bartav: client kabhi null check nahi karta.
- Null errors buniyaad se khatam, careful checking se nahi.
- Optional saathiyon pe jachta hai: loggers, default policies, guest users.
- Ghair-maujoodgi maani rakhe to silent no-op ke bajaye explicit handling lo.
- Object sach me be-asar hona chahiye: chhupa side effect allowed nahi.`,
  },
  {
    slug: "state-pattern-vending-machine",
    title: "State Design Pattern (Behavioral) | Design Vending Machine",
    tag: "Behavioral",
    body: `State object ko apni andaruni haalat badalne pe bartav badalne deta hai — kaam state object ko saunp ke. Vending machine ka bartav coin ke bina, coin ke saath aur nikaalte time alag hota hai: coin dalna, button dabana aur cancel karna har haalat me alag maani rakhta hai. Is pattern ke bina ye enum pe uljha switch banta hai; iske saath har haalat same naam wali class hoti hai.

Nayi haalat matlab nayi class — vishaal conditional me edit kabhi nahi, yehi Open/Closed jeet hai. Context current state ka reference pakadta hai aur calls aage bhejta hai, transitions khud states chalati hain. TCP connections, media players aur order lifecycles sab isi shakl ke hain.

## How it works

1. **Har haalat ek class:** NoCoin, HasCoin, Dispensing, SoldOut — sab same methods.
2. **Context saunpta hai:** machine khud kuch nahi karti, current state ko bhej deti hai.
3. **Transitions andar hain:** coin dalne pe NoCoin khud HasCoin me badal deti hai.

\`\`\`js
// Context saunpta hai, states khud badalti hain
class NoCoin {
  insertCoin(machine) { machine.setState(new HasCoin()); }
  pressButton(machine) { console.log('Pehle coin dalo'); }
}
class VendingMachine {
  constructor() { this.state = new NoCoin(); }
  setState(s) { this.state = s; }
}
\`\`\`

## When to use

- Bartav haalat pe badalta ho (vending machine, TCP, media player, order lifecycle).
- Enum pe vishaal switch ug raha ho — wahi State ki nishaani hai.
- Nayi haalatein aani hon bina purana code chhede.

## Common mistakes

- **Transitions context me:** states ke bajaye machine me if-else laga diya to pattern bekaar.
- **Shared state me data:** state objects me per-machine data rakha to machines aapas me bigaadengi — shared states stateless rakho.
- **Na-mumkin transitions:** har state me har action ka jawab hona chahiye, warna chup-chaap kuch nahi hoga.

**🔴 Galti:** "State ke liye enum kaafi hai" — Do haalat tak kaafi hai, teesri aate hi switch jungle ban jaata hai.
**✅ Sahi:** "Har haalat ek class — transitions andar, context sirf saunpe; nayi haalat matlab nayi class."

## Keep in mind

- Har haalat ek class, transitions states ke andar, context sirf saunpta hai.
- Enum pe vishaal switch maar deta hai jo har state machine uga leti hai.
- Nayi haalat matlab nayi class, purani me zero edits.
- Vending machine canonical interview build hai: NoCoin, HasCoin, Dispensing, SoldOut.
- States shared ho sakti hain kyunki unme per-machine data nahi hota.`,
  },
  {
    slug: "command-undo-redo",
    title: "Design Undo, Redo feature with Command Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Command request ko aisi object bana deta hai jisme execute aur undo hon, taaki actions save, kataar me aur reverse ho sakein. Editor har keystroke aur format change ko command bana ke history stack pe dhakelta hai: undo nikaal ke palat-ta hai, redo phir chalata hai. Chalane wala (button, shortcut) kabhi nahi jaanta action kya hai — UI logic se alag rehta hai.

Har command ko palatne layak state pakadni padti hai: delete command mitaya text aur position rakhta hai. Ye memory keemat asal trade-off hai, isliye asli editors history ki gehrai seemit rakhte hain aur keystrokes jodte hain. Inhi objects se muft me macro recording, job queues aur transactional batching bhi mil jaati hai.

## How it works

1. **Command banao:** har action execute plus undo wali object bane.
2. **Stack pe dhakelo:** chalate hi history me push karo.
3. **Undo = pop + reverse:** nikalo aur undo() chalao; redo ke liye doosri stack me daalo.

\`\`\`js
// Requests objects ki tarah: chalao, save karo, palto
class TypeCommand {
  constructor(doc, text) { this.doc = doc; this.text = text; }
  execute() { this.doc.insert(this.text); }
  undo() { this.doc.deleteLast(this.text.length); }
}
// history.push(cmd); undo ke liye pop karke undo() chalao
\`\`\`

## When to use

- Undo/redo chahiye ho (editors, design tools, games).
- Actions kataar me dalne hon ya baad me chalane hon (job queues).
- Macros, audit logs ya transactional batching chahiye hon.

## Common mistakes

- **Reverse state bhoolna:** undo ke liye darkaar data command ne pakda hi nahi — palat nahi sakegi.
- **Unbounded history:** hazaaron fine commands memory kha jayengi — gehrai kaato, keystrokes jodo.
- **Non-reversible actions:** send-email jaise kaam undo nahi hote — compensating action socho ya mana karo.

**🔴 Galti:** "Undo ke liye poora state save karo" — Har baar full snapshot bhaari hai; reverse action halki padti hai (Memento wala rasta alag hai).
**✅ Sahi:** "Har action command bane — execute plus undo, history stack pe, gehrai seemit."

## Keep in mind

- Har command object pe execute plus undo — yehi core vaada hai.
- History stack se undo, doosri stack se redo milta hai.
- Har command palatne ka samaan rakhta hai: text plus position.
- Memory keemat asli hai: history ki gehrai kaato, fine-grained commands jodo.
- Muft ke faayde: macros, queues, audit logs.`,
  },
  {
    slug: "iterator-pattern",
    title: "Iterator Design Pattern Explained with Example (Behavioral)",
    tag: "Behavioral",
    body: `Iterator kisi collection pe tartib se chalne deta hai uske andar jhaanke bina. Client code aage badhta hai jabki collection chhupata hai andar array hai, linked list hai ya ped. JS me ye pattern bhasha me bana hua hai: Symbol.iterator aur for...of loop bilkul yahi hai.

Faayda hai alag-alag structures pe ek jaisi chaal plus ek saath kai iterations, har ek ka apna cursor. Interview me custom collections (song playlist, paginated feed) ko iterator dena chahiye, andar ke arrays leak nahi karne chahiye.

## How it works

1. **Iterator do:** collection apna ghoomne wala de — JS me Symbol.iterator method.
2. **Andar chhupao:** array hai ya ped, bahar ko sirf values milein.
3. **Alag cursor:** har traversal apni jagah yaad rakhta hai, aapas me ladte nahi.

\`\`\`js
// JS me Symbol.iterator se for...of chalta hai
class Playlist {
  constructor() { this.songs = []; }
  [Symbol.iterator]() { return this.songs.values(); }
}
// for (const song of playlist) { ... } — andar array hai, bahar ko parwah nahi
\`\`\`

## When to use

- Custom collection banayi ho (playlist, feed, tree) aur uspe ghoomna ho.
- Andar ka structure chhupana ho — kal array se tree badle, client na hile.
- Ek saath kai traversals chalani hon.

## Common mistakes

- **Raw array leak:** andar ka array bahar de diya to koi bhi bigaad dega — iterator do, array nahi.
- **Beech me badlav:** ghoomte time collection badli to behavior bolo — fail-fast ya snapshot policy.
- **Ek hi cursor:** shared cursor pe do loops ladenge — har iterator apna cursor rakhe.

**🔴 Galti:** "for loop me index kaafi hai" — Index andar ka structure leak karta hai; structure badla to saare loops toote.
**✅ Sahi:** "Collection iterator de — Symbol.iterator se for...of chale, andar chhupa rahe."

## Keep in mind

- Symbol.iterator se for...of chalta hai — andar array, list ya ped chhupa rehta hai.
- Alag-alag cursor se ek saath kai traversals chal sakti hain.
- Custom collections iterator dein, andar ke raw arrays kabhi nahi.
- Beech me badlav pe fail-fast ya snapshot policy bolo.
- for...of isi liye kaam karta hai kyunki collections iterator deti hain.`,
  },
  {
    slug: "mediator-auction-system",
    title: "Design Online Auction System with Mediator Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Mediator doston ki saari baat ek hub se chalwata hai taaki objects ek doosre ko seedha kabhi na pakdein. Online auction me bidders ek doosre ko call nahi karte: har boli AuctionMediator ko jaati hai, jo validate karta hai, sabse unchi boli update karta hai aur sabko khabar deta hai. N doston ke N-squared rishte hub ke N rishton me simat jaate hain.

Auction design interview shakl dikhata hai: Bidder objects, shuru-khatm time wala Auction lot, aur mediator jo minimum increments, band hone ka time aur anti-sniping extensions laagu karta hai. Imaandar keemat hai mediator ka khud bhagwan-object ban jana — isliye payments, notifications jaise kaam uske peeche alag services me rakho.

## How it works

1. **Dost hub pakdein:** har peer sirf mediator ko jaanta hai.
2. **Hub rules lagaye:** validation, increments, closing time — sab ek jagah.
3. **Hub khabar de:** natija sab peers tak mediator pohchata hai.

\`\`\`js
// Dost hub se baat karein, aapas me kabhi nahi
class Auction {
  constructor() { this.highest = 0; this.bidders = []; }
  placeBid(bidder, amount) {
    if (amount <= this.highest) { bidder.reject(); return; }
    this.highest = amount;
    for (const b of this.bidders) b.notify(this.highest);
  }
}
\`\`\`

## When to use

- Kai peers aapas me baat karte hon (auction, chat rooms, air traffic control).
- N-squared references ulajh rahe hon — hub se N me sameto.
- Rules centralize karne hon (increments, timing, extensions).

## Common mistakes

- **God object:** hub me payments, notifications sab ghused diya — mediator mota hokar phat-ta hai, peeche services rakho.
- **Doston me seedhi baat:** ek bhi direct reference pattern tod deta hai — sab hub se guzre.
- **Facade confusion:** mushkil chhupani ho to Facade hai; doston ki baat chalani ho to Mediator.

**🔴 Galti:** "Mediator me saara logic daal do" — Hub rules ka malik hai, poori duniya ka nahi — peripheral kaam bahar rakho.
**✅ Sahi:** "Dost hub pakdein — hub rules lagaye aur khabar de; payments/notifications alag services me."

## Keep in mind

- Dost sirf hub pakadte hain: N-squared links N me simat jaate hain.
- Hub rules ka malik hai: increments, band hone ka time, anti-sniping extension.
- Misaal: auction houses, chat rooms, air traffic control, UI dialogs.
- God-object khatre pe nazar: payments aur notifications mediator se bahar rakho.
- Facade se farak: Mediator doston ki baat chalata hai, Facade mushkil chhupata hai.`,
  },
  {
    slug: "visitor-pattern",
    title: "Visitor Design Pattern | Double Dispatch (Behavioral)",
    tag: "Behavioral",
    body: `Visitor object structures me naye operations jodta hai unki classes chhede bina. Document me Text, Image aur Table nodes hain; ExportVisitor har ek ke liye visit method rakhta hai, to PDF export matlab nayi visitor class — node code untouched. Tarkeeb double dispatch hai: node.accept(visitor) wapas visitor ka sahi method chalata hai, to dono taraf ke runtime type sahi method chunte hain.

Wahan chamakta hai jahan structure stable ho par operations badhte hon: compilers, item types pe tax calculators, report generators. Ulti keemat hai: nayi node type har visitor me edit mangti hai, isliye sirf tab lagao jab structure se zyada operations badlein. JS me overloads nahi hote, isliye visitText/visitImage jaise naam do.

## How it works

1. **Nodes accept karein:** har node apne naam wala visit method wapas chalati hai.
2. **Visitor operation laye:** har node type ke liye ek method — export, analyze, report.
3. **Naya operation = nayi class:** nodes me haath lagaye bina jud jaata hai.

\`\`\`js
// Double dispatch: node apne naam wala visit method chalwata hai
class Text {
  accept(visitor) { visitor.visitText(this); }
}
class Image {
  accept(visitor) { visitor.visitImage(this); }
}
// Naya operation = nayi visitor class, nodes untouched
\`\`\`

## When to use

- Structure stable ho, operations badhte hon (exporters, analyzers, compilers).
- Har node type pe alag logic ho jo ek jagah simatna chahiye.
- Nodes chhede bina naye behavior jodne hon.

## Common mistakes

- **Nayi node type:** har visitor me edit karna padega — structures stable honi chahiye thi.
- **JS me overloads:** visit(this) se kaam nahi chalega — visitText/visitImage naam do.
- **Encapsulation leak:** visitors ko andar chahiye hota hai — zaroorat se zyada mat kholo.

**🔴 Galti:** "Visitor har tree pe lagao" — Nodes badalti rehti hon to har visitor tootega — stable structure shart hai.
**✅ Sahi:** "Operations badhein to visitor banao — accept wapas sahi visit chalaye, nodes untouched rahein."

## Keep in mind

- Naye operations matlab nayi visitor classes, node classes me zero edits.
- Double dispatch hi tarkeeb hai: accept sahi visit method wapas chalata hai.
- Tab lagao jab operations node types se tez badhein: exporters, analyzers.
- Nayi node type har visitor me edit mangti hai — structures stable honi chahiye.
- Visitors ko node ka andar chahiye hota hai, isliye encapsulation thodi dheeli hoti hai.`,
  },
  {
    slug: "mvc-pattern",
    title: "MVC Design Pattern | MVC Architecture Overview",
    tag: "Behavioral",
    body: `MVC application ko Model (data aur business rules), View (user kya dekhta hai) aur Controller (input sambhal ke model update karta hai) me kaat-ta hai. User controller pe kaam karta hai, controller model badalta hai, view model se dobara banta hai. Har parat ka ek kaam hai, isliye UI redesign business logic ko chhoota hi nahi.

Interview point separation of concerns aur testability hai: models bina UI ke test hote hain, views bewakoof rehte hain. Violation ki boo pehchano: templates me SQL queries ya click handlers me business rules.

## How it works

1. **User controller ko chhoota hai:** click, form, input — sab controller sunta hai.
2. **Controller model badalta hai:** rules aur data wahan update hote hain.
3. **View model se banta hai:** display hamesha model ka aks hai, apni akal nahi.

\`\`\`js
// Teen role, nirbharta ek disha me
class OrderController {
  placeOrder() { this.model.submit(); this.view.render(this.model); }
}
// Model me data + rules (UI ki khabar nahi), View sirf dikhata hai
\`\`\`

## When to use

- UI aur logic alag rakhne hon taaki dono azaad badlein.
- Models bina UI test karne hon.
- Badi team me kaam baantna ho — frontend aur backend lines saaf hon.

## Common mistakes

- **View me logic:** template me hisaab-kitab ghusa to testing mari — view bewakoof rakho.
- **Controller me rules:** business faisle model me hone chahiye, controller me nahi.
- **Model me UI:** model ko pata hi na ho use kaun dikha raha hai.

**🔴 Galti:** "MVC matlab folders bana dena" — Naam ke folders se kuch nahi hota, nirbharta ki disha matter karti hai.
**✅ Sahi:** "User se controller, controller se model, model se view — ek disha, teeno alag test hon."

## Keep in mind

- Model me data plus rules, View sirf dikhata hai, Controller input sambhalta hai.
- Flow hamesha: user se controller, controller se model, model se view.
- Faayda testability hai: models bina UI test hon, views bewakoof rahein.
- Violation ki boo: templates me SQL, click handlers me business rules.
- MVP aur MVVM alag UI stacks ke liye wahi soch hai.`,
  },
  {
    slug: "memento-pattern",
    title: "Memento Design Pattern explanation (Behavioral)",
    tag: "Behavioral",
    body: `Memento object ki haalat pakad ke wapas la deta hai uske andar jhaanke bina. Editor document content ke snapshots history stack pe leta hai; restore pop karke wapas la deta hai. Originator snapshots banata aur khata hai, Memento khud opaque hai, Caretaker stack sirf rakhta aur lautata hai.

Command wale undo se farak ye hai ki ye kya rakhta hai: poori haalat vs reverse actions. Snapshots aasan par bhaari hain, isliye asli systems gehrai kaat-te hain ya deltas rakhte hain. Game save points aur form draft recovery roz ki misaalein hain jo interviewer turant pehchanta hai.

## How it works

1. **Snapshot lo:** Originator apni haalat ka band lifafa banata hai.
2. **Stack me rakho:** Caretaker lifafe sambhalta hai, kholta kabhi nahi.
3. **Wapas lao:** restore pe lifafa khul ke haalat wapas aati hai.

\`\`\`js
// Opaque snapshots, restore sirf malik kare
class Editor {
  save() { return { text: this.text }; } // bahar walon ke liye band lifafa
  restore(snapshot) { this.text = snapshot.text; }
}
// history stack me snapshots: undo = pop + restore
\`\`\`

## When to use

- Poori haalat wapas chahiye ho (checkpoints, game saves, drafts).
- Reverse action likhna mushkil ho — snapshot aasan padta hai.
- Audit ke liye time-pe-haalat chahiye ho.

## Common mistakes

- **Unbounded snapshots:** har keystroke pe full copy memory kha jayegi — gehrai kaato ya deltas rakho.
- **Lifafa kholna:** bahar walon ne snapshot padha/badal diya to-guarantee gayi — opaque rakho.
- **Command confusion:** halki reverse action kaafi ho to snapshot bekaar bhaari hai — dono me chuno.

**🔴 Galti:** "Memento aur Command ek hi undo hain" — Ek snapshots rakhta hai, doosra reverse actions — memory vs complexity ka trade-off hai.
**✅ Sahi:** "Haalat wapas chahiye to snapshot lo — band lifafa, stack me rakho, gehrai kaato."

## Keep in mind

- Teen role: Originator haalat ka malik, Memento band lifafa, Caretaker rakhwala.
- Snapshots vs Command reverse-actions: dono undo tarkeebein aani chahiye.
- Snapshots aasan par memory-bhaari: gehrai kaato ya deltas rakho.
- Memento Originator ke siva sab ke liye opaque rehna chahiye.
- Misaal: editor checkpoints, game saves, draft recovery.`,
  },
  {
    slug: "template-method-pattern",
    title: "Template Method Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Template Method algorithm ka dhancha base class me tay karta hai aur khaas steps subclasses bharne deti hain. Beverage maker ka ek template hai: boil, brew, pour, add condiments. Tea aur Coffee template lete hain par sirf brew aur condiments override karte hain — poora tartib na badal sakta hai, na chhoot sakta hai.

Template method khud protected rakho taaki tartib mehfooz rahe, badalne wale steps aise methods hon jo subclass bhare (na bhare to error de). Frameworks isi pe chalte hain: test runners aur data pipelines flow fix rakhte hain, customization muqarrar jagah pe bulate hain. Trade-off inheritance coupling hai — steps bahut alag hon to Strategy composition behtar hai. (JS me final keyword nahi hota, convention aur comment se kaam chalta hai.)

## How it works

1. **Dhancha ek baar likho:** base class me poora tartib fixed rakho.
2. **Steps khaali chhodo:** badalne wale methods subclass bharegi — na bhare to error.
3. **Shared common rakho:** boil/pour jaise common steps base me hi rahein.

\`\`\`js
// Dhancha fixed, steps override hon
class Beverage {
  prepare() { this.boil(); this.brew(); this.pour(); this.addCondiments(); }
  brew() { throw new Error('subclass bharegi'); }
  addCondiments() { throw new Error('subclass bharegi'); }
  boil() { /* shared */ } pour() { /* shared */ }
}
\`\`\`

## When to use

- Algorithm ka tartib fixed ho, steps badalte hon (ETL, test fixtures, lifecycles).
- Framework bana rahe ho jahan users muqarrar jagah customize karein.
- Duplicate tartib kai subclasses me phail raha ho.

## Common mistakes

- **Template override:** subclass ne poora prepare badal diya to pattern khatam — dhancha protected rakho.
- **Bahut gehri hierarchy:** teen level ke template samajh se bahar — composition socho.
- **Har step abstract:** kuch steps ke default hone chahiye (hooks), warna har subclass bojh uthayegi.

**🔴 Galti:** "Template Method inheritance jaisa hi hai" — Inheritance tool hai, pattern dhancha-fix karne ki neeyat hai.
**✅ Sahi:** "Tartib fixed, steps override — dhancha base me, variation subclasses me."

## Keep in mind

- Algorithm dhancha base class me ek baar, steps subclasses me alag-alag.
- Template ko convention se fixed rakho taaki tartib na badle.
- Hollywood usool: humein mat bulao, hum tumhein bulayenge.
- Misaal: test fixtures, ETL pipelines, framework lifecycles.
- Steps bahut alag hon to inheritance ke bajaye Strategy composition lo.`,
  },
  {
    slug: "interpreter-pattern",
    title: "Interpreter Design Pattern (Behavioral)",
    tag: "Behavioral",
    body: `Interpreter chhoti bhasha ke jumle har grammar rule ko class bana ke samajhta hai. Terminal expressions patte sambhalte hain jaise numbers, non-terminal jodte hain jaise addition, aur context object shared haalat evaluation me saath le chalta hai. Discount eligibility check karne wala rule engine bilkul wahi business jumla padhta hai jo implement karta hai.

Production me sabse nayaab GoF pattern hai kyunki asli bhashayein isse jaldi badi ho jaati hain: performance girti hai, grammar ulajhti hai. Iski imaandar jagah chhoti stable DSLs hain: search filters, validation rules, configuration expressions. Isse badi cheez ho to parser generator ka naam lo.

## How it works

1. **Har rule ek class:** patte (Number) aur jod (Add) alag-alag classes.
2. **Context saath chale:** variables ki values wala object har interpret me guzre.
3. **Ped evaluate ho:** root pe interpret chalao, bachche recursion se hal hon.

\`\`\`js
// Har grammar rule ek class hai jisme interpret hai
class Add {
  constructor(left, right) { this.left = left; this.right = right; }
  interpret(ctx) { return this.left.interpret(ctx) + this.right.interpret(ctx); }
}
// Number patta hai, Add jod hai, ctx shared haalat hai
\`\`\`

## When to use

- Chhoti stable DSL ho: filters, validation rules, config expressions.
- Grammar itni chhoti ho ki har rule class me sama jaye.
- Readability business jumlon jaisi chahiye ho.

## Common mistakes

- **Badi bhasha pe lagana:** grammar badhi to classes ka jungle — parser generator lo.
- **Performance bhoolna:** ped evaluation slow hai, hot path me mat lagao.
- **Har expression pe lagana:** aam calculations ke liye functions kaafi hain.

**🔴 Galti:** "Asli language isi se banate hain" — Nahi, ye chhoti DSLs ka pattern hai — badi bhasha pe toot-ta hai.
**✅ Sahi:** "Chhoti stable grammar ho to har rule class banao — patte, jod, context; badi ho to parser generator bolo."

## Keep in mind

- Terminal patte hain, non-terminal bachche jodte hain, context haalat uthata hai.
- Chhoti stable DSLs me jachta hai: filters, validation rules, config expressions.
- Production me nayaab hai: performance aur grammar complexity maar deti hai.
- Asli bhashaon ke liye haath ka interpreter nahi, parser generator bolo.
- Har rule class me ho to grammar padhne aur test karne layak rehta hai.`,
  },
  {
    slug: "all-behavioral-patterns",
    title: "All Behavioral Design Patterns in 1 Video",
    tag: "Summary",
    body: `Behavioral patterns tay karte hain objects baat kaise karein aur kaam kaise baantein. Chain request kadiyon me daudata hai. Command request ko palatne layak objects banata hai. Interpreter grammar rule dar rule samajhta hai. Iterator collections pe ek jaisi chaal deta hai. Mediator doston ko hub se jodta hai. Memento haalat ke snapshots leta hai. Null Object null checks ko safe no-op se badalta hai. Observer subscribers ko haalat ki khabar deta hai. State har haalat class se bartav badalta hai. Strategy ek naam ke peeche algorithm badalta hai. Template Method dhancha fix karke steps badalta hai. Visitor structures chhede bina operations jodta hai.

Revision ke liye ek-line naksha: judi kadiyan matlab Chain, palatne wale actions matlab Command, grammar rules matlab Interpreter, ek jaisi chaal matlab Iterator, doston ka hub matlab Mediator, snapshots matlab Memento, null checks khatam matlab Null Object, subscriptions matlab Observer, har haalat bartav matlab State, badalta algorithm matlab Strategy, fixed dhancha matlab Template Method, stable ped pe naye operations matlab Visitor.

## Quick map

- **Chain:** judi kadiyan — ATM notes, escalation, filters.
- **Command:** palatne wale actions — undo/redo, queues, macros.
- **Interpreter:** grammar rules — filters, validation DSLs.
- **Iterator:** ek jaisi chaal — playlists, feeds (Symbol.iterator).
- **Mediator:** doston ka hub — auctions, chat rooms.
- **Memento:** snapshots — checkpoints, game saves.
- **Null Object:** null checks khatam — loggers, guests.
- **Observer:** subscriptions — pub-sub, listeners.
- **State:** har haalat bartav — vending machine, lifecycles.
- **Strategy:** badalta algorithm — payments, sorting.
- **Template Method:** fixed dhancha — pipelines, fixtures.
- **Visitor:** stable ped pe naye operations — exporters.

\`\`\`js
// Behavioral patterns: kaun kisse kaise baat karta hai
// Chain -> Command -> Interpreter -> Iterator -> Mediator -> Memento
// NullObject -> Observer -> State -> Strategy -> TemplateMethod -> Visitor
\`\`\`

## Common mistakes

- **Chain vs Command mix:** behti request vs save palatne wale actions — poocho request behti hai ya rukti hai.
- **Observer vs Mediator mix:** broadcast vs hub-routed — kaun kisko jaanta hai, ye dekho.
- **State vs Strategy mix:** shakal same hai — andaruni haalat badal rahi hai ya bahar se algorithm aa raha hai.
- **Memento vs Command-undo mix:** snapshot bhaari hai, reverse action halki — zaroorat dekho.

**🔴 Galti:** "Saare naam rata lo" — Jodon ke farak aane chahiye: Chain/Command, Observer/Mediator, State/Strategy, Memento/Command.
**✅ Sahi:** "Har pattern ek line me bolo, phir chaar mashhoor jodon ke farak khud suna do."

## Keep in mind

- Chain vs Command: behti requests vs save palatne wale actions.
- Observer vs Mediator: broadcast subscription vs hub se baat.
- State vs Strategy: shakal same, neeyat alag — andaruni haalat vs badalta algorithm.
- Memento vs Command-undo: snapshots vs reverse actions.
- Visitor ko stable structures chahiye; Interpreter ko chhoti grammars.
- MVC in sab se upar rehne wala intezam hai, barabar ka saathi nahi.`,
  },
];
