'use server'
import jwt from 'jsonwebtoken'

export type TokenPayload = {
  address: string
  nonce: string
  accountId: number
}

const secretKey = process.env.JWT_SECRET_KEY

export async function verify(token: string): Promise<TokenPayload | null> {
  if (!secretKey) {
    throw Error(`JWT_SECRET_KEY is not set`)
  }

  return jwt.verify(token, secretKey) as any
}

export async function encode(data: object) {
  if (!secretKey) {
    throw Error(`JWT_SECRET_KEY is not set`)
  }

  const token = jwt.sign(data, secretKey, {
    expiresIn: '12h',
  })
  return token
}