import { useCookieNotice } from "@/lib/consent";

export function CookieConsent() {
  const { seen, ready, acknowledge } = useCookieNotice();

  if (!ready || seen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[30] bg-background/90 px-3 py-1.5 text-center backdrop-blur-sm">
      <p className="inline text-[10px] leading-tight text-muted-foreground">
        Çerezler kullanılır.{" "}
      </p>
      <button
        type="button"
        onClick={acknowledge}
        className="ml-1 inline text-[10px] font-semibold text-primary underline"
      >
        Tamam
      </button>
    </div>
  );
}
