import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "./Icon.jsx";
import { waLink } from "../lib/whatsapp.js";

// CTA flutuante: barra inferior no celular, pílula no desktop.
// Some enquanto o botão do topo ou a chamada final estão visíveis, para não repetir.
export default function StickyBooking() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = ["hero-cta", "reservar"].map((id) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window) || targets.length === 0) { setShow(true); return; }
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setShow(visible.size === 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Reserva espaço no fim da página para a barra não cobrir o rodapé no celular */}
      <div className="h-[calc(64px_+_env(safe-area-inset-bottom))] bg-forest-2 sm:hidden" aria-hidden="true" />
      <AnimatePresence>
        {show && (
          <motion.a
            key="book"
            href={waLink()}
            target="_blank"
            rel="noopener"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-40 flex min-h-16 items-center justify-center gap-2.5 bg-wa px-[max(16px,env(safe-area-inset-left))] pb-[env(safe-area-inset-bottom)] text-base font-semibold text-white shadow-[0_-8px_24px_rgb(0_0_0/0.18)] sm:inset-x-auto sm:bottom-[calc(24px_+_env(safe-area-inset-bottom))] sm:right-[max(24px,env(safe-area-inset-right))] sm:min-h-14 sm:rounded-full sm:px-6 sm:shadow-soft"
          >
            <WhatsAppIcon className="size-6" />
            Verificar disponibilidade no WhatsApp
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
