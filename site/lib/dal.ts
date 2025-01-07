'use server';
import { cookies } from 'next/headers';
import crypto from 'node:crypto';
import * as jwt from './jwt';
import { DB } from './pg';

export type Session = {
  account: DB.Account
  apiKey: DB.ApiKey
}

export async function verifyAccessToken(): Promise<Session> {
  const cookie = (await cookies()).get('token')?.value
  if (!cookie) throw Error(`token in cookies not found`)

  const tokenPayload = await jwt.verify(cookie)
  if (!tokenPayload) throw Error(`tokenPayload is null`)

  const { address: tokenWalletAddress, nonce, accountId } = tokenPayload
  const account = await getAccountById(accountId)

  const apiKey = await DB.selectFrom('api_key').selectAll().where('account_id', '=', accountId).executeTakeFirst()
  if (!apiKey) throw Error(`api_key not found`)

  if (account.address !== tokenWalletAddress) {
    throw Error(`account address not match`)
  }

  return {
    account,
    apiKey
  }
}

export async function isAuthenticated(): Promise<Session | null> {
  const session = await verifyAccessToken().catch((err) => {
    console.log('isAuthenticated failed', err.message)
    return null
  })

  return session
}

export async function logoutAndDeleteToken() {
  const coockie = await cookies()
  const token = await coockie.get('token')

  if (!token) return

  coockie.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 0,
    sameSite: "strict",
    path: "/",
  })

  DB.deleteFrom('access_token').where('token', '=', token.value).execute()
  return
}

export async function getOrCreateNewAccount(address: string): Promise<Session> {
  const account = await DB.selectFrom('account').selectAll().where('address', '=', address).executeTakeFirst()
  if (account) {
    const apiKey = await DB.selectFrom('api_key').selectAll().where('account_id', '=', account.id).executeTakeFirst()
    if (!apiKey) throw Error(`api_key not found`)

    return { account, apiKey }
  }

  return await newAccount(address)
}

export async function newAccount(address: string): Promise<Session> {
  const account = await DB.insertInto('account').values({
    created_at: new Date(),
    address
  }).returningAll().executeTakeFirst()
  if (!account) throw Error(`newAccount failed: account not found`)

  const apiKey = await newApiKey(account.id)

  return {
    account, apiKey
  }
}

export async function getAccountById(accountId: number): Promise<DB.Account> {
  const account = await DB.selectFrom('account').selectAll().where('id', '=', accountId).executeTakeFirst()
  if (!account) throw Error(`account not found: accountId=${accountId}`)
  return account
}

export async function getApiKeyByAccountId(accountId: number): Promise<DB.ApiKey> {
  const apiKey = await DB.selectFrom('api_key').selectAll().where('account_id', '=', accountId).executeTakeFirst()
  if (!apiKey) throw Error(`api_key not found: accountId=${accountId}`)
  return apiKey
}

export async function newApiKey(accountId: number): Promise<DB.ApiKey> {
  const apiKey = crypto.randomBytes(32).toString('hex')

  const res = await DB.insertInto('api_key').values({
    account_id: accountId,
    api_key: apiKey,
    created_at: new Date(),
  }).returningAll().executeTakeFirst()

  if (!res) throw Error(`api_key not found`)
  return res
}

export async function assertNonceExist(address: string): Promise<DB.Nonce> {
  const nonce = await DB.selectFrom('nonce').selectAll().where('address', '=', address).executeTakeFirst()
  if (!nonce) throw Error(`nonce not found for address=${address}`)
  return nonce
}