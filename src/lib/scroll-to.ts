/** Let the existing Lenis instance own programmatic motion as well as wheel motion. */
export function scrollToPosition(top: number) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top, behavior: "instant" });
    return;
  }
  const event = new CustomEvent("scroll:to", { detail: { top }, cancelable: true });
  window.dispatchEvent(event);
  if (!event.defaultPrevented) window.scrollTo({ top, behavior: "smooth" });
}
