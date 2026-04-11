import { Box, Divider } from '@mui/joy'
import Typography from '@mui/joy/Typography'

export function Footer() {
  return (
    <footer>
      <Divider/>
      <Box component="footer" sx={{ textAlign: 'center', p: 2 }}>
        <Typography level="body-sm" mt="auto">
          &copy; {new Date().getFullYear()} ChainRPC - All rights reserved
        </Typography>
      </Box>
    </footer>
  )
}
