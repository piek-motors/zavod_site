import { Box, Button, Container, Typography } from "@mui/joy"
import Link from "next/link"
import React from "react"
import { MobileHeader } from './mobile.header'

export default function Header() {
  return (
    <header>
      <Container>
        <DescktopeHeader />
        <MobileHeader />
      </Container>
    </header>
  )
}

const DescktopeHeader = () => (
  <Box
    sx={{
      display: {
        xs: "none",
        sm: "flex",
      },
      alignItems: "center",
      p: 1,
      gap: {
        sm: 1,
        md: 3,
      },
    }}
  >
    <LinkButton href="/">
      <Typography fontWeight={700}>Chain RPC</Typography>
    </LinkButton>
    <LinkButton href="/docs">Documentation</LinkButton>
    <LinkButton href="/blog">Blog</LinkButton>

    <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
      <LinkButton href="/contact-us">Contact us</LinkButton>
      <LinkButton href="/sign-in">Sign in</LinkButton>
    </Box>
  </Box>
)


const LinkButton = ({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) => {
  return (
    <Link href={href}>
      <Button variant="plain" color="neutral">
        {children}
      </Button>
    </Link>
  )
}
