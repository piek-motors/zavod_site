import {
  createMetadataFactory,
  MDXWrapper,
} from "@/lib/components/mdx-wrapper"
import fs from "fs"
import path from "path"
// Metadata setup
export const generateMetadata = createMetadataFactory("service")

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const rawSlug = (await params).slug
  // Decode URL-encoded slug (e.g., %D0%A2%D0%B5%D1%80%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F -> Термическая)
  const slug = decodeURIComponent(rawSlug)
  const { default: Post, frontmatter } = (await import(
    `@/content/service/${slug}.mdx`
  )) as any

  return (
    <MDXWrapper frontmatter={frontmatter} LeftComponent={<></>}>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/service"))
  const slugs = files.map((file) => file.replace(".mdx", ""))

  // return [{ slug: "stablecoin-risks" }]
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = false
