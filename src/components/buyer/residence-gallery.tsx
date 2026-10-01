"use client";
import { useState } from "react";
import Image from "next/image";
import { interiors } from "@/data/residences";
import { media } from "@/data/source-media";
import { Modal } from "@/components/ui/modal";
const slides = [
  ...interiors,
  {
    label: "Elevation",
    title: "The architecture, considered.",
    description: "A project visualisation of Simāna’s elevation.",
    image: media.elevation,
  },
];
export function ResidenceGallery() {
  const [active, setActive] = useState(0),
    [open, setOpen] = useState(false);
  const slide = slides[active];
  return (
    <section
      className="buyer-section residence-gallery page-gutter"
      data-nav-theme="dark"
      aria-label="Residence image gallery"
    >
      <div className="gallery-editorial">
        <span className="eyebrow">Inside the residences</span>
        <h2>
          Step into <em>the everyday.</em>
        </h2>
        <p>
          Natural light, efficient layouts and room for both shared and private
          life. Explore the project’s published flat photography and interior
          visualisations.
        </p>
        <div className="gallery-options" aria-label="Choose a residence image">
          {slides.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button
          className="residence-photo"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge ${slide.label} image`}
        >
          <Image
            src={slide.image.src}
            width={slide.image.width}
            height={slide.image.height}
            alt={slide.image.alt}
            sizes="(max-width:767px) 90vw, 40vw"
            unoptimized
          />
          <span>View image ↗</span>
        </button>
        <p className="image-credit">
          {slide.image.kind} · {slide.label}
        </p>
        <h3>{slide.title}</h3>
        <p>{slide.description}</p>
      </div>
      {open && (
        <Modal
          title={`${slide.label} · ${slide.image.kind}`}
          onClose={() => setOpen(false)}
        >
          <Image
            className="gallery-original"
            src={slide.image.src}
            width={slide.image.width}
            height={slide.image.height}
            alt={slide.image.alt}
            unoptimized
          />
          <p className="fine-print">
            {slide.image.caption}. Furnishing and finishes are illustrative;
            confirm the agreed specifications for your home.
          </p>
        </Modal>
      )}
    </section>
  );
}
