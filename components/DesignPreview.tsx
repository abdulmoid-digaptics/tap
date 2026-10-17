"use client";

import { useId, useState } from "react";
import { cardPresets } from "@/content/site";
import { NfcCard } from "./art";
import styles from "./DesignPreview.module.css";

const MAX_NAME = 26;

export function DesignPreview() {
  const [presetId, setPresetId] = useState<string>(cardPresets[0].id);
  const [name, setName] = useState("Your Name");
  const [role, setRole] = useState("Founder, Your Company");
  const nameId = useId();
  const roleId = useId();
  const noteId = useId();

  const preset = cardPresets.find((p) => p.id === presetId) ?? cardPresets[0];
  const theme = { bg: preset.bg, fg: preset.fg, accent: preset.accent };
  const [roleTitle, company] = role.split(",").map((part) => part.trim());

  return (
    <div className={styles.wrap}>
      <div className={styles.stage} data-anim style={{ background: preset.id === "ivory" ? "var(--mint)" : "var(--ivory-deep)" }}>
        <span className={styles.badge}>Design preview</span>
        <div className={styles.cards}>
          <NfcCard
            className={styles.back}
            theme={theme}
            side="back"
            company={company || "Your Company"}
          />
          <NfcCard
            className={styles.front}
            theme={theme}
            name={name.trim() || "Your Name"}
            role={roleTitle || "Your role"}
            company={company || "Your Company"}
          />
        </div>
        <p className="sr-only" aria-live="polite">
          Preview shows a {preset.label} card for {name.trim() || "Your Name"}.
        </p>
      </div>

      <form className={styles.controls} onSubmit={(event) => event.preventDefault()} aria-describedby={noteId}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Card color</legend>
          <div className={styles.swatches}>
            {cardPresets.map((p) => (
              <label key={p.id} className={styles.swatch} title={p.label}>
                <input
                  type="radio"
                  name="card-color"
                  value={p.id}
                  checked={p.id === presetId}
                  onChange={() => setPresetId(p.id)}
                />
                <span className={styles.swatchChip} style={{ background: p.bg }} aria-hidden="true" />
                <span className={styles.swatchLabel}>{p.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.field}>
          <label htmlFor={nameId} className={styles.legend}>
            Name on card
          </label>
          <input
            id={nameId}
            className={styles.input}
            value={name}
            maxLength={MAX_NAME}
            autoComplete="off"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={roleId} className={styles.legend}>
            Role, company
          </label>
          <input
            id={roleId}
            className={styles.input}
            value={role}
            maxLength={40}
            autoComplete="off"
            onChange={(event) => setRole(event.target.value)}
          />
        </div>

        <p id={noteId} className={styles.note}>
          This is an illustration to explore color and layout. It does not save anything, place an order or change an
          account.
        </p>
      </form>
    </div>
  );
}
