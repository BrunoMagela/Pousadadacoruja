import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon.jsx";
import { SectionHead, WhatsAppButton } from "./ui.jsx";
import { experiences, reasons } from "../data/pousada.js";

const fmt = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};
const todayISO = () => {
  const t = new Date();
  t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
  return t.toISOString().slice(0, 10);
};
const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const n = Math.round((new Date(b) - new Date(a)) / 86400000);
  return n > 0 ? n : 0;
};

function Step({ n, title, children }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-4 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-forest font-display text-sm text-sand">{n}</span>
        <span className="text-lg font-semibold text-ink">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Counter({ label, hint, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper px-4 py-3">
      <div className="leading-tight">
        <div className="font-semibold text-ink">{label}</div>
        {hint && <div className="text-sm text-stone">{hint}</div>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Menos ${label.toLowerCase()}`} className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink disabled:opacity-35">
          <Icon name="minus" className="size-4" />
        </button>
        <span className="w-6 text-center text-lg font-semibold tabular-nums" aria-live="polite">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`Mais ${label.toLowerCase()}`} className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink disabled:opacity-35">
          <Icon name="plus" className="size-4" />
        </button>
      </div>
    </div>
  );
}

export default function StayBuilder() {
  const [reason, setReason] = useState("casal");
  const [picked, setPicked] = useState(["cafe", "por-do-sol"]);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);

  const r = reasons.find((x) => x.id === reason);
  const chosen = experiences.filter((e) => picked.includes(e.id));
  const nights = nightsBetween(checkin, checkout);
  const datesInvalid = checkin && checkout && nights === 0;

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const chooseReason = (id) => {
    setReason(id);
    if (id === "solo") { setAdults(1); setKids(0); }
    if (id === "casal") { setAdults(2); setKids(0); }
    if (id === "familia" && adults < 2) setAdults(2);
    if (id === "amigos" && adults < 3) setAdults(4);
  };

  const people = `${adults} ${adults === 1 ? "adulto" : "adultos"}${kids ? ` e ${kids} ${kids === 1 ? "criança" : "crianças"}` : ""}`;

  const message = useMemo(() => {
    const lines = [
      `Olá! Montei minha estadia no site da Pousada da Coruja e quero um orçamento.`,
      ``,
      `• Viagem: ${r.label} (${r.title})`,
      `• Hóspedes: ${people}`,
      checkin && checkout && nights > 0
        ? `• Datas: ${fmt(checkin)} a ${fmt(checkout)} (${nights} ${nights === 1 ? "noite" : "noites"})`
        : `• Datas: ainda vou definir`,
      chosen.length ? `• Quero aproveitar: ${chosen.map((c) => c.label.toLowerCase()).join(", ")}` : null,
      ``,
      `Quais quartos estão livres e qual o valor?`,
    ];
    return lines.filter((l) => l !== null).join("\n");
  }, [r, people, checkin, checkout, nights, chosen]);

  return (
    <section id="estadia" className="bg-sand py-20 sm:py-28" aria-labelledby="estadia-t">
      <div className="container-site gutter">
        <SectionHead eyebrow="Criador de estadia" title={<span id="estadia-t">Monte a sua estadia em 30 segundos.</span>}>
          Escolha com quem vem e o que quer viver por aqui. A gente transforma isso numa mensagem pronta e a pousada responde com os quartos livres e o valor exato.
        </SectionHead>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          <div className="flex flex-col gap-10 rounded-card border border-line bg-paper/70 p-5 sm:p-8">
            <Step n="1" title="Com quem você vem?">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Motivo da viagem">
                {reasons.map((x) => {
                  const on = x.id === reason;
                  return (
                    <motion.button
                      key={x.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => chooseReason(x.id)}
                      className={`relative flex min-h-24 flex-col items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-colors ${
                        on ? "border-forest bg-forest text-sand" : "border-line bg-paper text-ink hover:border-stone"
                      }`}
                    >
                      <Icon name={x.icon} className="size-6" />
                      <span className="font-semibold">{x.label}</span>
                      {on && (
                        <motion.span layoutId="reason-dot" className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-honey text-forest">
                          <Icon name="check" className="size-3.5" strokeWidth={3} />
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </Step>

            <Step n="2" title="O que você quer viver aqui?">
              <div className="flex flex-wrap gap-2.5">
                {experiences.map((e) => {
                  const on = picked.includes(e.id);
                  return (
                    <motion.button
                      key={e.id}
                      type="button"
                      aria-pressed={on}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => toggle(e.id)}
                      className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-4 text-[0.95rem] font-medium transition-colors ${
                        on ? "border-moss bg-moss text-white" : "border-line bg-paper text-ink hover:border-stone"
                      }`}
                    >
                      <Icon name={on ? "check" : e.icon} className="size-4" strokeWidth={on ? 2.6 : 1.8} />
                      {e.label}
                    </motion.button>
                  );
                })}
              </div>
            </Step>

            <Step n="3" title="Quando e quantas pessoas?">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-stone">Chegada</span>
                  <input id="checkin" type="date" min={todayISO()} value={checkin} onChange={(e) => setCheckin(e.target.value)} className="min-h-12 w-full rounded-2xl border border-line bg-paper px-4 text-ink" />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-semibold text-stone">Saída</span>
                  <input id="checkout" type="date" min={checkin || todayISO()} value={checkout} onChange={(e) => setCheckout(e.target.value)} className="min-h-12 w-full rounded-2xl border border-line bg-paper px-4 text-ink" />
                </label>
              </div>
              {datesInvalid && <p className="text-sm font-medium text-[#9A3B2E]">A saída precisa ser depois da chegada.</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                <Counter label="Adultos" value={adults} min={1} max={16} onChange={setAdults} />
                <Counter label="Crianças" value={kids} min={0} max={10} onChange={setKids} />
              </div>
            </Step>
          </div>

          {/* Resumo */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div layout className="overflow-hidden rounded-card bg-forest text-sand shadow-soft">
              <div className="relative h-36 overflow-hidden">
                <img src="/img/por-do-sol-800.jpg" alt="" className="size-full object-cover object-[50%_35%] opacity-80" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent" />
                <span className="eyebrow absolute bottom-3 left-6 text-honey">Sua estadia ideal</span>
              </div>
              <div className="flex flex-col gap-5 p-6 pt-3">
                <AnimatePresence mode="wait">
                  <motion.div key={reason} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <h3 className="text-3xl leading-tight">{r.title}</h3>
                    <p className="mt-2 text-sand/70">{r.line}</p>
                  </motion.div>
                </AnimatePresence>

                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white/6 p-3">
                    <dt className="text-sand/60">Hóspedes</dt>
                    <dd className="mt-0.5 font-semibold">{people}</dd>
                  </div>
                  <div className="rounded-xl bg-white/6 p-3">
                    <dt className="text-sand/60">Datas</dt>
                    <dd className="mt-0.5 font-semibold">
                      {nights > 0 ? `${fmt(checkin).slice(0, 5)} a ${fmt(checkout).slice(0, 5)} · ${nights} ${nights === 1 ? "noite" : "noites"}` : "A definir"}
                    </dd>
                  </div>
                </dl>

                <ul className="flex min-h-10 flex-wrap gap-2" aria-label="Experiências escolhidas">
                  <AnimatePresence initial={false}>
                    {chosen.map((c) => (
                      <motion.li key={c.id} layout initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} className="inline-flex items-center gap-1.5 rounded-full bg-honey/15 px-3 py-1.5 text-sm text-honey">
                        <Icon name={c.icon} className="size-3.5" /> {c.label}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                  {chosen.length === 0 && <li className="text-sm text-sand/50">Escolha uma ou mais experiências.</li>}
                </ul>

                <WhatsAppButton message={message} className="w-full" >Pedir orçamento exato no WhatsApp</WhatsAppButton>
                <p className="text-center text-xs text-sand/55">Abre o WhatsApp com a mensagem pronta. Nada é reservado até a pousada confirmar.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
