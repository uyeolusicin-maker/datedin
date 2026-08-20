import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, ADSENSE_SLOT, ADSENSE_SLOT_MODAL, ADS_CONFIGURED } from "@/lib/ads";

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

  if (!live) {
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
