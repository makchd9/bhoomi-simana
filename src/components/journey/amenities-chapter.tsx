"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { explorationGroups, explorationSpaces } from "@/data/building-explorer";

/** A normal scroll chapter: no modal, scroll lock or hotspot required. */
export function AmenitiesChapter({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [staticVisible, setStaticVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [ready, setReady] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = explorationSpaces[selected];
  const previous = explorationSpaces[displayed];
  const group = explorationGroups.find(item => item.id === current.group)!;
  const enabled = active || staticVisible;
  const choose = (index: number) => { if (index === selected) return; setReady(null); setFailed(null); setSelected(index); };
  const move = (direction: number) => choose((selected + direction + explorationSpaces.length) % explorationSpaces.length);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && element.closest(".tower-journey")?.getAttribute("data-enhanced") !== "true") setStaticVisible(true);
    }, { threshold: .15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const rail = root.current?.querySelector<HTMLElement>(".amenities-rooms");
    const item = rail?.querySelector<HTMLElement>("[aria-current]");
    if (rail && item) rail.scrollTo({ left: item.offsetLeft - rail.offsetLeft - 20, behavior: "instant" });
  }, [selected]);
  return <div ref={root} className="amenities-chapter">
    <noscript><Image className="amenities-image" src={explorationSpaces[0].image.src} alt={explorationSpaces[0].image.alt} fill sizes="100vw" quality={90} /></noscript>
    <div className="amenities-visual" onTouchStart={event => {
      touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }} onTouchEnd={event => {
      if (!touch.current) return;
      const dx = event.changedTouches[0].clientX - touch.current.x;
      const dy = event.changedTouches[0].clientY - touch.current.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
      touch.current = null;
    }}>
      {enabled && <>
        {displayed !== selected && <Image className="amenities-image" src={previous.image.src} alt="" fill sizes="(max-width:767px) 180vh, 120vw" quality={90} />}
        <Image key={current.id} className="amenities-image amenities-incoming" data-ready={ready === current.id}
          src={current.image.src} alt={current.image.alt} fill sizes="(max-width:767px) 180vh, 120vw" quality={90}
          onLoad={() => setReady(current.id)} onError={() => setFailed(current.id)}
          onTransitionEnd={event => { if (event.propertyName === "opacity") setDisplayed(selected); }} />
      </>}
      <div className="amenities-shade" />
    </div>
    <div className="journey-copy amenities-intro page-gutter">
      <p className="eyebrow">01 / Amenities</p>
      <h2 id="spaces-title" tabIndex={-1}>Life,<em>within.</em></h2>
    </div>
    <div className="amenities-current" aria-live="polite" aria-atomic="true">
      <span className="eyebrow">{group.title} / {String(selected + 1).padStart(2, "0")}</span>
      <h3>{current.title}</h3>
    </div>
    {enabled && ready !== current.id && <p className="amenities-status" role="status">{failed === current.id ? "This view couldn’t load. Choose another space." : "Entering the space…"}</p>}
    <div className="amenities-arrows">
      <button onClick={() => move(-1)} aria-label="Previous amenity"><ArrowLeft size={18} aria-hidden="true" /></button>
      <span>{String(selected + 1).padStart(2,"0")} <i>/ {explorationSpaces.length}</i></span>
      <button onClick={() => move(1)} aria-label="Next amenity"><ArrowRight size={18} aria-hidden="true" /></button>
    </div>
    <div className="amenities-controls" onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>
      <nav className="amenities-groups" aria-label="Amenity experiences">
        {explorationGroups.map((item, index) => <button key={item.id} aria-current={item.id === group.id ? "true" : undefined}
          onClick={() => choose(explorationSpaces.findIndex(space => space.group === item.id))}>
          <span className="amenity-dot" aria-hidden="true" /><small>0{index+1}</small><span>{item.title}</span>
        </button>)}
      </nav>
      <nav className="amenities-rooms" aria-label={`${group.title} amenities`}>
        {explorationSpaces.map((space, index) => space.group === group.id && <button key={space.id} onClick={() => choose(index)} aria-current={selected === index ? "true" : undefined}>{space.title}</button>)}
      </nav>
    </div>
  </div>;
}
