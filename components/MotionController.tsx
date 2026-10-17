"use client";

import { useEffect } from "react";

/**
 * Keeps the looping product animations cheap: scenes marked `data-anim` pause while they are
 * offscreen (see the `[data-offscreen]` rule in globals.css). Visitors who prefer reduced
 * motion get static frames from CSS, so nothing loops for them.
 */
export function MotionController() {
  useEffect(() => {
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-anim]"));
    if (!scenes.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting);
        });
      },
      { rootMargin: "120px 0px" },
    );
    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, []);

  return null;
}
