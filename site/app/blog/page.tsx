import { generateMetadataFactory, MDXWrapper } from '@/lib/components/mdx-wrapper'

export const generateMetadata = generateMetadataFactory('blog')


export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const { default: Post, frontmatter } = await import(`@/content/blog/index.mdx`) as any

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
