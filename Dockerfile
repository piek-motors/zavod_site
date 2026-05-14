# ─── Stage 1: base ───────────────────────────────────────────────────────────
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# corepack ships with Node 22 — no extra install needed
RUN corepack enable

# ─── Stage 2: deps ───────────────────────────────────────────────────────────
FROM base AS deps
# libc6-compat needed for native modules (e.g. unrs-resolver)
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

# FIX: allow only unrs-resolver to run build scripts.
# sharp is skipped — you have no images so its native binaries are unused.
RUN echo 'onlyBuiltDependencies[]=unrs-resolver' >> .npmrc

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ─── Stage 3: builder ────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# Markdown-only: disable image optimization entirely to remove the sharp warning
# at runtime and shrink the build. Add this to next.config.(js|ts):
#   images: { unoptimized: true }   ← or remove the images block entirely.
RUN pnpm run build

# ─── Stage 4: runner ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Single RUN layer for user/group setup
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs && \
    mkdir -p .next && \
    chown nextjs:nodejs .next

# public/ first (changes least often → best cache hit)
COPY --from=builder /app/public ./public

# standalone output + static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]