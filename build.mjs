// Moo Choco Cherry — generator alert + widget + preview (Sociabuzz & Saweria)
// Jalankan: node build.mjs  (hasil ada di folder ini dan ./widgets)
//
// === GANTI ASET GAMBAR DI SINI ===
// Masukkan URL raw gambar kamu (mis. https://raw.githubusercontent.com/kamu/moo-assets/main/karakter.png).
// Kalau masih null, dipakai placeholder SVG maskot cokelat sapi (MOO) bawaan.
const RAW_BG = null;   // background kartu (mis. png 720x280 tema cokelat)
const RAW_TOP = null;  // karakter MOO untuk sisi KANAN alert (PNG transparan)

const TITLE = "Moo Choco Cherry";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = path.dirname(fileURLToPath(import.meta.url));
const DST = path.join(BASE, "widgets");
fs.mkdirSync(DST, { recursive: true });

// -------------------------------------------------------------- placeholder aset
const svgUri = (svg) => "data:image/svg+xml," + encodeURIComponent(svg).replace(/%20/g, " ");

// bg cokelat: permen spots maroon + hati pink (senada beret & pita)
const BG_SVG = "<svg xmlns='http://www.w3.org/2000/svg' width='720' height='280'>" +
  "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
  "<stop offset='0' stop-color='#4A3230'/><stop offset='.5' stop-color='#6E4B42'/>" +
  "<stop offset='1' stop-color='#2A1B17'/></linearGradient></defs>" +
  "<rect width='720' height='280' fill='url(#g)'/>" +
  "<g fill='#A24E42' opacity='.38'><circle cx='70' cy='52' r='10'/><circle cx='640' cy='64' r='7'/>" +
  "<circle cx='600' cy='218' r='12'/><circle cx='120' cy='232' r='8'/></g>" +
  "<g fill='#F2B7C6' opacity='.5'><circle cx='360' cy='40' r='6'/><circle cx='70' cy='52' r='3'/>" +
  "<circle cx='640' cy='64' r='2.5'/></g>" +
  "<g fill='#F6F1EE' opacity='.35'><circle cx='180' cy='120' r='4'/><circle cx='520' cy='150' r='5'/>" +
  "<circle cx='60' cy='180' r='3'/></g></svg>";

// karakter MOO sisi kanan: chibi cokelat beret + pita pink + telinga sapi + tag MOO
const TOP_SVG = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='230' viewBox='0 0 200 230'>" +
  "<g stroke='#6E2B25' stroke-width='3'>" +
  "<ellipse cx='28' cy='95' rx='26' ry='13' fill='#F6F1EE' transform='rotate(-16 28 95)'/>" +
  "<ellipse cx='172' cy='95' rx='26' ry='13' fill='#F6F1EE' transform='rotate(16 172 95)'/>" +
  "</g>" +
  "<g fill='#A24E42'><circle cx='20' cy='92' r='5'/><circle cx='36' cy='88' r='6.5'/>" +
  "<circle cx='164' cy='88' r='5'/><circle cx='180' cy='92' r='6.5'/></g>" +
  "<rect x='26' y='110' width='9' height='12' rx='2' fill='#3D7A44'/>" +
  "<path d='M30 130 c-9 -9 -16 2 -7 9 l7 5 7 -5 c9 -7 2 -18 -7 -9 z' fill='#4A3230'/>" +
  "<text x='30' y='135' text-anchor='middle' font-family='sans-serif' font-size='7' fill='#F6F1EE'>MOO</text>" +
  "<rect x='167' y='110' width='8' height='15' rx='2' fill='#8E4640'/>" +
  "<ellipse cx='100' cy='92' rx='62' ry='36' fill='#33251F'/>" +
  "<ellipse cx='100' cy='128' rx='48' ry='42' fill='#FCEDE7'/>" +
  "<g stroke='#6E2B25' stroke-width='3' fill='#FCEDE7'>" +
  "<ellipse cx='78' cy='128' rx='11' ry='13'/><ellipse cx='122' cy='128' rx='11' ry='13'/></g>" +
  "<circle cx='78' cy='128' r='8' fill='#2A1B17'/><circle cx='122' cy='128' r='8' fill='#2A1B17'/>" +
  "<g fill='#F6E7B8'><path d='M78 122 L80 126 L84 128 L80 130 L78 134 L76 130 L72 128 L76 126 z'/>" +
  "<path d='M122 122 L124 126 L128 128 L124 130 L122 134 L120 130 L116 128 L120 126 z'/></g>" +
  "<circle cx='63' cy='143' r='6' fill='#F7C5BC' opacity='.85'/><circle cx='137' cy='143' r='6' fill='#F7C5BC' opacity='.85'/>" +
  "<ellipse cx='100' cy='150' rx='8' ry='6' fill='#F7A08C' stroke='#6E2B25' stroke-width='2'/>" +
  "<path d='M30 82 C 28 28 172 28 170 82 C 170 98 154 104 100 104 C 46 104 30 98 30 82 Z' fill='#4A3230' stroke='#2A1B17' stroke-width='2'/>" +
  "<rect x='31' y='82' width='138' height='9' rx='4' fill='#6E4B42'/>" +
  "<path d='M36 52 C 60 40 140 40 164 52' stroke='#8A6152' stroke-width='5' fill='none' stroke-linecap='round'/>" +
  "<g stroke='#C98A96' stroke-width='2' fill='#F2B7C6'>" +
  "<ellipse cx='68' cy='48' rx='17' ry='11' transform='rotate(-20 68 48)'/>" +
  "<ellipse cx='104' cy='48' rx='17' ry='11' transform='rotate(20 104 48)'/></g>" +
  "<circle cx='86' cy='50' r='6' fill='#F2B7C6' stroke='#C98A96' stroke-width='2'/>" +
  "<g stroke='#F6F1EE' stroke-width='3' fill='none'>" +
  "<path d='M86 56 Q 68 68 70 82'/><path d='M90 56 Q 98 70 96 86'/></g>" +
  "<circle cx='70' cy='92' r='10' fill='#F6F1EE' stroke='#6E2B25' stroke-width='3'/>" +
  "<circle cx='97' cy='94' r='8' fill='#F6F1EE' stroke='#6E2B25' stroke-width='3'/>" +
  "<circle cx='67' cy='89' r='2.5' fill='#FFFFFF'/><circle cx='94' cy='91' r='2' fill='#FFFFFF'/>" +
  "<path d='M84 168 L116 168 L100 184 Z' fill='#FDF9F7'/>" +
  "<g fill='#4A332B'><circle cx='100' cy='184' r='3'/><path d='M100 184 l-14 -5 v10 z'/><path d='M100 184 l14 -5 v10 z'/></g>" +
  "<rect x='58' y='176' width='84' height='54' rx='8' fill='#4A332B' stroke='#2A1B17' stroke-width='2'/>" +
  "<g fill='#F3AFBD'><ellipse cx='84' cy='200' rx='9' ry='6' transform='rotate(-18 84 200)'/>" +
  "<ellipse cx='96' cy='204' rx='9' ry='6' transform='rotate(18 96 204)'/>" +
  "<ellipse cx='112' cy='198' rx='8' ry='5' transform='rotate(-16 112 198)'/>" +
  "<ellipse cx='122' cy='203' rx='8' ry='5' transform='rotate(16 122 203)'/></g>" +
  "</svg>";

const BG = RAW_BG || svgUri(BG_SVG);

// foto maskot: default otomatis dari assets/moo.gif (embedded base64) — jadi sumber
// langsung di alert tanpa hosting. RAW_TOP (URL) selalu menang kalau diisi.
const MOO_GIF = path.join(BASE, "assets", "moo.gif");
const TOP = RAW_TOP || (fs.existsSync(MOO_GIF)
    ? "data:image/gif;base64," + fs.readFileSync(MOO_GIF).toString("base64")
    : svgUri(TOP_SVG));

const cssUri = (u) => u.replace(/#/g, "%23");
const BGURL = 'url("' + cssUri(BG) + '")';

// badge MOO · CHERRY di bawah judul widget
const BADGE_URL = 'url("data:image/svg+xml,' + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='170' height='13'>" +
  "<text x='0' y='10' font-family='sans-serif' font-size='9' font-weight='800' letter-spacing='1.6'>" +
  "<tspan fill='#F3AFBD'>MOO </tspan><tspan fill='#F6E7B8'>\u00B7 </tspan>" +
  "<tspan fill='#F9E4E9'>CHERRY</tspan></text></svg>") + '")';

// ================================================================= ALERT
const ALERT_CSS = `html,body{overflow:hidden!important}.sk-card{box-sizing:border-box;position:relative;isolation:isolate;display:flex;align-items:center;justify-content:flex-start;width:720px;max-width:100%;height:280px;margin:0 auto;overflow:hidden;border:3px solid #F2B7C6;border-radius:24px;background:#4A3230;color:#FFF6EE;font-family:'Trebuchet MS','Segoe UI',sans-serif;text-align:center;box-shadow:0 12px 34px rgba(42,27,23,.65),0 0 26px rgba(231,152,174,.42),inset 0 0 0 2px rgba(255,246,238,.6);animation:sk-in .7s cubic-bezier(.2,.9,.25,1.12) both,sk-breathe 5s ease-in-out .7s infinite}.sk-bg{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;object-fit:cover;filter:saturate(1.06) brightness(.96);animation:sk-zoom 16s ease-in-out infinite alternate}.sk-veil{position:absolute;top:0;left:0;right:0;bottom:0;z-index:1;background:linear-gradient(90deg,rgba(74,50,48,.08),rgba(42,27,23,.3)),linear-gradient(180deg,rgba(242,183,198,.06),rgba(42,27,23,.22))}.sk-veil::before,.sk-veil::after{content:"\\1F497";position:absolute;z-index:3;color:#F2B7C6;text-shadow:0 0 10px rgba(231,152,174,.8);pointer-events:none;animation:sk-fall 6s linear infinite}.sk-veil::before{left:6%;top:-30px;font-size:20px}.sk-veil::after{left:48%;top:-24px;font-size:14px;animation-delay:-2.8s;animation-duration:8s}.sk-card::after{content:"\\1F497";position:absolute;z-index:7;left:10%;bottom:-26px;font-size:16px;text-shadow:0 0 10px rgba(231,152,174,.8);pointer-events:none;animation:sk-fall 7s linear -4.4s infinite}.sk-char{position:absolute;z-index:4;right:-16px;bottom:-10px;pointer-events:none;object-fit:contain;object-position:bottom right;filter:drop-shadow(0 8px 14px rgba(30,19,16,.65));width:clamp(195px,32%,262px);animation:sk-bob 4.2s ease-in-out infinite}.sk-c{position:relative;z-index:6;box-sizing:border-box;width:56%;min-width:0;padding:0 10px 0 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-shadow:0 2px 8px rgba(30,19,16,.95)}.sk-c::before{content:"";position:absolute;top:-18px;right:-10px;bottom:-18px;left:-16px;z-index:-1;pointer-events:none;background:radial-gradient(ellipse,rgba(30,19,16,.6),rgba(30,19,16,.24) 62%,transparent 100%);filter:blur(10px)}.sk-c>*{position:relative;z-index:1}.sk-kicker{color:#F9E4E9;font-size:11px;font-weight:900;letter-spacing:2.2px;text-transform:uppercase;text-shadow:0 2px 6px #2A1B17,0 0 14px rgba(246,231,184,.75)}.sk-kicker::before{content:"\\273B\\0020";color:#F6E7B8}.sk-amount{font-size:clamp(28px,5.6vw,42px);font-weight:900;line-height:1.12;margin:8px 0 10px;background:linear-gradient(180deg,#FFFFFF,#F9E4E9 55%,#F3AFBD);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;filter:drop-shadow(0 3px 7px rgba(30,19,16,.9));animation:sk-pop .8s cubic-bezier(.2,.9,.3,1.25) .25s both}.sk-tag{color:#F9E4E9;font-size:12px;font-weight:700;font-style:italic;text-shadow:0 2px 6px #2A1B17;margin-bottom:9px}.sk-who{margin:0 0 9px}.sk-name{display:inline-block;padding:4px 20px;border:1px solid rgba(246,231,184,.55);border-radius:999px;background:linear-gradient(90deg,rgba(231,152,174,.32),rgba(242,183,198,.26));color:#FFFFFF;font-size:clamp(15px,2.9vw,20px);font-weight:800;letter-spacing:.4px;text-shadow:0 2px 7px #2A1B17;box-shadow:0 0 14px rgba(231,152,174,.35)}.sk-msg{color:#F9E4E9;font-size:14px;font-style:italic;font-weight:600;max-width:400px;overflow-wrap:anywhere}@keyframes sk-in{from{opacity:0;transform:translateY(26px) scale(.94) rotate(-1.4deg)}to{opacity:1;transform:none}}@keyframes sk-breathe{0%,100%{box-shadow:0 12px 34px rgba(42,27,23,.65),0 0 20px rgba(231,152,174,.3),inset 0 0 0 2px rgba(255,246,238,.6)}50%{box-shadow:0 16px 44px rgba(42,27,23,.72),0 0 38px rgba(231,152,174,.6),inset 0 0 0 2px rgba(255,246,238,.85)}}@keyframes sk-zoom{from{transform:scale(1)}to{transform:scale(1.08)}}@keyframes sk-fall{from{transform:translateY(-34px) translateX(0) rotate(0);opacity:0}10%{opacity:.95}55%{transform:translateY(45%) translateX(34px) rotate(160deg)}to{transform:translateY(310px) translateX(-18px) rotate(360deg);opacity:.15}}@keyframes sk-bob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-8px) rotate(2deg)}}@keyframes sk-pop{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}`;

const alertHtml = (who, tag) =>
  `<div class="sk-card"><img class="sk-bg" src="${BG}" alt="">` +
  `<div class="sk-veil"></div><img class="sk-char" src="${TOP}" alt="">` +
  `<div class="sk-c"><div class="sk-kicker">Terima Kasih</div>` +
  `<div class="sk-amount">{amount}</div>${tag}` +
  `<div class="sk-who"><span class="sk-name">${who}</span></div>` +
  `<div class="sk-msg">{message}</div></div></div>`;

// ================================================================= WIDGET (bagian bersama)
const BODY = "body{background:transparent!important;margin:0;overflow:hidden;" +
  "font-family:'Trebuchet MS','Segoe UI',sans-serif}";

const SHELL = () =>
  "{box-sizing:border-box;position:relative;isolation:isolate;overflow:hidden;" +
  "border:1px solid #F2B7C6;border-radius:12px;" +
  "background-image:linear-gradient(rgba(74,50,48,.85),rgba(42,27,23,.94))," + BGURL +
  ",radial-gradient(ellipse at 12% 18%,rgba(242,183,198,.35) 0 7px,transparent 8px)" +
  ",radial-gradient(ellipse at 78% 26%,rgba(231,152,174,.3) 0 5px,transparent 6px)" +
  ",radial-gradient(ellipse at 26% 84%,rgba(246,231,184,.22) 0 6px,transparent 7px)" +
  ",linear-gradient(135deg,#6E4B42,#2A1B17);" +
  "background-size:auto,cover,auto,auto,auto,auto;color:#FFF6EE;" +
  "box-shadow:0 0 25px rgba(231,152,174,.34),inset 0 0 22px rgba(110,75,66,.4);" +
  "animation:skw-in .6s cubic-bezier(.2,.9,.3,1.15) forwards,skw-drift 13s ease-in-out infinite alternate,skw-glow 3.4s ease-in-out infinite}";

const KEYS =
  "@keyframes skw-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}" +
  "@keyframes skw-drift{from{background-position:0 0,0 0,0 0,0 0,0 0,0 0}" +
  "to{background-position:0 0,0 0,10px -18px,-8px 14px,7px -11px,-10px 8px}}" +
  "@keyframes skw-glow{0%,100%{box-shadow:0 10px 24px rgba(231,152,174,.4),inset 0 1px 0 rgba(255,255,255,.08)}" +
  "50%{box-shadow:0 14px 36px rgba(231,152,174,.58),inset 0 1px 0 rgba(255,255,255,.12)}}" +
  "@keyframes skw-sheen{from{opacity:.15;transform:rotate(-22deg) translateX(-14px)}" +
  "to{opacity:.8;transform:rotate(-22deg) translateX(14px)}}" +
  "@keyframes skw-sweep{from{transform:translateX(-120%)}to{transform:translateX(340%)}}" +
  "@keyframes skw-fill{0%,100%{filter:brightness(1)}50%{filter:brightness(1.25)}}" +
  "@keyframes skw-row{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}" +
  "@keyframes skw-champ{0%,100%{text-shadow:0 0 8px rgba(231,152,174,.4)}" +
  "50%{text-shadow:0 0 20px rgba(231,152,174,.7)}}" +
  "@keyframes skw-tick{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}" +
  "@keyframes skw-beat{0%,100%{transform:scale(1)}18%{transform:scale(1.28)}36%{transform:scale(1.05)}}";

const filmstrip = (root) =>
  root + '::before{content:"";position:absolute;z-index:1;left:0;right:0;top:0;height:4px;' +
  "background:repeating-linear-gradient(90deg,#E798AE 0 30px,#F6F1EE 30px 60px,#8E4640 60px 90px);" +
  "opacity:.92;pointer-events:none}" +
  root + '::after{content:"";position:absolute;z-index:1;right:-30px;top:-30px;width:120px;height:2px;' +
  "background:linear-gradient(90deg,transparent,rgba(242,183,198,.75),transparent);" +
  "transform:rotate(-22deg);box-shadow:0 0 14px rgba(231,152,174,.55);" +
  "animation:skw-sheen 3.4s ease-in-out infinite alternate;pointer-events:none}";

// --------------------------------------------------------------- SOCIABUZZ
const socHeader = (scope, title) =>
  scope + " .card .card-header{padding:14px 10px 2px;text-align:center!important}" +
  scope + " .card .card-header h4{margin:0;font-size:0!important}" +
  scope + " .card .card-header h4::before{content:'" + title + "';font-size:19px;letter-spacing:1.6px;" +
  "text-transform:uppercase;color:#F9E4E9;text-shadow:0 2px 8px rgba(42,27,23,.85)}" +
  scope + " .card .card-header h4::after{content:" + BADGE_URL + ";display:block;width:170px;" +
  "height:13px;margin:4px auto 0}";

const socRows = (scope) => {
  let css = scope + " .card .show_donate{width:100%;table-layout:fixed;border-collapse:separate;" +
    "border-spacing:0 5px;margin:0!important}" +
    scope + " .card .show_donate td{vertical-align:middle;padding:7px 9px;border:0;" +
    "color:#FFF6EE!important;background:rgba(42,27,23,.66);border:1px solid rgba(242,183,198,.16);" +
    "font-size:14px;border-radius:8px}";
  for (let i = 1; i <= 10; i++)
    css += scope + ` .card .show_donate tr:nth-child(${i}){opacity:0;animation:skw-row .45s ease ${(i * .12).toFixed(2)}s forwards}`;
  return css +
    scope + " .card .show_donate td:first-child{width:36px;color:#F9E4E9;font-weight:900;text-align:center}" +
    scope + " .card .show_donate td:last-child{width:38%;text-align:right;white-space:nowrap}" +
    scope + " .card .show_donate .text-limit{text-align:left;overflow:hidden;text-overflow:ellipsis;" +
    "white-space:nowrap;color:#FFF6EE;font-weight:600}" +
    scope + " .card .show_donate tr:first-child .text-limit{font-weight:800;" +
    "text-shadow:0 0 9px rgba(231,152,174,.55);animation:skw-champ 2s ease-in-out 1.6s infinite}" +
    scope + " .card .show_donate .text-limit-r{color:#F9E4E9;font-weight:800;text-align:right;white-space:nowrap}" +
    scope + " .card .show_donate .empty{color:#F3AFBD;font-style:italic;text-align:center}";
};

const socCards = (w, title) =>
  BODY + ".w-" + w + " .card" + SHELL() + KEYS + filmstrip(".w-" + w + " .card")
  + socHeader(".w-" + w, title) + socRows(".w-" + w);

const sociabuzz = {
  "sociabuzz-top-donator": socCards("top", "Moo Cherry \u00B7 Top Donator"),
  "sociabuzz-queue": socCards("queue", "Moo Cherry \u00B7 Antrean Bunga"),

  "sociabuzz-milestone": BODY + ".w-mile .card" + SHELL() + KEYS + filmstrip(".w-mile .card") +
    ".w-mile .card .card-header{padding:14px 10px 2px;text-align:center!important}" +
    ".w-mile .card .card-header h4{margin:0;font-size:20px;letter-spacing:1.5px;" +
    "text-transform:uppercase;color:#F9E4E9;text-shadow:0 2px 8px rgba(42,27,23,.85)}" +
    ".w-mile .card .card-header h4::after{content:" + BADGE_URL + ";display:block;width:170px;" +
    "height:13px;margin:4px auto 0}" +
    ".w-mile .card .card-body{padding:0 20px 20px!important;background:transparent!important}" +
    ".w-mile .card .progress{position:relative;height:14px;overflow:hidden;margin:10px 0 12px;" +
    "border:1px solid rgba(242,183,198,.3);border-radius:999px;background:rgba(42,27,23,.5)}" +
    ".w-mile .card .progress::after{content:'';position:absolute;z-index:3;top:0;bottom:0;" +
    "left:-45%;width:42%;background:linear-gradient(90deg,transparent,#FFF6EE,transparent);" +
    "opacity:.6;animation:skw-sweep 2.6s ease-in-out infinite;pointer-events:none}" +
    ".w-mile .card .progress-bar,.w-mile .card .progress-bars{height:100%!important;" +
    "border-radius:999px;background:linear-gradient(90deg,#E798AE,#F6E7B8,#F2B7C6);" +
    "box-shadow:0 0 12px rgba(231,152,174,.6);animation:skw-fill 2.8s ease-in-out infinite}" +
    ".w-mile .card .center_progress{margin:0 auto;text-align:center}" +
    ".w-mile .card .center_progress h4{margin:0;color:#F9E4E9;font-weight:800;" +
    "text-shadow:0 2px 8px rgba(42,27,23,.9)}",

  "sociabuzz-subathon": BODY + ".w-sub .subathon-container" + SHELL() + KEYS +
    filmstrip(".w-sub .subathon-container") +
    ".w-sub .subathon-container{padding:18px 14px}" +
    ".w-sub .subathon-container .sub_judul{margin:0;text-align:center!important}" +
    ".w-sub .subathon-container .sub_judul strong{font-size:20px;letter-spacing:1.6px;" +
    "text-transform:uppercase;color:#F9E4E9;text-shadow:0 2px 8px rgba(42,27,23,.85)}" +
    ".w-sub .subathon-container .sub_judul::after{content:" + BADGE_URL + ";display:block;" +
    "width:170px;height:13px;margin:4px auto 0}" +
    ".w-sub .subathon-container .sub_timer{display:flex!important;justify-content:center;" +
    "gap:10px;margin-top:14px;color:#FFF6EE;text-shadow:0 0 12px rgba(231,152,174,.55);" +
    "font-weight:900;font-size:40px;line-height:1.1}" +
    ".w-sub .subathon-container .sub_timer span{display:inline-grid;place-items:center;" +
    "min-width:52px;padding:6px 8px;border:1px solid rgba(246,231,184,.5);border-radius:10px;" +
    "background:linear-gradient(180deg,rgba(110,75,66,.55),rgba(42,27,23,.65));" +
    "box-shadow:0 6px 16px rgba(42,27,23,.55);animation:skw-tick 3.6s ease-in-out infinite}" +
    ".w-sub .subathon-container .sub_timer span:nth-child(2){animation-delay:-.6s}" +
    ".w-sub .subathon-container .sub_timer span:nth-child(3){animation-delay:-1.2s}",

  "sociabuzz-top-donator-runningtext": BODY +
    ".custom-font{position:relative;box-sizing:border-box;min-height:46px;overflow:hidden;" +
    "display:flex;align-items:center;border-left:4px solid #E798AE;border-radius:8px;" +
    "background:linear-gradient(90deg,rgba(74,50,48,.88),rgba(42,27,23,.92));padding:4px 12px;" +
    "box-shadow:0 0 18px rgba(231,152,174,.35)}" +
    ".custom-font::after{content:'';position:absolute;z-index:1;top:-24px;right:-24px;" +
    "width:90px;height:2px;background:linear-gradient(90deg,transparent,rgba(242,183,198,.7),transparent);" +
    "transform:rotate(-22deg);animation:skw-sheen 3.2s ease-in-out infinite alternate;pointer-events:none}" +
    ".custom-font marquee{font:800 24px 'Trebuchet MS','Segoe UI',sans-serif;color:#F9E4E9;" +
    "letter-spacing:1.2px;text-shadow:0 2px 8px rgba(42,27,23,.9)}" +
    ".custom-font strong{color:#F6E7B8;text-shadow:0 0 10px rgba(246,231,184,.6)}",
};

// mediashare sociabuzz (basis bersama untuk varian biasa & video)
const MS_BASE = BODY + "#ms_container{" +
  SHELL().slice(1).replace("animation:", "padding:18px 16px;margin:0;min-height:120px;animation:")
  + KEYS + filmstrip("#ms_container") +
  "#ms_container::after{content:'\\1F497\\00A0\\1F497';position:absolute;z-index:2;right:12px;bottom:8px;" +
  "font-size:13px;letter-spacing:4px;color:rgba(242,183,198,.55);opacity:.9;" +
  "animation:skw-tick 3.6s ease-in-out infinite;pointer-events:none}" +
  "#ms_container > *{position:relative;z-index:3;color:#FFF6EE}" +
  "#ms_container .text-container,#ms_container .style-1.text-container{position:relative;" +
  "width:min(880px,96%,calc((100vh - 215px) * 16 / 9));margin:8px auto;padding:16px 22px;" +
  "border:1px solid rgba(242,183,198,.3);border-radius:14px;" +
  "background:linear-gradient(180deg,rgba(74,50,48,.8),rgba(42,27,23,.9));" +
  "box-shadow:0 10px 30px rgba(42,27,23,.55),inset 0 1px 0 rgba(255,255,255,.08)}" +
  "#ms_container .title{display:flex!important;flex-wrap:wrap!important;align-items:center!important;" +
  "justify-content:center!important;gap:6px 12px;margin:0}" +
  "#ms_container #sender,.ms_sender{order:1;min-width:0;overflow-wrap:anywhere;" +
  "font:800 30px 'Trebuchet MS','Segoe UI',sans-serif;color:#FFF6EE;" +
  "text-shadow:0 2px 10px rgba(42,27,23,.9)}" +
  "#ms_container .dari{order:2;display:inline-flex!important;align-items:center;justify-content:center;" +
  "width:38px;height:38px;font-size:0;border-radius:50%;" +
  "background:linear-gradient(180deg,#E798AE,#8E4640);box-shadow:0 0 12px rgba(231,152,174,.6)}" +
  "#ms_container .dari::after{content:'\\2665';font-size:22px;color:#FFF6EE;" +
  "text-shadow:0 2px 6px rgba(42,27,23,.9);animation:skw-beat 1.6s ease-in-out infinite}" +
  "#ms_container #nominal,.ms_nominal{order:3;min-width:0;overflow-wrap:anywhere;" +
  "font:900 30px 'Trebuchet MS','Segoe UI',sans-serif;color:#F6E7B8;" +
  "text-shadow:0 2px 10px rgba(42,27,23,.9)}" +
  "#ms_container #message,#ms_container .message,#ms_container .media-message{display:block;" +
  "max-width:92%;margin:7px auto 0;color:#F9E4E9;" +
  "font:italic 600 16px 'Trebuchet MS','Segoe UI',sans-serif;text-align:center}" +
  "#ms_container #message:empty,#ms_container .message:empty{display:none!important}" +
  "#ms_container .media-main{display:flex;justify-content:center;align-items:center;" +
  "font-size:18px;color:#F6E7B8;letter-spacing:2px;text-shadow:0 0 10px rgba(246,231,184,.5)}" +
  "#ms_container .loadingbar{display:block;position:relative;height:8px;margin:6px auto 2px;" +
  "width:min(880px,96%);border-radius:999px;overflow:hidden;background:rgba(42,27,23,.7);" +
  "border:1px solid rgba(242,183,198,.28)}" +
  "#ms_container .loadingbar svg path:last-child{stroke:#E798AE!important;" +
  "filter:drop-shadow(0 0 5px rgba(231,152,174,.85))}" +
  "@media(max-width:700px){#ms_container .text-container{padding:8px 12px}" +
  "#ms_container #sender,#ms_container #nominal{font-size:clamp(18px,5.2vw,24px)!important}}";

sociabuzz["sociabuzz-mediashare"] = MS_BASE +
  ".thumbnail,#ms_container iframe,#ms_container video,#ms_container .media-progress{display:none!important}";

sociabuzz["sociabuzz-mediashare-video"] = MS_BASE +
  ".media-container{display:flex!important;flex-direction:column!important;align-items:center!important;" +
  "gap:12px!important}" +
  "#ms_container .media-container iframe.media,#ms_container .video-preview,#ms_container .thumbnail{" +
  "width:min(880px,96%,calc((100vh - 215px) * 16 / 9))!important;aspect-ratio:16/9!important;" +
  "height:auto!important;border:1px solid rgba(246,231,184,.5);border-radius:12px;" +
  "box-shadow:0 12px 30px rgba(42,27,23,.6)}" +
  "#ms_container .loadingbar{width:min(880px,96%,calc((100vh - 215px) * 16 / 9))!important}" +
  "@media(max-height:260px){#ms_container{padding:10px!important}" +
  "#ms_container .media-container iframe.media,#ms_container .video-preview,#ms_container .thumbnail{" +
  "width:min(420px,94%)!important}.thumbnail{min-height:90px!important;height:110px!important;" +
  "aspect-ratio:auto!important}}";

// ---------------------------------------------------------------- SAWERIA
const ROOT = "#__next > div";
const sawShell = (pad) => BODY + ROOT + "{" +
  SHELL().slice(1).replace("animation:", pad + "animation:");

const sawTitleBadge = (sel, before) =>
  ROOT + " " + sel + "{margin:0 0 10px;font-size:0!important;color:#FFF6EE;text-align:center;" +
  "font-family:'Trebuchet MS','Segoe UI',sans-serif}" +
  ROOT + " " + sel + "::before{content:'" + before + "';font-size:19px;letter-spacing:1.6px;" +
  "text-transform:uppercase;color:#F9E4E9;text-shadow:0 2px 8px rgba(42,27,23,.85)}" +
  ROOT + " " + sel + "::after{content:" + BADGE_URL + ";display:block;width:170px;" +
  "height:13px;margin:4px auto 0}";

const saweria = {
  "saweria-top-donator": sawShell("padding:18px 16px;") + KEYS + filmstrip(ROOT)
    + sawTitleBadge(".chakra-heading", "Moo Cherry \u00B7 Top Donator")
    + ROOT + " .css-9jay18{display:grid!important;grid-template-columns:30px minmax(0,1fr) auto;" +
    "align-items:center;gap:8px;margin:5px 10px!important;padding:9px 12px;" +
    "border:1px solid rgba(242,183,198,.18)!important;border-radius:9px;" +
    "background:rgba(42,27,23,.66)!important;opacity:0;animation:skw-row .45s ease forwards}" +
    [1, 2, 3, 4, 5, 6].map(i => ROOT + ` .css-9jay18:nth-of-type(${i}){animation-delay:${(i * .12).toFixed(2)}s}`).join("") +
    ROOT + " .css-9jay18 p{margin:0!important;color:#FFF6EE!important;" +
    "font-family:'Trebuchet MS','Segoe UI',sans-serif!important}" +
    ROOT + " .css-9jay18 .css-1vjv6qg{color:#F9E4E9!important;font-size:14px!important;" +
    "font-weight:900!important;text-align:center}" +
    ROOT + " .css-9jay18 .css-jd1xht{color:#FFF6EE!important;font-size:14px!important}" +
    ROOT + " .css-9jay18 .css-jd1xht:last-child{color:#F9E4E9!important;font-weight:800!important;" +
    "text-align:right;white-space:nowrap}" +
    ROOT + " .css-9jay18:first-of-type{border-color:rgba(246,231,184,.55)!important;" +
    "box-shadow:0 0 12px rgba(231,152,174,.45)!important}" +
    ROOT + " .css-9jay18:first-of-type .css-jd1xht{font-weight:800!important;" +
    "text-shadow:0 0 9px rgba(231,152,174,.5)!important;animation:skw-champ 2s ease-in-out 1.6s infinite}",

  "saweria-milestone": sawShell("padding:18px 16px;") + KEYS + filmstrip(ROOT) +
    ROOT + " .css-1fezxbg{margin:0 0 12px;color:#FFF6EE;" +
    "font:800 19px 'Trebuchet MS','Segoe UI',sans-serif;text-align:center;letter-spacing:1.5px;" +
    "text-transform:uppercase;text-shadow:0 2px 8px rgba(42,27,23,.85)}" +
    ROOT + " .css-1fezxbg::after{content:" + BADGE_URL + ";display:block;width:170px;" +
    "height:13px;margin:4px auto 0}" +
    ROOT + " .css-10tp7sg{position:relative;height:14px;overflow:hidden;margin:10px 0 12px;" +
    "border:1px solid rgba(242,183,198,.3);border-radius:999px;background:rgba(42,27,23,.5)}" +
    ROOT + " .css-10tp7sg::after{content:'';position:absolute;z-index:3;top:0;bottom:0;" +
    "left:-45%;width:42%;background:linear-gradient(90deg,transparent,#FFF6EE,transparent);" +
    "opacity:.6;animation:skw-sweep 2.6s ease-in-out infinite;pointer-events:none}" +
    ROOT + " .css-1o6ispf{height:100%!important;border-radius:inherit!important;" +
    "background:linear-gradient(90deg,#E798AE,#F6E7B8,#F2B7C6)!important;" +
    "box-shadow:0 0 12px rgba(231,152,174,.6);animation:skw-fill 2.8s ease-in-out infinite}" +
    ROOT + " .css-17fmv7x{margin-top:11px;text-align:center;color:#F9E4E9;" +
    "font:800 17px 'Trebuchet MS','Segoe UI',sans-serif;text-shadow:0 2px 8px rgba(42,27,23,.85)}",

  "saweria-subathon": sawShell("padding:18px 16px;") + KEYS + filmstrip(ROOT) +
    ROOT + " .css-1gz06j0 .chakra-text{margin:0;color:#FFF6EE;" +
    "font:800 19px 'Trebuchet MS','Segoe UI',sans-serif;text-align:center;letter-spacing:1.5px;" +
    "text-transform:uppercase;text-shadow:0 2px 8px rgba(42,27,23,.85)}" +
    ROOT + " .css-1gz06j0 .chakra-text::after{content:" + BADGE_URL + ";display:block;" +
    "width:170px;height:13px;margin:4px auto 0}" +
    ROOT + " .css-1qij1kt{margin-top:14px;text-align:center;color:#FFF6EE;" +
    "font:900 46px 'Trebuchet MS','Segoe UI',sans-serif;letter-spacing:2px;" +
    "text-shadow:0 0 14px rgba(231,152,174,.55);animation:skw-glow 3.4s ease-in-out infinite}",
};

const SAW_MS = sawShell("") + KEYS + filmstrip(ROOT) +
  ROOT + ".hide," + ROOT + " .hide{display:none!important;opacity:0!important;visibility:hidden!important}" +
  ROOT + " > *{position:relative;z-index:3;color:#FFF6EE}" +
  ROOT + " > div:last-child{background:rgba(42,27,23,.66)!important;color:#FFF6EE!important;" +
  "font-family:'Trebuchet MS','Segoe UI',sans-serif!important;border:1px solid rgba(246,231,184,.45);" +
  "border-radius:12px;padding:10px 16px;box-shadow:0 10px 30px rgba(42,27,23,.55)," +
  "inset 0 1px 0 rgba(255,255,255,.08)}" +
  ROOT + " > div:last-child > div{color:#FFF6EE!important;" +
  "font-family:'Trebuchet MS','Segoe UI',sans-serif!important;font-size:clamp(20px,4.6vw,30px)!important;" +
  "line-height:1.25!important}" +
  ROOT + " > div:last-child > div > div.chakra-stack{color:#FFF6EE!important;align-items:center}" +
  '#__next [role="progressbar"]{height:10px!important;border-radius:999px!important;' +
  'overflow:hidden!important;background:rgba(42,27,23,.7)!important;' +
  'border:1px solid rgba(242,183,198,.28)!important}' +
  '#__next [role="progressbar"] > div{background:linear-gradient(90deg,#E798AE,#F6E7B8)!important;' +
  "border-radius:999px!important;box-shadow:0 0 10px rgba(231,152,174,.6)!important;" +
  "animation:skw-fill 2.8s ease-in-out infinite}" +
  ROOT + " .media-message{display:block;max-width:92%;margin:6px auto 0;color:#F9E4E9;" +
  "font:italic 600 15px 'Trebuchet MS','Segoe UI',sans-serif;text-align:center}";

saweria["saweria-mediashare"] = SAW_MS;
saweria["saweria-mediashare-video"] = SAW_MS +
  "#__next .chakra-aspect-ratio{width:min(880px,96%,calc((100vh - 215px) * 16 / 9))!important;" +
  "margin:0 auto;border:1px solid rgba(246,231,184,.5);border-radius:12px;overflow:hidden;" +
  "box-shadow:0 12px 30px rgba(42,27,23,.6)}" +
  "#__next .chakra-aspect-ratio > div,#__next .chakra-aspect-ratio video," +
  "#__next .chakra-aspect-ratio iframe{width:100%!important;height:auto!important;aspect-ratio:16/9}" +
  "@media(max-height:260px){#__next > div{padding:10px!important}" +
  "#__next .chakra-aspect-ratio{width:min(420px,94%)!important}}";

// ================================================================= tulis file
const files = { ...sociabuzz };
for (const [name, text] of Object.entries(saweria)) files[name] = text;

// alert
for (const [slug, who, tag] of [
  ["sociabuzz", "{supporter}", '<div class="sk-tag">{from_text}</div>'],
  ["saweria", "{donator}", ""],
]) {
  const html = alertHtml(who, tag);
  if (html.includes("\n") || html.includes("<style") || html.includes('style="'))
    throw new Error("alert html tidak boleh kilau style/multiline");
  fs.writeFileSync(path.join(BASE, `${slug}-alert.html`), html);
  fs.writeFileSync(path.join(BASE, `${slug}-alert.css`), ALERT_CSS);
  const cssLen = Buffer.byteLength(ALERT_CSS);
  if (cssLen > 5120) throw new Error(`alert CSS ${cssLen} > 5120 byte`);
  console.log(`alert  ${slug}-alert.html + .css  (${cssLen} byte CSS)`);
}

{
  const open = (ALERT_CSS.match(/\{/g) || []).length, close = (ALERT_CSS.match(/\}/g) || []).length;
  if (open !== close) throw new Error("alert kurung tidak balans");
}

const obsScopes = [".w-top ", ".w-queue ", ".w-mile ", ".w-sub "];
for (const [name, text] of Object.entries(files)) {
  const open = (text.match(/\{/g) || []).length, close = (text.match(/\}/g) || []).length;
  if (open !== close) throw new Error(`${name}: kurung tidak balans`);
  const head = `/* Moo Choco Cherry - ${name} */\n`;
  fs.writeFileSync(path.join(DST, name + ".css"), head + text);
  let obs = text;
  if (name.startsWith("sociabuzz-")) {
    for (const s of obsScopes) obs = obs.split(s).join("");
    const o = (obs.match(/\{/g) || []).length, c = (obs.match(/\}/g) || []).length;
    if (o !== c) throw new Error(`${name}-obs: kurung tidak balans`);
    fs.writeFileSync(path.join(DST, name + "-obs.css"),
      `/* Moo Choco Cherry - ${name} (varian OBS, tanpa scope .w-xx) */\n` + obs);
  } else {
    fs.writeFileSync(path.join(DST, name + "-obs.css"),
      `/* Moo Choco Cherry - ${name} (varian OBS) */\n` + text);
  }
  console.log("widget", name, Buffer.byteLength(text), "byte");
}

const widgetList = fs.readdirSync(DST).filter(f => f.endsWith(".css"));
if (widgetList.length < 18) throw new Error("widget kurang dari 18 file: " + widgetList.length);

// ================================================================= PREVIEW
const dummy = (t) => t
  .replace("{amount}", "IDR 1.000.000")
  .replace("{message}", "Moo! Makasih banyak dukungannya, sampai jumpa di stream berikutnya!")
  .replace("{supporter}", "AuliaBunga").replace("{from_text}", "dari Sociabuzz")
  .replace("{donator}", "MasAjiSquad");

const widgetIframe = (name, inner, cls = "") => {
  const css = fs.readFileSync(path.join(DST, name + ".css"), "utf8")
    .replace(/(?:^|(?<=\n))body\{[^}]*\}/, "");
  return `<div class="widget-box ${cls}"><h3>${name.replace(/^[a-z]+?-.+?-(.*)/, "$1").replace(/-/g, " ").toUpperCase()}</h3>` +
    `<iframe srcdoc="&lt;style>${css.replace(/"/g, "'")}&lt;/style>${inner}"></iframe></div>`;
};

const mock = {
  top: "<div class='w-top'><div class='card'><div class='card-header'><h4>Top Donator</h4></div>" +
    "<table class='show_donate'><tr><td>1</td><td><span class='text-limit'>AuliaBunga</span></td>" +
    "<td><span class='text-limit-r'>Rp 500.000</span></td></tr>" +
    "<tr><td>2</td><td><span class='text-limit'>MasAjiSquad</span></td>" +
    "<td><span class='text-limit-r'>Rp 250.000</span></td></tr>" +
    "<tr><td>3</td><td><span class='empty'>moo.. menunggu donatur berikutnya</span></td></tr></table></div></div>",
  queue: "<div class='w-queue'><div class='card'><div class='card-header'><h4>Queue</h4></div>" +
    "<table class='show_donate'><tr><td>1</td><td><span class='text-limit'>User123</span></td></tr>" +
    "<tr><td>2</td><td><span class='text-limit'>BungaMekar</span></td></tr></table></div></div>",
  mile: "<div class='w-mile'><div class='card'><div class='card-header'><h4>Target Donasi</h4></div>" +
    "<div class='card-body'><div class='progress'><div class='progress-bar' style='width:65%'></div></div>" +
    "<div class='center_progress'><h4>Rp 650.000 / Rp 1.000.000</h4></div></div></div></div>",
  sub: "<div class='w-sub'><div class='subathon-container'>" +
    "<div class='sub_judul'><strong>Subathon Timer</strong></div>" +
    "<div class='sub_timer'><span>02</span><span>34</span><span>56</span></div></div></div>",
  run: "<div class='custom-font'><marquee scrollamount='5'>" +
    "<strong>\u2665 MOO CHERRY</strong> AuliaBunga Rp 500.000 &middot; MasAjiSquad Rp 250.000</marquee></div>",
  ms: "<div id='ms_container'><div class='wrapper'><div class='media-container'><div class='media-main'>" +
    "&#9834; Live Song</div><div class='loadingbar'></div></div>" +
    "<div class='style-1 text-container'><div class='title'><span id='sender'>AuliaBunga</span>" +
    "<span class='dari'>dari</span><span id='nominal'>Rp 50.000</span></div>" +
    "<div id='message'>Request lagu untuk stream malam ini</div></div></div></div>",
  swTop: "<div class='sw-root'><div id='__next'><div><h2 class='chakra-heading'>Top Donator</h2>" +
    "<div class='css-9jay18'><p class='css-1vjv6qg'>1</p><p class='css-jd1xht'>MasAjiSquad</p>" +
    "<p class='css-jd1xht'>Rp 750.000</p></div>" +
    "<div class='css-9jay18'><p class='css-1vjv6qg'>2</p><p class='css-jd1xht'>AuliaBunga</p>" +
    "<p class='css-jd1xht'>Rp 420.000</p></div>" +
    "<div class='css-9jay18'><p class='css-1vjv6qg'>3</p><p class='css-jd1xht'>MooFan</p>" +
    "<p class='css-jd1xht'>Rp 100.000</p></div></div></div></div>",
  swMile: "<div class='sw-root'><div id='__next'><div><h2 class='css-1fezxbg'>Target Donasi</h2>" +
    "<div class='css-10tp7sg'><div class='css-1o6ispf' style='width:75%'></div></div>" +
    "<div class='css-17fmv7x'>Rp 750.000 / Rp 1.000.000</div></div></div></div>",
  swSub: "<div class='sw-root'><div id='__next'><div><div class='css-1gz06j0'>" +
    "<span class='chakra-text'>Subathon</span></div>" +
    "<div class='css-1qij1kt'>01:45:22</div></div></div></div>",
  swMs: "<div class='sw-root'><div id='__next'><div>" +
    "<div class='media-message'>Requested by MasAjiSquad</div>" +
    "<div><div class='chakra-stack'>MasAjiSquad</div>MediaShare aktif</div>" +
    "<div role='progressbar'><div style='width:52%'></div></div></div></div></div>",
};

const PREVIEW = `<!doctype html><html lang="id"><head><meta charset="utf-8">` +
  `<meta name="viewport" content="width=device-width,initial-scale=1"><title>${TITLE} — Preview</title><style>` +
  `html,body{margin:0;padding:0;background:#241713;color:#FFF6EE;font-family:'Trebuchet MS','Segoe UI',sans-serif}` +
  `body{padding:24px 16px 60px}h1{text-align:center;margin:0 0 6px;font-size:28px;color:#F9E4E9}` +
  `.sub{text-align:center;color:#F3AFBD;font-size:13px;margin:0 0 28px}` +
  `.section{margin:0 auto 32px;max-width:1040px}` +
  `.section h2{font-size:14px;text-transform:uppercase;letter-spacing:1.4px;color:#E798AE;margin:0 0 10px;border-left:3px solid #E798AE;padding-left:10px}` +
  `.alert-wrap{display:flex;flex-wrap:wrap;gap:18px;justify-content:center}` +
  `.alert-box{flex:1 1 420px;min-width:0;max-width:760px}` +
  `.widget-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px}` +
  `.widget-box{background:rgba(110,75,66,.25);border:1px solid rgba(242,183,198,.25);border-radius:12px;padding:14px}` +
  `.widget-box h3{margin:0 0 8px;font-size:11px;letter-spacing:1.2px;color:#F9E4E9}` +
  `.widget-box iframe{width:100%;height:230px;border:0;border-radius:8px;background:transparent}` +
  `.widget-box.running iframe{height:64px}.widget-box.mediashare iframe{height:280px}` +
  `pre{background:#241713;border:1px solid rgba(242,183,198,.3);border-radius:8px;padding:12px;` +
  `font-size:11px;overflow:auto;white-space:pre-wrap;word-break:break-all;color:#F9E4E9}` +
  ALERT_CSS + `</style></head><body><h1>${TITLE}</h1>` +
  `<p class="sub">Preview lokal — theme alert Sociabuzz + Saweria</p>` +
  `<div class="section"><h2>Alert Card</h2><div class="alert-wrap">` +
  `<div class="alert-box"><h3 style="font-size:12px;color:#F3AFBD">Sociabuzz</h3>${dummy(alertHtml("{supporter}", '<div class="sk-tag">dari Sociabuzz</div>'))}</div>` +
  `<div class="alert-box"><h3 style="font-size:12px;color:#F3AFBD">Saweria</h3>${dummy(alertHtml("{donator}", ""))}</div>` +
  `</div></div>` +
  `<div class="section"><h2>Widget Sociabuzz</h2><div class="widget-grid">` +
  widgetIframe("sociabuzz-top-donator", mock.top) + widgetIframe("sociabuzz-queue", mock.queue) +
  widgetIframe("sociabuzz-milestone", mock.mile) + widgetIframe("sociabuzz-subathon", mock.sub) +
  widgetIframe("sociabuzz-top-donator-runningtext", mock.run, "running") +
  widgetIframe("sociabuzz-mediashare", mock.ms, "mediashare") +
  `</div></div>` +
  `<div class="section"><h2>Widget Saweria</h2><div class="widget-grid">` +
  widgetIframe("saweria-top-donator", mock.swTop) + widgetIframe("saweria-milestone", mock.swMile) +
  widgetIframe("saweria-subathon", mock.swSub) + widgetIframe("saweria-mediashare", mock.swMs, "mediashare") +
  `</div></div>` +
  `<div class="section"><h2>File Produksi</h2><pre>sociabuzz-alert.html</pre><pre>` +
  fs.readFileSync(path.join(BASE, "sociabuzz-alert.html"), "utf8") + `</pre><pre>` +
  fs.readFileSync(path.join(BASE, "sociabuzz-alert.css"), "utf8") + `</pre></div></body></html>`;

fs.writeFileSync(path.join(BASE, "preview-moo-cherry.html"), PREVIEW);
console.log("preview ditulis: preview-moo-cherry.html", Buffer.byteLength(PREVIEW), "byte");
