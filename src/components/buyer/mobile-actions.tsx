"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { project } from "@/data/project";
export function MobileActions() {
  const [cinematic, setCinematic] = useState(false);
  useEffect(() => {
    const scenes = [
      ...document.querySelectorAll(".opening-hero, .tower-journey"),
    ];
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setCinematic(visible.size > 0);
      },
      { threshold: 0 },
    );
    scenes.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return (
    <nav
      className="mobile-contact-bar"
      data-cinematic={cinematic}
      aria-label="Quick contact"
    >
      <a href={project.contact.phoneHref}>Call</a>
      <a href={project.contact.whatsapp} target="_blank" rel="noreferrer">
        WhatsApp ↗
      </a>
      <Link href="/contact#enquiry-form">Enquire ↗</Link>
    </nav>
  );
}
