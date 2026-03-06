#!/bin/sh
set -e

DIR=/pb/pb_data

if [ -n "$PB_ADMIN_EMAIL" ] && [ -n "$PB_ADMIN_PASSWORD" ]; then
  echo "Creating/updating superuser..."
  /pb/pocketbase superuser upsert "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir=$DIR 2>/dev/null \
    || /pb/pocketbase superuser create "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD" --dir=$DIR 2>/dev/null \
    || echo "(superuser may already exist)"
fi

echo "Starting PocketBase with automigrate..."
exec /pb/pocketbase serve --http=0.0.0.0:${PORT} --dir=$DIR --automigrate
