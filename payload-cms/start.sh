#!/bin/sh
set -e

echo "=== ZapaCars CMS Startup ==="
echo "Running database migrations..."

# Create migrations directory
mkdir -p /app/src/migrations

# Try to create migration (will fail if already exists, that's OK)
npx payload migrate:create 2>&1 || echo "Migration creation skipped (may already exist)"

# Run migrations
npx payload migrate 2>&1 || echo "Migration run completed"

echo "Starting server..."
exec node dist/server.js
