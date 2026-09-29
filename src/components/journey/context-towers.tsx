"use client";
import { useEffect, useId, useRef } from "react";

/** Concept companions sit behind the original, unmodified 58-floor tower film. */
export function ContextTowers() {
  const root = useRef<SVGSVGElement>(null);
  const source = useRef<SVGGElement>(null);
  const companions = useRef<SVGGElement>(null);
  const foreground = useRef<SVGPolygonElement>(null);
  const id = useId().replaceAll(":", "");
  useEffect(() => {
    const element = root.current;
    const article = element?.closest("article");
    const video = article?.querySelector("video");
    if (!element || !article) return;
    let callback = 0;
    const project = (time = video?.currentTime ?? 0) => {
      const { width, height } = article.getBoundingClientRect();
      const portrait = Boolean(video?.getAttribute("src")?.includes("-mobile") && video.readyState >= 2);
      const ratio = portrait ? 9 / 16 : 16 / 9;
      const renderedWidth = Math.max(width, height * ratio);
      const renderedHeight = renderedWidth / ratio;
      const masterWidth = portrait ? renderedWidth * (16 / 9) / (9 / 16) : renderedWidth;
      source.current?.setAttribute("transform", `translate(${(width - masterWidth) / 2} ${(height - renderedHeight) / 2}) scale(${masterWidth / 3840} ${renderedHeight / 2160})`);
      const progress = Math.min(1, time / (119 / 30));
      const scale = 1 + progress * .022;
      companions.current?.setAttribute("transform", `translate(1920 1944) scale(${scale}) translate(-1920 -1944)`);
      // This occlusion matte protects the actual tower and its podium in every decoded frame.
      foreground.current?.setAttribute("points", [
        [.447,.25-progress*.022],[.566,.29-progress*.022],[.572,.893],
        [.593,1],[.42,1],[.435,.902],[.446,.888],
      ].map(([x,y]) => `${x*3840},${y*2160}`).join(" "));
    };
    const update = () => project();
    const observe = () => {
      if (!video?.requestVideoFrameCallback) return;
      callback = video.requestVideoFrameCallback((_now, metadata) => { project(metadata.mediaTime); observe(); });
    };
    const observer = new ResizeObserver(update);
    observer.observe(article);
    video?.addEventListener("loadeddata", update);
    video?.addEventListener("seeked", update);
    project(); observe();
    return () => {
      observer.disconnect();
      video?.removeEventListener("loadeddata", update);
      video?.removeEventListener("seeked", update);
      if (callback) video?.cancelVideoFrameCallback(callback);
    };
  }, []);
  return <svg ref={root} className="context-towers" aria-hidden="true" focusable="false" data-background-floors="43 53">
    <defs>
      <filter id={`${id}-haze`} colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values=".52 .06 .04 0 .27 .04 .55 .03 0 .28 .04 .06 .52 0 .30 0 0 0 1 0" />
      </filter>
      <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="white"/><stop offset=".82" stopColor="white"/><stop offset=".95" stopColor="black"/>
      </linearGradient>
      <mask id={`${id}-behind`} maskUnits="userSpaceOnUse" x="0" y="0" width="3840" height="2160">
        <rect width="3840" height="2160" fill={`url(#${id}-ground)`} />
        <polygon ref={foreground} fill="black" />
      </mask>
    </defs>
    <g ref={source} mask={`url(#${id}-behind)`}>
      <g ref={companions} filter={`url(#${id}-haze)`} opacity=".8">
        <svg x="1382" y="924" width="410" height="1060" viewBox="531 311 235 580" preserveAspectRatio="none" overflow="hidden">
          <image href="/images/simana/context/companion-towers.png" width="1672" height="941" />
        </svg>
        <svg x="2074" y="665" width="440" height="1319" viewBox="943 128 269 768" preserveAspectRatio="none" overflow="hidden">
          <image href="/images/simana/context/companion-towers.png" width="1672" height="941" />
        </svg>
      </g>
    </g>
  </svg>;
}
