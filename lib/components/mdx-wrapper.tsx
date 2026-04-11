import { Box, Container, Typography } from "@mui/joy"
import "../../app/global.css"
import CodeSampleCopy from "./code-copy"
import { Footer } from "./footer"

export function MDXWrapper({
  children,
  frontmatter,
  LeftComponent,
}: {
  children: React.ReactNode
  frontmatter: any
  LeftComponent?: React.ReactNode
}) {
  const { title, description, lastUpdated } = frontmatter

  return (
    <Box
      sx={{
        backgroundImage: frontmatter.bg,
        display: "grid",
        gridTemplateColumns: {
          sm: "1fr",
          md: "1fr 7fr 1fr",
        },
      }}
    >
      <Box
        position={"sticky"}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        {LeftComponent}
      </Box>

      <Container maxWidth="md">
        <CodeSampleCopy />
        <Box my={3} mb={6}>
          <Typography sx={{ my: 2 }} level="h1">
            {title}
          </Typography>
          <Typography sx={{ my: 2 }} level="body-lg">
            {description}
          </Typography>
        </Box>

        {children}

        {lastUpdated && (
          <Typography sx={{ my: 2 }} level="body-sm">
            Last updated: {lastUpdated}
          </Typography>
        )}
        <Footer />
      </Container>

      <Box
        position={"sticky"}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      ></Box>
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
