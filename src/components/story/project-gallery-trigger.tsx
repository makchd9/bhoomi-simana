"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
const ProjectGallery = dynamic(() => import("./project-gallery").then(m => m.ProjectGallery));

export function ProjectGalleryTrigger({ id, className = "action-link", initialId = "lift-lobby" }: {
  id?: string; className?: string; initialId?: string;
}) {
  const [open, setOpen] = useState(false);
  return <>
    <button id={id} className={className} onClick={() => setOpen(true)} aria-haspopup="dialog">
      View project spaces <ArrowUpRight size={15} aria-hidden="true" />
    </button>
    {open && <ProjectGallery initialId={initialId} onClose={() => setOpen(false)} />}
  </>;
}
