# ─────────────────────────────────────────────────────────
# Stage 1: Builder
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

WORKDIR /app

# Copy manifests (layer cache — only reinstalls when these change)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

COPY packages/shared/package.json             ./packages/shared/
COPY packages/email-template/package.json     ./packages/email-template/
COPY packages/config-typescript/package.json  ./packages/config-typescript/
COPY packages/config-eslint/package.json      ./packages/config-eslint/

COPY apps/services/product/package.json             ./apps/services/product/
COPY apps/services/product/prisma/schema.prisma     ./apps/services/product/prisma/schema.prisma
COPY apps/services/inventory/package.json           ./apps/services/inventory/
COPY apps/services/inventory/prisma/schema.prisma   ./apps/services/inventory/prisma/schema.prisma
COPY apps/services/order/package.json               ./apps/services/order/
COPY apps/services/order/prisma/schema.prisma       ./apps/services/order/prisma/schema.prisma
COPY apps/services/cart/package.json                ./apps/services/cart/
COPY apps/services/cart/prisma/schema.prisma        ./apps/services/cart/prisma/schema.prisma
COPY apps/api/package.json                          ./apps/api/

RUN pnpm install --frozen-lockfile

# Copy full source
COPY packages/ ./packages/
COPY apps/services/ ./apps/services/
COPY apps/api/ ./apps/api/

# Turbo builds packages first (^build), then services and api — in dependency order
RUN pnpm turbo build --filter="./packages/*" --filter="./apps/services/*" --filter="./apps/api"

# ─────────────────────────────────────────────────────────
# Stage 2: Runner
# ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN apk add --no-cache supervisor

WORKDIR /app

# Copy everything from builder — node_modules preserves all workspace symlinks
COPY --from=builder /app/node_modules          ./node_modules
COPY --from=builder /app/package.json          ./package.json
COPY --from=builder /app/pnpm-workspace.yaml   ./pnpm-workspace.yaml

COPY --from=builder /app/packages/shared/package.json            ./packages/shared/package.json
COPY --from=builder /app/packages/shared/node_modules            ./packages/shared/node_modules
COPY --from=builder /app/packages/shared/dist                    ./packages/shared/dist

COPY --from=builder /app/packages/email-template/package.json    ./packages/email-template/package.json
COPY --from=builder /app/packages/email-template/node_modules    ./packages/email-template/node_modules
COPY --from=builder /app/packages/email-template/dist            ./packages/email-template/dist

COPY --from=builder /app/apps/services/product/package.json      ./apps/services/product/package.json
COPY --from=builder /app/apps/services/product/node_modules      ./apps/services/product/node_modules
COPY --from=builder /app/apps/services/product/dist              ./apps/services/product/dist
COPY --from=builder /app/apps/services/product/prisma            ./apps/services/product/prisma
COPY --from=builder /app/apps/services/product/generated         ./apps/services/product/generated

COPY --from=builder /app/apps/services/inventory/package.json    ./apps/services/inventory/package.json
COPY --from=builder /app/apps/services/inventory/node_modules    ./apps/services/inventory/node_modules
COPY --from=builder /app/apps/services/inventory/dist            ./apps/services/inventory/dist
COPY --from=builder /app/apps/services/inventory/prisma          ./apps/services/inventory/prisma
COPY --from=builder /app/apps/services/inventory/generated       ./apps/services/inventory/generated

COPY --from=builder /app/apps/services/order/package.json        ./apps/services/order/package.json
COPY --from=builder /app/apps/services/order/node_modules        ./apps/services/order/node_modules
COPY --from=builder /app/apps/services/order/dist                ./apps/services/order/dist
COPY --from=builder /app/apps/services/order/prisma              ./apps/services/order/prisma
COPY --from=builder /app/apps/services/order/generated           ./apps/services/order/generated

COPY --from=builder /app/apps/services/cart/package.json         ./apps/services/cart/package.json
COPY --from=builder /app/apps/services/cart/node_modules         ./apps/services/cart/node_modules
COPY --from=builder /app/apps/services/cart/dist                 ./apps/services/cart/dist
COPY --from=builder /app/apps/services/cart/prisma               ./apps/services/cart/prisma
COPY --from=builder /app/apps/services/cart/generated            ./apps/services/cart/generated

COPY --from=builder /app/apps/api/package.json                   ./apps/api/package.json
COPY --from=builder /app/apps/api/node_modules                   ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist                           ./apps/api/dist

COPY supervisord.conf /etc/supervisord.conf

EXPOSE 8000 4001 4002 4003 4004

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
