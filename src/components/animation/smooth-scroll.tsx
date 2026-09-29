"use client";

import { useEffect } from "react";

/** One scroll engine, shared with ScrollTrigger. Native scrolling is the fallback. */
export function SmoothScroll() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;
    let generation = 0;
    async function configure() {
      const current = ++generation;
      dispose?.();
      dispose = undefined;
      if (preference.matches) return;
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (current !== generation) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
      });
      const update = (time: number) => lenis.raf(time * 1000);
      const sync = () => {
        if (document.hidden || document.querySelector("dialog[open]")) {
          lenis.stop();
          gsap.ticker.remove(update);
        } else {
          lenis.start();
          gsap.ticker.add(update);
        }
      };
      const navigate = (event: Event) => {
        event.preventDefault();
        lenis.scrollTo((event as CustomEvent<{ top: number }>).detail.top, {
          duration: 1.05,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
        });
      };
      const anchor = (event: MouseEvent) => {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const href = link?.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        window.history.pushState(null, "", href);
        lenis.scrollTo(target, { duration: 1.05, offset: target.matches("button") ? -110 : 0 });
      };
      window.addEventListener("click", anchor);
      window.addEventListener("scroll:to", navigate);
      lenis.on("scroll", ScrollTrigger.update);
      document.addEventListener("visibilitychange", sync);
      window.addEventListener("navigation:toggle", sync);
      sync();
      dispose = () => {
        document.removeEventListener("visibilitychange", sync);
        window.removeEventListener("navigation:toggle", sync);
        gsap.ticker.remove(update);
        window.removeEventListener("scroll:to", navigate);
        window.removeEventListener("click", anchor);
        lenis.destroy();
      };
    }
    void configure();
    preference.addEventListener("change", configure);
    return () => {
      generation++;
      dispose?.();
      preference.removeEventListener("change", configure);
    };
  }, []);
  return null;
}
