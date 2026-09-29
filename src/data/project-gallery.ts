import type { ImageAsset } from "@/types/content";
const space = (id: string, title: string, sourceId: string) => ({
  id, title,
  image: {
    src: `/images/simana/spaces/${id}.webp`,
    alt: `Architectural visualisation of the Simāna ${title.toLowerCase()}`,
    width: 2560, height: 1440, placeholder: false,
    sourceUrl: `https://drive.google.com/file/d/${sourceId}/view`,
  } satisfies ImageAsset,
});
// Owner-supplied project images. They do not establish tower-specific amenity entitlements.
export const projectGallery = [
  space("lift-lobby", "Lift lobby", "1BzweqB4Jdq8SO6EFEDlq7TasX5_IXHov"),
  space("pool", "Pool", "1jwWNb0A5daeOJOG3zzz2mfw5DtAioU3i"),
  space("spa", "Spa", "1E_pSAJZ05N8YblCjcNL0nqvTs_BIX96O"),
  space("cafe", "Café", "1XZWl3ZElxTr3jt8wL0MX2UZEHaGvNYYP"),
  space("library", "Library", "1BBEGvOE2GuKoihGgx8BfgARvAwYXVSfY"),
  space("banquet", "Banquet", "1KmbEqvbE-ZOidR1M7Sb7LGFsu2oYI1M1"),
  space("cards-room", "Cards room", "1QgFBkBIVtKo-zXNcBfOGWL30YYwoct6l"),
  space("indoor-games", "Indoor games", "1Us6eohLlKxFcMWFvsCmnl0vWDSRH71xw"),
  space("creche", "Crèche", "1T7ZKvg6zsP_R38bYBucEmyoyPUKRvAXn"),
  space("meeting-room", "Meeting room", "1Ols6QYfw6mI7OV-PdSRPFevduEQ08lQ8"),
  space("meeting-room-tv", "Meeting room · Second view", "1vI_9eYghwOvvDVZ7yUjFSNHWdOq4nwBp"),
];
