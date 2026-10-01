import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/buyer-content";
import { pages } from "@/data/pages";
export default function sitemap(): MetadataRoute.Sitemap {return ["",...Object.keys(pages)].map(path=>({url:`${siteUrl}/${path}`}));}
