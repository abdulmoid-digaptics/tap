"use client";

import { useEffect } from "react";

/**
 * Scroll-driven motion with GSAP ScrollTrigger. Elements opt in with data attributes:
 *   data-split           heading words rise out of a line mask (data-split="chars" for letters)
 *   data-pop             icons pop in with a stagger
 *   data-clip            scene opens from an inset clip as it scrolls in (scrubbed, with lag)
 *   data-rise            children rise in one after another
 *   data-parallax="-60"  element drifts on the y axis while it crosses the viewport (scrubbed)
 *   data-tilt            element rotates slightly while it crosses the viewport (scrubbed)
 *   data-drift           a row slides horizontally while it crosses the viewport (scrubbed)
 *   data-team            children deal in one after another
 *   data-scroll-progress reading progress bar
 *
 * Performance: GSAP is loaded only once the browser is idle (it is not part of the first
 * page load), headings are split just before they scroll into view rather than all at
 * once, and anything already on screen at start-up is left as it is (no entrance replay).
 * Nothing runs for visitors who prefer reduced motion; the page is complete without it.
 */
export function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let teardown = () => {};

    const start = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const lag = 1.2; // scrub smoothing: motion trails the scroll slightly
      const all = <T extends HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector));

      // Read every position once, before any writes, to avoid layout thrashing.
      const viewH = window.innerHeight;
      const atTop = window.scrollY < 10;
      const below = new Map<HTMLElement, boolean>();
      const measure = (els: HTMLElement[]) => els.forEach((el) => below.set(el, el.getBoundingClientRect().top > viewH * 0.9));
      const splitEls = all("[data-split]");
      const entranceEls = [...all("[data-pop]"), ...all("[data-rise]"), ...all("[data-team]")];
      const parallaxEls = all("[data-parallax]");
      measure([...splitEls, ...entranceEls, ...parallaxEls]);
      const radii = new Map(all("[data-clip]").map((el) => [el, getComputedStyle(el).borderTopLeftRadius || "0px"]));

      const ctx = gsap.context(() => {
        gsap.to("[data-scroll-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });

        all("[data-pop]").forEach((el, index) => {
          if (!below.get(el)) return;
          gsap.from(el, {
            scale: 0.3,
            rotate: -30,
            opacity: 0,
            duration: 0.8,
            delay: (index % 4) * 0.08,
            ease: "back.out(2.4)",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        radii.forEach((radius, el) => {
          gsap.fromTo(
            el,
            { clipPath: `inset(12% 9% 12% 9% round ${radius})`, scale: 0.94 },
            {
              clipPath: `inset(0% 0% 0% 0% round ${radius})`,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 98%", end: "top 50%", scrub: lag },
            },
          );
        });

        all("[data-rise]").forEach((el) => {
          if (!below.get(el)) return;
          gsap.from(el.children, {
            y: 26,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            clearProps: "transform,opacity", // leave no inline transform behind (it would trap the tile's stretched link)
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });

        parallaxEls.forEach((el) => {
          const distance = Number(el.dataset.parallax) || -50;
          const inFirstScreen = atTop && !below.get(el);
          gsap.fromTo(
            el,
            { y: inFirstScreen ? 0 : -distance / 2 },
            {
              y: inFirstScreen ? distance : distance / 2,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: inFirstScreen ? "top top" : "top bottom",
                end: "bottom top",
                scrub: lag,
              },
            },
          );
        });

        all("[data-tilt]").forEach((el) => {
          gsap.fromTo(
            el,
            { rotation: -8 },
            { rotation: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: lag } },
          );
        });

        all("[data-drift]").forEach((el) => {
          gsap.fromTo(
            el,
            { x: 56 },
            { x: -56, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 } },
          );
        });

        all("[data-team]").forEach((el) => {
          if (!below.get(el)) return;
          gsap.from(el.children, {
            yPercent: 60,
            opacity: 0,
            rotation: -8,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "transform,opacity", // hand the cards back to their CSS offsets
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      });

      // Split headings lazily: just before each one approaches the viewport.
      const splitHeading = (el: HTMLElement) =>
        ctx.add(() => {
          const byChars = el.dataset.split === "chars";
          SplitText.create(el, {
            type: byChars ? "words,chars" : "lines,words",
            mask: byChars ? "words" : "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(byChars ? self.chars : self.words, {
                yPercent: 115,
                rotate: byChars ? 0 : 3,
                duration: byChars ? 0.8 : 1,
                ease: "expo.out",
                stagger: byChars ? 0.016 : 0.05,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              });
            },
          });
        });
      const splitObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            splitObserver.unobserve(entry.target);
            splitHeading(entry.target as HTMLElement);
          });
        },
        { rootMargin: "0px 0px 35% 0px" },
      );
      splitEls.forEach((el) => {
        if (below.get(el)) splitObserver.observe(el);
      });

      teardown = () => {
        splitObserver.disconnect();
        ctx.revert();
      };
    };

    // Keep GSAP out of the first load: start when the browser is idle, and never in the middle
    // of a scroll (ScrollTrigger's first measurement would interrupt a smooth anchor jump).
    let lastScroll = 0;
    let timer = 0;
    const onScroll = () => {
      lastScroll = performance.now();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const startWhenSettled = () => {
      if (cancelled) return;
      const sinceScroll = performance.now() - lastScroll;
      if (sinceScroll < 250) {
        timer = window.setTimeout(startWhenSettled, 250 - sinceScroll + 20);
        return;
      }
      window.removeEventListener("scroll", onScroll);
      void start();
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(startWhenSettled, { timeout: 2000 });

    return () => {
      cancelled = true;
      cancelIdle(handle);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      teardown();
    };
  }, []);

  return null;
}
