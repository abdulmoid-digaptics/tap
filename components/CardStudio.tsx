"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { NfcCard, Phone, QrGlyph, SignalRings, cardThemes } from "./art";
import { Check, EditIcon, GlobeIcon, LinkIcon, MailIcon, PhoneIcon, Signal } from "./icons";
import mayaPhoto from "@/public/people/maya.webp";
import s from "./CardStudio.module.css";

const studioSteps = [
  {
    number: "01",
    title: "Start with the essentials.",
    text: "Add your name, role and the contact details people ask for most. Your digital card takes shape as you type.",
  },
  {
    number: "02",
    title: "Make it look like you.",
    text: "Pick colors that match your brand, then add the links you want people to visit: your website, socials or a booking page.",
  },
  {
    number: "03",
    title: "Share it however you meet.",
    text: "Tap your NFC card on a compatible phone, show the QR code, or send the link. It opens in their browser, no app needed.",
  },
];

const swatches = [cardThemes.cobalt, cardThemes.tangerine, cardThemes.ink, cardThemes.fuchsia, cardThemes.lime];

const shareOptions = [
  { label: "NFC tap", icon: Signal },
  { label: "QR code", icon: null },
  { label: "Link", icon: LinkIcon },
  { label: "Email", icon: MailIcon },
];

/** The fan of physical cards around the phone. Each card's pose depends on the active step (see CSS). */
const fanCards = [cardThemes.ink, cardThemes.tangerine, cardThemes.cobalt];

/** Illustrative mini app on the phone screen: an editor whose panel changes with the active step. */
function StudioScreen() {
  return (
    <div className={s.screen}>
      <div className={s.appBar}>
        <span className={s.appTitle}>
          <EditIcon /> My card
        </span>
        <span className={s.appBadge}>Live</span>
      </div>

      <div className={s.miniCard}>
        <span className={s.miniCardTop}>
          <span className={s.miniLogo}>N</span>
          <Signal className={s.miniSignal} />
        </span>
        <span className={s.miniPhoto}>
          <Image src={mayaPhoto} alt="" fill sizes="64px" />
        </span>
        <span className={s.miniName}>Maya Reyes</span>
        <span className={s.miniRole}>Studio Lead · Northline</span>
      </div>

      <div className={`${s.panel} ${s.panelFields}`}>
        {[
          { icon: <PhoneIcon />, label: "Phone", value: "(555) 014-2290" },
          { icon: <MailIcon />, label: "Email", value: "maya@northline.studio" },
          { icon: <GlobeIcon />, label: "Website", value: "northline.studio" },
        ].map((field, index) => (
          <span key={field.label} className={s.field} style={{ "--i": index } as CSSProperties}>
            <span className={s.fieldIcon}>{field.icon}</span>
            <span className={s.fieldText}>
              <span>{field.label}</span>
              <span className={s.fieldValue}>{field.value}</span>
            </span>
          </span>
        ))}
      </div>

      <div className={`${s.panel} ${s.panelStyle}`}>
        <span className={s.panelLabel}>Card color</span>
        <span className={s.swatches}>
          {swatches.map((swatch, index) => (
            <span key={swatch.bg} className={s.swatch} style={{ "--sw": swatch.bg, "--i": index } as CSSProperties} />
          ))}
        </span>
        <span className={s.panelLabel}>Links</span>
        <span className={s.chips}>
          {["Website", "LinkedIn", "Book a call"].map((chip, index) => (
            <span key={chip} className={s.chip} style={{ "--i": index } as CSSProperties}>
              <LinkIcon /> {chip}
            </span>
          ))}
        </span>
      </div>

      <div className={`${s.panel} ${s.panelShare}`}>
        <span className={s.qrWrap}>
          <QrGlyph className={s.qr} />
          <span className={s.qrScan} />
        </span>
        <span className={s.shareGrid}>
          {shareOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <span key={option.label} className={s.shareOpt} style={{ "--i": index } as CSSProperties}>
                <span className={s.shareIcon}>{Icon ? <Icon /> : <QrGlyph />}</span>
                {option.label}
              </span>
            );
          })}
        </span>
        <span className={s.toast}>
          <Check /> Profile opened
        </span>
      </div>
    </div>
  );
}

const STEP_MS = 3300;

/**
 * "Watch your card come together": a phone builds a digital card in three steps while physical
 * cards fan around it. Steps advance on their own while the section is on screen (a progress bar
 * shows the time left); every step is also a button that jumps straight to it.
 */
export function CardStudio() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || !autoplay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((n) => (n + 1) % studioSteps.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [active, inView, autoplay]);

  const pick = (index: number) => setActive(index);

  return (
    <section ref={sectionRef} className={`section ${s.studio}`} aria-labelledby="studio-title">
      <div className="container">
        <header className={s.head} data-reveal>
          <div className={s.headTitle}>
            <p className="eyebrow">
              <Signal className={s.eyebrowSignal} />
              Your digital card
            </p>
            <h2 className="h2" data-split id="studio-title">
              Watch your card come together.
            </h2>
          </div>
          <p className="lead">
            Set it up once on your phone. After that, every tap, scan or link opens the same up-to-date profile.
          </p>
        </header>

        <div
          className={s.layout}
          data-step={active}
          data-playing={inView && autoplay ? "" : undefined}
          style={{ "--step-ms": `${STEP_MS}ms` } as CSSProperties}
        >
          <ol className={s.steps}>
            {studioSteps.map((step, index) => (
              <li
                key={step.number}
                className={`${s.step} ${active === index ? s.stepActive : ""}`}
              >
                <button type="button" className={s.stepButton} aria-pressed={active === index} onClick={() => pick(index)}>
                  <span className={s.stepNumber}>{step.number}</span>
                  <span className={s.stepBody}>
                    <span className={s.stepTitle}>{step.title}</span>
                    <span className={s.stepText}>
                      <span>{step.text}</span>
                    </span>
                  </span>
                  <span className={s.stepBar} aria-hidden="true" />
                </button>
              </li>
            ))}
            <li className={s.controlsRow}>
              <button type="button" className={s.pauseBtn} onClick={() => setAutoplay((v) => !v)}>
                <span className={s.pauseIcon} data-paused={autoplay ? undefined : ""} aria-hidden="true" />
                {autoplay ? "Pause" : "Play"} walkthrough
              </button>
            </li>
          </ol>

          <div className={s.stageWrap}>
            <div className={s.stage} data-anim aria-hidden="true">
              <span className={s.glow} />
              <span className={s.orbit} />
              <div className={s.fan}>
                {fanCards.map((theme, index) => (
                  <div key={theme.bg} className={`${s.fanCard} ${s[`fanCard${index}`]}`}>
                    <NfcCard theme={theme} sheenDelay={index * 1.4} />
                  </div>
                ))}
              </div>
              <div className={s.phone}>
                <Phone>
                  <StudioScreen />
                </Phone>
              </div>
              <SignalRings className={s.rings} tone="cobalt" />
              <span className={s.floatTag1}>
                <Check /> Saved to contacts
              </span>
              <span className={s.floatTag2}>No app needed</span>
            </div>
            <p className="sr-only" aria-live="polite">
              Step {active + 1} of {studioSteps.length}: {studioSteps[active].title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
