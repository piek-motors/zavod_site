import { Box, Card, Stack, Typography } from "@mui/joy"
import Link from "next/link"
import type { ReactNode } from "react"

export const MyCard = (props: { title: string; link: string; children: ReactNode }) => (
  <Card sx={{ minWidth: 0 }} variant="outlined">
    <Link href={props.link} style={{ textDecoration: "none", color: "inherit" }}>
      <Typography level="h3" px={1}>
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
