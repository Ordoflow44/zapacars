FROM node:22-alpine AS builder

WORKDIR /app

# Copy all files first
COPY . .

# Remove node_modules if accidentally copied
RUN rm -rf node_modules

# Install all dependencies (including dev)
RUN npm ci --legacy-peer-deps

# Build TypeScript
RUN ./node_modules/.bin/tsc

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev --legacy-peer-deps

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Expose port
EXPOSE 3000

# Start: run migrations, build admin UI, then start server
CMD ["sh", "-c", "mkdir -p /app/src/migrations && npx payload migrate:create || true && npx payload migrate || true && npx payload build && node dist/server.js"]
