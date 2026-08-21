import { useEffect, useRef } from "react";
import {
  ADSENSE_CLIENT,
  ADSENSE_SLOT,
  ADSENSE_SLOT_MODAL,
  ADS_CONFIGURED,
  ADSTERRA_KEY_INLINE,
  ADSTERRA_KEY_MODAL,
  ADSTERRA_CONFIGURED,
} from "@/lib/ads";

type Placement = "inline" | "modal";

/**
 * Sabit yükseklikli reklam yuvaları (layout shift olmasın diye):
 * - inline (alt banner): mobilde 100px, sm+ 90px
 * - modal: 250px (mobil MPU)
 */
const BOX: Record<Placement, string> = {
  inline: "h-[100px] sm:h-[90px]",
  modal: "h-[250px]",
};

const ADSTERRA_SIZE: Record<Placement, { width: number; height: number }> = {
  inline: { width: 320, height: 50 },
  modal: { width: 300, height: 250 },
};

function adsterraSrcDoc(key: string, size: { width: number; height: number }) {
  return `<!doctype html><html><body style="margin:0;display:flex;align-items:center;justify-content:center;">
    <script>
      atOptions = {
        key: "${key}",
        format: "iframe",
        height: ${size.height},
        width: ${size.width},
        params: {}
      };
    </script>
    <script src="//www.highperformanceformat.com/${key}/invoke.js"></script>
  </body></html>`;
}

function AdsterraBanner({ placement }: { placement: Placement }) {
  const key = placement === "modal" ? ADSTERRA_KEY_MODAL : ADSTERRA_KEY_INLINE;
  const size = ADSTERRA_SIZE[placement];

  return (
    <div className={`flex w-full items-center justify-center overflow-hidden ${BOX[placement]}`}>
      <iframe
        title="Reklam"
        srcDoc={adsterraSrcDoc(key, size)}
        width={size.width}
        height={size.height}
        style={{ border: "none" }}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}

function PlaceholderBanner({ placement }: { placement: Placement }) {
  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-secondary/50 px-4 text-center ${BOX[placement]}`}
    >
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Reklam</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
          Bu alan sponsorlu içerik için ayrılmıştır.
        </p>
      </div>
    </div>
  );
}

export function AdBanner({ placement = "inline" }: { placement?: Placement }) {
  const pushed = useRef(false);
  const slot = placement === "modal" ? ADSENSE_SLOT_MODAL : ADSENSE_SLOT;
  const live = ADS_CONFIGURED;

  useEffect(() => {
    if (!live || pushed.current) return;
    pushed.current = true;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      // reklam bloklayıcı varsa sessizce geç
    }
  }, [live]);

  // Öncelik: AdSense (onaylandıysa) -> Adsterra (onaylandıysa) -> placeholder.
  if (!live) {
    if (ADSTERRA_CONFIGURED) return <AdsterraBanner placement={placement} />;
    return <PlaceholderBanner placement={placement} />;
  }

  return (
    <div className={`w-full overflow-hidden ${BOX[placement]}`}>
      <ins
        className="adsbygoogle block h-full w-full"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={placement === "modal" ? "rectangle" : "horizontal"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
