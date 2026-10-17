"use client";

import { useId, useState } from "react";
import { faqs } from "@/content/site";
import { Plus } from "./icons";
import styles from "./FaqAccordion.module.css";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={styles.list}>
      {faqs.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;
        return (
          <div key={item.q} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
            <h3 className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.q}</span>
                <span className={styles.icon} aria-hidden="true">
                  <Plus />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={styles.panel} inert={!isOpen}>
              <div className={styles.panelInner}>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
