import { type CvData } from "@/lib/datedin-data";
import { toxicityLabel } from "@/lib/calculateToxicity";

export function CvCard({ data }: { data: CvData }) {
  const score = data.score;

  return (
    <div
      id="cv-card"
      className="mx-auto w-full max-w-[430px] overflow-hidden rounded-2xl border border-border bg-card p-5 font-sans text-foreground"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">DatedIn</p>
          <h1 className="mt-1 truncate text-2xl font-bold leading-tight">{data.name}</h1>
        </div>
        <div className="shrink-0 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1 text-right">
          <p className="text-xl font-bold leading-none text-primary">%{score}</p>
          <p className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground">
            Toksiklik
          </p>
        </div>
      </div>

      <p className="mt-3 inline-block rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] leading-relaxed text-muted-foreground">
        {data.status}
      </p>

      <p className="mt-2 text-[11px] font-medium text-primary">{toxicityLabel(score)}</p>

      <div className="mt-5 border-t border-border pt-4">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Yetenekler
        </h2>
        <div className="space-y-2.5">
          {data.skills.map((s) => (
            <div key={s.name}>
              <div className="mb-1 flex items-center justify-between text-[12px]">
                <span className="truncate pr-2">{s.name}</span>
                <span className="font-semibold text-muted-foreground">%{s.value}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${s.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.redFlags.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
            Red Flags
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.redFlags.map((f) => (
              <span
                key={f}
                className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] leading-snug"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.greenFlags.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-success">
            Green Flags
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.greenFlags.map((f) => (
              <span
                key={f}
                className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] leading-snug"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 border-t border-border pt-4">
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Referans
        </h2>
        <blockquote className="border-l-2 border-border pl-3 text-[12.5px] italic leading-relaxed text-muted-foreground">
          {data.reference}
        </blockquote>
      </div>

      <p className="mt-5 border-t border-border pt-3 text-center text-[10px] tracking-wide text-muted-foreground">
        DatedIn.app • Parodi Flört Özgeçmişi
      </p>
    </div>
  );
}
