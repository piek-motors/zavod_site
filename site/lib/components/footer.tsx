import { Box } from '@mui/joy'
import Typography from '@mui/joy/Typography'

export function Footer() {
  return (
    <footer>
      <Box component="footer" sx={{ textAlign: 'center', p: 2 }}>
        <Typography level="body-sm" mt="auto">
          &copy; 2024 ChainRPC - All rights reserved
        </Typography>
      </Box>
    </footer>
  )
}
