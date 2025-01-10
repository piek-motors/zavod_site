import { generateMetadataFactory, MDXWrapper } from "@/lib/components/mdx-wrapper"

export const generateMetadata = generateMetadataFactory('blog')

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { default: Post, frontmatter } = await import(
    `@/content/blog/${slug}.mdx`
  )
  console.log(frontmatter)

  return (
    <MDXWrapper
     frontmatter={frontmatter}
    >
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  return [{ slug: "stablecoin-risks" }]
}

export const dynamicParams = true
