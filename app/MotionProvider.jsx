"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";

// LazyMotion + componentes <m.*> (em vez de <motion.*>) carregam só o motor
// de animação necessário (~metade do JS do framer-motion por página).
// domAnimation cobre tudo o que o site usa: animate/exit/variants + hover/tap.
// Se um dia for preciso drag ou animações de layout, trocar por domMax.
export default function MotionProvider({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
