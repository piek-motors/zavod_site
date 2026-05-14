import { Divider, Table, Typography } from "@mui/joy"
import type { MDXComponents } from "mdx/types"
import Link from "next/link"

const lineHeight = 1.6

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <Typography>{children}</Typography>,
    h1: ({ children }) => (
      <Typography level="h1" my={2}>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography level="h2" my={2}>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography level="h3" my={2}>
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography level="h4" my={2}>
        {children}
      </Typography>
    ),
    hr: () => (
      <Divider
        sx={{
          my: "1em",
        }}
      />
    ),
    li: ({ children }) => <li style={{ lineHeight }}>{children}</li>,
    tr: ({ children }) => <tr>{children}</tr>,
    td: ({ children }) => <td style={{ padding: "5px 5px" }}>{children}</td>,
    a: ({ children, href }) => (
      <Link href={href!}>
        <Typography sx={{ lineHeight }}>{children}</Typography>
      </Link>
    ),
    table: ({ children }) => <Table variant="outlined">{children}</Table>,
    ...components,
  }
}
