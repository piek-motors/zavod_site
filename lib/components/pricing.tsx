import { Box, Card, Stack, Typography } from "@mui/joy"

const free = [
  "Shared blockchain node with limited access at 5 RPS",
  "Suitable for testing and development",
  "Access to mainnet and all RPC services",
  "No guaranteed resources, best-effort rate limits",
]

const startup = [
  "Shared blockchain node access",
  "Individual rate limits tailored to your needs",
  "Pay only for reserved resources (guaranteed RPC access)",
  "Full mainnet support for seamless dApp integration",
  "24/7 support for quick issue resolution",
]

const dedicated = [
  "Exclusive dedicated blockchain node access",
  "High RPC rate limits for large-scale applications",
  "Guaranteed uptime with enterprise SLA",
  "Priority 24/7 support",
  "Customizable configuration",
  "Supports any blockchain node type",
]

export default function Pricing() {
  return (
    <Box>
      <Typography level="h2" sx={{ mt: 4, mb: 2 }}>
        Pricing
      </Typography>

      <Box
        display="flex"
        gap={2}
        sx={{
          flexDirection: {
            md: "row",
            xs: "column",
          },
        }}
      >
        <PlanCard title="Free" price="" info={free} />
        <PlanCard
          title="Startup"
          price="from $50/1M requests"
          info={startup}
        />
        <PlanCard title="Dedicated" price="from $400/month" info={dedicated} />
      </Box>
    </Box>
  )
}

const PlanCard = ({
  title,
  price,
  info,
}: {
  title: string
  price: string
  info: string[]
}) => {
  return (
    <Card
      sx={{
        borderRadius: 20,
        p: 3,
      }}
    >
      <Typography level="body-lg" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography level="body-md">{price}</Typography>
      <Box textAlign={'left'}>
        <Stack>
          {info.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Stack>
      </Box>
    </Card>
  )
}
