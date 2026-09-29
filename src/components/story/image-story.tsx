"use client";
import { useState } from "react";
import type { ImageAsset } from "@/types/content";
import { EditorialImage } from "@/components/media/editorial-image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { assets } from "@/data/assets";

type Slide = {
  label: string;
  title: string;
  description: string;
  image: ImageAsset;
};
export function ImageStory({
  slides,
  label,
}: {
  slides: readonly Slide[];
  label: string;
}) {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  return (
    <div
      className="image-story"
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
    >
      <EditorialImage
        key={slide.image.src}
        asset={slide.image}
        label={slide.label}
        aspectRatio="16 / 10"
        sizes="100vw"
        className="story-canvas"
      />

      <div className="image-story-copy" aria-live="polite">
        <span className="eyebrow">{slide.label}</span>
        <h3>{slide.title}</h3>
        <p>{slide.description}</p>
      </div>
      <div className="image-story-controls">
        <span className="eyebrow">
          0{active + 1} / 0{slides.length}
        </span>
        <button
          onClick={() =>
            setActive((active - 1 + slides.length) % slides.length)
          }
          aria-label={`Previous ${label} image`}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => setActive((active + 1) % slides.length)}
          aria-label={`Next ${label} image`}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
export function ProjectFilm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="action-link" onClick={() => setOpen(true)}>
        <Play size={14} /> Watch the project film
      </button>
      {open && (
        <Modal
          title="Simāna — official project film"
          onClose={() => setOpen(false)}
        >
          <video
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="project-film"
            poster={assets.hero.src}
          >
            <source src={assets.heroVideo} type="video/mp4" />
            <a href={assets.heroVideo}>Open the project film</a>
          </video>
          <p className="fine-print">
            Official project film from Simāna by Bhoomi. Rendered visualisations
            are indicative.
          </p>
        </Modal>
      )}
    </>
  );
}
