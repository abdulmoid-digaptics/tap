import type { CSSProperties, ReactNode } from "react";
import {
  capabilities,
  hero,
  nav,
  products,
  profileFeatures,
  site,
  steps,
  type Product,
} from "@/content/site";
import {
  CountertopDisplay,
  NfcBand,
  NfcCard,
  NfcDot,
  Phone,
  PhoneBackWithDot,
  ProfileScreen,
  SignalRings,
  cardThemes,
} from "./art";
import { people } from "@/content/people";
import { DesignPreview } from "./DesignPreview";
import { Avatar } from "./PeopleArt";
import { FaqAccordion } from "./FaqAccordion";
import {
  ArrowRight,
  BriefcaseIcon,
  Check,
  EditIcon,
  FormIcon,
  GlobeIcon,
  LoopIcon,
  PhoneIcon,
  ProfileIcon,
  Signal,
  TapScanIcon,
  TeamIcon,
} from "./icons";
import { Logo } from "./Logo";
import { DialogLink, ProductDetails } from "./ProductDetails";
import { UseCaseStack } from "./UseCaseStack";
import s from "./sections.module.css";

const delay = (ms: number) => ({ "--reveal-delay": ms }) as CSSProperties;

function SectionHead({
  eyebrow,
  title,
  lead,
  align = "split",
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "split" | "stack";
  id?: string;
}) {
  return (
    <header className={`${s.head} ${align === "stack" ? s.headStack : ""}`} data-reveal>
      <div className={s.headTitle}>
        <p className="eyebrow">
          <Signal className={s.eyebrowSignal} />
          {eyebrow}
        </p>
        <h2 className="h2" data-split id={id}>
          {title}
        </h2>
      </div>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  );
}

/* ==========================================================================
   Hero
   ========================================================================== */
export function Hero() {
  return (
    <section className={s.hero} id="top" aria-labelledby="hero-title">
      <div className={`container ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={`eyebrow ${s.heroEyebrow}`}>
            <Signal className={s.eyebrowSignal} />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className={s.heroTitle}>
            {hero.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={`lead ${s.heroLead}`}>{hero.body}</p>
          <div className={s.heroActions}>
            <a href={hero.primary.href} className="btn btn-primary">
              {hero.primary.label}
              <ArrowRight />
            </a>
            <a href={hero.secondary.href} className="btn btn-secondary">
              {hero.secondary.label}
            </a>
          </div>
          <div className={s.heroProof}>
            <span className={s.heroAvatars} aria-hidden="true">
              {people.slice(0, 5).map((person) => (
                <Avatar key={person.id} person={person} size={38} className={s.heroAvatar} />
              ))}
            </span>
            <span className={s.heroProofText}>
              <strong>Made for people who meet people</strong>
              <span className={s.heroNote}>
                <Check /> No app needed to open a profile
              </span>
            </span>
          </div>
        </div>

        <div className={s.heroStage} data-anim data-parallax="-60">
          <div className={s.stagePanel} aria-hidden="true">
            <span className={s.stageSun} />
            <span className={s.stageArc} />
          </div>
          <div className={s.heroPhone}>
            <Phone label="Example profile">
              <ProfileScreen live="tap" />
            </Phone>
          </div>
          <SignalRings className={s.heroRings} tone="cobalt" />
          <div className={s.heroCard}>
            <NfcCard theme={cardThemes.ink} />
          </div>
          <NfcDot className={s.heroDot} tone="cobalt" />
          <p className="sr-only">
            Illustration: a TapGenieUS NFC business card held near a phone, which shows an example digital profile.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Capability strip
   ========================================================================== */
const capabilityIcons = {
  profile: ProfileIcon,
  signal: TapScanIcon,
  loop: LoopIcon,
  team: TeamIcon,
};

export function CapabilityStrip() {
  return (
    <section className={s.strip} aria-label="What TapGenieUS offers">
      <ul className={`container ${s.stripList}`}>
        {capabilities.map((item, index) => {
          const Icon = capabilityIcons[item.icon];
          return (
            <li key={item.title} data-reveal style={delay(index * 70)}>
              <span className={s.stripIcon} data-pop>
                <Icon />
              </span>
              <span>
                <strong>{item.title}</strong>
                <span className={s.stripText}>{item.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ==========================================================================
   How it works
   ========================================================================== */
function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className={`${s.stepVisual} ${s.stepVisualSetup}`} aria-hidden="true" data-anim data-clip>
        <div className={s.editor}>
          <span className={s.editorTitle}>
            <EditIcon /> Your profile
          </span>
          {[
            ["Name", "Maya Reyes"],
            ["Role", "Studio Lead"],
            ["Website", "northline.studio"],
          ].map(([label, value]) => (
            <span key={label} className={s.editorField}>
              <span>{label}</span>
              <span className={label === "Website" ? s.editorTyping : undefined}>{value}</span>
            </span>
          ))}
          <span className={s.editorToggle}>
            <span>Show contact form</span>
            <span className={s.toggleOn} />
          </span>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className={`${s.stepVisual} ${s.stepVisualTap}`} aria-hidden="true" data-anim data-clip>
        <div className={s.tapPhone}>
          <Phone>
            <ProfileScreen live="tap" />
          </Phone>
        </div>
        <SignalRings className={s.tapRings} tone="ink" />
        <div className={s.tapCard}>
          <NfcCard theme={cardThemes.cobalt} />
        </div>
      </div>
    );
  }
  return (
    <div className={`${s.stepVisual} ${s.stepVisualNext}`} aria-hidden="true" data-anim data-clip>
      <ul className={s.nextList}>
        <li>
          <span className={s.nextIcon}>
            <PhoneIcon />
          </span>
          Save contact
          <Check className={s.nextCheck} />
        </li>
        <li>
          <span className={s.nextIcon}>
            <GlobeIcon />
          </span>
          Visit website
        </li>
        <li className={s.nextHighlight}>
          <span className={s.nextIcon}>
            <FormIcon />
          </span>
          Share my details
        </li>
      </ul>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section" aria-labelledby="how-title">
      <div className="container">
        <SectionHead
          id="how-title"
          eyebrow="How it works"
          title="From first hello to the next step."
          lead="A TapGenieUS product stores a link to your page. When someone taps it with a compatible phone, or scans its QR code, that page opens in their browser."
        />
        <ol className={s.steps}>
          {steps.map((step, index) => (
            <li key={step.number} className={s.step} data-reveal style={delay(index * 110)}>
              <StepVisual index={index} />
              <div className={s.stepMeta}>
                <span className={s.stepNumber}>{step.number}</span>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ==========================================================================
   Products
   ========================================================================== */
function ProductArt({ id }: { id: string }) {
  switch (id) {
    case "cards":
      return (
        <div className={s.artCards}>
          <NfcCard className={s.artCardBack} theme={cardThemes.ivory} side="back" />
          <NfcCard className={s.artCardFront} theme={cardThemes.ink} />
        </div>
      );
    case "dots":
      return (
        <div className={s.artDots}>
          <PhoneBackWithDot className={s.artDotsPhone} />
          <NfcDot className={s.artDotsLoose} tone="ivory" />
        </div>
      );
    case "bands":
      return (
        <div className={s.artBands}>
          <NfcBand className={s.artBand} />
        </div>
      );
    default:
      return (
        <div className={s.artDisplay}>
          <CountertopDisplay className={s.artDisplayUnit} caption="Follow us for new arrivals" />
        </div>
      );
  }
}

function ProductTile({ product, index }: { product: Product; index: number }) {
  return (
    <article className={`${s.product} ${s[`product${index}`]}`} data-reveal style={delay((index % 2) * 90)}>
      <div className={s.productStage} data-tone={product.tone} data-anim data-clip>
        <ProductArt id={product.id} />
      </div>
      <div className={s.productMeta} data-rise>
        <p className={s.productKicker}>{product.kicker}</p>
        <h3 className={s.productName}>{product.name}</h3>
        <p className={s.productSummary}>{product.summary}</p>
        <ProductDetails title={product.name} stretch>
          <p>{product.summary}</p>
          <div>
            <p className={s.dialogLabel}>Good for</p>
            <ul className={s.dialogList}>
              {product.bestFor.map((item) => (
                <li key={item}>
                  <Check /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.dialogLabel}>What opens when someone taps it</p>
            <p>{product.opens}</p>
          </div>
          <p className={s.dialogNote}>
            Tap behaviour depends on the phone: NFC support and settings vary by device. For options and ordering, talk
            to our team.
          </p>
          <DialogLink href={site.contactHref} className="btn btn-primary">
            Ask about {product.name}
            <ArrowRight />
          </DialogLink>
        </ProductDetails>
      </div>
    </article>
  );
}

export function ProductCollection() {
  return (
    <section id="products" className={`section ${s.sectionTight}`} aria-labelledby="products-title">
      <div className="container">
        <SectionHead
          id="products-title"
          eyebrow="Products"
          title="Find your way to connect."
          lead="Start with a card, or put a tap point wherever people meet your business. Each product opens a page you choose."
        />
        <div className={s.productGrid}>
          {products.map((product, index) => (
            <ProductTile key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Digital profile feature
   ========================================================================== */
const featureIcons = [PhoneIcon, GlobeIcon, BriefcaseIcon, FormIcon];

export function ProfileFeature() {
  return (
    <section className={`section ${s.profile}`} aria-labelledby="profile-title">
      <div className={`container ${s.profileGrid}`}>
        <div className={s.profileVisual} data-reveal data-anim>
          <div className={s.profilePhone} data-parallax="-70">
            <Phone label="Example profile">
              <ProfileScreen variant="full" cover="#0E1A18" live="form" />
            </Phone>
            <ul className={s.callouts} aria-hidden="true">
              <li className={s.callout1}>Contact</li>
              <li className={s.callout2}>Links</li>
              <li className={s.callout3}>Form</li>
            </ul>
          </div>
        </div>
        <div className={s.profileCopy}>
          <div data-reveal>
            <p className="eyebrow">
              <Signal className={s.eyebrowSignal} />
              Digital profiles
            </p>
            <h2 className="h2" data-split id="profile-title">
              Everything they need.
              <br />
              One place to find it.
            </h2>
            <p className={`lead ${s.profileLead}`}>
              Your digital profile is the page your card opens. It gathers the details people usually ask for, so they
              can save them and follow up when it suits them.
            </p>
          </div>
          <ul className={s.featureList}>
            {profileFeatures.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <li key={feature.title} data-reveal style={delay(index * 70)}>
                  <span className={s.featureIcon} data-pop>
                    <Icon />
                  </span>
                  <span>
                    <strong>{feature.title}</strong>
                    <span>{feature.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className={s.profileCallout} data-reveal>
            <LoopIcon />
            <span>
              <strong>Update your details without replacing the physical card.</strong> The card opens your profile
              link, so changes you make online appear the next time someone taps.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Use cases
   ========================================================================== */
export function UseCases() {
  return (
    <section className="section" aria-labelledby="usecases-title">
      <div className="container">
        <SectionHead
          id="usecases-title"
          eyebrow="Use cases"
          title="Beyond the business card."
          lead="The same idea — tap, open, follow up — works wherever people meet your business."
        />
        <UseCaseStack />
      </div>
    </section>
  );
}

/* ==========================================================================
   Brand customization
   ========================================================================== */
const concepts = [
  { theme: cardThemes.tangerine, name: "Elena Ruiz", role: "Owner", company: "Kettle & Co." },
  { theme: cardThemes.ink, name: "Marcus Hale", role: "Head Coach", company: "Atlas Fitness" },
  { theme: cardThemes.fuchsia, name: "Priya Shah", role: "Research Lead", company: "Brightside Labs" },
  { theme: cardThemes.cobalt, name: "Sam Ortiz", role: "Partner", company: "Ortiz Legal" },
  { theme: cardThemes.mint, name: "Kenji Mori", role: "Realtor", company: "Harbor Homes" },
  { theme: cardThemes.violet, name: "Amara Okafor", role: "Event Producer", company: "Lumen Live" },
  { theme: cardThemes.lime, name: "Liam Walsh", role: "Founder", company: "Patchwork" },
  { theme: cardThemes.ivory, name: "Maya Reyes", role: "Studio Lead", company: "Northline Interiors" },
];

export function BrandSection() {
  return (
    <section className={`section ${s.brand}`} aria-labelledby="brand-title">
      <div className="container">
        <SectionHead
          id="brand-title"
          eyebrow="Your brand"
          title={
            <>
              Your brand.
              <br />
              In every introduction.
            </>
          }
          lead="Your card and profile can carry your colors and your name, so the first thing people see feels like your business."
        />
        <div data-reveal>
          <DesignPreview />
        </div>
        <div className={s.concepts} data-reveal>
          <p className={s.conceptsLabel}>Card concepts for illustration</p>
          {/* An endless loop: the list is rendered twice and the track slides by half its width. */}
          <div className={s.conceptViewport} aria-hidden="true" data-anim>
            <div className={s.conceptTrack}>
              {[...concepts, ...concepts].map((concept, index) => (
                <div key={`${concept.company}-${index}`} className={s.conceptSlot}>
                  <NfcCard className={s.concept} sheenDelay={(index % concepts.length) * 1.1} {...concept} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Teams & agencies
   ========================================================================== */
const team = [
  { name: "Maya Reyes", role: "Studio Lead" },
  { name: "Sam Ortiz", role: "Project Manager" },
  { name: "Priya Shah", role: "Design Director" },
  { name: "Jordan Lee", role: "Client Services" },
  { name: "Alex Kim", role: "Architect" },
  { name: "Jo Park", role: "New teammate" },
];

export function TeamsSection() {
  return (
    <section id="teams" className={`section on-dark ${s.teams}`} aria-labelledby="teams-title">
      <div className={`container ${s.teamsGrid}`}>
        <div className={s.teamsCopy} data-reveal>
          <p className="eyebrow">
            <Signal className={s.eyebrowSignalLime} />
            For teams &amp; agencies
          </p>
          <h2 className="h2" data-split id="teams-title">
            One brand.
            <br />
            More people making connections.
          </h2>
          <p className="lead">
            Give everyone who represents your business a card and a profile that match. Set people up in a shared
            workspace, and keep their details consistent as your team changes.
          </p>
          <ul className={s.teamsList}>
            <li>
              <Check /> A card and profile for each person
            </li>
            <li>
              <Check /> One look across every profile
            </li>
            <li>
              <Check /> Separate workspaces for agency clients
            </li>
          </ul>
          <a href={site.contactHref} className="btn btn-lime">
            Talk About Your Team
            <ArrowRight />
          </a>
        </div>
        <div className={s.teamsArt} aria-hidden="true" data-reveal data-anim data-team style={delay(120)}>
          {team.map((person, index) => (
            <NfcCard
              key={person.name}
              className={`${s.teamCard} ${index === team.length - 1 ? s.teamCardNew : ""}`}
              theme={index === team.length - 1 ? cardThemes.lime : cardThemes.cobalt}
              name={person.name}
              role={person.role}
              company="Northline Interiors"
              sheenDelay={index * 0.9}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FAQ
   ========================================================================== */
export function FaqSection() {
  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className={`container ${s.faqGrid}`}>
        <div className={s.faqIntro} data-reveal>
          <p className="eyebrow">
            <Signal className={s.eyebrowSignal} />
            FAQ
          </p>
          <h2 className="h2" data-split id="faq-title">
            Good questions, plain answers.
          </h2>
          <p className="lead">Something else on your mind? We are happy to talk it through.</p>
          <a href={site.contactHref} className="text-link">
            <span>Talk to us</span>
            <ArrowRight />
          </a>
        </div>
        <div data-reveal style={delay(100)}>
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Final CTA
   ========================================================================== */
export function FinalCta() {
  return (
    <section className={`on-dark ${s.final}`} aria-labelledby="final-title">
      <div className={`container ${s.finalGrid}`}>
        <div className={s.finalCopy} data-reveal>
          <h2 id="final-title" className={s.finalTitle} data-split="chars">
            Make your next introduction count.
          </h2>
          <p className={s.finalLead}>
            Explore a smarter way to connect your physical presence with your digital world.
          </p>
          <div className={s.heroActions}>
            <a href="#products" className="btn btn-lime">
              Explore Products
              <ArrowRight />
            </a>
            <a href={site.contactHref} className="btn btn-outline-light">
              Talk to Us
            </a>
          </div>
        </div>
        <div className={s.finalArt} aria-hidden="true" data-anim data-parallax="-80" data-tilt>
          <span className={s.finalRings}>
            <span />
            <span />
            <span />
          </span>
          <NfcCard className={s.finalCardA} theme={cardThemes.tangerine} name="Your Name" role="Your role" company="Your Company" />
          <NfcCard className={s.finalCardB} theme={cardThemes.ivory} side="back" sheenDelay={2.4} />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Footer
   ========================================================================== */
/** Year of the build (set in next.config.ts), so prerendering never reads the clock. */
function CurrentYear() {
  return <>{process.env.BUILD_YEAR}</>;
}

export function SiteFooter() {
  return (
    <footer className={`on-dark ${s.footer}`}>
      <div className="container">
        <div className={s.footerTop}>
          <div className={s.footerBrand}>
            <a href="#top" aria-label="TapGenieUS home" className={`logo-link ${s.footerLogo}`}>
              <Logo tone="light" />
            </a>
            <p>{site.description}</p>
          </div>

          <nav className={s.footerCol} aria-label="Products">
            <p className={s.footerHeading}>Products</p>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <a href="#products">{product.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={s.footerCol} aria-label="On this page">
            <p className={s.footerHeading}>Explore</p>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`${s.footerCol} anchor-target`} id="contact">
            <p className={s.footerHeading}>Contact</p>
            <p className={s.footerText}>
              Planning cards for a team, an event or a counter display? Tell us what you need and we will help you
              choose.
            </p>
            <ul>
              {site.contactChannels.length ? (
                site.contactChannels.map((channel) => (
                  <li key={channel.href}>
                    <a href={channel.href}>
                      {channel.label}: {channel.value}
                    </a>
                  </li>
                ))
              ) : (
                <li>
                  <a href={site.url}>tapgenieus.com</a>
                </li>
              )}
              {site.socials.map((social) => (
                <li key={social.href}>
                  <a href={social.href} rel="noopener noreferrer" target="_blank">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={s.footerBottom}>
          <p>
            © <CurrentYear /> TapGenieUS. All rights reserved.
          </p>
          {site.legal.length ? (
            <ul>
              {site.legal.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
