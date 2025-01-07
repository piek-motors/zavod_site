FROM golang:1.23 AS build-stage
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY ./config/*.go ./config/
COPY *.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /api.chain-rpc
# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian11 AS build-release-stage
WORKDIR /
COPY --from=build-stage /api.chain-rpc /api.chain-rpc
EXPOSE 13337
USER nonroot:nonroot
ENTRYPOINT ["/api.chain-rpc"]