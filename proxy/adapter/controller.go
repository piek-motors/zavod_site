package adapter

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"time"

	"crypto/rand"

	d "chainrpc.online/proxy/domain"
	"github.com/jackc/pgx/v5"
)

type Controller struct {
	nodeProviders *d.NodeProviders
	verbose       bool
	repo          *Repository
}

func NewController(verboseMode bool, repo *Repository) *Controller {
	return &Controller{
		nodeProviders: d.NewNodeProvidersConf(),
		verbose:       verboseMode,
		repo:          repo,
	}
}

func (c *Controller) BitcoinMainnet(w http.ResponseWriter, r *http.Request) {
	c.proxy(w, r, d.Bitcoin)
}

func (c *Controller) BitcoinIndex(w http.ResponseWriter, r *http.Request) {
	provideConf, err := c.nodeProviders.GetIndexNode(d.Bitcoin)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		writeErrInternal(w, err)
		return
	}

	c.proxyTo(w, r, provideConf)
}

func (c *Controller) EthereumMainnet(w http.ResponseWriter, r *http.Request) {
	c.proxy(w, r, d.Ethereum)
}

func (c *Controller) TonMainnet(w http.ResponseWriter, r *http.Request) {
	c.proxy(w, r, d.Ton)
}

func (c *Controller) AvalancheMainnet(w http.ResponseWriter, r *http.Request) {
	c.proxy(w, r, d.Avalanche)
}

func (c *Controller) MoneroMainnet(w http.ResponseWriter, r *http.Request) {
	c.proxy(w, r, d.Monero)
}

func (c *Controller) logDumpProxyReq(r *http.Request) {
	if c.verbose {
		dumpReq, err := httputil.DumpRequest(r, true)
		if err != nil {
			log.Println("Error dumping proxy request:", err)
		}
		printDumpHttp(dumpReq, "Proxy Request")
	}
}

func (s *Controller) logProxyResp(origReq *http.Request, proxyReq *http.Request, proxyRes *http.Response, node d.Node) {
	if s.verbose {
		// log detailed proxy request and proxy response info
		proxyResStatus := proxyRes.StatusCode

		dumpProxyRes, err := httputil.DumpResponse(proxyRes, true)
		if err != nil {
			log.Println("Error dumping proxy request:", err)
		}

		printDumpHttp(dumpProxyRes, "Proxy Response")

		proxyUrl := fmt.Sprintf("%s%s", proxyReq.URL.Host, proxyReq.URL.Path)
		fmt.Printf("Res %s proxified to %s, status %d \n", origReq.URL.Path, proxyUrl, proxyResStatus)
	} else {
		fmt.Printf("Res %s proxified to %s\n", origReq.URL.Path, node.Endpoint)
	}
}

// GlobalHandler logs incoming requests if verbose mode is enabled
func (c *Controller) GlobalHandler(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Generate request Id
		reqId := make([]byte, 5) // Allocate a slice for 5 bytes
		_, err := rand.Read(reqId)
		if err != nil {
			log.Fatalf("Failed to generate reqId: %v", err)
		}

		// Check Api Key
		if err := c.authorizeReq(r); err != nil {
			log.Printf("authorization failed: %v", err)
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]string{"error": "INVALID_API_KEY"})
			return
		}

		start := time.Now()
		if c.verbose {
			log.Printf("Incoming request %x: Path=%s", reqId, r.URL.Path)
		}
		next(w, r)

		log.Printf("Request %x complited Path=%s, Duration=%v ms", reqId, r.URL.Path, time.Since(start).Milliseconds())
	}
}

func (c *Controller) authorizeReq(r *http.Request) error {
	apiKey := r.Header.Get("X-API-KEY")

	// Allow test api key
	if apiKey == d.TestApiKey {
		return nil
	}

	apikey, err := c.repo.GetApiKey(apiKey)
	if err == pgx.ErrNoRows {
		return fmt.Errorf("api key not exist")
	}

	if apikey.ApiKey != apiKey {
		log.Fatalf("Invalid api key")
	}

	return nil
}

func writeErrInternal(w http.ResponseWriter, err error) {
	fmt.Println(err)
	w.WriteHeader(http.StatusInternalServerError)
	resp := map[string]string{"error": err.Error(), "type": "INTERNAL_SERVER_ERROR"}
	json.NewEncoder(w).Encode(resp)
}

func printDumpHttp(dump []byte, title string) {
	fmt.Println("---" + title + "---")
	fmt.Printf("\n%s", string(dump))
	fmt.Println("\n---End" + title + "---\n")
}
