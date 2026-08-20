// Google Analytics 4 ayarları. Kendi ölçüm ID'ni buraya yaz:
// 1. analytics.google.com -> Yönetici -> Veri Akışları -> Web akışı oluştur.
// 2. "G-" ile başlayan Ölçüm Kimliği'ni al ve aşağıya yapıştır.
export const ANALYTICS_MEASUREMENT_ID = "G-XXXXXXXXXX";

export const ANALYTICS_CONFIGURED = ANALYTICS_MEASUREMENT_ID !== "G-XXXXXXXXXX";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/** GA4 script'ini sayfaya bir kere ekler. SSR'da no-op. */
export function loadAnalytics() {
  if (typeof window === "undefined" || !ANALYTICS_CONFIGURED) return;
  if (document.querySelector("script[data-ga4]")) return;

  window.dataLayer = window.dataLayer || [];
  const gtag: GtagFn = (...args) => window.dataLayer!.push(args);
  window.gtag = gtag;
  gtag("js", new Date());
  // Sayfa görüntülemeleri route değişimlerinde elle gönderiliyor (SPA navigasyonu
  // otomatik algılanmadığı için) — bkz. RootComponent'teki router.subscribe.
  gtag("config", ANALYTICS_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.dataset["ga4"] = "true";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Özel olay gönderir (örn. cv_generated, cv_shared). SSR ve analytics kapalıyken no-op. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !ANALYTICS_CONFIGURED || !window.gtag) return;
  window.gtag("event", name, params);
}

/** SPA route değişiminde manuel sayfa görüntüleme olayı gönderir. */
export function trackPageView(path: string) {
  trackEvent("page_view", { page_path: path });
}
