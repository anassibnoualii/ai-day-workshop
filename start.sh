#!/bin/bash
set -e

echo "Building PocketBase image..."
docker build -t pb-agentday ./pb

echo "Stopping old container (if any)..."
docker stop pb-agentday 2>/dev/null && docker rm pb-agentday 2>/dev/null || true

echo "Starting PocketBase..."
docker run -d --name pb-agentday -p 8090:8090 -v pb_data:/pb/pb_data pb-agentday

echo "Waiting for PocketBase to be ready..."
until curl -s http://127.0.0.1:8090/api/health > /dev/null 2>&1; do
  sleep 1
done

echo "Running PocketBase setup (collections + seed data)..."
./pb/setup.sh http://127.0.0.1:8090

echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Starting frontend..."
echo ""
echo "  PocketBase admin: http://127.0.0.1:8090/_/"
echo "  Login:            admin@agentday.com / adminadmin123"
echo "  Frontend:         http://localhost:5173"
echo ""
npm run dev
