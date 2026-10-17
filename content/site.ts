/**
 * Homepage copy and data. Edit text here rather than inside components.
 *
 * Destinations: only on-page anchors are used until real routes are verified.
 * Set `contactHref` to the verified contact or demo page (or a mailto:) when available.
 */

export const site = {
  name: "TapGenieUS",
  url: "https://tapgenieus.com",
  description:
    "TapGenieUS connects NFC business cards and other physical touchpoints to digital profiles and pages, so a single tap opens the right destination on someone's phone.",
  /** Where "Talk to Us" / "Talk About Your Team" lead. Points to the on-page contact block until a verified page exists. */
  contactHref: "#contact",
  /** Verified public contact channels. Leave empty rather than guessing. */
  contactChannels: [] as { label: string; href: string; value: string }[],
  /** Verified social profiles. Leave empty rather than guessing. */
  socials: [] as { label: string; href: string }[],
  /** Verified legal pages. Leave empty rather than linking to pages that may not exist. */
  legal: [] as { label: string; href: string }[],
};

export const nav = [
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Teams", href: "#teams" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "NFC business cards & digital connections",
  titleLines: ["One tap.", "A better introduction."],
  body: "Share who you are, what you do, and how to reach you with an NFC business card linked to your digital profile. TapGenieUS brings your physical touchpoints and digital connections together.",
  primary: { label: "Explore NFC Products", href: "#products" },
  secondary: { label: "See How It Works", href: "#how-it-works" },
};

export const capabilities = [
  { icon: "profile", title: "Digital profiles", text: "Your contact details, links and business info on one page." },
  { icon: "signal", title: "NFC + QR sharing", text: "Open it with a tap on compatible phones, or a quick scan." },
  { icon: "loop", title: "Reusable touchpoints", text: "One card or display, shared again and again." },
  { icon: "team", title: "Team workspaces", text: "Consistent profiles for everyone who represents your brand." },
] as const;

export const steps = [
  {
    number: "01",
    title: "Set up your destination.",
    text: "Add the details and links you want people to see: your contact information, website, social profiles and business info.",
  },
  {
    number: "02",
    title: "Share with a tap or scan.",
    text: "Hold your card near a compatible NFC phone, or let them scan its QR code. Your profile opens in their browser.",
  },
  {
    number: "03",
    title: "Keep the connection moving.",
    text: "Visitors can save your details, explore your links, or choose to send you their information through a short form.",
  },
];

export type Product = {
  id: string;
  name: string;
  kicker: string;
  summary: string;
  bestFor: string[];
  opens: string;
  tone: "tangerine" | "mint" | "cobalt" | "fuchsia" | "ink";
};

export const products: Product[] = [
  {
    id: "cards",
    name: "NFC Business Cards",
    kicker: "The everyday introduction",
    summary:
      "A card you hand over like any business card, with an NFC chip and QR code that open your digital profile.",
    bestFor: ["Meetings and networking", "Sales and client visits", "Anyone who still gets asked for a card"],
    opens: "Your digital profile with contact details, links and a save-contact option.",
    tone: "tangerine",
  },
  {
    id: "dots",
    name: "NFC Dots",
    kicker: "Small, stick-on, always nearby",
    summary:
      "A compact NFC tag that sticks to the back of a phone, a laptop or a desk, so your profile is always within reach.",
    bestFor: ["Phone cases and laptops", "Reception desks", "People who forget their cards"],
    opens: "Any destination you link it to, such as your profile or a booking page.",
    tone: "mint",
  },
  {
    id: "bands",
    name: "NFC Bands",
    kicker: "Hands-free for busy days",
    summary:
      "A wearable band with an NFC tag, useful when you are on your feet and moving between people.",
    bestFor: ["Events and trade shows", "Staff on the floor", "Fitness and hospitality teams"],
    opens: "A profile, an event page or another link you choose.",
    tone: "fuchsia",
  },
  {
    id: "displays",
    name: "Countertop Displays",
    kicker: "Built for the counter",
    summary:
      "A standing display with NFC and a QR code, placed where customers already pause, such as a register or a front desk.",
    bestFor: ["Shops and cafés", "Clinics and salons", "Reception areas"],
    opens: "A page you choose, such as a feedback page, menu, social profile or offer.",
    tone: "ink",
  },
];

export const profileFeatures = [
  { title: "Contact information", text: "Phone, email and address, ready to save to their contacts." },
  { title: "Website and social links", text: "Send people straight to the places you want them to see." },
  { title: "Business information", text: "Your role, company and a short introduction to what you do." },
  { title: "A contact form they choose to use", text: "Visitors can send you their own details, if they want to." },
];

export type UseCase = {
  id: string;
  tab: string;
  title: string;
  text: string;
  points: string[];
};

export const useCases: UseCase[] = [
  {
    id: "professionals",
    tab: "Professionals & teams",
    title: "Every introduction looks like your brand.",
    text: "Give each person a card and a profile that share the same look, so clients get a consistent introduction from anyone on the team.",
    points: ["A card and profile for each person", "Shared branding across the team", "Details updated online, not reprinted"],
  },
  {
    id: "events",
    tab: "Events & check-in",
    title: "Badges that open the right page.",
    text: "Link event badges or bands to an attendee profile, an event page or a check-in link, so the next step is a tap or scan away.",
    points: ["NFC badges and bands", "Open event info or a check-in page", "QR fallback for every attendee"],
  },
  {
    id: "reviews",
    tab: "Customer reviews",
    title: "Make it easy to share honest feedback.",
    text: "Place a display at the counter that opens your review or feedback page. Every customer gets the same simple invitation to say what they think.",
    points: ["Countertop displays and stickers", "One link for every customer", "Change the destination any time"],
  },
  {
    id: "agencies",
    tab: "Agencies & clients",
    title: "Run touchpoints for several clients.",
    text: "Keep each client's profiles and products in their own workspace, each with its own branding, so you can set them up and update them in one place.",
    points: ["A workspace per client", "Each client keeps its own branding", "Profiles organised in one place"],
  },
];

export const cardPresets = [
  { id: "ink", label: "Deep ink", bg: "#0E1A18", fg: "#FAF8F3", accent: "#D7FF3B" },
  { id: "cobalt", label: "Cobalt", bg: "#1F4BFF", fg: "#FFFFFF", accent: "#D7FF3B" },
  { id: "tangerine", label: "Tangerine", bg: "#FF6A3D", fg: "#0E1A18", accent: "#0E1A18" },
  { id: "fuchsia", label: "Electric fuchsia", bg: "#FF2D8D", fg: "#0E1A18", accent: "#0E1A18" },
  { id: "lime", label: "Neon lime", bg: "#D7FF3B", fg: "#0E1A18", accent: "#1F4BFF" },
  { id: "mint", label: "Jelly mint", bg: "#C9F4DC", fg: "#0E1A18", accent: "#1F4BFF" },
  { id: "ivory", label: "Ivory", bg: "#FAF8F3", fg: "#0E1A18", accent: "#FF6A3D" },
] as const;

export const faqs = [
  {
    q: "What is an NFC business card?",
    a: "It is a physical business card with a small NFC chip inside. The chip holds a link to your digital profile, so a compatible phone can open that profile when it is held near the card. Most cards also carry a QR code for phones that cannot read NFC.",
  },
  {
    q: "How does a tap open my profile?",
    a: "When an NFC-enabled phone is held close to the card, the phone reads the link stored on the chip and offers to open it in the browser. The card has no battery; the phone powers the short exchange.",
  },
  {
    q: "Does the other person need an app?",
    a: "No app is needed to view your profile. It opens in the phone's web browser. Depending on the phone, they may need to tap a notification to open the link.",
  },
  {
    q: "What happens if their phone does not support NFC?",
    a: "NFC support and settings vary by device, and on some phones NFC must be switched on first. When a tap does not work, they can scan the QR code instead and reach the same profile.",
  },
  {
    q: "Can I update my details later?",
    a: "Yes. The card points to your online profile, so when you change your details on the profile, the same card opens the updated version. You do not need to replace the card.",
  },
  {
    q: "Can I use TapGenieUS for my team?",
    a: "Yes. Teams can give each person their own card and profile with consistent branding, and manage those profiles from a shared workspace. Talk to us about the size and needs of your team.",
  },
  {
    q: "Can it support events or review displays?",
    a: "Yes. NFC badges and bands can open event pages or check-in links, and countertop displays can open your review or feedback page. We recommend inviting every customer to share honest feedback.",
  },
];
