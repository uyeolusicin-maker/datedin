// AdSense ayarları. Kendi bilgilerinle değiştir:
// 1. AdSense hesabını aç, siteni ekle ve onay bekle.
// 2. Publisher ID'ni (ca-pub-...) buraya ve public/ads.txt dosyasına yaz.
// 3. AdSense panelinden iki "Görüntülü reklam" birimi oluştur:
//    - Alt banner (responsive yatay) -> ADSENSE_SLOT
//    - Modal içi (300x250 dikdörtgen) -> ADSENSE_SLOT_MODAL
export const ADSENSE_CLIENT = "ca-pub-0000000000000000";
export const ADSENSE_SLOT = "0000000000";
export const ADSENSE_SLOT_MODAL = "0000000000";

export const ADS_CONFIGURED =
  ADSENSE_CLIENT !== "ca-pub-0000000000000000" && ADSENSE_SLOT !== "0000000000";
