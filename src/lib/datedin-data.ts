export const RELATIONSHIP_STATUSES: { label: string; weight: number }[] = [
  { label: "Toksik İlişki Bağımlısı", weight: 50 },
  { label: "Eski Sevgili Stalkeri (FBI Seviyesi)", weight: 45 },
  { label: "Love Bombing Mağduru", weight: 42 },
  { label: "Red Flag Koleksiyoncusu", weight: 40 },
  { label: "Işıkları Kapatıp Kafada Kuran", weight: 38 },
  { label: "Situationship Kurbanı", weight: 35 },
  { label: "Ghosting Mağduru", weight: 35 },
  { label: "Talking Stage'de Takılıp Kalan", weight: 33 },
  { label: "Aşırı Bağlananlar Derneği Başkanı", weight: 32 },
  { label: "Sürekli 'Biz Şimdi Neyiz?' Diye Soran", weight: 30 },
  { label: "Yara Bandı (Rebound) Adayı", weight: 30 },
  { label: "Flörtöz ama İcraatsız", weight: 28 },
  { label: "Bağlanma Problemli (Avoidant)", weight: 28 },
  { label: "Sadece Arkadaşız Yalanına İnanan", weight: 25 },
  { label: "Instagram Story'sine Göre Yaşayan", weight: 25 },
  { label: "Platoniklikte Master Yapmış", weight: 25 },
  { label: "Profesyonel Overthinker", weight: 22 },
  { label: "Friendzone Kıdemli Müdürü", weight: 20 },
  { label: "İlk Buluşmada Nikah Düşünen", weight: 20 },
  { label: "Aşka İnancını Kaybetmiş", weight: 18 },
  { label: "Yalnızlık Sultanı", weight: 15 },
  { label: "Biriyle Tanışmaya Üşenen", weight: 15 },
  { label: "İlişki Yapmak İsteyen Ama Biriyle Konuşmaya Tahammülü Olmayan", weight: 15 },
  { label: "Dengeli ama Sıkıcı Derecede Normal", weight: 10 },
];

export const SKILLS = [
  "Stalking (CIA Seviyesi)",
  "Kafada Kurma (Overthinking)",
  "Mesaja Geç Dönme",
  "'Fark Etmez' Diyerek Kriz Çıkarma",
  "Burçlara Göre Karar Verme",
  "Eski Sevgiliyle Kıyaslama",
  "Trip Atma Hızı",
  "10 Saniyede Aşık Olma",
  "Ghosting Yeteneği",
  "Flörtü Arkadaşlara Onaylatma",
  "Gece 2'de Gelen Mesaja Kanma",
  "Anında Story Gizleme",
  "Yanlış Kişiye Bağlanma",
  "Pasif Agresif İletişim",
  "Toksiklik Seviyesi",
  "Fake Hesap",
  "Date'te Hesabı Ödetmeme Çabası",
  "İlk Buluşmada Gelecek Planlama",
  "Sürekli 'Ben Zaten Biliyordum' Hissi",
];

export const RED_FLAGS = [
  "4 saatte bir 'yoğundum' yazar",
  "Ex'iyle hala kanki",
  "Sadece gece 12'den sonra aktifleşir",
  "Bütün eski sevgilileri 'deliymiş'",
  "Story'sine bakıp mesaja cevap vermez",
  "Love Bombing yapar",
  "Grup sohbetine sorarak yazar",
  "Insta takip ettiklerinin %90'ı karşı cins",
  "Burcunu sorup yargılar",
  "Soğuk yapıp ilgini test eder",
  "Hesabında hiç kendi fotoğrafı yok",
  "'Ben ilişki insanı değilim' der",
  "Konuyu 6 ay öncesine çeker",
  "Snap Score'u 1 milyondan fazla",
  "Gaslighting yapar",
  "Konumunu asla paylaşmaz",
  "Dışarı çıkarken haber vermez",
  "ChatGPT'ye yazdırdığı belli olan mesajlar atar",
  "Sosyal medyada seni asla paylaşmaz, gizler",
  "Arkadaşlarının yanında senden hiç bahsetmez",
  "Özür dilemeyi bilmez, hep haklı çıkar",
  "Çözüm üretmek yerine sürekli suçlar",
  "Günden güne soğuk ya da sıcak davranır",
  "Aktif olduğu belli ama cevap vermez",
  "Önemli şeyleri unutur",
  "Kendini durmadan över",
  "Telefon şifresini söylemez",
];

export type CvData = {
  name: string;
  status: string;
  skills: { name: string; value: number }[];
  redFlags: string[];
  score: number;
};

/** Form'dan çıkan, henüz skoru hesaplanmamış veri. */
export type CvDraft = Omit<CvData, "score">;
