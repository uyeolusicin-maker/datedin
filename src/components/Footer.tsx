import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border pt-6 pb-10 text-center">
      <div className="flex items-center justify-center gap-5 text-[13px] text-muted-foreground">
        <Link to="/kullanim-sartlari" className="min-h-[44px]">
          Kullanım Şartları
        </Link>
        <span className="h-1 w-1 rounded-full bg-border" />
        <Link to="/gizlilik" className="min-h-[44px]">
          Gizlilik Politikası
        </Link>
      </div>
      <p className="mx-auto mt-3 max-w-[380px] text-[11px] leading-relaxed text-muted-foreground">
        DatedIn eğlence amaçlı oluşturulmuş satirik bir parodi sitesidir. LinkedIn Corporation ile
        hiçbir bağlantısı yoktur.
      </p>
    </footer>
  );
}
