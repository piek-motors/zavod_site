import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

declare global {
  namespace DB {
    interface Schema {
      access_token: AccessTokenTable
      account: AccountTable
      nonce: NonceTable
      api_key: ApiKeyTable
    }

    interface AccessTokenTable {
      id: Generated<number>
      token: string
      created_at: Date
      deactivated_at: Date
    }

    interface AccountTable {
      id: Generated<number>
      address: string
      created_at: Date
    }

    // Table for metamask authentication
    interface NonceTable {
      id: Generated<number>
      address: string
      nonce: string
      created_at: Date
    }

    interface ApiKeyTable {
      account_id: Generated<number>
      api_key: string
      created_at: Date
    }

    type AccessToken = Selectable<AccessTokenTable>
    type InsertableAccessToken = Insertable<AccessTokenTable>
    type UpdateableAccessToke = Updateable<AccessTokenTable>

    type Account = Selectable<AccountTable>
    type InsertableAccount = Insertable<AccountTable>
    type UpdateableAccount = Updateable<AccountTable>

    type Nonce = Selectable<NonceTable>
    type InsertableNonce = Insertable<NonceTable>
    type UpdateableNonce = Updateable<NonceTable>

    type ApiKey = Selectable<ApiKeyTable>
    type InsertableApiKey = Insertable<ApiKeyTable>
    type UpdateableApiKey = Updateable<ApiKeyTable>
  }
}