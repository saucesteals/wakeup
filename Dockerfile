FROM oven/bun:latest AS builder

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:slim

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

ENV NODE_ENV=production

CMD ["bun", "run", "./build/index.js"]
