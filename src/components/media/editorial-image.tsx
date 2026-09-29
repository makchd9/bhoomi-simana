"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ImageAsset } from "@/types/content";
import { motion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function EditorialImage({
  asset,
  label,
  aspectRatio = "4 / 5",
  sizes = "(max-width: 767px) 100vw, 45vw",
  priority = false,
  quality = 90,
  original = false,
  deferred = false,
  reveal = false,
  parallax = false,
  className = "",
}: {
  asset: ImageAsset | null;
  label: string;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  quality?: 90 | 95;
  original?: boolean;
  deferred?: boolean;
  reveal?: boolean;
  parallax?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (reveal)
          gsap.fromTo(
            root.current,
            { clipPath: "inset(8% 0 8% 0)" },
            {
              clipPath: "inset(0% 0 0% 0)",
              duration: motion.duration.reveal,
              ease: motion.ease,
              scrollTrigger: {
                trigger: root.current,
                start: "top 88%",
                once: true,
              },
            },
          );
        if (parallax && matchMedia("(min-width: 768px)").matches)
          gsap.fromTo(
            ".editorial-image-inner",
            { yPercent: -3, scale: 1.08 },
            {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
      });
      return () => media.revert();
    },
    { scope: root, dependencies: [reveal, parallax] },
  );
  return (
    <figure
      ref={root}
      className={`editorial-image ${className}`}
      style={{ aspectRatio }}
    >
      <div className="editorial-image-inner">
        {asset && !failed ? (!deferred || loaded ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            quality={quality}
            unoptimized={original}
            priority={priority}
            onError={() => setFailed(true)}
            onLoad={() => setLoaded(true)}
            style={{
              objectFit: "cover",
              objectPosition: asset.position ?? "center",
            }}
          />
        ) : null) : (
          <div
            className="empty-image"
            role="img"
            aria-label={`${label}: project imagery to be supplied`}
          >
            <span>Image to follow</span>
          </div>
        )}
      </div>
      {(!asset || asset.placeholder || failed || asset.caption) && (
        <figcaption className="concept-label">
          {failed
            ? "Project image to follow"
            : asset?.caption ?? "Concept imagery · Not the actual development"}
        </figcaption>
      )}
    </figure>
  );
}
