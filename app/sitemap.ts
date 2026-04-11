import { dn } from '@/lib/constants'
import fs from "fs"
import type { MetadataRoute } from 'next'
import path from "path"

// read all files in the content/docs directory
const files = fs.readdirSync(path.join(process.cwd(), "content/service"))
const services = files
  .map((file) => file.replace(".mdx", ""))
  .filter((slug) => slug !== "index")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${dn}`,
      lastModified: new Date(),
      priority: 1,
    },
    ...services.map((network) => ({
      url: `https://${dn}/service/${network}`,
      lastModified: new Date(),
      priority: 1,
    })),
  ]
}