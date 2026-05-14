import { Box, Container } from "@mui/joy"
import "../../app/global.css"

export function MDXWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        py: 2,
      }}
    >
      <Container maxWidth="md">{children}</Container>
    </Box>
  )
}
