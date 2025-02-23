import { dn } from '@/lib/constants'
import fs from "fs"
import type { MetadataRoute } from 'next'
import path from "path"

// read all files in the content/docs directory
const files = fs.readdirSync(path.join(process.cwd(), "content/docs"))
const networks = files
  .map((file) => file.replace(".mdx", ""))
  .filter((slug) => slug !== "index")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${dn}`,
      lastModified: new Date(),
      changeFrequency: `yearly`,
      priority: 1,
    },
    {
      url: `https://${dn}/docs`,
      lastModified: new Date(),
      changeFrequency: `monthly`,
      priority: 0.8,
    },
    {
      url: `https://${dn}/blog`,
      lastModified: new Date(),
      changeFrequency: `weekly`,
      priority: 0.8,
    },
    ...networks.map((network) => ({
      url: `https://${dn}/docs/${network}`,
      lastModified: new Date(),
      changeFrequency: `monthly` as any,
      priority: 0.5,
    })),
  ]
}