import fs from "fs"
import type { Metadata } from "next"
import path from "path"
import { MDXWrapper } from "@/lib/components/mdx-wrapper"

// 1. Helper function to get MDX data (keeps it DRY)
async function getServicePost(slug: string) {
  const decodedSlug = decodeURIComponent(slug)
  try {
    // Dynamic import of the MDX file
    const post = await import(`@/content/service/${decodedSlug}.mdx`)
    return {
      Post: post.default,
      frontmatter: post.frontmatter,
    }
  } catch (error) {
    return null
  }
}

// 2. Implementation of generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getServicePost(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  const { title, description } = post.frontmatter

  return {
    title: title,
    description: description,
    alternates: { canonical: `/service/${slug}` },
    openGraph: {
      title: title,
      description: description,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getServicePost(slug)
  if (!post) return <div>Service not found</div>

  const { Post } = post

  return (
    <MDXWrapper>
      <Post />
    </MDXWrapper>
  )
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/service"))
  return files.map((file) => ({
    slug: file.replace(".mdx", ""),
  }))
}

export const dynamicParams = false
