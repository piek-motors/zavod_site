import { createMetadataFactory, MDXWrapper } from "@/lib/components/mdx-wrapper"

// Metadata setup
export const generateMetadata = createMetadataFactory('service')

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { default: Post, frontmatter } = (await import(
    `@/content/service/index.mdx`
  )) as any

  return (
    <MDXWrapper frontmatter={frontmatter} LeftComponent={<></>}>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  return [{ slug: "" }]
}

export const dynamicParams = false
