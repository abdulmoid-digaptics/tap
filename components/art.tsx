import { useId, type CSSProperties, type ReactNode } from "react";
import styles from "./art.module.css";
import p from "./productArt.module.css";
import {
  DownloadIcon,
  FormIcon,
  GlobeIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  Signal,
} from "./icons";

/* --------------------------------------------------------------------------
   NFC card
   -------------------------------------------------------------------------- */
export type CardTheme = { bg: string; fg: string; accent: string };

export const cardThemes = {
  ink: { bg: "#0E1A18", fg: "#FAF8F3", accent: "#D7FF3B" },
  cobalt: { bg: "#1F4BFF", fg: "#FFFFFF", accent: "#D7FF3B" },
  tangerine: { bg: "#FF6A3D", fg: "#0E1A18", accent: "#0E1A18" },
  mint: { bg: "#C9F4DC", fg: "#0E1A18", accent: "#1F4BFF" },
  ivory: { bg: "#FAF8F3", fg: "#0E1A18", accent: "#FF6A3D" },
  lime: { bg: "#D7FF3B", fg: "#0E1A18", accent: "#0E1A18" },
  fuchsia: { bg: "#FF2D8D", fg: "#0E1A18", accent: "#0E1A18" },
  violet: { bg: "#6A2BFF", fg: "#FFFFFF", accent: "#D7FF3B" },
} satisfies Record<string, CardTheme>;

type NfcCardProps = {
  theme?: CardTheme;
  name?: string;
  role?: string;
  company?: string;
  /** Show the back of the card (QR + tap hint) instead of the front. */
  side?: "front" | "back";
  className?: string;
  style?: CSSProperties;
  /** Offsets the card's reflection sweep (seconds) so neighbouring cards don't shine in unison. */
  sheenDelay?: number;
};

export function NfcCard({
  theme = cardThemes.ink,
  name = "Maya Reyes",
  role = "Studio Lead",
  company = "Northline Interiors",
  side = "front",
  className,
  style,
  sheenDelay = 0,
}: NfcCardProps) {
  const vars = {
    "--card-bg": theme.bg,
    "--card-fg": theme.fg,
    "--card-accent": theme.accent,
    "--sheen-delay": `${sheenDelay}s`,
    ...style,
  } as CSSProperties;
  return (
    <div className={`${styles.card} ${className ?? ""}`} style={vars} aria-hidden="true">
      <span className={styles.cardSheen} />
      <div className={styles.cardFace}>
      {side === "front" ? (
        <>
          <div className={styles.cardTop}>
            <span className={styles.cardCompany}>{company}</span>
            <Signal className={`${styles.cardSignal} ${styles.signalLive}`} />
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.cardName}>{name}</span>
            <span className={styles.cardRole}>{role}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.cardTop}>
            <span className={styles.cardCompany}>Tap or scan</span>
            <Signal className={`${styles.cardSignal} ${styles.signalLive}`} />
          </div>
          <div className={styles.cardBackRow}>
            <QrGlyph className={styles.cardQr} />
            <span className={styles.cardRole}>Hold near a phone to open my profile</span>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

/* The QR-style glyph is one precomputed path (not ~45 elements per copy), keeping the DOM small. */
const QR_PATH = (() => {
  const square = (x: number, y: number, s: number) => `M${x} ${y}h${s}v${s}h-${s}z`;
  const parts: string[] = [];
  // Finder patterns: outer ring (even-odd hole) and centre.
  for (const [x, y] of [
    [0, 0],
    [18, 0],
    [0, 18],
  ]) {
    parts.push(square(x, y, 7), `M${x + 1.5} ${y + 1.5}v4h4v-4z`, square(x + 2.5, y + 2.5, 2));
  }
  // Fixed data pattern so server and client render identically.
  ["1110101", "1010011", "1110110", "0001010", "1101101", "0110011", "1011101"].forEach((row, r) =>
    row.split("").forEach((c, i) => {
      if (c === "1") parts.push(square(+(9 + i * 2.2).toFixed(1), +(9 + r * 2.2).toFixed(1), 1.8));
    }),
  );
  for (const [x, y] of [
    [9, 1],
    [12, 3],
    [15, 1],
    [1, 10],
    [4, 13],
    [1, 15],
    [20, 11],
    [22, 14],
  ]) {
    parts.push(square(x, y, 2));
  }
  return parts.join("");
})();

/** A decorative QR-style glyph. It is not a scannable code. */
export function QrGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 25 25" aria-hidden="true" focusable="false">
      <path d={QR_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Phone + example profile
   -------------------------------------------------------------------------- */
export function Phone({
  children,
  className,
  style,
  label,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Visible label rendered next to the device, e.g. "Example profile". */
  label?: string;
}) {
  return (
    <figure className={`${styles.phone} ${className ?? ""}`} style={style}>
      <div className={styles.phoneScreen}>
        <span className={styles.phoneIsland} aria-hidden="true" />
        {children}
      </div>
      {label ? <figcaption className={styles.phoneLabel}>{label}</figcaption> : null}
    </figure>
  );
}

type ProfileProps = {
  variant?: "compact" | "full";
  cover?: string;
  /**
   * "tap": the screen waits, then the profile slides up as if a card was just tapped (8s loop).
   * "form": a visitor fills in the contact form (8s loop).
   */
  live?: "tap" | "form";
};

/**
 * Illustrative example of a digital profile. It is not a product screenshot.
 * Content is written as readable text so the illustration still makes sense to screen readers.
 */
export function ProfileScreen({ variant = "compact", cover = "#1F4BFF", live }: ProfileProps) {
  const rows = [
    { icon: <PhoneIcon />, label: "Call", value: "(555) 014-2290" },
    { icon: <MailIcon />, label: "Email", value: "maya@northline.studio" },
    { icon: <GlobeIcon />, label: "Website", value: "northline.studio" },
    variant === "full"
      ? { icon: <PinIcon />, label: "Studio", value: "Austin, TX" }
      : { icon: <LinkIcon />, label: "LinkedIn", value: "/in/mayareyes" },
  ];
  const profile = (
    <div className={`${styles.profile} ${live ? styles[`live_${live}`] : ""}`} role="img" aria-label="Example digital profile for Maya Reyes, Studio Lead at Northline Interiors, with buttons to save the contact and exchange details, and contact details and links.">
      <div className={`${styles.profileCover} ${variant === "full" ? styles.profileCoverShort : ""}`} style={{ background: cover }}>
        <Signal className={`${styles.profileCoverSignal} ${styles.signalLive}`} />
      </div>
      <div className={styles.profileHead}>
        <span className={styles.profileAvatar}>MR</span>
        <span className={styles.profileName}>Maya Reyes</span>
        <span className={styles.profileRole}>Studio Lead · Northline Interiors</span>
      </div>
      <div className={styles.profileActions}>
        <span className={styles.profileBtnPrimary}>
          <DownloadIcon /> Save contact
        </span>
        <span className={styles.profileBtn}>Exchange details</span>
      </div>
      <ul className={styles.profileRows}>
        {rows.map((row) => (
          <li key={row.label}>
            <span className={styles.profileRowIcon}>{row.icon}</span>
            <span className={styles.profileRowText}>
              <span>{row.label}</span>
              <span>{row.value}</span>
            </span>
          </li>
        ))}
      </ul>
      {variant === "full" ? (
        <div className={styles.profileForm}>
          <span className={styles.profileFormTitle}>
            <FormIcon /> Share your details with Maya
          </span>
          <span className={styles.profileField}>
            <span className={styles.fieldHint}>Your name</span>
            <span className={styles.fieldTyped}>Chris Nguyen</span>
          </span>
          <span className={styles.profileField}>
            <span className={styles.fieldHint}>Email or phone</span>
            <span className={styles.fieldTyped}>chris@example.com</span>
          </span>
          <span className={styles.profileFormBtn}>Send</span>
        </div>
      ) : null}
    </div>
  );
  if (live !== "tap") return profile;
  return (
    <div className={styles.liveScreen}>
      <div className={styles.idleScreen} aria-hidden="true">
        <Signal className={styles.signalLive} />
        <span>Ready to connect</span>
        <span>Hold a card near the phone</span>
      </div>
      {profile}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Signal rings — the one visual cue for an NFC exchange
   -------------------------------------------------------------------------- */
export function SignalRings({ className, style, tone = "cobalt" }: { className?: string; style?: CSSProperties; tone?: "cobalt" | "ink" | "lime" | "ivory" }) {
  return (
    <span className={`${styles.rings} ${styles[`rings_${tone}`]} ${className ?? ""}`} style={style} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

/* --------------------------------------------------------------------------
   Other product forms
   -------------------------------------------------------------------------- */
/** A printed NFC disc under a clear epoxy dome. */
export function NfcDot({ className, style, tone = "ink" }: { className?: string; style?: CSSProperties; tone?: "ink" | "cobalt" | "ivory" }) {
  return (
    <span className={`${p.dot} ${p[`dot_${tone}`]} ${className ?? ""}`} style={style} aria-hidden="true">
      <span className={p.dotFace}>
        <Signal className={styles.signalLive} />
        <span className={p.dotText}>Tap</span>
      </span>
    </span>
  );
}

/** Back of a phone (glass, metal rim, raised camera module) with an NFC dot attached. */
export function PhoneBackWithDot({ className }: { className?: string }) {
  return (
    <div className={`${p.phoneBack} ${className ?? ""}`} aria-hidden="true">
      <span className={p.camera}>
        <span className={p.lens} />
        <span className={p.lens} />
        <span className={p.lens} />
        <span className={p.flash} />
      </span>
      <span className={p.sideButton} />
      <NfcDot className={p.phoneBackDot} />
    </div>
  );
}

/**
 * A silicone NFC wristband seen from slightly above: the inner surface of the far side,
 * a cylindrically shaded near side with a matte grain, a raised tag and a printed wordmark.
 */
export function NfcBand({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const cx = 160;
  const cy = 92;
  const rx = 124;
  const ry = 52;
  const h = 40; // band width
  const L = cx - rx;
  const R = cx + rx;
  const near = `M${L} ${cy} A${rx} ${ry} 0 0 0 ${R} ${cy} L${R} ${cy + h} A${rx} ${ry} 0 0 1 ${L} ${cy + h} Z`;
  const far = `M${L} ${cy} A${rx} ${ry} 0 0 1 ${R} ${cy} L${R} ${cy + h} A${rx} ${ry} 0 0 0 ${L} ${cy + h} Z`;
  const mid = `M${L} ${cy + h / 2 + 3} A${rx} ${ry} 0 0 0 ${R} ${cy + h / 2 + 3}`;
  const tagY = cy + ry + h / 2;
  return (
    <svg className={`${p.band} ${className ?? ""}`} viewBox="0 0 320 236" aria-hidden="true" focusable="false">
      <defs>
        {/* near side: dark at the turning edges, lit in the middle */}
        <linearGradient id={`${id}near`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#030706" />
          <stop offset="0.14" stopColor="#151f1d" />
          <stop offset="0.42" stopColor="#2b3936" />
          <stop offset="0.58" stopColor="#34433f" />
          <stop offset="0.86" stopColor="#151f1d" />
          <stop offset="1" stopColor="#030706" />
        </linearGradient>
        {/* near side, vertical roundness of the strap */}
        <linearGradient id={`${id}round`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>
        {/* far side: the inside of the loop, in shadow */}
        <linearGradient id={`${id}far`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1a2523" />
          <stop offset="0.5" stopColor="#070c0b" />
          <stop offset="1" stopColor="#1a2523" />
        </linearGradient>
        <linearGradient id={`${id}spec`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0.12" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.38" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="0.85" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}tag`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3b4a47" />
          <stop offset="1" stopColor="#18221f" />
        </linearGradient>
        <filter id={`${id}grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id={`${id}soft`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${id}blur1`}>
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
        <path id={`${id}mid`} d={mid} />
      </defs>

      {/* contact shadow on the surface below */}
      <ellipse cx={cx} cy={cy + ry + h + 14} rx={rx - 10} ry="13" fill="#000" opacity="0.32" filter={`url(#${id}soft)`} />

      {/* far side (inner surface) and its cut edge */}
      <path d={far} fill={`url(#${id}far)`} />
      <path d={`M${L} ${cy} A${rx} ${ry} 0 0 1 ${R} ${cy}`} fill="none" stroke="#4a5956" strokeWidth="1.6" />

      {/* near side */}
      <path d={near} fill={`url(#${id}near)`} />
      <path d={near} fill={`url(#${id}round)`} />
      <path d={near} fill="#fff" filter={`url(#${id}grain)`} />
      <path
        d={`M${L + 6} ${cy + 9} A${rx - 2} ${ry - 2} 0 0 0 ${R - 6} ${cy + 9}`}
        fill="none"
        stroke={`url(#${id}spec)`}
        strokeWidth="5"
        strokeLinecap="round"
        filter={`url(#${id}blur1)`}
      />
      {/* cut edge of the near side, catching the light */}
      <path d={`M${L} ${cy} A${rx} ${ry} 0 0 0 ${R} ${cy}`} fill="none" stroke="#5d6d69" strokeWidth="1.8" />

      {/* printed wordmark following the curve */}
      <text fontFamily="var(--font-label), monospace" fontSize="8.5" letterSpacing="2" fill="#D7FF3B" opacity="0.88">
        <textPath href={`#${id}mid`} startOffset="12%">
          TAPGENIEUS
        </textPath>
      </text>
      <text fontFamily="var(--font-label), monospace" fontSize="8.5" letterSpacing="2" fill="#D7FF3B" opacity="0.7">
        <textPath href={`#${id}mid`} startOffset="74%">
          NFC
        </textPath>
      </text>

      {/* raised tag with the printed signal mark */}
      <g transform={`translate(${cx} ${tagY})`}>
        <rect x="-38" y="-15" width="76" height="30" rx="15" fill="#000" opacity="0.45" transform="translate(0 2.5)" filter={`url(#${id}blur1)`} />
        <rect x="-38" y="-15" width="76" height="30" rx="15" fill={`url(#${id}tag)`} />
        <rect x="-37" y="-14" width="74" height="28" rx="14" fill="none" stroke="#ffffff" strokeOpacity="0.22" />
        <g className={styles.signalLive} fill="none" stroke="#D7FF3B" strokeWidth="2.6" strokeLinecap="round" transform="translate(-6 0)">
          <path d="M-5 -5a7 7 0 0 1 0 10" />
          <path d="M1 -9a12.5 12.5 0 0 1 0 18" />
          <path d="M7 -12.5a17.5 17.5 0 0 1 0 25" />
        </g>
      </g>
    </svg>
  );
}

/** A printed insert inside a clear acrylic block, standing in a solid base. */
export function CountertopDisplay({ className, caption = "Tell us how we did" }: { className?: string; caption?: string }) {
  return (
    <div className={`${p.display} ${className ?? ""}`} aria-hidden="true">
      <span className={p.floorShadow} />
      <div className={p.slab}>
        <div className={p.insert}>
          <span className={p.brand}>Kettle &amp; Co.</span>
          <span className={p.title}>{caption}</span>
          <span className={p.row}>
            <span className={p.tap}>
              <Signal className={styles.signalLive} />
              Tap
            </span>
            <span className={p.or}>or</span>
            <span className={p.qrWrap}>
              <QrGlyph className={p.qr} />
              <span className={p.scan} />
            </span>
          </span>
        </div>
      </div>
      <div className={p.base} />
    </div>
  );
}

export function EventBadge({ className, name = "Jordan Lee", org = "Brightside Labs" }: { className?: string; name?: string; org?: string }) {
  return (
    <div className={`${styles.badge} ${className ?? ""}`} aria-hidden="true">
      <div className={styles.badgeFace}>
      <span className={styles.badgeSlot} />
      <span className={styles.badgeEvent}>Summit &rsquo;26</span>
      <span className={styles.badgeName}>{name}</span>
      <span className={styles.badgeOrg}>{org}</span>
      <span className={styles.badgeFoot}>
        <span>Attendee</span>
        <Signal className={styles.signalLive} />
      </span>
      </div>
    </div>
  );
}
