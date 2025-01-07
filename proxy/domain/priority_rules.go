package domain

import (
	"sort"
	"strings"
)

type Chain string

const DefaultPriorityWeight = 1

type PriorityRule struct {
	Hostname string
	Weight   int
}

type PriorityRules struct {
	Rules []PriorityRule
	Chain Chain
}

func NewPriorityRules(chain Chain, rules []PriorityRule) *PriorityRules {
	s := &PriorityRules{
		Rules: rules,
		Chain: chain,
	}
	s.Sort()
	return s
}

func (s *PriorityRules) Sort() {
	sort.Slice(s.Rules, func(i, j int) bool {
		return s.Rules[i].Weight > s.Rules[j].Weight
	})
}

// Return a list of priority rules that have a weight greater than 0.
func (s *PriorityRules) GetPriotityRules() []PriorityRule {
	res := make([]PriorityRule, 0, len(s.Rules))
	for _, p := range s.Rules {
		if p.Weight != 0 {
			res = append(res, p)
		}
	}
	return res
}

// GetExclusionRules returns a list of priority rules that have a weight of 0.
// These rules can be applied to exclude nodes from proxy selection.
func (s *PriorityRules) GetExclusionRules() []PriorityRule {
	res := make([]PriorityRule, 0, len(s.Rules))
	for _, p := range s.Rules {
		if p.Weight == 0 {
			res = append(res, p)
		}
	}
	return res
}

func (s *PriorityRules) GetRuleByEndoint(endpoint string) *PriorityRule {
	for _, rule := range s.Rules {
		if strings.Contains(endpoint, rule.Hostname) {
			return &rule
		}
	}
	return nil
}
