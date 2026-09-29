"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({
  title,
  onClose,
  children,
  className = "",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previous = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("navigation:toggle"));
    return () => {
      document.body.style.overflow = previous;
      window.dispatchEvent(new Event("navigation:toggle"));
      opener?.focus({ preventScroll: true });
    };
  }, []);
  if (typeof document === "undefined") return null;
  return createPortal(
    <dialog
      ref={ref}
      className={`media-dialog ${className}`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      data-lenis-prevent
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="media-dialog-top">
        <span className="eyebrow">{title}</span>
        <button autoFocus onClick={onClose} aria-label="Close viewer">
          <span>Close</span>
          <X size={20} />
        </button>
      </div>
      <div className="media-dialog-content">{children}</div>
    </dialog>,
    document.body,
  );
}
