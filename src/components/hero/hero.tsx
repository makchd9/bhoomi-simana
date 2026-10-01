"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { EditorialImage } from "@/components/media/editorial-image";
import { journey } from "@/data/journey";
import "@/components/journey/journey.css";

/** The opening breathes before the facts and the continuous building walkthrough. */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let visible = true;
      const pan = gsap.fromTo(
        element.querySelector(".journey-image"),
        { x: -6 },
        {
          x: 6,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          modifiers: {
            x: (value) =>
              `${Math.round(parseFloat(value) * devicePixelRatio) / devicePixelRatio}px`,
          },
        },
      );
      const sync = () =>
        pan.paused(
          !visible ||
            document.hidden ||
            Boolean(document.querySelector("dialog[open]")),
        );
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(element);
      document.addEventListener("visibilitychange", sync);
      window.addEventListener("navigation:toggle", sync);
      return () => {
        pan.revert();
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        window.removeEventListener("navigation:toggle", sync);
      };
    });
    return () => media.revert();
  }, []);
  return (
    <section
      ref={root}
      id="skyline"
      className="opening-hero journey-scene"
      data-chapter="overview"
      data-framing="complete"
      data-nav-theme="light"
      aria-labelledby="skyline-title"
    >
      <div className="journey-picture">
        <EditorialImage
          asset={journey[0].image}
          label="Simāna"
          aspectRatio="auto"
          sizes="100vw"
          original
          priority
          className="journey-image"
        />
      </div>
      <div className="journey-scrim" aria-hidden="true" />
      <div className="journey-copy page-gutter">
        <p className="eyebrow">Lalbaug · Parel · Mumbai / By Bhoomi</p>
        <h1 id="skyline-title">
          Simāna. <em>The Urban Oasis.</em>
        </h1>
        <p className="journey-description">
          Life, elevated. A different rhythm in the heart of Mumbai.
        </p>
        <div className="journey-actions">
          <a className="journey-next" href="#project">
            Explore Simāna <span aria-hidden="true">↓</span>
          </a>
          <a className="journey-next" href="#contact">
            Private presentation <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <span className="scene-concept">{journey[0].image.caption}</span>
    </section>
  );
}
