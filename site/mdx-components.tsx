import { Divider, Typography } from "@mui/joy"
import type { MDXComponents } from "mdx/types"
import Link from 'next/link'

const lineHeight = 1.8

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => (
      <Typography sx={{ lineHeight, my: 2 }}>{children}</Typography>
    ),
    hr: ({ children }) => <Divider sx={{
      my: '2em'
    }} />,
    li: ({ children }) => <li style={{ lineHeight }}>{children}</li>,
    tr: ({ children }) => <tr>{children}</tr>,
    td: ({ children }) => <td style={{ padding: '5px 5px' }}>{children}</td>,
    a: ({ children, href }) => (
      <Link href={href!}>
        <Typography sx={{ lineHeight }}>{children}</Typography>
      </Link>
    ),
    table: ({ children }) => <table className="md-table">{children}</table>,
    ...components,
  }
}
