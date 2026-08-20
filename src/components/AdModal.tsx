import { useEffect, useState } from "react";
import { AdBanner } from "./AdBanner";

export function AdModal({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/85 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-[430px] rounded-2xl border border-border bg-card p-5">
        <h3 className="text-lg font-semibold leading-relaxed">CV'n hazırlanıyor</h3>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          Kilit açılana kadar birkaç saniye bekle.
        </p>

        <div className="my-5">
          <AdBanner placement="modal" />
        </div>

        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10">
            <span className="text-2xl font-bold text-primary">{count}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={count > 0}
          onClick={onComplete}
          className="min-h-[48px] w-full rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
        >
          {count > 0 ? `Kilit ${count} saniye içinde açılıyor` : "CV'mi Göster"}
        </button>
      </div>
    </div>
  );
}
