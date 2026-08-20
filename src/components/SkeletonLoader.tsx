export function SkeletonLoader() {
  return (
    <div className="mx-auto w-full max-w-[430px] animate-pulse rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-20 rounded bg-secondary" />
          <div className="h-6 w-40 rounded bg-secondary" />
        </div>
        <div className="h-12 w-16 rounded-lg bg-secondary" />
      </div>
      <div className="mt-4 h-6 w-52 rounded-full bg-secondary" />
      <div className="mt-5 space-y-2">
        <div className="h-4 w-full rounded bg-secondary" />
        <div className="h-4 w-4/5 rounded bg-secondary" />
      </div>
      <div className="mt-6 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-32 rounded bg-secondary" />
            <div className="h-1.5 w-full rounded-full bg-secondary" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 w-24 rounded-full bg-secondary" />
        ))}
      </div>
      <p className="mt-6 text-center text-[12px] text-muted-foreground">
        Toksiklik seviyen hesaplanıyor...
      </p>
    </div>
  );
}
