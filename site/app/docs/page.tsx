import { generateMetadataFactory, MDXWrapper } from "@/lib/components/mdx-wrapper"
import Sidenav from '@/lib/components/sidenav'

// Metadata setup
export const generateMetadata = generateMetadataFactory('docs')

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { default: Post, frontmatter } = (await import(
    `@/content/docs/index.mdx`
  )) as any

  return (
    <MDXWrapper frontmatter={frontmatter} LeftComponent={<Sidenav />}>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  return [{ slug: "" }]
}

export const dynamicParams = false
