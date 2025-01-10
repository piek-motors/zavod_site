import { Footer } from "@/lib/components/footer"
import Pricing from "@/lib/components/pricing"
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/joy"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blockchain Node RPC infrastructure | ChainRPC",
  description: `
Easily connect to blockchain networks with our Pay-as-You-Go RPC service. 
Whether you’re building apps or exploring blockchain technology, we provide simple, reliable access to major networks like Ethereum, Bitcoin, and TON.
No upfront costs—just fast, secure, and easy integration for all your blockchain needs
`,
}

export default function HomePage() {
  return (
    <main>
      <Container>
        <Box
          id="home"
          sx={{
            textAlign: "center",
            my: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            gap={1}
            pt={1}
            pb={3}
            display="flex"
            justifyContent="center"
            sx={{
              flexDirection: {
                sm: "row",
                xs: "column-reverse",
              },
            }}
          >
            <Box
              minWidth={50}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img src="/logo.png" alt="ChainRPC Logo" width="50" height="50" />
            </Box>
            <Typography level="h1" fontWeight={400}>
              The Block <Typography fontWeight={700}>Chain RPC</Typography>{" "}
              Service Provider
            </Typography>
          </Box>

          <Stack gap={2} my={4}>
            <Typography level="body-lg" justifyContent="center">
              As your trusted partner in blockchain infrastructure, we deliver
              reliable, scalable, and cost-efficient node solutions. Gain fast,
              secure access to blockchain networks with our native RPCs, and
              seamlessly integrate blockchain capabilities into your
              applications through our Blockchain as a Service (BaaS) offering.
            </Typography>
            <Typography level="body-md" justifyContent="center">
              By combining our own dedicated hardware with cloud computing, we
              ensure a powerful, flexible infrastructure that maximizes
              scalability while minimizing costs. Whether you need to run a
              popular blockchain or a custom network, our solution adapts to
              meet your specific needs.
            </Typography>
          </Stack>

          {/* Services List */}
          <Box display="flex" gap={1} justifyContent={"center"}>
            <Link href="/sign-in">
              <Button
                variant="solid"
                color="primary"
                type="button"
                sx={{ borderRadius: 12, mb: 5 }}
              >
                Get API Key
              </Button>
            </Link>
            <Link href="/docs/">
              <Button
                variant="soft"
                color="neutral"
                sx={{ borderRadius: 12, mb: 5 }}
              >
                Supported networks
              </Button>
            </Link>
          </Box>
          <Divider />
          <Pricing />
        </Box>
        <Footer />
      </Container>
    </main>
  )
}
