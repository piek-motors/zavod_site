export const dynamic = 'force-static'

export async function POST(req: Request) {
  const body = await req.json()
  console.log("NEW CONTACT REQUEST", body)

  return Response.json({ message: 'ok' })
}