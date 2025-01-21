import {
  createMetadataFactory,
  MDXWrapper,
} from "@/lib/components/mdx-wrapper"

export const generateMetadata = createMetadataFactory("blog")
type paramsType = Promise<{ slug: string }>

export default async function Page(props: { params: paramsType }) {
  const { slug } = await props.params
  const { default: Post, frontmatter } = await import(
    `@/content/blog/${slug}.mdx`
  )

  return (
    <MDXWrapper frontmatter={frontmatter}>
      <Post />
    </MDXWrapper>
  )
}

export async function generateStaticParams() {
  return [{ slug: "stablecoin-risks" }]
}

export const dynamicParams = false
