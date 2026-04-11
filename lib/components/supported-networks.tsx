import { Box, Table } from "@mui/joy"

type Network = {
  n: string
}

const config: Network[] = [
  {
    n: "Bitcoin",
  },
  {
    n: "Ethereum",
  },
  {
    n: "TON",
  },
  {
    n: "Solana",
  },
  {
    n: "Monero",
  },
  {
    n: "Avalanche",
  },
]

export default function SupportedNetworks() {
  return (
    <Box>
      <Table
        sx={{
          "--TableCell-height": "60px",
          "th": {
            height: "30px",
          }
        }}
      >
        <thead>
          <tr>
            <th>Network</th>
            <th>RPC URL</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {config.map((chain, index) => (
            <tr key={index}>
              <td>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={`/chains/${chain.n.toLowerCase()}.svg`}
                    alt={chain.n}
                    width="32"
                    height="32"
                  />
                  {chain.n}
                </Box>
              </td>
              <td>https://api.chain-rpc.online/{chain.n.toLowerCase()}</td>
              <td>
                <a href={`/docs/${chain.n.toLowerCase()}`}>{chain.n} Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}
