export const dynamic = "force-static";

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.locdo.tech/",
      lastModified: new Date(),
    },
    {
      url: "https://locdo.tech/",
      lastModified: new Date(),
    },
  ];
}
