# syntax=docker/dockerfile:1.7

# ─── Stage 1: dependencies ──────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

# Override host's NODE_ENV=production so devDependencies install
ENV NODE_ENV=development

RUN corepack enable && \
    corepack prepare pnpm@10.33.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile --prod=false

# ─── Stage 2: build ─────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

ENV NODE_ENV=development

RUN corepack enable && \
    corepack prepare pnpm@10.33.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build && \
    pnpm prune --prod

# ─── Stage 3: runtime ───────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache tini && \
    addgroup -S app && \
    adduser -S -G app app

COPY --from=build --chown=app:app /app/dist ./dist
COPY --from=build --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/package.json ./package.json
# Fonts werden zur Laufzeit von /api/og.png via process.cwd() gelesen
COPY --from=build --chown=app:app /app/src/assets/fonts ./src/assets/fonts

USER app

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:${PORT}/ || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./dist/server/entry.mjs"]
