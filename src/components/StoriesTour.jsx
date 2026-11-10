import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon.jsx";
import { SectionHead, WhatsAppButton } from "./ui.jsx";
import { stories } from "../data/pousada.js";

const IMAGE_MS = 5000;

function StoryViewer({ startIndex, onClose }) {
  const [si, setSi] = useState(startIndex); // story
  const [sl, setSl] = useState(0); // slide
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef(null);
  const raf = useRef(0);
  const last = useRef(0);
  const prog = useRef(0);
  const pressAt = useRef(0);
  const closeRef = useRef(null);

  const story = stories[si];
  const slide = story.slides[sl];

  const next = useCallback(() => {
    setProgress(0);
    if (sl < story.slides.length - 1) setSl(sl + 1);
    else if (si < stories.length - 1) { setSi(si + 1); setSl(0); }
    else onClose();
  }, [si, sl, story, onClose]);

  const prev = useCallback(() => {
    setProgress(0);
    if (sl > 0) setSl(sl - 1);
    else if (si > 0) { setSi(si - 1); setSl(stories[si - 1].slides.length - 1); }
  }, [si, sl]);

  // Zera ao trocar de cena
  useEffect(() => { prog.current = 0; setProgress(0); }, [si, sl]);

  // Cronômetro das fotos
  useEffect(() => {
    if (slide.type !== "image" || paused) return;
    last.current = performance.now();
    const tick = (t) => {
      prog.current += (t - last.current) / IMAGE_MS;
      last.current = t;
      if (prog.current >= 1) { next(); return; }
      setProgress(prog.current);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [slide, paused, next]);

  // Toque rápido navega; segurar pausa
  const holdProps = {
    onPointerDown: () => { pressAt.current = Date.now(); setPaused(true); },
    onPointerUp: () => setPaused(false),
    onPointerLeave: () => setPaused(false),
    onPointerCancel: () => setPaused(false),
  };
  const tap = (fn) => {
    const held = pressAt.current && Date.now() - pressAt.current >= 280;
    pressAt.current = 0;
    if (!held) fn();
  };

  // Vídeo: pausa junto com o story
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause(); else v.play().catch(() => {});
  }, [paused, slide]);

  // Teclado, rolagem travada e foco
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [next, prev, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Story: ${story.title}`}
      className="fixed inset-0 z-50 grid place-items-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        key={story.id}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative h-[100svh] w-full overflow-hidden bg-forest sm:h-[min(88svh,820px)] sm:w-auto sm:aspect-[9/16] sm:rounded-[1.75rem]"
      >
        {/* Mídia */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={`${si}-${sl}`} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {slide.type === "video" ? (
              <video
                ref={videoRef}
                src={slide.src}
                poster={slide.poster}
                className="size-full object-cover"
                muted
                playsInline
                autoPlay
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.duration) setProgress(v.currentTime / v.duration);
                }}
                onEnded={next}
              />
            ) : (
              <img src={slide.src} alt={slide.caption} className="size-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75" />

        {/* Barras de progresso */}
        <div className="absolute inset-x-3 top-[calc(env(safe-area-inset-top)_+_12px)] flex gap-1.5">
          {story.slides.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div className="h-full bg-white" style={{ width: `${(i < sl ? 1 : i === sl ? progress : 0) * 100}%` }} />
            </div>
          ))}
        </div>

        {/* Topo */}
        <div className="absolute inset-x-3 top-[calc(env(safe-area-inset-top)_+_28px)] flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <img src={story.cover} alt="" className="size-9 rounded-full object-cover ring-2 ring-honey" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">{story.title}</div>
              <div className="text-xs text-white/70">Pousada da Coruja</div>
            </div>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full bg-black/30 hover:bg-black/50" aria-label="Fechar">
            <Icon name="x" className="size-5" strokeWidth={2.4} />
          </button>
        </div>

        {/* Áreas de toque: esquerda volta, direita avança, segurar pausa */}
        <button type="button" aria-label="Anterior" onClick={() => tap(prev)} {...holdProps} className="absolute bottom-40 left-0 top-24 w-1/3" />
        <button type="button" aria-label="Próximo" onClick={() => tap(next)} {...holdProps} className="absolute bottom-40 right-0 top-24 w-2/3" />

        {/* Legenda + CTA */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 pb-[calc(env(safe-area-inset-bottom)_+_20px)] text-white">
          <AnimatePresence mode="wait">
            <motion.p key={`${si}-${sl}-c`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="font-display text-2xl leading-snug">
              {slide.caption}
            </motion.p>
          </AnimatePresence>
          <WhatsAppButton size="md" className="w-full">Quero me hospedar aqui</WhatsAppButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StoriesTour() {
  const [open, setOpen] = useState(null);
  const [seen, setSeen] = useState([]);
  const openStory = (i) => { setOpen(i); setSeen((s) => [...new Set([...s, stories[i].id])]); };

  return (
    <section id="tour" className="overflow-hidden bg-paper py-20 sm:py-28" aria-labelledby="tour-t">
      <div className="container-site gutter">
        <SectionHead eyebrow="Tour em stories" title={<span id="tour-t">Dê uma volta antes de chegar.</span>}>
          Toque num círculo para ver cada canto da pousada em tela cheia. Toque à direita para avançar, à esquerda para voltar, e segure para pausar.
        </SectionHead>
      </div>

      <ul className="no-scrollbar container-site gutter mt-10 flex snap-x gap-5 overflow-x-auto pb-2 sm:gap-7" aria-label="Stories da pousada">
        {stories.map((s, i) => {
          const wasSeen = seen.includes(s.id);
          return (
            <li key={s.id} className="shrink-0 snap-start">
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openStory(i)}
                className="flex w-[88px] flex-col items-center gap-2.5 sm:w-[104px]"
                aria-label={`Ver story: ${s.title}`}
              >
                <span className={`rounded-full p-[3px] ${wasSeen ? "bg-line" : "bg-[conic-gradient(from_200deg,#E2B23F,#3E6B4C,#E2B23F)]"}`}>
                  <span className="block rounded-full bg-paper p-[3px]">
                    <img src={s.cover} alt="" className="size-[74px] rounded-full object-cover sm:size-[90px]" loading="lazy" />
                  </span>
                </span>
                <span className="text-sm font-semibold text-ink">{s.title}</span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      {/* Prévia grande: os 3 primeiros stories como cards verticais */}
      <div className="container-site gutter mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {stories.slice(0, 3).map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => openStory(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={`group relative aspect-[9/14] overflow-hidden rounded-card text-left ${i === 2 ? "col-span-2 aspect-[16/10] sm:col-span-1 sm:aspect-[9/14]" : ""}`}
          >
            <img src={s.slides.find((x) => x.type === "image")?.src || s.cover} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-forest">
              <Icon name="play" className="size-4" />
            </span>
            <span className="absolute inset-x-4 bottom-4 text-white">
              <span className="block font-display text-2xl">{s.title}</span>
              <span className="text-sm text-white/75">{s.slides.length} {s.slides.length === 1 ? "cena" : "cenas"}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>{open !== null && <StoryViewer startIndex={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
