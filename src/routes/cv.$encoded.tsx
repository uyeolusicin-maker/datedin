import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CvCard } from "@/components/CvCard";
import { Actions } from "@/components/Actions";
import { Footer } from "@/components/Footer";
import { decodeCvData, buildSharePath, buildShareUrl } from "@/lib/cv-share";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/cv/$encoded")({
  loader: ({ params }) => {
    const data = decodeCvData(params.encoded);
    if (!data) throw notFound();
    return { data };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { data } = loaderData;
    const title = `${data.name} - %${data.score} Toksiklik | DatedIn`;
    const description = `${data.name}'in DatedIn CV'si: ${data.status}. Toksiklik skoru %${data.score}. Sen de kendi flört CV'ni oluştur ve skorunu öğren.`;
    const url = buildShareUrl(data);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: SharedCv,
  notFoundComponent: NotFoundCv,
});

function NotFoundCv() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center justify-center px-4 text-center">
      <p className="text-xl font-semibold text-foreground">Bu CV bulunamadı</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Link bozuk olabilir ya da CV artık geçerli değil.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground"
      >
        Kendi CV'ni Oluştur
      </Link>
    </div>
  );
}

function SharedCv() {
  const { data } = Route.useLoaderData();
  const sharePath = buildSharePath(data);

  useEffect(() => {
    trackEvent("shared_cv_viewed", { status: data.status, score: data.score });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[430px] px-4 pt-8">
        <header className="mb-7 text-center">
          <p className="text-2xl font-bold tracking-tight">
            Dated<span className="text-primary">In</span>
          </p>
          <p className="mx-auto mt-2 max-w-[320px] text-[13px] leading-relaxed text-muted-foreground">
            {data.name}'in flört CV'si. Sen de kendi toksiklik skorunu öğren.
          </p>
        </header>

        <CvCard data={data} />

        <Actions data={data} sharePath={sharePath} />

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="inline-block min-h-[44px] text-[13px] font-semibold text-primary underline underline-offset-4"
          >
            Kendi CV'ni Oluştur
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
