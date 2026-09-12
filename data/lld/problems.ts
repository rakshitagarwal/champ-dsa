import type { LldTopic } from "./types";

export const PROBLEMS: LldTopic[] = [
  {
    slug: "tic-tac-toe",
    title: "Design Tic Tac Toe game",
    tag: "Interview Question",
    body: `Tic Tac Toe warm-up LLD problem hai: itna chhota ki poora ho jaye, itna gehra ki tareeka dikh jaye. Requirements 3x3 board, X aur O ki baari, rows/columns/diagonals me jeet ki pehchan, aur board bharne pe draw. Board size pehle clear karo: interviewer aksar baad me NxN generalize karwata hai.

Saaf design Board pe khada hai jisme Piece objects ka grid ho, Player ke paas symbol ho, aur Game array-based baari chalaye. Har chaal pe O(1) jeet-pehchan row, column aur diagonal counters se aati hai — board dobara scan nahi hota. Ek poora game chala ke dikhao taaki baari, occupied validation aur khatma sab sabit ho.

## Core classes

Board cells ka malik hai (place + hasWinner), Player symbol rakhta hai, Game baari ka order chalata hai. JS me array ko queue banao: shift se player nikalo, kaam ke baad push se wapas dalo.

\`\`\`js
// Core entities: Board ke paas cells, Game ke paas baari ka order
class Board {
  place(r, c, piece) { /* occupied ho to false */ }
  hasWinner(r, c, piece) { /* counters se O(1) */ }
}
class Game {
  play() { /* array ko queue banao: shift se player, kaam ke baad push */ }
}
\`\`\`

## Key decisions

- **NxN ke liye design:** shuru se N rakho — baad me generalize karwana trap hai.
- **O(1) win check:** row, column, diagonal counters — dobara scan kabhi nahi.
- **Validation:** occupied cells aur out-of-bounds moves explicit check hon.
- **Draw detection:** board bharna jeet jaisa hi terminal state hai.

## Walkthrough

Pehla player (0,0) pe X lagata hai — place true, counters update, koi jeet nahi. Doosra (1,1) pe O — wahi flow. Aise chalte hue jab kisi row ka counter 3 hota hai, hasWinner true — Game loop rukta hai aur winner elaan hota hai. Board bhare aur koi counter poora na ho to draw.

**🔴 Galti:** "Har chaal pe poora board scan karo" — O(N^2) har move pe; counters se O(1) banta hai.
**✅ Sahi:** "NxN design, counters se O(1) win check, occupied validation, draw समेत walkthrough."

## Keep in mind

- NxN generalization pehle clear karo; shuru se N ke liye design karo.
- O(1) win check row, column aur diagonal counters se turant impress karta hai.
- Occupied cells aur out-of-bounds moves ki validation saaf-saaf bolo.
- Array ko queue bana ke baari chalao — saaf rehta hai, badhta bhi hai.
- Walkthrough jeet pe mat roko — draw detection ka naam bhi lo.`,
  },
  {
    slug: "elevator-system",
    title: "LLD of Elevator System with Complete Implementation",
    tag: "Interview Question",
    body: `Elevator system concurrent state machines aur scheduling test karta hai. Requirements: kayi floors pe kayi elevators, andar panel buttons plus bahar up/down buttons, darwaza khulne-band hone wali movement, aur har request pe best elevator chunne wali dispatch strategy. Concurrency fitri hai: elevators chalte rehte hain, passengers buttons dabate rehte hain.

Design Elevator ke ird-gird banao jisme floor, direction aur State object ho (Idle, Moving, DoorsOpen), Request me source floor aur direction ho, aur Dispatcher ke paas scheduling strategy ho. Classic algorithm SCAN hai: ek disha me chalte hue ruke stops serve karo, phir palto. Button panels request paida karein, dispatcher akela faisla kare.

## Core classes

Elevator (floor, direction, state), Request (source floor plus direction), Dispatcher (strategy ka malik), aur button panels (request paida karte hain). States Idle/Moving/DoorsOpen alag classes me hon — boolean flags me nahi.

\`\`\`js
// Dispatcher ke paas strategy, elevator ke paas haalat
class Elevator {
  move() { /* state ke hisaab se */ }
  openDoors() { /* ... */ }
  addStop(floor) { /* ... */ }
}
class Dispatcher {
  assign(request) { /* SCAN: same-disha nearest car jeette */ }
}
\`\`\`

## Key decisions

- **SCAN scheduling:** disha me serve karo, phir palto — expected algorithm hai.
- **States classes me:** Idle, Moving, DoorsOpen — flags se switch jungle banega.
- **Request intake synchronized:** buttons dabana aur movement aapas me ladenge.
- **Dispatcher akela faisla kare:** panels sirf request bhejein, chunna dispatcher ka kaam.

## Walkthrough

5th floor se up ki request aati hai — Dispatcher dekhta hai kaunsi car same-disha nearest hai, usko stop deta hai. Car aake darwaze kholti hai (DoorsOpen), passenger andar panel pe 9 dabata hai — internal request dispatcher ko jaati hai, car ki queue me judti hai. Disha ki saari stops serve karke car palat-ti hai.

**🔴 Galti:** "Nearest elevator hamesha best hai" — Opposite disha wali nearest car galat jawab hai; SCAN disha dekhta hai.
**✅ Sahi:** "States classes me, SCAN dispatch, request intake synchronized — ek bahar plus ek andar request chala ke dikhao."

## Keep in mind

- Entities pehle naam lo: Elevator, Floor, Panel buttons, Request, Dispatcher.
- SCAN scheduling expected algorithm hai: disha me serve karo, phir palto.
- Idle, Moving, DoorsOpen ko states banao, boolean flags nahi.
- Concurrency button-dabane vs movement me hai: request intake sambhal ke rakho.
- Ek bahar wali aur ek andar wali request end tak chala ke dikhao.`,
  },
  {
    slug: "car-rental-system",
    title: "LLD of Car Rental System with Concurrency handling",
    tag: "Interview Question",
    body: `Car rental khaas taur pe concurrency test karne ko chuna jaata hai: do users overlapping dates me same car book na kar payein. Requirements me stores pe vehicle inventory, type aur date range se search, payment ke saath reservation, aur billing ke saath return aata hai. Double-booking race hi asal puzzle hai — ispe seedha waar karo.

Design me Vehicle, Store, date ranges wali Reservation aur Payment entities chahiye. Overlap pakadna har vehicle pe date-range query hai, aur booking atomic honi chahiye: availability check aur reserve ek hi unit me hon — DB transaction ya version check se. Invariant zor se bolo: ek car ki do overlapping confirmed reservations kabhi nahi.

## Core classes

Vehicle (type plus home store), Store (inventory), Reservation (vehicle, user, date range, status), Payment. Search read-heavy hai (cacheable), booking write-critical hai (atomic).

\`\`\`js
// Availability check plus reserve ek atomic unit me hona chahiye
class ReservationService {
  book(user, vehicle, range) {
    // production me DB transaction ya version check se atomic banao
    if (this.overlaps(vehicle, range)) throw new Error('Unavailable');
    return this.confirm(user, vehicle, range);
  }
}
\`\`\`

## Key decisions

- **Invariant pehle:** overlapping confirmed reservations impossible — line bolo.
- **Atomic check-and-reserve:** do कदम nahi — transaction ya optimistic versioning.
- **Overlap range query hai:** vehicle plus dates pe index chahiye.
- **Search vs booking alag:** ek cacheable read path, doosra critical write path.

## Walkthrough

User SUV dhoondhta hai 10-12 tareekh ke liye — search available cars deti hai. Book dabate hi system overlap check karta hai atomic unit me: koi clash nahi to Reservation confirm plus Payment. Beech me doosra user same car maange to overlap pakad ke Unavailable milta hai. Return pe actual time se billing nikalti hai.

**🔴 Galti:** "Check phir reserve — do alag steps" — Beech me doosra ghus ke double-book kar dega; atomic unit pakki karo.
**✅ Sahi:** "Invariant bolo, check-and-reserve atomic karo, overlap range query pe index lagao."

## Keep in mind

- Invariant pehle bolo: har car pe overlapping confirmed reservations nahi.
- Check-and-reserve atomic hona chahiye: do kadam kabhi nahi.
- Overlap pakadna range query hai, isliye vehicle plus dates pe index.
- Search (read-heavy, cacheable) booking (write-critical) se alag rakho.
- Return aur billing alag flows hain: actual return time se hisaab lagao.`,
  },
  {
    slug: "snake-and-ladder",
    title: "LLD of Snake and Ladder game",
    tag: "Interview Question",
    body: `Snake and Ladder saaf turn-based modeling test karta hai, movement rules me twist ke saath. Requirements: numbered board, do ya zyada players, dice rolls, aage kudane wali ladders, peeche ghaseetne wale snakes, exact-landing win rule, aur standard rules me sixes pe extra turns. Rules pehle clear karo kyunki variants alag hote hain.

Fitri entities Board (cells plus snake/ladder jumps), alag rollable Dice object, position wala Player, aur turn loop chalata Game hain. Jumps ko start-se-end square wala ek map banana elegant hai — saanp aur seedhi ek ho jaate hain: key pe utro to value pe teleport. Jeet ki check exact position barabar board size hai.

## Core classes

Board (cells plus jump map), Dice (rollable, tests me loaded), Player (position), Game (turn loop). Jump map dono jumps ko ek kar deta hai.

\`\`\`js
// Ek jump map saanp aur seedhi dono ko ek kar deta hai
class Board {
  move(pos, roll) {
    const next = pos + roll;
    return this.jumps.get(next) ?? next;
  }
}
class Game { play() { /* baariyan, dice, exact-win check */ } }
\`\`\`

## Key decisions

- **Ek jump map:** start-se-end — saanp (neeche) aur seedhi (upar) same structure.
- **Dice alag class:** tests me loaded dice se deterministic game chalao.
- **Exact landing:** overshoot gina nahi jaata — rule explicit rakho.
- **Sixes pe extra turn:** baari logic me rule ghusao, hardcode nahi.

## Walkthrough

Player 4 pe hai, 3 aaya — 7 pe utra jahan ladder 7-se-21 hai, seedha 21. Agli baari 5 aaya — 26, jahan snake 26-se-9 hai, neeche 9. Exact 100 pe utarne wala jeetta hai; 99 pe 2 aaya to ruko (overshoot invalid).

**🔴 Galti:** "Saanp aur seedhi ke liye alag-alag logic" — Dono start-to-end map hain; alag code duplication hai.
**✅ Sahi:** "Ek jump map, dice alag class, exact-landing rule — ladder aur snake landing dono chala ke dikhao."

## Keep in mind

- Rules pehle clear karo: board size, sixes pe extra turns, exact landing pe jeet.
- Saanp aur seedhi ke liye ek jump map — movement logic uniform rehta hai.
- Dice apni class me rakho taaki tests me loaded dice lag sake.
- Array queue se turn loop kisi bhi player count tak badh jaata hai.
- Ladder landing aur snake landing dono chala ke dikhao.`,
  },
  {
    slug: "parking-lot",
    title: "Design Parking Lot with Complete Implementation",
    tag: "Interview Question",
    body: `Parking Lot sabse zyada poochha jaane wala LLD problem hai, isliye bar complete working design hai. Requirements: bikes, cars aur trucks ke sizes wale spots ke saath kayi floors, ticket dene wale entry gates, duration aur vehicle type se fee nikaalne wale exit gates, aur real-time availability display. Entry pe concurrency matter karti hai: do cars ko same spot kabhi na mile.

Structure ParkingLot ke andar Floors, Floors ke andar Spots rakho; Vehicle apna size laye, Ticket entry time aur spot record kare, aur PricingStrategy fee nikale taaki hourly, daily aur surge rules aaram se badlein. Spot allocation nearest free compatible spot chun ke atomic mark kare. Entry aur exit ek kahani me chalao: ticket andar, fee bahar.

## Core classes

ParkingLot, Floor, Spot (size plus occupied flag), Vehicle (size), Ticket (spot, entry time), Gate, PricingStrategy. Allocation nearest-free compatible spot ki hai.

\`\`\`js
// Allocation atomic honi chahiye; pricing Strategy se badalti hai
class ParkingLot {
  park(vehicle) {
    const spot = this.findNearestFree(vehicle.size()); // atomic chuno
    spot.occupy(); return new Ticket(spot, Date.now());
  }
  checkout(ticket) { return this.pricing.calculate(ticket); }
}
\`\`\`

## Key decisions

- **Atomic allocation:** chunna plus mark ek unit — do cars ek spot kabhi nahi.
- **Pricing Strategy me:** hourly, daily, surge bina edits badlein.
- **Nearest-free:** random se behtar, asli lots ka bartav.
- **Availability spot state se:** alag counter drift karega — state hi sach hai.

## Walkthrough

Car entry gate pe aati hai — system nearest free car-size spot nikaal ke atomic mark karta hai, Ticket (spot plus time) deta hai. Exit pe duration nikal ke PricingStrategy fee deti hai, payment pe spot free. Beech me doosri car same spot maange to occupied dekh ke agla milta hai.

**🔴 Galti:** "Availability ke liye alag counter" — Counter aur spots me drift hoga; spot state hi padho.
**✅ Sahi:** "Entities naam lo, allocation atomic karo, pricing Strategy me rakho — ticket andar, fee bahar wali kahani sunao."

## Keep in mind

- Entities pehle: Lot, Floor, Spot, Vehicle, Ticket, Gate, Pricing.
- Spot allocation atomic honi chahiye warna do cars ek spot baant lengi.
- Pricing Strategy me rakho: hourly, daily, surge bina edits badlein.
- Nearest-free allocation random se behtar hai asli lots ke liye — bolo.
- Availability display spot state padhe, alag counter kabhi na rakho jo drift kare.`,
  },
  {
    slug: "bookmyshow",
    title: "LLD of BookMyShow | Design MovieTicketBooking",
    tag: "Interview Question",
    body: `BookMyShow ek sakht problem pe khada hai: do users same seat na jhapte hon. Requirements movies, theatres, seat maps wale shows, temporary seat holds, payment aur cancellation ke saath confirmed bookings tak phaili hain. Timeout wala hold-then-confirm flow hi wo design hai jo har interviewer sunna chahta hai.

Movie, Theatre, Show (movie plus screen plus time), state machine wali Seat (Available, Held, Booked), aur user ko seats plus payment se jodne wali Booking banao. Flow: seats chuno, TTL ke saath hold karo (kaho das minute), window me pay karo, success pe confirm warna timeout pe release. Hold har seat pe atomic hona chahiye, aur payment fail ho to release pakki.

## Core classes

Movie, Theatre, Show, Seat (Available/Held/Booked states), Hold (seats plus expiry), Booking (user, seats, payment). Hold TTL ke saath, confirm payment pe, release timeout ya failure pe.

\`\`\`js
// TTL wala hold, payment pe confirm, timeout pe release
class BookingService {
  holdSeats(user, show, seats) {
    // har seat Available -> Held atomic badlo
    return { user, seats, expiresAt: Date.now() + 10 * 60 * 1000 };
  }
  confirm(hold, payment) { /* pay karo, phir Held -> Booked */ }
}
\`\`\`

## Key decisions

- **Seat states:** Available, Held, Booked — beech wali Held TTL ke saath.
- **Hold atomic:** har seat pe transition ek unit — double booking impossible.
- **Payment failure = release:** koi exception nahi, hamesha wapas.
- **Cancellation:** seats Available me, refund flow saath chale.

## Walkthrough

User 2 seats chunta hai — system dono Available dekh ke atomic Held karta hai 10-min TTL ke saath. 5 minute me payment success — Held se Booked, tickets pakke. Payment fail hota to seats turant Available. Time nikal jata to expiry job release kar deti.

**🔴 Galti:** "Select karte hi Booked kar do" — Bina payment Booked matlab phansi seats; Held-TTL beech ki kadi hai.
**✅ Sahi:** "Available-Held-Booked states, atomic hold, TTL expiry, fail pe pakki release."

## Keep in mind

- Seat states Available, Held, Booked aur holds pe TTL — yehi core hai.
- Hold har seat pe atomic hona chahiye warna double booking pakki.
- Payment fail ho to held seats hamesha release hon, koi exception nahi.
- Cancellation seats Available me wapas laata hai aur refund flow chalata hai.
- Concurrency jawab: seat state transition pe lock ya CAS.`,
  },
  {
    slug: "atm",
    title: "LLD of ATM (Interview question)",
    tag: "Interview Question",
    body: `ATM design hardware ke saath secure transactional flows ki hai. Requirements: PIN se card authentication, balance inquiry, denomination breakup ke saath cash withdrawal, deposit aur PIN change — sab daily limits aur cash availability ke andar. Har cash movement transactional honi chahiye: dispense aur debit ikatthe success hon ya ikatthe fail.

Entities Card, Account, Transaction records, denomination inventory wala CashDispenser aur screens chalata ATM controller hain. Withdrawal wahi walkthrough hai jo ratna hai: authenticate, validate limits aur balance, reserve amount, dispense notes via Chain of Responsibility over denominations, aur successful dispense ke baad hi ledger commit karo. Failures at any step rollback saaf karein.

## Core classes

Card, Account, Transaction (audit record), CashDispenser (denomination inventory), ATM controller (screens chalata hai). Withdrawal flow: authenticate, validate, dispense, commit.

\`\`\`js
// Dispense aur debit ek atomic unit hain
class ATM {
  withdraw(card, pin, amount) {
    const account = this.bank.authenticate(card, pin);
    this.validate(account, amount); // limits, balance, cash stock
    this.dispense(amount);           // denominations pe chain
    return this.bank.debit(account, amount); // dispense ke baad hi commit
  }
}
\`\`\`

## Key decisions

- **Atomic dispense+debit:** paise nikle aur khata kate — dono ya koi nahi.
- **Denomination Chain pe:** bade note pehle, baaki aage — classic Chain use.
- **Validation order:** PIN, daily limits, balance, machine cash stock — isi tartib me.
- **Har action audit me:** Transaction record bina reconciliation impossible hai.

## Walkthrough

Card dala, PIN sahi — 5000 manga. System limits (daily), balance aur machine stock check karta hai. Chain 2000x2 plus 1000x1 nikaalti hai. Notes bahar aate hi ledger debit commit hota hai. Beech me cash jam ho to dispense fail — debit hota hi nahi, paise mehfooz.

**🔴 Galti:** "Pehle debit, phir dispense" — Dispense fail hua to paise kat ke cash nahi — order ulta hai.
**✅ Sahi:** "Validate karo, dispense karo, tab debit commit karo — audit record har step pe."

## Keep in mind

- Cash dispense plus account debit atomic hone chahiye: ek ke bina doosra kabhi nahi.
- Denomination breakup note types pe Chain of Responsibility hai.
- Validation order me karo: PIN, daily limits, balance, machine cash stock.
- Har action audit Transaction record likhta hai reconciliation ke liye.
- Baar-baar galat PIN pe card retention expected detail hai — bolo zaroor.`,
  },
  {
    slug: "splitwise",
    title: "LLD of Splitwise",
    tag: "Interview Question",
    body: `Splitwise app ke bhees me graph problem hai: kisne kya diya track karo, kaun kiska den-daar hai nikalo, aur udhaar simplify karo. Requirements users, groups, equal ya custom splits wale expenses, payments recording aur har user/group ke balance sheets tak hain. Simplification algorithm hi achche jawab ko great se alag karta hai.

User, Group, splits wali list wala Expense aur Payment records banao. Balances expenses minus payments se nikalo — primary sach kabhi store mat karo. Udhaar simplify karne wala classic greedy hai: sabse bade len-daar ko sabse bade den-daar se baar-baar milao jab tak sab settle na hon — transaction count minimum hota hai. Unequal shares wali ek group dinner end tak chala ke splits sabit karo.

## Core classes

User, Group, Expense (payer, amount, splits), Payment, Settlement (greedy simplifier). Balances derived hain — events sach hain.

\`\`\`js
// Balances events se nikalo; simplification greedy max-match hai
class Expense { /* payer, amount, splits ki list */ }
class Settlement {
  simplify(balances) {
    // sabse bada creditor sabse bade debtor se baar-baar milao
  }
}
\`\`\`

## Key decisions

- **Events sach, balances derived:** expenses plus payments store karo, hisaab nikalo.
- **Teen split types:** equal, exact, percentage — shuru se support karo.
- **Greedy simplify:** max creditor se max debtor — transactions minimum.
- **Scope alag:** groups expenses ka, friendships direct payments ka.

## Walkthrough

Chaar doston ka dinner 4000 ka — ek ne diya, shares unequal (2000/1000/500/500). Expense teen splits ke saath record hota hai. Balances nikalte hain: den-daaron ki list banti hai. Greedy simplify teen payments ko do me samet deta hai — har payment record hoti hai, balances dobara nikalte hain, sab zero.

**🔴 Galti:** "Balances store kar lo" — Events gayab to audit gayab; balances hamesha derive karo.
**✅ Sahi:** "Events sach rakho, teen splits support karo, greedy se simplify karo — unequal dinner chala ke dikhao."

## Keep in mind

- Expenses aur payments sach rakho, balances nikalo: ulta kabhi nahi.
- Shuru se equal, exact aur percentage splits support karo.
- Greedy max-creditor se max-debtor settlement transactions minimum karta hai.
- Groups expenses ka daira hain; friendships direct payments ka.
- Walkthrough me ek unequal dinner split end tak dikhao.`,
  },
  {
    slug: "cricbuzz",
    title: "LLD of Cricbuzz / Cricinfo",
    tag: "Interview Question",
    body: `Cricbuzz live-score fan-out problem hai: ek ball event seconds me karodon viewers tak pahunchna chahiye. Requirements formats pe matches, ball-by-ball commentary, batting/bowling figures wale scorecards, points tables aur key events pe push notifications hain. Read-to-write ratio extreme hai, isliye design read-optimized hota hai.

Isko Match ke andar Innings, Innings ke andar Overs ki Ball events banao — Scorecard derived projection hai jo har ball pe update hota hai. Write path chhota hai (ek ball event), reads caching layers aur WebSocket/SSE push channels se fan out hoti hain. Wickets aur milestones jaise key events alag notification topic pe jaate hain. Over aur innings transitions explicit state changes ki tarah model karo.

## Core classes

Match, Innings, Over, Ball (atomic event), Scorecard (derived projection), Publisher (fan-out), NotificationTopic (key events). Write chhota hai, read fan-out vishaal hai.

\`\`\`js
// Chhota write path, cached read fan-out vishaal
class Match {
  recordBall(ball) {
    this.innings.add(ball);       // event jodo
    this.scorecard.apply(ball);   // projection update karo
    this.publisher.publish(ball); // viewers tak fan out karo
  }
}
\`\`\`

## Key decisions

- **Ball atomic event hai:** sab kuch ball stream se nikalta hai.
- **Scorecard projection hai:** source of truth nahi — dobara ban sakta hai.
- **Cache plus push:** per-request computation itne skew pe impossible hai.
- **Transitions explicit:** over aur innings badalna state changes hain.

## Walkthrough

Bowler ball phenkta hai — scorer recordBall chalata hai: event judta hai, scorecard update hota hai (runs, balls, bowler figures), publisher cached channels pe fan out karta hai. Wicket hui to notification topic pe alert jaata hai — subscribers ko push milta hai. Over khatm to state badalti hai, nayi over shuru.

**🔴 Galti:** "Har viewer ke liye score compute karo" — Karodon pe per-request compute system uda dega; projection plus cache rakho.
**✅ Sahi:** "Ball event likho, projection update karo, cache se fan out karo — read-write skew ko design me daalo."

## Keep in mind

- Ball atomic event hai: sab kuch ball stream se nikalta hai.
- Scorecard projection hai, source of truth nahi.
- Extreme read-write skew matlab cache plus push — per-request computation kabhi nahi.
- Over aur innings transitions explicit state changes banao.
- Key events (wickets, fifties) alag notification topic pe jaate hain.`,
  },
  {
    slug: "inventory-management",
    title: "LLD of Inventory Management System",
    tag: "Interview Question",
    body: `Inventory management concurrency me correctness ki hai: stock count kabhi negative na ho aur do orders same unit consume na karein. Requirements SKUs wale products, stock levels wale warehouses, inbound purchase orders, outbound sales orders, low-stock alerts aur har movement ki audit history tak hain.

Core entities Product, Warehouse, har product-warehouse ka StockLevel aur har inbound/outbound change ke StockMovement records hain. Current levels movement log se nikalte hain, aur decrements atomic check-and-decrement se hote hain taaki overselling impossible ho. Low-stock thresholds alerts chhapte hain, aur har adjustment audit ke liye wajah rakhta hai.

## Core classes

Product (SKU), Warehouse, StockLevel (product plus warehouse plus qty), StockMovement (har change ka record), AlertService (thresholds pe). Levels derived hain, movements sach hain.

\`\`\`js
// Decrement atomic hona chahiye: check aur update ek unit me
class Inventory {
  reserve(sku, warehouse, qty) {
    // production me DB transaction se atomic banao
    if (this.level(sku, warehouse) < qty) return false;
    this.apply({ sku, warehouse, qty: -qty, reason: 'order' });
    return true;
  }
}
\`\`\`

## Key decisions

- **Atomic check-and-decrement:** stock negative hona impossible hona chahiye.
- **Movement log sach hai:** levels derived — poori auditability muft me.
- **Reserve vs deduct alag:** temporary hold aur final katoti do cheezein hain.
- **Alerts thresholds pe:** Observer style notification low-stock pe fire kare.

## Walkthrough

Order me 5 unit chahiye, stock me 8 hain — reserve atomic check karke 5 hold karta hai, movement record banta hai. Payment success pe hold deduct me badalta hai. Beech me doosra order 4 maange to bachi 3 dekh ke mana hota hai — oversell impossible. Stock threshold se neeche gire to purchase team ko alert jaata hai.

**🔴 Galti:** "Levels store karke update karo" — Race me do orders same stock kha jayenge; movement log plus atomic decrement rakho.
**✅ Sahi:** "Movement log sach rakho, check-and-decrement atomic karo, reserve aur deduct alag rakho."

## Keep in mind

- Stock kabhi negative na ho: atomic check-and-decrement hi invariant hai.
- Movement log sach hai, current levels derived hain: poori auditability.
- Reservation (temporary hold) final deduction se alag rakho.
- Low-stock alerts thresholds pe Observer style notification se fire hon.
- Multi-warehouse allocation strategy jodta hai: nearest, cheapest ya fullest first.`,
  },
  {
    slug: "coupons-shopping-cart",
    title: "LLD: Apply Coupons on Shopping Cart products",
    tag: "Interview Question",
    body: `Cart pe coupons rule engines aur Strategy plus Chain combination test karte hain. Requirements: items wali cart, kai coupon types (percentage off, flat off, buy-one-get-one, free shipping), eligibility rules (minimum cart value, category restrictions, expiry, per-user limits) aur stacking policies jo tay karein kaunse coupons judenge.

Coupon apni type, rules aur validity window ke saath banao, aur har coupon type ke liye ek naam ke peeche Discount roop rakho. CouponEngine eligibility validate karta hai, combinable coupons muqarrar order me lagata hai aur itemized price breakdown lautata hai taaki hisaab audit ho sake. Lagane ka order financially matter karta hai — aam taur pe percentage discounts flat se pehle lagte hain, aur policy explicit honi chahiye.

## Core classes

Cart (items), Coupon (type, rules, validity), Discount roop har type ke liye (duck typing se same do methods), CouponEngine (validate plus order plus apply), Bill (itemized breakdown).

\`\`\`js
// Har coupon type same do method rakhta hai (duck typing)
class PercentCoupon {
  eligible(cart, user) { /* expiry, min value, category, limits */ }
  apply(cart) { /* ... */ }
}
// Engine: validate karo, policy order me lagao, breakdown ke saath bill banao
\`\`\`

## Key decisions

- **Types Strategies hain:** percentage, flat, BOGO, free shipping — nayi type matlab nayi class.
- **Eligibility rule chain hai:** expiry, min value, category, limits — sab check hon.
- **Order explicit ho:** percentage pehle ya flat pehle — policy likhi honi chahiye.
- **Stacking policy pehle:** combinable, exclusive ya best-only — interview shuru me poocho.

## Walkthrough

Cart 2000 ki hai, user ke paas 10% off (min 1000) aur flat 200 off (min 1500) hai. Engine dono ki eligibility check karta hai — dono pass. Policy ke hisaab se pehle percentage (2000 se 1800), phir flat (1800 se 1600) — itemized bill banta hai. Expired coupon hota to pehle hi step me reject hota wajah ke saath.

**🔴 Galti:** "Saare coupons ek saath laga do" — Order aur stacking ke bina total galat niklega; policy explicit rakho.
**✅ Sahi:** "Types Strategies me, eligibility chain me, order policy me — itemized bill ke saath checkout karo."

## Keep in mind

- Coupon types Strategies hain: percentage, flat, BOGO, free shipping.
- Eligibility rule chain hai: expiry, min value, category, per-user limits.
- Lagane ka order total badalta hai, isliye policy explicit honi chahiye.
- Itemized breakdown lautao taaki totals audit ho sakein.
- Stacking policy pehle: combinable, exclusive ya best-only.`,
  },
  {
    slug: "payment-gateway",
    title: "LLD of Payment Gateway | Low Level Design of Payments App",
    tag: "Interview Question",
    body: `Payment gateway customers, merchants aur banks ke beech paisa safe chalata hai. Requirements kai payment methods (cards, UPI, netbanking, wallets), idempotent charge requests, banks se webhook callbacks, refunds aur poori reconciliation cover karte hain. Non-negotiable invariant hai kabhi double-charge nahi aur payment state kabhi mat gawao.

Design Payment pe khada hai sakht state machine ke saath (Initiated, Processing, Success, Failed, Refunded), har charge pe idempotency key taaki retries original result lautayein, aur har payment method ke liye ek processor naam ke peeche Strategy roop. Webhooks out of order aur duplicate aate hain — verify karo, dedupe karo, tab transition lagao. Roz bank settlements se gateway records milane wali reconciliation job chalao.

## Core classes

Payment (state machine), PaymentService (idempotency key sambhalta hai), Method Strategies (cards, UPI, netbanking, wallets), WebhookHandler (verify plus dedupe plus apply), ReconciliationJob (roz settlements milao).

\`\`\`js
// Idempotency key plus state machine paise safe rakhti hai
class PaymentService {
  charge(idempotencyKey, money, method) {
    if (this.seen(idempotencyKey)) return this.previous(idempotencyKey);
    const payment = this.create(idempotencyKey, money); // Initiated
    return this.processor.forMethod(method).execute(payment); // transitions
  }
}
\`\`\`

## Key decisions

- **Idempotency key har charge pe:** retry stored result lautaye, dobara charge kabhi nahi.
- **Sakht state machine:** Initiated, Processing, Success, Failed, Refunded — beech ki haalatein allowed nahi.
- **Webhooks pe bharosa nahi:** untrusted, duplicate, unordered — verify, dedupe, phir lagao.
- **Roz reconciliation:** automation jo miss kare, settlements milan pakdega.

## Walkthrough

User 500 pay karta hai idempotency key ke saath — Payment Initiated banta hai, UPI strategy execute karti hai, Processing se Success. Network katne pe client retry karta hai same key se — stored Success wapas milta hai, dobara charge nahi. Bank ka webhook duplicate aaye to dedupe pakad ke ignore hota hai. Raat ko reconciliation settlements se milaan karta hai.

**🔴 Galti:** "Retry pe naya charge bana do" — Double-charge sabse bada paap hai; idempotency key pehle din se lagao.
**✅ Sahi:** "Idempotency key, sakht states, webhook verify-dedupe-apply, roz reconciliation — paise ka design hai, koi shortcut nahi."

## Keep in mind

- Har charge pe idempotency key: retries stored result lautayein, dobara charge kabhi nahi.
- Payment states sakht machine hain: Initiated, Processing, Success, Failed, Refunded.
- Webhooks untrusted, duplicate aur unordered hain: verify, dedupe, phir lagao.
- Method variety Strategy hai: cards, UPI, netbanking, wallets ek naam ke peeche.
- Bank settlements se roz reconciliation wo pakadta hai jo automation miss kare.`,
  },
  {
    slug: "chess-game",
    title: "Design Chess Game",
    tag: "Interview Question",
    body: `Chess Tic-Tac-Toe ka bada bhai hai — same turn-based dhancha, par mohre alag chaal chalte hain. Requirements: 8x8 board, do players, 6 mohre types ke legal moves, baari-badli, check/checkmate/stalemate pehchan, move validation aur game history. Scope pehle tay karo — AI opponent nahi, do human players hain.

Design Board (8x8 cells), Piece base class jisse 6 subclasses (ya move-strategy), Player, Move record aur Game loop pe khada hai. Sabse important faisla check detection hai: har move ke baad dekho apna king hamle me to nahi — simulate karke check karo. Castling, en passant aur promotion edge cases hain — naam lo, time ho to banao.

## Core classes

Board (cells), Piece base plus 6 roop (Pawn, Rook, Knight, Bishop, Queen, King), Player (color), Move (from, to, captured), Game (turn loop, status).

\`\`\`js
// Har mohra apni chaal jaanta hai — Game sirf baari chalata hai
class Piece {
  constructor(color) { this.color = color; }
  legalMoves(board, from) { throw new Error('mohra batayega'); }
}
class Knight extends Piece {
  legalMoves(board, from) { /* 8 L-jumps, board ke andar + apna mohra nahi */ }
}
class Game {
  play() { /* baari lo, move validate karo, check/checkmate dekho */ }
}
\`\`\`

## Key decisions

- **Move generation har piece me:** Game me switch mat lagao — polymorphism use karo.
- **Check detection:** move simulate karke apna king safe hai ya nahi dekho.
- **Special moves scope me rakho:** castling, en passant, promotion — naam lo, time pe banao.
- **History rakho:** Move records se undo aur draw-by-repetition nikalta hai.

## Walkthrough

White e2-e4 chalता hai — Pawn ki legal moves se validate hota hai, Board update hota hai, check test hota hai (nahi hai), baari Black ki. Black e7-e5 jawab deta hai. Aise chalte hue jab king pakda jaye aur koi legal move na bache to checkmate — Game status khatm elaan karta hai.

**🔴 Galti:** "Saari chaal Game me if-else" — 6 mohre ka switch jungle banega; har piece apni chaal khud jaane.
**✅ Sahi:** "Piece base plus 6 roop, check simulate karke dekho, special moves scope me rakho."

## Keep in mind

- Har mohra apni legal moves jaanta hai — Game me switch mat lagao.
- Check detection simulate karke hoti hai — move ke baad king safe hai ya nahi.
- Castling, en passant, promotion edge cases hain — naam lo, time pe banao.
- Move history rakho — undo aur draw claims isi se nikalte hain.
- Tic-Tac-Toe wala turn loop yahan bhi chalta hai — pattern dobara use karo.`,
  },
  {
    slug: "lru-cache",
    title: "Design LRU Cache",
    tag: "Interview Question",
    body: `LRU Cache taqreeban lazmi LLD problem hai: fixed capacity me get/put O(1) me, jagah khatm ho to sabse purana (least recently used) nikalo. Requirements seedhi hain — get, put, capacity — par O(1) ki shart design tay karti hai.

Tarkeeb HashMap plus doubly linked list hai: Map key se node tak O(1) pohchata hai, list order rakhti hai — head fresh (MRU), tail purana (LRU). Get pe node nikaal ke head pe lagao (refresh), put pe naya head pe lagao aur capacity cross ho to tail udao. JS walon ke liye shortcut: Map insertion order rakhta hai — delete karke dobara set karo to fresh ho jaata hai, to Map akela bhi O(1) LRU de deta hai.

## Core classes

LRUCache (capacity, Map, head/tail), Node (key, value, prev, next). Get refresh karta hai, put evict karta hai.

\`\`\`js
// Map + doubly linked list: O(1) get, O(1) put, O(1) evict
class LRUCache {
  constructor(capacity) { this.cap = capacity; this.map = new Map(); this.head = null; this.tail = null; }
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.refresh(node); // haal me use hua — head pe lao
    return node.value;
  }
  put(key, value) { /* naya head pe, purana tail se, cap cross to evict */ }
}
\`\`\`

## Key decisions

- **Map plus DLL:** Map O(1) pahunch, list O(1) order — dono mil ke O(1) cache.
- **Head fresh, tail purana:** get/put dono head pe laagao, evict hamesha tail se.
- **JS shortcut:** Map order rakhta hai — delete+set se refresh, chhote interview me kaafi.
- **Capacity check put pe:** cross ho to tail udao, phir naya jodo.

## Walkthrough

Capacity 2 hai — put(1,1), put(2,2) head se judte hain. get(1) 1 lautata hai aur node head pe aata hai. put(3,3) aata hai — jagah nahi to tail (key 2) udta hai. get(2) ab -1 deta hai. Har operation O(1) me hua.

**🔴 Galti:** "Array se order rakho" — Beech se nikalna O(n) hai; linked list ya Map order chahiye.
**✅ Sahi:** "Map se pahunch, list se order — get pe refresh, put pe tail evict, sab O(1)."

## Keep in mind

- Map O(1) pahunch deta hai, list O(1) order — dono chahiye.
- Head fresh (MRU), tail purana (LRU) — disha pakki rakho.
- Get bhi refresh karta hai — sirf put nahi, ye bhoolna aam bug hai.
- Evict hamesha tail se, capacity check put pe.
- JS Map order rakhta hai — delete+set shortcut interview me batao.`,
  },
  {
    slug: "logger-system",
    title: "Design Logger / Logging Library",
    tag: "Interview Question",
    body: `Logger design teeno patterns ka sangam hai — isliye interviewer ko pasand hai. Requirements: log levels (DEBUG/INFO/WARN/ERROR), kai outputs (console, file, remote), app ko slow na kare (async), aur file rotation (size/time pe nayi file). Har request log call kare, system kabhi ruke nahi.

Design Logger singleton entry point pe khada hai, level filtering Chain of Responsibility se hoti hai (message apne level se neeche walon ko nahi dikhta), aur outputs Observer sinks hain (console sink, file sink, remote sink judte-hat-te rehte hain). Heavy kaam — file write, network — background worker queue se kare taaki app thread kabhi block na ho.

## Core classes

Logger (singleton entry, level set karta hai), Handler chain (level filter), Sink implementations (console, file, remote), AsyncWorker (queue se likhta hai), Rotator (size/time pe file badalta hai).

\`\`\`js
// Level chain filter kare, sinks likhein, worker background me
class Logger {
  constructor() { this.level = 'INFO'; this.sinks = []; }
  addSink(sink) { this.sinks.push(sink); } // Observer jaise judte hain
  log(level, msg) {
    if (!this.passes(level)) return; // Chain: level se neeche wale nahi
    for (const s of this.sinks) s.write(level, msg);
  }
}
\`\`\`

## Key decisions

- **Levels ordered hon:** DEBUG < INFO < WARN < ERROR — set level se neeche sab chhupe.
- **Sinks Observer jaise:** judna-hatna runtime pe, logger ko parwah nahi kaun sun raha.
- **Async likhai:** queue plus worker — app thread block kabhi nahi.
- **Rotation policy:** size ya time pe nayi file, purani archive — disk bharna nahi chahiye.

## Walkthrough

App logger.info('order placed') bulata hai — level INFO set hai to pass hota hai. Console sink turant print karta hai, file sink worker queue me daalta hai jo background me likhta hai. File 10MB cross kare to rotator nayi file kholta hai. DEBUG messages set level se neeche hone se shuru me hi kat jaate hain.

**🔴 Galti:** "Har log sync file me likho" — Disk wait app ko rok dega; likhai hamesha async honi chahiye.
**✅ Sahi:** "Level chain filter kare, sinks Observer jaise judein, worker background me likhe, rotation policy ho."

## Keep in mind

- Teen patterns ek saath: Chain (levels), Observer (sinks), Singleton (entry).
- Levels ordered hain: set level se neeche wale kat jaate hain.
- Likhai async honi chahiye — app thread block kabhi nahi.
- Rotation policy must hai — disk bharna failure hai.
- Sinks runtime pe judte-hat-te hain — logger ko parwah nahi.`,
  },
  {
    slug: "pubsub-system",
    title: "Design Pub-Sub / Message Queue",
    tag: "Interview Question",
    body: `Pub-Sub LLD me HLD messaging ka chhota bhai hai — Kafka/RabbitMQ ke concepts classes me utaaro. Requirements: topics banao, subscribe/unsubscribe karo, publish pe sab subscribers ko mile, durable (baad me aane wala purana padhe) vs ephemeral chunna ho, aur delivery guarantee tay ho.

Design Topic (subscriber list plus message log), Subscriber (callback plus offset), Message (payload plus id) aur Broker (sab sambhalta hai) pe khada hai. Ordering per-topic FIFO rakho, fan-out loop me karo. Delivery at-least-once rakho aur idempotent subscribers maango — exactly-once ka vaada mat karo, ye distributed jhooth hai.

## Core classes

Topic (subscribers plus log), Subscriber (callback, offset), Message (id, payload, time), Broker (publish/subscribe/unsubscribe chalata hai).

\`\`\`js
// Broker hub hai — dost ek doosre ko nahi jaante (Mediator jaisa)
class Broker {
  constructor() { this.topics = new Map(); }
  subscribe(topic, subscriber) { /* list me jodo, offset note karo */ }
  publish(topic, message) {
    const t = this.topics.get(topic);
    t.log.push(message); // durable ho to store karo
    for (const s of t.subscribers) s.deliver(message); // fan-out
  }
}
\`\`\`

## Key decisions

- **Durable vs ephemeral:** baad me aane wala purana padhega ya nahi — shuru me tay karo.
- **Ordering per-topic FIFO:** global order ka vaada mat karo.
- **At-least-once plus idempotent:** duplicate aa sakta hai — subscriber dedupe kare.
- **Slow subscriber:** peeche rehne wale ko drop ya buffer policy chahiye — warna hub marega.

## Walkthrough

Order service order.created publish karta hai — Broker topic log me daalta hai aur teeno subscribers (email, inventory, analytics) ko deliver karta hai. Inventory slow hai to uska offset peeche rehta hai, baaki aage badhte hain. Naya analytics subscriber judta hai to durable log se purane events padh leta hai.

**🔴 Galti:** "Exactly-once delivery ka vaada" — Distributed me ye jhooth hai; at-least-once plus idempotent bolo.
**✅ Sahi:** "Topic-wise FIFO, durable log, at-least-once delivery, idempotent subscribers — HLD Kafka ka chhota roop."

## Keep in mind

- Dost hub se baat karein — Mediator pattern yahan fit hota hai.
- Durable vs ephemeral shuru me tay karo — baad me badalna mushkil hai.
- Ordering per-topic FIFO rakho, global ka vaada mat karo.
- Duplicate delivery hogi — idempotent subscribers maango.
- Slow subscriber ke liye drop/buffer policy rakho.`,
  },
  {
    slug: "meeting-scheduler",
    title: "Design Meeting Scheduler",
    tag: "Interview Question",
    body: `Meeting Scheduler interval problems ka LLD roop hai. Requirements: users, time-range wali meetings, rooms, clash detection, recurring meetings aur notifications. Do meetings overlap na karein — yehi invariant hai, aur rooms minimum lagne chahiye.

Design User, Meeting (start, end, attendees, room), Room aur Scheduler pe khada hai. Clash detection interval overlap check hai: nayi meeting tabhi jab kisi maujooda se na takraye. Minimum rooms nikalna classic interval partitioning hai — min-heap se end times track karo. Recurring meetings ko rule (har Monday) plus instances me todo.

## Core classes

User, Meeting (range plus attendees plus room), Room, Scheduler (book/cancel, clash check, room allocate), RecurrenceRule.

\`\`\`js
// Overlap check hi poora khel hai
class Scheduler {
  overlaps(a, b) { return a.start < b.end && b.start < a.end; }
  book(meeting) {
    for (const m of this.meetings) {
      if (this.overlaps(m, meeting)) throw new Error('Clash hai — doosra time lo');
    }
    meeting.room = this.allocateRoom(meeting);
    this.meetings.push(meeting);
  }
}
\`\`\`

## Key decisions

- **Overlap formula:** a.start < b.end && b.start < a.end — ye ek line rat lo.
- **Rooms minimum:** end-times ka min-heap — khaali room mile to reuse, warna naya.
- **Recurring alag rakho:** rule store karo, instances zaroorat pe banao — infinite list mat banao.
- **Timezone:** sab UTC me store karo, display pe convert — ye detail impress karti hai.

## Walkthrough

User 10-11 ki meeting book karta hai Room A me — koi clash nahi, confirm. Doosra user 10:30-11:30 maangta hai — overlap pakda gaya, Room B milta hai (khaali hai). Teesra 10:15-10:45 maange to dono rooms busy — reject ya waitlist. Cancel pe room free, waitlist ko notify.

**🔴 Galti:** "Rooms gin ke hardcode kar do" — Load pe rooms kam padenge; min-heap se allocate karo.
**✅ Sahi:** "Overlap formula se clash pakdo, min-heap se rooms allocate karo, recurring rule se banao."

## Keep in mind

- Overlap formula rat lo: a.start < b.end && b.start < a.end.
- Minimum rooms min-heap se — khaali reuse, warna naya.
- Recurring meetings rule store karo, instances mat gino.
- Time sab UTC me rakho — timezone bug interview me pakda jaata hai.
- Cancel pe waitlist notify karo — poora flow band karo.`,
  },
  {
    slug: "library-system",
    title: "Design Library Management System",
    tag: "Interview Question",
    body: `Library System classic OOP practice problem hai — state machine plus Strategy dono dikhane ka mauka. Requirements: books (kai copies), members, due dates wali borrowing, jurmana (fines), reservations aur search. Har copy ki haalat track honi chahiye.

Design Book (title/author metadata), BookCopy (barcode wali asli copy — Available/Borrowed/Reserved states), Member, Loan (copy plus dates) aur Reservation pe khada hai. Jurmana Strategy me rakho (student vs faculty alag rates). Copy ki state machine transitions guard karti hai — Borrowed copy dobara issue nahi ho sakti.

## Core classes

Book (metadata), BookCopy (barcode plus state), Member, Loan (copy, member, due date), Reservation (queue), FineStrategy.

\`\`\`js
// Copy ki state machine galat transitions rokti hai
class BookCopy {
  constructor(barcode) { this.barcode = barcode; this.status = 'Available'; }
  borrow() {
    if (this.status !== 'Available') throw new Error('Ye copy uplabdh nahi');
    this.status = 'Borrowed';
  }
  returnCopy() { this.status = 'Reserved'; } // reservation ho to, warna Available
}
\`\`\`

## Key decisions

- **Book vs BookCopy alag rakho:** metadata ek, copies kai — ye farak core hai.
- **State machine:** Available/Borrowed/Reserved — galat transition code me impossible ho.
- **Jurmana Strategy me:** member type pe rates badlein, code na badle.
- **Reservation queue:** return pe pehle waitlist ko mauka mile.

## Walkthrough

Member "Clean Code" maangta hai — available copy milti hai, Loan banta hai 14-din due date ke saath, copy Borrowed hoti hai. Time pe return — Available wapas. Late return — FineStrategy se jurmana nikalta hai. Dono copies busy hon to Reservation queue me naam judta hai, return pe pehle usko khabar milti hai.

**🔴 Galti:** "Book aur copy ek hi class" — Copies track nahi hongi; metadata aur physical copy alag rakho.
**✅ Sahi:** "Book vs BookCopy alag karo, state machine se transitions guard karo, jurmana Strategy me rakho."

## Keep in mind

- Book (metadata) aur BookCopy (physical) alag — ye sabse pehla faisla hai.
- Copy states Available/Borrowed/Reserved rakho — galat issue impossible banao.
- Jurmana Strategy me — member type pe rate badle.
- Reservation queue rakho — return pe waitlist ko pehle mauka.
- Due dates aur fines walkthrough me chala ke dikhao.`,
  },
];
