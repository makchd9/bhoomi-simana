import type { Metadata } from "next";
import "./globals.css";
import "@/components/story/story.css";
import "./refinement.css";
import "./immersive.css";
import "./buyer.css";
import { siteUrl } from "@/data/buyer-content";
export const metadata: Metadata = {
  title: {
    default: "Simāna by Bhoomi Group | Luxury Residences in Parel, Lalbaug, South Mumbai",
    template: "%s | Simāna by Bhoomi Group",
  },
  description:
    "Explore Simāna by Bhoomi Group in Lalbaug, Parel: Purnata residences, published floor plans, Aikyam clubhouse, lifestyle amenities and private presentations.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Simāna by Bhoomi Group | The Urban Oasis",
    description:
      "Discover Purnata residences and the Aikyam clubhouse at Simāna, Lalbaug, Mumbai.",
    url: "/",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/simana/native-v3/tower.webp",
        alt: "Rendered image of Simāna architecture",
      },
    ],
  },
  robots: {
    index: process.env.SITE_INDEXABLE === "true",
    follow: process.env.SITE_INDEXABLE === "true",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
