package adapter

import (
	"context"
	"time"

	"chainrpc.online/proxy/domain"
	"github.com/jackc/pgx/v5"
)

type ApiKey struct {
	Id        int       `db:"id"`
	ApiKey    string    `db:"api_key"`
	AccountId int       `db:"account_id"`
	CreatedAt time.Time `db:"created_at"`
}

type Repository struct {
	conn *pgx.Conn
}

func NewRepository(conn *pgx.Conn) *Repository {
	return &Repository{
		conn: conn,
	}
}

func (r *Repository) GetApiKey(apiKey string) (*ApiKey, error) {
	rows, err := r.conn.Query(context.Background(), "select * from api_key where api_key = $1", apiKey)
	if err != nil {
		return nil, err
	}

	apiKeys, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[ApiKey])
	if err != nil {
		return nil, err
	}

	return &apiKeys, nil
}

func (r *Repository) GetPriorityRules(chain domain.Chain) (*domain.PriorityRules, error) {
	rows, err := r.conn.Query(context.Background(), "select hostname, weight from priority where chain = $1", chain)
	if err != nil {
		return nil, err
	}

	re, err := pgx.CollectRows(rows, pgx.RowToStructByName[domain.PriorityRule])
	if err != nil {
		return nil, err
	}

	return domain.NewPriorityRules(chain, re), nil
}
