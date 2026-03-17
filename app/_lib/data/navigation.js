// app/_lib/data/navigation.js
import { TRACKING_URL } from "../constants";

export const NAV_PRESERVACAO = {
  label: "Preservação de Flores",
  href:  "/preservacao-de-flores",
  items: [
    { name: "Opções e Preços",              href: "/opcoes-e-precos" },
    { name: "Como Funciona",                href: "/como-funciona" },
    { name: "Sustentabilidade",             href: "/sustentabilidade" },
    { name: "Emoldurar Flores Já Secas",   href: "/emoldurar-flores-secas" },
  ],
};

export const NAV_MOMENTOS = {
  label: "Momentos Especiais",
  href:  "/momentos-especiais",
  items: [
    { name: "Bouquet de Noiva",       href: "/preservar-bouquet-noiva" },
    { name: "Homenagem e Luto",       href: "/preservar-flores-luto-homenagem" },
    { name: "Batizado e Nascimento",  href: "/preservar-flores-batizado-nascimento" },
    { name: "Aniversário",            href: "/preservar-flores-aniversario" },
    { name: "Pedido de Casamento",    href: "/preservar-flores-pedido-casamento" },
  ],
};

export const NAV_RIGHT = [
  { name: "Recriação de Bouquet", href: "/recriacao" },
  { name: "FAQ",                  href: "/perguntas-frequentes" },
  { name: "Contactos",            href: "/contactos" },
];

export const FOOTER_LINKS = {
  servicos: [
    { href: "/preservacao-de-flores",  label: "Preservação de Flores" },
    { href: "/opcoes-e-precos",        label: "Opções e Preços" },
    { href: "/como-funciona",          label: "Como Funciona" },
    { href: "/emoldurar-flores-secas", label: "Emoldurar Flores Já Secas" },
    { href: "/recriacao",              label: "Recriação de Bouquet" },
    { href: "/oferecer-preservacao",   label: "Oferecer preservação" },
  ],
  momentos: [
    { href: "/momentos-especiais",                   label: "Momentos Especiais" },
    { href: "/preservar-bouquet-noiva",              label: "Bouquet de Noiva" },
    { href: "/preservar-flores-luto-homenagem",      label: "Homenagem e Luto" },
    { href: "/preservar-flores-batizado-nascimento", label: "Batizado e Nascimento" },
    { href: "/preservar-flores-aniversario",         label: "Aniversário" },
    { href: "/preservar-flores-pedido-casamento",    label: "Pedido de Casamento" },
  ],
  ajuda: [
    { href: "/perguntas-frequentes",             label: "Perguntas Frequentes" },
    { href: "/contactos",                        label: "Contactos e Equipa" },
    { href: TRACKING_URL, label: "Acompanhar Encomenda", external: true },
    { href: "/blog",                             label: "Blog" },
  ],
  legal: [
    { href: "/politica-de-privacidade", label: "Política de Privacidade" },
    { href: "/termos-e-condicoes",      label: "Termos e Condições" },
  ],
};
