import type { MetadataRoute } from "next";

import { CASE_STUDIES } from "@/lib/content";
import { SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/privacy-policy", "/terms"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.5,
  }));

  const caseStudies = CASE_STUDIES.map((c) => ({
    url: `${SITE.url}/case-studies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...caseStudies];
}
