package domain

import (
	"fmt"
	"strings"
)

type AuthMethod string

const (
	AuthMethodHeader AuthMethod = "header"
	AuthMethodApiKey AuthMethod = "path"
)

type Protocol string

const (
	ProtocolsJsonRpc Protocol = "jsonrpc"
	ProtocolsHttp    Protocol = "http"
)

type ChainConfig struct {
	Name           Chain
	ChainProtocols []Protocol
	// Mainnet providers
	Mainnets []Node
	Testnets []Node
	Indexes  []Node
}

// Node holds configuration for a single provider node
type Node struct {
	AuthHeaderName string
	ApiKey         string
	Endpoint       string
	Route          string
}

type NodeProviders struct {
	Chains map[Chain]ChainConfig
}

func NewNodeProvidersConf() *NodeProviders {
	s := &NodeProviders{}
	s.Chains = Nodes
	return s
}

func (s *NodeProviders) GetPrimaryNode(blockchain Chain, rules *PriorityRules) (Node, error) {
	chainConf, exists := s.Chains[blockchain]
	if !exists || len(chainConf.Mainnets) == 0 {
		return Node{}, ErrProviderNotSupported{blockchain}
	}

	for _, provider := range chainConf.Mainnets {
		contains := false

		for _, rule := range rules.GetExclusionRules() {
			if strings.Contains(provider.Endpoint, rule.Hostname) {
				contains = true
				break
			}
		}

		if !contains {
			return provider, nil
		}
	}
	// if no primary provider found, return first provider
	return Node{}, fmt.Errorf("no primary provider found")
}

func (s *NodeProviders) GetIndexNode(blockchain Chain) (Node, error) {
	chainConf, exists := s.Chains[blockchain]
	if !exists || len(chainConf.Indexes) == 0 {
		return Node{}, ErrProviderNotSupported{blockchain}
	}

	return chainConf.Indexes[0], nil
}

// We have a predefined list of nodes for each chain.
// We can select a node from the list based on the priority rules.
// If no rules are provided, we select the primary node.
func (s *NodeProviders) SelectWithWeights(chain Chain, priorityRules *PriorityRules) *Node {
	chainConf, exists := s.Chains[chain]
	if !exists {
		return nil
	}

	nodeProviders := excludeDisabledNodes(chainConf.Mainnets, priorityRules)
	nodePriorityMap := make(map[Node]int, len(nodeProviders))

	for _, node := range nodeProviders {
		weight := DefaultPriorityWeight

		priorityRule := priorityRules.GetRuleByEndoint(node.Endpoint)
		if priorityRule != nil && priorityRule.Weight != 0 {
			weight = priorityRule.Weight
		}

		nodePriorityMap[node] = weight
	}

	// find the most preferred node with the highest weight
	var maxWeight int
	var maxNode Node

	for node, weight := range nodePriorityMap {
		if weight > maxWeight {
			maxWeight = weight
			maxNode = node
		}
	}

	return &maxNode
}

type ErrProviderNotSupported struct {
	chain Chain
}

func (e ErrProviderNotSupported) Error() string {
	return fmt.Sprintf("provider not supported for chain %s", e.chain)
}

func excludeDisabledNodes(nodeProviders []Node, priorityRules *PriorityRules) []Node {
	res := make([]Node, 0, len(nodeProviders))

	for _, node := range nodeProviders {
		shouldExclude := false

		for _, rule := range priorityRules.GetExclusionRules() {
			if strings.Contains(node.Endpoint, rule.Hostname) {
				shouldExclude = true
				break
			}
		}

		if !shouldExclude {
			res = append(res, node)
		}
	}

	return res
}
