import { useState } from "react";
import { toPng, toBlob } from "html-to-image";
import type { CvData } from "@/lib/datedin-data";
import { trackEvent } from "@/lib/analytics";

function absoluteUrl(path: string): string {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

function cardBackground(node: HTMLElement): string {
  const bg = getComputedStyle(node).backgroundColor;
  return bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent" ? bg : "#ffffff";
}

function getCardNode(): HTMLElement | null {
  return document.getElementById("cv-card");
}

async function captureCardPng(): Promise<string | null> {
  const node = getCardNode();
  if (!node) return null;
  return toPng(node, { pixelRatio: 3, cacheBust: true, backgroundColor: cardBackground(node) });
}

async function captureCardBlob(): Promise<Blob | null> {
  const node = getCardNode();
  if (!node) return null;
  return toBlob(node, { pixelRatio: 3, cacheBust: true, backgroundColor: cardBackground(node) });
}

export function Actions({
  data,
  sharePath,
  onReset,
}: {
  data: CvData;
  sharePath: string;
  onReset?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const shareUrl = absoluteUrl(sharePath);
  const shareText = `${data.name} için DatedIn CV'si hazır: %${data.score} toksiklik! Seninkini de çıkar:`;

  const download = async () => {
    setDownloading(true);
    try {
      const dataUrl = await captureCardPng();
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "datedin-cv.png";
      a.click();
      trackEvent("cv_downloaded");
    } finally {
      setDownloading(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    trackEvent("link_copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const share = async () => {
    setSharing(true);
    try {
      const nav = navigator as Navigator & {
        share?: (data: ShareData) => Promise<void>;
        canShare?: (data: ShareData) => boolean;
      };

      if (!nav.share) {
        await copyLink();
        return;
      }

      const blob = await captureCardBlob();
      const file = blob ? new File([blob], "datedin-cv.png", { type: "image/png" }) : null;

      if (file && nav.canShare?.({ files: [file] })) {
        await nav.share({ files: [file], title: "DatedIn CV'm", text: shareText, url: shareUrl });
        trackEvent("cv_shared", { method: "native_files" });
      } else {
        await nav.share({ title: "DatedIn CV'm", text: shareText, url: shareUrl });
        trackEvent("cv_shared", { method: "native_link" });
      }
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") {
        await copyLink();
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="mt-5 space-y-3">
      <button
        type="button"
        onClick={share}
        disabled={sharing}
        className="min-h-[48px] w-full rounded-xl bg-primary text-[15px] font-semibold text-primary-foreground disabled:opacity-50"
      >
        {sharing ? "Hazırlanıyor..." : "CV'ni Paylaş"}
      </button>
      <button
        type="button"
        onClick={download}
        disabled={downloading}
        className="min-h-[48px] w-full rounded-xl border border-border bg-secondary/40 text-[15px] font-medium text-foreground disabled:opacity-50"
      >
        {downloading ? "Hazırlanıyor..." : "Resim Olarak İndir"}
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="min-h-[48px] w-full text-[14px] font-medium text-foreground"
      >
        {copied ? "Kopyalandı" : "Linki Kopyala"}
      </button>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="min-h-[48px] w-full text-[14px] text-muted-foreground"
        >
          Yeniden Oluştur
        </button>
      )}
    </div>
  );
}
