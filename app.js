/* BurçeOS — pencere yöneticisi. İçerik için data.js'i düzenle. */
(() => {
const $ = (s, el = document) => el.querySelector(s);
const IMG = (n, size = "full") => `assets/img/${size}/${n}.webp`;
const isMobile = () => matchMedia("(max-width:760px)").matches;

/* ---------- İKONLAR ---------- */
const folderSVG = c => `<svg viewBox="0 0 54 46"><path d="M3 8a4 4 0 0 1 4-4h13l5 5h22a4 4 0 0 1 4 4v3H3z" fill="${c}" opacity=".75"/><rect x="3" y="13" width="48" height="30" rx="4" fill="${c}"/><rect x="3" y="13" width="48" height="5" rx="2" fill="#fff" opacity=".25"/></svg>`;
const ICONS = {
  about: `<svg viewBox="0 0 54 46"><rect x="10" y="1" width="34" height="44" rx="3" fill="#f6efff"/><path d="M16 12h22M16 19h22M16 26h22M16 33h14" stroke="#922de6" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="38" r="8" fill="#e815b2"/><text x="40" y="42" font-size="11" text-anchor="middle" fill="#fff" font-family="Arial" font-weight="700">i</text></svg>`,
  toxic: `<div class="glyph" style="background:#0b0b0b;color:#ff2e63;font-family:'Bagel Fat One';font-size:13px;line-height:.9;border:2px solid #ff2e63">PICK<br>TOXIC</div>`,
  reshoot: `<div class="glyph" style="background:linear-gradient(135deg,#922de6,#e815b2 55%,#ffa42b);color:#fff;font-family:'Bagel Fat One';font-size:28px">R</div>`,
  behance: `<div class="glyph" style="background:#1769ff;color:#fff">Bē</div>`,
  linkedin: `<div class="glyph" style="background:#0a66c2;color:#fff">in</div>`,
  mail: `<svg viewBox="0 0 54 46"><rect x="3" y="7" width="48" height="34" rx="5" fill="#b7f36b"/><path d="M5 10l22 17L49 10" fill="none" stroke="#14061f" stroke-width="3" stroke-linejoin="round"/></svg>`,
  trash: `<svg viewBox="0 0 54 46"><path d="M15 12h24l-3 32H18z" fill="#cdb6ff"/><rect x="12" y="7" width="30" height="5" rx="2" fill="#f6efff"/><path d="M22 18v20M27 18v20M32 18v20" stroke="#922de6" stroke-width="2"/></svg>`
};

const DESKTOP = [
  { id: "about", name: "About_Me.txt", icon: ICONS.about, open: () => openAbout() },
  ...PROJECTS.map(p => ({ id: p.id, name: p.type === "folder" ? `${p.no} ${p.name}` : p.name,
    icon: p.icon ? ICONS[p.icon] : folderSVG(p.color), open: () => openProject(p) })),
  { id: "behance", name: "Behance", icon: ICONS.behance, href: PROFILE.behance },
  { id: "linkedin", name: "LinkedIn", icon: ICONS.linkedin, href: PROFILE.linkedin },
  { id: "mail", name: "Mail", icon: ICONS.mail, href: `mailto:${PROFILE.email}` },
  { id: "trash", name: "Recycle Bin", icon: ICONS.trash, open: () => openTrash() }
];

const iconsEl = $("#icons");
DESKTOP.forEach(d => {
  const el = document.createElement(d.href ? "a" : "button");
  el.className = "icon"; el.setAttribute("role", "listitem");
  el.innerHTML = `${d.icon}<span>${d.name}</span>`;
  if (d.href) { el.href = d.href; if (!d.href.startsWith("mailto")) { el.target = "_blank"; el.rel = "noopener"; } }
  else el.addEventListener("click", d.open);
  iconsEl.appendChild(el);
});
$("#trayLi").href = PROFILE.linkedin;

/* ---------- PENCERE YÖNETİCİSİ ---------- */
const wins = new Map(); let z = 10, cascade = 0;
function createWin(id, title, color, html, { w = 860, h = 560, status = "" } = {}) {
  if (wins.has(id)) { const o = wins.get(id); o.el.classList.remove("min"); focus(id); return o.el; }
  const el = document.createElement("section");
  el.className = "win"; el.dataset.id = id;
  const dw = innerWidth, dh = innerHeight - 48;
  w = Math.min(w, dw - 40); h = Math.min(h, dh - 40);
  const x = Math.max(10, (dw - w) / 2 - 120 + cascade * 28), y = Math.max(10, (dh - h) / 2 - 40 + cascade * 24);
  cascade = (cascade + 1) % 6;
  Object.assign(el.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
  el.innerHTML = `
    <header class="titlebar"><i class="dot" style="--c:${color}"></i><span class="t">${title}</span>
      <div class="tb-btns"><button class="mn" title="Küçült">_</button><button class="mx" title="Büyüt">□</button><button class="x" title="Kapat">✕</button></div>
    </header>
    <div class="toolbar"><span>File</span><span>Edit</span><span>View</span><span class="path">C:\\Burce\\Portfolio\\${title}</span></div>
    <div class="wbody">${html}</div>
    ${status ? `<div class="statusbar">${status}</div>` : ""}`;
  $("#windows").appendChild(el);

  const task = document.createElement("button");
  task.className = "task"; task.textContent = title;
  task.onclick = () => {
    const minimized = el.classList.contains("min");
    if (!minimized && el.classList.contains("active")) { el.classList.add("min"); el.classList.remove("active"); task.classList.remove("active"); }
    else { el.classList.remove("min"); focus(id); }
  };
  $("#tasks").appendChild(task);

  $(".x", el).onclick = e => { e.stopPropagation(); close(id); };
  $(".mn", el).onclick = e => { e.stopPropagation(); el.classList.add("min"); el.classList.remove("active"); task.classList.remove("active"); };
  $(".mx", el).onclick = e => { e.stopPropagation(); el.classList.toggle("max"); };
  $(".titlebar", el).ondblclick = () => el.classList.toggle("max");
  el.addEventListener("pointerdown", () => focus(id));
  drag(el, $(".titlebar", el));

  wins.set(id, { el, task }); focus(id);
  if (location.hash !== "#" + id) history.replaceState(null, "", "#" + id);
  return el;
}
function focus(id) {
  wins.forEach((o, k) => { o.el.classList.toggle("active", k === id); o.task.classList.toggle("active", k === id); });
  const o = wins.get(id); if (o) o.el.style.zIndex = ++z;
}
function close(id) {
  const o = wins.get(id); if (!o) return;
  o.el.remove(); o.task.remove(); wins.delete(id);
  if (location.hash === "#" + id) history.replaceState(null, "", location.pathname);
}
function drag(win, handle) {
  let sx, sy, ox, oy;
  handle.addEventListener("pointerdown", e => {
    if (e.target.closest("button") || isMobile() || win.classList.contains("max")) return;
    sx = e.clientX; sy = e.clientY; ox = win.offsetLeft; oy = win.offsetTop;
    handle.setPointerCapture(e.pointerId);
    handle.onpointermove = m => {
      win.style.left = Math.min(innerWidth - 80, Math.max(-win.offsetWidth + 80, ox + m.clientX - sx)) + "px";
      win.style.top = Math.min(innerHeight - 90, Math.max(0, oy + m.clientY - sy)) + "px";
    };
    handle.onpointerup = () => { handle.onpointermove = null; };
  });
}

/* ---------- İÇERİK PENCERELERİ ---------- */
function openProject(p) {
  if (p.type === "case") {
    const html = `<div class="case-head"><h2>${p.name.replace(/\.(exe|app)$/, "")}</h2><div class="sub">${p.subtitle}</div><p>${p.intro}</p></div>
      <div class="case-stack">${p.img.map((n, i) => `<img src="${IMG(n)}" loading="${i < 2 ? "eager" : "lazy"}" data-i="${i}" alt="${p.name} ${i + 1}">`).join("")}</div>`;
    const el = createWin(p.id, p.name, p.color, html, { w: 1000, h: 680, status: `${p.img.length} sahne · tıkla ve büyüt` });
    el.querySelectorAll(".case-stack img").forEach(img => img.onclick = () => lightbox(p, +img.dataset.i));
  } else {
    const html = `<div class="grid">${p.img.map((n, i) => `<button class="thumb" data-i="${i}"><img src="${IMG(n, "thumb")}" loading="lazy" alt="${p.name} ${i + 1}"><small>${p.id}_${String(i + 1).padStart(2, "0")}.jpg</small></button>`).join("")}</div>`;
    const el = createWin(p.id, `${p.no} ${p.name}`, p.color, html, { w: 820, h: 520, status: `${p.img.length} öğe` });
    el.querySelectorAll(".thumb").forEach(t => t.onclick = () => lightbox(p, +t.dataset.i));
  }
}
function openAbout() {
  const P = PROFILE;
  const html = `<div class="about">
    <img class="ava" src="assets/img/avatar.webp" alt="${P.name}">
    <div>
      <h2>${P.name}</h2><div class="role">${P.title} · ${P.city}</div>
      <p>${P.bio}</p>
      <h3>&gt; EXPERIENCE</h3><ul>${P.experience.map(e => `<li><b>${e[0]}</b>${e[1]}<em>${e[2]}</em></li>`).join("")}</ul>
      <h3>&gt; EDUCATION</h3><ul>${P.education.map(e => `<li><b>${e[0]}</b>${e[1]}</li>`).join("")}</ul>
      <h3>&gt; SKILLS</h3><p>${P.tools}</p><p style="color:#cbb8ea">AI: ${P.ai}</p>
      <h3>&gt; LANGUAGE</h3><p>${P.languages}</p>
      <div class="links">
        <a class="btn" href="mailto:${P.email}">✉ ${P.email}</a>
        <a class="btn alt" href="${P.behance}" target="_blank" rel="noopener">Behance ↗</a>
        <a class="btn alt" href="${P.linkedin}" target="_blank" rel="noopener">LinkedIn ↗</a>
      </div>
    </div></div>`;
  createWin("about", "About_Me.txt", "#b7f36b", html, { w: 780, h: 620 });
}
function openTrash() {
  createWin("trash", "Recycle Bin", "#cdb6ff", `<div class="empty">Çöp kutusu boş.<br>Kötü fikirler burada kalmaz ✿</div>`, { w: 420, h: 260 });
}

/* ---------- LIGHTBOX ---------- */
const lb = $("#lightbox"); let cur = null, idx = 0;
function lightbox(p, i) { cur = p; idx = i; lb.hidden = false; show(); }
function show() {
  $("img", lb).src = IMG(cur.img[idx]);
  $("figcaption", lb).textContent = `${cur.name} — ${idx + 1} / ${cur.img.length}`;
  const one = cur.img.length < 2; $(".lb-prev", lb).hidden = one; $(".lb-next", lb).hidden = one;
  const nx = cur.img[(idx + 1) % cur.img.length]; new Image().src = IMG(nx); // önden yükle
}
const step = d => { idx = (idx + d + cur.img.length) % cur.img.length; show(); };
$(".lb-prev", lb).onclick = e => { e.stopPropagation(); step(-1); };
$(".lb-next", lb).onclick = e => { e.stopPropagation(); step(1); };
$(".lb-close", lb).onclick = () => lb.hidden = true;
lb.onclick = e => { if (e.target === lb) lb.hidden = true; };
let tx = 0; lb.addEventListener("touchstart", e => tx = e.touches[0].clientX, { passive: true });
lb.addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); });
addEventListener("keydown", e => {
  if (!lb.hidden) { if (e.key === "Escape") lb.hidden = true; if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); return; }
  if (e.key === "Escape") { const a = [...wins.keys()].find(k => wins.get(k).el.classList.contains("active")); if (a) close(a); }
});

/* ---------- START MENÜ ---------- */
const sm = $("#startMenu"), sb = $("#startBtn");
$("#smList").innerHTML =
  `<li><button data-o="about"><i style="background:#b7f36b"></i>About Me</button></li><li class="sep"></li>` +
  PROJECTS.map(p => `<li><button data-o="${p.id}"><i style="background:${p.color}"></i>${p.no} · ${p.name}</button></li>`).join("") +
  `<li class="sep"></li><li><a href="${PROFILE.behance}" target="_blank" rel="noopener"><i style="background:#1769ff"></i>Behance ↗</a></li>
   <li><a href="${PROFILE.linkedin}" target="_blank" rel="noopener"><i style="background:#0a66c2"></i>LinkedIn ↗</a></li>
   <li><a href="mailto:${PROFILE.email}"><i style="background:#e815b2"></i>Contact</a></li>`;
const toggleSM = on => { sm.hidden = !on; sb.classList.toggle("on", on); };
sb.onclick = e => { e.stopPropagation(); toggleSM(sm.hidden); };
sm.onclick = e => { const b = e.target.closest("[data-o]"); if (b) { openById(b.dataset.o); toggleSM(false); } };
document.addEventListener("click", e => { if (!sm.hidden && !sm.contains(e.target)) toggleSM(false); });

function openById(id) {
  if (id === "about") return openAbout();
  if (id === "trash") return openTrash();
  const p = PROJECTS.find(x => x.id === id); if (p) openProject(p);
}

/* ---------- SAAT + BOOT ---------- */
const tick = () => $("#clock").textContent = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
tick(); setInterval(tick, 15000);

const boot = $("#boot"); let pct = 0;
const endBoot = () => { boot.classList.add("hide"); setTimeout(() => boot.remove(), 600);
  const h = location.hash.slice(1); if (h) openById(h); else if (!isMobile()) openAbout(); };
if (sessionStorage.getItem("booted")) { boot.remove(); const h = location.hash.slice(1); if (h) openById(h); else if (!isMobile()) openAbout(); }
else {
  sessionStorage.setItem("booted", 1);
  const t = setInterval(() => {
    pct = Math.min(100, pct + Math.ceil(Math.random() * 9));
    $(".boot-bar i").style.width = pct + "%"; $("#bootPct").textContent = pct;
    if (pct >= 100) { clearInterval(t); setTimeout(endBoot, 250); }
  }, 70);
  boot.onclick = () => { clearInterval(t); endBoot(); };
}
})();
