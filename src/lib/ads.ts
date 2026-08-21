// AdSense ayarları. Kendi bilgilerinle değiştir:
// 1. AdSense hesabını aç, siteni ekle ve onay bekle.
// 2. Publisher ID'ni (ca-pub-...) buraya ve public/ads.txt dosyasına yaz.
// 3. AdSense panelinden iki "Görüntülü reklam" birimi oluştur:
//    - Alt banner (responsive yatay) -> ADSENSE_SLOT
//    - Modal içi (300x250 dikdörtgen) -> ADSENSE_SLOT_MODAL
export const ADSENSE_CLIENT: string = "ca-pub-0000000000000000";
export const ADSENSE_SLOT: string = "0000000000";
export const ADSENSE_SLOT_MODAL: string = "0000000000";

export const ADS_CONFIGURED =
  ADSENSE_CLIENT !== "ca-pub-0000000000000000" && ADSENSE_SLOT !== "0000000000";

// Adsterra ayarları. AdSense onaylanana kadar (ya da ona ek olarak) kullanılabilecek,
// onay süreci çok daha hızlı olan bir reklam ağı. Kendi bilgilerinle değiştir:
// 1. adsterra.com'da yayıncı hesabı aç, siteni ekle (genelde aynı gün onaylanır).
// 2. "Banner" reklam birimi oluştur:
//    - Alt banner -> 320x50 boyutunda bir birim -> ADSTERRA_KEY_INLINE
//    - Modal içi -> 300x250 boyutunda bir birim -> ADSTERRA_KEY_MODAL
// 3. Her birim için sana verilen "key" (32 haneli) değerini aşağıya yaz.
export const ADSTERRA_KEY_INLINE: string = "577cf9a6a7ba3e88d42ee1c9df4d28b3";
export const ADSTERRA_KEY_MODAL: string = "5ad578aef97f53d48cce422a8b2a1467";

export const ADSTERRA_CONFIGURED = ADSTERRA_KEY_INLINE !== "0000000000000000000000000000000";
