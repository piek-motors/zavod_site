import fs from "fs"
import path from "path"
import { createMetadataFactory, MDXWrapper } from "@/lib/components/mdx-wrapper"
// Metadata setup
export const generateMetadata = createMetadataFactory("service")

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const rawSlug = (await params).slug
  const slug = decodeURIComponent(rawSlug)
  const { default: Post, frontmatter } = (await import(`@/content/service/${slug}.mdx`)) as any

  return (
    <MDXWrapper frontmatter={frontmatter}>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/service"))
  const slugs = files.map((file) => file.replace(".mdx", ""))
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = false
