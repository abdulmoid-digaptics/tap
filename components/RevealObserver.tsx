"use client";

import { useEffect } from "react";

/**
 * Adds gentle reveal-on-scroll to elements marked with `data-reveal`.
 * Content stays visible without JavaScript and for reduced-motion users.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!items.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    // Anything already on screen (or above it) is shown immediately so nothing flashes.
    const vh = window.innerHeight;
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add("is-visible");
    });
    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((el) => {
      if (!el.classList.contains("is-visible")) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
