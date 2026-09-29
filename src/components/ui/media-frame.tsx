import type { ImageAsset } from "@/types/content";
import { EditorialImage } from "@/components/media/editorial-image";

/** Compatibility wrapper for the Phase 1 primitive. */
export function MediaFrame({
  asset = null,
  label,
  priority = false,
  className = "",
}: {
  asset?: ImageAsset | null;
  label: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <EditorialImage
      asset={asset}
      label={label}
      priority={priority}
      className={className}
    />
  );
}
