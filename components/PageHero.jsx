"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "./PageHero.css";

/**
 * Reusable full-screen photo hero used across 5+ pages.
 *
 * Props:
 *   src             – image src
 *   imgAlt          – image alt text (default "" → decorative)
 *   imgPosition     – CSS object-position (default "center")
 *   imgFetchPriority – "high" | "low" | "auto"
 *   gradient        – overlay gradient string
 *   centered        – if true, aligns content to center (default: flex-end)
 *   ariaLabel       – section aria-label
 *   textPadding     – optional padding override for the text wrapper
 *   textStyle       – optional extra style for the text wrapper (e.g. opacity MotionValue)
 *   sectionRef      – optional ref for the <section> (e.g. for useScroll target)
 *   children        – hero text content
 */
export default function PageHero({
  src,
  imgAlt = "",
  imgPosition = "center",
  imgFetchPriority,
  gradient,
  centered = false,
  ariaLabel,
  textPadding,
  textStyle,
  sectionRef,
  children,
}) {
  return (
    <section
      ref={sectionRef}
      className={`page-hero${centered ? " page-hero--centered" : ""}`}
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
        style={{ padding: textPadding || undefined, ...textStyle }}
      >
        {children}
      </motion.div>
    </section>
  );
}
