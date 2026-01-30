#!/bin/sh
set -e

echo "Creating migrations directory..."
mkdir -p /app/src/migrations

echo "Running database push (schema sync)..."
cd /app && node -e "
const { getPayload } = require('payload');
const config = require('./dist/payload.config.js').default;

async function run() {
  try {
    const payload = await getPayload({ config });
    console.log('Payload initialized, database should be ready');
    process.exit(0);
  } catch (e) {
    console.error('Init error:', e.message);
    process.exit(1);
  }
}
run();
" || echo "Schema sync attempted"

echo "Building admin UI..."
npx payload build

echo "Starting server..."
node dist/server.js
