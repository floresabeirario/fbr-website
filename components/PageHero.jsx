"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import "./PageHero.css";

/**
 * Reusable full-screen hero used across all inner pages.
 *
 * Props:
 *   src             – image src
 *   imgAlt          – image alt text (default "" → decorative)
 *   imgPosition     – CSS object-position (default "center")
 *   imgFetchPriority – "high" | "low" | "auto"
 *   gradient        – overlay gradient string
 *   ariaLabel       – section aria-label
 *   sectionRef      – optional external ref forwarded to <section>
 *   children        – hero text content (always centered)
 */
export default function PageHero({
  src,
  imgAlt = "",
  imgPosition = "center",
  imgFetchPriority,
  gradient,
  ariaLabel,
  sectionRef,
  children,
}) {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.38], [0, 28]);

  return (
    <section
      ref={(node) => {
        heroRef.current = node;
        if (sectionRef) sectionRef.current = node;
      }}
      className="page-hero"
      aria-label={ariaLabel}
    >
      <div aria-hidden="true" className="page-hero-bg">
        <Image
          src={src}
          alt={imgAlt}
          fill
          priority={imgFetchPriority === "high"}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: imgPosition }}
        />
        <div className="page-hero-overlay" style={{ background: gradient }} />
      </div>

      <motion.div
        className="page-hero-text"
        style={{ opacity, y }}
      >
        {children}
      </motion.div>
    </section>
  );
}
