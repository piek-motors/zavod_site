import { DB } from '@/lib/pg'
import crypto from 'node:crypto'
export const dynamic = 'force-static'

export async function POST(req: Request) {
  const body = await req.json()
  // get user address from req
  const address = body.address
  if (!address) {
    throw Error(`address is required`)
  }

  const nonce = crypto.randomBytes(16).toString('hex')

  // delete old nonce
  await DB.deleteFrom('nonce').where('address', '=', address).execute()
  await DB.insertInto('nonce').values({
    address,
    nonce,
    created_at: new Date(),
  }).returningAll().execute()
  return Response.json({ nonce })
}