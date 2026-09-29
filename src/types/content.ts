/** Null means not supplied. Never replace missing project facts with demo values. */
export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder: boolean;
  caption?: string;
  sourceUrl?: string;
  position?: string;
};
export type Configuration =
  "1 bedroom" | "2 bedroom" | "3 bedroom" | "4 bedroom" | "penthouse";
export type Residence = {
  id: string;
  apartmentNumber: string;
  type: Configuration;
  area: { value: number; unit: "sq ft" | "sq m" } | null;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  orientation: string | null;
  outdoorSpace: string | null;
  floorPlanImage: ImageAsset | null;
  gallery: ImageAsset[];
  features: string[];
};
export type Floor = {
  id: string;
  number: number;
  label: string;
  plan: ImageAsset | null;
  residenceIds: string[];
};
export type Amenity = {
  id: string;
  title: string;
  description: string;
  image: ImageAsset | null;
};
export type Landmark = {
  id: string;
  name: string;
  category:
    | "airport"
    | "business"
    | "school"
    | "hospital"
    | "shopping"
    | "restaurant"
    | "landmark";
  coordinates: [number, number] | null;
  travelLabel: string | null;
};
