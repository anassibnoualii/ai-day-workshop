#!/bin/bash
set -e

source .env

echo "Building PocketBase image..."
docker build -t pb-agentday ./pb

echo "Stopping old container (if any)..."
docker stop pb-agentday 2>/dev/null && docker rm pb-agentday 2>/dev/null || true

echo "Starting PocketBase..."
docker run -d \
  --name pb-agentday \
  -p 8090:8090 \
  -v pb_data:/pb/pb_data \
  -e PB_ADMIN_EMAIL="$PB_ADMIN_EMAIL" \
  -e PB_ADMIN_PASSWORD="$PB_ADMIN_PASSWORD" \
  pb-agentday

echo "Waiting for PocketBase..."
until curl -s http://127.0.0.1:8090/api/health > /dev/null 2>&1; do
  sleep 1
done

echo ""
echo "  PocketBase admin: http://127.0.0.1:8090/_/"
echo "  Login:            $PB_ADMIN_EMAIL / $PB_ADMIN_PASSWORD"
echo ""

npm install
echo ""
echo "  Frontend:         http://localhost:5173"
echo ""
npm run dev
