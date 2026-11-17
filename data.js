/* =========================================================
   BURÇE OS — İÇERİK DOSYASI
   Siteye proje eklemek / metin değiştirmek için SADECE bu
   dosyayı düzenlemen yeterli. Çevrilen metinler { en, tr }.
   - Görseller: assets/img/full/  (büyük, ~1920px, .webp)
                assets/img/thumb/ (küçük önizleme, ~640px)
   - Duvar kağıtları: assets/img/wp/  (ad.webp + ad_s.webp)
   - CV: assets/cv/Burce-Bayar-CV.pdf (aynı adla üstüne yaz)
   - Pick Your Toxic mini sitesi: pyt/ klasörü (içeriği pyt/pyt.js'te)
   - YouTube: aşağıdaki CHANNELS + VIDEOS listeleri
   - Instagram: aşağıdaki INSTA (postlar assets/img/ig/ içinde, 4:5)
   ========================================================= */

const PROFILE = {
  name: "Burçe Bayar",
  title: { en: "Graphic Designer & Social Media Manager", tr: "Grafik Tasarımcı & Sosyal Medya Yöneticisi" },
  city: { en: "Izmir, Türkiye", tr: "İzmir, Türkiye" },
  email: "bburcebayar@gmail.com",
  behance: "https://www.behance.net/burebayar",
  linkedin: "https://www.linkedin.com/in/bur%C3%A7e-bayar-442882402/",
  cv: "assets/cv/Burce-Bayar-CV.pdf",
  bio: {
    en: "I design visual identities and digital content that help brands communicate clearly and consistently. My work combines graphic design, branding, and content creation with a strategic approach. Studying Philosophy has strengthened my analytical thinking and problem-solving skills, allowing me to create thoughtful, purposeful, and visually engaging design solutions.",
    tr: "Markaların net ve tutarlı iletişim kurmasına yardımcı olan görsel kimlikler ve dijital içerikler tasarlıyorum. İşlerimde grafik tasarım, marka kimliği ve içerik üretimini stratejik bir yaklaşımla birleştiriyorum. Felsefe eğitimim analitik düşünme ve problem çözme becerilerimi güçlendirdi; bu da düşünülmüş, amaca yönelik ve görsel olarak etkileyici tasarımlar üretmemi sağlıyor."
  },
  experience: [
    { date: { en: "Jun 2026 – Sep 2026", tr: "Haz 2026 – Eyl 2026" },
      role: { en: "Freelance — Graphic Designer & Social Media Manager", tr: "Freelance — Grafik Tasarımcı & Sosyal Medya Yöneticisi" },
      text: { en: "Social media content, ad creatives and marketing materials; brand identities; promotional videos from concept to delivery; AI-assisted creative content.",
              tr: "Sosyal medya içerikleri, reklam kreatifleri ve pazarlama materyalleri; marka kimlikleri; konseptten teslime tanıtım videoları; yapay zekâ destekli kreatif içerik." } },
    { date: { en: "Jul 2025 – May 2026", tr: "Tem 2025 – May 2026" },
      role: { en: "Mustfilm — Graphic Design Intern", tr: "Mustfilm — Stajyer Grafik Tasarımcı" },
      text: { en: "Social media graphics, banners and branded assets; brand identity and digital marketing projects with the creative team.",
              tr: "Sosyal medya görselleri, banner'lar ve marka materyalleri; kreatif ekiple marka kimliği ve dijital pazarlama projeleri." } },
    { date: { en: "2024 – 2026", tr: "2024 – 2026" },
      role: { en: "Freelance — Graphic Designer & Social Media Manager", tr: "Freelance — Grafik Tasarımcı & Sosyal Medya Yöneticisi" },
      text: { en: "Social media and visual communication for a brand: posts, carousels, banners, Reels covers and content calendars.",
              tr: "Bir markanın sosyal medya ve görsel iletişimi: postlar, carousel'ler, banner'lar, Reels kapakları ve içerik takvimleri." } }
  ],
  education: [
    { date: "2022 – 2026", text: { en: "Ege University — Philosophy", tr: "Ege Üniversitesi — Felsefe" } },
    { date: { en: "2022 – Present", tr: "2022 – Devam" }, text: { en: "Anadolu University (AÖF) — Sociology", tr: "Anadolu Üniversitesi (AÖF) — Sosyoloji" } }
  ],
  skills: { en: "Branding · Social Media Design · Content Creation · Video Editing · AI Content Creation",
            tr: "Marka Kimliği · Sosyal Medya Tasarımı · İçerik Üretimi · Video Kurgu · Yapay Zekâ ile İçerik Üretimi" },
  tools: "Illustrator · Photoshop · Premiere Pro · InDesign",
  ai: "Nano Banana · Kling · Magnific · ChatGPT · Claude",
  languages: { en: "Turkish (Native) · English (B1)", tr: "Türkçe (Ana dil) · İngilizce (B1)" }
};

/* type: "folder" → galeri penceresi | type: "case" → vaka çalışması
   custom: "toxic" → PickYourToxic | "video" → YouTube | "insta" → Instagram */
const PROJECTS = [
  { id: "posts",     no: "01", name: "Instagram",       type: "case", custom: "insta", color: "#E1306C", icon: "insta", img: [] },
  { id: "reels",     no: "02", name: "Reels Cover",     type: "folder", color: "#b7f36b", img: ["s07"] },
  { id: "thumbnail", no: "03", name: "YouTube",         type: "case", custom: "video", color: "#ff3b3b", icon: "video", img: [] },
  { id: "photos",    no: "04", name: "Photos",          type: "folder", color: "#9b5cff", img: ["s09", "s10"] },
  { id: "toxic",     no: "05", name: "PickYourToxic.exe", type: "case", custom: "toxic", color: "#E34678", icon: "toxic",
    img: ["pyt_about", "pyt_chars1", "pyt_chars2", "pyt_menusystem", "pyt_menuspread", "pyt_apps", "pyt_feed"] },
  { id: "reshoot",   no: "05", name: "ReShoot.app", type: "case", color: "#7b2ff7", icon: "reshoot",
    subtitle: { en: "Marketing Graphic Design · for HUBX", tr: "Pazarlama Grafik Tasarımı · HUBX için" },
    intro: { en: "Designing a conversion-focused App Store presence for ReShoot: visual direction, app icon, screenshot strategy and A/B testing variables.",
             tr: "ReShoot için dönüşüm odaklı bir App Store vitrini: görsel yön, uygulama ikonu, ekran görüntüsü stratejisi ve A/B test değişkenleri." },
    img: ["s16", "s17", "s18", "s19", "s20"] },
  { id: "posters",   no: "06", name: "Posters", type: "folder", color: "#ff7a3d", img: ["s21"] },
  { id: "pr",        no: "07", name: "PR",      type: "folder", color: "#ff9ad5", img: ["s22"] }
];

/* ---------- PICK YOUR TOXIC vaka çalışması ---------- */
const PYT = {
  site: "pyt/index.html",
  url: "pickurtoxic.bar",
  subtitle: { en: "Branding · Fictional cocktail bar · 2026", tr: "Marka Kimliği · Kurgusal kokteyl barı · 2026" },
  intro: {
    en: "Pick Your Toxic is a fictional cocktail bar where drinks come with personalities. Each cocktail represents a different temptation, mood and character — so the menu is built like a personality catalog. Logo, characters, menu system, applications, social feed and website.",
    tr: "Pick Your Toxic, içeceklerin kişilik taşıdığı kurgusal bir kokteyl barı. Her kokteyl farklı bir cazibeyi, ruh halini ve karakteri temsil ediyor; bu yüzden menü bir kişilik kataloğu gibi kurgulandı. Logo, karakterler, menü sistemi, uygulamalar, sosyal medya akışı ve web sitesi."
  },
  characters: [
    { img: "eros", full: "pyt_ch_eros", name: "Childish Eros", cat: "Sweet Talkers", color: "#E07D91",
      line: { en: "Sweet, emotional and dangerously charming.", tr: "Tatlı, duygusal ve tehlikeli derecede çekici." } },
    { img: "vixen", full: "pyt_ch_vixen", name: "Gabriela Vixen", cat: "Red Flags", color: "#E0480E",
      line: { en: "Bold, spicy and impossible to ignore.", tr: "Cesur, acı ve görmezden gelinemez." } },
    { img: "violetta", full: "pyt_ch_violetta", name: "Violetta Vice", cat: "After Midnight", color: "#B14C89",
      line: { en: "Elegant, mysterious and slightly addictive.", tr: "Zarif, gizemli ve biraz bağımlılık yapıcı." } },
    { img: "envy", full: "pyt_ch_envy", name: "Green Envy", cat: "Green Envy", color: "#AB9519",
      line: { en: "Funny, greedy and always wanting more.", tr: "Komik, açgözlü ve hep daha fazlasını isteyen." } }
  ],
  colors: [
    ["Toxic Pink", "#E34678"], ["Devil Orange", "#E0480E"], ["Envy Green", "#AB9519"],
    ["Midnight Black", "#10100F"], ["Lavender Haze", "#B14C89"]
  ],
  fonts: [
    ["Headline", "Heading Now"], ["Body", "Nimbus Sans Bold Condensed"]
  ]
};

/* ---------- YOUTUBE (thumbnail'lar) ----------
   Yeni thumbnail: assets/img/full/ad.webp (1280×720) + assets/img/thumb/ad.webp (640×360),
   sonra VIDEOS listesine bir satır ekle. Kanal logosu: assets/img/ch/ad.webp (kare) */
const CHANNELS = {
  klinikkafa:    { name: "Klinik Kafa",       avatar: "klinikkafa" },
  bendebihalvar: { name: "Bende Bi' Hal Var", avatar: "bendebihalvar" },
  biarkadas:     { name: "Bi Arkadaş İçin",   avatar: "biarkadas" }
};
const VIDEOS = [
  { img: "yt_tukenir",    ch: "bendebihalvar", dur: "38:24", title: "İnsan Neden Tükenir? | Uzman Psikolog Buse Özdede" },
  { img: "yt_uyku",       ch: "klinikkafa",    dur: "47:12", title: "Sizden Gelen Sorular! 5 Saat Uykuyla Beyin Formatlanır mı?" },
  { img: "yt_biarkadas",  ch: "biarkadas",     dur: "21:56", title: "Vitaminlerin Erektil Fonksiyonda Rolü Var mı?" },
  { img: "yt_idrar",      ch: "klinikkafa",    dur: "52:40", title: "Sizden Gelen Sorular! İdrar Rengi, Tuvalet Sıklığı" }
];

/* ---------- INSTAGRAM ----------
   Postlar: assets/img/ig/p01.webp, p02.webp … (4:5, feed'deki sırasıyla).
   Yeni post eklemek için dosyayı koy ve "posts" sayısını artır.
   Reels kapakları gelince "reels" listesine eklenecek. */
const INSTA = {
  handle: "posts.and.reels",
  name: "Social Media Design",
  bio: { en: "Selected posts designed by Burçe Bayar ✿", tr: "Burçe Bayar'ın tasarladığı seçili postlar ✿" },
  posts: 33,
  reels: []
};

/* Duvar kağıtları — theme: "burce" | "xp" | "win10" */
const WALLPAPERS = [
  { id: "burce", name: "BurçeOS",           theme: "burce" },
  { id: "bliss", name: "Bliss (XP)",        theme: "xp" },
  { id: "win10", name: "Windows 10 Hero",   theme: "win10" },
  { id: "cave",  name: "Cave (Spotlight)",  theme: "win10" }
];
