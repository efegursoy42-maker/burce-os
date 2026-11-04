/* Pick Your Toxic — mini site. İçerik bu dosyanın başındaki CATS / EVENTS / QUIZ listelerinde. */
(() => {
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const hearts = n => "♡".repeat(n);

/* ---------- İÇERİK ---------- */
const CATS = [
  { id: "sweet", no: "01", name: "Sweet Talkers", char: "Childish Eros", img: "eros", panel: "p1_sweet",
    bg: "#E07D91", ink: "#A1171F", hi: "#ff9fb4",
    tag: "Dangerously sweet. Flirty & charming.", line: "Sweet, emotional and dangerously charming.",
    drinks: [
      ["Cupid's Mistake", "Gin, Strawberry, Lemon, Foam", "Sweet enough to trust.", 14, 2],
      ["Love Letter", "Vodka, Lychee, Rose, Lime", "Leaves a mark.", 13, 3],
      ["Pink Lies", "Rum, Raspberry, Vanilla, Lemon", "Not as innocent.", 12, 3] ] },
  { id: "red", no: "02", name: "Red Flags", char: "Gabriela Vixen", img: "vixen", panel: "p2_red",
    bg: "#E0480E", ink: "#3a0a04", hi: "#ff7a45",
    tag: "Hot, spicy & impulsive. You know it's wrong.", line: "Bold, spicy and impossible to ignore.",
    drinks: [
      ["Devil's Kiss", "Tequila, Chili, Blood Orange, Lime", "Bad ideas taste better after midnight.", 16, 4],
      ["Wicked Game", "Mezcal, Pineapple, Lime, Agave", "Plays with fire.", 15, 4],
      ["Spicy Ex", "Bourbon, Chili, Honey, Lemon", "Better than your ex.", 14, 3] ] },
  { id: "green", no: "03", name: "Green Envy", char: "Green Envy", img: "envy", panel: "p3_green",
    bg: "#AA9518", ink: "#242F15", hi: "#d6c234",
    tag: "Herbal, bitter & a little jealous.", line: "Funny, greedy and always wanting more.",
    drinks: [
      ["Green Envy", "Gin, Basil, Absinthe, Lime", "Gets jealous when ignored.", 14, 2],
      ["Bitter Truth", "Campari, Gin, Vermouth, Orange", "The truth always bites.", 13, 3],
      ["Jealousy", "Whiskey, Mint, Lemon, Chartreuse", "The green monster lives here.", 15, 4] ] },
  { id: "midnight", no: "00", name: "After Midnight", char: "Violetta Vice", img: "violetta", panel: "p4_midnight",
    bg: "#10110E", ink: "#C25D8A", hi: "#e27aaa",
    tag: "Strong, bold & not for everyone.", line: "Elegant, mysterious and slightly addictive.",
    drinks: [
      ["Soft Poison", "Vodka, Lavender, Lemon, Violet", "Tastes harmless. Hits different.", 16, 4],
      ["Blackout", "Rum, Coffee, Cacao, Americano", "One more and it's gone.", 17, 4],
      ["Last Call", "Bourbon, Amaro, Maple, Bitters", "For beautiful disasters.", 18, 5] ] }
];

const EVENTS = [
  { day: "Every Wednesday", t: "Sweet Talk Wednesday", d: "2-for-1 Sweet Talkers before 21.00. Flirting encouraged, commitment not.", c: 0 },
  { day: "Every Friday", t: "Red Flags Night", d: "Live DJ, spicy shots and every red flag you swore you'd ignore.", c: 1 },
  { day: "Every Saturday", t: "Bad Decisions Karaoke", d: "Sing it like they're listening. They're not.", c: 2 },
  { day: "Last Saturday of the month", t: "After Midnight Session", d: "Lights go down at 00.00. Only Violetta's menu is served till 04.00.", c: 3 }
];

/* Her şık bir kategoriye puan verir (0 sweet, 1 red, 2 green, 3 midnight) */
const QUIZ = [
  { q: "Your ideal Friday night?", a: [
    ["Slow songs and someone who texts back", 0], ["Loud music and louder decisions", 1],
    ["Checking your ex's stories. Twice.", 2], ["Last one standing at 4 AM", 3] ] },
  { q: "Pick the red flag you secretly like", a: [
    ["Too many good-morning texts", 0], ["“I'm not like other guys”", 1],
    ["Checks your phone “by accident”", 2], ["Only texts after midnight", 3] ] },
  { q: "And your flavour?", a: [
    ["Fruity & sweet", 0], ["Hot & spicy", 1], ["Herbal & bitter", 2], ["Dark & strong", 3] ] }
];

/* ---------- KAĞIT SESİ (BurçeOS'ta ses açıksa) ---------- */
let ac;
function paper() {
  try { if (localStorage.getItem("bos-sound") !== "true") return; } catch { return; }
  ac = ac || new (window.AudioContext || window.webkitAudioContext)();
  const len = ac.sampleRate * .18, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
  const src = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  f.type = "bandpass"; f.frequency.value = 2400; f.Q.value = .7; g.gain.value = .18;
  src.buffer = buf; src.connect(f).connect(g).connect(ac.destination); src.start();
}

/* ---------- NAV ---------- */
$("#burger").onclick = () => $("#navLinks").classList.toggle("on");
$$("#navLinks a").forEach(a => a.addEventListener("click", () => $("#navLinks").classList.remove("on")));

/* ---------- CHOOSE YOUR TOXIC ---------- */
let curCat = 0;
const order = [1, 0, 2, 3]; // mockup'taki sıra: Red Flags, Sweet Talkers, Green Envy, After Midnight
$("#chars").innerHTML = order.map(i => `<button class="char" role="tab" data-c="${i}"><img src="img/char_${CATS[i].img}.webp" alt="${CATS[i].char}" loading="lazy"><span>${CATS[i].name}</span></button>`).join("");
$("#dots").innerHTML = order.map(() => "<i></i>").join("");
function pickCat(i, scroll) {
  curCat = i; const c = CATS[i], sec = $("#toxic");
  sec.style.setProperty("--bg", c.bg); sec.style.setProperty("--ink", c.ink);
  $$(".char").forEach(b => b.classList.toggle("on", +b.dataset.c === i));
  $$("#dots i").forEach((d, k) => d.classList.toggle("on", order[k] === i));
  $("#cat").innerHTML = `
    <div><h3>${c.name}</h3><p class="tag">${c.tag}</p><p class="who">${c.char} — ${c.line}</p>
      <button class="btn-ink" data-panel="${i}"><span>Open this page of the menu →</span></button></div>
    <div class="drinks">${c.drinks.map(d => `<div class="drink"><b>${d[0]}</b><span class="pct">${d[3]}%<small>${hearts(d[4])}</small></span><span class="ing">${d[1]}</span><em>${d[2]}</em></div>`).join("")}</div>`;
  $("#cat [data-panel]").onclick = () => openMenu(i + 1);
  if (scroll) $(".char.on").scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}
$$(".char").forEach(b => b.onclick = () => pickCat(+b.dataset.c, true));
// mobil kaydırmada ortadaki karakteri seç
let st; $("#chars").addEventListener("scroll", () => { clearTimeout(st); st = setTimeout(() => {
  if (innerWidth > 760) return;
  const box = $("#chars").getBoundingClientRect(), mid = box.left + box.width / 2;
  let best, bd = 1e9; $$(".char").forEach(b => { const r = b.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = b; } });
  if (best && +best.dataset.c !== curCat) pickCat(+best.dataset.c, false);
}, 120); }, { passive: true });
pickCat(1);

/* ---------- QUIZ ---------- */
let qi = 0, score = [0, 0, 0, 0], picks = [];
function drawQ() {
  const box = $("#quizBox");
  if (qi < QUIZ.length) {
    const q = QUIZ[qi];
    box.innerHTML = `<div class="qstep">Question ${qi + 1} / ${QUIZ.length}</div><div class="qq">${q.q}</div>
      <div class="opts">${q.a.map((a, k) => `<button class="opt" data-k="${k}">${a[0]}</button>`).join("")}</div>`;
    $$(".opt", box).forEach(b => b.onclick = () => { const a = q.a[+b.dataset.k]; score[a[1]]++; picks.push(a[1]); qi++; drawQ(); });
    return;
  }
  const max = Math.max(...score);
  const winners = score.map((s, i) => s === max ? i : -1).filter(i => i >= 0);
  const ci = winners.includes(picks[picks.length - 1]) ? picks[picks.length - 1] : winners[0];
  const c = CATS[ci], d = c.drinks[(picks[0] + picks[1] * 2) % 3];
  box.innerHTML = `<div class="result" style="--rbg:${c.bg};--rink:${c.ink === "#3a0a04" ? "#fff" : c.ink}">
    <img src="img/char_${c.img}.webp" alt="${c.char}">
    <div><div class="lbl">Tonight you're a ${c.name.replace(/s$/, "")} ✦ ${c.char} approves</div>
      <h3>${d[0]}</h3><p>${d[1]} · ${d[3]}% · ${hearts(d[4])}</p><em>${d[2]}</em>
      <div class="row"><button data-again>Try again</button><button data-see>See it on the menu →</button></div></div></div>`;
  $("[data-again]", box).onclick = () => { qi = 0; score = [0, 0, 0, 0]; picks = []; drawQ(); };
  $("[data-see]", box).onclick = () => openMenu(ci + 1);
}
drawQ();

/* ---------- EVENTS ---------- */
$("#evList").innerHTML = EVENTS.map(e => { const c = CATS[e.c];
  return `<article class="ev" style="--ebg:${c.bg};--eink:${e.c === 1 ? "#fff" : c.ink}"><span class="day">${e.day}</span><h3>${e.t}</h3><p>${e.d}</p><img src="img/char_${c.img}.webp" alt="" loading="lazy"></article>`; }).join("");

/* ================= KATLANAN MENÜ ================= */
const ov = $("#menuOv"), fold = $("#fold");
const LEAVES = ["p0_cover", ...CATS.map(c => c.panel)];
fold.innerHTML = LEAVES.map((p, i) => `<div class="leaf" style="--i:${i}" data-i="${i}"><img src="img/${p}.webp" alt="${i ? CATS[i - 1].name : "Menu cover"}" draggable="false"></div>`).join("");
const leaves = $$(".leaf", fold);
const mobile = () => innerWidth <= 760;
let state = "closed", page = 0, timers = [];

function size() {
  const r = 2000 / 630;
  let h, w;
  if (mobile()) { h = Math.min(innerHeight * .62, (innerWidth - 60) * r); }
  else { h = Math.min(innerHeight * .8, (innerWidth * .9) / 5 * r); }
  w = h / r;
  fold.style.setProperty("--h", h + "px"); fold.style.setProperty("--w", w + "px");
}
addEventListener("resize", () => { if (!ov.hidden) size(); });

function openMenu(target) {        // target: açılınca detayı gösterilecek panel (1-4)
  size(); ov.hidden = false; document.body.style.overflow = "hidden";
  reset();
  $("#menuHint").style.opacity = 1;
  $("#menuHint").textContent = mobile() ? "Tap the menu to open it" : "Click the menu to open it";
  if (target) setTimeout(() => unfold(() => showDetail(target)), 350);
}
function reset() {
  timers.forEach(clearTimeout); timers = [];
  state = "closed"; page = 0;
  fold.classList.add("closed"); fold.classList.remove("ready");
  leaves.forEach(l => l.classList.remove("open", "turned"));
  $("#detail").hidden = true; drawBook();
}
function unfold(done) {
  if (state !== "closed") return done && done();
  state = "opening"; fold.classList.remove("closed"); $("#menuHint").style.opacity = 0;
  if (mobile()) { state = "open"; fold.classList.add("ready"); turn(1); done && done(); return; }
  leaves.slice(1).forEach((l, k) => timers.push(setTimeout(() => { l.classList.add("open"); paper(); }, 120 + k * 260)));
  timers.push(setTimeout(() => { state = "open"; fold.classList.add("ready"); done && done(); }, 120 + 4 * 260 + 500));
}
function closeMenu() {
  $("#detail").hidden = true;
  if (mobile() || state === "closed") return hide();
  state = "closing"; fold.classList.remove("ready");
  leaves.slice(1).reverse().forEach((l, k) => timers.push(setTimeout(() => { l.classList.remove("open"); if (k % 2 === 0) paper(); }, k * 160)));
  timers.push(setTimeout(hide, 4 * 160 + 650));
}
function hide() { ov.hidden = true; document.body.style.overflow = ""; reset(); if (location.hash === "#menu") history.replaceState(null, "", location.pathname); }

fold.addEventListener("click", e => {
  const l = e.target.closest(".leaf"); if (!l) return;
  const i = +l.dataset.i;
  if (state === "closed") return unfold();
  if (mobile()) { const r = fold.getBoundingClientRect(); turn(e.clientX - r.left < r.width / 3 ? page - 1 : page + 1); return; }
  if (state === "open" && i > 0) showDetail(i);
});
$("#menuClose").onclick = closeMenu;
addEventListener("keydown", e => {
  if (ov.hidden) return;
  if (e.key === "Escape") { if (!$("#detail").hidden) $("#detail").hidden = true; else closeMenu(); }
  if (!$("#detail").hidden && e.key === "ArrowRight") stepDetail(1);
  if (!$("#detail").hidden && e.key === "ArrowLeft") stepDetail(-1);
});

/* mobil: kitap gibi sayfa çevirme */
function turn(p) {
  p = Math.max(0, Math.min(LEAVES.length - 1, p));
  if (p === page) return;
  leaves.forEach((l, k) => l.classList.toggle("turned", k < p));
  page = p; paper(); drawBook();
  if (p === 0) { fold.classList.add("closed"); state = "closed"; }
}
function drawBook() {
  $("#bkPage").textContent = `${page + 1} / ${LEAVES.length}`;
  const t = $("#bookTxt");
  if (page === 0) { t.innerHTML = `<p class="tag">Choose wisely.</p>`; return; }
  const c = CATS[page - 1];
  t.style.setProperty("--dink", c.hi);
  t.innerHTML = `<p class="tag">${c.tag}</p><ul>${c.drinks.map(d => `<li><b>${d[0]}</b> · ${d[3]}% ${hearts(d[4])}<br>${d[1]} — <i>${d[2]}</i></li>`).join("")}</ul>`;
}
$("#bkPrev").onclick = () => turn(page - 1);
$("#bkNext").onclick = () => { if (state === "closed") unfold(); else turn(page + 1); };
let tx = 0;
fold.addEventListener("touchstart", e => tx = e.touches[0].clientX, { passive: true });
fold.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 40) { if (state === "closed" && d < 0) unfold(); else turn(page + (d < 0 ? 1 : -1)); } });

/* detay */
let di = 1;
function showDetail(i) {
  if (mobile()) { turn(i); return; }
  di = i; const c = CATS[i - 1];
  $("#dImg").src = `img/${c.panel}.webp`; $("#dImg").alt = c.name;
  const inf = $("#dInfo"); inf.style.setProperty("--dink", c.hi);
  inf.innerHTML = `<div class="no">${c.no} · ${c.char}</div><h3>${c.name}</h3><p class="tag">${c.tag}</p>
    <ul>${c.drinks.map(d => `<li><b>${d[0]}</b><span>${d[1]} · ${d[3]}% ${hearts(d[4])}</span><em>${d[2]}</em></li>`).join("")}</ul>`;
  const dt = $("#detail"); dt.hidden = false;
  // animasyonu yeniden başlat
  [$("#dImg"), inf].forEach(el => { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; });
}
const stepDetail = d => { paper(); showDetail(((di - 1 + d + 4) % 4) + 1); };
$("#dPrev").onclick = () => stepDetail(-1);
$("#dNext").onclick = () => stepDetail(1);
$("#dBack").onclick = () => $("#detail").hidden = true;

$$("[data-open-menu]").forEach(b => b.addEventListener("click", () => { $("#navLinks").classList.remove("on"); openMenu(); }));

/* BurçeOS'tan #menu ile açılırsa menüyü direkt göster */
if (location.hash === "#menu") setTimeout(() => openMenu(), 200);
})();
