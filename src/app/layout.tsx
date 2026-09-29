import type { Metadata } from "next";
import "./globals.css";
import "@/components/story/story.css";
import "./refinement.css";
import "./immersive.css";
import { projectLabel, project } from "@/data/project";
export const metadata: Metadata = {
  title: `${projectLabel} — ${project.copy.statement}`,
  description: `${projectLabel} in ${project.location}, by ${project.developer}. Explore a 58-floor residential tower through a cinematic architectural journey.`,
  metadataBase: new URL("https://simanabhoomi.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Simana The Urban Oasis | Bhoomi Properties",
    description:
      "A considered approach to contemporary living in Lalbaug, Mumbai.",
    images: [
      {
        url: "/images/simana/journey-hd/tower-000-poster.webp",
        alt: "Rendered image of Simāna elevation",
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
