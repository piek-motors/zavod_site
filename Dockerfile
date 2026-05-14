# --- Этап 1: Установка зависимостей ---
FROM node:22-alpine AS base

# Установка pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем только файлы зависимостей
COPY package.json pnpm-lock.yaml* ./

RUN echo "only-built-dependencies[]=sharp" > .npmrc && \
    echo "only-built-dependencies[]=unrs-resolver" >> .npmrc
# Монтируем кэш pnpm для ускорения последующих сборок.
# Кэш сохраняется между билдами в контексте Docker BuildKit.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
    
# --- Этап 2: Сборка ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Сборка Next.js (убедитесь, что в next.config.js включен standalone режим)
RUN pnpm run build

# --- Этап 3: Runner (Продакшен) ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Настройка прав для standalone
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]