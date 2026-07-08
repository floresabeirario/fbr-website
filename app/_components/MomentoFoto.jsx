"use client";
import Image from "next/image";
import { m } from "framer-motion";

// Foto de um trabalho real no corpo das páginas de momentos.
// (Os heroes destas páginas ficam só-texto de propósito.)
export default function MomentoFoto({ src, alt }) {
  return (
    <section className="momento-foto">
      <m.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className="momento-foto-inner"
      >
        <Image fill src={src} alt={alt} sizes="(max-width: 820px) 100vw, 780px" style={{ objectFit: "cover" }} />
      </m.div>
    </section>
  );
}
