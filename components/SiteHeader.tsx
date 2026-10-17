"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { ArrowRight, Close, Menu } from "./icons";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menu behaviour: lock scroll, focus the first link, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []).concat(
        toggleRef.current ? [toggleRef.current] : [],
      );
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 960px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.menuOpen : ""}`}>
      <span className={styles.progress} data-scroll-progress aria-hidden="true" />
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={`logo-link ${styles.brand}`} aria-label="TapGenieUS home">
          <Logo />
        </a>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="#products" className={`btn btn-primary btn-sm ${styles.cta}`}>
            Explore Products
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close(false) : setOpen(true))}
          >
            {open ? <Close /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className={styles.mobileList}>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => close(false)}>
                  {item.label}
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#products" className="btn btn-primary" onClick={() => close(false)}>
          Explore Products <ArrowRight />
        </a>
      </div>
    </header>
  );
}
