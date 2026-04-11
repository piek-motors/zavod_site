import {
  createMetadataFactory,
  MDXWrapper,
} from "@/lib/components/mdx-wrapper"
import Sidenav from "@/lib/components/sidenav"
import fs from "fs"
import path from "path"
// Metadata setup
export const generateMetadata = createMetadataFactory("docs")

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { default: Post, frontmatter } = (await import(
    `@/content/docs/${slug}.mdx`
  )) as any

  return (
    <MDXWrapper frontmatter={frontmatter} LeftComponent={<Sidenav />}>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  // read all files in the content/docs directory
  const files = fs.readdirSync(path.join(process.cwd(), "content/docs"))
  const slugs = files.map((file) => file.replace(".mdx", ""))

  // return [{ slug: "stablecoin-risks" }]
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = false
