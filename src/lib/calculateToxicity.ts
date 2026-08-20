import { RELATIONSHIP_STATUSES, type CvDraft } from "./datedin-data";

const BASE_SCORE = 12;
const STATUS_WEIGHT_FACTOR = 0.9;
const SKILL_AVERAGE_FACTOR = 0.35;
const RED_FLAG_WEIGHT = 6.5;
const GREEN_FLAG_WEIGHT = 4.5;
const JITTER_RANGE = 4;
const MIN_SCORE = 6;
const MAX_SCORE = 99;

function averageSkillValue(skills: CvDraft["skills"]): number {
  if (skills.length === 0) return 0;
  return skills.reduce((sum, s) => sum + s.value, 0) / skills.length;
}

/**
 * Durum ağırlığı + ortalama yetenek yüzdesi + red/green flag sayısına göre
 * bir taban skor üretir, üstüne ±4 puanlık küçük bir "gün ruh hali" varyasyonu
 * ekler. Skor CV oluşturulurken bir kere hesaplanıp CvData.score içine
 * yazılır — paylaşılan kartlar bu değeri kullanır, tekrar hesaplamaz.
 */
export function calculateToxicity(draft: CvDraft): number {
  let score = BASE_SCORE;

  const status = RELATIONSHIP_STATUSES.find((s) => s.label === draft.status);
  if (status) score += status.weight * STATUS_WEIGHT_FACTOR;

  score += averageSkillValue(draft.skills) * SKILL_AVERAGE_FACTOR;
  score += draft.redFlags.length * RED_FLAG_WEIGHT;
  score -= draft.greenFlags.length * GREEN_FLAG_WEIGHT;

  score += (Math.random() * 2 - 1) * JITTER_RANGE;

  return Math.round(Math.min(MAX_SCORE, Math.max(MIN_SCORE, score)));
}

export function toxicityLabel(score: number): string {
  if (score >= 95) return "Efsanevi Toksik: Kaçın Kardeşim";
  if (score >= 88) return "Nükleer Seviye Kırmızı Bayrak";
  if (score >= 80) return "Terapistini Yorar";
  if (score >= 72) return "Yüksek Riskli Yatırım";
  if (score >= 64) return "Kontrollü Kaos";
  if (score >= 56) return "Klasik Kafada Kuran";
  if (score >= 50) return "İdare Eder Ama Dikkat";
  return "Şüpheli Derecede Masum";
}
