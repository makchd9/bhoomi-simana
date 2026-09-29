"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, Eyebrow } from "@/components/ui/section";
import { EditorialImage } from "@/components/media/editorial-image";
import { project } from "@/data/project";
import { assets } from "@/data/assets";
import { motion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProjectIntroduction() {
  const root = useRef<HTMLDivElement>(null);
  const facts = [
    ["Location", project.location],
    ["Tower", "One · 58 floors"],
    ["Architect", project.architect],
    ["Developer", project.developer],
  ];
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".intro-line > span",
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: motion.ease,
            clearProps: "transform",
            scrollTrigger: {
              trigger: ".intro-heading",
              start: "top 88%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          ".intro-description, .project-facts > div",
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: motion.ease,
            clearProps: "all",
            scrollTrigger: {
              trigger: ".intro-description",
              start: "top 90%",
              once: true,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <div ref={root}>
      <Section
        id="project"
        className="project-intro"
        data-nav-theme="dark"
        aria-labelledby="project-title"
      >
        <div className="intro-topline">
          <Eyebrow>{project.copy.introEyebrow}</Eyebrow>
          <span className="eyebrow">01 / The project</span>
        </div>
        <div className="intro-grid">
          <div className="intro-heading">
            <h2 id="project-title" tabIndex={-1}>
              {project.copy.introductionLines.map((line, i) => (
                <span
                  className={`intro-line ${i === project.copy.introductionLines.length - 1 ? "intro-line-italic" : ""}`}
                  key={line}
                >
                  <span>{line}</span>
                </span>
              ))}
            </h2>
          </div>
          <div className="intro-description">
            <span className="intro-rule" aria-hidden="true" />
            <p>{project.copy.introductionBody}</p>
            <p className="pending-copy">{project.copy.contentNotice}</p>
          </div>
        </div>
        <div className="intro-lower">
          <div className="intro-image-wrap">
            <EditorialImage
              asset={assets.introduction}
              label="Simāna architecture"
              aspectRatio="5 / 4"
              reveal
              parallax
            />
          </div>
          <div className="facts-wrap">
            <Eyebrow>At a glance</Eyebrow>
            <dl className="project-facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value ?? "To be announced"}</dd>
                </div>
              ))}
            </dl>
            <p className="facts-note">{project.copy.factsNotice}</p>
          </div>
        </div>
        <div className="chapter-end">
          <span className="eyebrow">{project.copy.chapterEnd}</span>
          <a href="#home">
            Back to the beginning <span aria-hidden="true">↑</span>
          </a>
        </div>
      </Section>
    </div>
  );
}
