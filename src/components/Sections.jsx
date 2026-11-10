import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon.jsx";
import { Reveal, SectionHead, Stars, WhatsAppButton } from "./ui.jsx";
import { contact, directPerks, directRows, faq, rating, reviews } from "../data/pousada.js";

/* ---------- Acomodações ---------- */
export function Rooms() {
  return (
    <section id="quartos" className="bg-paper py-20 sm:py-28" aria-labelledby="quartos-t">
      <div className="container-site gutter grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal className="relative">
          <img src="/img/quartos.jpg" srcSet="/img/quartos-800.jpg 800w, /img/quartos.jpg 1280w" sizes="(max-width:1024px) 100vw, 620px" alt="Prédio dos quartos com portas numeradas no térreo, sacada no andar de cima e bancos amarelos no jardim" className="aspect-[4/3] w-full rounded-card object-cover" loading="lazy" width="1280" height="720" />
          <motion.img
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src="/img/corredor-800.jpg"
            alt="Corredor dos quartos ao lado do gramado"
            className="absolute -bottom-8 right-4 hidden aspect-square w-44 rounded-2xl border-4 border-paper object-cover shadow-soft sm:block"
            loading="lazy"
          />
        </Reveal>
        <div className="flex flex-col gap-6">
          <SectionHead eyebrow="Acomodações" title={<span id="quartos-t">8 quartos. Todos de frente para o jardim.</span>}>
            Os quartos ficam no térreo e no andar de cima, com varanda corrida. Você abre a porta e já está no gramado, com a serra no horizonte.
          </SectionHead>
          <Reveal as="ul" className="flex flex-col gap-3" delay={0.1}>
            {["Café da manhã servido na pousada", "Wi‑Fi e estacionamento no local", "Quartos para casais, famílias e grupos"].map((t) => (
              <li key={t} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-honey text-forest"><Icon name="check" className="size-3.5" strokeWidth={3} /></span>
                {t}
              </li>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <WhatsAppButton message="Olá! Quero saber quais quartos estão livres e os valores para as datas: " className="w-full sm:w-auto">Ver quartos livres e valores</WhatsAppButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Jardim ---------- */
const garden = [
  { src: "/img/jardim-serra.jpg", alt: "Jardim com mesa de toalha florida e o morro ao fundo", tag: "Vista para o morro", cls: "col-span-2 row-span-2" },
  { src: "/img/caminho.jpg", alt: "Caminho de placas de concreto na grama até a casa", tag: "A chegada", cls: "row-span-2" },
  { src: "/img/jardim-mesa-800.jpg", alt: "Mesa de mosaico verde no jardim", cls: "" },
  { src: "/img/noite-800.jpg", alt: "Jardim iluminado à noite", tag: "À noite", cls: "" },
];
export function Garden() {
  return (
    <section id="jardim" className="bg-sand py-20 sm:py-28" aria-labelledby="jardim-t">
      <div className="container-site gutter">
        <SectionHead eyebrow="O jardim" title={<span id="jardim-t">O lugar onde o café da manhã vira meio-dia.</span>}>
          Mesas no gramado, bancos coloridos, cogumelos de cerâmica e uma jabuticabeira que, na época certa, fica coberta de fruta.
        </SectionHead>
        <div className="mt-10 grid auto-rows-[clamp(120px,38vw,230px)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {garden.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-card ${g.cls} ${i === 1 ? "max-lg:row-span-2" : ""}`}
            >
              <img src={g.src} alt={g.alt} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              {g.tag && <figcaption className="absolute bottom-3 left-3 rounded-full bg-forest/75 px-3 py-1 text-xs font-semibold text-sand backdrop-blur">{g.tag}</figcaption>}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pub ---------- */
export function Pub() {
  return (
    <section id="pub" className="relative overflow-hidden bg-forest py-20 text-sand sm:py-28" aria-labelledby="pub-t">
      <div className="pointer-events-none absolute -right-40 -top-56 size-[620px] rounded-full bg-[radial-gradient(circle,rgb(226_178_63/0.22),transparent_65%)]" />
      <div className="container-site gutter relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHead tone="dark" eyebrow="Toca da Coruja Pub Bar" title={<span id="pub-t">O fim do dia fica a poucos passos do seu quarto.</span>}>
            Parede de tijolo, banquetas amarelas no balcão, lampiões e cadeira de balanço. Você brinda, conversa, e volta para o quarto atravessando o jardim.
          </SectionHead>
          <Reveal delay={0.1} className="flex flex-wrap items-center gap-4">
            <a href={`https://www.instagram.com/${contact.instagram}/`} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 font-semibold text-honey">
              <Icon name="instagram" className="size-5" /> @{contact.instagram}
            </a>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Reveal className="col-span-2">
            <img src="/img/pub-salao.jpg" srcSet="/img/pub-salao-800.jpg 800w, /img/pub-salao.jpg 1280w" sizes="(max-width:1024px) 100vw, 640px" alt="Salão do pub com parede de tijolos, mesas floridas e balcão com banquetas amarelas" className="aspect-[16/10] w-full rounded-card object-cover" loading="lazy" />
          </Reveal>
          <Reveal delay={0.08}><img src="/img/pub-balcao-800.jpg" alt="Balcão do pub com banquetas amarelas" className="aspect-square w-full rounded-card object-cover" loading="lazy" /></Reveal>
          <Reveal delay={0.16}><img src="/img/janela-bar-800.jpg" alt="Vista do jardim iluminado pela janela do bar" className="aspect-square w-full rounded-card object-cover object-[40%_50%]" loading="lazy" /></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Prova social ---------- */
function ReviewCard({ r, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.6 }}
      className="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col gap-4 rounded-card border border-line bg-paper p-6 sm:w-auto sm:max-w-none"
    >
      <div className="flex items-center gap-3">
        {r.photo ? (
          <img src={r.photo} alt="" className="size-11 rounded-full object-cover" />
        ) : (
          <span className="grid size-11 place-items-center rounded-full bg-moss-soft font-display text-lg text-moss">{r.name[0]}</span>
        )}
        <div className="leading-tight">
          <div className="font-semibold text-ink">{r.name}</div>
          <div className="text-xs text-stone">{r.when}</div>
        </div>
        <span className="ml-auto rounded-full bg-sand px-2.5 py-1 text-[0.7rem] font-semibold text-stone">Avaliação no Google</span>
      </div>
      <Stars />
      <p className="text-ink/90">“{r.text}”</p>
      {r.url && <a href={r.url} target="_blank" rel="noopener" className="mt-auto text-sm font-semibold text-moss underline-offset-4 hover:underline">Ver no Google</a>}
    </motion.article>
  );
}

export function SocialProof() {
  return (
    <section id="avaliacoes" className="bg-sand py-20 sm:py-28" aria-labelledby="aval-t">
      <div className="container-site gutter grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal className="flex flex-col items-start gap-5 rounded-card bg-forest p-8 text-sand sm:p-10">
          <span className="eyebrow text-honey">Quem já ficou aqui</span>
          <div className="flex items-end gap-4">
            <span id="aval-t" className="font-display text-8xl leading-[0.8]">{rating.score}</span>
            <div className="pb-1"><Stars /><div className="mt-1 text-sm text-sand/70">nota no {rating.source}</div></div>
          </div>
          <p className="text-lg text-sand/85">Média de {rating.count} avaliações de hóspedes no Google Maps.</p>
          <a href={rating.url} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-sand/30 px-5 font-semibold hover:border-sand/70">
            Ler as {rating.count} avaliações <Icon name="arrow" className="size-4" />
          </a>
        </Reveal>

        {reviews.length > 0 ? (
          <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
            {reviews.map((r, i) => <ReviewCard key={r.name + i} r={r} i={i} />)}
          </div>
        ) : (
          <Reveal className="flex flex-col gap-4" delay={0.1}>
            <h2 className="text-[2.15rem] leading-[1.02] text-ink sm:text-5xl">Cinco estrelas, de quem já acordou aqui.</h2>
            <p className="text-lg text-stone">As avaliações são públicas no Google Maps. Leia o que os hóspedes contam sobre o jardim, o café e o pub antes de reservar.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- Reserva direta ---------- */
function Cell({ v, strong }) {
  if (v === true) return <span className={`inline-grid size-7 place-items-center rounded-full ${strong ? "bg-honey text-forest" : "bg-moss-soft text-moss"}`}><Icon name="check" className="size-4" strokeWidth={3} /><span className="sr-only">Sim</span></span>;
  if (v === false) return <span className="inline-grid size-7 place-items-center rounded-full bg-sand-2 text-stone"><Icon name="x" className="size-4" strokeWidth={2.6} /><span className="sr-only">Não</span></span>;
  return <span className={`text-sm ${strong ? "font-semibold text-ink" : "text-stone"}`}>{v}</span>;
}

export function DirectBooking() {
  const perks = directPerks.filter((p) => p.enabled);
  return (
    <section id="reserva-direta" className="bg-paper py-20 sm:py-28" aria-labelledby="direta-t">
      <div className="container-site gutter grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHead eyebrow="Reserve direto" title={<span id="direta-t">Fale direto com quem vai te receber.</span>}>
            Reservando pelo WhatsApp você conversa com a própria pousada: tira dúvidas, escolhe o quarto e combina sua chegada antes de fechar.
          </SectionHead>
          {perks.length > 0 && (
            <Reveal as="ul" className="flex flex-wrap gap-2">
              {perks.map((p) => (
                <li key={p.label} className="rounded-full bg-honey/20 px-4 py-2 text-sm font-semibold text-forest">{p.label}</li>
              ))}
            </Reveal>
          )}
          <Reveal delay={0.1}><WhatsAppButton className="w-full sm:w-auto">Reservar direto no WhatsApp</WhatsAppButton></Reveal>
        </div>

        <Reveal delay={0.05} className="overflow-hidden rounded-card border border-line bg-sand/50">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Reserva direta comparada a sites de reserva</caption>
            <thead>
              <tr className="text-sm">
                <th scope="col" className="p-4 font-semibold text-stone sm:p-5"><span className="sr-only">Item</span></th>
                <th scope="col" className="w-[24%] bg-forest px-2 py-4 text-center font-semibold text-sand sm:w-[30%] sm:p-5"><span className="sm:hidden">Direto</span><span className="hidden sm:inline">Direto com a pousada</span></th>
                <th scope="col" className="w-[24%] px-2 py-4 text-center font-semibold text-stone sm:w-[28%] sm:p-5"><span className="sm:hidden">Sites</span><span className="hidden sm:inline">Sites de reserva</span></th>
              </tr>
            </thead>
            <tbody>
              {directRows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="p-4 text-[0.95rem] font-medium leading-snug text-ink sm:p-5">{row.label}</th>
                  <td className="bg-forest/[0.04] px-2 py-4 text-center sm:p-5"><Cell v={row.direct} strong /></td>
                  <td className="px-2 py-4 text-center sm:p-5"><Cell v={row.other} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Localização ---------- */
export function Location() {
  return (
    <section id="localizacao" className="bg-sand py-20 sm:py-28" aria-labelledby="local-t">
      <div className="container-site gutter grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <SectionHead eyebrow="Como chegar" title={<span id="local-t">Em Matinhos, entre a serra e o mar.</span>}>
          A pousada fica numa rua tranquila de Matinhos, no litoral do Paraná, perto do Parque Municipal do Sertãozinho.
        </SectionHead>
        <Reveal delay={0.1} className="flex flex-col gap-6 rounded-card border border-line bg-paper p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-moss-soft text-moss"><Icon name="pin" className="size-6" /></span>
            <div>
              <p className="text-xl font-semibold text-ink">{contact.street}</p>
              <p className="text-stone">{contact.city} · CEP {contact.cep}</p>
              <p className="text-stone">{contact.nearby}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={contact.routeUrl} target="_blank" rel="noopener" className="inline-flex min-h-14 flex-1 items-center justify-center rounded-full bg-forest px-6 font-semibold text-sand hover:bg-forest-2">Traçar rota</a>
            <a href={contact.mapsUrl} target="_blank" rel="noopener" className="inline-flex min-h-14 flex-1 items-center justify-center rounded-full border border-line px-6 font-semibold text-ink hover:border-ink">Abrir no Google Maps</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="duvidas" className="bg-paper py-20 sm:py-28" aria-labelledby="faq-t">
      <div className="container-site gutter grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHead eyebrow="Dúvidas" title={<span id="faq-t">Antes de você perguntar.</span>} />
        <div className="border-t border-line">
          {faq.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className="border-b border-line">
                <h3 className="font-sans text-base">
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-[1.05rem] font-semibold text-ink"
                  >
                    {f.q}
                    <motion.span animate={{ rotate: on ? 45 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full bg-moss-soft text-moss">
                      <Icon name="plus" className="size-4" strokeWidth={2.4} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="max-w-xl pb-5 text-stone">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Chamada final + rodapé ---------- */
export function FinalCTA() {
  return (
    <section id="reservar" className="relative isolate overflow-hidden bg-forest text-sand" aria-labelledby="cta-t">
      <img src="/img/por-do-sol-800.jpg" alt="" className="absolute inset-0 -z-10 size-full object-cover opacity-35" loading="lazy" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/80 to-forest/40" />
      <div className="container-site gutter flex flex-col items-start gap-6 py-24 sm:py-32">
        <Reveal as="h2" className="max-w-3xl text-[2.6rem] leading-[1] sm:text-6xl"><span id="cta-t">Sua vaga no jardim está a uma mensagem.</span></Reveal>
        <Reveal as="p" delay={0.08} className="max-w-xl text-lg text-sand/80">Mande as datas pelo WhatsApp e receba os quartos livres e o valor direto da pousada.</Reveal>
        <Reveal delay={0.15} className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
          <WhatsAppButton className="w-full sm:w-auto" />
          <a href={`tel:${contact.phoneTel}`} className="inline-flex min-h-12 items-center justify-center gap-2 font-semibold text-sand/90">
            <Icon name="phone" className="size-5" /> {contact.phoneDisplay}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-2 py-8 text-sm text-sand/65">
      <div className="container-site gutter flex flex-col gap-2 sm:flex-row sm:justify-between">
        <span>© Pousada da Coruja · {contact.street}, Matinhos – PR</span>
        <a href={`https://www.instagram.com/${contact.instagram}/`} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center hover:text-sand">Instagram @{contact.instagram}</a>
      </div>
    </footer>
  );
}
