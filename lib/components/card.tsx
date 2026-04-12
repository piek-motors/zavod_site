import { Box, Card, Stack, Typography } from "@mui/joy"
import Link from "next/link"
import type { ReactNode } from "react"

export const MyCard = (props: { title: string; link: string; children: ReactNode }) => (
  <Card sx={{ minWidth: 0 }} variant="soft">
    <Link href={props.link} style={{ textDecoration: "none", color: "inherit" }}>
      <Typography level="h2" fontSize={20} color="primary">
        {props.title}
      </Typography>
      <Stack
        sx={{
          ul: {
            paddingLeft: 3,
          },
        }}
      >
        {props.children}
      </Stack>
    </Link>
  </Card>
)

export const CardWrapper = (props: { children: ReactNode }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
      gap: 2,
      "& > *": {
        minWidth: 0,
      },
    }}
  >
    {props.children}
  </Box>
)

export const Title = (props: {children: ReactNode}) => (
  <Typography level="h1" fontFamily={'monospace'} textAlign={'center'} lineHeight={1.0} mb={5}>{props.children}</Typography>
)