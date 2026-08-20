import { createFileRoute, Link } from "@tanstack/react-router";
import { TERMS_TEXT } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/kullanim-sartlari")({
  head: () => ({
    meta: [
      { title: "Kullanım Şartları | DatedIn" },
      { name: "description", content: "DatedIn kullanım şartları." },
      { property: "og:title", content: "Kullanım Şartları | DatedIn" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/kullanim-sartlari` }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[430px] px-4 py-10">
        <Link to="/" className="text-[13px] font-medium text-muted-foreground">
          ← Ana sayfa
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Kullanım Şartları</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{TERMS_TEXT}</p>
      </div>
    </div>
  );
}
