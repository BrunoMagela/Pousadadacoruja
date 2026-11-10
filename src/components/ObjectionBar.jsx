import { motion } from "framer-motion";
import { Icon } from "./Icon.jsx";
import { objections } from "../data/pousada.js";

export default function ObjectionBar() {
  return (
    <div className="border-b border-line bg-paper">
      <ul
        aria-label="O que está incluído"
        className="container-site gutter no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto py-5 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:py-7"
      >
        {objections.map((o, i) => (
          <motion.li
            key={o.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className="flex shrink-0 snap-start items-center gap-3 rounded-full border border-line bg-sand/60 py-2 pl-2 pr-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-moss-soft text-moss">
              <Icon name={o.icon} className="size-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-ink">{o.label}</span>
              <span className="text-[0.82rem] text-stone">{o.note}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
