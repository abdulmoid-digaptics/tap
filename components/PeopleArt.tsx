import Image from "next/image";
import type { CSSProperties } from "react";
import type { Person } from "@/content/people";
import { QrGlyph } from "./art";
import { DownloadIcon, LinkIcon, PinIcon, Signal } from "./icons";
import s from "./PeopleArt.module.css";

const vars = (person: Person) =>
  ({ "--p-bg": person.bg, "--p-fg": person.fg, "--p-accent": person.accent }) as CSSProperties;

/** A digital profile with a portrait, sized for the Phone frame (all sizes in cqw of the phone). */
export function PersonScreen({ person }: { person: Person }) {
  return (
    <div className={s.screen} style={vars(person)}>
      <div className={s.hero}>
        <Image src={person.photo} alt="" fill sizes="(max-width: 600px) 40vw, 220px" className={s.heroImg} />
        <span className={s.heroShade} />
        <span className={s.heroBadge}>
          <Signal /> Tap profile
        </span>
        <span className={s.heroText}>
          <span className={s.name}>{person.name}</span>
          <span className={s.role}>
            {person.role} · {person.company}
          </span>
        </span>
      </div>
      <div className={s.body}>
        <p className={s.bio}>{person.bio}</p>
        <span className={s.city}>
          <PinIcon /> {person.city}
        </span>
        <div className={s.actions}>
          <span className={s.save}>
            <DownloadIcon /> Save contact
          </span>
          <span className={s.swap}>Exchange</span>
        </div>
        <ul className={s.links}>
          {person.links.map((link) => (
            <li key={link}>
              <LinkIcon />
              {link}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** A physical NFC card printed with a portrait. Width comes from the parent. */
export function PhotoCard({ person, className, style }: { person: Person; className?: string; style?: CSSProperties }) {
  return (
    <div className={`${s.card} ${className ?? ""}`} style={{ ...vars(person), ...style }} aria-hidden="true">
      <span className={s.cardSheen} />
      <div className={s.cardFace}>
        <div className={s.cardTop}>
          <span className={s.cardCompany}>{person.company}</span>
          <Signal className={s.cardSignal} />
        </div>
        <div className={s.cardMain}>
          <span className={s.cardPhoto}>
            <Image src={person.photo} alt="" fill sizes="80px" />
          </span>
          <span className={s.cardText}>
            <span className={s.cardName}>{person.name}</span>
            <span className={s.cardRole}>{person.role}</span>
          </span>
          <QrGlyph className={s.cardQr} />
        </div>
      </div>
    </div>
  );
}

/** Small round portrait, e.g. for avatar stacks. */
export function Avatar({ person, className, size = 40 }: { person: Person; className?: string; size?: number }) {
  return (
    <span className={`${s.avatar} ${className ?? ""}`} style={{ width: size, height: size }}>
      <Image src={person.photo} alt="" fill sizes={`${size * 2}px`} />
    </span>
  );
}
