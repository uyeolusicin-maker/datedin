/**
 * Skor bandına göre satirik "karakter analizi" cümlesi üretir. toxicityLabel
 * ile aynı eşikleri kullanır, deterministiktir (aynı skor = aynı analiz) —
 * paylaşılan kartlarda tutarlı kalsın diye.
 */
export function characterAnalysis(score: number): string {
  if (score >= 95)
    return "Bilim insanları senin vakanı henüz sınıflandıramadı. Flört hayatın değil, bir laboratuvar deneyi bu.";
  if (score >= 88)
    return "Arkadaş grubunda 'ya bir de şunu duyun' hikayelerinin baş kahramanısın. Herkes tanıyor, kimse şaşırmıyor.";
  if (score >= 80)
    return "Terapistin seni görünce iç çekiyor ama içten içe en sevdiği vaka sensin. Malzeme bol.";
  if (score >= 72)
    return "Riskli ama izlemesi keyifli bir yatırım gibisin. Herkes 'olmaz' diyor, sen yine de deniyorsun.";
  if (score >= 64)
    return "Kontrollü kaos senin doğal halin. Dışarıdan bakan anlamaz ama sen sistemi biliyorsun (sanıyorsun).";
  if (score >= 56)
    return "Klasik kafada kurma vakası. Gönderilmemiş mesajlar klasöründe bir roman birikmiş durumda.";
  if (score >= 50)
    return "İdare eder ama dikkat edilmesi gereken bir profil. Red flag'ler tek tek değil, toplu geliyor.";
  return "Şüpheli derecede masumsun. Ya gerçekten iyisin ya da henüz yakalanmadın.";
}
