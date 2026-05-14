import { Box, Container, Typography } from "@mui/joy"
import Link from "next/link"
import type React from "react"

export default function Header() {
  return (
    <header>
      <Container maxWidth="md">
        <DescktopHeader />
      </Container>
    </header>
  )
}

const DescktopHeader = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      py: 1,
      gap: {
        sm: 1,
        md: 3,
      },
    }}
  >
    <LinkButton href="/">
      <Typography>Завод ПЭК</Typography>
    </LinkButton>
    <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
      <LinkButton href="/contact">Контакт</LinkButton>
    </Box>
  </Box>
)

const LinkButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography level="body-md">{children}</Typography>
    </Link>
  )
}
