/**
 * TapGenieUS wordmark.
 * The official logo file could not be retrieved, so this is a typographic stand-in.
 * Replace the contents of this component with the official artwork when available.
 */
export function Logo({ tone = "ink", className }: { tone?: "ink" | "light"; className?: string }) {
  const text = tone === "light" ? "#FAF8F3" : "#0E1A18";
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg className="logo-mark" width="34" height="34" viewBox="0 0 34 34" aria-hidden="true" focusable="false">
        <rect width="34" height="34" rx="10" fill="#1F4BFF" />
        <path
          d="M11.5 12.2a6.8 6.8 0 0 1 0 9.6M15.6 9a11.4 11.4 0 0 1 0 16M19.7 5.8a16 16 0 0 1 0 22.4"
          fill="none"
          stroke="#D7FF3B"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 750,
          fontSize: 21,
          letterSpacing: "-0.035em",
          color: text,
          lineHeight: 1,
        }}
      >
        TapGenie<span style={{ fontWeight: 500, opacity: 0.62, marginLeft: 1 }}>US</span>
      </span>
    </span>
  );
}
