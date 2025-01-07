import * as dal from './dal';
import { isAuthenticated } from './dal';
// mock only one funcion verifyAccessToken function 
jest.spyOn(dal, 'verifyAccessToken').mockImplementation(() => Promise.resolve({ account: { id: 1, address: '0x123' } as any, apiKey: { id: 1, account_id: 1 } as any }))

describe('dal', () => {
  it('should pass', () => {
    const res = isAuthenticated()
    console.log(res)
    expect(true).toBe(true)
  })
})