import { Box, Container, Typography } from "@mui/joy"
import "../../app/global.css"

export function MDXWrapper({
  children,
  frontmatter,
}: {
  children: React.ReactNode
  frontmatter: any
}) {
  const { title, description } = frontmatter
  return (
    <Box
      sx={{
        backgroundImage: frontmatter.bg,
        pb: 5
      }}
    >
      <Container maxWidth="md">
        <Box my={3} mb={6}>
          <Typography sx={{ my: 2 }} level="h1">
            {title}
          </Typography>
          <Typography level="body-lg">
            {description}
          </Typography>
        </Box>
        {children}
      </Container>
    </Box>
  )
}

// After
export type Params = Promise<{ slug: string }>
// Metadata setup
export function createMetadataFactory(subDirectory: string) {
  return async function generateMetadataLib({ params }: { params: Params }) {
    let { slug } = await params
    if (!slug) {
      slug = "index"
    }

    const { frontmatter } = (await import(
      `@/content/${subDirectory}/${slug}.mdx`
    )) as any
    return {
      title: frontmatter.title,
      description: frontmatter.description,
    }
  }
}
