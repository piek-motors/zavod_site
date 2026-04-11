import { createMetadataFactory, MDXWrapper } from "@/lib/components/mdx-wrapper"

export const generateMetadata = createMetadataFactory("blog")

type tParams = Promise<{ slug: string }>
export default async function Page({ params }: { params: tParams }) {
  const { slug } = await params
  const { default: Post, frontmatter } = (await import(
    `@/content/blog/index.mdx`
  )) as any

  return (
    <MDXWrapper frontmatter={frontmatter}>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  return [{ slug: "" }]
}

export const dynamicParams = false
