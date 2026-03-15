"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const rafRef = useRef(null);

  const applyPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition((Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * 100);
  }, []);

  const onMouseDown = useCallback((e) => { isDragging.current = true; e.preventDefault(); }, []);
  const onMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyPosition(e.clientX));
  }, [applyPosition]);
  const onMouseUp = useCallback(() => { isDragging.current = false; }, []);
  const onTouchStart = useCallback(() => { isDragging.current = true; }, []);
  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyPosition(e.touches[0].clientX));
  }, [applyPosition]);
  const onTouchEnd = useCallback(() => { isDragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <div ref={containerRef}
        style={{ position: "relative", width: "100%", maxWidth: "760px", margin: "0 auto", aspectRatio: "4/3", borderRadius: "20px", overflow: "hidden", cursor: "ew-resize", userSelect: "none", WebkitUserSelect: "none", touchAction: "none", boxShadow: "0 24px 64px rgba(30,45,42,0.16)" }}
        onMouseDown={onMouseDown} onTouchStart={onTouchStart}
      >
        <img src="/quadro.webp" alt="Quadro de flores preservadas — depois" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - position}% 0 0)`, willChange: "clip-path" }}>
          <img src="/ramo.webp" alt="Ramo de flores — antes" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} draggable={false} />
        </div>
        <div style={{ position: "absolute", top: "16px", left: "16px", backgroundColor: "rgba(30,45,42,0.72)", color: "#FAF7F0", padding: "5px 14px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", backdropFilter: "blur(6px)", opacity: position > 12 ? 1 : 0, transition: "opacity 0.2s", pointerEvents: "none" }}>Antes</div>
        <div style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: "rgba(61,107,94,0.8)", color: "#FAF7F0", padding: "5px 14px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", backdropFilter: "blur(6px)", opacity: position < 88 ? 1 : 0, transition: "opacity 0.2s", pointerEvents: "none" }}>Depois</div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${position}%`, transform: "translateX(-50%)", width: "2px", background: "rgba(250,247,240,0.9)", pointerEvents: "none", willChange: "left" }} />
        <div style={{ position: "absolute", top: "50%", left: `${position}%`, transform: "translate(-50%, -50%)", width: "46px", height: "46px", borderRadius: "50%", backgroundColor: "#FAF7F0", boxShadow: "0 4px 20px rgba(0,0,0,0.28)", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", willChange: "left" }}>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="#3D6B5E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="0" y1="7" x2="22" y2="7" /><polyline points="5,1 0,7 5,13" /><polyline points="17,1 22,7 17,13" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(0,0,0,0.42)", color: "#FAF7F0", padding: "4px 14px", borderRadius: "50px", fontSize: "0.68rem", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "'Google Sans', Roboto, sans-serif", backdropFilter: "blur(4px)", pointerEvents: "none", whiteSpace: "nowrap" }}>
          Arraste para comparar
        </div>
      </div>
    </motion.div>
  );
}
