import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { getSiteUrl } from "@/lib/siteUrl";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-deva",
  display: "swap",
  weight: ["400", "500", "600"],
});
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kinnauri Apples | GI-tagged pre-booking from 9,000 ft",
    template: "%s · Kinnaur Apple",
  },
  description:
    "Pre-book GI-tagged Kinnauri apples grown at 6,000–9,000 ft in Himachal Pradesh. Hand-graded, packed in 5kg, 10kg and 15kg crates, sold direct from orchard. No payment at booking.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Kinnauri Apples — GI-tagged, hand-graded, orchard-direct",
    description:
      "Reserve a crate of GI-certified Kinnauri apples from high-altitude orchards in Kinnaur, Himachal Pradesh.",
    siteName: "Kinnaur Apple",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinnauri Apples — GI-tagged, hand-graded",
    description: "Pre-book premium Kinnauri apples grown at 9,000 ft.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${notoDevanagari.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
