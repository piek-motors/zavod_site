package domain

const (
	Bitcoin   Chain = "bitcoin"
	Ethereum  Chain = "ethereum"
	Ton       Chain = "ton"
	Avalanche Chain = "avalanche"
	Monero    Chain = "monero"
)

var Nodes = map[Chain]ChainConfig{
	Bitcoin: {
		Name:           Bitcoin,
		ChainProtocols: []Protocol{ProtocolsJsonRpc},
		Mainnets: []Node{
			{
				Route:    "/bitcoin",
				Endpoint: "https://node.exaion.com/api/v1/e38f3a8f-074b-4b0e-9a32-dce827285d6b/rpc",
			},
		},
		Indexes: []Node{
			{
				Route:    "/bitcoin-index",
				Endpoint: "https://bitcoinexplorer.org/api",
			},
		},
	},
	Ethereum: {
		Name:           Ethereum,
		ChainProtocols: []Protocol{ProtocolsJsonRpc},
		Mainnets: []Node{
			{
				Route:    "/ethereum",
				Endpoint: "https://ethereum-rpc.publicnode.com",
			},
			{
				Route:    "/ethereum",
				Endpoint: "https://go.getblock.io/560456971b1847efb9dfa6e1a7df9e78",
			},
			{
				Route:          "/ethereum",
				AuthHeaderName: "x-api-key",
				Endpoint:       "https://ethereum-mainnet.gateway.tatum.io",
				ApiKey:         "t-6739c6091ef7601aa027d3c9-32040391e10c4376b8e96893",
			},
		},
	},
	Ton: {
		Name:           Ton,
		ChainProtocols: []Protocol{ProtocolsJsonRpc, ProtocolsHttp},
		Mainnets: []Node{
			{
				Route:    "/ton",
				Endpoint: "https://go.getblock.io/7f165b4fa1824c44b43acc7817d0a209",
			},
			{
				Route:          "/ton",
				AuthHeaderName: "x-api-key",
				ApiKey:         "t-6739c6091ef7601aa027d3c9-32040391e10c4376b8e96893",
				Endpoint:       "https://ton-mainnet.gateway.tatum.io",
			},
		},
	},
	Avalanche: {
		Name:           Avalanche,
		ChainProtocols: []Protocol{ProtocolsJsonRpc},
		Mainnets: []Node{
			{
				Route:    "/avalanche",
				Endpoint: "https://node.exaion.com/api/v1/a4b7b132-4b6e-4ca7-b7df-62c0eadbb4bb/rpc/ext/bc/C/rpc",
			},
		},
	},
	Monero: {
		// Monero Public list - https://xmr.ditatompel.com/remote-nodes
		Name:           Monero,
		ChainProtocols: []Protocol{ProtocolsJsonRpc},
		Mainnets: []Node{
			{
				Route:    "/monero",
				Endpoint: "https://moneronode.org:18081/json_rpc",
			},
		},
	},
}
