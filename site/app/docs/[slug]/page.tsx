import { generateMetadataFactory, MDXWrapper } from "@/lib/components/mdx-wrapper"

// Metadata setup
export const generateMetadata = generateMetadataFactory('docs')

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
    <MDXWrapper frontmatter={frontmatter}>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  return [{ slug: "stablecoin-risks" }]
}

export const dynamicParams = false
