"use client";
import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { scenePortals } from "@/data/building-explorer";

export type PortalOrigin = { x: number; y: number };

/** Project points through the same centre crop as the source film. No invented floor mapping. */
export function BuildingHotspot({ scene, onExplore }: {
  scene: string;
  onExplore: (space: string, origin: PortalOrigin) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const polygon = useRef<SVGPolygonElement>(null);
  const portal = scenePortals[scene];
  useEffect(() => {
    const element = root.current;
    const article = element?.closest("article");
    const video = article?.querySelector("video");
    if (!element || !article || !portal) return;
    let callback = 0;
    const project = (time = video?.currentTime ?? 0) => {
      const { width, height } = article.getBoundingClientRect();
      const portrait = Boolean(video?.getAttribute("src")?.includes("-mobile") && video.readyState >= 2);
      const ratio = portrait ? 9 / 16 : 16 / 9;
      const renderedWidth = Math.max(width, height * ratio);
      const renderedHeight = renderedWidth / ratio;
      const progress = Math.min(1, time / (119 / 30));
      const point = (x: number, y: number) => {
        if (portrait) x = (x - .5) * (16 / 9) / (9 / 16) + .5;
        return [x * renderedWidth - (renderedWidth - width) / 2, y * renderedHeight - (renderedHeight - height) / 2];
      };
      const [x, y] = point(portal.point[0], portal.point[1] - (scene === "skyline" ? progress * .017 : 0));
      button.current?.style.setProperty("left", `${x}px`);
      button.current?.style.setProperty("top", `${y}px`);
      polygon.current?.setAttribute("points", [
        [.451, .253 - progress * .021], [.553, .286 - progress * .02], [.568, .897], [.449, .888],
      ].map(([px, py]) => point(px, py).join(",")).join(" "));
    };
    const update = () => project();
    const observe = () => {
      if (!video?.requestVideoFrameCallback) return;
      callback = video.requestVideoFrameCallback((_now, metadata) => { project(metadata.mediaTime); observe(); });
    };
    const resize = new ResizeObserver(update);
    resize.observe(article);
    video?.addEventListener("loadeddata", update);
    video?.addEventListener("seeked", update);
    project(); observe();
    return () => {
      resize.disconnect();
      video?.removeEventListener("loadeddata", update);
      video?.removeEventListener("seeked", update);
      if (callback) video?.cancelVideoFrameCallback(callback);
    };
  }, [portal, scene]);
  if (!portal) return null;
  const open = () => {
    button.current?.focus({ preventScroll: true });
    const bounds = button.current?.getBoundingClientRect();
    onExplore(portal.space, { x: (bounds?.x ?? innerWidth / 2) + 22, y: (bounds?.y ?? innerHeight / 2) + 22 });
  };
  return <div ref={root} className={`building-portals ${scene === "skyline" ? "building-portals-tower" : ""}`}>
    {scene === "skyline" && <svg className="building-hit-area" aria-hidden="true">
      <polygon ref={polygon} onClick={open} />
    </svg>}
    <button ref={button} id={scene === "skyline" ? "spaces" : undefined} type="button" className="building-hotspot" aria-haspopup="dialog" onClick={open}>
      <span className="hotspot-target"><Plus size={16} strokeWidth={1.25} aria-hidden="true" /></span>
      <span className="hotspot-label"><small>{scene === "skyline" ? "Discover what’s within" : "Explore within"}</small><span>{portal.label}<span aria-hidden="true">↗</span></span></span>
    </button>
  </div>;
}
