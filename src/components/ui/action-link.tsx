import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
export function ActionLink({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a className={`action-link ${className}`} {...props}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
