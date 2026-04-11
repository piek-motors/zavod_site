import { Box, Stack, Typography } from "@mui/joy"
import fs from "fs"
import Link from "next/link"
import path from "path"

export default function Sidenav({ hideContent }: { hideContent?: boolean }) {
  // Get the list of docs files at build time (inside the App Router, you can fetch the list statically)
  const docsDirectory = path.join(process.cwd(), "content/docs")
  const files = fs.readdirSync(docsDirectory)
  const blockchainList = files
    .map((file) => file.replace(".mdx", ""))
    .filter((file) => file !== "index")

  return (
    <Box>
      <Stack
        spacing={3}
        sx={{
          fontWeight: 600,
          p: 3,
          width: "100%",
          maxWidth: 300,
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        {!hideContent && blockchainList.map((chain, idx) => (
          <Link
            key={idx}
            href={`/docs/${chain}`}
            style={{ textDecoration: "none" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={`/chains/${chain.toLowerCase()}.svg`}
                alt={chain}
                width="22"
                height="22"
              />
              <Typography sx={{ ':hover': { textDecoration: "underline" } }}>
                {CapitalizeFirstLetter(chain)}
              </Typography>
            </Box>
          </Link>
        ))}
      </Stack>
    </Box>
  )
}

function CapitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
