import { contact } from "../data/pousada.js";

export const DEFAULT_MSG =
  "Olá! Vi o site da Pousada da Coruja e quero verificar a disponibilidade para as datas: ";

export function waLink(message = DEFAULT_MSG) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
