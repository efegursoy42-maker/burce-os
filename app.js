/* BurçeOS v2 — pencere yöneticisi + kişiselleştirme. İçerik için data.js'i düzenle. */
(() => {
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const IMG = (n, size = "full") => `assets/img/${size}/${n}.webp`;
const isMobile = () => matchMedia("(max-width:760px)").matches;
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
                set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
                del(k) { try { localStorage.removeItem(k); } catch {} } };
const root = document.documentElement;

/* ================= DİL ================= */
let lang = store.get("bos-lang", (navigator.language || "en").toLowerCase().startsWith("tr") ? "tr" : "en");
const L = v => (v && typeof v === "object") ? (v[lang] ?? v.en) : v;
const T = {
  boot: { en: "loading creativity…", tr: "yaratıcılık yükleniyor…" },
  skip: { en: "click to skip", tr: "geçmek için tıkla" },
  stickyT: { en: "Open for freelance ✿", tr: "Freelance işlere açığım ✿" },
  stickyB: { en: "Branding · social media · content. Say hi →", tr: "Marka · sosyal medya · içerik. Yaz bana →" },
  sign: { en: "Graphic Designer · Izmir", tr: "Grafik Tasarımcı · İzmir" },
  role: { en: "Graphic Designer", tr: "Grafik Tasarımcı" },
  trash: { en: "Recycle Bin", tr: "Geri Dönüşüm Kutusu" },
  trashEmpty: { en: "The bin is empty.<br>Bad ideas don't stay here ✿", tr: "Çöp kutusu boş.<br>Kötü fikirler burada kalmaz ✿" },
  items: { en: n => `${n} items`, tr: n => `${n} öğe` },
  scenes: { en: n => `${n} scenes · click to enlarge`, tr: n => `${n} sahne · tıkla ve büyüt` },
  menu: { en: ["File", "Edit", "View"], tr: ["Dosya", "Düzen", "Görünüm"] },
  min: { en: "Minimize", tr: "Küçült" }, max: { en: "Maximize", tr: "Büyüt" }, close: { en: "Close", tr: "Kapat" },
  exp: { en: "EXPERIENCE", tr: "DENEYİM" }, edu: { en: "EDUCATION", tr: "EĞİTİM" },
  skills: { en: "SKILLS", tr: "YETENEKLER" }, langs: { en: "LANGUAGES", tr: "DİLLER" },
  cv: { en: "Download CV", tr: "CV'yi indir" }, contact: { en: "Contact", tr: "İletişim" },
  aboutMe: { en: "About Me", tr: "Hakkımda" },
  personalize: { en: "Personalize", tr: "Kişiselleştir" },
  wpHint: { en: "Choose a wallpaper. Classic ones also switch the windows & taskbar style.",
            tr: "Bir duvar kağıdı seç. Klasik olanlar pencere ve görev çubuğu stilini de değiştirir." },
  wallpaper: { en: "Wallpaper", tr: "Duvar kağıdı" },
  sort: { en: "Sort icons", tr: "İkonları sırala" },
  refresh: { en: "Refresh", tr: "Yenile" },
  soundOn: { en: "Sounds: on", tr: "Sesler: açık" }, soundOff: { en: "Sounds: off", tr: "Sesler: kapalı" },
  toLang: { en: "Türkçe'ye geç", tr: "Switch to English" }
};
const t = (k, ...a) => { const v = L(T[k]); return typeof v === "function" ? v(...a) : v; };

/* ================= SES (varsayılan kapalı) ================= */
let soundOn = store.get("bos-sound", false), ac = null;
function tone(f1, f2, dur, type = "square", vol = .04, delay = 0) {
  if (!soundOn) return;
  ac = ac || new (window.AudioContext || window.webkitAudioContext)();
  const o = ac.createOscillator(), g = ac.createGain(), s = ac.currentTime + delay;
  o.type = type; o.frequency.setValueAtTime(f1, s); o.frequency.exponentialRampToValueAtTime(f2, s + dur);
  g.gain.setValueAtTime(vol, s); g.gain.exponentialRampToValueAtTime(.0001, s + dur);
  o.connect(g).connect(ac.destination); o.start(s); o.stop(s + dur + .02);
}
const sfx = {
  click: () => tone(1400, 900, .035),
  open: () => { tone(520, 700, .07, "triangle", .07); tone(780, 1040, .09, "triangle", .07, .06); },
  close: () => { tone(780, 600, .07, "triangle", .07); tone(520, 380, .09, "triangle", .07, .06); },
  chime: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, f, .25, "sine", .06, i * .09))
};
document.addEventListener("pointerdown", e => { if (e.target.closest("button,a,.icon")) sfx.click(); }, true);

/* ================= İKONLAR ================= */
const theme = () => root.dataset.theme || "burce";
const folderSVG = c => theme() === "burce"
  ? `<svg viewBox="0 0 54 46"><path d="M3 8a4 4 0 0 1 4-4h13l5 5h22a4 4 0 0 1 4 4v3H3z" fill="${c}" opacity=".75"/><rect x="3" y="13" width="48" height="30" rx="4" fill="${c}"/><rect x="3" y="13" width="48" height="5" rx="2" fill="#fff" opacity=".25"/></svg>`
  : `<svg viewBox="0 0 54 46"><defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a3"/><stop offset="1" stop-color="#f6c443"/></linearGradient></defs>
     <path d="M3 9a3 3 0 0 1 3-3h13l4 4h25a3 3 0 0 1 3 3v4H3z" fill="#d99a1e"/><path d="M3 15h48v25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="${theme() === "xp" ? "url(#fg)" : "#f8d16a"}"/>
     ${theme() === "xp" ? `<path d="M3 15h48v4H3z" fill="#fff" opacity=".45"/>` : ""}<rect x="36" y="33" width="11" height="6" rx="1.5" fill="${c}"/></svg>`;
const ICONS = {
  about: () => `<svg viewBox="0 0 54 46"><rect x="10" y="1" width="34" height="44" rx="3" fill="#f6efff"/><path d="M16 12h22M16 19h22M16 26h22M16 33h14" stroke="${theme() === "burce" ? "#922de6" : "#2b6fd6"}" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="38" r="8" fill="${theme() === "burce" ? "#e815b2" : "#2b6fd6"}"/><text x="40" y="42" font-size="11" text-anchor="middle" fill="#fff" font-family="Arial" font-weight="700">i</text></svg>`,
  cv: () => `<svg viewBox="0 0 54 46"><path d="M12 1h22l10 10v34H12z" fill="#fff"/><path d="M34 1v10h10" fill="#d9d4e6"/><rect x="6" y="22" width="30" height="14" rx="2" fill="#e5252a"/><text x="21" y="33" font-size="10" text-anchor="middle" fill="#fff" font-family="Arial" font-weight="700">PDF</text></svg>`,
  toxic: () => `<div class="glyph" style="background:#0b0b0b;color:#ff2e63;font-family:'Bagel Fat One';font-size:13px;line-height:.9;border:2px solid #ff2e63">PICK<br>TOXIC</div>`,
  reshoot: () => `<div class="glyph" style="background:linear-gradient(135deg,#922de6,#e815b2 55%,#ffa42b);color:#fff;font-family:'Bagel Fat One';font-size:28px">R</div>`,
  behance: () => `<div class="glyph" style="background:#1769ff;color:#fff">Bē</div>`,
  linkedin: () => `<div class="glyph" style="background:#0a66c2;color:#fff">in</div>`,
  mail: () => `<svg viewBox="0 0 54 46"><rect x="3" y="7" width="48" height="34" rx="5" fill="${theme() === "burce" ? "#b7f36b" : "#f3f3f3"}"/><path d="M5 10l22 17L49 10" fill="none" stroke="${theme() === "burce" ? "#14061f" : "#2b6fd6"}" stroke-width="3" stroke-linejoin="round"/></svg>`,
  trash: () => theme() === "burce"
    ? `<svg viewBox="0 0 54 46"><path d="M15 12h24l-3 32H18z" fill="#cdb6ff"/><rect x="12" y="7" width="30" height="5" rx="2" fill="#f6efff"/><path d="M22 18v20M27 18v20M32 18v20" stroke="#922de6" stroke-width="2"/></svg>`
    : `<svg viewBox="0 0 54 46"><path d="M14 10h26l-3 34H17z" fill="#dfe8f3" stroke="#7f95ad" stroke-width="1.5"/><ellipse cx="27" cy="10" rx="13" ry="3" fill="#b9c8d8" stroke="#7f95ad" stroke-width="1.5"/><path d="M21 16l1 24M27 16v24M33 16l-1 24" stroke="#9fb1c4" stroke-width="1.5"/></svg>`
};

const DESKTOP = () => [
  { id: "about", name: "About_Me.txt", icon: ICONS.about(), open: openAbout },
  { id: "cv", name: "CV.pdf", icon: ICONS.cv(), href: PROFILE.cv, download: "Burce-Bayar-CV.pdf" },
  ...PROJECTS.map(p => ({ id: p.id, name: p.type === "folder" ? `${p.no} ${p.name}` : p.name,
    icon: p.icon ? ICONS[p.icon]() : folderSVG(p.color), open: () => openProject(p) })),
  { id: "behance", name: "Behance", icon: ICONS.behance(), href: PROFILE.behance },
  { id: "linkedin", name: "LinkedIn", icon: ICONS.linkedin(), href: PROFILE.linkedin },
  { id: "mail", name: "Mail", icon: ICONS.mail(), href: `mailto:${PROFILE.email}` },
  { id: "trash", name: t("trash"), icon: ICONS.trash(), open: openTrash }
];

const iconsEl = $("#icons");
function renderIcons() {
  iconsEl.innerHTML = "";
  DESKTOP().forEach(d => {
    const el = document.createElement(d.href ? "a" : "button");
    el.className = "icon"; el.dataset.id = d.id; el.setAttribute("role", "listitem");
    el.innerHTML = `${d.icon}<span>${d.name}</span>`;
    if (d.href) {
      el.href = d.href;
      if (d.download) el.setAttribute("download", d.download);
      else if (!d.href.startsWith("mailto")) { el.target = "_blank"; el.rel = "noopener"; }
    } else el.addEventListener("click", () => { sfx.open(); d.open(); });
    iconsEl.appendChild(el);
    enableIconDrag(el);
  });
  layoutIcons();
}

/* ---------- İkon yerleşimi + sürükle-bırak (sadece masaüstü) ---------- */
const CELL_W = 100, CELL_H = 108, PAD = 16;
let cells = {};                         // id -> [col,row]
const grid = () => {
  const r = Math.max(1, Math.floor((iconsEl.clientHeight - PAD * 2) / CELL_H));
  const c = Math.max(1, Math.floor((iconsEl.clientWidth - PAD * 2) / CELL_W));
  return { rows: r, cols: c };
};
function layoutIcons() {
  const icons = $$(".icon", iconsEl);
  if (isMobile()) { icons.forEach(i => { i.style.left = i.style.top = ""; }); return; }
  const { rows, cols } = grid(), saved = store.get("bos-icons", {}), used = new Set(); cells = {};
  icons.forEach(i => { const s = saved[i.dataset.id]; if (s) {
    const c = Math.min(s[0], cols - 1), r = Math.min(s[1], rows - 1), k = c + "," + r;
    if (!used.has(k)) { used.add(k); cells[i.dataset.id] = [c, r]; } } });
  let n = 0;
  icons.forEach(i => { if (cells[i.dataset.id]) return;
    let c, r; do { c = Math.floor(n / rows); r = n % rows; n++; } while (used.has(c + "," + r));
    used.add(c + "," + r); cells[i.dataset.id] = [c, r]; });
  icons.forEach(i => { const [c, r] = cells[i.dataset.id];
    i.style.left = PAD + c * CELL_W + "px"; i.style.top = PAD + r * CELL_H + "px"; });
}
function enableIconDrag(el) {
  let sx, sy, ox, oy, moved = false, block = false;
  el.addEventListener("pointerdown", e => {
    if (isMobile() || e.button !== 0) return;
    sx = e.clientX; sy = e.clientY; ox = el.offsetLeft; oy = el.offsetTop; moved = false;
    el.setPointerCapture(e.pointerId);
    el.onpointermove = m => {
      const dx = m.clientX - sx, dy = m.clientY - sy;
      if (!moved && Math.hypot(dx, dy) < 6) return;
      moved = true; el.classList.add("dragging");
      el.style.left = ox + dx + "px"; el.style.top = oy + dy + "px";
    };
    el.onpointerup = () => {
      el.onpointermove = el.onpointerup = null;
      if (!moved) return;
      block = true; el.classList.remove("dragging");
      const { rows, cols } = grid();
      const c = Math.max(0, Math.min(cols - 1, Math.round((el.offsetLeft - PAD) / CELL_W)));
      const r = Math.max(0, Math.min(rows - 1, Math.round((el.offsetTop - PAD) / CELL_H)));
      const other = Object.keys(cells).find(k => k !== el.dataset.id && cells[k][0] === c && cells[k][1] === r);
      if (other) cells[other] = cells[el.dataset.id];         // yer değiştir
      cells[el.dataset.id] = [c, r];
      store.set("bos-icons", cells); layoutIcons();
    };
  });
  el.addEventListener("click", e => { if (block) { e.preventDefault(); e.stopImmediatePropagation(); block = false; } }, true);
}
addEventListener("resize", () => layoutIcons());

/* ================= PENCERE YÖNETİCİSİ ================= */
const wins = new Map(); let z = 10, cascade = 0;
/* build() → { title, color, html, status, bind(el) } — dil değişince tekrar çağrılır */
function createWin(id, build, { w = 860, h = 560 } = {}) {
  if (wins.has(id)) { const o = wins.get(id); o.el.classList.remove("min"); focus(id); return o.el; }
  const el = document.createElement("section");
  el.className = "win"; el.dataset.id = id;
  const dw = innerWidth, dh = innerHeight - 48;
  w = Math.min(w, dw - 40); h = Math.min(h, dh - 40);
  const x = Math.max(10, (dw - w) / 2 - 80 + cascade * 28), y = Math.max(10, (dh - h) / 2 - 40 + cascade * 24);
  cascade = (cascade + 1) % 6;
  Object.assign(el.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
  $("#windows").appendChild(el);

  const task = document.createElement("button");
  task.className = "task";
  task.onclick = () => {
    if (!el.classList.contains("min") && el.classList.contains("active")) minimize(id);
    else { el.classList.remove("min"); focus(id); }
  };
  $("#tasks").appendChild(task);
  el.addEventListener("pointerdown", () => focus(id));

  const o = { el, task, build }; wins.set(id, o);
  paint(id); focus(id);
  if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  return el;
}
function paint(id) {
  const { el, task, build } = wins.get(id), b = build(), m = t("menu");
  el.innerHTML = `
    <header class="titlebar"><i class="dot" style="--c:${b.color}"></i><span class="t">${b.title}</span>
      <div class="tb-btns"><button class="mn" title="${t("min")}"><span>_</span></button><button class="mx" title="${t("max")}"><span>□</span></button><button class="x" title="${t("close")}"><span>✕</span></button></div>
    </header>
    <div class="toolbar"><span>${m[0]}</span><span>${m[1]}</span><span>${m[2]}</span><span class="path">C:\\Burce\\Portfolio\\${b.title}</span></div>
    <div class="wbody">${b.html}</div>
    ${b.status ? `<div class="statusbar">${b.status}</div>` : ""}`;
  task.textContent = b.title;
  $(".x", el).onclick = e => { e.stopPropagation(); close(id); };
  $(".mn", el).onclick = e => { e.stopPropagation(); minimize(id); };
  $(".mx", el).onclick = e => { e.stopPropagation(); el.classList.toggle("max"); };
  $(".titlebar", el).ondblclick = () => el.classList.toggle("max");
  dragWin(el, $(".titlebar", el));
  b.bind && b.bind(el);
}
function focus(id) {
  wins.forEach((o, k) => { o.el.classList.toggle("active", k === id); o.task.classList.toggle("active", k === id); });
  const o = wins.get(id); if (o) o.el.style.zIndex = ++z;
}
function minimize(id) { const o = wins.get(id); o.el.classList.add("min"); o.el.classList.remove("active"); o.task.classList.remove("active"); }
function close(id) {
  const o = wins.get(id); if (!o) return;
  sfx.close(); o.el.remove(); o.task.remove(); wins.delete(id);
  if (location.hash === "#" + id) history.replaceState(null, "", location.pathname);
}
function dragWin(win, handle) {
  handle.addEventListener("pointerdown", e => {
    if (e.target.closest("button") || isMobile() || win.classList.contains("max")) return;
    const sx = e.clientX, sy = e.clientY, ox = win.offsetLeft, oy = win.offsetTop;
    handle.setPointerCapture(e.pointerId);
    handle.onpointermove = m => {
      win.style.left = Math.min(innerWidth - 80, Math.max(-win.offsetWidth + 80, ox + m.clientX - sx)) + "px";
      win.style.top = Math.min(innerHeight - 90, Math.max(0, oy + m.clientY - sy)) + "px";
    };
    handle.onpointerup = () => { handle.onpointermove = null; };
  });
}

/* ================= İÇERİK PENCERELERİ ================= */
function openProject(p) {
  if (p.type === "case") {
    createWin(p.id, () => ({
      title: p.name, color: p.color, status: t("scenes", p.img.length),
      html: `<div class="case-head"><h2>${p.name.replace(/\.(exe|app)$/, "")}</h2><div class="sub">${L(p.subtitle)}</div><p>${L(p.intro)}</p></div>
        <div class="case-stack">${p.img.map((n, i) => `<img src="${IMG(n)}" loading="${i < 2 ? "eager" : "lazy"}" data-i="${i}" alt="${p.name} ${i + 1}">`).join("")}</div>`,
      bind: el => $$(".case-stack img", el).forEach(img => img.onclick = () => lightbox(p, +img.dataset.i))
    }), { w: 1000, h: 680 });
  } else {
    createWin(p.id, () => ({
      title: `${p.no} ${p.name}`, color: p.color, status: t("items", p.img.length),
      html: `<div class="grid">${p.img.map((n, i) => `<button class="thumb" data-i="${i}"><img src="${IMG(n, "thumb")}" loading="lazy" alt="${p.name} ${i + 1}"><small>${p.id}_${String(i + 1).padStart(2, "0")}.jpg</small></button>`).join("")}</div>`,
      bind: el => $$(".thumb", el).forEach(b => b.onclick = () => lightbox(p, +b.dataset.i))
    }), { w: 820, h: 520 });
  }
}
function openAbout() {
  const P = PROFILE;
  createWin("about", () => ({
    title: "About_Me.txt", color: "#b7f36b",
    html: `<div class="about">
      <img class="ava" src="assets/img/avatar.webp" alt="${P.name}">
      <div>
        <h2>${P.name}</h2><div class="role">${L(P.title)} · ${L(P.city)}</div>
        <p>${L(P.bio)}</p>
        <h3>&gt; ${t("exp")}</h3><ul>${P.experience.map(e => `<li><b>${L(e.date)}</b>${L(e.role)}<em>${L(e.text)}</em></li>`).join("")}</ul>
        <h3>&gt; ${t("edu")}</h3><ul>${P.education.map(e => `<li><b>${L(e.date)}</b>${L(e.text)}</li>`).join("")}</ul>
        <h3>&gt; ${t("skills")}</h3><p>${L(P.skills)}</p><p class="muted">${P.tools}</p><p class="muted">AI: ${P.ai}</p>
        <h3>&gt; ${t("langs")}</h3><p>${L(P.languages)}</p>
        <div class="links">
          <a class="btn" href="${P.cv}" download="Burce-Bayar-CV.pdf">⇩ ${t("cv")}</a>
          <a class="btn alt" href="mailto:${P.email}">✉ ${P.email}</a>
          <a class="btn alt" href="${P.behance}" target="_blank" rel="noopener">Behance ↗</a>
          <a class="btn alt" href="${P.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
      </div></div>`
  }), { w: 780, h: 620 });
}
function openTrash() {
  createWin("trash", () => ({ title: t("trash"), color: "#cdb6ff", html: `<div class="empty">${t("trashEmpty")}</div>` }), { w: 440, h: 260 });
}
function openPersonalize() {
  createWin("personalize", () => ({
    title: t("personalize"), color: "#ffa42b",
    html: `<p class="wp-hint">${t("wpHint")}</p><div class="wp-grid">${WALLPAPERS.map(w =>
      `<button class="wp${w.id === curWp() ? " on" : ""}" data-wp="${w.id}"><img src="assets/img/wp/${w.id}_s.webp" alt=""><span>${w.name}</span></button>`).join("")}</div>`,
    bind: el => $$(".wp", el).forEach(b => b.onclick = () => setWallpaper(b.dataset.wp))
  }), { w: 620, h: 470 });
}

/* ================= DUVAR KAĞIDI / TEMA ================= */
const curWp = () => root.dataset.wp || "burce";
function setWallpaper(id) {
  const w = WALLPAPERS.find(x => x.id === id) || WALLPAPERS[0];
  const themeChanged = theme() !== w.theme;
  root.dataset.wp = w.id; root.dataset.theme = w.theme;
  try { localStorage.setItem("bos-wp", w.id); } catch {}
  if (themeChanged) renderIcons();
  if (wins.has("personalize")) paint("personalize");
  sfx.chime();
}

/* ================= SAĞ TIK MENÜSÜ ================= */
const ctx = $("#ctx");
function showCtx(x, y) {
  ctx.innerHTML = `
    <button data-a="personalize">◐ ${t("personalize")}…</button>
    <div class="ctx-lbl">${t("wallpaper")}</div>
    ${WALLPAPERS.map(w => `<button data-a="wp" data-v="${w.id}" class="sub">${w.id === curWp() ? "●" : "○"} ${w.name}</button>`).join("")}
    <hr>
    <button data-a="sort">▦ ${t("sort")}</button>
    <button data-a="refresh">⟳ ${t("refresh")}</button>
    <hr>
    <button data-a="sound">${soundOn ? "♪ " + t("soundOn") : "♪ " + t("soundOff")}</button>
    <button data-a="lang">⇄ ${t("toLang")}</button>`;
  ctx.hidden = false;
  const r = ctx.getBoundingClientRect();
  ctx.style.left = Math.min(x, innerWidth - r.width - 6) + "px";
  ctx.style.top = Math.min(y, innerHeight - r.height - 54) + "px";
}
$("#desktop").addEventListener("contextmenu", e => {
  if (isMobile() || e.target.closest(".win")) return;
  e.preventDefault(); showCtx(e.clientX, e.clientY);
});
ctx.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  ({ personalize: openPersonalize, wp: () => setWallpaper(b.dataset.v),
     sort: () => { store.del("bos-icons"); layoutIcons(); }, refresh: doRefresh,
     sound: toggleSound, lang: toggleLang })[b.dataset.a]();
  ctx.hidden = true;
});
document.addEventListener("pointerdown", e => { if (!ctx.hidden && !ctx.contains(e.target)) ctx.hidden = true; });
function doRefresh() { iconsEl.classList.remove("refresh"); void iconsEl.offsetWidth; iconsEl.classList.add("refresh"); }

/* ================= START MENÜ ================= */
const sm = $("#startMenu"), sb = $("#startBtn");
function renderStart() {
  $("#smList").innerHTML =
    `<li><button data-o="about"><i style="background:#b7f36b"></i>${t("aboutMe")}</button></li>
     <li><a href="${PROFILE.cv}" download="Burce-Bayar-CV.pdf"><i style="background:#e5252a"></i>CV.pdf ⇩</a></li><li class="sep"></li>` +
    PROJECTS.map(p => `<li><button data-o="${p.id}"><i style="background:${p.color}"></i>${p.no} · ${p.name}</button></li>`).join("") +
    `<li class="sep"></li><li><a href="${PROFILE.behance}" target="_blank" rel="noopener"><i style="background:#1769ff"></i>Behance ↗</a></li>
     <li><a href="${PROFILE.linkedin}" target="_blank" rel="noopener"><i style="background:#0a66c2"></i>LinkedIn ↗</a></li>
     <li><a href="mailto:${PROFILE.email}"><i style="background:#e815b2"></i>${t("contact")}</a></li>
     <li class="sep"></li><li><button data-o="personalize"><i style="background:#ffa42b"></i>${t("personalize")}</button></li>`;
}
const toggleSM = on => { sm.hidden = !on; sb.classList.toggle("on", on); };
sb.onclick = e => { e.stopPropagation(); toggleSM(sm.hidden); };
sm.onclick = e => { const b = e.target.closest("[data-o]"); if (b) { sfx.open(); openById(b.dataset.o); toggleSM(false); } };
document.addEventListener("click", e => { if (!sm.hidden && !sm.contains(e.target)) toggleSM(false); });

function openById(id) {
  if (id === "about") return openAbout();
  if (id === "trash") return openTrash();
  if (id === "personalize") return openPersonalize();
  const p = PROJECTS.find(x => x.id === id); if (p) openProject(p);
}

/* ================= LIGHTBOX ================= */
const lb = $("#lightbox"); let cur = null, idx = 0;
function lightbox(p, i) { cur = p; idx = i; lb.hidden = false; show(); }
function show() {
  $("img", lb).src = IMG(cur.img[idx]);
  $("figcaption", lb).textContent = `${cur.name} — ${idx + 1} / ${cur.img.length}`;
  const one = cur.img.length < 2; $(".lb-prev", lb).hidden = one; $(".lb-next", lb).hidden = one;
  new Image().src = IMG(cur.img[(idx + 1) % cur.img.length]);
}
const step = d => { idx = (idx + d + cur.img.length) % cur.img.length; show(); };
$(".lb-prev", lb).onclick = e => { e.stopPropagation(); step(-1); };
$(".lb-next", lb).onclick = e => { e.stopPropagation(); step(1); };
$(".lb-close", lb).onclick = () => lb.hidden = true;
lb.onclick = e => { if (e.target === lb) lb.hidden = true; };
let tx = 0; lb.addEventListener("touchstart", e => tx = e.touches[0].clientX, { passive: true });
lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); });
addEventListener("keydown", e => {
  if (!ctx.hidden && e.key === "Escape") { ctx.hidden = true; return; }
  if (!lb.hidden) { if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); return; }
  if (e.key === "Escape") { const a = [...wins.keys()].find(k => wins.get(k).el.classList.contains("active")); if (a) close(a); }
});

/* ================= DİL + SES BUTONLARI ================= */
function applyLang() {
  root.lang = lang;
  $$("[data-t]").forEach(el => el.textContent = t(el.dataset.t));
  $("#langBtn").textContent = lang === "tr" ? "TR" : "EN";
  $("#langBtn").title = t("toLang");
}
function toggleLang() {
  lang = lang === "tr" ? "en" : "tr"; store.set("bos-lang", lang);
  applyLang(); renderIcons(); renderStart(); wins.forEach((_, id) => paint(id));
}
function toggleSound() {
  soundOn = !soundOn; store.set("bos-sound", soundOn);
  paintSnd();
  if (soundOn) sfx.chime();
}
$("#langBtn").onclick = toggleLang;
$("#sndBtn").onclick = toggleSound;
function paintSnd() {
  $("#sndBtn").innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/>${soundOn ? '<path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>' : '<path d="M17 9l5 6M22 9l-5 6"/>'}</svg>`;
  $("#sndBtn").title = soundOn ? t("soundOn") : t("soundOff");
}
paintSnd();
$("#trayLi").href = PROFILE.linkedin;

/* ================= EKRAN KORUYUCU (60 sn hareketsizlik, sadece masaüstü) ================= */
const saver = $("#saver"), sctx = saver.getContext("2d");
const IDLE_MS = 60000; let idleT, raf = 0, flowers = [], nameP;
const PAL = ["#e815b2", "#b7f36b", "#ffa42b", "#922de6", "#ff9ad5", "#f6efff"];
function resetIdle() {
  if (!saver.hidden) stopSaver();
  clearTimeout(idleT);
  idleT = setTimeout(() => { if (!isMobile() && lb.hidden && !$("#boot")) startSaver(); }, IDLE_MS);
}
["pointermove", "pointerdown", "keydown", "wheel", "touchstart"].forEach(ev => addEventListener(ev, resetIdle, { passive: true }));
function startSaver() {
  saver.width = innerWidth; saver.height = innerHeight; saver.hidden = false;
  flowers = Array.from({ length: 46 }, () => newFlower(true));
  nameP = { x: Math.random() * (innerWidth - 300), y: Math.random() * (innerHeight - 80), vx: 1.4, vy: 1.1 };
  loop();
}
function newFlower(anyY) {
  const r = 8 + Math.random() * 26;
  return { x: Math.random() * innerWidth, y: anyY ? Math.random() * innerHeight : innerHeight + r * 2, r,
    vy: .35 + Math.random() * 1.1, sw: Math.random() * 6.28, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .02,
    petals: Math.random() < .5 ? 5 : 12, c: PAL[Math.floor(Math.random() * PAL.length)] };
}
function drawFlower(f) {
  sctx.save(); sctx.translate(f.x + Math.sin(f.sw) * 14, f.y); sctx.rotate(f.rot); sctx.fillStyle = f.c;
  for (let i = 0; i < f.petals; i++) {
    sctx.rotate(Math.PI * 2 / f.petals); sctx.beginPath();
    if (f.petals === 5) sctx.ellipse(0, -f.r * .55, f.r * .32, f.r * .55, 0, 0, 7);
    else sctx.roundRect ? sctx.roundRect(-f.r * .09, -f.r, f.r * .18, f.r * .62, f.r * .09) : sctx.rect(-f.r * .09, -f.r, f.r * .18, f.r * .62);
    sctx.fill();
  }
  sctx.beginPath(); sctx.fillStyle = f.petals === 5 ? "#ffd84d" : "rgba(0,0,0,0)"; sctx.arc(0, 0, f.r * .22, 0, 7); sctx.fill();
  sctx.restore();
}
function loop() {
  sctx.fillStyle = "rgba(20,6,31,.35)"; sctx.fillRect(0, 0, saver.width, saver.height);
  flowers.forEach((f, i) => { f.y -= f.vy; f.sw += .02; f.rot += f.vr; drawFlower(f); if (f.y < -f.r * 2) flowers[i] = newFlower(false); });
  sctx.font = "64px 'Bagel Fat One', sans-serif";
  const w = sctx.measureText("BurçeOS").width;
  nameP.x += nameP.vx; nameP.y += nameP.vy;
  if (nameP.x < 0 || nameP.x + w > saver.width) nameP.vx *= -1;
  if (nameP.y < 60 || nameP.y > saver.height - 10) nameP.vy *= -1;
  sctx.fillStyle = "#e815b2"; sctx.fillText("BurçeOS", nameP.x + 4, nameP.y + 4);
  sctx.fillStyle = "#b7f36b"; sctx.fillText("BurçeOS", nameP.x, nameP.y);
  raf = requestAnimationFrame(loop);
}
function stopSaver() { cancelAnimationFrame(raf); saver.hidden = true; sctx.clearRect(0, 0, saver.width, saver.height); }

/* ================= SAAT + BOOT ================= */
const tick = () => $("#clock").textContent = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
tick(); setInterval(tick, 15000);

applyLang(); renderIcons(); renderStart(); resetIdle();

const firstOpen = () => { const h = location.hash.slice(1); if (h) openById(h); else if (!isMobile()) openAbout(); };
const boot = $("#boot"); let pct = 0;
if (sessionStorage.getItem("booted")) { boot.remove(); firstOpen(); }
else {
  sessionStorage.setItem("booted", 1);
  const endBoot = () => { boot.classList.add("hide"); setTimeout(() => { boot.remove(); resetIdle(); }, 600); firstOpen(); };
  const tm = setInterval(() => {
    pct = Math.min(100, pct + Math.ceil(Math.random() * 9));
    $(".boot-bar i").style.width = pct + "%"; $("#bootPct").textContent = pct;
    if (pct >= 100) { clearInterval(tm); setTimeout(endBoot, 250); }
  }, 70);
  boot.onclick = () => { clearInterval(tm); endBoot(); };
}
})();
