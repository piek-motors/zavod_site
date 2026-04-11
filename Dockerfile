FROM oven/bun:1-alpine AS deps
WORKDIR /app

COPY ./package.json ./bun.lock ./

RUN bun install --frozen-lockfile

FROM oven/bun:1-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY . /app
COPY --from=deps /app/node_modules /app/node_modules
RUN bun run build
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

FROM oven/bun:1-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone .

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["bun", "run", "server.js"]