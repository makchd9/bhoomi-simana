import type { Configuration, Landmark } from "@/types/content";

/** Providers implement these boundaries in the relevant delivery phase. */
export interface LocationMapProps {
  center: [longitude: number, latitude: number] | null;
  landmarks: Landmark[];
  selectedLandmarkId?: string;
  onSelectLandmark?: (id: string) => void;
}
export interface BuildingViewerProps {
  modelUrl: string | null;
  selectedFloorId?: string;
  floorMeshNames?: Record<string, string[]>;
}
export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  configuration: Configuration | null;
  message: string;
}
export interface EnquiryAdapter {
  submit(input: EnquiryInput): Promise<{ reference: string }>;
}
/** Deliberately disabled. No data transmission or persistence without a backend. */
export const enquiryAdapter: EnquiryAdapter | null = null;
