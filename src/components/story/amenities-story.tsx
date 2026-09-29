"use client";
import { useState } from "react";
import { amenityGroups } from "@/data/amenities";
import { EditorialImage } from "@/components/media/editorial-image";

export function AmenitiesStory() {
  const [active, setActive] = useState(0);
  const group = amenityGroups[active];
  return (
    <section
      id="amenities"
      className="amenities-section story-section"
      data-nav-theme="light"
      aria-labelledby="amenities-title"
    >
      <div className="page-gutter">
        <div className="section-line">
          <span className="eyebrow">05 / Wellness, leisure & community</span>
          <span className="eyebrow">54+ amenities</span>
        </div>
        <div className="section-heading">
          <h2 id="amenities-title" tabIndex={-1}>
            Life, <em>in balance.</em>
          </h2>
          <p>
            Everyday life, extended beyond your front door. Discover the spaces
            for movement, connection and a moment of calm.
          </p>
        </div>
        <div className="story-tabs" aria-label="Amenity categories">
          {amenityGroups.map((item, index) => (
            <button
              key={item.name}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="amenity-stage">
        <EditorialImage
          key={group.name}
          asset={group.image}
          label={group.name}
          aspectRatio="16 / 9"
          sizes="100vw"
        />
        <div className="amenity-caption page-gutter" aria-live="polite">
          <span className="eyebrow">{group.name}</span>
          <h3>{group.title}</h3>
          <p>{group.description}</p>
        </div>
      </div>
      <div className="page-gutter amenity-directory">
        <span className="eyebrow">Explore the collection</span>
        <div>
          {amenityGroups.map((item) => (
            <details key={item.name} open={item.name === group.name}>
              <summary>
                {item.name}
                <span aria-hidden="true">+</span>
              </summary>
              <ul>
                {item.items.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
