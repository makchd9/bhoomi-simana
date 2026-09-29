"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { projectLabel, project } from "@/data/project";

export function Navigation() {
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const animation = useRef<gsap.core.Tween | null>(null);
  const opener = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const sections = [
      ...document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
    ];
    const update = () => {
      frame = 0;
      const section = sections.findLast((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= 48 && bounds.bottom > 48;
      });
      setTheme(section?.dataset.navTheme ?? "light");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("navigation:toggle"));
    return () => {
      document.body.style.overflow = previous;
      window.dispatchEvent(new Event("navigation:toggle"));
    };
  }, [open]);
  useEffect(
    () => () => {
      animation.current?.kill();
    },
    [],
  );
  function show() {
    setOpen(true);
    dialog.current?.showModal();
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.current?.kill();
      animation.current = gsap.fromTo(
        dialog.current,
        { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.65,
          ease: "power3.inOut",
          clearProps: "all",
        },
      );
    }
  }
  function close(anchor?: string) {
    const finish = () => {
      dialog.current?.close();
      gsap.set(dialog.current, { clearProps: "all" });
      setOpen(false);
      if (anchor) {
        // Let React release the scroll lock before asking Lenis/native scrolling to navigate.
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event("navigation:toggle"));
          const navigate = new CustomEvent("journey:navigate", { detail: anchor, cancelable: true });
          window.dispatchEvent(navigate);
          if (!navigate.defaultPrevented) window.location.hash = anchor;
          const target = document.querySelector<HTMLElement>(`${anchor} h2`) ?? document.getElementById(anchor.slice(1));
          target?.focus({ preventScroll: true });
        });
      } else opener.current?.focus();
    };
    animation.current?.kill();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else
      animation.current = gsap.to(dialog.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: finish,
      });
  }
  return (
    <>
      <header className="site-header page-gutter" data-theme={theme}>
        <a className="wordmark" href="#home" aria-label="Project home">
          <span>Simāna</span>
          <small>The Urban Oasis</small>
        </a>
        <a href="#contact" className="header-enquiry">Private presentation <span aria-hidden="true">↗</span></a>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          ref={opener}
          className="menu-trigger"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="navigation-dialog"
          onClick={show}
        >
          <span>Menu</span>
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <dialog
        ref={dialog}
        id="navigation-dialog"
        className="navigation-dialog"
        aria-labelledby="navigation-title"
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const items = dialog.current?.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          );
          if (!items?.length) return;
          const first = items[0],
            last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <div className="dialog-top">
          <span className="wordmark">{projectLabel}</span>
          <button
            className="dialog-close"
            aria-label="Close navigation"
            onClick={() => close()}
          >
            <span>Close</span>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="menu-content">
          <h2 id="navigation-title" className="eyebrow">
            Explore the project
          </h2>
          <nav aria-label="Expanded navigation">
            {navigation.map((item, index) => (
              <div className="menu-row" key={item.label}>
                <span className="menu-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    close(item.href);
                  }}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
        <div className="dialog-bottom">
          <span>{project.location}</span>
          <span>{project.copy.heroCaption}</span>
        </div>
      </dialog>
    </>
  );
}
