FROM node:lts-alpine3.18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
EXPOSE 3000
COPY package.json pnpm-lock.yaml* ./

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  if [ -f pnpm-lock.yaml ]; then pnpm install --prod --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Install dependencies only when needed
FROM base AS build
# Install dependencies based on the preferred package manager
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS dev-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  if [ -f pnpm-lock.yaml ]; then pnpm install; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM base AS dev
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
RUN ls node_modules
COPY . .
CMD [ "pnpm", "run", "dev" ]

FROM base as runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD [ "node", "server.js" ]
