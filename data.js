/* =========================================================
   BURÇE OS — İÇERİK DOSYASI
   Siteye proje eklemek / görsel değiştirmek için SADECE
   bu dosyayı düzenlemen yeterli.
   - Görseller: assets/img/full/  (büyük, ~1920px, .webp)
                assets/img/thumb/ (küçük önizleme, ~640px)
   - Orijinal dosyalar gelince "img" listesindeki isimleri
     yeni dosya adlarıyla değiştir.
   ========================================================= */

const PROFILE = {
  name: "Burçe Bayar",
  title: "Graphic Designer & Social Media Designer",
  city: "Izmir, Türkiye",
  email: "bburcebayar@gmail.com",
  behance: "https://www.behance.net/burebayar",
  linkedin: "https://www.linkedin.com/in/bur%C3%A7e-bayar-442882402/",
  bio: "I design visual identities and digital content that help brands communicate clearly and consistently. My work combines graphic design, branding, and content creation with a strategic approach. Studying Philosophy has strengthened my analytical thinking and problem-solving skills, allowing me to create thoughtful, purposeful, and visually engaging design solutions.",
  experience: [
    ["2026", "Freelance — Graphic Designer & Social Media Manager", "Collaborated with five brands across graphic design, social media and visual content production, including photo & video shoots."],
    ["2025–2026", "Mustfilm — Intern Graphic Designer", "Social media designs, banners and brand identity projects from concept to final delivery."],
    ["2024–2025", "Freelance — Social Media Manager", "Posts, carousels, banners, Reels covers, visual identities, content planning and PR."]
  ],
  education: [
    ["2022–2026", "Ege University — Philosophy"],
    ["2021–2026", "Anadolu University (AÖF) — Sociology"]
  ],
  tools: "Illustrator · Photoshop · Premiere Pro · InDesign",
  ai: "Nano Banana · Kling · Magnific · ChatGPT · Claude",
  languages: "Turkish (Native) · English (B1)"
};

/* type: "folder"  → galeri penceresi (tıklanınca büyük görsel)
   type: "case"    → vaka çalışması, görseller alt alta akar
   color: klasör rengi */
const PROJECTS = [
  { id: "posts",     no: "01", name: "Instagram Posts", type: "folder", color: "#ff4fb8",
    img: ["s05", "s06"] },
  { id: "reels",     no: "02", name: "Reels Cover",     type: "folder", color: "#b7f36b",
    img: ["s07"] },
  { id: "thumbnail", no: "03", name: "Thumbnail",       type: "folder", color: "#ffa42b",
    img: ["s08"] },
  { id: "photos",    no: "04", name: "Photos",          type: "folder", color: "#9b5cff",
    img: ["s09", "s10"] },
  { id: "toxic",     no: "05", name: "PickYourToxic.exe", type: "case", color: "#ff2e63",
    icon: "toxic", subtitle: "Branding · Fictional cocktail bar",
    intro: "Pick Your Toxic is a fictional cocktail bar where drinks come with personalities. Each cocktail represents a different temptation, mood and character. Characters, menu system, feed and applications.",
    img: ["s11", "s12", "s13", "s14", "s15"] },
  { id: "reshoot",   no: "05", name: "ReShoot.app",     type: "case", color: "#7b2ff7",
    icon: "reshoot", subtitle: "Marketing Graphic Design · for HUBX",
    intro: "Designing a conversion-focused App Store presence for ReShoot: visual direction, app icon, screenshot strategy and A/B testing variables.",
    img: ["s16", "s17", "s18", "s19", "s20"] },
  { id: "posters",   no: "06", name: "Posters",         type: "folder", color: "#ff7a3d",
    img: ["s21"] },
  { id: "pr",        no: "07", name: "PR",              type: "folder", color: "#ff9ad5",
    img: ["s22"] }
];
