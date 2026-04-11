'use server'
import { Hour } from '@/lib/constants';
import { assertNonceExist, getOrCreateNewAccount } from '@/lib/dal';
import * as jwt from '@/lib/jwt';
import { DB } from '@/lib/pg';
import { cookies } from 'next/headers';
import Web3 from 'web3';

export async function POST(req: Request) {
  const body = await req.json()
  const sign = body.sign
  const address = body.address
  if (!sign) {
    throw Error(`sign is required`)
  }
  if (!address) {
    throw Error(`address is required`)
  }

  // load noce from db
  const nonceEntity = await assertNonceExist(address)

  const web3 = new Web3()
  const actualAddress = web3.eth.accounts.recover(nonceEntity?.nonce, sign)
  const isVerified = actualAddress.toLowerCase() === address.toLowerCase()

  if (!isVerified) {
    throw Error(`Signature is not valid`)
  }

  // check if account is exist creare new one if not
  const session = await getOrCreateNewAccount(address)

  // genetate jwt acceess token and save it to db 
  const tokenPayload: jwt.TokenPayload = { address, nonce: nonceEntity?.nonce, accountId: session.account.id }
  const token = await jwt.encode(tokenPayload)

  // save token to db
  await DB.insertInto('access_token').values({
    token,
    created_at: new Date(),
    deactivated_at: new Date(Date.now() + 12 * Hour),
  }).execute()

  // add http only cookie
  const cookie = await cookies()
  cookie.set('token', token, {
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 12 * Hour / 1000,
    sameSite: "strict",
    priority: "high",
    path: "/",
  })

  return Response.json({ status: 'ok' })
}

