"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { EditorialImage } from "@/components/media/editorial-image";
import { projectGallery } from "@/data/project-gallery";
import "./project-gallery.css";

export function ProjectGallery({ initialId, onClose }: { initialId: string; onClose: () => void }) {
  const [active, setActive] = useState(() => Math.max(0, projectGallery.findIndex(s => s.id === initialId)));
  const touch = useRef<{ x: number; y: number } | null>(null);
  const slide = projectGallery[active];
  const move = (direction: number) => setActive(index => (index + direction + projectGallery.length) % projectGallery.length);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLSelectElement) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      setActive(index => (index + (event.key === "ArrowRight" ? 1 : -1) + projectGallery.length) % projectGallery.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return <Modal title="Spaces at Simāna" onClose={onClose} className="project-gallery-dialog">
    <div className="project-gallery" role="region" aria-roledescription="carousel" aria-label="Project spaces">
      <div className="project-gallery-frame"
        onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={event => {
          if (!touch.current) return;
          const dx = event.changedTouches[0].clientX - touch.current.x;
          const dy = event.changedTouches[0].clientY - touch.current.y;
          touch.current = null;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        }}>
        <EditorialImage key={slide.id} asset={slide.image} label={slide.title} aspectRatio="auto" sizes="(max-width: 767px) 100vw, 90vw" />
      </div>
      <div className="project-gallery-caption">
        <div aria-live="polite" aria-atomic="true">
          <span className="eyebrow">{String(active + 1).padStart(2, "0")} / {projectGallery.length}</span>
          <h2>{slide.title}</h2>
        </div>
        <div className="project-gallery-controls">
          <button onClick={() => move(-1)} aria-label="Previous project space"><ArrowLeft size={20} aria-hidden="true" /></button>
          <button onClick={() => move(1)} aria-label="Next project space"><ArrowRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="project-gallery-footnote">
        <span>Project renders · Artist’s visualisations</span>
        <label>Explore a space
          <select value={active} onChange={event => setActive(Number(event.target.value))}>
            {projectGallery.map((item, index) => <option key={item.id} value={index}>{item.title}</option>)}
          </select>
        </label>
      </div>
    </div>
  </Modal>;
}
