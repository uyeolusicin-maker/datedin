import { useState } from "react";
import {
  RELATIONSHIP_STATUSES,
  SKILLS,
  RED_FLAGS,
  GREEN_FLAGS,
  type CvDraft,
} from "@/lib/datedin-data";

const STEPS = ["Temel Bilgiler", "Yetenekler", "Rozetler"];

function StepHeader({ step }: { step: number }) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-secondary"}`}
          />
        ))}
      </div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        Adım {step + 1} / {STEPS.length}
      </p>
      <h2 className="mt-1 text-xl font-semibold leading-relaxed text-foreground">{STEPS[step]}</h2>
    </div>
  );
}

const inputCls =
  "w-full min-h-[48px] rounded-xl border border-border bg-secondary/40 px-4 text-[15px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/70 transition-colors";

function Pill({
  active,
  onClick,
  children,
  tone,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone: "red" | "green" | "neutral";
}) {
  const activeCls =
    tone === "red"
      ? "border-primary/70 bg-primary/15 text-foreground"
      : tone === "green"
        ? "border-success/70 bg-success/15 text-foreground"
        : "border-primary/70 bg-primary/15 text-foreground";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[44px] rounded-full border px-3.5 py-2 text-left text-[13px] leading-snug transition-colors ${
        active ? activeCls : "border-border bg-secondary/30 text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export function FormWizard({ onSubmit }: { onSubmit: (data: CvDraft) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [status, setStatus] = useState(RELATIONSHIP_STATUSES[0]!.label);
  const [skills, setSkills] = useState<{ name: string; value: number }[]>([]);
  const [redFlags, setRedFlags] = useState<string[]>([]);
  const [greenFlags, setGreenFlags] = useState<string[]>([]);
  const [reference, setReference] = useState("");

  const toggle = (list: string[], set: (v: string[]) => void, item: string) =>
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

  const toggleSkill = (s: string) => {
    if (skills.some((x) => x.name === s)) {
      setSkills(skills.filter((x) => x.name !== s));
    } else if (skills.length < 4) {
      setSkills([...skills, { name: s, value: 70 }]);
    }
  };

  const nameError = name.trim().length === 0;
  const skillsRemaining = 4 - skills.length;
  const canNext = step === 0 ? !nameError : step === 1 ? skillsRemaining === 0 : true;

  const next = () => {
    if (step < 2) return setStep(step + 1);
    onSubmit({
      name: name.trim(),
      status,
      skills,
      redFlags,
      greenFlags,
      reference: reference.trim() || "Cidden iyi biri ama mesajlarıma 3 gün sonra dönüyor.",
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <StepHeader step={step} />

      {step === 0 && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">Ad / Lakap</label>
            <input
              className={`${inputCls} ${nameTouched && nameError ? "border-primary/70" : ""}`}
              value={name}
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              placeholder="Örn: Ayşe K."
              aria-invalid={nameTouched && nameError}
            />
            {nameTouched && nameError && (
              <p className="mt-1.5 text-[12px] text-primary">İsim veya lakap girmelisin.</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm text-muted-foreground">İlişki Durumu</label>
            <select
              className={`${inputCls} appearance-none py-3`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {RELATIONSHIP_STATUSES.map((s) => (
                <option key={s.label} value={s.label} className="bg-card">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <p
            className={`text-sm leading-relaxed ${
              skillsRemaining === 0 ? "font-medium text-success" : "text-muted-foreground"
            }`}
          >
            {skillsRemaining === 0
              ? "4/4 seçildi, yüzdeleri ayarlayabilirsin."
              : `${skills.length}/4 seçildi — ${skillsRemaining} tane daha seç.`}
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((s) => (
              <Pill
                key={s}
                tone="neutral"
                active={skills.some((x) => x.name === s)}
                onClick={() => toggleSkill(s)}
              >
                {s}
              </Pill>
            ))}
          </div>
          {skills.length > 0 && (
            <div className="space-y-4 border-t border-border pt-4">
              {skills.map((s, i) => (
                <div key={s.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-foreground">{s.name}</span>
                    <span className="font-semibold text-primary">%{s.value}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={s.value}
                    onChange={(e) => {
                      const copy = [...skills];
                      copy[i] = { ...s, value: Number(e.target.value) };
                      setSkills(copy);
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--primary)]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-primary">Red Flags</h3>
            <div className="flex flex-wrap gap-2">
              {RED_FLAGS.map((f) => (
                <Pill
                  key={f}
                  tone="red"
                  active={redFlags.includes(f)}
                  onClick={() => toggle(redFlags, setRedFlags, f)}
                >
                  {f}
                </Pill>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-success">Green Flags</h3>
            <div className="flex flex-wrap gap-2">
              {GREEN_FLAGS.map((f) => (
                <Pill
                  key={f}
                  tone="green"
                  active={greenFlags.includes(f)}
                  onClick={() => toggle(greenFlags, setGreenFlags, f)}
                >
                  {f}
                </Pill>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted-foreground">Referans Cümlesi</label>
            <textarea
              rows={3}
              maxLength={280}
              className={`${inputCls} py-3 leading-relaxed`}
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Örn: Beraber çalıştık, insan olarak harika ama mesajlara 3 gün sonra dönüyor."
            />
          </div>
        </div>
      )}

      <div className="mt-7 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="min-h-[48px] flex-1 rounded-xl border border-border bg-secondary/40 px-4 text-[15px] font-medium text-foreground transition-colors active:bg-secondary"
          >
            Geri
          </button>
        )}
        <button
          type="button"
          disabled={!canNext}
          onClick={next}
          title={
            !canNext
              ? step === 0
                ? "İsim veya lakap girmelisin"
                : "Devam etmek için 4 yetenek seç"
              : undefined
          }
          className="min-h-[48px] flex-[2] rounded-xl bg-primary px-4 text-[15px] font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
        >
          {step === 2 ? "CV'mi Oluştur" : "Devam"}
        </button>
      </div>
    </div>
  );
}
