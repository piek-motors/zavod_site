FROM oven/bun:1-alpine AS deps
# Add libc6-compat for native dependencies
RUN apk add --no-network --no-cache libc6-compat
WORKDIR /app

COPY package.json bun.lockb* ./
# Explicitly install sharp for image optimization speed
RUN bun install --frozen-lockfile
RUN bun add sharp 

FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Standalone mode needs these specific folders to be fast
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Run with Bun's high-performance runtime
CMD ["bun", "server.js"]