package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"chainrpc.online/proxy/adapter"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	port := os.Getenv("PORT")
	if port == "" {
		panic("PORT environment variable not set")
	}
	verbose := getVerboseArg()
	if verbose {
		log.Println("verbose mode enabled")
	}
	skipApiKeyCheck, _ := strconv.ParseBool(os.Getenv("DISABLE_AUTH"))
	if skipApiKeyCheck {
		log.Printf(`WARNING: authorization disabled`)
	}

	// Postgres connection
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	mux := http.NewServeMux()

	// add middleware to check whether an api key in header is exist and valid
	repo := adapter.NewRepository(conn)
	c := adapter.NewController(verbose, repo)

	mux.HandleFunc("POST /bitcoin", c.GlobalHandler(c.BitcoinMainnet))
	mux.HandleFunc("/bitcoin-index/", c.GlobalHandler(c.BitcoinIndex))

	mux.HandleFunc("POST /ethereum", c.GlobalHandler(c.EthereumMainnet))
	mux.HandleFunc("POST /avalanche", c.GlobalHandler(c.AvalancheMainnet))
	mux.HandleFunc("/ton/", c.GlobalHandler(c.TonMainnet))
	mux.HandleFunc(("POST /monero"), c.GlobalHandler(c.MoneroMainnet))

	log.Default().Println("Serve port", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), mux); err != nil {
		fmt.Println(err)
		panic(err)
	}
}

func getVerboseArg() bool {
	verbose := os.Getenv("VERBOSE")
	if verbose == "" {
		return false
	}
	verboseBool, err := strconv.ParseBool(verbose)
	if err != nil {
		log.Fatalf("Error parsing VERBOSE environment variable: %v", err)
	}
	return verboseBool
}
