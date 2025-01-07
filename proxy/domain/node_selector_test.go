package domain

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSortPrioritiesByWeight(t *testing.T) {
	priorities := NewPriorityRules(Ethereum, []PriorityRule{
		{Hostname: "a", Weight: 1},
		{Hostname: "b", Weight: 2},
		{Hostname: "c", Weight: 3},
	})

	expected := []PriorityRule{
		{Hostname: "c", Weight: 3},
		{Hostname: "b", Weight: 2},
		{Hostname: "a", Weight: 1},
	}

	assert.Equal(t, expected, priorities.Rules)
}

func TestExcludeDisabledProviders(t *testing.T) {
	nodeProviders := []Node{
		{Endpoint: "https://a.com"},
		{Endpoint: "https://b.com"},
		{Endpoint: "https://c.com"},
		{Endpoint: "https://d.com"},
	}

	priorityRules := []PriorityRule{
		{Hostname: "a.com", Weight: 0},
		{Hostname: "b.com", Weight: 1},
		{Hostname: "c.com", Weight: 0},
		{Hostname: "d.com", Weight: 2},
	}
	priority := NewPriorityRules(Ethereum, priorityRules)

	expected := []Node{
		{Endpoint: "https://b.com"},
		{Endpoint: "https://d.com"},
	}

	actual := excludeDisabledNodes(nodeProviders, priority)
	assert.Equal(t, expected, actual)
}

func TestSelectMainNetWithPriorityConfig(t *testing.T) {
	conf := NewNodeProvidersConf()

	r := conf.SelectWithWeights(Ethereum, NewPriorityRules(Ethereum, []PriorityRule{}))
	if r == nil {
		t.Fatalf("No node selected")
	}
	assert.Equal(t, true, r.Endpoint != "")

	f := conf.SelectWithWeights(Ethereum, NewPriorityRules(Ethereum, []PriorityRule{
		{Hostname: "ethereum-mainnet.gateway.tatum.io", Weight: 2},
		{Hostname: "node.getblock.io", Weight: 1},
	}))
	if f == nil {
		t.Fatalf("No node selected")
	}

	assert.Equal(t, "https://ethereum-mainnet.gateway.tatum.io", f.Endpoint)

	d := conf.SelectWithWeights(Ethereum, NewPriorityRules(Ethereum, []PriorityRule{
		{Hostname: "tatum.io", Weight: 0},
		{Hostname: "getblock.io", Weight: 3},
	}))

	if d == nil {
		t.Errorf("No node selected")
		return
	}

	fmt.Printf("Selected node: %s\n", d.Endpoint)
	assert.Contains(t, d.Endpoint, "getblock.io")
}
