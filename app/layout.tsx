import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import "./globals.css";

// Geist is bundled locally (SIL Open Font License) so builds never depend on a font CDN.
const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TapGenieUS — NFC Business Cards & Digital Profiles",
    template: "%s · TapGenieUS",
  },
  description: site.description,
  applicationName: "TapGenieUS",
  keywords: [
    "NFC business card",
    "digital business card",
    "digital profile",
    "NFC products",
    "contact sharing",
    "team business cards",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "TapGenieUS",
    title: "TapGenieUS — One tap. A better introduction.",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapGenieUS — One tap. A better introduction.",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
