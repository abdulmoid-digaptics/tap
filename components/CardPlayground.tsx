"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { people } from "@/content/people";
import { QrGlyph } from "./art";
import { LinkIcon, MailIcon, PhoneIcon, Signal } from "./icons";
import s from "./CardPlayground.module.css";

const finishes = [
  { id: "brand", label: "Brand color" },
  { id: "matte", label: "Matte black" },
  { id: "metal", label: "Brushed metal" },
  { id: "gold", label: "Gold" },
  { id: "holo", label: "Holographic" },
] as const;

type FinishId = (typeof finishes)[number]["id"];

const orbitChips = [
  { label: "NFC tap", icon: <Signal /> },
  { label: "QR scan", icon: <QrGlyph /> },
  { label: "Share link", icon: <LinkIcon /> },
  { label: "Email signature", icon: <MailIcon /> },
  { label: "Text message", icon: <PhoneIcon /> },
];

/**
 * Interactive card: tilts toward the pointer with a glare that follows it, flips on click,
 * and can be restyled by picking an example person and a card finish.
 * Tilt writes CSS variables directly (no re-render per frame).
 */
export function CardPlayground() {
  const [personIndex, setPersonIndex] = useState(0);
  const [finish, setFinish] = useState<FinishId>("brand");
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const person = people[personIndex];

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--ry", `${(x - 0.5) * 26}deg`);
      el.style.setProperty("--rx", `${(0.5 - y) * 20}deg`);
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      el.dataset.active = "";
    });
  };
  const onLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.removeProperty("--ry");
    el.style.removeProperty("--rx");
    delete el.dataset.active;
  };

  const vars = { "--p-bg": person.bg, "--p-fg": person.fg, "--p-accent": person.accent } as CSSProperties;

  return (
    <section className={`section ${s.playground}`} aria-labelledby="play-title">
      <div className={`container ${s.grid}`}>
        <div className={s.copy}>
          <div data-reveal>
            <p className="eyebrow">
              <Signal className={s.eyebrowSignal} />
              Try it
            </p>
            <h2 className="h2" data-split id="play-title">
              Hold it. Tilt it.
              <br />
              Make it yours.
            </h2>
            <p className={`lead ${s.lead}`}>
              Tilt the card with your cursor, tap or click to flip it, then try a different person and finish. Every card
              opens a live profile you can change at any time.
            </p>
          </div>

          <div className={s.controls} data-reveal>
            <fieldset className={s.group}>
              <legend className={s.legend}>Example person</legend>
              <div className={s.people}>
                {people.map((p, index) => (
                  <button
                    key={p.id}
                    type="button"
                    className={s.personBtn}
                    aria-pressed={index === personIndex}
                    aria-label={`${p.name}, ${p.role}`}
                    title={`${p.name} · ${p.role}`}
                    onClick={() => setPersonIndex(index)}
                  >
                    <Image src={p.photo} alt="" fill sizes="96px" />
                  </button>
                ))}
              </div>
              <p className={s.personMeta} aria-live="polite">
                <strong>{person.name}</strong> · {person.role}, {person.company}
              </p>
            </fieldset>

            <fieldset className={s.group}>
              <legend className={s.legend}>Card finish</legend>
              <div className={s.finishes}>
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={s.finishBtn}
                    data-finish={f.id}
                    aria-pressed={finish === f.id}
                    onClick={() => setFinish(f.id)}
                    style={vars}
                  >
                    <span className={s.finishSwatch} />
                    {f.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setFlipped((v) => !v)}>
              {flipped ? "Show the front" : "Flip to the back"}
            </button>
          </div>
        </div>

        <div className={s.stage} data-anim>
          <span className={s.spot} aria-hidden="true" />
          <ul className={s.orbit} aria-hidden="true">
            {orbitChips.map((chip, index) => (
              <li key={chip.label} className={s.chip} style={{ "--i": index } as CSSProperties}>
                <span className={s.chipIcon}>{chip.icon}</span>
                {chip.label}
              </li>
            ))}
          </ul>

          <div className={s.tiltZone} onPointerMove={onMove} onPointerLeave={onLeave}>
            <div ref={tiltRef} className={s.tilt}>
              <button
                type="button"
                className={s.flip}
                data-flipped={flipped || undefined}
                data-finish={finish}
                style={vars}
                onClick={() => setFlipped((v) => !v)}
                aria-label={`Example NFC card for ${person.name}. ${flipped ? "Showing the back." : "Showing the front."} Click to flip.`}
              >
                <span className={`${s.face} ${s.front}`}>
                  <span className={s.glare} />
                  <span className={s.chipMark} />
                  <span className={s.top}>
                    <span className={s.company}>{person.company}</span>
                    <Signal className={s.signal} />
                  </span>
                  <span className={s.main}>
                    <span className={s.photo} key={person.id}>
                      <Image src={person.photo} alt="" fill sizes="160px" />
                    </span>
                    <span className={s.text} key={`${person.id}-t`}>
                      <span className={s.name}>{person.name}</span>
                      <span className={s.role}>{person.role}</span>
                    </span>
                  </span>
                </span>
                <span className={`${s.face} ${s.back}`}>
                  <span className={s.glare} />
                  <span className={s.backRow}>
                    <QrGlyph className={s.qr} />
                    <span className={s.backText}>
                      <span className={s.backTitle}>Tap or scan</span>
                      <span>Hold near a phone to open {person.name.split(" ")[0]}&rsquo;s profile.</span>
                    </span>
                  </span>
                  <span className={s.backFoot}>
                    <Signal className={s.signal} /> NFC inside · No app needed
                  </span>
                </span>
              </button>
            </div>
            <span className={s.shadow} aria-hidden="true" />
          </div>
          <p className={s.hint} aria-hidden="true">
            Move to tilt · Click to flip
          </p>
        </div>
      </div>
    </section>
  );
}
