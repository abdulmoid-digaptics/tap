import type { CSSProperties } from "react";
import { people } from "@/content/people";
import { Phone } from "./art";
import { Signal } from "./icons";
import { PersonScreen, PhotoCard } from "./PeopleArt";
import s from "./PeopleShowcase.module.css";

/**
 * "A card for every kind of hello": two endless rows — phones showing example profiles drift one
 * way, printed photo cards drift the other. Rows pause on hover and while offscreen (data-anim).
 * Each list is rendered twice so the loop is seamless; the copy is hidden from assistive tech.
 */
export function PeopleShowcase() {
  const cardOrder = [...people.slice(4), ...people.slice(0, 4)];
  return (
    <section className={`section on-dark ${s.showcase}`} aria-labelledby="people-title">
      <span className={s.aurora} aria-hidden="true" />
      <div className="container">
        <header className={s.head} data-reveal>
          <div className={s.headTitle}>
            <p className="eyebrow">
              <Signal className={s.eyebrowSignal} />
              Made for people who meet people
            </p>
            <h2 className="h2" data-split id="people-title">
              A card for every
              <br />
              kind of <span className={s.highlight}>hello.</span>
            </h2>
          </div>
          <p className="lead">
            Designers, coaches, café owners, realtors, founders. Each profile carries a face, a story and the one next
            step that matters to them.
          </p>
        </header>
      </div>

      <div className={s.rows}>
        <div className={s.row} data-anim>
          <ul className={`${s.track} ${s.trackPhones}`} style={{ "--dur": "70s" } as CSSProperties}>
            {[...people, ...people].map((person, index) => (
              <li
                key={`${person.id}-${index}`}
                className={s.phoneItem}
                aria-hidden={index >= people.length}
                style={{ "--tilt": `${index % 2 ? 3 : -3}deg` } as CSSProperties}
              >
                <Phone>
                  <PersonScreen person={person} />
                </Phone>
                <span className={s.phoneTag}>
                  <span className={s.tagDot} style={{ background: person.bg }} />
                  {person.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.row} data-anim aria-hidden="true">
          <ul className={`${s.track} ${s.trackCards}`} style={{ "--dur": "55s" } as CSSProperties}>
            {[...cardOrder, ...cardOrder].map((person, index) => (
              <li
                key={`${person.id}-${index}`}
                className={s.cardItem}
                style={{ "--tilt": `${index % 3 === 0 ? -4 : index % 3 === 1 ? 2 : 5}deg` } as CSSProperties}
              >
                <PhotoCard person={person} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={`container ${s.note}`}>Example people and profiles for illustration. Portraits are AI-generated.</p>
    </section>
  );
}
