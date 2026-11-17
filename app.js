/* BurçeOS v5 — pencere yöneticisi + kişiselleştirme + Pick Your Toxic + YouTube + Instagram + çoklu ikon seçimi.
   İçerik için data.js'i düzenle. */
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
  sign: { en: "Graphic Designer", tr: "Grafik Tasarımcı" },
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
  selAll: { en: "Select all icons", tr: "Tüm ikonları seç" },
  refresh: { en: "Refresh", tr: "Yenile" },
  soundOn: { en: "Sounds: on", tr: "Sesler: açık" }, soundOff: { en: "Sounds: off", tr: "Sesler: kapalı" },
  toLang: { en: "Türkçe'ye geç", tr: "Switch to English" },
  /* Pick Your Toxic */
  visit: { en: "Visit website", tr: "Web sitesini aç" },
  openMenu: { en: "Open the menu", tr: "Menüyü aç" },
  pAbout: { en: "About the brand", tr: "Marka hakkında" },
  pChars: { en: "Characters", tr: "Karakterler" },
  pCharsHint: { en: "Every section of the menu has its own character.", tr: "Menünün her bölümünün kendi karakteri var." },
  pMenu: { en: "Menu system", tr: "Menü sistemi" },
  pMenuTxt: { en: "The menu is built like a personality catalog: each section represents a different side of temptation — character, flavour profile, toxicity level and mood. Open it and see how it folds.",
              tr: "Menü bir kişilik kataloğu gibi kurgulandı: her bölüm cazibenin farklı bir yüzünü temsil ediyor — karakter, tat profili, toksisite seviyesi ve ruh hali. Aç ve nasıl katlandığını gör." },
  pType: { en: "Typography & colour", tr: "Tipografi & renk" },
  pCopy: { en: "click to copy", tr: "kopyalamak için tıkla" },
  pCopied: { en: "Copied!", tr: "Kopyalandı!" },
  pApps: { en: "Applications", tr: "Uygulamalar" },
  pFeed: { en: "Feed & website", tr: "Sosyal medya & web sitesi" },
  pWebTxt: { en: "The website is live inside BurçeOS — browse the menu, meet the characters and find your toxic.",
             tr: "Web sitesi BurçeOS'un içinde çalışıyor — menüyü gez, karakterlerle tanış, kendi toxic'ini bul." },
  browser: { en: "Browser", tr: "Tarayıcı" },
  newTab: { en: "Open in new tab", tr: "Yeni sekmede aç" },
  /* YouTube */
  vSearch: { en: "Search", tr: "Ara" },
  vAll: { en: "All", tr: "Tümü" },
  vNext: { en: "Up next", tr: "Sıradaki" },
  vNone: { en: "No videos found.", tr: "Video bulunamadı." },
  vCount: { en: n => `${n} videos · thumbnail design by Burçe Bayar`, tr: n => `${n} video · thumbnail tasarımı: Burçe Bayar` },
  vFull: { en: "View full size", tr: "Tam boyutta gör" },
  vHome: { en: "Home", tr: "Ana Sayfa" },
  vSubs: { en: "Subscriptions", tr: "Abonelikler" },
  vYou: { en: "You", tr: "Siz" },
  vMenu: { en: ["Your channel", "History", "Playlists", "Watch later", "Liked videos"], tr: ["Kanalınız", "Geçmiş", "Oynatma listeleri", "Daha sonra izle", "Beğendiğim videolar"] },
  vCreate: { en: "Create", tr: "Oluştur" },
  /* Instagram */
  iNav: { en: ["Home", "Search", "Explore", "Reels", "Messages", "Notifications", "Create", "Profile"],
          tr: ["Ana Sayfa", "Ara", "Keşfet", "Reels", "Mesajlar", "Bildirimler", "Oluştur", "Profil"] },
  iFollow: { en: "Follow", tr: "Takip et" },
  iFollowing: { en: "Following", tr: "Takiptesin" },
  iMsg: { en: "Message", tr: "Mesaj gönder" },
  iPosts: { en: "posts", tr: "gönderi" },
  iTabPosts: { en: "POSTS", tr: "GÖNDERİLER" },
  iTabReels: { en: "REELS", tr: "REELS" },
  iStatus: { en: n => `${n} posts · social media design by Burçe Bayar`, tr: n => `${n} gönderi · sosyal medya tasarımı: Burçe Bayar` }
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
  toxic: () => `<div class="glyph" style="background:#10100F;border:2px solid #E34678;padding:3px"><img src="pyt/img/logo.webp" alt="" style="height:100%;width:auto"></div>`,
  reshoot: () => `<div class="glyph" style="background:linear-gradient(135deg,#922de6,#e815b2 55%,#ffa42b);color:#fff;font-family:'Bagel Fat One';font-size:28px">R</div>`,
  video: () => `<svg viewBox="0 0 54 46"><path d="M52 12.6a6.6 6.6 0 0 0-4.7-4.7C43.2 6.8 27 6.8 27 6.8s-16.2 0-20.3 1.1A6.6 6.6 0 0 0 2 12.6C1 16.7 1 23 1 23s0 6.3 1 10.4a6.6 6.6 0 0 0 4.7 4.7c4.1 1.1 20.3 1.1 20.3 1.1s16.2 0 20.3-1.1a6.6 6.6 0 0 0 4.7-4.7C53 29.3 53 23 53 23s0-6.3-1-10.4z" fill="#f00"/><path d="M21.8 30.8 35.3 23l-13.5-7.8z" fill="#fff"/></svg>`,
  insta: () => `<svg viewBox="0 0 54 46"><defs><radialGradient id="igg" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#fdf497"/><stop offset=".05" stop-color="#fdf497"/><stop offset=".45" stop-color="#fd5949"/><stop offset=".6" stop-color="#d6249f"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><rect x="5" y="1" width="44" height="44" rx="12" fill="url(#igg)"/><rect x="13" y="9" width="28" height="28" rx="8" fill="none" stroke="#fff" stroke-width="3"/><circle cx="27" cy="23" r="6.5" fill="none" stroke="#fff" stroke-width="3"/><circle cx="35" cy="15" r="1.9" fill="#fff"/></svg>`,
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
  layoutIcons(); paintSel();
}

/* ---------- İkon yerleşimi ---------- */
const CELL_W = 100, CELL_H = 108, PAD = 16;
let cells = {};
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
addEventListener("resize", () => layoutIcons());

/* ---------- Seçim (tek / Ctrl+tık / alan seçimi) ---------- */
const sel = new Set();
function paintSel() { $$(".icon", iconsEl).forEach(i => i.classList.toggle("sel", sel.has(i.dataset.id))); }
function setSel(ids) { sel.clear(); ids.forEach(i => sel.add(i)); paintSel(); }
const iconById = id => iconsEl.querySelector(`.icon[data-id="${id}"]`);

iconsEl.addEventListener("pointerdown", e => {
  if (e.target !== iconsEl || isMobile() || e.button !== 0) return;
  const add = e.ctrlKey || e.metaKey || e.shiftKey, base = add ? new Set(sel) : new Set();
  const box = iconsEl.getBoundingClientRect(), sx = e.clientX - box.left, sy = e.clientY - box.top;
  let marq = null;
  iconsEl.setPointerCapture(e.pointerId);
  iconsEl.onpointermove = m => {
    const x = m.clientX - box.left, y = m.clientY - box.top;
    if (!marq) { if (Math.hypot(x - sx, y - sy) < 4) return; marq = document.createElement("div"); marq.id = "marq"; iconsEl.appendChild(marq); }
    const l = Math.min(sx, x), tp = Math.min(sy, y), w = Math.abs(x - sx), h = Math.abs(y - sy);
    Object.assign(marq.style, { left: l + "px", top: tp + "px", width: w + "px", height: h + "px" });
    const hit = new Set(base);
    $$(".icon", iconsEl).forEach(i => {
      const il = i.offsetLeft, it = i.offsetTop, ir = il + i.offsetWidth, ib = it + i.offsetHeight;
      if (il < l + w && ir > l && it < tp + h && ib > tp) hit.add(i.dataset.id);
    });
    setSel([...hit]);
  };
  iconsEl.onpointerup = () => {
    iconsEl.onpointermove = iconsEl.onpointerup = null;
    if (marq) marq.remove(); else if (!add) setSel([]);
  };
});

function enableIconDrag(el) {
  let block = false;
  el.addEventListener("pointerdown", e => {
    if (isMobile() || e.button !== 0) return;
    const id = el.dataset.id, toggle = e.ctrlKey || e.metaKey || e.shiftKey;
    if (toggle) {
      e.preventDefault(); block = true;
      sel.has(id) ? sel.delete(id) : sel.add(id); paintSel(); return;
    }
    if (!sel.has(id)) setSel([id]);
    const group = [...sel].map(iconById).filter(Boolean);
    const orig = group.map(g => [g, g.offsetLeft, g.offsetTop]);
    const sx = e.clientX, sy = e.clientY; let moved = false;
    el.setPointerCapture(e.pointerId);
    el.onpointermove = m => {
      const dx = m.clientX - sx, dy = m.clientY - sy;
      if (!moved && Math.hypot(dx, dy) < 6) return;
      moved = true;
      orig.forEach(([g, x, y]) => { g.classList.add("dragging"); g.style.left = x + dx + "px"; g.style.top = y + dy + "px"; });
    };
    el.onpointerup = () => {
      el.onpointermove = el.onpointerup = null;
      if (!moved) return;
      block = true;
      orig.forEach(([g]) => g.classList.remove("dragging"));
      dropGroup(group, el);
    };
  });
  el.addEventListener("click", e => { if (block) { e.preventDefault(); e.stopImmediatePropagation(); block = false; } }, true);
}
function dropGroup(group, lead) {
  const { rows, cols } = grid();
  const ids = group.map(g => g.dataset.id), moving = new Set(ids);
  const target = g => [Math.max(0, Math.min(cols - 1, Math.round((g.offsetLeft - PAD) / CELL_W))),
                       Math.max(0, Math.min(rows - 1, Math.round((g.offsetTop - PAD) / CELL_H)))];
  if (group.length === 1) {
    const [c, r] = target(lead), id = lead.dataset.id;
    const other = Object.keys(cells).find(k => k !== id && cells[k][0] === c && cells[k][1] === r);
    if (other) cells[other] = cells[id];
    cells[id] = [c, r];
  } else {
    const taken = new Set(Object.keys(cells).filter(k => !moving.has(k)).map(k => cells[k].join(",")));
    [lead, ...group.filter(g => g !== lead)].forEach(g => {
      let [c, r] = target(g), best = null;
      if (!taken.has(c + "," + r)) best = [c, r];
      else for (let d = 1; d < cols + rows && !best; d++)
        for (let dc = -d; dc <= d && !best; dc++) for (let dr = -d; dr <= d && !best; dr++) {
          if (Math.max(Math.abs(dc), Math.abs(dr)) !== d) continue;
          const nc = c + dc, nr = r + dr;
          if (nc >= 0 && nr >= 0 && nc < cols && nr < rows && !taken.has(nc + "," + nr)) best = [nc, nr];
        }
      best = best || cells[g.dataset.id];
      taken.add(best.join(",")); cells[g.dataset.id] = best;
    });
  }
  store.set("bos-icons", cells); layoutIcons();
}

/* ================= PENCERE YÖNETİCİSİ ================= */
const wins = new Map(); let z = 10, cascade = 0;
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
  if (b.cls) el.classList.add(b.cls);
  el.innerHTML = `
    <header class="titlebar"><i class="dot" style="--c:${b.color}"></i><span class="t">${b.title}</span>
      <div class="tb-btns"><button class="mn" title="${t("min")}"><span>_</span></button><button class="mx" title="${t("max")}"><span>□</span></button><button class="x" title="${t("close")}"><span>✕</span></button></div>
    </header>
    ${b.toolbar === false ? "" : `<div class="toolbar"><span>${m[0]}</span><span>${m[1]}</span><span>${m[2]}</span><span class="path">C:\\Burce\\Portfolio\\${b.title}</span></div>`}
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
    win.classList.add("moving");
    handle.onpointermove = m => {
      win.style.left = Math.min(innerWidth - 80, Math.max(-win.offsetWidth + 80, ox + m.clientX - sx)) + "px";
      win.style.top = Math.min(innerHeight - 90, Math.max(0, oy + m.clientY - sy)) + "px";
    };
    handle.onpointerup = () => { handle.onpointermove = null; win.classList.remove("moving"); };
  });
}

/* ================= İÇERİK PENCERELERİ ================= */
function openProject(p) {
  if (p.custom === "toxic") return openToxic(p);
  if (p.custom === "video") return openVideo(p);
  if (p.custom === "insta") return openInsta(p);
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

/* ---------- INSTAGRAM (profil + post ızgarası; postlar tıklanınca açılmaz) ---------- */
const IG = {
  home: '<path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  search: '<path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16.511 16.511 22 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  explore: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="m13.94 13.94-6.71 2.83 2.83-6.71 6.71-2.83Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  reels: '<rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2.5 7.5h19M8.5 2.5l3 5M14.5 2.5l3 5" stroke="currentColor" stroke-width="2"/><path d="M9.8 11.2v6l5.2-3z" fill="currentColor"/>',
  msg: '<path d="M22 3 9.218 10.083M11.698 20.334 22 3.001H2l7.218 7.083 2.48 10.25Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  heart: '<path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938Z" fill="none" stroke="currentColor" stroke-width="2"/>',
  plus: '<rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v10M7 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  grid: '<rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" stroke-width="2"/>',
  dots: '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>'
};
const igI = (k, s = 24) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}">${IG[k]}</svg>`;
let igFollow = false;
function openInsta(p) {
  const n = INSTA.posts, posts = Array.from({ length: n }, (_, i) => `assets/img/ig/p${String(i + 1).padStart(2, "0")}.webp`);
  const nav = t("iNav"), navKeys = ["home", "search", "explore", "reels", "msg", "heart", "plus"];
  createWin(p.id, () => ({
    title: `Instagram — ${INSTA.handle}`, color: p.color, cls: "ig-win", toolbar: false, status: t("iStatus", n),
    html: `<div class="ig">
      <nav class="ig-nav">
        <div class="ig-word">Instagram</div>
        <div class="ig-glyph">${ICONS.insta()}</div>
        ${navKeys.map((k, i) => `<button class="ig-nl">${igI(k)}<span>${nav[i]}</span></button>`).join("")}
        <button class="ig-nl on"><img src="favicon.svg" alt=""><span>${nav[7]}</span></button>
      </nav>
      <div class="ig-main">
        <header class="ig-head">
          <div class="ig-ava"><img src="favicon.svg" alt="${INSTA.handle}"></div>
          <div class="ig-info">
            <div class="ig-row1">
              <h2>${INSTA.handle}</h2>
              <button class="ig-btn blue" data-follow>${igFollow ? t("iFollowing") : t("iFollow")}</button>
              <a class="ig-btn" href="mailto:${PROFILE.email}">${t("iMsg")}</a>
              <button class="ig-ic" aria-label="More">${igI("dots", 20)}</button>
            </div>
            <div class="ig-row2"><b>${n}</b> ${t("iPosts")}</div>
            <div class="ig-bio"><b>${INSTA.name}</b><span>${L(INSTA.bio)}</span></div>
          </div>
        </header>
        <div class="ig-tabs">
          <button class="on">${igI("grid", 12)}${t("iTabPosts")}</button>
          ${INSTA.reels.length ? `<button>${igI("reels", 12)}${t("iTabReels")}</button>` : ""}
        </div>
        <div class="ig-grid">${posts.map((src, i) => `<div class="ig-post" style="--d:${(i % 12) * 35}ms"><img src="${src}" alt="Post ${i + 1}" loading="${i < 9 ? "eager" : "lazy"}" draggable="false"></div>`).join("")}</div>
      </div>
    </div>`,
    bind: el => {
      const f = $("[data-follow]", el);
      f.onclick = () => { igFollow = !igFollow; f.textContent = igFollow ? t("iFollowing") : t("iFollow"); f.classList.toggle("blue", !igFollow); };
      f.classList.toggle("blue", !igFollow);
    }
  }), { w: 1000, h: 740 });
}

/* ---------- YOUTUBE ---------- */
const YI = {
  home: '<path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"/>',
  shorts: '<path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06a3.74 3.74 0 0 0-3.5-6.62L6 6.94a3.74 3.74 0 0 0 .23 6.74l1.2.49L6 14.93a3.75 3.75 0 0 0 3.5 6.63l8.5-4.5a3.74 3.74 0 0 0-.23-6.74z"/>',
  ch: '<path d="M4 20h14v1H3V6h1v14zM21 3v15H6V3h15zm-1 1H7v13h13V4zm-6.5 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm3.5 9h-7c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5z"/>',
  hist: '<path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38 4.17 7.56 4.06 7.75 3.97 8H8v1H1.96V3h1v4.65C4.81 4.67 8.07 2 12 2c5.51 0 10 4.49 10 10z"/>',
  pl: '<path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"/>',
  later: '<path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>',
  like: '<path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3v8zm12.98-6.83-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.19-.21.48-.33.78-.33.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94-.4 1.29h5.58c.41 0 .8.17 1.03.46.13.15.26.4.19.71z"/>',
  mic: '<path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm6.91 8a.5.5 0 0 0-.5.5 6.41 6.41 0 0 1-12.82 0 .5.5 0 0 0-1 0 7.42 7.42 0 0 0 6.91 7.4V21H9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-2.5v-2.1a7.42 7.42 0 0 0 6.91-7.4.5.5 0 0 0-.5-.5z"/>',
  bell: '<path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15C6 7.4 7.56 5.1 10 4.34v-.38c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.87z"/>',
  menu: '<path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"/>',
  search: '<path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>'
};
const yI = k => `<svg viewBox="0 0 24 24" fill="currentColor">${YI[k]}</svg>`;
const YT_PLAY = `<svg viewBox="0 0 68 48"><path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.3.3 34 .3 34 .3s-21.3 0-26.5 1.4a8.5 8.5 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.7 47.7 34 47.7 34 47.7s21.3 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00"/><path d="M27 34l18-10-18-10z" fill="#fff"/></svg>`;
const YT_LOGO = `<svg class="yt-wordmark" viewBox="0 0 96 20"><path d="M27.97 3.12A3.6 3.6 0 0 0 25.43.58C23.2 0 14.27 0 14.27 0S5.34 0 3.1.58A3.6 3.6 0 0 0 .58 3.12C0 5.35 0 10 0 10s0 4.65.58 6.88a3.6 3.6 0 0 0 2.53 2.54C5.34 20 14.27 20 14.27 20s8.93 0 11.16-.58a3.6 3.6 0 0 0 2.54-2.54C28.55 14.65 28.55 10 28.55 10s0-4.65-.58-6.88z" fill="#f00"/><path d="M11.42 14.29 18.84 10l-7.42-4.29z" fill="#fff"/><text x="31" y="16.2" fill="currentColor" font-family="Roboto,Arial,sans-serif" font-weight="700" font-size="18" textLength="63" lengthAdjust="spacingAndGlyphs">YouTube</text></svg>`;
const vState = { view: "home", ch: "all", q: "", cur: 0 };
function openVideo(p) {
  const ch = v => CHANNELS[v.ch] || { name: v.ch, avatar: "" };
  const ava = (v, cls = "") => `<img class="yt-ava ${cls}" src="assets/img/ch/${ch(v).avatar}.webp" alt="${ch(v).name}" loading="lazy">`;
  const playSet = { name: "YouTube", img: VIDEOS.map(v => v.img) };
  const list = () => VIDEOS.map((v, i) => ({ v, i })).filter(({ v }) =>
    (vState.ch === "all" || v.ch === vState.ch) &&
    (!vState.q || (v.title + " " + ch(v).name).toLocaleLowerCase("tr").includes(vState.q.toLocaleLowerCase("tr"))));

  const homeHTML = () => {
    const items = list();
    return `<div class="yt-chips">${[["all", t("vAll")], ...Object.entries(CHANNELS).map(([k, c]) => [k, c.name])]
        .map(([k, n]) => `<button class="yt-chip${vState.ch === k ? " on" : ""}" data-ch="${k}">${n}</button>`).join("")}</div>
      ${items.length ? `<div class="yt-grid">${items.map(({ v, i }) => `
        <button class="yt-card" data-v="${i}">
          <span class="yt-th"><img src="${IMG(v.img, "thumb")}" alt="${v.title}" loading="lazy"><i class="yt-dur">${v.dur}</i></span>
          <span class="yt-meta">${ava(v)}<span><b class="yt-title">${v.title}</b><small>${ch(v).name}</small></span></span>
        </button>`).join("")}</div>` : `<p class="yt-none">${t("vNone")}</p>`}`;
  };
  const watchHTML = () => {
    const v = VIDEOS[vState.cur];
    return `<div class="yt-watch">
      <div class="yt-main">
        <button class="yt-player" data-full title="${t("vFull")}">
          <img src="${IMG(v.img)}" alt="${v.title}">
          <span class="yt-play">${YT_PLAY}</span>
          <span class="yt-bar"><i></i></span>
          <span class="yt-ctrl"><span>▶ ❙❙</span><span>0:00 / ${v.dur}</span><span class="yt-zoom">⤢ ${t("vFull")}</span></span>
        </button>
        <h2 class="yt-h">${v.title}</h2>
        <div class="yt-chrow">${ava(v, "lg")}<b>${ch(v).name}</b></div>
      </div>
      <aside class="yt-side"><h4>${t("vNext")}</h4>${VIDEOS.map((o, i) => i === vState.cur ? "" : `
        <button class="yt-mini" data-v="${i}">
          <span class="yt-th"><img src="${IMG(o.img, "thumb")}" alt="${o.title}" loading="lazy"><i class="yt-dur">${o.dur}</i></span>
          <span><b class="yt-title">${o.title}</b><small>${ch(o).name}</small></span>
        </button>`).join("")}</aside>
    </div>`;
  };

  createWin(p.id, () => ({
    title: p.name, color: p.color, cls: "yt-win", toolbar: false, status: t("vCount", VIDEOS.length),
    html: `<div class="yt">
      <div class="yt-top">
        <button class="yt-burger" data-burger aria-label="Menu">${yI("menu")}</button>
        <button class="yt-logo" data-home title="YouTube">${YT_LOGO}<sup>TR</sup></button>
        <div class="yt-mid">
          <label class="yt-search"><input type="search" placeholder="${t("vSearch")}" value="${vState.q.replace(/"/g, "&quot;")}"><span>${yI("search")}</span></label>
          <button class="yt-round" aria-label="Voice">${yI("mic")}</button>
        </div>
        <div class="yt-right">
          <button class="yt-create"><b>＋</b>${t("vCreate")}</button>
          <button class="yt-round bell" aria-label="Notifications">${yI("bell")}<i>9+</i></button>
          <img class="yt-me" src="assets/img/avatar.webp" alt="">
        </div>
      </div>
      <div class="yt-shell">
        <nav class="yt-nav">
          <button class="yt-nl on" data-home>${yI("home")}<span>${t("vHome")}</span></button>
          <button class="yt-nl">${yI("shorts")}<span>Shorts</span></button>
          <hr>
          <h5>${t("vSubs")} ›</h5>
          ${Object.entries(CHANNELS).map(([k, c]) => `<button class="yt-nl sub" data-sub="${k}"><img src="assets/img/ch/${c.avatar}.webp" alt=""><span>${c.name}</span><i></i></button>`).join("")}
          <hr>
          <h5>${t("vYou")} ›</h5>
          ${["ch", "hist", "pl", "later", "like"].map((k, i) => `<button class="yt-nl">${yI(k)}<span>${t("vMenu")[i]}</span></button>`).join("")}
        </nav>
        <div class="yt-body"></div>
      </div>
    </div>`,
    bind: el => {
      const body = $(".yt-body", el);
      const render = () => {
        body.innerHTML = vState.view === "watch" ? watchHTML() : homeHTML();
        body.scrollTop = 0;
        $$("[data-ch]", body).forEach(b => b.onclick = () => { vState.ch = b.dataset.ch; render(); });
        $$("[data-v]", body).forEach(b => b.onclick = () => { vState.cur = +b.dataset.v; vState.view = "watch"; sfx.open(); render(); });
        const f = $("[data-full]", body); if (f) f.onclick = () => lightbox(playSet, vState.cur);
      };
      $$("[data-home]", el).forEach(b => b.onclick = () => { vState.view = "home"; vState.ch = "all"; render(); });
      $$("[data-sub]", el).forEach(b => b.onclick = () => { vState.view = "home"; vState.ch = b.dataset.sub; render(); });
      $("[data-burger]", el).onclick = () => el.classList.toggle("yt-mini-nav");
      const inp = $(".yt-search input", el);
      inp.oninput = () => { vState.q = inp.value; vState.view = "home"; render(); };
      render();
    }
  }), { w: 1100, h: 720 });
}

/* ---------- PICK YOUR TOXIC ---------- */
function openToxic(p) {
  const shot = (n, cls = "") => `<img class="pyt-shot ${cls}" src="${IMG(n)}" loading="lazy" data-n="${n}" alt="Pick Your Toxic — ${n.replace("pyt_", "")}">`;
  const charSet = { name: "Pick Your Toxic — " + t("pChars"), img: PYT.characters.map(c => c.full) };
  createWin(p.id, () => ({
    title: p.name, color: p.color, cls: "pyt-win", status: t("scenes", p.img.length),
    html: `<div class="pyt">
      <section class="pyt-hero">
        <span class="pyt-spark a">✦</span><span class="pyt-spark b">✦</span>
        <p class="pyt-kicker">More than just a bar</p>
        <img class="pyt-logo" src="pyt/img/logo.webp" alt="Pick Your Toxic">
        <div class="pyt-sub">${L(PYT.subtitle)}</div>
        <p class="pyt-intro">${L(PYT.intro)}</p>
        <div class="pyt-cta">
          <button class="pyt-btn" data-web>${t("visit")} ↗</button>
          <button class="pyt-btn ghost" data-menu>${t("openMenu")}</button>
        </div>
      </section>

      <section class="pyt-sec"><h3><i>✦</i>${t("pAbout")}</h3>${shot("pyt_about")}</section>

      <section class="pyt-sec"><h3><i>✦</i>${t("pChars")}</h3><p class="pyt-p">${t("pCharsHint")}</p>
        <div class="pyt-chars">${PYT.characters.map((c, i) => `
          <button class="pyt-char" style="--c:${c.color}" data-ci="${i}">
            <img src="pyt/img/char_${c.img}.webp" alt="${c.name}" loading="lazy">
            <b>${c.name}</b><small>${c.cat}</small><em>${L(c.line)}</em>
          </button>`).join("")}</div>
        ${shot("pyt_chars1")}${shot("pyt_chars2")}
      </section>

      <section class="pyt-sec"><h3><i>✦</i>${t("pMenu")}</h3>
        <div class="pyt-menu-cta"><p class="pyt-p">${t("pMenuTxt")}</p><button class="pyt-btn" data-menu>${t("openMenu")} ↗</button></div>
        ${shot("pyt_menusystem")}${shot("pyt_menuspread")}
      </section>

      <section class="pyt-sec"><h3><i>✦</i>${t("pType")}</h3>
        <div class="pyt-type">
          <div class="pyt-fonts">${PYT.fonts.map(f => `<div><small>${f[0]}</small><b>${f[1]}</b></div>`).join("")}</div>
          <div class="pyt-sw">${PYT.colors.map(c => `<button class="sw" data-hex="${c[1]}" title="${t("pCopy")}"><i style="background:${c[1]}"></i><b>${c[0]}</b><span>${c[1]}</span></button>`).join("")}</div>
        </div>
      </section>

      <section class="pyt-sec"><h3><i>✦</i>${t("pApps")}</h3>${shot("pyt_apps")}</section>

      <section class="pyt-sec"><h3><i>✦</i>${t("pFeed")}</h3>${shot("pyt_feed")}
        <div class="pyt-menu-cta"><p class="pyt-p">${t("pWebTxt")}</p><button class="pyt-btn" data-web>${t("visit")} ↗</button></div>
      </section>
    </div>`,
    bind: el => {
      $$("[data-web]", el).forEach(b => b.onclick = () => openBrowser());
      $$("[data-menu]", el).forEach(b => b.onclick = () => openBrowser("menu"));
      $$(".pyt-shot", el).forEach(img => img.onclick = () => lightbox(p, p.img.indexOf(img.dataset.n)));
      $$(".pyt-char", el).forEach(b => b.onclick = () => lightbox(charSet, +b.dataset.ci));
      $$(".sw", el).forEach(b => b.onclick = () => {
        const done = () => { const s = $("span", b), o = s.textContent; s.textContent = t("pCopied"); b.classList.add("ok"); setTimeout(() => { s.textContent = o; b.classList.remove("ok"); }, 1100); };
        (navigator.clipboard ? navigator.clipboard.writeText(b.dataset.hex) : Promise.reject()).then(done, done);
      });
    }
  }), { w: 1040, h: 700 });
}

/* Retro tarayıcı: Pick Your Toxic sitesini BurçeOS içinde açar */
function openBrowser(hash) {
  const src = PYT.site + (hash ? "#" + hash : "");
  if (wins.has("pyt-web")) {
    const o = wins.get("pyt-web"); o.el.classList.remove("min"); focus("pyt-web");
    const f = $("iframe", o.el); if (hash) { f.src = "about:blank"; setTimeout(() => f.src = src, 30); }
    return;
  }
  let first = src;
  createWin("pyt-web", () => ({
    title: `Pick Your Toxic — ${t("browser")}`, color: "#E34678", toolbar: false, cls: "browser-win",
    html: `<div class="browser">
      <div class="b-bar">
        <button data-b="back" title="Back">←</button><button data-b="fwd" title="Forward">→</button><button data-b="reload" title="Reload">⟳</button>
        <div class="b-url"><span class="lock">🔒</span>https://<b>${PYT.url}</b></div>
        <a class="b-ext" href="${PYT.site}" target="_blank" rel="noopener" title="${t("newTab")}">↗</a>
      </div>
      <div class="b-load"><i></i></div>
      <iframe src="${first}" title="Pick Your Toxic website"></iframe>
    </div>`,
    bind: el => {
      const f = $("iframe", el), bar = $(".b-load", el);
      bar.classList.add("on"); f.addEventListener("load", () => bar.classList.remove("on"));
      $$("[data-b]", el).forEach(b => b.onclick = () => {
        try {
          if (b.dataset.b === "back") f.contentWindow.history.back();
          if (b.dataset.b === "fwd") f.contentWindow.history.forward();
          if (b.dataset.b === "reload") { bar.classList.add("on"); f.contentWindow.location.reload(); }
        } catch {}
      });
      first = PYT.site;
    }
  }), { w: 1180, h: 760 });
}

function openAbout() {
  const P = PROFILE;
  createWin("about", () => ({
    title: "About_Me.txt", color: "#b7f36b",
    html: `<div class="about">
      <div class="ava" role="img" aria-label="${P.name}" style="background-image:url(assets/img/avatar.webp)"></div>
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
    <button data-a="selall">▣ ${t("selAll")}</button>
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
     selall: () => setSel($$(".icon", iconsEl).map(i => i.dataset.id)),
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
  if (id === "pyt-web") return openBrowser();
  const p = PROJECTS.find(x => x.id === id); if (p) openProject(p);
}

/* ================= LIGHTBOX ================= */
const lb = $("#lightbox"); let cur = null, idx = 0;
function lightbox(p, i) { cur = p; idx = Math.max(0, i); lb.hidden = false; show(); }
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
  if (e.key === "Escape") {
    if (sel.size) { setSel([]); return; }
    const a = [...wins.keys()].find(k => wins.get(k).el.classList.contains("active")); if (a) close(a);
  }
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
  applyLang(); renderIcons(); renderStart();
  wins.forEach((_, id) => { if (id !== "pyt-web") paint(id); });
  paintSnd();
}
function paintSnd() {
  $("#sndBtn").innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/>${soundOn ? '<path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>' : '<path d="M17 9l5 6M22 9l-5 6"/>'}</svg>`;
  $("#sndBtn").title = soundOn ? t("soundOn") : t("soundOff");
}
function toggleSound() {
  soundOn = !soundOn; store.set("bos-sound", soundOn);
  paintSnd();
  if (soundOn) sfx.chime();
}
$("#langBtn").onclick = toggleLang;
$("#sndBtn").onclick = toggleSound;
paintSnd();
$("#trayLi").href = PROFILE.linkedin;

/* ================= EKRAN KORUYUCU (60 sn hareketsizlik, sadece masaüstü) ================= */
const saver = $("#saver"), sctx = saver.getContext("2d");
const IDLE_MS = 60000; let idleT, raf = 0, flowers = [], nameP;
const PAL = ["#e815b2", "#b7f36b", "#ffa42b", "#922de6", "#ff9ad5", "#f6efff"];
function resetIdle() {
  if (!saver.hidden) stopSaver();
  clearTimeout(idleT);
  idleT = setTimeout(() => {
    const browsing = wins.has("pyt-web") && !wins.get("pyt-web").el.classList.contains("min");
    if (!isMobile() && lb.hidden && !$("#boot") && !browsing) startSaver();
  }, IDLE_MS);
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
