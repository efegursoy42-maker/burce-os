BURÇE OS — v2
=============
Yerelde açmak: index.html'e çift tıkla (Chrome/Edge).
Yayına almak: bu klasörün İÇİNDEKİLERİ GitHub'a yükle → Commit → Vercel otomatik günceller.

Dosyalar:
  index.html   sayfa iskeleti (noindex + og:image ayarları burada)
  style.css    görünüm + temalar (BurçeOS / XP / Windows 10)
  app.js       pencere sistemi, sağ tık, ikon sürükleme, ses, dil, ekran koruyucu
  data.js      TÜM İÇERİK (TR/EN metinler, projeler, duvar kağıtları)
  404.html     hata sayfası
  robots.txt   arama motoru ayarı
  favicon.*    sekme ikonu
  og.jpg       link paylaşılınca çıkan önizleme görseli
  assets/cv/   CV (aynı adla üstüne yazarak güncelle)
  assets/img/full, thumb   proje görselleri (.webp)
  assets/img/wp            duvar kağıtları (ad.webp + ad_s.webp küçük önizleme)

Yeni duvar kağıdı: assets/img/wp/ içine ad.webp + ad_s.webp koy,
data.js → WALLPAPERS listesine ekle, style.css'e
  [data-wp=ad] #desktop{background-image:url(assets/img/wp/ad.webp)}
satırını ekle.

Domain ile canlıya alırken:
  1) index.html → "noindex" satırını sil
  2) index.html → og:image adresini yeni domain ile değiştir
