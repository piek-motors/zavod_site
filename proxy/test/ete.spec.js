const Endpoint = "http://localhost:13337"

describe("E2e test", () => {
  const jsonrpc = {
    jsonrpc: "2.0",
    id: 1,
  }

  const headers = {
    "Content-Type": "application/json",
    "X-API-Key": "test"
  }

  it("check ethereum mainnet accessability", async () => {
    const payload = {
      ...jsonrpc,
      method: "eth_getBalance",
      params: ["0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe", "finalized"]
    }
    const response = await fetch(`${Endpoint}/ethereum`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    });

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.id).toBe(1);
    expect(json.result).toBeDefined();
    console.log('eth balance hex', json.result);
    
    const balanceInWei = BigInt(json.result);
    console.log('balanceInWei', balanceInWei);

    BigDecimal.decimals = 18
    const balanceInEther = new BigDecimal(balanceInWei).divide(new BigDecimal(1e18)).toString();
    console.log('balanceInEther', balanceInEther);
  });

  it('check bitcoin mainnet', async () => {
    const payload = {
      ...jsonrpc,
      method: "getblockchaininfo",
      params: []
    }

    const response = await fetch(`${Endpoint}/bitcoin`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    });

    expect(response.status).toBe(200);
    const json = await response.json();
    console.log('bitcoin', json);
    expect(json.result.chain).toBe("mainnet");
  })

  it('check ton mainnet', async () => {
    const payload = {
      ...jsonrpc,
      method: "getConsensusBlock",
      params: []
    }

    const response = await fetch(`${Endpoint}/ton/jsonRPC`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    }).catch(e => console.error(e));

    // print response bosy as string
    const data = await response.json();
    expect(data.result.consensus_block).toBeDefined();
  })

  // it("public node rate limit test", async () => {
  //   const payload = {
  //     ...jsonrpc,
  //     method: "eth_blockNumber",
  //     params: []
  //   }

  //   const promises = [];

  //   Array(100).fill(0).forEach((_, i) => {
  //     const promise = fetch(`https://base-rpc.publicnode.com`, {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //       headers,
  //     }).then(response => {
  //       expect(response.status).toBe(200);
  //       return response.json();
  //     })

  //     promises.push(promise);
  //   });

  //   const res = await Promise.all(promises);
  //   console.log(res);
  // });

  it("ton json rpc get address balance", async () => {
    const payload = {
      ...jsonrpc,
      method: "getAddressInformation",
      params: {
        "address": "UQCnqvBl3oDx7LgSiYwD2XO6q1iuP5-PrjIGKH_de-qjOlcB"
      }
    }

    const response = await fetch(`${Endpoint}/ton/jsonRPC`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    }).catch(e => console.error(e));

    // print response bosy as string
    const data = await response.json();
    console.log(data);
    expect(data.result.balance).toBeDefined();
  })
  

  it("to rest api get address balance", async () => {
    const response = await fetch(`${Endpoint}/ton/getAddressInformation?address=UQCnqvBl3oDx7LgSiYwD2XO6q1iuP5-PrjIGKH_de-qjOlcB`, {
      headers,
    }).catch(e => console.error(e));

    console.log(response.status);
    // print response bosy as string
    const data = await response.json();
    console.log(data);
    expect(data.result.balance).toBeDefined();
  })
});

class BigDecimal {
  constructor(value) {
      let [ints, decis] = String(value).split(".").concat("");
      decis = decis.padEnd(BigDecimal.decimals, "0");
      this.bigint = BigInt(ints + decis);
  }
  static fromBigInt(bigint) {
      return Object.assign(Object.create(BigDecimal.prototype), { bigint });
  }
  divide(divisor) { // You would need to provide methods for other operations
      return BigDecimal.fromBigInt(this.bigint * BigInt("1" + "0".repeat(BigDecimal.decimals)) / divisor.bigint);
  }
  toString() {
      let s = this.bigint.toString().replace("-", "").padStart(BigDecimal.decimals+1, "0");
      s = (s.slice(0, -BigDecimal.decimals) + "." + s.slice(-BigDecimal.decimals))
             .replace(/(\.0*|0+)$/, "");
      return this.bigint < 0 ? "-" + s : s;                
  }
}