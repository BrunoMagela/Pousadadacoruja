import { motion } from "framer-motion";
import { WhatsAppIcon } from "./Icon.jsx";
import { waLink } from "../lib/whatsapp.js";

const ease = [0.22, 1, 0.36, 1];

// Entra suave ao rolar. O conteúdo já nasce visível (opacity .001 só durante a animação).
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </M>
  );
}

export function SectionHead({ eyebrow, title, children, tone = "light", className = "" }) {
  const dark = tone === "dark";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${className}`}>
      <span className={`eyebrow ${dark ? "text-honey" : "text-moss"}`}>{eyebrow}</span>
      <h2 className={`text-[2.15rem] leading-[1.02] sm:text-5xl ${dark ? "text-sand" : "text-ink"}`}>{title}</h2>
      {children && <p className={`text-[1.05rem] leading-relaxed sm:text-lg ${dark ? "text-sand/70" : "text-stone"}`}>{children}</p>}
    </Reveal>
  );
}

export function WhatsAppButton({ children = (<><span className="sm:hidden">Verificar disponibilidade</span><span className="hidden sm:inline">Verificar disponibilidade no WhatsApp</span></>), message, className = "", variant = "honey", size = "lg" }) {
  const styles = {
    honey: "bg-honey text-forest hover:bg-honey-2",
    wa: "bg-wa text-white hover:brightness-110",
    ghost: "border border-current/25 text-current hover:border-current/60",
  };
  const sizes = { lg: "min-h-14 px-6 text-base", md: "min-h-12 px-5 text-[0.95rem]" };
  return (
    <motion.a
      whileTap={{ scale: 0.97 }}
      href={waLink(message)}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-semibold sm:whitespace-nowrap transition-colors ${styles[variant]} ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      <span>{children}</span>
    </motion.a>
  );
}

export function Stars({ className = "text-honey" }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4" aria-hidden="true"><path fill="currentColor" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" /></svg>
      ))}
    </span>
  );
}
