import { Box, Tab, Table, TabList, TabPanel, Tabs, Typography } from "@mui/joy"

type NetworkEndpoints = {
  [chain: string]: {
    [protocol: string]: string
  }
}

export default function NodeEndpoints({
  endpoints,
}: {
  endpoints: NetworkEndpoints
}) {
  return (
    <Box >
      <Tabs sx={{ mb: 2, borderRadius: 12, overflow: "hidden" }}>
        <TabList>
          {Object.keys(endpoints).map((chain, idx) => (
            <Tab key={idx} value={idx}>
              {chain}
            </Tab>
          ))}
        </TabList>

        {Object.keys(endpoints).map((chain, idx) => (
          <TabPanel key={idx} value={idx}>
            <Typography level="body-sm" pl={1}>
              {chain} Endpoint{" "}
              {Object.keys(endpoints[chain]).length === 1 ? "Link" : "Links"}
            </Typography>
            <Table
              sx={{
                py: 1, 
                width: "auto",
                fontSize: "1rem",
              }}
            >
              <tbody>
                {Object.keys(endpoints[chain]).map((protocol, idx) => (
                  <tr key={idx}>
                    <td>{protocol}</td>
                    <td>
                      <div>{endpoints[chain][protocol]}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  )
}
