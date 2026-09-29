"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { explorationGroups, explorationSpaces } from "@/data/building-explorer";
import type { PortalOrigin } from "./building-hotspot";

export default function BuildingExplorer({ initialSpace, origin, onClose }: {
  initialSpace: string; origin: PortalOrigin; onClose: () => void;
}) {
  const initial = Math.max(0, explorationSpaces.findIndex(space => space.id === initialSpace));
  const [selected, setSelected] = useState(initial);
  const [displayed, setDisplayed] = useState(initial);
  const [ready, setReady] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const closing = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const current = explorationSpaces[selected];
  const previous = explorationSpaces[displayed];
  const group = explorationGroups.find(item => item.id === current.group)!;
  const choose = (index: number) => { if (index === selected) return; setReady(null); setFailed(null); setSelected(index); };
  const move = (direction: number) => choose((selected + direction + explorationSpaces.length) % explorationSpaces.length);
  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { onClose(); return; }
    animation.current?.kill();
    animation.current = gsap.to(dialog.current, {
      opacity: 0, duration: .35, ease: "power2.inOut", onComplete: onClose,
    });
  }, [onClose]);
  useEffect(() => {
    const element = dialog.current;
    const bodyOverflow = document.body.style.overflow;
    element?.showModal();
    closeButton.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("navigation:toggle"));
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.current = gsap.fromTo(element, {
        clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
      }, { clipPath: `circle(${Math.hypot(innerWidth, innerHeight)}px at ${origin.x}px ${origin.y}px)`, duration: .85, ease: "power3.inOut", clearProps: "clipPath" });
    }
    return () => {
      animation.current?.kill();
      element?.close();
      document.body.style.overflow = bodyOverflow;
      window.dispatchEvent(new Event("navigation:toggle"));
    };
  }, [origin]);
  useEffect(() => {
    // Keep the active room visible in the horizontal touch rail without moving the page.
    const rail = dialog.current?.querySelector<HTMLElement>(".explorer-rooms");
    const item = rail?.querySelector<HTMLElement>("[aria-current]");
    if (rail && item) rail.scrollTo({ left: item.offsetLeft - rail.offsetLeft - 20, behavior: "instant" });
  }, [selected]);
  if (typeof document === "undefined") return null;
  return createPortal(<dialog
    ref={dialog} className="building-explorer" aria-label="Explore inside Simāna" data-lenis-prevent
    style={{ "--portal-x": `${origin.x}px`, "--portal-y": `${origin.y}px` } as CSSProperties}
    onCancel={event => { event.preventDefault(); close(); }}
    onKeyDown={event => {
      if (event.key === "Tab") {
        const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])"));
        const first = buttons[0], last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}
  >
    <div className="explorer-top">
      <button ref={closeButton} onClick={close} className="explorer-return"><ArrowLeft size={17} aria-hidden="true" /><span>Back to the building</span></button>
      <span className="explorer-breadcrumb">Simāna <span>/</span> Explore within</span>
      <button className="explorer-close" onClick={close} aria-label="Close building explorer"><X size={21} strokeWidth={1.25} aria-hidden="true" /></button>
    </div>
    <div className="explorer-context" aria-hidden="true">
      <span className="eyebrow">The Urban Oasis</span>
      <span className="explorer-context-line" />
      <span className="explorer-context-title">Life<br/><em>within.</em></span>
      <span className="explorer-context-location">Lalbaug, Mumbai</span>
    </div>
    <div className="explorer-image-stage"
      onTouchStart={event => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={event => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      {displayed !== selected && <Image className="explorer-image explorer-image-previous" src={previous.image.src} alt="" fill sizes="(max-width: 767px) 160vh, 80vw" quality={90} />}
      <Image key={current.id} className="explorer-image explorer-image-incoming" data-ready={ready === current.id}
        src={current.image.src} alt={current.image.alt} fill sizes="(max-width: 767px) 160vh, 80vw" quality={90}
        onLoad={() => setReady(current.id)} onError={() => setFailed(current.id)}
        onTransitionEnd={event => { if (event.propertyName === "opacity") setDisplayed(selected); }} />
      <div className="explorer-image-shade" />
      {ready !== current.id && <p className="explorer-load" role="status">{failed === current.id ? "This view couldn’t load. Choose another space." : "Entering the space…"}</p>}
      <div className="explorer-caption" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">{group.title} / {String(selected + 1).padStart(2, "0")}</span>
        <h2>{current.title}</h2>
      </div>
      <div className="explorer-arrows">
        <button onClick={() => move(-1)} aria-label="Previous space"><ArrowLeft size={19} aria-hidden="true" /></button>
        <span>{String(selected + 1).padStart(2,"0")} <i>/ {explorationSpaces.length}</i></span>
        <button onClick={() => move(1)} aria-label="Next space"><ArrowRight size={19} aria-hidden="true" /></button>
      </div>
    </div>
    <div className="explorer-navigation">
      <nav className="explorer-groups" aria-label="Experiences">
        {explorationGroups.map((item, index) => <button key={item.id} aria-current={item.id === group.id ? "true" : undefined}
          onClick={() => choose(explorationSpaces.findIndex(space => space.group === item.id))}>
          <span className="explorer-group-dot" aria-hidden="true"/><small>0{index + 1}</small><span>{item.title}</span>
        </button>)}
      </nav>
      <nav className="explorer-rooms" aria-label={`${group.title} spaces`}>
        {explorationSpaces.map((space, index) => space.group === group.id && <button key={space.id} onClick={() => choose(index)} aria-current={selected === index ? "true" : undefined}>{space.title}</button>)}
      </nav>
      <div className="explorer-footnote"><span>Owner-supplied architectural visualisations</span><span>Explore the spaces · Details on request</span></div>
    </div>
  </dialog>, document.body);
}
