import { Card, Stack, Typography } from "@mui/joy"
import Link from "next/link"
import type { ReactNode } from "react"

export const MyCard = (props: { title: string, link: string, children: ReactNode }) => 
<Card size="sm" sx={{ maxWidth: '49%'}} variant="outlined">
    <Link href={props.link} style={{ textDecoration: 'none', color: 'inherit'}}>
    <Typography level="h3" px={1}>{props.title}</Typography>
    <Stack sx={{ 
        'ul': {
        paddingLeft: 3
    }}}>
        {props.children}
    </Stack>
    </Link>
</Card>

export const CardWrapper = (props: { children: ReactNode }) => 
<Stack flexDirection={'row'} flexWrap={'wrap'} gap={2}>
        {props.children}
</Stack>