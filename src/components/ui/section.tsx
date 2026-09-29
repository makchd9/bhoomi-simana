import type { ComponentPropsWithoutRef } from "react";
export function Section({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return <section className={`section-shell ${className}`} {...props} />;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
