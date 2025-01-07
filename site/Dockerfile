ARG NODE_VERSION=20

# install dependencies
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./source.config.ts .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \ 
  npm install -g pnpm
RUN pnpm install

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY . /app
COPY --from=deps /app/node_modules /app/node_modules
RUN npm run build
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone .

EXPOSE 3000
ENV PORT=3000
CMD HOSTNAME='0.0.0.0' node server.js