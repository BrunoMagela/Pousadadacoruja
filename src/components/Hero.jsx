import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppButton, Stars } from "./ui.jsx";
import { Icon } from "./Icon.jsx";
import { rating } from "../data/pousada.js";

const ease = [0.22, 1, 0.36, 1];

function useHeroVideo() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { v.pause(); setPlaying(false); return; }
    v.play().catch(() => setPlaying(false));
  }, []);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  return { ref, playing, toggle };
}

export default function Hero() {
  const { ref, playing, toggle } = useHeroVideo();
  const [progress, setProgress] = useState(0);

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-forest text-sand">
      {/* Fundo: o mesmo vídeo, desfocado no desktop e em tela cheia no celular */}
      <video
        ref={ref}
        className="absolute inset-0 -z-10 size-full object-cover lg:hidden"
        src="/video/hero.mp4"
        poster="/video/hero.jpg"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
      />
      <img src="/video/hero.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-10 hidden size-full scale-110 object-cover opacity-45 blur-2xl lg:block" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/60 via-forest/35 to-forest lg:bg-gradient-to-r lg:from-forest lg:via-forest/80 lg:to-forest/30" />

      <div className="container-site gutter grid min-h-[88svh] items-end gap-10 pb-10 pt-28 lg:min-h-0 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-36">
        <div className="flex max-w-xl flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow inline-flex items-center gap-2 text-honey"
          >
            <Icon name="mountain" className="size-4" /> Matinhos · Litoral do Paraná
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="text-[2.75rem] leading-[0.98] [text-shadow:0_2px_24px_rgb(0_0_0/0.35)] sm:text-6xl lg:text-7xl lg:[text-shadow:none]"
          >
            Acorde com a Serra do Mar no quintal.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.18 }}
            className="text-[1.08rem] leading-relaxed text-sand/85 sm:text-xl"
          >
            8 quartos de frente para um jardim, café da manhã na pousada e um pub bar a poucos passos da sua porta.
          </motion.p>

          <motion.div
            id="hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.28 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <WhatsAppButton className="w-full shadow-soft sm:w-auto" />
            <a href="#estadia" className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 font-semibold text-sand/90 underline-offset-4 hover:underline">
              Monte sua estadia <Icon name="arrow" className="size-4" />
            </a>
          </motion.div>

          <motion.a
            href={rating.url}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 self-start text-sm text-sand/80"
          >
            <span className="font-display text-2xl leading-none text-sand">{rating.score}</span>
            <Stars />
            <span>{rating.count} avaliações no {rating.source}</span>
          </motion.a>
        </div>

        {/* Reel vertical (desktop) */}
        <motion.figure
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="relative hidden justify-self-end lg:block"
        >
          <div className="relative aspect-[9/16] w-[340px] overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
            <video
              className="size-full object-cover"
              src="/video/hero.mp4"
              poster="/video/hero.jpg"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              aria-label="Vídeo do jardim da pousada"
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                if (v.duration) setProgress(v.currentTime / v.duration);
              }}
            />
            <div className="absolute inset-x-3 top-3 h-1 overflow-hidden rounded-full bg-white/25">
              <div className="h-full bg-white" style={{ width: `${progress * 100}%` }} />
            </div>
            <div className="absolute left-3 top-6 flex items-center gap-2 text-sm font-semibold">
              <span className="grid size-8 place-items-center rounded-full bg-forest ring-2 ring-honey">
                <svg viewBox="0 0 40 40" className="size-6" aria-hidden="true"><path d="M8 12 L13 6 L16 11 Q20 9 24 11 L27 6 L32 12 Q35 18 34 25 Q32 35 20 36 Q8 35 6 25 Q5 18 8 12Z" fill="#DCE5D5" /><circle cx="14.5" cy="19" r="5" fill="#E2B23F" /><circle cx="25.5" cy="19" r="5" fill="#E2B23F" /></svg>
              </span>
              Pousada da Coruja
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-sm">
              Uma volta pelo jardim, numa manhã de sol.
            </figcaption>
          </div>
        </motion.figure>
      </div>

      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-black/35 text-white backdrop-blur hover:bg-black/50 lg:hidden"
        aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
      >
        <Icon name={playing ? "pause" : "play"} className="size-4" />
      </button>
    </section>
  );
}
