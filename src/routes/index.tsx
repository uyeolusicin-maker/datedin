import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FormWizard } from "@/components/FormWizard";
import { CvCard } from "@/components/CvCard";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { AdModal } from "@/components/AdModal";
import { AdBanner } from "@/components/AdBanner";
import { Actions } from "@/components/Actions";
import { Footer } from "@/components/Footer";
import type { CvData } from "@/lib/datedin-data";
import { calculateToxicity } from "@/lib/calculateToxicity";
import { buildSharePath } from "@/lib/cv-share";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DatedIn - Parodi Flört Özgeçmişin" },
      {
        name: "description",
        content:
          "Flört hayatını kurumsal bir CV'ye çevir: toksiklik skorun, yeteneklerin, red flag ve green flag rozetlerin tek kartta.",
      },
      { property: "og:title", content: "DatedIn - Parodi Flört Özgeçmişin" },
      {
        property: "og:description",
        content: "Toksiklik skorunu hesapla, flört CV'ni oluştur ve paylaş.",
      },
    ],
  }),
  component: Index,
});

type Phase = "form" | "loading" | "locked" | "ad" | "revealed";

function Index() {
  const [phase, setPhase] = useState<Phase>("form");
  const [data, setData] = useState<CvData | null>(null);

  const sharePath = useMemo(() => (data ? buildSharePath(data) : null), [data]);

  useEffect(() => {
    if (phase !== "loading") return;
    const t = setTimeout(() => setPhase("locked"), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[430px] px-4 pt-8">
        <header className="mb-7 text-center">
          <p className="text-2xl font-bold tracking-tight">
            Dated<span className="text-primary">In</span>
          </p>
          <p className="mx-auto mt-2 max-w-[320px] text-[13px] leading-relaxed text-muted-foreground">
            Flört hayatının kurumsal özgeçmişi. Toksiklik skorunu öğren, kartını paylaş.
          </p>
        </header>

        {phase === "form" && (
          <FormWizard
            onSubmit={(draft) => {
              const cv: CvData = { ...draft, score: calculateToxicity(draft) };
              setData(cv);
              setPhase("loading");
              trackEvent("cv_generated", {
                status: cv.status,
                red_flags: cv.redFlags.length,
                green_flags: cv.greenFlags.length,
                score: cv.score,
              });
            }}
          />
        )}

        {phase === "loading" && <SkeletonLoader />}

        {data && phase !== "form" && phase !== "loading" && (
          <div className="relative">
            <div className={phase === "revealed" ? "" : "pointer-events-none select-none"}>
              <CvCard data={data} />
            </div>

            {phase !== "revealed" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-background/80 px-6 text-center backdrop-blur-md">
                <p className="text-[15px] font-semibold leading-relaxed">CV'n hazır ama kilitli</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  Toksiklik skorunu görmek için kilidi aç.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPhase("ad");
                    trackEvent("ad_started");
                  }}
                  className="mt-5 min-h-[48px] w-full max-w-[300px] rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground"
                >
                  DatedIn CV'ni Gör ve Kilit Aç
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "revealed" && data && sharePath && (
          <Actions
            data={data}
            sharePath={sharePath}
            onReset={() => {
              setData(null);
              setPhase("form");
            }}
          />
        )}

        {phase === "ad" && (
          <AdModal
            onComplete={() => {
              setPhase("revealed");
              trackEvent("cv_unlocked");
            }}
          />
        )}

        <div className="mt-8">
          <AdBanner />
        </div>

        <Footer />
      </div>
    </div>
  );
}
