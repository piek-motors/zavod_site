import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const password = process.env.POSTGRES_PASSWORD
if (!password) {
  throw new Error('POSTGRES_PASSWORD is not set')
}
const host = process.env.POSTGRES_HOST
if (!host) {
  throw new Error('POSTGRES_HOST is not set')
}
const port = process.env.POSTGRES_PORT
if (!port) {
  throw new Error('POSTGRES_PORT is not set')
}
const kysely = new Kysely<DB.Schema>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: 'chainrpc',
      user: 'postgres',
      password,
      host,
      port: parseInt(port),
      ssl: false,
      query_timeout: 10_000,
    })
  }),
})

export const DB = kysely
