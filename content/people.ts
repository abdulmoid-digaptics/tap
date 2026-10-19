/**
 * Example people used in illustrations. They are fictional: the portraits are AI-generated and the
 * names, roles, companies and details are invented. Keep them labelled as examples on the page.
 */
import type { StaticImageData } from "next/image";
import amara from "@/public/people/amara.webp";
import elena from "@/public/people/elena.webp";
import kenji from "@/public/people/kenji.webp";
import liam from "@/public/people/liam.webp";
import marcus from "@/public/people/marcus.webp";
import maya from "@/public/people/maya.webp";
import priya from "@/public/people/priya.webp";
import sam from "@/public/people/sam.webp";

export type Person = {
  id: string;
  name: string;
  role: string;
  company: string;
  city: string;
  photo: StaticImageData;
  /** Card / cover colors */
  bg: string;
  fg: string;
  accent: string;
  links: string[];
  /** A short line shown on the profile */
  bio: string;
};

export const people: Person[] = [
  {
    id: "maya",
    name: "Maya Reyes",
    role: "Studio Lead",
    company: "Northline Interiors",
    city: "Austin, TX",
    photo: maya,
    bg: "#1F4BFF",
    fg: "#FFFFFF",
    accent: "#D7FF3B",
    links: ["Portfolio", "Instagram", "Book a consult"],
    bio: "Calm, bright homes for busy families.",
  },
  {
    id: "marcus",
    name: "Marcus Hale",
    role: "Head Coach",
    company: "Atlas Fitness",
    city: "Denver, CO",
    photo: marcus,
    bg: "#0E1A18",
    fg: "#FAF8F3",
    accent: "#D7FF3B",
    links: ["Class schedule", "Free trial", "YouTube"],
    bio: "Strength programs that fit real life.",
  },
  {
    id: "priya",
    name: "Priya Shah",
    role: "Research Lead",
    company: "Brightside Labs",
    city: "Boston, MA",
    photo: priya,
    bg: "#FF2D8D",
    fg: "#0E1A18",
    accent: "#0E1A18",
    links: ["Publications", "LinkedIn", "Lab site"],
    bio: "Turning lab results into better care.",
  },
  {
    id: "sam",
    name: "Sam Ortiz",
    role: "Partner",
    company: "Ortiz Legal",
    city: "Miami, FL",
    photo: sam,
    bg: "#13233F",
    fg: "#FFFFFF",
    accent: "#FFB84D",
    links: ["Practice areas", "Book a call", "LinkedIn"],
    bio: "Business law, explained plainly.",
  },
  {
    id: "elena",
    name: "Elena Ruiz",
    role: "Owner",
    company: "Kettle & Co.",
    city: "Santa Fe, NM",
    photo: elena,
    bg: "#FF6A3D",
    fg: "#0E1A18",
    accent: "#0E1A18",
    links: ["Today's menu", "Leave a review", "Order ahead"],
    bio: "Coffee, pastries and a seat by the window.",
  },
  {
    id: "kenji",
    name: "Kenji Mori",
    role: "Realtor",
    company: "Harbor Homes",
    city: "Seattle, WA",
    photo: kenji,
    bg: "#C9F4DC",
    fg: "#0E1A18",
    accent: "#1F4BFF",
    links: ["Open houses", "Listings", "Text me"],
    bio: "Helping first-time buyers find home.",
  },
  {
    id: "amara",
    name: "Amara Okafor",
    role: "Event Producer",
    company: "Lumen Live",
    city: "Atlanta, GA",
    photo: amara,
    bg: "#6A2BFF",
    fg: "#FFFFFF",
    accent: "#D7FF3B",
    links: ["Upcoming events", "Check in", "Partner with us"],
    bio: "Conferences people actually remember.",
  },
  {
    id: "liam",
    name: "Liam Walsh",
    role: "Founder",
    company: "Patchwork",
    city: "Portland, OR",
    photo: liam,
    bg: "#D7FF3B",
    fg: "#0E1A18",
    accent: "#1F4BFF",
    links: ["Product demo", "Pitch deck", "X / Twitter"],
    bio: "Building tools for small makers.",
  },
];

export const personById = (id: string) => people.find((p) => p.id === id) ?? people[0];
