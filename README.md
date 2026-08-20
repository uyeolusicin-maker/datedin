# Viral Toxicity Score

Build a viral, mobile-first web application named "DatedIn" (Turkish UI) using Next.js (App Router) and Tailwind CSS.

### CRITICAL DESIGN, TYPOGRAPHY & MOBILE MANDATES

To ensure the application looks like a high-end, professionally designed mobile web app (NOT a cheap AI template):

1. Color Palette: white beige . Base background `#09090b` (zinc-950), card containers `#18181b` (zinc-900), subtle hairline borders `border-zinc-800`. Accent color: Crisp Crimson `#f43f5e` or Matte Emerald `#10b981` for flags. NO harsh gradients, NO neon pinks, NO glow orbs.

2. Typography: Clean, highly legible modern geometric sans typography (`font-sans`, default system UI stack like San Francisco / Roboto). Proper line height (`leading-relaxed`), clean hierarchy, readable text contrast. NO Inter/Geist/Space Grotesk gimmicks, NO em-dashes (`—`).

3. Mobile-First Layout: Optimized specifically for mobile viewport screens (375px - 430px). All form wizards and generated cards must be perfectly scaled for mobile screens with touch-friendly buttons (`min-h-[48px]`).

4. Exclusions: DO NOT include "Hakkımda" (Bio) or "Şehir" (City) fields anywhere in the application.

---

### HIGH-TOXICITY DYNAMIC ALGORITHM (`lib/calculateToxicity.js`)

Build an aggressive toxicity calculation engine designed to make almost every user score high (%45 - %99) for maximum comedic and viral impact:

- Base Score: Starts high at 35%.

- Relationship Status Percentage Weights (Maximum impact up to +50%):

  * "Toksik İlişki Bağımlısı": +50%

  * "Karşı Tarafı Terapiye Gönderecek Seviyede Sap": +48%

  * "Eski Sevgili Stalkeri (FBI Seviyesi)": +45%

  * "Love Bombing Mağduru": +42%

  * "Red Flag Koleksiyoncusu": +40%

  * "Işıkları Kapatıp Kafada Kuran": +38%

  * "Situationship Kurbanı", "Ghosting Mağduru": +35%

  * "Aşırı Bağlananlar Derneği Başkanı": +32%

  * "Sürekli 'Biz Şimdi Neyiz?' Diye Soran", "Yara Bandı (Rebound) Adayı": +30%

  * "Flörtöz ama İcraatsız", "Bağlanma Problemli (Avoidant)": +28%

  * "Sadece Arkadaşız Yalanına İnanan", "Instagram Story'sine Göre Yaşayan", "Platoniklikte Master Yapmış": +25%

  * "Kıdemli Sap", "Profesyonel Overthinker": +22%

  * "Friendzone Kıdemli Müdürü", "İlk Buluşmada Nikah Düşünen": +20%

  * "Aşka İnancını Kaybetmiş", "Görünmez Mantıksal Duvarları Olan": +18%

  * "Yalnızlık Sultanı", "Biriyle Tanışmaya Üşenen", "İlişki Yapmak İsteyen Ama Biriyle Konuşmaya Tahammülü Olmayan": +15%

- Skill Percentage Impact: Multiply each selected skill percentage slider by 0.30 and add directly to total score (e.g., four 80% skills add +24% toxicity).

- Flags Impact: Add +8% for EVERY Red Flag. Deduct ONLY -2% for Green Flags (keep toxicity heavily biased upward).

- Final Clamp: Minimum 45%, Maximum 99%.

---

### Application Architecture & User Flow

1. Multi-Step Form Wizard (`components/FormWizard.jsx`):

   - Step 1: Temel Bilgiler

     * Ad / Rumuz (Input)

     * Yaş (Input)

     * İlişki Durumu (Dropdown with 25 options listed in toxicity weights).

   - Step 2: Unvan & Tagline

     * Corporate Headline Input (Placeholder: "Örn: Kırmızı bayrakları halı saha maçına çevirme uzmanı.")

     * Current Role Tagline Input (Placeholder: "Örn: Kendi kafasında kurduğu senaryolarda Oscar ödüllü başrol.")

   - Step 3: Yetenekler & Yüzdeler

     * Multi-select / dropdown of 20 humorous skills. User selects 4 skills and adjusts sliders (%0 - %100).

     * Options: "Stalking (CIA Seviyesi)", "Kafada Kurma (Overthinking)", "Mesaja Geç Dönme", "'Fark Etmez' Diyerek Kriz Çıkarma", "Burçlara Göre Karar Verme", "Eski Sevgiliyle Kıyaslama", "Trip Atma Hızı", "10 Saniyede Aşık Olma", "Ghosting Yeteneği", "Flörtü Arkadaşlara Onaylatma", "Gece 2'de Gelen Mesaja Kanma", "Playlist Hazırlayarak Düşme", "Anında Story Gizleme", "Yanlış Kişiye Bağlanma", "Pasif Agresif İletişim", "Toksiklik Seviyesi", "Fake Hesap (Finsta) Yönetimi", "Date'te Hesabı Ödetmeme Çabası", "İlk Buluşmada Gelecek Planlama", "Sürekli 'Ben Zaten Biliyordum' Hissi".

   - Step 4: Rozetler & Referanslar

     * RED FLAGS (Multi-select, 20 options: "4 saatte bir 'yoğundum' yazar", "Ex'iyle hala kanki", "Sadece gece 12'den sonra aktifleşir", "Bütün eski sevgilileri 'deliymiş'", "Story'sine bakıp mesaja cevap vermez", "Love Bombing yapar", "Grup sohbetine sorarak yazar", "Kedisini/köpeğini manipülasyon kozu yapar", "Garsona kötü davranır", "Insta takip ettiklerinin %90'ı karşı cins", "Burcunu sorup yargılar", "Hesap gelince tuvalete kaçar", "Soğuk yapıp ilgini test eder", "Hesabında hiç kendi fotoğrafı yok", "'Ben ilişki insanı değilim' der", "Konuyu 6 ay öncesine çeker", "Snapchat kullanıyor", "İcraat yok sürekli 'hallederiz' der", "Gaslighting yapar", "Profilinde 'Sapım ama keyfim yerinde' yazar").

     * GREEN FLAGS (Multi-select, 20 options: "Küçük detayları hatırlar", "Terapiye gidiyor", "Müzik zevki mükemmel", "Sorun değil hallederiz der", "Arkadaşlarının yanında seni över", "Açık iletişim kurar", "Geç dönecekse haber verir", "Garsona kibar davranır", "Hesabı paylaşmayı teklif eder", "Sağlıklı ilişkileri var", "Telefona bakmaz seni dinler", "Sevgi dilini öğrenir", "Kendi hobileri var", "Günün nasıl geçti diye sorar", "Sınırlarına saygı duyar", "Seni güldürür", "Çözüm odaklıdır", "Hayvanları sever", "Insta hesabı gizli", "Özür dilemeyi bilir").

     * Referans Cümlesi (Input/Placeholder).

2. Generated Mobile CV Card Component (`components/CvCard.jsx`):

   - Element ID: `cv-card`.

   - Formatted perfectly like a mobile-screen resume (aspect ratio optimized for mobile download/story).

   - Layout: Hairline border (`border border-zinc-800`), `#18181b` card background, clean white typography (`text-zinc-100`).

   - Content Structure:

     * Header: Name, Age, Relationship Status Badge.

     * Prominent Toxicity Score Badge (Calculated % & Comedic Rating Label).

     * Headline & Role Tagline.

     * Skill Progress Bars (4 Selected Skills + Percentages).

     * Red Flags & Green Flags (Clean compact pill badges).

     * Reference Section (Blockquote).

     * Footer Watermark: "DatedIn.app • Parodi Flört Özgeçmişi".

3. Monetization Gate & AdSense (`components/AdModal.jsx` & `components/AdBanner.jsx`):

   - Include static `ads.txt` route at `app/ads.txt/route.js`.

   - AdSense script injection in `app/layout.jsx`.

   - Skeleton Loader (`components/SkeletonLoader.jsx`) for 1.5 seconds on submit.

   - Dark overlay over `#cv-card` with CTA: "DatedIn CV'ni Gör ve Kilit Aç".

   - Popup Modal with 10-second countdown timer (`10..9..8..0`) and responsive `AdBanner` component.

   - Reveal full un-obscured card when timer hits 0.

4. Export & Utility Actions (`components/Actions.jsx`):

   - "Resim Olarak İndir" Button: Uses `html-to-image` (`toPng`) to save `#cv-card` as high-res PNG.

   - "Linki Kopyala" Button: Copies site URL.

5. Footer & Legal (`components/Footer.jsx`):

   - Links/Modals for "Kullanım Şartları" and "Gizlilik Politikası".

   - Disclaimer: "DatedIn eğlence amaçlı oluşturulmuş satirik bir parodi sitesidir. LinkedIn Corporation ile hiçbir bağlantısı yoktur."

### Dependencies

- Next.js (App Router), Tailwind CSS, `html-to-image`. and do this mobile friendly

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://datedin.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/039eeaf6-dc15-4e74-ae24-ed0ae3ab825a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
