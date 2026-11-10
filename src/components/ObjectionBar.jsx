import { motion } from "framer-motion";
import { Icon } from "./Icon.jsx";
import { objections } from "../data/pousada.js";

// Celular: grade 2×2 compacta (o item "Reserva direta" fica só no desktop,
// porque no celular a barra fixa de WhatsApp já cumpre esse papel).
// Desktop: linha única com os 5 itens.
export default function ObjectionBar() {
  return (
    <div className="border-b border-line bg-paper">
      <ul
        aria-label="O que está incluído"
        className="container-site gutter grid grid-cols-2 gap-x-4 gap-y-4 py-5 lg:grid-cols-5 lg:gap-6 lg:py-7"
      >
        {objections.map((o, i) => (
          <motion.li
            key={o.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            className={`flex min-w-0 items-center gap-2.5 lg:gap-3 ${i === objections.length - 1 ? "max-lg:hidden" : ""}`}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-moss-soft text-moss lg:size-10">
              <Icon name={o.icon} className="size-[18px] lg:size-5" />
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[0.92rem] font-semibold text-ink lg:text-base">{o.label}</span>
              <span className="text-[0.76rem] text-stone lg:text-[0.82rem]">{o.note}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
