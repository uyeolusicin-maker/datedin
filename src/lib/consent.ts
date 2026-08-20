import { useEffect, useState } from "react";

export const CONSENT_KEY = "datedin-cookie-notice";

const listeners = new Set<(v: boolean) => void>();

export function readNoticeSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "seen";
  } catch {
    return false;
  }
}

export function markNoticeSeen() {
  try {
    window.localStorage.setItem(CONSENT_KEY, "seen");
  } catch {
    // storage kapalıysa sessizce geç
  }
  listeners.forEach((l) => l(true));
}

/** Çerez bilgilendirmesi görüldü mü? SSR'da her zaman false (hydration güvenli). */
export function useCookieNotice() {
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSeen(readNoticeSeen());
    setReady(true);
    const l = (v: boolean) => setSeen(v);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  return { seen, ready, acknowledge: markNoticeSeen };
}
