import { createFileRoute, Link } from "@tanstack/react-router";
import { PRIVACY_TEXT } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/gizlilik")({
  head: () => ({
    meta: [
      { title: "Gizlilik Politikası | DatedIn" },
      { name: "description", content: "DatedIn gizlilik politikası." },
      { property: "og:title", content: "Gizlilik Politikası | DatedIn" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/gizlilik` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[430px] px-4 py-10">
        <Link to="/" className="text-[13px] font-medium text-muted-foreground">
          ← Ana sayfa
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Gizlilik Politikası</h1>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">{PRIVACY_TEXT}</p>
      </div>
    </div>
  );
}
