import { useEffect, useState } from "react";
import { OwlMark } from "./Icon.jsx";
import { waLink } from "../lib/whatsapp.js";

const links = [
  ["#estadia", "Monte sua estadia"],
  ["#tour", "Tour"],
  ["#pub", "Pub"],
  ["#localizacao", "Como chegar"],
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid ? "bg-forest/92 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-site gutter flex h-16 items-center justify-between gap-4 text-sand">
        <a href="#inicio" className="flex items-center gap-2.5 whitespace-nowrap" aria-label="Pousada da Coruja, voltar ao início">
          <OwlMark className="size-9 text-moss-soft" />
          <span className="font-display text-xl leading-none">Pousada da Coruja</span>
        </a>
        <nav aria-label="Seções" className="flex items-center gap-7 text-[0.95rem] font-medium">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hidden py-2 text-sand/75 transition-colors hover:text-sand lg:inline">
              {label}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center rounded-full bg-honey px-4 text-sm font-semibold text-forest transition-colors hover:bg-honey-2"
          >
            Reservar
          </a>
        </nav>
      </div>
    </header>
  );
}
