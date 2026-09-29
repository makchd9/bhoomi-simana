"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { EditorialImage } from "@/components/media/editorial-image";
import { project } from "@/data/project";
import { journey, journeyChapters, chapterStarts, scenePositions, journeyAliases } from "@/data/journey";
import { scrollToPosition } from "@/lib/scroll-to";
import { createVideoSequence } from "@/lib/video-sequence";
import "./journey.css";


gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TowerJourney() {
  const root = useRef<HTMLElement>(null);
  const driver = useRef<ScrollTrigger | null>(null);
  const warmScene = useRef<(index: number) => void>(() => {});
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const currentChapter = journey[active].chapter;
  const activeChapter = journeyChapters.findIndex(chapter => chapter.id === currentChapter);
  const rooms = journey.map((scene, index) => ({ ...scene, index })).filter(scene => scene.chapter === currentChapter);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference) and (min-height: 680px)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          if (!context.conditions?.motion || !root.current) return;
          const desktop = Boolean(context.conditions.desktop);
          root.current.dataset.enhanced = "true";
          setEnhanced(true);
          const scenes = gsap.utils.toArray<HTMLElement>(
            ".journey-scene",
            root.current,
          );
          const copy = gsap.utils.toArray<HTMLElement>(
            ".journey-copy",
            root.current,
          );
          gsap.set(scenes.slice(1), { autoAlpha: 0 });
          gsap.fromTo(copy[0], { opacity: 0, y: 18 }, {
            opacity: 1, y: 0, duration: 1.1, delay: 0.15, ease: "power2.out", clearProps: "all",
          });
          gsap.fromTo(scenes[0].querySelector(".journey-picture"),
            { clipPath: "inset(1.5% 1.5% 1.5% 1.5%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power2.out", clearProps: "clipPath" },
          );
          const sequences = journey.map((scene, index) => {
            const video = scenes[index].querySelector<HTMLVideoElement>("video");
            return scene.sequence && video
              ? createVideoSequence(video, scene.sequence.name, scene.sequence.count, !desktop && !scene.sequence.preserveView)
              : null;
          });
          warmScene.current = index => sequences[index]?.prepare();
          const playhead = { position: 0 };
          let current = 0;
          let transition: gsap.core.Timeline | null = null;
          const timeline = gsap.timeline({
            scrollTrigger: {
              id: "tower-journey",
              trigger: root.current,
              start: "top top",
              end: () => `+=${window.innerHeight * journey.length * (desktop ? 1.25 : 1.1)}`,
              pin: true,
              scrub: desktop ? 0.22 : 0.12,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          driver.current = timeline.scrollTrigger ?? null;
          timeline.to(
            playhead,
            {
              position: journey.length,
              duration: journey.length,
              ease: "none",
              onUpdate: () => {
                const position = playhead.position;
                const next = Math.min(journey.length - 1, Math.floor(position));
                if (next !== current) {
                  sequences[current]?.pause();
                  // Finish the visual transition even if scrolling stops at the boundary.
                  // Scrubbing opacity leaves two rooms ghosted together on touch/resize.
                  transition?.kill();
                  const previous = current;
                  gsap.set(scenes.filter((_, i) => i !== previous && i !== next), { autoAlpha: 0 });
                  gsap.set(scenes[previous], { autoAlpha: 1 });
                  transition = gsap.timeline()
                    .to(copy[previous], { opacity: 0, duration: 0.15 }, 0)
                    .fromTo(scenes[next], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: "power1.out" }, 0)
                    .fromTo(copy[next], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.08)
                    .set(scenes[previous], { autoAlpha: 0 }, 0.45);
                  current = next;
                  setActive(next);
                }
                const chapter = journeyChapters.findIndex(item => item.id === journey[next].chapter);
                const chapterStart = chapterStarts[chapter];
                const chapterEnd = chapterStarts[chapter + 1] ?? journey.length;
                root.current?.style.setProperty("--chapter-progress", String(Math.min(1, (position - chapterStart) / (chapterEnd - chapterStart))));
                // Warm the adjacent camera shot before the next scene becomes visible.
                if (position - next > 0.62) sequences[next + 1]?.prepare();
                const sequence = journey[next].sequence;
                if (sequence)
                  sequences[next]?.render(
                    Math.min(1, Math.max(0, (position - next - (next === 0 ? 0 : 0.24)) / (next === 0 ? 0.92 : 0.7))) *
                      (sequence.count - 1),
                  );
              },
            },
            0,
          );
          if (desktop) timeline.to(scenes[0].querySelector(".journey-picture"), {
            scale: 1.015, duration: 1, ease: "none",
          }, 0);
          timeline.fromTo(
            ".journey-progress-fill",
            { scaleX: 0 },
            { scaleX: 1, duration: journey.length, ease: "none" },
            0,
          );
          return () => {
            transition?.kill();
            warmScene.current = () => {};
            sequences.forEach((sequence) => sequence?.dispose());
            gsap.set(scenes, { clearProps: "opacity,visibility" });
            gsap.set(copy, { clearProps: "opacity,transform" });
            driver.current = null;
            if (root.current) delete root.current.dataset.enhanced;
            setEnhanced(false);
            setActive(0);
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    function go(event: Event) {
      if (event.defaultPrevented) return;
      const href = event instanceof CustomEvent
        ? String(event.detail)
        : (event.target as Element).closest<HTMLAnchorElement>("a[href^='#']")?.getAttribute("href");
      const target = href?.slice(1);
      const resolved = target ? journeyAliases[target] ?? target : "";
      const index = journey.findIndex((scene) => scene.id === resolved);
      const trigger = driver.current;
      if (index < 0 || !trigger) return;
      event.preventDefault();
      warmScene.current(index);
      scrollToPosition(trigger.start + (trigger.end - trigger.start) * scenePositions[index]);
    }
    document.addEventListener("click", go);
    window.addEventListener("journey:navigate", go);
    return () => { document.removeEventListener("click", go); window.removeEventListener("journey:navigate", go); };
  }, []);

  function navigate(index: number) {
    const trigger = driver.current;
    if (!trigger) {
      document.getElementById(journey[index].id)?.scrollIntoView();
      return;
    }
    warmScene.current(index);
    scrollToPosition(trigger.start + (trigger.end - trigger.start) * scenePositions[index]);
  }

  return (
    <section
      ref={root}
      id="home"
      className="tower-journey"
      data-nav-theme="light"
      aria-label="A scroll journey through Simāna"
    >
      <div className="journey-stage">
        {journey.map((scene, index) => (
          <article
            key={scene.id}
            id={scene.id}
            className={`journey-scene journey-scene-${index}`}
            data-framing={scene.framing}
            data-chapter={scene.chapter}
            aria-labelledby={`${scene.id}-title`}
            aria-hidden={enhanced && active !== index}
            inert={enhanced && active !== index}
          >
            
            <div className="journey-picture">
              <EditorialImage
                asset={scene.image}
                label={scene.label}
                aspectRatio="auto"
                sizes={scene.framing === "complete" ? "100vw" : "(max-width: 767px) 180vh, 100vw"}
                priority={index === 0}
                quality={95}
                className="journey-image"
              />
              {scene.sequence && (
                <video className="journey-video" muted playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture />
              )}
            </div>
            <div className="journey-scrim" aria-hidden="true" />
            <div className="journey-copy page-gutter">
              <p className="eyebrow">
                {scene.eyebrow}
              </p>
              {index === 0 ? (
                <h1 id={`${scene.id}-title`}>
                  {scene.title[0]}
                  <em>{scene.title[1]}</em>
                </h1>
              ) : (
                <h2 id={`${scene.id}-title`}>
                  {scene.title[0]}
                  <em>{scene.title[1]}</em>
                </h2>
              )}
              <p className="journey-description">{scene.description}</p>
              <div className="journey-actions">
              <a
                href={index === journey.length - 1 ? "#project" : `#${journey[index + 1].id}`}
                className="journey-next"
                onClick={(event) => {
                  if (index !== journey.length - 1 && enhanced) {
                    event.preventDefault();
                    navigate(index + 1);
                  }
                }}
              >
                {index === 0
                  ? "Begin the journey"
                  : index === journey.length - 1
                    ? "Discover the project"
                    : "Continue the journey"}
                {index === journey.length - 1 ? (
                  <ArrowUpRight size={15} aria-hidden="true" />
                ) : (
                  <ArrowDown size={15} aria-hidden="true" />
                )}
              </a>

              </div>
            </div>
            <span className="scene-concept">{scene.image.caption}</span>
          </article>
        ))}
        <div className="journey-top-meta page-gutter" aria-hidden="true">
          <span>The Simāna experience</span>
          <span>{project.location ?? "[Location]"}</span>
        </div>
        {enhanced && rooms.length > 1 && <nav className="journey-rooms" aria-label={`${journeyChapters[activeChapter].label} spaces`}>
          <span className="journey-room-label">{currentChapter === "ground" ? "Ground floor" : currentChapter === "first" ? "First floor" : "Explore"}</span>
          {rooms.map(room => <button key={room.id} onClick={() => navigate(room.index)} aria-current={active === room.index ? "step" : undefined}>{room.label}</button>)}
        </nav>}
        <nav
          className="journey-chapters"
          aria-label="Building journey chapters"
          onKeyDown={event => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
            const focused = buttons.indexOf(document.activeElement as HTMLButtonElement);
            const index = event.key === "Home" ? 0 : event.key === "End" ? journeyChapters.length - 1
              : Math.max(0, Math.min(journeyChapters.length - 1, focused + (event.key === "ArrowRight" ? 1 : -1)));
            buttons[index].focus(); navigate(chapterStarts[index]);
          }}
        >
          {journeyChapters.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => navigate(chapterStarts[index])}
              aria-current={activeChapter === index ? "step" : undefined}
              data-complete={activeChapter > index}
            >
              <span>0{index + 1}</span>
              <span>{scene.label}</span>
            </button>
          ))}
        </nav>
        <div className="journey-bottom page-gutter">
          <span className="journey-scroll-cue">
            <ArrowDown size={13} aria-hidden="true" />
            Scroll to move through
          </span>
          <span className="journey-step-count">0{activeChapter + 1} / 0{journeyChapters.length}</span>
          <a href="#project">
            Skip journey <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          <div className="journey-progress" aria-hidden="true">
            <div className="journey-progress-fill" />
          </div>
        </div>
      </div>
    </section>
  );
}
