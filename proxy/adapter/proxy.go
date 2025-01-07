package adapter

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"

	d "chainrpc.online/proxy/domain"
)

func (c *Controller) proxy(w http.ResponseWriter, r *http.Request, chain d.Chain) {
	priority, err := c.repo.GetPriorityRules(chain)
	if err != nil {
		writeErrInternal(w, err)
		return
	}

	conf := c.nodeProviders.SelectWithWeights(chain, priority)
	if conf == nil {
		writeErrInternal(w, fmt.Errorf("no provider found"))
		return
	}

	proxyReq, err := newProxyRequest(r, *conf)
	if err != nil {
		writeErrInternal(w, err)
		return
	}

	c.logDumpProxyReq(proxyReq)
	resp, err := http.DefaultClient.Do(proxyReq)
	if err != nil {
		log.Println("proxy req error", err)
		w.WriteHeader(resp.StatusCode)
		io.Copy(w, resp.Body)
		return
	}
	defer resp.Body.Close()
	eliminateHtml(w, resp)
	c.logProxyResp(r, proxyReq, resp, *conf)

	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

func (c *Controller) proxyTo(w http.ResponseWriter, r *http.Request, node d.Node) {
	proxyReq, err := newProxyRequest(r, node)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Println("Error creating request:", err)
		return
	}
	c.logDumpProxyReq(proxyReq)

	resp, err := http.DefaultClient.Do(proxyReq)
	if err != nil {
		http.Error(w, fmt.Errorf("err from getblock: %s", err).Error(), 500)
		return
	}
	defer resp.Body.Close()
	eliminateHtml(w, resp)

	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}

func eliminateHtml(w http.ResponseWriter, resp *http.Response) {
	if resp.Header.Get("Content-Type") == "text/html" {
		writeErrInternal(w, fmt.Errorf("method not working"))
		return
	}
}

func newProxyRequest(r *http.Request, node d.Node) (*http.Request, error) {
	targetUrl := &url.URL{}
	Header := make(http.Header)
	Header.Set("Content-Type", "application/json")

	additionalPath := strings.TrimPrefix(r.URL.Path, node.Route)
	targetUrl, err := url.Parse(node.Endpoint)
	if err != nil {
		return nil, err
	}

	if node.AuthHeaderName != "" {
		Header.Set(node.AuthHeaderName, node.ApiKey)
	}

	// copy query params
	for k, v := range r.URL.Query() {
		targetUrl.RawQuery += fmt.Sprintf("%s=%s&", k, v[0])
	}

	rr := http.Request{
		Method:        r.Method,
		URL:           targetUrl.JoinPath(additionalPath),
		Header:        Header,
		Body:          r.Body,
		ContentLength: r.ContentLength,
		Close:         r.Close,
	}

	return &rr, nil
}
