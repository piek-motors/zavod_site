# --- Этап 1: Установка зависимостей ---
FROM node:20-alpine AS deps
# libc6-compat нужен для корректной работы некоторых нативных библиотек
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы манифестов
COPY package.json package-lock.json* ./

# Используем ci (clean install) для гарантии идентичности зависимостей
RUN npm ci

# --- Этап 2: Сборка ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию
ENV NEXT_TELEMETRY_DISABLED=1

# Сборка приложения
RUN npm run build

# --- Этап 3: Runner (Финальный образ) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Создаем непривилегированного пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем только необходимые артефакты из standalone режима
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Запуск через Node
CMD ["node", "server.js"]