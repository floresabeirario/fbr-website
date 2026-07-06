"use client";

import Image from "next/image";
import { m } from "framer-motion";
import "./ExploreSquares.css";

export default function ExploreSquares({ items, ariaLabel }) {
  return (
    <section aria-label={ariaLabel}>
      <div className="explore-squares-grid">
        {items.map((item, i) => (
          <m.div
            key={item.href}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <a href={item.href} className="explore-square">
              <Image
                fill
                src={item.img}
                alt=""
                aria-hidden="true"
                className="explore-square-img"
                sizes="(max-width: 640px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <div className="explore-square-overlay">
                <span className="explore-square-label">{item.label}</span>
              </div>
            </a>
          </m.div>
        ))}
      </div>
    </section>
  );
}
