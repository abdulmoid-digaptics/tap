import type { CSSProperties } from "react";
import { useCases } from "@/content/site";
import { CountertopDisplay, EventBadge, NfcBand, NfcCard, SignalRings, cardThemes } from "./art";
import { Check } from "./icons";
import styles from "./UseCaseStack.module.css";

function Visual({ id }: { id: string }) {
  switch (id) {
    case "professionals":
      return (
        <div className={`${styles.scene} ${styles.sceneTeam}`}>
          <NfcCard className={styles.teamCard1} theme={cardThemes.cobalt} name="Maya Reyes" role="Studio Lead" />
          <NfcCard className={styles.teamCard2} theme={cardThemes.cobalt} name="Sam Ortiz" role="Project Manager" sheenDelay={1.2} />
          <NfcCard className={styles.teamCard3} theme={cardThemes.cobalt} name="Priya Shah" role="Design Director" sheenDelay={2.4} />
        </div>
      );
    case "events":
      return (
        <div className={`${styles.scene} ${styles.sceneEvent}`}>
          <EventBadge className={styles.eventBadge} />
          <NfcBand className={styles.eventBand} />
          <SignalRings className={styles.eventRings} tone="ink" />
        </div>
      );
    case "reviews":
      return (
        <div className={`${styles.scene} ${styles.sceneReview}`}>
          <CountertopDisplay className={styles.reviewDisplay} caption="Tell us how we did" />
          <span className={styles.reviewNote}>The same invitation for every customer</span>
        </div>
      );
    default:
      return (
        <div className={`${styles.scene} ${styles.sceneAgency}`}>
          {[
            { label: "Client A", theme: cardThemes.tangerine, name: "Kettle & Co." },
            { label: "Client B", theme: cardThemes.ink, name: "Atlas Fitness" },
            { label: "Client C", theme: cardThemes.mint, name: "Brightside Labs" },
          ].map((client, index) => (
            <div key={client.label} className={styles.agencyColumn}>
              <span className={styles.agencyLabel}>{client.label} workspace</span>
              <NfcCard theme={client.theme} company={client.name} name="Alex Kim" role="Branded card" sheenDelay={index} />
              <NfcCard className={styles.agencyBack} theme={client.theme} company={client.name} name="Jo Park" role="Branded card" />
            </div>
          ))}
        </div>
      );
  }
}

/**
 * Use cases as a stack of sticky panels: each panel pins below the header and the next one
 * slides over it. Where scroll-driven animations are supported, the covered panel recedes.
 * Each panel uses the view timeline of the panel that follows it (shared via timeline-scope).
 */
export function UseCaseStack() {
  const count = useCases.length;
  const listStyle = {
    "--count": count,
    timelineScope: useCases.map((_, i) => `--uc-${i}`).join(", "),
  } as CSSProperties;

  return (
    <ol className={styles.stack} style={listStyle}>
      {useCases.map((item, index) => {
        const isLast = index === count - 1;
        const itemStyle = { "--i": index, viewTimelineName: `--uc-${index}` } as CSSProperties;
        const panelStyle = (isLast ? {} : { animationTimeline: `--uc-${index + 1}` }) as CSSProperties;
        return (
          <li key={item.id} className={styles.item} style={itemStyle}>
            <article
              className={`${styles.panel} ${isLast ? "" : styles.recedes}`}
              style={panelStyle}
              aria-labelledby={`usecase-${item.id}`}
            >
              <div className={styles.visual} data-scene={item.id} data-anim aria-hidden="true">
                <Visual id={item.id} />
              </div>
              <div className={styles.copy}>
                <p className={styles.meta}>
                  <span className={styles.index}>
                    0{index + 1} / 0{count}
                  </span>
                  <span>{item.tab}</span>
                </p>
                <h3 id={`usecase-${item.id}`} className={styles.title}>
                  {item.title}
                </h3>
                <p className={styles.text}>{item.text}</p>
                <ul className={styles.points}>
                  {item.points.map((point) => (
                    <li key={point}>
                      <Check />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
